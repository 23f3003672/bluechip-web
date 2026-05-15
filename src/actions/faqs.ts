"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { faqFormSchema, type FaqFormValues } from "@/lib/validations/admin-crud";
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

export async function createFaqAction(
  payload: FaqFormValues
): Promise<ActionResult<{ id: string }>> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const parsed = faqFormSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: "Invalid FAQ data." };

  const input = parsed.data;
  const { data, error } = await supabase
    .from("faqs")
    .insert({
      question: input.question,
      answer: input.answer,
      category: null,
      sort_order: 0,
      published: true,
    })
    .select("id")
    .single();

  if (error || !data) return { success: false, error: error?.message ?? "Failed to create FAQ." };

  revalidatePath("/admin/faq");
  return { success: true, data: { id: data.id } };
}

export async function updateFaqAction(
  id: string,
  payload: FaqFormValues
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const parsed = faqFormSchema.safeParse(payload);
  if (!parsed.success) return { success: false, error: "Invalid FAQ data." };

  const input = parsed.data;
  const { error } = await supabase
    .from("faqs")
    .update({
      question: input.question,
      answer: input.answer,
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/faq");
  return { success: true, data: undefined };
}

export async function deleteFaqAction(id: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/faq");
  return { success: true, data: undefined };
}
