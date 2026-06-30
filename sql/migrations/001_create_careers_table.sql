-- Migration: create careers table
-- Run this in Supabase SQL editor or via psql

CREATE TABLE IF NOT EXISTS public.careers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  location text,
  employment_type text,
  department text,
  responsibilities text,
  qualifications text,
  posted_at timestamptz,
  closing_date timestamptz,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Alter table to add attachment support
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS responsibilities_file_url text;
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS qualifications_file_url text;

-- Enable Row Level Security
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

-- Allow public users (anonymous or authenticated) to view published jobs
DROP POLICY IF EXISTS "Allow public read" ON public.careers;
CREATE POLICY "Allow public read"
ON public.careers
FOR SELECT
USING (published = true OR auth.role() = 'authenticated');

-- Allow authenticated users to manage careers
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.careers;
CREATE POLICY "Allow authenticated insert"
ON public.careers
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update" ON public.careers;
CREATE POLICY "Allow authenticated update"
ON public.careers
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete" ON public.careers;
CREATE POLICY "Allow authenticated delete"
ON public.careers
FOR DELETE
TO authenticated
USING (true);


