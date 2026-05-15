import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const careerFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().default(""),
  employment_type: z.string().default(""),
  department: z.string().default(""),
  responsibilities: z.string().default(""),
  qualifications: z.string().default(""),
  posted_at: z.string().optional(),
  closing_date: z.string().optional(),
  published: z.boolean().default(true),
});

export const careerMutationSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).regex(slugRegex),
  description: z.string().min(10),
  location: z.string().default(""),
  employment_type: z.string().default(""),
  department: z.string().default(""),
  responsibilities: z.string().default(""),
  qualifications: z.string().default(""),
  posted_at: z.string().nullable().optional(),
  closing_date: z.string().nullable().optional(),
  published: z.boolean().default(true),
});

export type CareerFormInput = z.input<typeof careerFormSchema>;
export type CareerFormValues = z.output<typeof careerFormSchema>;
export type CareerMutationInput = z.infer<typeof careerMutationSchema>;
