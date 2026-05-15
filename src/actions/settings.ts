"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  contactSettingsSchema,
  footerSettingsSchema,
  type ContactSettingsValues,
  type FooterSettingsValues,
} from "@/lib/validations/settings";
import type { ActionResult } from "@/types";

type SettingsKey = "footer_content" | "contact_details";

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

async function upsertSetting(
  key: SettingsKey,
  value: Record<string, unknown>
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  const { error } = await supabase
    .from("settings")
    .upsert({ key, value }, { onConflict: "key" });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true, data: undefined };
}

export async function updateFooterSettingsAction(
  payload: FooterSettingsValues
): Promise<ActionResult> {
  const parsed = footerSettingsSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid footer settings." };
  }

  return upsertSetting("footer_content", parsed.data as Record<string, unknown>);
}

export async function updateContactSettingsAction(
  payload: ContactSettingsValues
): Promise<ActionResult> {
  const parsed = contactSettingsSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid contact settings." };
  }

  return upsertSetting("contact_details", parsed.data as Record<string, unknown>);
}
