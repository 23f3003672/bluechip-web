import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const recognitionFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  organization: z.string().min(2, "Organization is required"),
  description: z.string().default(""),
  image_url: z.union([z.literal(""), z.string().url("Image URL must be valid")]),
  year: z.coerce
    .number()
    .int("Year must be a whole number")
    .min(1900, "Year must be 1900 or later")
    .max(2100, "Year must be 2100 or earlier"),
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

export const faqFormSchema = z.object({
  question: z.string().min(5, "Question is required"),
  answer: z.string().min(5, "Answer is required"),
});

export type RecognitionFormValues = z.output<typeof recognitionFormSchema>;
export type VisionaryFormValues = z.output<typeof visionaryFormSchema>;
export type ServiceFormValues = z.output<typeof serviceFormSchema>;
export type FaqFormValues = z.output<typeof faqFormSchema>;
