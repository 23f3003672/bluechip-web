-- Migration: Add RLS policies for projects table
-- Run this in your Supabase Dashboard SQL Editor (https://supabase.com)

-- 1. Enable Row Level Security (RLS) if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 2. Policy: Allow public read access to everyone
DROP POLICY IF EXISTS "Allow public read on projects" ON public.projects;
CREATE POLICY "Allow public read on projects"
ON public.projects
FOR SELECT
USING (true);

-- 3. Policy: Allow authenticated users (admin panel) to insert new records
DROP POLICY IF EXISTS "Allow authenticated insert on projects" ON public.projects;
CREATE POLICY "Allow authenticated insert on projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. Policy: Allow authenticated users (admin panel) to update existing records
DROP POLICY IF EXISTS "Allow authenticated update on projects" ON public.projects;
CREATE POLICY "Allow authenticated update on projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Policy: Allow authenticated users (admin panel) to delete records
DROP POLICY IF EXISTS "Allow authenticated delete on projects" ON public.projects;
CREATE POLICY "Allow authenticated delete on projects"
ON public.projects
FOR DELETE
TO authenticated
USING (true);
