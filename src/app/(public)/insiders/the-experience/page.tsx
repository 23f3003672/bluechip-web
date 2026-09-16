import type { Metadata } from "next";
import { InsidersGallerySection } from "@/components/sections/InsidersGallerySection";
import { getInsidersPageData } from "@/lib/insiders-server-utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Experience | B'Chip Insiders | Bluechip Engineering",
  description:
    "Explore aerial vistas, behind-the-scenes engineering precision, and landmark milestones across Bluechip's projects.",
};

export default async function TheExperiencePage() {
  const pageData = await getInsidersPageData("the-experience");

  return (
    <InsidersGallerySection
      title={pageData.title}
      description={pageData.description}
      groups={pageData.groups}
    />
  );
}
