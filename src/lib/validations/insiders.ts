import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const insidersItemFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens only"),
  category: z.enum(["the-people", "the-experience"], {
    message: "Category must be The People or The Experience",
  }),
  subcategory: z.enum(
    [
      "meetings-moments",
      "life-at-bluechip",
      "aerial-views",
      "behind-the-scenes",
      "events-milestones",
    ],
    {
      message: "Please select a valid subcategory",
    }
  ),
  description: z.string().optional().default(""),
  image_url: z.string().min(1, "Image URL is required"),
  location: z.string().optional().default(""),
  year: z.string().optional().default(""),
  published: z.boolean().default(true),
  sort_order: z.coerce.number().default(0),
});

export type InsidersItemFormValues = z.infer<typeof insidersItemFormSchema>;
