import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedLeadersSection } from "@/components/sections/TrustedLeadersSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JourneyMilestonesSection } from "@/components/sections/JourneyMilestonesSection";
import { ProjectsCarouselSection } from "@/components/sections/ProjectsCarouselSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactMapSection } from "@/components/sections/ContactMapSection";
import { createClient } from "@/lib/supabase/server";
import { HOME_SERVICES, MOCK_FAQS } from "@/lib/mock-data";
import { mapFaqToMockFaq, mapServiceToHomeService } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Bluechip Engineering & Technologies builds trusted EPC, civil, mechanical, and facade engineering solutions with a proven journey since 1998.",
};

/**
 * Homepage — all Server Components.
 *
 * Page rhythm:
 *   Hero (dark)  →  Services (white)  →  Projects (gray)
 *   →  FAQ (white)  →  CTA (blue)  →  Footer (dark)
 *
 * The alternating light/dark pattern creates visual sectioning
 * without needing decorative dividers.
 */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: servicesData }, { data: faqData }] = await Promise.all([
    supabase
      .from("services")
      .select("id, title, slug, description, icon, image_url, published, sort_order, created_at, updated_at")
      .eq("published", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("faqs")
      .select("id, question, answer, category, sort_order, published, created_at")
      .eq("published", true)
      .order("sort_order", { ascending: true }),
  ]);

  const services = servicesData?.length
    ? servicesData.map(mapServiceToHomeService)
    : HOME_SERVICES;
  const faqs = faqData?.length ? faqData.map(mapFaqToMockFaq) : MOCK_FAQS;

  return (
    <>
      <HeroSection />
      <TrustedLeadersSection />
      <ServicesSection initialServices={services} />
      <ProjectsCarouselSection />
      <JourneyMilestonesSection />
      <FaqSection initialFaqs={faqs} />
      <ContactMapSection />
    </>
  );
}
