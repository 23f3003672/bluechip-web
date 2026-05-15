import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { createClient } from "@/lib/supabase/server";
import { HOME_SERVICES } from "@/lib/mock-data";
import { mapServiceToHomeService } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Bluechip Engineering services across EPC, civil construction, mechanical works, and facade engineering.",
};

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, title, slug, description, icon, image_url, published, sort_order, created_at, updated_at")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const services = data?.length ? data.map(mapServiceToHomeService) : HOME_SERVICES;

  return <ServicesSection initialServices={services} />;
}
