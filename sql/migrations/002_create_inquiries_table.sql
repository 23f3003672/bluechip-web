-- Migration: create contact_inquiries table
-- Run this in Supabase SQL editor or via psql

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  company_name text,
  email text NOT NULL,
  phone text,
  service text,
  location text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public submission)
CREATE POLICY "Allow public insert"
ON public.contact_inquiries
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view inquiries
CREATE POLICY "Allow authenticated read"
ON public.contact_inquiries
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to delete inquiries
CREATE POLICY "Allow authenticated delete"
ON public.contact_inquiries
FOR DELETE
TO authenticated
USING (true);

