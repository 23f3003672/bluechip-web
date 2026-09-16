import type { Metadata } from "next";
import { InsidersGallerySection } from "@/components/sections/InsidersGallerySection";
import { getInsidersPageData } from "@/lib/insiders-server-utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The People | B'Chip Insiders | Bluechip Engineering",
  description:
    "Celebrating the people, vibrant culture, leadership meetings, and collaborative spirit that power Bluechip Engineering.",
};

export default async function ThePeoplePage() {
  const pageData = await getInsidersPageData("the-people");

  return (
    <InsidersGallerySection
      title={pageData.title}
      description={pageData.description}
      groups={pageData.groups}
    />
  );
}
