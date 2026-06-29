"use server";

import { revalidatePath } from "next/cache";
import { STORAGE_BUCKETS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { ActionResult } from "@/types";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

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

export async function uploadMediaAction(
  formData: FormData
): Promise<ActionResult<{ id: string; url: string }>> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  const file = formData.get("file");
  const altTextRaw = formData.get("alt_text");

  if (!(file instanceof File)) {
    return { success: false, error: "File is required." };
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return {
      success: false,
      error: "Unsupported file type. Upload JPG, PNG, WEBP, GIF, or SVG.",
    };
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return {
      success: false,
      error: "File exceeds 10MB size limit.",
    };
  }

  const altText = typeof altTextRaw === "string" ? altTextRaw.trim() : "";
  const originalName = file.name || "media-file";
  const ext = originalName.includes(".")
    ? originalName.split(".").pop()?.toLowerCase() || "jpg"
    : "jpg";
  const baseName = originalName.replace(/\.[^.]+$/, "");
  const safeBase = slugify(baseName) || "media-file";
  const storagePath = `uploads/${Date.now()}-${safeBase}.${ext}`;

  const bytes = Buffer.from(await file.arrayBuffer());

  const { data: uploadData, error: uploadError } = await supabase.storage
  .from(STORAGE_BUCKETS.media)
  .upload(storagePath, bytes, {
    contentType: file.type,
    upsert: false,
  });

console.log("UPLOAD DATA:", uploadData);
console.log("UPLOAD ERROR:", uploadError);

if (uploadError) {
  return {
    success: false,
    error: JSON.stringify(uploadError, null, 2),
  };
}

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKETS.media).getPublicUrl(storagePath);

  const { data, error: insertError } = await supabase
    .from("media")
    .insert({
      filename: originalName,
      url: publicUrl,
      storage_path: storagePath,
      mime_type: file.type,
      size_bytes: file.size,
      alt_text: altText || null,
    })
    .select("id, url")
    .single();
console.log("INSERT ERROR:", insertError);
  if (insertError || !data) {
    await supabase.storage.from(STORAGE_BUCKETS.media).remove([storagePath]);
    return {
      success: false,
      error: insertError?.message ?? "Failed to save media record.",
    };
  }

  revalidatePath("/admin/media");
  revalidatePath("/admin/projects");
  return { success: true, data: { id: data.id, url: data.url } };
}

export async function deleteMediaAction(mediaId: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();

  if (authError) {
    return { success: false, error: authError };
  }

  if (!mediaId) {
    return { success: false, error: "Media id is required." };
  }

  const { data: mediaItem, error: fetchError } = await supabase
    .from("media")
    .select("id, storage_path")
    .eq("id", mediaId)
    .single();

  if (fetchError || !mediaItem) {
    return { success: false, error: fetchError?.message ?? "Media not found." };
  }

  const { error: storageError } = await supabase.storage
    .from(STORAGE_BUCKETS.media)
    .remove([mediaItem.storage_path]);

  if (storageError) {
    return { success: false, error: storageError.message };
  }

  const { error: deleteError } = await supabase.from("media").delete().eq("id", mediaId);

  if (deleteError) {
    return { success: false, error: deleteError.message };
  }

  revalidatePath("/admin/media");
  revalidatePath("/admin/projects");
  return { success: true, data: undefined };
}
