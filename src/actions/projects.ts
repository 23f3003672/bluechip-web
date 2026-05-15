"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { projectMutationSchema, type ProjectMutationInput } from "@/lib/validations/project";
import type { ActionResult } from "@/types";

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

export async function createProjectAction(
  payload: ProjectMutationInput
): Promise<ActionResult<{ id: string }>> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  const parsed = projectMutationSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Invalid project data." };
  }

  const input = parsed.data;

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: input.title,
      slug: input.slug,
      description: input.description,
      excerpt: input.short_description || null,
      location: input.location || null,
      year: input.year,
      category_id: input.category_id || null,
      client: input.subcategory || null,
      thumbnail_url: input.thumbnail_url || null,
      gallery: input.gallery,
      featured: input.featured,
      published: true,
      sort_order: 0,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to create project." };
  }

  revalidatePath("/admin/projects");
  return { success: true, data: { id: data.id } };
}

export async function updateProjectAction(
  projectId: string,
  payload: ProjectMutationInput
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  if (!projectId) {
    return { success: false, error: "Project id is required." };
  }

  const parsed = projectMutationSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Invalid project data." };
  }

  const input = parsed.data;

  const { error } = await supabase
    .from("projects")
    .update({
      title: input.title,
      slug: input.slug,
      description: input.description,
      excerpt: input.short_description || null,
      location: input.location || null,
      year: input.year,
      category_id: input.category_id || null,
      client: input.subcategory || null,
      thumbnail_url: input.thumbnail_url || null,
      gallery: input.gallery,
      featured: input.featured,
    })
    .eq("id", projectId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  return { success: true, data: undefined };
}

export async function deleteProjectAction(projectId: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  if (!projectId) {
    return { success: false, error: "Project id is required." };
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  return { success: true, data: undefined };
}
