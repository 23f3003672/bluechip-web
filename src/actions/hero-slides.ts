"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { heroSlideFormSchema, type HeroSlideFormValues } from "@/lib/validations/admin-crud";
import type { ActionResult } from "@/types";

function normalizeYouTubeEmbedUrl(url?: string | null): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (trimmed.includes("/embed")) return trimmed;

  // youtu.be/ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0`;
  }

  // youtube.com/shorts/ID
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}?rel=0`;
  }

  // youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0`;
  }

  // instagram.com/reel/ID
  const igMatch = trimmed.match(/instagram\.com\/reel\/([a-zA-Z0-9_-]+)/);
  if (igMatch && igMatch[1]) {
    return `https://www.instagram.com/reel/${igMatch[1]}/embed`;
  }

  return trimmed;
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, error: "Unauthorized" } as const;
  }

  return { supabase, error: null } as const;
}

export async function createHeroSlideAction(
  payload: HeroSlideFormValues
): Promise<ActionResult<{ id: string }>> {
  const { supabase, error: authError } = await requireUser();
  if (authError) return { success: false, error: authError };

  const parsed = heroSlideFormSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Invalid hero slide data." };
  }

  const input = parsed.data;
  const normalizedVideoUrl = normalizeYouTubeEmbedUrl(input.video_url);

  const { data, error } = await supabase
    .from("hero_slides")
    .insert({
      image_url: input.image_url,
      category: input.category,
      tagline: input.tagline,
      project_name: input.project_name,
      video_url: normalizedVideoUrl || null,
      project_href: input.project_href || "/projects",
      sort_order: input.sort_order ?? 0,
      is_active: input.is_active ?? true,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to create hero slide." };
  }

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true, data: { id: data.id } };
}

export async function updateHeroSlideAction(
  id: string,
  payload: HeroSlideFormValues
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();
  if (authError) return { success: false, error: authError };

  const parsed = heroSlideFormSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Invalid hero slide data." };
  }

  const input = parsed.data;
  const normalizedVideoUrl = normalizeYouTubeEmbedUrl(input.video_url);

  const { error } = await supabase
    .from("hero_slides")
    .update({
      image_url: input.image_url,
      category: input.category,
      tagline: input.tagline,
      project_name: input.project_name,
      video_url: normalizedVideoUrl || null,
      project_href: input.project_href || "/projects",
      sort_order: input.sort_order ?? 0,
      is_active: input.is_active ?? true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true, data: undefined };
}

export async function toggleHeroSlideAction(
  id: string,
  is_active: boolean
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();
  if (authError) return { success: false, error: authError };

  const { error } = await supabase
    .from("hero_slides")
    .update({
      is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true, data: undefined };
}

export async function deleteHeroSlideAction(id: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();
  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true, data: undefined };
}
