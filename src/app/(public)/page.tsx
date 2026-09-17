import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedLeadersSection } from "@/components/sections/TrustedLeadersSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JourneyMilestonesSection } from "@/components/sections/JourneyMilestonesSection";
import { ProjectsCarouselSection } from "@/components/sections/ProjectsCarouselSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactMapSection } from "@/components/sections/ContactMapSection";
import { createClient } from "@/lib/supabase/server";
import { HOME_SERVICES, MOCK_FAQS, HERO_SLIDES } from "@/lib/mock-data";
import { mapFaqToMockFaq, mapServiceToHomeService, mapHeroSlideToMockSlide } from "@/lib/public-content";

export const metadata: Metadata = {
  title: {
    absolute:
      "Bluechip Engineering & Technologies | Premier EPC, Civil & Facade Solutions",
  },
  description:
    "Established in 1998, Bluechip Engineering & Technologies (Bluechip Techno) is an integrated engineering and construction firm delivering Civil, Mechanical, Facade, and EPC solutions across India.",
  keywords: [
    "Bluechip Engineering",
    "Bluechip Techno",
    "Bluechip Engineering & Technologies",
    "EPC contractor India",
    "Civil construction Surat",
    "Civil construction company Gujarat",
    "Facade engineering India",
    "Industrial construction contractors",
    "Precast wall slab systems",
    "PEB structures",
  ],
  alternates: {
    canonical: "/",
  },
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

  const [{ data: servicesData }, { data: faqData }, { data: heroSlidesData }] =
    await Promise.all([
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
      supabase
        .from("hero_slides")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
    ]);

  const services = servicesData?.length
    ? servicesData.map(mapServiceToHomeService)
    : HOME_SERVICES;
  const faqs = faqData?.length ? faqData.map(mapFaqToMockFaq) : [];
  const heroSlides = heroSlidesData?.length
    ? heroSlidesData.map(mapHeroSlideToMockSlide)
    : HERO_SLIDES;

  return (
    <>
      <HeroSection slides={heroSlides} />
      <TrustedLeadersSection />
      <ServicesSection initialServices={services} />
      <ProjectsCarouselSection />
      <JourneyMilestonesSection />
      <FaqSection initialFaqs={faqs} />
      <ContactMapSection />
    </>
  );
}
