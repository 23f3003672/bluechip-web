"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { recognitionFormSchema, type RecognitionFormValues } from "@/lib/validations/admin-crud";
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

export async function createRecognitionAction(
  payload: RecognitionFormValues
): Promise<ActionResult<{ id: string }>> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const parsed = recognitionFormSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: "Invalid recognition data." };

  const input = parsed.data;
  const { data, error } = await supabase
    .from("recognitions")
    .insert({
      title: input.title,
      issuer: input.organization,
      description: input.description || null,
      image_url: "",
      year: input.year,
      category: input.category,
      published: true,
      sort_order: 0,
    })
    .select("id")
    .single();

  if (error || !data) return { success: false, error: error?.message ?? "Failed to create recognition." };

  revalidatePath("/admin/recognitions");
  return { success: true, data: { id: data.id } };
}

export async function updateRecognitionAction(
  id: string,
  payload: RecognitionFormValues
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const parsed = recognitionFormSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: "Invalid recognition data." };

  const input = parsed.data;
  const { error } = await supabase
    .from("recognitions")
    .update({
      title: input.title,
      issuer: input.organization,
      description: input.description || null,
      image_url: "",
      year: input.year,
      category: input.category,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/recognitions");
  return { success: true, data: undefined };
}

export async function deleteRecognitionAction(id: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from("recognitions").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/recognitions");
  return { success: true, data: undefined };
}
