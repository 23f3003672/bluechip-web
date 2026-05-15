"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { careerMutationSchema, type CareerMutationInput } from "@/lib/validations/career";
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

export async function createCareerAction(
  payload: CareerMutationInput
): Promise<ActionResult<{ id: string }>> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  const parsed = careerMutationSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Invalid career data." };
  }

  const input = parsed.data;

  const { data, error } = await supabase
    .from("careers")
    .insert({
      title: input.title,
      slug: input.slug,
      description: input.description,
      location: input.location || null,
      employment_type: input.employment_type || null,
      department: input.department || null,
      responsibilities: input.responsibilities || null,
      qualifications: input.qualifications || null,
      posted_at: input.posted_at || null,
      closing_date: input.closing_date || null,
      published: input.published ?? true,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { success: false, error: error?.message ?? "Failed to create career." };
  }

  revalidatePath("/admin/careers");
  return { success: true, data: { id: data.id } };
}

export async function updateCareerAction(
  careerId: string,
  payload: CareerMutationInput
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  if (!careerId) {
    return { success: false, error: "Career id is required." };
  }

  const parsed = careerMutationSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Invalid career data." };
  }

  const input = parsed.data;

  const { error } = await supabase
    .from("careers")
    .update({
      title: input.title,
      slug: input.slug,
      description: input.description,
      location: input.location || null,
      employment_type: input.employment_type || null,
      department: input.department || null,
      responsibilities: input.responsibilities || null,
      qualifications: input.qualifications || null,
      posted_at: input.posted_at || null,
      closing_date: input.closing_date || null,
      published: input.published ?? true,
    })
    .eq("id", careerId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/careers");
  return { success: true, data: undefined };
}

export async function deleteCareerAction(careerId: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  if (!careerId) {
    return { success: false, error: "Career id is required." };
  }

  const { error } = await supabase.from("careers").delete().eq("id", careerId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/careers");
  return { success: true, data: undefined };
}
