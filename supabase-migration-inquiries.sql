-- ============================================================================
-- PRIDEWALLS: Unified Inquiries System Migration
-- ============================================================================
-- This migration creates the new `inquiries` table and migrates data from
-- the existing `leads` and `site_visits` tables.
-- 
-- IMPORTANT: Run this in Supabase SQL Editor. Do NOT run against production
-- without proper backup and testing.
-- ============================================================================

-- ============================================================================
-- STEP 1: Create the new unified `inquiries` table
-- ============================================================================

create table if not exists public.inquiries (
  id bigint generated always as identity not null,

  -- Identity
  name text not null,
  email text not null,
  mobile text not null,

  -- Classification
  inquiry_type text not null default 'LEAD',
  status text not null default 'NEW',

  -- Common enquiry information
  interested_in text null,
  preferred_contact text null,
  message text null,

  -- Site visit information
  preferred_date date null,
  preferred_slot text null,
  project_name text null,
  notes text null,

  -- Marketing
  source text null,

  -- Compliance
  consent boolean not null default false,

  -- Audit
  submitted_at timestamp with time zone not null default now(),

  constraint inquiries_pkey
    primary key (id),

  constraint inquiries_type_check
    check (
      inquiry_type in ('LEAD', 'SITE_VISIT')
    ),

  constraint inquiries_status_check
    check (
      status in (
        'NEW',
        'CONTACTED',
        'FOLLOW_UP',
        'SITE_VISIT_SCHEDULED',
        'SITE_VISIT_COMPLETED',
        'CONVERTED',
        'LOST',
        'CANCELLED'
      )
    ),

  constraint site_visit_required_fields
    check (
      inquiry_type = 'LEAD'
      or (
        interested_in is not null
        and preferred_date is not null
        and preferred_slot is not null
      )
    )
);

-- Indexes for performance
create index if not exists inquiries_submitted_at_idx
on public.inquiries (submitted_at desc);

create index if not exists inquiries_type_idx
on public.inquiries (inquiry_type);

create index if not exists inquiries_status_idx
on public.inquiries (status);

create index if not exists inquiries_preferred_date_idx
on public.inquiries (preferred_date);

-- ============================================================================
-- STEP 2: Migrate existing leads data
-- ============================================================================

-- First, check if the leads table exists
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'leads') then
    -- Migrate leads to inquiries
    insert into public.inquiries (
      name,
      email,
      mobile,
      inquiry_type,
      status,
      interested_in,
      preferred_contact,
      message,
      consent,
      submitted_at
    )
    select
      name,
      email,
      mobile,
      'LEAD' as inquiry_type,
      'NEW' as status,
      interested_in,
      preferred_contact,
      message,
      consent,
      submitted_at
    from public.leads
    on conflict do nothing;
    
    raise notice 'Migrated % leads to inquiries', (select count(*) from public.leads);
  else
    raise notice 'leads table does not exist, skipping migration';
  end if;
end $$;

-- ============================================================================
-- STEP 3: Migrate existing site_visits data
-- ============================================================================

do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'site_visits') then
    -- Migrate site_visits to inquiries
    insert into public.inquiries (
      name,
      email,
      mobile,
      inquiry_type,
      status,
      interested_in,
      preferred_date,
      preferred_slot,
      project_name,
      notes,
      source,
      consent,
      submitted_at
    )
    select
      name,
      email,
      mobile,
      'SITE_VISIT' as inquiry_type,
      'NEW' as status,
      interested_in,
      preferred_date,
      preferred_slot,
      project_name,
      notes,
      source_label,
      consent,
      submitted_at
    from public.site_visits
    on conflict do nothing;
    
    raise notice 'Migrated % site visits to inquiries', (select count(*) from public.site_visits);
  else
    raise notice 'site_visits table does not exist, skipping migration';
  end if;
end $$;

-- ============================================================================
-- STEP 4: Verify migration
-- ============================================================================

-- Check total count
select 
  'Total inquiries' as metric,
  count(*) as count
from public.inquiries
union all
select 
  'Leads' as metric,
  count(*) as count
from public.inquiries
where inquiry_type = 'LEAD'
union all
select 
  'Site Visits' as metric,
  count(*) as count
from public.inquiries
where inquiry_type = 'SITE_VISIT';

-- ============================================================================
-- STEP 5: (Optional) After verification, you can drop old tables
-- ============================================================================
-- WARNING: Only run these after confirming the migration is successful!
-- 
-- drop table if exists public.leads;
-- drop table if exists public.site_visits;
-- 
-- Also remove old environment variables:
-- SUPABASE_LEADS_TABLE
-- SUPABASE_SITE_VISITS_TABLE
-- PLOTS_VIEW_PASSWORD (if no longer needed for old views)