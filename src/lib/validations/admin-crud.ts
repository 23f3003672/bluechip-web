import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const recognitionFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  organization: z.string().min(2, "Organization is required"),
  description: z.string().default(""),
  year: z.coerce
    .number()
    .int("Year must be a whole number")
    .min(1900, "Year must be 1900 or later")
    .max(2100, "Year must be 2100 or earlier"),
  category: z.enum(["international", "industry-awards", "infrastructure", "manufacturing", "media"]),
});

export const visionaryFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  image_url: z.union([z.literal(""), z.string().url("Image URL must be valid")]),
  bio: z.string().default(""),
});

export const serviceFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().default(""),
});

function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export const faqFormSchema = z.object({
  question: z
    .string()
    .min(5, "Question is required")
    .refine((val) => countWords(val) <= 30, {
      message: "Question cannot exceed 30 words.",
    }),
  answer: z
    .string()
    .min(5, "Answer is required")
    .refine((val) => countWords(val) <= 100, {
      message: "Answer cannot exceed 100 words.",
    }),
});

export const mediaArticleFormSchema = z.object({
  title: z.string().min(2, "Title is required"),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens only"),

  short_description: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(300, "Short description cannot exceed 300 characters"),

  content: z
    .string()
    .min(20, "Article content must be at least 20 characters"),

  featured_image_id: z.string().uuid("Please select a valid image"),

  display_order: z.coerce
    .number()
    .int()
    .min(1, "Display order must be between 1 and 8")
    .max(8, "Display order must be between 1 and 8"),

  published_at: z.string().min(1, "Publish date is required"),

  meta_title: z.string().max(60, "Meta title should not exceed 60 characters").default(""),

  meta_description: z
    .string()
    .max(160, "Meta description should not exceed 160 characters")
    .default(""),

  meta_keywords: z.string().default(""),
});

export type RecognitionFormValues = z.output<typeof recognitionFormSchema>;
export type VisionaryFormValues = z.output<typeof visionaryFormSchema>;
export type ServiceFormValues = z.output<typeof serviceFormSchema>;
export type FaqFormValues = z.output<typeof faqFormSchema>;
export type MediaArticleFormValues = z.output<typeof mediaArticleFormSchema>;