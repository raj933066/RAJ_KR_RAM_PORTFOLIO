create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(), name text not null default '', headline text not null default '',
  bio text not null default '', about text not null default '', profile_image_url text, resume_url text,
  email text, phone text, location text, github_url text, linkedin_url text, leetcode_url text, twitter_url text,
  github_username text, typed_strings jsonb not null default '[]'::jsonb, updated_at timestamptz not null default now()
);
create table if not exists projects (id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', image_url text, github_url text, live_url text, technologies jsonb not null default '[]'::jsonb, features jsonb not null default '[]'::jsonb, featured boolean not null default false, display_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists skills (id uuid primary key default gen_random_uuid(), name text not null, category text not null, icon text, proficiency integer not null default 0 check (proficiency between 0 and 100), display_order integer not null default 0);
create table if not exists education (id uuid primary key default gen_random_uuid(), institution text not null, degree text not null, field text, period text, start_date date, end_date date, description text, display_order integer not null default 0);
create table if not exists experience (id uuid primary key default gen_random_uuid(), company text not null, role text not null, location text, period text, start_date date, end_date date, description text, points jsonb not null default '[]'::jsonb, technologies jsonb not null default '[]'::jsonb, display_order integer not null default 0);
create table if not exists courses (id uuid primary key default gen_random_uuid(), name text not null, platform text, description text, certificate_url text, completion_date date, display_order integer not null default 0);
create table if not exists certifications (id uuid primary key default gen_random_uuid(), name text not null, issuer text, certificate_url text, issue_date text, expiry_date text, display_order integer not null default 0);
create table if not exists achievements (id uuid primary key default gen_random_uuid(), title text not null, description text, date text, link text, icon text, display_order integer not null default 0);
create table if not exists admin_users (user_id uuid primary key references auth.users(id) on delete cascade);
alter table admin_users enable row level security;

do $$ declare table_name text; begin
  foreach table_name in array array['profiles','projects','skills','education','experience','courses','certifications','achievements'] loop
    execute format('alter table %I enable row level security', table_name);
    execute format('drop policy if exists "Public can read %I" on %I', table_name, table_name);
    execute format('create policy "Public can read %I" on %I for select using (true)', table_name, table_name);
    execute format('drop policy if exists "Authenticated admins can write %I" on %I', table_name, table_name);
    execute format('create policy "Authenticated admins can write %I" on %I for all to authenticated using (exists (select 1 from public.admin_users where user_id = auth.uid())) with check (exists (select 1 from public.admin_users where user_id = auth.uid()))', table_name, table_name);
  end loop;
end $$;

insert into storage.buckets (id, name, public) values
  ('profile-images', 'profile-images', true), ('project-images', 'project-images', true),
  ('certificates', 'certificates', true), ('resume', 'resume', true)
on conflict (id) do nothing;
create policy "Public files are readable" on storage.objects for select using (bucket_id in ('profile-images','project-images','certificates','resume'));
create policy "Authenticated admins can upload files" on storage.objects for insert to authenticated with check (bucket_id in ('profile-images','project-images','certificates','resume') and exists (select 1 from public.admin_users where user_id = auth.uid()));
create policy "Authenticated admins can update files" on storage.objects for update to authenticated using (bucket_id in ('profile-images','project-images','certificates','resume') and exists (select 1 from public.admin_users where user_id = auth.uid()));
create policy "Authenticated admins can delete files" on storage.objects for delete to authenticated using (bucket_id in ('profile-images','project-images','certificates','resume') and exists (select 1 from public.admin_users where user_id = auth.uid()));
