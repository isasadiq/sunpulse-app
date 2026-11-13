export type UserRole = 'md' | 'dso' | 'accountant' | 'staff' | 'client' | 'guest';

export interface ClientProfile {
  id: string;
  full_name: string;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientProject {
  id: string;
  client_id: string;
  project_id: string;
  is_primary: boolean;
  access_level: 'owner' | 'viewer' | 'billing';
  created_at: string;
  project?: Project;
}

export interface Project {
  id: string;
  project_no: string;
  client_name: string;
  client_address: string | null;
  system_title: string | null;
  system_size_kw: number | null;
  status: 'active' | 'on_hold' | 'completed' | 'cancelled';
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectStage {
  id: string;
  project_id: string;
  stage: 'survey' | 'procurement' | 'installation' | 'commissioning' | 'handover';
  sort_order: number;
  status: 'pending' | 'in_progress' | 'done';
  note: string | null;
  completed_at: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface Datalogger {
  id: string;
  project_id: string;
  serial_number: string;
  model: string;
  firmware_version: string;
  is_online: boolean;
  last_heartbeat: string;
  installed_at: string;
  created_at: string;
}

export interface TelemetryReading {
  id: string;
  project_id: string;
  datalogger_sn: string;
  solar_kw: number;
  load_kw: number;
  battery_pct: number;
  battery_voltage: number;
  battery_temp_c: number;
  grid_status: 'online' | 'outage' | 'offline';
  today_generation_kwh: number;
  monthly_diesel_saved_ngn: number;
  recorded_at: string;
}

export type TicketCategory = 'inverter' | 'battery' | 'solar_pv' | 'wiring' | 'grid_switch' | 'other';
export type TicketStatus = 'unassigned' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'normal' | 'high' | 'emergency';

export interface SupportTicket {
  id: string;
  ticket_no: string;
  project_id: string;
  client_id: string | null;
  category: TicketCategory;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  sla_hours: number;
  sla_due_at: string;
  assigned_engineer_id: string | null;
  dispatched_at: string | null;
  resolved_at: string | null;
  resolution_notes: string | null;
  attached_photos: string[];
  created_at: string;
  updated_at: string;
  assigned_engineer?: { full_name: string; phone?: string } | null;
}

export type DocumentType = 'sld' | 'warranty' | 'manual' | 'handover' | 'spec_sheet' | 'other';

export interface ProjectDocument {
  id: string;
  project_id: string;
  title: string;
  doc_type: DocumentType;
  file_name: string;
  file_path: string;
  file_size_bytes: number;
  is_locked: boolean;
  lock_reason: string | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadSource = 'guest_calculator' | 'client_expansion' | 'direct_contact';
export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'converted' | 'lost';

export interface Lead {
  id: string;
  lead_no: string;
  lead_source: LeadSource;
  full_name: string;
  phone: string;
  email: string;
  address: string | null;
  state: string | null;
  existing_project_id: string | null;
  recommended_package: string | null;
  estimated_system_kw: number | null;
  estimated_daily_kwh: number | null;
  estimated_price_ngn: number | null;
  appliances_data: { name: string; qty: number; watts: number; hours: number }[];
  status: LeadStatus;
  notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceVisit {
  id: string;
  project_id: string;
  plan_id: string | null;
  engineer_id: string | null;
  visit_date: string;
  checklist_data: Record<string, boolean>;
  checklist_score: number;
  total_checklist_items: number;
  engineer_notes: string | null;
  engineer_signature_url: string | null;
  client_signature_url: string | null;
  client_signoff_name: string | null;
  status: 'scheduled' | 'in_progress' | 'completed';
  signed_at: string | null;
  created_at: string;
}

export interface EngineerSyncItem {
  id: string;
  engineer_id: string;
  client_timestamp: string;
  sync_type: 'photos' | 'progress_note' | 'diagnostics' | 'checklist' | 'inverter_test';
  project_id: string | null;
  payload: Record<string, unknown>;
  status: 'pending' | 'processing' | 'synced' | 'error';
  synced_at: string | null;
}
