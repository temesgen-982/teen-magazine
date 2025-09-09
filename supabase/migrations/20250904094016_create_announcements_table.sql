CREATE TABLE public.announcements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    image_url TEXT, 
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    published_by TEXT DEFAULT 'By editorial team',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Anyone can read announcements.
CREATE POLICY "Public can view announcements"
ON public.announcements FOR SELECT
USING (true);

-- Only admins can create, update, or delete announcements.
CREATE POLICY "Admins can manage announcements"
ON public.announcements FOR ALL -- Applies to INSERT, UPDATE, DELETE
USING (
    exists (
        select 1
        from public.profiles
        where profiles.id = auth.uid() and profiles.role = 'admin'
    )
);


-- === STORAGE SETUP FOR ANNOUNCEMENT IMAGES ===

-- PUBLIC bucket for announcement images.
INSERT INTO storage.buckets
    (id, name, public)
VALUES
    ('announcement-images', 'announcement-images', TRUE);

-- Only admins can upload, update, or delete images.
CREATE POLICY "Admins can manage announcement images"
ON storage.objects FOR ALL
WITH CHECK (
    bucket_id = 'announcement-images' AND
    exists (
        select 1
        from public.profiles
        where profiles.id = auth.uid() and profiles.role = 'admin'
    )
);
