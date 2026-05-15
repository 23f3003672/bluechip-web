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
