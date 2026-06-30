"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  careerMutationSchema,
  type CareerMutationInput,
  jobApplicationSchema,
  type JobApplicationInput,
} from "@/lib/validations/career";
import type { ActionResult } from "@/types";
import { slugify } from "@/lib/utils";
import { STORAGE_BUCKETS } from "@/lib/constants";

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
      responsibilities_file_url: input.responsibilities_file_url || null,
      qualifications_file_url: input.qualifications_file_url || null,
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
      responsibilities_file_url: input.responsibilities_file_url || null,
      qualifications_file_url: input.qualifications_file_url || null,
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

export async function uploadResumeAction(
  formData: FormData
): Promise<ActionResult<{ url: string }>> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { success: false, error: "File is required." };
  }

  const allowedTypes = new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);

  if (!allowedTypes.has(file.type)) {
    return {
      success: false,
      error: "Unsupported file type. Please upload a PDF or Word Document (.doc, .docx).",
    };
  }

  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: "File size exceeds 10MB limit." };
  }

  const supabase = await createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const safeName = slugify(baseName) || "resume";
  const storagePath = `resumes/${Date.now()}-${safeName}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKETS.media)
    .upload(storagePath, bytes, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    return { success: false, error: "Failed to upload resume. Please try again." };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKETS.media).getPublicUrl(storagePath);

  return { success: true, data: { url: publicUrl } };
}

export async function submitJobApplicationAction(
  payload: JobApplicationInput
): Promise<ActionResult> {
  const parsed = jobApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Invalid application details." };
  }

  const input = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("job_applications").insert({
    job_id: input.job_id || null,
    name: input.name,
    email: input.email,
    phone: input.phone,
    resume_url: input.resume_url,
    cover_letter: input.cover_letter || null,
  });

  if (error) {
    console.error("Error saving job application:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/careers");
  return { success: true, data: undefined };
}

export async function deleteJobApplicationAction(
  applicationId: string
): Promise<ActionResult> {
  const { supabase, error: authError } = await requireUser();
  if (authError) {
    return { success: false, error: authError };
  }

  if (!applicationId) {
    return { success: false, error: "Application ID is required." };
  }

  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", applicationId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/careers");
  return { success: true, data: undefined };
}

