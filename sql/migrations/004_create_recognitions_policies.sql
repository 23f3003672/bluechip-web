-- Migration: Add category column and enable RLS policies for recognitions table
-- Run this in your Supabase Dashboard SQL Editor (https://supabase.com)

-- 1. Ensure category column exists
ALTER TABLE public.recognitions ADD COLUMN IF NOT EXISTS category text DEFAULT 'industry-awards';

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.recognitions ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public read access to everyone
DROP POLICY IF EXISTS "Allow public read" ON public.recognitions;
CREATE POLICY "Allow public read"
ON public.recognitions
FOR SELECT
USING (published = true OR auth.role() = 'authenticated');

-- 4. Policy: Allow authenticated users (admin panel) to insert new records
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.recognitions;
CREATE POLICY "Allow authenticated insert"
ON public.recognitions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 5. Policy: Allow authenticated users (admin panel) to update existing records
DROP POLICY IF EXISTS "Allow authenticated update" ON public.recognitions;
CREATE POLICY "Allow authenticated update"
ON public.recognitions
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Policy: Allow authenticated users (admin panel) to delete records
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.recognitions;
CREATE POLICY "Allow authenticated delete"
ON public.recognitions
FOR DELETE
TO authenticated
USING (true);
