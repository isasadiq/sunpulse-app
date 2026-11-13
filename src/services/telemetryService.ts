import { supabase } from '../lib/supabase';
import { TelemetryReading } from '../types/database';

export const telemetryService = {
  /**
   * Fetch the most recent live telemetry reading for a project
   */
  async getLatestTelemetry(projectId: string): Promise<TelemetryReading | null> {
    const { data, error } = await supabase
      .from('telemetry_readings')
      .select('*')
      .eq('project_id', projectId)
      .order('recorded_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.warn('Telemetry fetch error, using cached fallback:', error.message);
      return null;
    }
    return data;
  },

  /**
   * Subscribe to real-time telemetry changes via Supabase Realtime channel
   */
  subscribeToTelemetry(
    projectId: string,
    onUpdate: (reading: TelemetryReading) => void
  ) {
    const channel = supabase
      .channel(`telemetry:${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'telemetry_readings',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          if (payload.new) {
            onUpdate(payload.new as TelemetryReading);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Verify datalogger cloud connection by serial number
   */
  async testDatalogger(serialNumber: string) {
    const { data, error } = await supabase
      .from('dataloggers')
      .select('*')
      .eq('serial_number', serialNumber.trim().toUpperCase())
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return { success: false, reason: 'Datalogger serial not registered in SUNPULSE network.' };
    }

    const isRecent = data.last_heartbeat
      ? Date.now() - new Date(data.last_heartbeat).getTime() < 1000 * 60 * 15
      : false;

    return {
      success: data.is_online && isRecent,
      datalogger: data,
      reason: data.is_online ? null : 'Datalogger has not sent heartbeat in over 15 minutes.',
    };
  },

  /**
   * Link an inverter datalogger to a specific project/site
   */
  async linkDataloggerToProject(projectId: string, serialNumber: string, brand: string = 'Deye') {
    const { data, error } = await supabase
      .from('dataloggers')
      .upsert({
        project_id: projectId,
        serial_number: serialNumber.trim().toUpperCase(),
        model: `${brand} Smart Datalogger 4G`,
        is_online: true,
        last_heartbeat: new Date().toISOString(),
      }, { onConflict: 'serial_number' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Query historical daily energy generation & diesel savings
   */
  async getHistoricalGeneration(projectId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('telemetry_readings')
      .select('recorded_at, today_generation_kwh, monthly_diesel_saved_ngn, solar_kw, load_kw')
      .eq('project_id', projectId)
      .gte('recorded_at', startDate.toISOString())
      .order('recorded_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },
};
