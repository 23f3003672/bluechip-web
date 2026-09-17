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

const CURATED_INNOVATION_PROJECTS: InnovationProjectItem[] = [
  // ─── 1. Construction Technologies ───────────────────────────────────
  {
    id: "inno-const-1",
    title: "Construction of Composite Structure",
    slug: "construction-of-composite-structure",
    category: "construction",
    subcategoryTag: "COMPOSITE STRUCTURES",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785480329211-innovation-precast-building.webp",
    location: "Gujarat, India",
    year: 2026,
  },
  {
    id: "inno-const-2",
    title: "Light Gauge Steel Structure",
    slug: "light-gauge-steel-structure",
    category: "construction",
    subcategoryTag: "LIGHT GAUGE STEEL FRAMES",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785466386485-industrial-piling-work3.webp",
    location: "Dahej, Gujarat",
    year: 2026,
  },
  {
    id: "inno-const-3",
    title: "RCC Precast Wall & Slab",
    slug: "rcc-precast-wall-slab",
    category: "construction",
    subcategoryTag: "PRECAST WALL & SLAB SYSTEMS",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785479994275-inno-precast-small-1.webp",
    location: "Ahmedabad, Gujarat",
    year: 2026,
  },
  {
    id: "inno-const-4",
    title: "Self-Supporting Roof Construction",
    slug: "self-supporting-roof-construction",
    category: "construction",
    subcategoryTag: "SELF SUPPORTING ROOFING",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785483896175-self-supporting-structure-m1.webp",
    location: "Surat, Gujarat",
    year: 2026,
  },
  {
    id: "inno-const-5",
    title: "Deck Slab System",
    slug: "deck-slab-system",
    category: "construction",
    subcategoryTag: "SUSPENDED SLAB SYSTEMS",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785483959156-suspended-slab1.webp",
    location: "Mumbai, Maharashtra",
    year: 2026,
  },
  {
    id: "inno-const-6",
    title: "Suspended Slab",
    slug: "suspended-slab",
    category: "construction",
    subcategoryTag: "SUSPENDED SLAB SYSTEMS",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785483946940-suspended-slab-innovation-susp-slab-sm.webp",
    location: "Gandhinagar, Gujarat",
    year: 2026,
  },
  {
    id: "inno-const-7",
    title: "Providing & Laying of RCC Precast Drain",
    slug: "providing-laying-of-rcc-precast",
    category: "construction",
    subcategoryTag: "PRECAST WALL & SLAB SYSTEMS",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785479974374-inno-precast-drain-egg-small-2.webp",
    location: "Bharuch, Gujarat",
    year: 2026,
  },
  {
    id: "inno-const-8",
    title: "Metal Roofing",
    slug: "metal-roofing",
    category: "construction",
    subcategoryTag: "SELF SUPPORTING ROOFING",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785480274528-inno-self-supporting-roof-material.webp",
    location: "Dahej, Gujarat",
    year: 2026,
  },
  {
    id: "inno-const-9",
    title: "Composite Structure",
    slug: "composite-structure",
    category: "construction",
    subcategoryTag: "COMPOSITE STRUCTURES",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785483878784-self-supporting-struct-m1.webp",
    location: "Surat, Gujarat",
    year: 2026,
  },
  {
    id: "inno-const-10",
    title: "Light Gauge Steel Structure (Innovation)",
    slug: "light-gauge-steel-structure-innovation",
    category: "construction",
    subcategoryTag: "LIGHT GAUGE STEEL FRAMES",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785479956116-inno-light-gauge-still-structure1-m1.webp",
    location: "Vadodara, Gujarat",
    year: 2026,
  },

  // ─── 2. Integrated Systems ──────────────────────────────────────────
  {
    id: "inno-int-1",
    title: "Composite Steel Frame Structure & Concrete Deck Slab Execution",
    slug: "composite-steel-frame-structure-concrete",
    category: "integrated",
    subcategoryTag: "HYBRID STRUCTURAL SOLUTIONS",
    imageUrl: "/home/projects/PEB_kaviish_m1.webp",
    location: "Gandhinagar, Gujarat",
    year: 2024,
  },
  {
    id: "inno-int-2",
    title: "Specialized EPC Work: Civil, Mechanical & Facade Works at Porbandar Airport",
    slug: "specialized-epc-work-civil-mechanical-porbandar",
    category: "integrated",
    subcategoryTag: "MULTI-TECHNOLOGY CONFIGURATIONS",
    imageUrl: "/home/projects/home-project-airport.webp",
    location: "Porbandar, Gujarat",
    year: 2024,
  },
  {
    id: "inno-int-3",
    title: "EPC Pre-Engineering Work with Metal Roofing & Building Construction",
    slug: "epc-pre-engineering-work-with-metal-roofing",
    category: "integrated",
    subcategoryTag: "HYBRID STRUCTURAL SOLUTIONS",
    imageUrl: "/home/projects/commercialbuilding_sgcci.webp",
    location: "Surat, Gujarat",
    year: 2023,
  },
  {
    id: "inno-int-4",
    title: "EPC Work for India's 1st Bullet Train Station (Anand-Nadiad)",
    slug: "epc-work-for-indias-1st-bullet",
    category: "integrated",
    subcategoryTag: "MULTI-TECHNOLOGY CONFIGURATIONS",
    imageUrl: "/home/hero/hero-image-1.webp",
    location: "Anand, Gujarat",
    year: 2025,
  },

  // ─── 3. Engineering Excellence ──────────────────────────────────────
  {
    id: "inno-eng-1",
    title: "Steel Mold/Formwork for Precast Concrete U-Drains and Box Culverts",
    slug: "steel-moldformwork-for-precast-concrete-u-drains",
    category: "engineering",
    subcategoryTag: "SPEED, SAFETY, AND COST EFFICIENCIES",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785479884797-infra-drain-ushape-machine.webp",
    location: "Dahej, Gujarat",
    year: 2026,
  },
  {
    id: "inno-eng-2",
    title: "RCC Precast Compound Wall Construction",
    slug: "rcc-precast-compound-wall-construction",
    category: "engineering",
    subcategoryTag: "SPEED, SAFETY, AND COST EFFICIENCIES",
    imageUrl:
      "https://vkqpzmpkqkikrdyhrkwk.supabase.co/storage/v1/object/public/media/uploads/1785484464895-precast-wall6.webp",
    location: "Hazira, Gujarat",
    year: 2026,
  },
  {
    id: "inno-eng-3",
    title: "Rigid Cement Concrete (RCC) Road Construction Using Mechanical Sensor Paver Technology",
    slug: "rigid-cement-concrete-rcc-road-construction",
    category: "engineering",
    subcategoryTag: "OPTIMIZED EXECUTION METHODOLOGIES",
    imageUrl: "/home/projects/PEB_kaviish_m1.webp",
    location: "Hazira, Gujarat",
    year: 2024,
  },
  {
    id: "inno-eng-4",
    title: "Piling & Pile Foundation Work",
    slug: "piling-pile-foundation-work",
    category: "engineering",
    subcategoryTag: "OPTIMIZED EXECUTION METHODOLOGIES",
    imageUrl: "/home/projects/home-project-airport.webp",
    location: "Pune, Maharashtra",
    year: 2023,
  },
];

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
    };
  }

  return null;
}

export default async function InnovationPage() {
  const supabase = await createClient();

  let projects = CURATED_INNOVATION_PROJECTS;

  try {
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("id, title, slug, thumbnail_url, client, location, year, category_id")
      .eq("published", true)
      .order("year", { ascending: false });

    if (dbProjects && dbProjects.length > 0) {
      // Enhance curated projects with any live DB records where slugs match
      const dbMap = new Map(dbProjects.map((p) => [p.slug, p]));

      projects = CURATED_INNOVATION_PROJECTS.map((item) => {
        const dbMatch = dbMap.get(item.slug);
        if (dbMatch) {
          return {
            ...item,
            title: dbMatch.title || item.title,
            imageUrl: dbMatch.thumbnail_url || item.imageUrl,
            location: dbMatch.location || item.location,
            year: dbMatch.year || item.year,
          };
        }
        return item;
      });

      // Dynamically append newly uploaded database projects not in curated list
      const curatedSlugs = new Set(CURATED_INNOVATION_PROJECTS.map((p) => p.slug));
      const newProjects: InnovationProjectItem[] = [];

      for (const dbP of dbProjects) {
        if (curatedSlugs.has(dbP.slug)) continue;

        const isInnovation =
          dbP.category_id === INNOVATION_CATEGORY_ID ||
          CONSTRUCTION_SLUGS.has(dbP.client || "") ||
          INTEGRATED_SLUGS.has(dbP.client || "") ||
          ENGINEERING_SLUGS.has(dbP.client || "");

        if (isInnovation) {
          const item = mapDbProjectToInnovationItem(dbP);
          if (item) {
            newProjects.push(item);
          }
        }
      }

      projects = [...projects, ...newProjects];
    }
  } catch (error) {
    console.error("Error loading innovation projects from database:", error);
  }

  return <InnovationPageContent projects={projects} />;
}
