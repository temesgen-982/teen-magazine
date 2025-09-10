create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),

  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Users can insert their own profile"
on profiles for INSERT
with check ( (auth.uid()) = id);

create policy "Users can update their own profile"
on profiles for UPDATE
using ( (auth.uid()) = id);

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins full access"
ON public.profiles
FOR ALL
USING (auth.role() = 'admin');

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
