-- Revan Hills: initial owner-managed CMS schema.
-- Apply through the Supabase SQL Editor or Supabase CLI once the owner email allowlist is finalised.

create extension if not exists "uuid-ossp";

create type public.content_status as enum ('draft', 'published', 'archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'owner' check (role in ('owner', 'staff')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles (id, email, role) values (new.id, new.email, 'owner'); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create table public.faq_items (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  category text not null default 'General',
  related_page text,
  display_order integer not null default 0,
  status public.content_status not null default 'draft',
  last_reviewed_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.local_guides (
  id uuid primary key default uuid_generate_v4(),
  kind text not null check (kind in ('attraction', 'transfer', 'rental', 'route')),
  title text not null,
  description text,
  map_url text,
  contact_name text,
  contact_phone text,
  source_url text,
  last_verified_at date,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  summary text,
  body text,
  cover_media_path text,
  category text not null default 'Farm update',
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.faq_items enable row level security;
alter table public.local_guides enable row level security;
alter table public.posts enable row level security;

create policy "owners manage own profile" on public.profiles for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "published faqs are public" on public.faq_items for select using (status = 'published');
create policy "owners manage faqs" on public.faq_items for all to authenticated using (exists (select 1 from public.profiles where id = auth.uid() and role in ('owner', 'staff'))) with check (exists (select 1 from public.profiles where id = auth.uid() and role in ('owner', 'staff')));
create policy "published guides are public" on public.local_guides for select using (status = 'published');
create policy "owners manage guides" on public.local_guides for all to authenticated using (exists (select 1 from public.profiles where id = auth.uid() and role in ('owner', 'staff'))) with check (exists (select 1 from public.profiles where id = auth.uid() and role in ('owner', 'staff')));
create policy "published posts are public" on public.posts for select using (status = 'published');
create policy "owners manage posts" on public.posts for all to authenticated using (exists (select 1 from public.profiles where id = auth.uid() and role in ('owner', 'staff'))) with check (exists (select 1 from public.profiles where id = auth.uid() and role in ('owner', 'staff')));

insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "public reads media" on storage.objects for select using (bucket_id = 'media');
create policy "owners upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media');

-- Add invited owner email addresses before applying. Do not leave public sign-up open in production.
-- Recommended follow-up: configure Supabase Auth email confirmation and invite only Devang/Renu.
