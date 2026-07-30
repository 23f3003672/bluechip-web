-- Migration: Add RLS policies for visionaries table
-- Run this in your Supabase Dashboard SQL Editor (https://supabase.com)

-- 1. Create the visionaries table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.visionaries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    designation text NOT NULL,
    bio text,
    image_url text,
    linkedin_url text,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.visionaries ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public read access to everyone
DROP POLICY IF EXISTS "Allow public read on visionaries" ON public.visionaries;
CREATE POLICY "Allow public read on visionaries"
ON public.visionaries
FOR SELECT
USING (true);

-- 4. Policy: Allow authenticated users (admin panel) to insert new records
DROP POLICY IF EXISTS "Allow authenticated insert on visionaries" ON public.visionaries;
CREATE POLICY "Allow authenticated insert on visionaries"
ON public.visionaries
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 5. Policy: Allow authenticated users (admin panel) to update existing records
DROP POLICY IF EXISTS "Allow authenticated update on visionaries" ON public.visionaries;
CREATE POLICY "Allow authenticated update on visionaries"
ON public.visionaries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Policy: Allow authenticated users (admin panel) to delete records
DROP POLICY IF EXISTS "Allow authenticated delete on visionaries" ON public.visionaries;
CREATE POLICY "Allow authenticated delete on visionaries"
ON public.visionaries
FOR DELETE
TO authenticated
USING (true);
