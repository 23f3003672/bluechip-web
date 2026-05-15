import type { Metadata } from "next";
import { AboutIntroSection } from "@/components/sections/AboutIntroSection";
import { DeliverExcellenceSection } from "@/components/sections/DeliverExcellenceSection";
import { AboutVisionariesSection } from "@/components/sections/AboutVisionariesSection";
import { AboutJourneySection } from "@/components/sections/AboutJourneySection";
import { AboutMvmSection } from "@/components/sections/AboutMvmSection";
import { AboutStrengthsSection } from "@/components/sections/AboutStrengthsSection";
import { createClient } from "@/lib/supabase/server";
import { ABOUT_VISIONARIES } from "@/lib/mock-data";
import { mapVisionaryToAboutVisionary } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bluechip Engineering & Technologies, our journey since 1998, leadership vision, mission, values, and core strengths in EPC and infrastructure delivery.",
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("visionaries")
    .select("id, name, designation, bio, image_url, linkedin_url, sort_order, created_at")
    .order("sort_order", { ascending: true });

  const visionaries = data?.length ? data.map(mapVisionaryToAboutVisionary) : ABOUT_VISIONARIES;

  return (
    <>
      <AboutIntroSection />
      <DeliverExcellenceSection />
      <AboutVisionariesSection initialVisionaries={visionaries} />
      <AboutJourneySection />
      <AboutMvmSection />
      <AboutStrengthsSection />
    </>
  );
}
