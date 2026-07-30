-- Migration: Add RLS policies for settings table
-- Run this in your Supabase Dashboard SQL Editor (https://supabase.com)

-- 1. Create the settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.settings (
    key text PRIMARY KEY,
    value jsonb NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public read access to everyone
DROP POLICY IF EXISTS "Allow public read on settings" ON public.settings;
CREATE POLICY "Allow public read on settings"
ON public.settings
FOR SELECT
USING (true);

-- 4. Policy: Allow authenticated users (admin panel) to insert new records
DROP POLICY IF EXISTS "Allow authenticated insert on settings" ON public.settings;
CREATE POLICY "Allow authenticated insert on settings"
ON public.settings
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 5. Policy: Allow authenticated users (admin panel) to update existing records
DROP POLICY IF EXISTS "Allow authenticated update on settings" ON public.settings;
CREATE POLICY "Allow authenticated update on settings"
ON public.settings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Policy: Allow authenticated users (admin panel) to delete records
DROP POLICY IF EXISTS "Allow authenticated delete on settings" ON public.settings;
CREATE POLICY "Allow authenticated delete on settings"
ON public.settings
FOR DELETE
TO authenticated
USING (true);
