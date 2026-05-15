import {
  updateContactSettingsAction,
  updateFooterSettingsAction,
} from "@/actions/settings";
import { SettingsAdminModule } from "@/components/admin/settings/SettingsAdminModule";
import { createClient } from "@/lib/supabase/server";
import type {
  ContactSettingsValues,
  FooterSettingsValues,
} from "@/lib/validations/settings";

function asFooterValue(value: unknown): FooterSettingsValues {
  if (!value || typeof value !== "object") {
    return {
      company_name: "Bluechip Engineering & Technologies",
      tagline: "Driven by Innovation, Powered by Technology",
      copyright_text: "All rights reserved.",
      footer_note: "",
    };
  }

  const obj = value as Record<string, unknown>;

  return {
    company_name:
      typeof obj.company_name === "string"
        ? obj.company_name
        : "Bluechip Engineering & Technologies",
    tagline: typeof obj.tagline === "string" ? obj.tagline : "",
    copyright_text:
      typeof obj.copyright_text === "string"
        ? obj.copyright_text
        : "All rights reserved.",
    footer_note: typeof obj.footer_note === "string" ? obj.footer_note : "",
  };
}

function asContactValue(value: unknown): ContactSettingsValues {
  if (!value || typeof value !== "object") {
    return {
      email: "info@bluechipengineering.com",
      phone: "+91-12345 XXXXX",
      address: "Surat, Gujarat, India",
      map_url: "",
    };
  }

  const obj = value as Record<string, unknown>;

  return {
    email:
      typeof obj.email === "string" ? obj.email : "info@bluechipengineering.com",
    phone: typeof obj.phone === "string" ? obj.phone : "+91-12345 XXXXX",
    address:
      typeof obj.address === "string" ? obj.address : "Surat, Gujarat, India",
    map_url: typeof obj.map_url === "string" ? obj.map_url : "",
  };
}

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("settings")
    .select("key, value")
    .in("key", ["footer_content", "contact_details"]);

  const footerRow = (data ?? []).find((row: { key: string }) => row.key === "footer_content");
  const contactRow = (data ?? []).find((row: { key: string }) => row.key === "contact_details");

  return (
    <SettingsAdminModule
      initialFooter={asFooterValue(footerRow?.value)}
      initialContact={asContactValue(contactRow?.value)}
      updateFooterSettingsAction={updateFooterSettingsAction}
      updateContactSettingsAction={updateContactSettingsAction}
    />
  );
}
