-- Migration: create job_applications table
-- Run this in Supabase SQL editor or via psql

CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id uuid REFERENCES public.careers(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  resume_url text NOT NULL,
  cover_letter text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can apply)
DROP POLICY IF EXISTS "Allow public application submission" ON public.job_applications;
CREATE POLICY "Allow public application submission"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view applications
DROP POLICY IF EXISTS "Allow admin read" ON public.job_applications;
CREATE POLICY "Allow admin read"
ON public.job_applications
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to delete applications
DROP POLICY IF EXISTS "Allow admin delete" ON public.job_applications;
CREATE POLICY "Allow admin delete"
ON public.job_applications
FOR DELETE
TO authenticated
USING (true);
