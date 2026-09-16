"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  insidersItemFormSchema,
  type InsidersItemFormValues,
} from "@/lib/validations/insiders";
import type { ActionResult, InsidersItem } from "@/types";

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

export async function getInsidersItemsAction(filters?: {
  category?: string;
  subcategory?: string;
  publishedOnly?: boolean;
}): Promise<InsidersItem[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("insiders")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (filters?.publishedOnly ?? true) {
      query = query.eq("published", true);
    }

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    if (filters?.subcategory) {
      query = query.eq("subcategory", filters.subcategory);
    }

    const { data, error } = await query;
    if (error) {
      console.warn("Failed to fetch insiders from DB (table might not exist yet):", error.message);
      return [];
    }

    return (data ?? []) as InsidersItem[];
  } catch (err) {
    console.warn("Error in getInsidersItemsAction:", err);
    return [];
  }
}

export async function createInsidersItemAction(
  payload: InsidersItemFormValues
): Promise<ActionResult<{ id: string }>> {
  const { supabase, error: authError } = await requireUser();
  if (authError) return { success: false, error: authError };

  const parsed = insidersItemFormSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid insiders post data.",
    };
  }

  const input = parsed.data;
  const { data, error } = await supabase
    .from("insiders")
    .insert({
      title: input.title,
      slug: input.slug,
      category: input.category,
      subcategory: input.subcategory,
      description: input.description || null,
      image_url: input.image_url,
      location: input.location || null,
      year: input.year || null,
      published: input.published,
      sort_order: input.sort_order,
    })
    .select("id")
    .single();

  if (error || !data) {
    return {
      success: false,
      error: error?.message ?? "Failed to create insiders post.",
    };
  }

  revalidatePath("/insiders/the-people");
  revalidatePath("/insiders/the-experience");
  revalidatePath("/admin/media");

  return { success: true, data: { id: data.id } };
}

export async function updateInsidersItemAction(
  id: string,
  payload: InsidersItemFormValues
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();
  if (authError) return { success: false, error: authError };

  const parsed = insidersItemFormSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid insiders post data.",
    };
  }

  const input = parsed.data;
  const { error } = await supabase
    .from("insiders")
    .update({
      title: input.title,
      slug: input.slug,
      category: input.category,
      subcategory: input.subcategory,
      description: input.description || null,
      image_url: input.image_url,
      location: input.location || null,
      year: input.year || null,
      published: input.published,
      sort_order: input.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message ?? "Failed to update insiders post.",
    };
  }

  revalidatePath("/insiders/the-people");
  revalidatePath("/insiders/the-experience");
  revalidatePath("/admin/media");

  return { success: true, data: undefined };
}

export async function deleteInsidersItemAction(
  id: string
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();
  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from("insiders").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message ?? "Failed to delete insiders post.",
    };
  }

  revalidatePath("/insiders/the-people");
  revalidatePath("/insiders/the-experience");
  revalidatePath("/admin/media");

  return { success: true, data: undefined };
}
