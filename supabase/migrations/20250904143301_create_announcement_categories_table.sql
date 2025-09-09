CREATE TABLE public.announcement_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

-- Foreign key column to the announcements table
ALTER TABLE public.announcements
ADD COLUMN category_id UUID REFERENCES public.announcement_categories(id) ON DELETE SET NULL;

-- Pre-populate the categories table
INSERT INTO public.announcement_categories (name) VALUES
    ('training'),
    ('volunteer'),
    ('event'),
    ('contest'),
    ('art'),
    ('hackathon'),
    ('scholarship'),
    ('bootcamp'),
    ('new-release'),
    ('cohort');
