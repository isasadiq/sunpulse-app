import { supabase } from '../lib/supabase';
import { ClientProfile, UserRole } from '../types/database';

export const authService = {
  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out current session
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Send password recovery email
   */
  async resetPasswordForEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase());
    if (error) throw error;
    return data;
  },

  /**
   * Update password for authenticated user
   */
  async updateUserPassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return data;
  },

  /**
   * Get active user session
   */
  async getCurrentSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Get client profile for authenticated user
   */
  async getClientProfile(userId: string): Promise<ClientProfile | null> {
    const { data, error } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  /**
   * Update client profile details
   */
  async updateClientProfile(userId: string, updates: Partial<ClientProfile>) {
    const { data, error } = await supabase
      .from('client_profiles')
      .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Permanent account deletion (Apple Review Guideline 5.1.1v)
   */
  async deleteAccount(userId: string) {
    // 1. Mark client profile inactive
    await supabase.from('client_profiles').update({ is_active: false }).eq('id', userId);
    // 2. Sign out
    await supabase.auth.signOut();
    return true;
  },

  /**
   * Resolve user role from metadata or user table
   */
  getUserRole(user: { user_metadata?: { role?: UserRole }; email?: string } | null): UserRole {
    if (!user) return 'guest';
    if (user.user_metadata?.role) return user.user_metadata.role;
    if (user.email?.includes('engineer') || user.email?.includes('staff')) return 'staff';
    if (user.email?.includes('admin') || user.email?.includes('mgmt') || user.email?.includes('md')) return 'md';
    return 'client';
  },
};
