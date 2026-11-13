import { supabase } from '../lib/supabase';
import { MaintenanceVisit } from '../types/database';

export interface SubmitSignoffParams {
  projectId: string;
  checklistData: Record<string, boolean>;
  checklistScore: number;
  engineerNotes?: string;
  engineerSignatureUrl?: string;
  clientSignatureUrl?: string;
  clientSignoffName?: string;
}

export const maintenanceService = {
  /**
   * Fetch historical maintenance visits for a project
   */
  async getMaintenanceVisits(projectId: string): Promise<MaintenanceVisit[]> {
    const { data, error } = await supabase
      .from('maintenance_visits')
      .select('*')
      .eq('project_id', projectId)
      .order('visit_date', { ascending: false });

    if (error) throw error;
    return (data as MaintenanceVisit[]) || [];
  },

  /**
   * Record a signed preventive maintenance inspection visit
   */
  async submitMaintenanceSignoff(params: SubmitSignoffParams): Promise<MaintenanceVisit> {
    const engineer = (await supabase.auth.getUser()).data.user;

    const { data, error } = await supabase
      .from('maintenance_visits')
      .insert({
        project_id: params.projectId,
        engineer_id: engineer?.id || null,
        visit_date: new Date().toISOString().split('T')[0],
        checklist_data: params.checklistData,
        checklist_score: params.checklistScore,
        total_checklist_items: Object.keys(params.checklistData).length || 10,
        engineer_notes: params.engineerNotes || null,
        engineer_signature_url: params.engineerSignatureUrl || null,
        client_signature_url: params.clientSignatureUrl || null,
        client_signoff_name: params.clientSignoffName || null,
        status: 'completed',
        signed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data as MaintenanceVisit;
  },
};
