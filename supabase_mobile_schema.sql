-- ==============================================================================
-- SUNPULSE NIGERIA LTD - MOBILE APPLICATION BACKEND SCHEMA & EXTENSIONS
-- Compatible with SUNPULSE FMS Supabase Database (https://rdrawvjjxbhxdqthuyek.supabase.co)
-- 100% IDEMPOTENT & SAFE TO RE-RUN
-- ==============================================================================

-- 1. EXTEND USER ROLES & CLIENT ACCESS
-- ------------------------------------------------------------------------------
create table if not exists public.client_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  address text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.client_profiles add column if not exists full_name text not null default '';
alter table public.client_profiles add column if not exists phone text;
alter table public.client_profiles add column if not exists address text;
alter table public.client_profiles add column if not exists avatar_url text;
alter table public.client_profiles add column if not exists is_active boolean not null default true;

-- Link client accounts to their installation sites/projects
create table if not exists public.client_projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  is_primary boolean not null default true,
  access_level text not null default 'owner' check (access_level in ('owner', 'viewer', 'billing')),
  created_at timestamptz not null default now(),
  unique (client_id, project_id)
);

alter table public.client_projects add column if not exists is_primary boolean not null default true;
alter table public.client_projects add column if not exists access_level text not null default 'owner';

create index if not exists idx_client_projects_client on public.client_projects(client_id);
create index if not exists idx_client_projects_project on public.client_projects(project_id);


-- 2. DATALOGGERS & REAL-TIME TELEMETRY
-- ------------------------------------------------------------------------------
create table if not exists public.dataloggers (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  serial_number text not null unique,
  model text not null default 'SUNPULSE Solar-Log 4G',
  firmware_version text default 'v3.4.1',
  is_online boolean not null default true,
  last_heartbeat timestamptz not null default now(),
  installed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.dataloggers add column if not exists model text not null default 'SUNPULSE Solar-Log 4G';
alter table public.dataloggers add column if not exists firmware_version text default 'v3.4.1';
alter table public.dataloggers add column if not exists is_online boolean not null default true;
alter table public.dataloggers add column if not exists last_heartbeat timestamptz not null default now();

create table if not exists public.telemetry_readings (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  datalogger_sn text not null references public.dataloggers(serial_number) on delete cascade,
  solar_kw numeric(6,2) not null default 0 check (solar_kw >= 0),
  load_kw numeric(6,2) not null default 0 check (load_kw >= 0),
  battery_pct numeric(5,1) not null default 0 check (battery_pct >= 0 and battery_pct <= 100),
  battery_voltage numeric(6,2) default 51.2,
  battery_temp_c numeric(5,1) default 28.5,
  grid_status text not null default 'online' check (grid_status in ('online', 'outage', 'offline')),
  today_generation_kwh numeric(8,2) not null default 0 check (today_generation_kwh >= 0),
  monthly_diesel_saved_ngn numeric(12,2) not null default 0 check (monthly_diesel_saved_ngn >= 0),
  recorded_at timestamptz not null default now()
);

alter table public.telemetry_readings add column if not exists solar_kw numeric(6,2) not null default 0;
alter table public.telemetry_readings add column if not exists load_kw numeric(6,2) not null default 0;
alter table public.telemetry_readings add column if not exists battery_pct numeric(5,1) not null default 0;
alter table public.telemetry_readings add column if not exists battery_voltage numeric(6,2) default 51.2;
alter table public.telemetry_readings add column if not exists battery_temp_c numeric(5,1) default 28.5;
alter table public.telemetry_readings add column if not exists grid_status text not null default 'online';
alter table public.telemetry_readings add column if not exists today_generation_kwh numeric(8,2) not null default 0;
alter table public.telemetry_readings add column if not exists monthly_diesel_saved_ngn numeric(12,2) not null default 0;

create index if not exists idx_telemetry_project_time on public.telemetry_readings(project_id, recorded_at desc);


-- 3. SUPPORT TICKETS & SLA DISPATCH
-- ------------------------------------------------------------------------------
create sequence if not exists public.ticket_no_seq start 1040;

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_no text not null unique default ('#' || nextval('public.ticket_no_seq')::text),
  project_id uuid not null references public.projects(id) on delete cascade,
  client_id uuid references auth.users(id) on delete set null,
  category text not null check (category in ('inverter', 'battery', 'solar_pv', 'wiring', 'grid_switch', 'other')),
  title text not null,
  description text not null,
  status text not null default 'unassigned' check (status in ('unassigned', 'in_progress', 'resolved', 'closed')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'emergency')),
  sla_hours integer not null default 4,
  sla_due_at timestamptz not null default (now() + interval '4 hours'),
  assigned_engineer_id uuid references public.users(id) on delete set null,
  dispatched_at timestamptz,
  resolved_at timestamptz,
  resolution_notes text,
  attached_photos text[] default array[]::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.support_tickets add column if not exists ticket_no text default ('#' || nextval('public.ticket_no_seq')::text);
alter table public.support_tickets add column if not exists client_id uuid references auth.users(id) on delete set null;
alter table public.support_tickets add column if not exists category text default 'inverter';
alter table public.support_tickets add column if not exists status text not null default 'unassigned';
alter table public.support_tickets add column if not exists priority text not null default 'normal';
alter table public.support_tickets add column if not exists sla_hours integer not null default 4;
alter table public.support_tickets add column if not exists sla_due_at timestamptz not null default (now() + interval '4 hours');
alter table public.support_tickets add column if not exists assigned_engineer_id uuid references public.users(id) on delete set null;
alter table public.support_tickets add column if not exists dispatched_at timestamptz;
alter table public.support_tickets add column if not exists resolved_at timestamptz;
alter table public.support_tickets add column if not exists resolution_notes text;
alter table public.support_tickets add column if not exists attached_photos text[] default array[]::text[];

create index if not exists idx_support_tickets_project on public.support_tickets(project_id);
create index if not exists idx_support_tickets_status on public.support_tickets(status);
create index if not exists idx_support_tickets_engineer on public.support_tickets(assigned_engineer_id);


-- 4. PROJECT DOCUMENTS VAULT (SAFE COLUMN ADDITIONS)
-- ------------------------------------------------------------------------------
create table if not exists public.project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null default '',
  doc_type text not null default 'other',
  file_name text not null default '',
  file_path text not null default '',
  file_size_bytes bigint not null default 0,
  is_locked boolean not null default false,
  lock_reason text,
  uploaded_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure all required columns exist even if the table already existed in Supabase
alter table public.project_documents add column if not exists title text not null default '';
alter table public.project_documents add column if not exists doc_type text not null default 'other';
alter table public.project_documents add column if not exists file_name text not null default '';
alter table public.project_documents add column if not exists file_path text not null default '';
alter table public.project_documents add column if not exists file_size_bytes bigint not null default 0;
alter table public.project_documents add column if not exists is_locked boolean not null default false;
alter table public.project_documents add column if not exists lock_reason text;
alter table public.project_documents add column if not exists uploaded_by uuid references public.users(id) on delete set null;

create index if not exists idx_project_docs_project on public.project_documents(project_id);


-- 5. LEADS & QUOTE REQUESTS PIPELINE
-- ------------------------------------------------------------------------------
create sequence if not exists public.lead_no_seq start 100;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  lead_no text not null unique default ('LEAD-' || nextval('public.lead_no_seq')::text),
  lead_source text not null check (lead_source in ('guest_calculator', 'client_expansion', 'direct_contact')),
  full_name text not null,
  phone text not null,
  email text not null,
  address text,
  state text default 'Abuja FCT',
  existing_project_id uuid references public.projects(id) on delete set null,
  recommended_package text,
  estimated_system_kw numeric(6,2),
  estimated_daily_kwh numeric(6,2),
  estimated_price_ngn numeric(14,2),
  appliances_data jsonb default '[]'::jsonb,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'converted', 'lost')),
  notes text,
  assigned_to uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads add column if not exists lead_no text default ('LEAD-' || nextval('public.lead_no_seq')::text);
alter table public.leads add column if not exists lead_source text not null default 'direct_contact';
alter table public.leads add column if not exists full_name text not null default '';
alter table public.leads add column if not exists phone text not null default '';
alter table public.leads add column if not exists email text not null default '';
alter table public.leads add column if not exists address text;
alter table public.leads add column if not exists state text default 'Abuja FCT';
alter table public.leads add column if not exists existing_project_id uuid references public.projects(id) on delete set null;
alter table public.leads add column if not exists recommended_package text;
alter table public.leads add column if not exists estimated_system_kw numeric(6,2);
alter table public.leads add column if not exists estimated_daily_kwh numeric(6,2);
alter table public.leads add column if not exists estimated_price_ngn numeric(14,2);
alter table public.leads add column if not exists appliances_data jsonb default '[]'::jsonb;
alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add column if not exists notes text;
alter table public.leads add column if not exists assigned_to uuid references public.users(id) on delete set null;

create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_created on public.leads(created_at desc);


-- 6. PREVENTIVE MAINTENANCE & FIELD SIGN-OFFS
-- ------------------------------------------------------------------------------
create table if not exists public.maintenance_plans (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  plan_tier text not null check (plan_tier in ('basic', 'standard', 'premium')),
  frequency text not null default 'quarterly' check (frequency in ('monthly', 'quarterly', 'bi_annual', 'annual')),
  start_date date not null default current_date,
  renewal_date date,
  is_active boolean not null default true,
  annual_fee_ngn numeric(14,2) default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.maintenance_visits (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  plan_id uuid references public.maintenance_plans(id) on delete set null,
  engineer_id uuid references public.users(id) on delete set null,
  visit_date date not null default current_date,
  checklist_data jsonb not null default '{}'::jsonb,
  checklist_score integer default 10,
  total_checklist_items integer default 10,
  engineer_notes text,
  engineer_signature_url text,
  client_signature_url text,
  client_signoff_name text,
  status text not null default 'completed' check (status in ('scheduled', 'in_progress', 'completed')),
  signed_at timestamptz default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_maintenance_visits_project on public.maintenance_visits(project_id);


-- 7. ENGINEER FIELD OFFLINE SYNC QUEUE
-- ------------------------------------------------------------------------------
create table if not exists public.engineer_sync_queue (
  id uuid primary key default gen_random_uuid(),
  engineer_id uuid not null references auth.users(id) on delete cascade,
  client_timestamp timestamptz not null default now(),
  sync_type text not null check (sync_type in ('photos', 'progress_note', 'diagnostics', 'checklist', 'inverter_test')),
  project_id uuid references public.projects(id) on delete cascade,
  payload jsonb not null,
  status text not null default 'synced' check (status in ('pending', 'processing', 'synced', 'error')),
  synced_at timestamptz default now()
);

create index if not exists idx_sync_queue_engineer on public.engineer_sync_queue(engineer_id, synced_at desc);


-- 8. ROW LEVEL SECURITY (RLS) POLICIES (IDEMPOTENT)
-- ------------------------------------------------------------------------------
alter table public.client_profiles enable row level security;
alter table public.client_projects enable row level security;
alter table public.dataloggers enable row level security;
alter table public.telemetry_readings enable row level security;
alter table public.support_tickets enable row level security;
alter table public.project_documents enable row level security;
alter table public.leads enable row level security;
alter table public.maintenance_plans enable row level security;
alter table public.maintenance_visits enable row level security;
alter table public.engineer_sync_queue enable row level security;

-- Client Profiles
drop policy if exists "Users can read own client profile" on public.client_profiles;
create policy "Users can read own client profile" on public.client_profiles
  for select using (auth.uid() = id or coalesce(public.project_user_role() in ('md', 'dso', 'staff'), false));

drop policy if exists "Users can update own client profile" on public.client_profiles;
create policy "Users can update own client profile" on public.client_profiles
  for update using (auth.uid() = id);

-- Client Projects
drop policy if exists "Client view assigned projects" on public.client_projects;
create policy "Client view assigned projects" on public.client_projects
  for select using (
    auth.uid() = client_id or
    coalesce(public.project_user_role() in ('md', 'dso', 'staff'), false)
  );

-- Telemetry
drop policy if exists "View telemetry readings" on public.telemetry_readings;
create policy "View telemetry readings" on public.telemetry_readings
  for select using (
    exists (select 1 from public.client_projects cp where cp.project_id = telemetry_readings.project_id and cp.client_id = auth.uid())
    or coalesce(public.project_user_role() in ('md', 'dso', 'staff'), false)
  );

-- Support Tickets
drop policy if exists "View support tickets" on public.support_tickets;
create policy "View support tickets" on public.support_tickets
  for select using (
    client_id = auth.uid() or
    assigned_engineer_id = auth.uid() or
    coalesce(public.project_user_role() in ('md', 'dso'), false)
  );

drop policy if exists "Insert support tickets" on public.support_tickets;
create policy "Insert support tickets" on public.support_tickets
  for insert with check (auth.uid() is not null);

drop policy if exists "Update support tickets" on public.support_tickets;
create policy "Update support tickets" on public.support_tickets
  for update using (
    assigned_engineer_id = auth.uid() or
    coalesce(public.project_user_role() in ('md', 'dso'), false)
  );

-- Project Documents
drop policy if exists "View project documents" on public.project_documents;
create policy "View project documents" on public.project_documents
  for select using (
    exists (select 1 from public.client_projects cp where cp.project_id = project_documents.project_id and cp.client_id = auth.uid())
    or coalesce(public.project_user_role() in ('md', 'dso', 'staff'), false)
  );

-- Leads
drop policy if exists "Insert leads" on public.leads;
create policy "Insert leads" on public.leads
  for insert with check (true);

drop policy if exists "Manage leads" on public.leads;
create policy "Manage leads" on public.leads
  for all using (
    coalesce(public.project_user_role() in ('md', 'dso', 'staff'), false)
  );

-- Maintenance Visits
drop policy if exists "View maintenance visits" on public.maintenance_visits;
create policy "View maintenance visits" on public.maintenance_visits
  for select using (
    exists (select 1 from public.client_projects cp where cp.project_id = maintenance_visits.project_id and cp.client_id = auth.uid())
    or coalesce(public.project_user_role() in ('md', 'dso', 'staff'), false)
  );

drop policy if exists "Engineer create maintenance visit" on public.maintenance_visits;
create policy "Engineer create maintenance visit" on public.maintenance_visits
  for insert with check (
    coalesce(public.project_user_role() in ('md', 'dso', 'staff'), false)
  );

-- Engineer Sync Queue
drop policy if exists "Engineer sync queue access" on public.engineer_sync_queue;
create policy "Engineer sync queue access" on public.engineer_sync_queue
  for all using (engineer_id = auth.uid());


-- 9. SEED / DEMO DATA (WRAPPED SAFELY)
-- ------------------------------------------------------------------------------
do $$
declare
  v_project_id uuid;
begin
  select id into v_project_id from public.projects limit 1;

  if v_project_id is not null then
    -- Datalogger (Real Deye SUN-6K Hardware + Demo SN)
    insert into public.dataloggers (project_id, serial_number, model, is_online)
    values 
      (v_project_id, '3428625515', 'Deye SUN-6K-OG01LP1 (Wi-Fi Dongle)', true),
      (v_project_id, 'SN-4821907356', 'SUNPULSE Solar-Log 4G Pro', true)
    on conflict (serial_number) do nothing;

    -- Telemetry Reading
    insert into public.telemetry_readings (
      project_id, datalogger_sn, solar_kw, load_kw, battery_pct, battery_voltage, grid_status, today_generation_kwh, monthly_diesel_saved_ngn
    )
    values 
      (v_project_id, '3428625515', 3.8, 1.9, 82.0, 52.8, 'online', 19.2, 92000.00),
      (v_project_id, 'SN-4821907356', 3.2, 1.8, 78.0, 52.4, 'online', 18.4, 85000.00)
    on conflict do nothing;

    -- Documents
    insert into public.project_documents (project_id, title, doc_type, file_name, file_path, file_size_bytes, is_locked)
    values 
      (v_project_id, 'Single Line Diagram', 'sld', 'Main_Residence_SLD_Stamped.pdf', 'docs/sld.pdf', 1887436, false),
      (v_project_id, 'Warranty Certificate', 'warranty', 'Warranty_Jinko_Deye_2026.pdf', 'docs/warranty.pdf', 430080, false),
      (v_project_id, 'User Manual', 'manual', 'SUNPULSE_Solar_User_Manual_v2.pdf', 'docs/manual.pdf', 3250585, false),
      (v_project_id, 'Handover Sign-Off', 'handover', 'Commissioning_Handover_Pending.pdf', 'docs/handover.pdf', 524288, true)
    on conflict do nothing;

    -- Support Tickets
    insert into public.support_tickets (ticket_no, project_id, category, title, description, status, priority, sla_hours)
    values
      ('#1042', v_project_id, 'inverter', 'Inverter F24 grid error', 'Inverter tripping on generator phase transfer switch at Kaduna Clinic facility.', 'unassigned', 'emergency', 2),
      ('#1041', v_project_id, 'battery', 'Battery string balancing check', 'Rack 2 lithium cell drift exceeding 80mV during absorption cycle.', 'in_progress', 'high', 4),
      ('#1040', v_project_id, 'solar_pv', 'Quarterly panel clean & inspection', 'Routine dust clearance and cable tray inspection.', 'resolved', 'normal', 24)
    on conflict (ticket_no) do nothing;
  end if;
exception
  when others then
    raise notice 'Seed data note: %', sqlerrm;
end $$;
