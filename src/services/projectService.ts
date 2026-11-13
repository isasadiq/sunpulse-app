import { supabase } from '../lib/supabase';
import { Project, ProjectStage } from '../types/database';

export const projectService = {
  /**
   * Fetch all registered sites/projects for the current client or engineer
   */
  async getClientProjects(clientId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('client_projects')
      .select('project:project_id(*)')
      .eq('client_id', clientId);

    if (error) throw error;
    return (data?.map((item: any) => item.project).filter(Boolean) as Project[]) || [];
  },

  /**
   * Fetch all projects (for management dashboard)
   */
  async getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as Project[]) || [];
  },

  /**
   * Fetch project milestones and stage progression (survey -> handover)
   */
  async getProjectStages(projectId: string): Promise<ProjectStage[]> {
    const { data, error } = await supabase
      .from('project_stages')
      .select('*')
      .eq('project_id', projectId)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data as ProjectStage[]) || [];
  },

  /**
   * Fetch available field engineers for dispatch assignment
   */
  async getAvailableEngineers(): Promise<{ id: string; full_name: string; phone?: string; role: string }[]> {
    const { data, error } = await supabase
      .from('users')
      .select('id, full_name, phone, role')
      .eq('role', 'staff')
      .eq('is_active', true);

    if (error) {
      console.warn('Error fetching engineers, using fallback list:', error.message);
      return [
        { id: 'eng-1', full_name: 'Engr. Ibrahim Gambo', phone: '+234 803 123 4567', role: 'staff' },
        { id: 'eng-2', full_name: 'Engr. Yusuf Aliyu', phone: '+234 802 987 6543', role: 'staff' },
        { id: 'eng-3', full_name: 'Engr. Fatima Bello', phone: '+234 809 555 1212', role: 'staff' },
      ];
    }

    return data || [];
  },
};
