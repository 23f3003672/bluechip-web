"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations/contact";
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

export async function submitInquiryAction(
  payload: ContactFormInput
): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  const input = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("contact_inquiries").insert({
    name: input.name,
    company_name: input.company_name || null,
    email: input.email,
    phone: input.phone || null,
    service: input.service || null,
    location: input.location || null,
    message: input.message,
  });

  if (error) {
    console.error("Error inserting inquiry:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  return { success: true, data: undefined };
}

export async function getInquiriesAction(): Promise<ActionResult<any[]>> {
  const { supabase, error: authError } = await requireUser();
  if (authError) {
    return { success: false, error: authError };
  }

  const { data, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function deleteInquiryAction(id: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();
  if (authError) {
    return { success: false, error: authError };
  }

  const { error } = await supabase
    .from("contact_inquiries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting inquiry:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  return { success: true, data: undefined };
}

