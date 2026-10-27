-- ============================================================================
-- PRIDEWALLS: Unified Enquiries System Migration
-- ============================================================================
-- This migration creates the new `enquiries` table and migrates data from
-- the existing `leads` and `site_visits` tables.
--
-- New terminology:
--   enquiries          = Unified customer enquiry table
--   property_enquiry  = General property/project enquiry
--   site_visit_request = Customer requesting a site visit
--
-- IMPORTANT:
-- Run this in Supabase SQL Editor.
-- Do NOT run against production without proper backup and testing.
-- ============================================================================


-- ============================================================================
-- STEP 1: Create the new unified `enquiries` table
-- ============================================================================

create table if not exists public.enquiries (
  id bigint generated always as identity not null,

  -- ==========================================================================
  -- Customer Identity
  -- ==========================================================================

  name text not null,
  email text null,  -- Made optional - many customers only have mobile/WhatsApp
  mobile text not null,


  -- ==========================================================================
  -- Enquiry Classification
  -- ==========================================================================
  -- property_enquiry  = General enquiry about a property/project
  -- site_visit_request = Customer requesting a site visit
  -- ==========================================================================

  enquiry_type text not null default 'property_enquiry',
  status text not null default 'new',


  -- ==========================================================================
  -- Common Enquiry Information
  -- ==========================================================================

  property_interest text null,
  preferred_contact text null,
  message text null,


  -- ==========================================================================
  -- Site Visit Information
  -- ==========================================================================
  -- These fields are primarily used when enquiry_type is
  -- `site_visit_request`.
  -- ==========================================================================

  preferred_date date null,
  preferred_slot text null,
  project_name text null,
  notes text null,


  -- ==========================================================================
  -- Marketing / Source Information
  -- ==========================================================================

  source text null,


  -- ==========================================================================
  -- Compliance
  -- ==========================================================================

  consent boolean not null default false,


  -- ==========================================================================
  -- Audit
  -- ==========================================================================

  submitted_at timestamp with time zone not null default now(),


  -- ==========================================================================
  -- Primary Key
  -- ==========================================================================

  constraint enquiries_pkey
    primary key (id),


  -- ==========================================================================
  -- Enquiry Type Validation
  -- ==========================================================================

  constraint enquiries_type_check
    check (
      enquiry_type in (
        'property_enquiry',
        'site_visit_request'
      )
    ),


  -- ==========================================================================
  -- Enquiry Status Validation
  -- ==========================================================================

  constraint enquiries_status_check
    check (
      status in (
        'new',
        'contacted',
        'follow_up',
        'site_visit_scheduled',
        'site_visit_completed',
        'converted',
        'lost',
        'cancelled'
      )
    ),


  -- ==========================================================================
  -- Site Visit Required Fields
  -- ==========================================================================
  -- For a normal property enquiry:
  --   property_interest, preferred_date and preferred_slot are optional.
  --
  -- For a site visit request:
  --   property_interest, preferred_date and preferred_slot are required.
  -- ==========================================================================

  constraint site_visit_required_fields
    check (
      enquiry_type = 'property_enquiry'
      or (
        property_interest is not null
        and preferred_date is not null
        and preferred_slot is not null
      )
    )
);


-- ============================================================================
-- STEP 1.1: Indexes for Performance
-- ============================================================================

create index if not exists enquiries_submitted_at_idx
on public.enquiries (submitted_at desc);


create index if not exists enquiries_type_idx
on public.enquiries (enquiry_type);


create index if not exists enquiries_status_idx
on public.enquiries (status);


create index if not exists enquiries_preferred_date_idx
on public.enquiries (preferred_date);


-- ============================================================================
-- STEP 2: Migrate Existing Leads Data
-- ============================================================================

-- First, check if the `leads` table exists.
--
-- Existing lead records will be converted into:
--
--   enquiry_type = property_enquiry
--   status       = new
--
-- Existing lead information will be preserved.
-- ============================================================================

do $$
begin

  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'leads'
  ) then

    -- ========================================================================
    -- Migrate leads to enquiries
    -- ========================================================================

    insert into public.enquiries (
      name,
      email,
      mobile,
      enquiry_type,
      status,
      property_interest,
      preferred_contact,
      message,
      consent,
      submitted_at
    )

    select
      name,
      email,
      mobile,
      'property_enquiry' as enquiry_type,
      'new' as status,
      interested_in as property_interest,
      preferred_contact,
      message,
      consent,
      submitted_at

    from public.leads

    on conflict do nothing;


    -- ========================================================================
    -- Migration Notice
    -- ========================================================================

    raise notice
      'Migrated % leads to enquiries',
      (
        select count(*)
        from public.leads
      );


  else

    -- ========================================================================
    -- Leads Table Does Not Exist
    -- ========================================================================

    raise notice
      'leads table does not exist, skipping migration';

  end if;

end $$;


-- ============================================================================
-- STEP 3: Migrate Existing Site Visits Data
-- ============================================================================

-- Existing site visit records will be converted into:
--
--   enquiry_type = site_visit_request
--   status       = new
--
-- Existing site visit information will be preserved.
-- ============================================================================

do $$
begin

  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'site_visits'
  ) then

    -- ========================================================================
    -- Migrate site_visits to enquiries
    -- ========================================================================

    insert into public.enquiries (
      name,
      email,
      mobile,
      enquiry_type,
      status,
      property_interest,
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
      'site_visit_request' as enquiry_type,
      'new' as status,
      interested_in as property_interest,
      preferred_date,
      preferred_slot,
      project_name,
      notes,
      source_label as source,
      consent,
      submitted_at

    from public.site_visits

    on conflict do nothing;


    -- ========================================================================
    -- Migration Notice
    -- ========================================================================

    raise notice
      'Migrated % site visits to enquiries',
      (
        select count(*)
        from public.site_visits
      );


  else

    -- ========================================================================
    -- Site Visits Table Does Not Exist
    -- ========================================================================

    raise notice
      'site_visits table does not exist, skipping migration';

  end if;

end $$;


-- ============================================================================
-- STEP 4: Verify Migration
-- ============================================================================

-- ============================================================================
-- Check Total Enquiries
-- ============================================================================

select
  'Total enquiries' as metric,
  count(*) as count
from public.enquiries

union all

-- ============================================================================
-- Check Property Enquiries
-- ============================================================================

select
  'Property Enquiries' as metric,
  count(*) as count
from public.enquiries
where enquiry_type = 'property_enquiry'

union all

-- ============================================================================
-- Check Site Visit Requests
-- ============================================================================

select
  'Site Visit Requests' as metric,
  count(*) as count
from public.enquiries
where enquiry_type = 'site_visit_request';


-- ============================================================================
-- STEP 4.1: Verify Enquiry Status Distribution
-- ============================================================================

select
  status,
  count(*) as count
from public.enquiries
group by status
order by status;


-- ============================================================================
-- STEP 4.2: Verify Enquiry Type Distribution
-- ============================================================================

select
  enquiry_type,
  count(*) as count
from public.enquiries
group by enquiry_type
order by enquiry_type;


-- ============================================================================
-- STEP 4.3: View Recently Submitted Enquiries
-- ============================================================================

select
  id,
  name,
  email,
  mobile,
  enquiry_type,
  status,
  property_interest,
  preferred_contact,
  preferred_date,
  preferred_slot,
  project_name,
  source,
  submitted_at
from public.enquiries
order by submitted_at desc
limit 50;


-- ============================================================================
-- STEP 5: Optional - Drop Old Tables
-- ============================================================================

-- WARNING:
--
-- ONLY run these statements after:
--
-- 1. Confirming that all leads were migrated.
-- 2. Confirming that all site visits were migrated.
-- 3. Verifying the counts.
-- 4. Testing the application with the new `enquiries` table.
-- 5. Updating your backend API.
-- 6. Updating your frontend.
-- 7. Confirming that no application code still uses `leads` or `site_visits`.
--
-- DO NOT execute these immediately after the migration.
-- ============================================================================


-- drop table if exists public.leads;
-- drop table if exists public.site_visits;


-- ============================================================================
-- STEP 6: Remove Old Environment Variables
-- ============================================================================

-- After the application has been fully migrated to `enquiries`,
-- remove these old environment variables if they are no longer used:
--
-- SUPABASE_LEADS_TABLE
-- SUPABASE_SITE_VISITS_TABLE
--
-- If `PLOTS_VIEW_PASSWORD` was only being used by the old views,
-- it can also be removed if it is no longer required.
-- ============================================================================


-- ============================================================================
-- STEP 7: Recommended New Environment Variable
-- ============================================================================

-- Use a single environment variable for the unified table:
--
-- SUPABASE_ENQUIRIES_TABLE=enquiries
--
-- ============================================================================


-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
--
-- Final database structure:
--
-- public.enquiries
--
--   Customer:
--     name
--     email
--     mobile
--
--   Classification:
--     enquiry_type
--     status
--
--   Property:
--     property_interest
--     project_name
--
--   Contact:
--     preferred_contact
--     message
--
--   Site Visit:
--     preferred_date
--     preferred_slot
--
--   Additional:
--     notes
--     source
--     consent
--     submitted_at
--
--
-- Enquiry Types:
--
--   property_enquiry
--   site_visit_request
--
--
-- Statuses:
--
--   new
--   contacted
--   follow_up
--   site_visit_scheduled
--   site_visit_completed
--   converted
--   lost
--   cancelled
--
-- ============================================================================
