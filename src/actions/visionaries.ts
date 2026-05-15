"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { visionaryFormSchema, type VisionaryFormValues } from "@/lib/validations/admin-crud";
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

export async function createVisionaryAction(
  payload: VisionaryFormValues
): Promise<ActionResult<{ id: string }>> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const parsed = visionaryFormSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: "Invalid visionary data." };

  const input = parsed.data;
  const { data, error } = await supabase
    .from("visionaries")
    .insert({
      name: input.name,
      designation: input.role,
      image_url: input.image_url || null,
      bio: input.bio || null,
      linkedin_url: null,
      sort_order: 0,
    })
    .select("id")
    .single();

  if (error || !data) return { success: false, error: error?.message ?? "Failed to create visionary." };

  revalidatePath("/admin/visionaries");
  return { success: true, data: { id: data.id } };
}

export async function updateVisionaryAction(
  id: string,
  payload: VisionaryFormValues
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const parsed = visionaryFormSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: "Invalid visionary data." };

  const input = parsed.data;
  const { error } = await supabase
    .from("visionaries")
    .update({
      name: input.name,
      designation: input.role,
      image_url: input.image_url || null,
      bio: input.bio || null,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/visionaries");
  return { success: true, data: undefined };
}

export async function deleteVisionaryAction(id: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from("visionaries").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/visionaries");
  return { success: true, data: undefined };
}
