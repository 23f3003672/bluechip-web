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
  map_url: z.union([
    z.literal(""),
    z.string().transform((val) => {
      // 1. If it's an iframe tag, extract the src
      const match = val.match(/src="([^"]+)"/);
      if (match) return match[1];

      // 2. If it's already an embed URL, return it
      if (val.includes("/embed") || val.includes("output=embed")) {
        return val;
      }

      // 3. Try to convert a standard Google Maps link to an embed link
      try {
        const parsed = new URL(val);
        if (parsed.hostname.includes("google.") && parsed.pathname.startsWith("/maps/place/")) {
          const parts = parsed.pathname.split("/");
          if (parts.length > 3 && parts[3]) {
            const placeName = decodeURIComponent(parts[3]);
            return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
          }
        } else if (parsed.hostname.includes("google.") && parsed.searchParams.has("q")) {
          const query = parsed.searchParams.get("q") || "";
          return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }
      } catch (e) {
        // Ignored, fallback to original value
      }

      return val;
    }).pipe(z.string().url("Map URL must be valid")),
  ]),
});

export type FooterSettingsValues = z.output<typeof footerSettingsSchema>;
export type ContactSettingsValues = z.output<typeof contactSettingsSchema>;
