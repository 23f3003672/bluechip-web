import { z } from "zod";

function splitGalleryUrls(raw: string) {
  return raw
    .split(/\r?\n|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function parseGalleryInput(raw: string) {
  return splitGalleryUrls(raw);
}

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectFormSchema = z
  .object({
    title: z.string().min(2, "Title is required"),
    slug: z
      .string()
      .min(2, "Slug is required")
      .regex(slugRegex, "Use lowercase letters, numbers, and hyphens only"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    short_description: z.string().default(""),
    location: z.string().default(""),
    year: z.coerce
      .number()
      .int("Year must be a whole number")
      .min(1900, "Year must be 1900 or later")
      .max(2100, "Year must be 2100 or earlier"),
    category_id: z.string().default(""),
    subcategory: z.string().default(""),
    thumbnail_url: z.union([z.literal(""), z.string().url("Thumbnail URL must be valid")]),
    gallery: z.string().default(""),
    featured: z.boolean().default(false),
  })
  .superRefine((values, ctx) => {
    const galleryItems = splitGalleryUrls(values.gallery ?? "");

    galleryItems.forEach((url, index) => {
      const parsed = z.string().url().safeParse(url);
      if (!parsed.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Gallery URL ${index + 1} is invalid`,
          path: ["gallery"],
        });
      }
    });
  });

export const projectMutationSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).regex(slugRegex),
  description: z.string().min(10),
  short_description: z.string().default(""),
  location: z.string().default(""),
  year: z.number().int().min(1900).max(2100),
  category_id: z.string().default(""),
  subcategory: z.string().default(""),
  thumbnail_url: z.string().default(""),
  gallery: z.array(z.string().url()).default([]),
  featured: z.boolean().default(false),
});

export type ProjectFormInput = z.input<typeof projectFormSchema>;
export type ProjectFormValues = z.output<typeof projectFormSchema>;
export type ProjectMutationInput = z.infer<typeof projectMutationSchema>;
