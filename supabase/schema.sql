-- iDM CMS schema. All objects are prefixed idm_ because the Supabase project is shared.

create extension if not exists pgcrypto;

create or replace function public.idm_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Admin profiles: only users with a row here can access the CMS.
create table if not exists public.idm_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'admin' check (role in ('owner', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.idm_is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.idm_profiles where id = auth.uid());
$$;

-- Auto-create a profile for users who sign up through the iDM admin (metadata app = 'idm').
create or replace function public.idm_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if coalesce(new.raw_user_meta_data ->> 'app', '') = 'idm' then
    insert into public.idm_profiles (id, email, full_name, role)
    values (
      new.id,
      new.email,
      new.raw_user_meta_data ->> 'full_name',
      case when exists (select 1 from public.idm_profiles) then 'admin' else 'owner' end
    )
    on conflict (id) do nothing;
  end if;
  return new;
end $$;

drop trigger if exists idm_on_auth_user_created on auth.users;
create trigger idm_on_auth_user_created
  after insert on auth.users
  for each row execute function public.idm_handle_new_user();

create table if not exists public.idm_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  category text not null default 'Insights',
  tags text[] not null default '{}',
  author_name text not null default 'iDM Team',
  read_minutes int not null default 5,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idm_posts_status_published_idx on public.idm_posts (status, published_at desc);
drop trigger if exists idm_posts_updated_at on public.idm_posts;
create trigger idm_posts_updated_at before update on public.idm_posts for each row execute function public.idm_set_updated_at();

create table if not exists public.idm_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  eyebrow text not null default '',
  hero_title text not null default '',
  hero_sub text not null default '',
  content text not null default '',
  cta_label text not null default '',
  cta_href text not null default '',
  show_in_nav boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists idm_pages_updated_at on public.idm_pages;
create trigger idm_pages_updated_at before update on public.idm_pages for each row execute function public.idm_set_updated_at();

create table if not exists public.idm_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  business text,
  interest text,
  message text,
  source text not null default 'contact-page',
  page_path text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idm_leads_created_idx on public.idm_leads (created_at desc);
drop trigger if exists idm_leads_updated_at on public.idm_leads;
create trigger idm_leads_updated_at before update on public.idm_leads for each row execute function public.idm_set_updated_at();

-- Row level security
alter table public.idm_profiles enable row level security;
alter table public.idm_posts enable row level security;
alter table public.idm_pages enable row level security;
alter table public.idm_leads enable row level security;

drop policy if exists idm_profiles_self_read on public.idm_profiles;
create policy idm_profiles_self_read on public.idm_profiles for select to authenticated using (public.idm_is_admin());

drop policy if exists idm_posts_public_read on public.idm_posts;
create policy idm_posts_public_read on public.idm_posts for select to anon, authenticated using (status = 'published' or public.idm_is_admin());
drop policy if exists idm_posts_admin_write on public.idm_posts;
create policy idm_posts_admin_write on public.idm_posts for all to authenticated using (public.idm_is_admin()) with check (public.idm_is_admin());

drop policy if exists idm_pages_public_read on public.idm_pages;
create policy idm_pages_public_read on public.idm_pages for select to anon, authenticated using (status = 'published' or public.idm_is_admin());
drop policy if exists idm_pages_admin_write on public.idm_pages;
create policy idm_pages_admin_write on public.idm_pages for all to authenticated using (public.idm_is_admin()) with check (public.idm_is_admin());

drop policy if exists idm_leads_public_insert on public.idm_leads;
create policy idm_leads_public_insert on public.idm_leads for insert to anon, authenticated with check (char_length(name) between 1 and 200);
drop policy if exists idm_leads_admin_read on public.idm_leads;
create policy idm_leads_admin_read on public.idm_leads for select to authenticated using (public.idm_is_admin());
drop policy if exists idm_leads_admin_update on public.idm_leads;
create policy idm_leads_admin_update on public.idm_leads for update to authenticated using (public.idm_is_admin()) with check (public.idm_is_admin());
drop policy if exists idm_leads_admin_delete on public.idm_leads;
create policy idm_leads_admin_delete on public.idm_leads for delete to authenticated using (public.idm_is_admin());
