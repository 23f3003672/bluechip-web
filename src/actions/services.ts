"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { serviceFormSchema, type ServiceFormValues } from "@/lib/validations/admin-crud";
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

export async function createServiceAction(
  payload: ServiceFormValues
): Promise<ActionResult<{ id: string }>> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const parsed = serviceFormSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: "Invalid service data." };

  const input = parsed.data;
  const { data, error } = await supabase
    .from("services")
    .insert({
      title: input.title,
      slug: input.slug,
      description: input.description,
      icon: input.icon || null,
      image_url: null,
      published: true,
      sort_order: 0,
    })
    .select("id")
    .single();

  if (error || !data) return { success: false, error: error?.message ?? "Failed to create service." };

  revalidatePath("/admin/services");
  return { success: true, data: { id: data.id } };
}

export async function updateServiceAction(
  id: string,
  payload: ServiceFormValues
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const parsed = serviceFormSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: "Invalid service data." };

  const input = parsed.data;
  const { error } = await supabase
    .from("services")
    .update({
      title: input.title,
      slug: input.slug,
      description: input.description,
      icon: input.icon || null,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/services");
  return { success: true, data: undefined };
}

export async function deleteServiceAction(id: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/services");
  return { success: true, data: undefined };
}
