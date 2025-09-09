insert into storage.buckets
  (id, name, public)
values
  ('edition-files', 'edition-files', false);

insert into storage.buckets
  (id, name, public)
values
  ('cover-images', 'cover-images', true);

create policy "Admins can manage all edition files"
on storage.objects for all
using (
  bucket_id = 'edition-files' and
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);

create policy "Authenticated users can read edition files"
on storage.objects for select
using (
  bucket_id = 'edition-files' and
  auth.role() = 'authenticated'
);


create policy "Admins can manage cover images"
on storage.objects
for all
with check (
  bucket_id = 'cover-images'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

