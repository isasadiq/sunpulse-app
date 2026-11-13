import { supabase } from '../lib/supabase';
import { SupportTicket, TicketCategory, TicketPriority, TicketStatus } from '../types/database';

export interface CreateTicketParams {
  projectId: string;
  category: TicketCategory;
  title: string;
  description: string;
  priority?: TicketPriority;
  attachedPhotos?: string[];
}

export const ticketService = {
  /**
   * Fetch support tickets with optional status and role filters
   */
  async getTickets(filters?: {
    status?: TicketStatus | 'all';
    projectId?: string;
    assignedEngineerId?: string;
  }): Promise<SupportTicket[]> {
    let query = supabase
      .from('support_tickets')
      .select('*, assigned_engineer:assigned_engineer_id(full_name, phone)')
      .order('created_at', { ascending: false });

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (filters?.projectId) {
      query = query.eq('project_id', filters.projectId);
    }
    if (filters?.assignedEngineerId) {
      query = query.eq('assigned_engineer_id', filters.assignedEngineerId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as SupportTicket[]) || [];
  },

  /**
   * Fetch single ticket detail by ID
   */
  async getTicketById(ticketId: string): Promise<SupportTicket | null> {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*, assigned_engineer:assigned_engineer_id(full_name, phone)')
      .eq('id', ticketId)
      .single();

    if (error) throw error;
    return data as SupportTicket;
  },

  /**
   * Create a new client fault report
   */
  async createTicket(params: CreateTicketParams): Promise<SupportTicket> {
    const user = (await supabase.auth.getUser()).data.user;

    const slaHours = params.priority === 'emergency' ? 2 : params.priority === 'high' ? 4 : 24;
    const slaDueAt = new Date(Date.now() + slaHours * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        project_id: params.projectId,
        client_id: user?.id || null,
        category: params.category,
        title: params.title,
        description: params.description,
        priority: params.priority || 'normal',
        sla_hours: slaHours,
        sla_due_at: slaDueAt,
        status: 'unassigned',
        attached_photos: params.attachedPhotos || [],
      })
      .select()
      .single();

    if (error) throw error;
    return data as SupportTicket;
  },

  /**
   * Dispatch an engineer to an open ticket with SLA
   */
  async dispatchEngineer(ticketId: string, engineerId: string, slaHours: number = 4) {
    const slaDueAt = new Date(Date.now() + slaHours * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('support_tickets')
      .update({
        assigned_engineer_id: engineerId,
        status: 'in_progress',
        sla_hours: slaHours,
        sla_due_at: slaDueAt,
        dispatched_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', ticketId)
      .select()
      .single();

    if (error) throw error;
    return data as SupportTicket;
  },

  /**
   * Mark a support ticket as resolved with completion notes
   */
  async resolveTicket(ticketId: string, resolutionNotes: string) {
    const { data, error } = await supabase
      .from('support_tickets')
      .update({
        status: 'resolved',
        resolved_at: new Date().toISOString(),
        resolution_notes: resolutionNotes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', ticketId)
      .select()
      .single();

    if (error) throw error;
    return data as SupportTicket;
  },
};
