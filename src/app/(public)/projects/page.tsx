import type { Metadata } from "next";
import { ProjectsTimelineSection } from "@/components/sections/ProjectsTimelineSection";
import { createClient } from "@/lib/supabase/server";
import { mapProjectToJourneyProject } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Featured Projects & Infrastructure Journey",
  description:
    "Explore Bluechip Engineering's portfolio of landmark infrastructure, EPC, civil, mechanical, and architectural facade projects delivered across India since 1998.",
  keywords: [
    "Bluechip Engineering projects",
    "infrastructure portfolio India",
    "EPC completed projects",
    "civil construction projects Gujarat",
    "industrial construction portfolio",
  ],
  alternates: {
    canonical: "/projects",
  },
};

export const revalidate = 300;

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, title, slug, description, excerpt, thumbnail_url, gallery, category_id, client, location, year, featured, published, sort_order, created_at, updated_at")
    .eq("published", true)
    .order("year", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  const records = data?.length
    ? data.map(mapProjectToJourneyProject).sort((a, b) => {
        const yearA = a.year ?? 0;
        const yearB = b.year ?? 0;
        if (yearB !== yearA) return yearB - yearA;
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      })
    : [];

  return <ProjectsTimelineSection initialProjects={records} />;
}
