/**
 * Database type definitions for Supabase.
 *
 * Once your schema is finalized, replace this with the auto-generated
 * types from: `npx supabase gen types typescript --project-id <id>`
 *
 * Tables:
 *   projects, categories, services, recognitions, visionaries, faqs, media
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: ProjectInsert;
        Update: Partial<ProjectInsert>;
        Relationships: [];
      };
      categories: {
        Row: Category;
        Insert: CategoryInsert;
        Update: Partial<CategoryInsert>;
        Relationships: [];
      };
      services: {
        Row: Service;
        Insert: ServiceInsert;
        Update: Partial<ServiceInsert>;
        Relationships: [];
      };
      recognitions: {
        Row: Recognition;
        Insert: RecognitionInsert;
        Update: Partial<RecognitionInsert>;
        Relationships: [];
      };
      visionaries: {
        Row: Visionary;
        Insert: VisionaryInsert;
        Update: Partial<VisionaryInsert>;
        Relationships: [];
      };
      faqs: {
        Row: FAQ;
        Insert: FAQInsert;
        Update: Partial<FAQInsert>;
        Relationships: [];
      };
      media: {
        Row: Media;
        Insert: MediaInsert;
        Update: Partial<MediaInsert>;
        Relationships: [];
      };
      media_articles: {
  Row: MediaArticle;
  Insert: MediaArticleInsert;
  Update: Partial<MediaArticleInsert>;
  Relationships: [];
};
      settings: {
        Row: Setting;
        Insert: SettingInsert;
        Update: Partial<SettingInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

/* ─── Domain Types ───────────────────────────────────────────────── */

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  gallery: string[];          // array of storage URLs
  category_id: string | null;
  client: string | null;
  location: string | null;
  year: number | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export type CategoryInsert = Omit<Category, "id" | "created_at">;

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;         // lucide icon name or SVG string
  image_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ServiceInsert = Omit<Service, "id" | "created_at" | "updated_at">;

export interface Recognition {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description: string | null;
  image_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export type RecognitionInsert = Omit<Recognition, "id" | "created_at">;

export interface Visionary {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  sort_order: number;
  created_at: string;
}

export type VisionaryInsert = Omit<Visionary, "id" | "created_at">;

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
}

export type FAQInsert = Omit<FAQ, "id" | "created_at">;

export interface Media {
  id: string;
  filename: string;
  url: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  alt_text: string | null;
  uploaded_at: string;
}



export type MediaInsert = Omit<Media, "id" | "uploaded_at">;

export interface MediaArticle {
  id: string;

  title: string;

  slug: string;

  short_description: string;

  content: string;

  featured_image_id: string | null;

  display_order: number;

  published_at: string;

  meta_title: string | null;

  meta_description: string | null;

  meta_keywords: string | null;

  created_at: string;

  updated_at: string;

  featured_image?: {
    id: string;
    url: string;
    alt_text: string | null;
  } | null;
}

export type MediaArticleInsert = Omit<
  MediaArticle,
  "id" | "created_at" | "updated_at" | "featured_image"
>;

export interface Setting {
  key: string;
  value: Json;
}

export type SettingInsert = Setting;
