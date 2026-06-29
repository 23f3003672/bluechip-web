"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  mediaArticleFormSchema,
  type MediaArticleFormValues,
} from "@/lib/validations/admin-crud";
import type { ActionResult, MediaArticle } from "@/types";

async function requireUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      error: "Unauthorized",
    } as const;
  }

  return {
    supabase,
    error: null,
  } as const;
}

export async function getMediaArticles(): Promise<MediaArticle[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media_articles")
    .select(`
      *,
      featured_image:media (
        id,
        url,
        alt_text
      )
    `)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as MediaArticle[];
}

export async function updateMediaArticleAction(
  id: string,
  payload: MediaArticleFormValues
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return {
      success: false,
      error: authError,
    };
  }

  const parsed = mediaArticleFormSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid article data.",
    };
  }

  const input = parsed.data;

  const { error } = await supabase
    .from("media_articles")
    .update({
      title: input.title,
      slug: input.slug,
      short_description: input.short_description,
      content: input.content,
      featured_image_id: input.featured_image_id || null,
      display_order: input.display_order,
      published_at: input.published_at,
      meta_title: input.meta_title || null,
      meta_description: input.meta_description || null,
      meta_keywords: input.meta_keywords || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/media");
  revalidatePath("/admin/media");

  return {
    success: true,
    data: undefined,
  };
}