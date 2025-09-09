CREATE TABLE public.reading_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    edition_id UUID NOT NULL REFERENCES public.editions(id) ON DELETE CASCADE,
    last_read_at TIMESTAMPTZ DEFAULT NOW(),

    -- Ensure a user can only have one history entry per edition.
    UNIQUE (user_id, edition_id)
);

ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;

-- A user can only manage their own reading history.
CREATE POLICY "Users can manage their own reading history"
ON public.reading_history FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
