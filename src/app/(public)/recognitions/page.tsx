import type { Metadata } from "next";
import { RecognitionsSection } from "@/components/sections/RecognitionsSection";
import { createClient } from "@/lib/supabase/server";
import { mapRecognitionToPublicItem } from "@/lib/public-content";
import { RECOGNITIONS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Rewards & Recognitions",
  description:
    "Explore Bluechip Engineering's international delegations, industry awards, and national infrastructure recognitions.",
};

export default async function RecognitionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recognitions")
    .select("id, title, issuer, year, description, image_url, published, sort_order, created_at")
    .order("year", { ascending: false });

  const records = data?.length ? data.map(mapRecognitionToPublicItem) : RECOGNITIONS;

  return <RecognitionsSection initialRecords={records} />;
}
