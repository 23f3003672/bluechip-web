import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  InnovationPageContent,
  type InnovationProjectItem,
} from "@/components/sections/InnovationPageContent";

export const metadata: Metadata = {
  title: "Innovation & Advanced Construction Technologies",
  description:
    "Explore Bluechip Engineering's state-of-the-art construction technologies, precast systems, hybrid structures, and advanced engineering methodologies across India.",
  keywords: [
    "construction technologies",
    "precast wall slab systems",
    "light gauge steel frames",
    "composite structures",
    "self supporting roofing",
    "suspended slab systems",
    "engineering innovation India",
  ],
  alternates: {
    canonical: "/innovation",
  },
};

export const dynamic = "force-dynamic";

const INNOVATION_CATEGORY_ID = "f6753d96-2dae-4f9f-8fd5-fbbc7304129e";

const CONSTRUCTION_SLUGS = new Set([
  "composite-structures",
  "light-gauge-steel-frames",
  "precast-wall-slab-systems",
  "self-supporting-roofing",
  "suspended-slab-systems",
]);

const INTEGRATED_SLUGS = new Set([
  "hybrid-structural-solutions",
  "multi-technology-configurations",
]);

const ENGINEERING_SLUGS = new Set([
  "optimized-execution-methodologies",
  "speed-safety-and-cost-efficiencies",
]);

const INNOVATION_TAG_MAP: Record<string, string> = {
  "composite-structures": "COMPOSITE STRUCTURES",
  "light-gauge-steel-frames": "LIGHT GAUGE STEEL FRAMES",
  "precast-wall-slab-systems": "PRECAST WALL & SLAB SYSTEMS",
  "self-supporting-roofing": "SELF SUPPORTING ROOFING",
  "suspended-slab-systems": "SUSPENDED SLAB SYSTEMS",
  "hybrid-structural-solutions": "HYBRID STRUCTURAL SOLUTIONS",
  "multi-technology-configurations": "MULTI-TECHNOLOGY CONFIGURATIONS",
  "optimized-execution-methodologies": "OPTIMIZED EXECUTION METHODOLOGIES",
  "speed-safety-and-cost-efficiencies": "SPEED, SAFETY, AND COST EFFICIENCIES",
};

function mapDbProjectToInnovationItem(dbP: {
  id: string;
  title: string;
  slug: string;
  thumbnail_url?: string | null;
  client?: string | null;
  location?: string | null;
  year?: string | number | null;
  category_id?: string | null;
  created_at?: string;
}): InnovationProjectItem | null {
  const clientSlug = (dbP.client || "").toLowerCase();

  if (CONSTRUCTION_SLUGS.has(clientSlug)) {
    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "construction",
      subcategoryTag: INNOVATION_TAG_MAP[clientSlug] || "COMPOSITE STRUCTURES",
      imageUrl: dbP.thumbnail_url || "/home/projects/school.webp",
      location: dbP.location || undefined,
      year: dbP.year || undefined,
      createdAt: dbP.created_at,
    };
  }

  if (INTEGRATED_SLUGS.has(clientSlug)) {
    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "integrated",
      subcategoryTag: INNOVATION_TAG_MAP[clientSlug] || "HYBRID STRUCTURAL SOLUTIONS",
      imageUrl: dbP.thumbnail_url || "/home/projects/PEB_kaviish_m1.webp",
      location: dbP.location || undefined,
      year: dbP.year || undefined,
      createdAt: dbP.created_at,
    };
  }

  if (ENGINEERING_SLUGS.has(clientSlug)) {
    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "engineering",
      subcategoryTag: INNOVATION_TAG_MAP[clientSlug] || "OPTIMIZED EXECUTION METHODOLOGIES",
      imageUrl: dbP.thumbnail_url || "/home/projects/home-project-airport.webp",
      location: dbP.location || undefined,
      year: dbP.year || undefined,
      createdAt: dbP.created_at,
    };
  }

  if (dbP.category_id === INNOVATION_CATEGORY_ID) {
    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "construction",
      subcategoryTag: "COMPOSITE STRUCTURES",
      imageUrl: dbP.thumbnail_url || "/home/projects/school.webp",
      location: dbP.location || undefined,
      year: dbP.year || undefined,
      createdAt: dbP.created_at,
    };
  }

  return null;
}

export default async function InnovationPage() {
  const supabase = await createClient();

  const innovationProjects: InnovationProjectItem[] = [];

  try {
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("id, title, slug, thumbnail_url, client, location, year, category_id, created_at")
      .eq("published", true)
      .order("year", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (dbProjects && dbProjects.length > 0) {
      for (const dbP of dbProjects) {
        const isInnovation =
          dbP.category_id === INNOVATION_CATEGORY_ID ||
          CONSTRUCTION_SLUGS.has(dbP.client || "") ||
          INTEGRATED_SLUGS.has(dbP.client || "") ||
          ENGINEERING_SLUGS.has(dbP.client || "");

        if (isInnovation) {
          const item = mapDbProjectToInnovationItem(dbP);
          if (item) {
            innovationProjects.push(item);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error loading innovation projects from database:", error);
  }

  return <InnovationPageContent projects={innovationProjects} />;
}
