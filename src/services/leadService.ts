import { supabase } from '../lib/supabase';
import { Lead, LeadSource, LeadStatus } from '../types/database';

export interface SubmitQuoteParams {
  leadSource: LeadSource;
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  state?: string;
  existingProjectId?: string;
  recommendedPackage?: string;
  estimatedSystemKw?: number;
  estimatedDailyKwh?: number;
  estimatedPriceNgn?: number;
  appliancesData?: { name: string; qty: number; watts: number; hours: number }[];
}

export const leadService = {
  /**
   * Submit incoming quote request from Guest or Client Expansion calculators
   */
  async submitQuoteRequest(params: SubmitQuoteParams): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        lead_source: params.leadSource,
        full_name: params.fullName,
        phone: params.phone,
        email: params.email,
        address: params.address || null,
        state: params.state || 'Abuja FCT',
        existing_project_id: params.existingProjectId || null,
        recommended_package: params.recommendedPackage || null,
        estimated_system_kw: params.estimatedSystemKw || null,
        estimated_daily_kwh: params.estimatedDailyKwh || null,
        estimated_price_ngn: params.estimatedPriceNgn || null,
        appliances_data: params.appliancesData || [],
        status: 'new',
      })
      .select()
      .single();

    if (error) throw error;
    return data as Lead;
  },

  /**
   * Fetch leads pipeline for Management portal
   */
  async getLeads(status?: LeadStatus | 'all'): Promise<Lead[]> {
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as Lead[]) || [];
  },

  /**
   * Update lead status (e.g. mark contacted or quoted)
   */
  async updateLeadStatus(leadId: string, status: LeadStatus, notes?: string) {
    const { data, error } = await supabase
      .from('leads')
      .update({
        status,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', leadId)
      .select()
      .single();

    if (error) throw error;
    return data as Lead;
  },
};
