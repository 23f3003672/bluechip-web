/**
 * Re-exports all domain types for clean imports:
 *   import type { Project, Service } from "@/types"
 */
export type {
  Project,
  ProjectInsert,
  Category,
  CategoryInsert,
  Service,
  ServiceInsert,
  Recognition,
  RecognitionInsert,
  Visionary,
  VisionaryInsert,
  FAQ,
  FAQInsert,
  Media,
  MediaInsert,
  Setting,
  SettingInsert,
  MediaArticle,
MediaArticleInsert,
} from "./supabase";

/* ─── UI / Component helpers ─────────────────────────────────────── */

/** Generic async server action return shape */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
}
