import { createClient } from "@/lib/supabase/server";
import { SITE_ADDRESS, SITE_EMAIL, SITE_NAME, SITE_PHONE } from "@/lib/constants";

export interface FooterSettingsValue {
  company_name: string;
  tagline: string;
  copyright_text: string;
  footer_note: string;
}

export interface ContactSettingsValue {
  email: string;
  phone: string;
  address: string;
  map_url: string;
}

export interface SiteSettingsPayload {
  footer: FooterSettingsValue;
  contact: ContactSettingsValue;
}

const defaultSettings: SiteSettingsPayload = {
  footer: {
    company_name: SITE_NAME,
    tagline: "Driven by Innovation, Powered by Technology",
    copyright_text: "All rights reserved.",
    footer_note:
      "Delivering precision-engineered infrastructure solutions that stand the test of time.",
  },
  contact: {
    email: SITE_EMAIL,
    phone: SITE_PHONE,
    address: SITE_ADDRESS,
    map_url: "https://maps.google.com/maps?q=Adajan%20Surat&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
};

function readFooterValue(value: unknown): FooterSettingsValue {
  if (!value || typeof value !== "object") {
    return defaultSettings.footer;
  }

  const obj = value as Record<string, unknown>;
  return {
    company_name:
      typeof obj.company_name === "string"
        ? obj.company_name
        : defaultSettings.footer.company_name,
    tagline:
      typeof obj.tagline === "string" ? obj.tagline : defaultSettings.footer.tagline,
    copyright_text:
      typeof obj.copyright_text === "string"
        ? obj.copyright_text
        : defaultSettings.footer.copyright_text,
    footer_note:
      typeof obj.footer_note === "string"
        ? obj.footer_note
        : defaultSettings.footer.footer_note,
  };
}

function readContactValue(value: unknown): ContactSettingsValue {
  if (!value || typeof value !== "object") {
    return defaultSettings.contact;
  }

  const obj = value as Record<string, unknown>;
  return {
    email: typeof obj.email === "string" ? obj.email : defaultSettings.contact.email,
    phone: typeof obj.phone === "string" ? obj.phone : defaultSettings.contact.phone,
    address:
      typeof obj.address === "string" ? obj.address : defaultSettings.contact.address,
    map_url:
      typeof obj.map_url === "string" ? obj.map_url : defaultSettings.contact.map_url,
  };
}

export async function getSiteSettings(): Promise<SiteSettingsPayload> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("settings")
    .select("key, value")
    .in("key", ["footer_content", "contact_details"]);

  const footerRow = (data ?? []).find((row: { key: string }) => row.key === "footer_content");
  const contactRow = (data ?? []).find((row: { key: string }) => row.key === "contact_details");

  return {
    footer: readFooterValue(footerRow?.value),
    contact: readContactValue(contactRow?.value),
  };
}
