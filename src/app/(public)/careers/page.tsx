import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CareersListingSection } from "@/components/sections/CareersListingSection";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore career opportunities at Bluechip Engineering & Technologies.",
};

export default async function CareersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("careers")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return <CareersListingSection initialItems={data ?? []} />;
}
