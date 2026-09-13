-- Migration: Create hero_slides table with RLS and seed with the 7 specified projects
-- Run this in your Supabase Dashboard SQL Editor (https://supabase.com)

-- 1. Create the hero_slides table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url text NOT NULL,
    category text NOT NULL,
    tagline text NOT NULL,
    project_name text NOT NULL,
    video_url text,
    project_href text DEFAULT '/projects' NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Public read access
DROP POLICY IF EXISTS "Allow public read on hero_slides" ON public.hero_slides;
CREATE POLICY "Allow public read on hero_slides"
ON public.hero_slides
FOR SELECT
USING (true);

-- 4. Policy: Authenticated admin insert
DROP POLICY IF EXISTS "Allow authenticated insert on hero_slides" ON public.hero_slides;
CREATE POLICY "Allow authenticated insert on hero_slides"
ON public.hero_slides
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 5. Policy: Authenticated admin update
DROP POLICY IF EXISTS "Allow authenticated update on hero_slides" ON public.hero_slides;
CREATE POLICY "Allow authenticated update on hero_slides"
ON public.hero_slides
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Policy: Authenticated admin delete
DROP POLICY IF EXISTS "Allow authenticated delete on hero_slides" ON public.hero_slides;
CREATE POLICY "Allow authenticated delete on hero_slides"
ON public.hero_slides
FOR DELETE
TO authenticated
USING (true);

-- 7. Truncate existing slides and seed the 7 projects in the exact specified order
TRUNCATE TABLE public.hero_slides;

INSERT INTO public.hero_slides (image_url, category, tagline, project_name, video_url, project_href, sort_order, is_active)
VALUES
  (
    '/home/hero/hero-image-5.webp',
    'Facade Engineering',
    'Building Gateways to Tomorrow.',
    'Porbandar Airport, Porbandar',
    'https://www.youtube.com/embed/-QCmjqlb79Q?rel=0',
    '/projects',
    1,
    true
  ),
  (
    '/home/hero/hero-image-4.webp',
    'Facade Engineering',
    'Engineering Iconic Architectural Facades.',
    'Hotel Leela, Gandhinagar',
    'https://www.instagram.com/reel/CqXGxvFj-6p/embed',
    '/projects',
    2,
    true
  ),
  (
    '/home/hero/hero-image-1.webp',
    'EPC',
    'Engineering India''s High-Speed Future',
    'Anand Nadiad Bullet Train Station, Surat, Gujarat',
    'https://www.youtube.com/embed/9U0g3MvPA1A?rel=0',
    '/projects',
    3,
    true
  ),
  (
    '/home/hero/hero-image-2.webp',
    'Industrial Construction',
    '',
    'Power Plant, Yadadri',
    NULL,
    '/projects',
    4,
    true
  ),
  (
    '/home/hero/hero-image-6.webp',
    'EPC',
    'Engineering Spaces That Inspire.',
    'SGCCI Auditorium, Surat',
    'https://pika.art/video/0b597bbf-8fa1-4ca2-bf45-f5b22a55b2eb',
    '/projects',
    5,
    true
  ),
  (
    '/home/hero/hero-image-3.webp',
    'N/A',
    'Delivering Life''s Essential Resource.',
    'Water Supply, N/A',
    NULL,
    '/projects',
    6,
    true
  ),
  (
    '/home/hero/hero-image-2.webp',
    'N/A',
    'Creating Cleaner Solutions for Tomorrow.',
    'Solid Waste Management, N/A',
    NULL,
    '/projects',
    7,
    true
  );
