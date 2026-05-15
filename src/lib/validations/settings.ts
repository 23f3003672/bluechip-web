import { z } from "zod";

export const footerSettingsSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  tagline: z.string().default(""),
  copyright_text: z.string().min(2, "Copyright text is required"),
  footer_note: z.string().default(""),
});

export const contactSettingsSchema = z.object({
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone is required"),
  address: z.string().min(5, "Address is required"),
  map_url: z.union([z.literal(""), z.string().url("Map URL must be valid")]),
});

export type FooterSettingsValues = z.output<typeof footerSettingsSchema>;
export type ContactSettingsValues = z.output<typeof contactSettingsSchema>;
