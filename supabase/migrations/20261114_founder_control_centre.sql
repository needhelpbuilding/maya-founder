-- ============================================================================
-- FOUNDER CONTROL CENTRE & INFRASTRUCTURE MONITORING SCHEMA
-- Complements existing Reception Operations schema
-- ============================================================================

-- 1. Service Registry (for API & Infrastructure Monitoring)
create table if not exists public.service_registry (
  id uuid primary key default gen_random_uuid(),
  service_name text not null,
  service_type text not null, -- 'website', 'supabase_db', 'supabase_auth', 'payments_razorpay', 'webhook_razorpay', 'whatsapp_api', 'email_service', 'file_storage'
  endpoint_reference text,
  environment text not null default 'production' check (environment in ('production', 'staging', 'development')),
  is_enabled boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Service Health Checks (Telemetry & Periodic Checks)
create table if not exists public.service_health_checks (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.service_registry(id) on delete cascade,
  status text not null check (status in ('Operational', 'Degraded', 'Down', 'Not configured', 'Unknown')),
  response_time_ms integer default 0,
  checked_at timestamptz default now(),
  error_code text,
  safe_error_message text
);
create index if not exists idx_health_checks_service on public.service_health_checks(service_id, checked_at desc);

-- 3. Service Incidents (Infrastructure Downtime & Resolution Tracking)
create table if not exists public.service_incidents (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.service_registry(id) on delete set null,
  title text not null,
  severity text not null check (severity in ('critical', 'major', 'minor', 'maintenance')),
  status text not null default 'investigating' check (status in ('investigating', 'identified', 'monitoring', 'resolved')),
  started_at timestamptz default now(),
  resolved_at timestamptz,
  resolution_notes text
);

-- 4. Website Analytics Snapshots (Aggregated Daily/Hourly GA4 or Server-side Metrics)
create table if not exists public.website_analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'Google Analytics 4',
  metric_name text not null, -- 'visitors', 'sessions', 'pageviews', 'appointment_clicks', 'conversions'
  metric_value numeric(12, 2) not null,
  period_start timestamptz not null,
  period_end timestamptz not null,
  captured_at timestamptz default now()
);

-- 5. Integration Registry (Health & Credentials status for External Integrations)
create table if not exists public.integration_registry (
  id uuid primary key default gen_random_uuid(),
  integration_name text not null unique,
  integration_type text not null, -- 'payment_gateway', 'whatsapp_cloud_api', 'smtp_email', 'google_analytics', 'supabase', 'cloud_storage'
  connection_status text not null default 'Not connected' check (connection_status in ('Connected', 'Degraded', 'Not connected', 'Pending configuration')),
  last_sync_at timestamptz,
  last_error_at timestamptz,
  last_error_message text,
  environment text not null default 'production',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Enable RLS
alter table public.service_registry enable row level security;
alter table public.service_health_checks enable row level security;
alter table public.service_incidents enable row level security;
alter table public.website_analytics_snapshots enable row level security;
alter table public.integration_registry enable row level security;

-- Founder & Staff policies
create policy "Allow authenticated read service_registry" on public.service_registry for select to authenticated using (true);
create policy "Allow authenticated modify service_registry" on public.service_registry for all to authenticated using (true);

create policy "Allow authenticated read service_health_checks" on public.service_health_checks for select to authenticated using (true);
create policy "Allow authenticated insert service_health_checks" on public.service_health_checks for insert to authenticated with check (true);

create policy "Allow authenticated read service_incidents" on public.service_incidents for select to authenticated using (true);
create policy "Allow authenticated modify service_incidents" on public.service_incidents for all to authenticated using (true);

create policy "Allow authenticated read website_analytics_snapshots" on public.website_analytics_snapshots for select to authenticated using (true);
create policy "Allow authenticated insert website_analytics_snapshots" on public.website_analytics_snapshots for insert to authenticated with check (true);

create policy "Allow authenticated read integration_registry" on public.integration_registry for select to authenticated using (true);
create policy "Allow authenticated modify integration_registry" on public.integration_registry for all to authenticated using (true);
