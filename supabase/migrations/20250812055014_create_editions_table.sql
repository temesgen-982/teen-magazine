-- Create editions table
create table public.editions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  published_at timestamptz default now(),
  file_url text, -- link to the PDF or downloadable file
  cover_image_url text, -- link to the cover image
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.editions enable row level security;

-- Public can read editions
create policy "Public can view editions"
on public.editions for select
using (true);

-- Only admins can insert/update/delete editions
create policy "Admins can manage editions"
on public.editions for all
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

