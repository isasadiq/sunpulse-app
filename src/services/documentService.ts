import { supabase } from '../lib/supabase';
import { ProjectDocument } from '../types/database';

export const documentService = {
  /**
   * Fetch documents (SLD, warranties, manuals, handover) for a project
   */
  async getProjectDocuments(projectId: string): Promise<ProjectDocument[]> {
    const { data, error } = await supabase
      .from('project_documents')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as ProjectDocument[]) || [];
  },

  /**
   * Generate secure signed URL for downloading private documents
   */
  async getDocumentSignedUrl(filePath: string, expiresInSeconds: number = 3600): Promise<string | null> {
    const { data, error } = await supabase.storage
      .from('project-documents')
      .createSignedUrl(filePath, expiresInSeconds);

    if (error) {
      console.warn('Could not generate signed storage URL:', error.message);
      return null;
    }
    return data.signedUrl;
  },
};
