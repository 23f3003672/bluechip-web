import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BusinessPageContent, type BusinessProjectItem } from "@/components/sections/BusinessPageContent";

export const metadata: Metadata = {
  title: "EPC, Civil, Mechanical & Facade Services",
  description:
    "Explore Bluechip Engineering's turnkey EPC solutions across Water & Solid Waste Management, Civil Construction, Mechanical Works, and Architectural Facade Engineering across India.",
  keywords: [
    "EPC contractor India",
    "Civil construction services",
    "Mechanical works contractor",
    "Facade engineering Gujarat",
    "Water and solid waste management",
    "Bluechip Engineering services",
  ],
  alternates: {
    canonical: "/business",
  },
};

export const dynamic = "force-dynamic";

const BUSINESS_CATEGORY_ID = "9de32e89-3987-40e9-ab53-12b5b78c0905";

const FACADE_SLUGS = new Set([
  "stone-cladding",
  "metal-cladding",
  "structural-glazing",
  "spider-glazing",
  "acp",
  "grc",
  "ss-railing",
  "louvers",
  "facade-innovation",
  "facade-engineering",
  // Legacy slugs for backward compatibility:
  "glass-cladding",
  "lift-glazing",
]);

const MECHANICAL_SLUGS = new Set([
  "wave-type-structures",
  "peb-industrial-construction",
  "peb-wave-type-structures",
  "peb-structures-shades",
  "mechanical-works",
  "metal-sheets",
]);

const WATER_SLUGS = new Set([
  "water-and-solid-waste-management",
  "water-waste-management",
  "etp-stp",
  "water",
  "drainage-systems",
]);

const CIVIL_SLUGS = new Set([
  "piling",
  "road",
  "building-construction",
  "industrial-construction",
  "drains",
  "water-network",
  "elevated-water-tanks",
  "civil-construction",
  "epc",
  "piling-foundations",
  "roads",
  "rigid-pavement-dlc-pqc",
  "flexible-pavement-bitumen",
  "sewage-networks",
  "water-supply-networks",
  "cable-trenches",
  "control-buildings",
  "rcc-flooring",
]);

const TAG_LOOKUP: Record<string, string> = {
  // Civil
  piling: "PILING",
  "piling-foundations": "PILING",
  road: "ROAD",
  roads: "ROAD",
  "rigid-pavement-dlc-pqc": "ROAD",
  "flexible-pavement-bitumen": "ROAD",
  "building-construction": "BUILDING CONSTRUCTION",
  epc: "BUILDING CONSTRUCTION",
  "industrial-construction": "INDUSTRIAL CONSTRUCTION",
  drains: "DRAINS",
  "drainage-systems": "DRAINS",
  "water-network": "WATER NETWORK",
  "water-supply-networks": "WATER NETWORK",
  "elevated-water-tanks": "ELEVATED WATER TANKS",
  "civil-construction": "BUILDING CONSTRUCTION",

  // Mechanical (Wave Type Structures & PEB Industrial Construction only)
  "wave-type-structures": "WAVE TYPE STRUCTURES",
  "peb-industrial-construction": "PEB INDUSTRIAL CONSTRUCTION",
  "peb-wave-type-structures": "WAVE TYPE STRUCTURES",
  "peb-structures-shades": "PEB INDUSTRIAL CONSTRUCTION",
  "mechanical-works": "WAVE TYPE STRUCTURES",
  "metal-sheets": "WAVE TYPE STRUCTURES",

  // Facade (Louvers added; Glass Cladding & Lift Glazing removed/aliased)
  "stone-cladding": "STONE CLADDING",
  "metal-cladding": "METAL CLADDING",
  "structural-glazing": "STRUCTURAL GLAZING",
  "spider-glazing": "SPIDER GLAZING",
  acp: "ACP",
  grc: "GRC",
  "ss-railing": "SS RAILING",
  louvers: "LOUVERS",
  "facade-innovation": "INNOVATION",
  "facade-engineering": "STRUCTURAL GLAZING",
  "glass-cladding": "STONE CLADDING",
  "lift-glazing": "STRUCTURAL GLAZING",

  // Water
  "water-and-solid-waste-management": "WATER & WASTE MANAGEMENT",
  "water-waste-management": "WATER & WASTE MANAGEMENT",
  "etp-stp": "WATER & WASTE MANAGEMENT",
};

function mapDbProjectToBusinessItem(dbP: {
  id: string;
  title: string;
  slug: string;
  thumbnail_url?: string | null;
  client?: string | null;
  location?: string | null;
  year?: string | number | null;
  category_id?: string | null;
}): BusinessProjectItem | null {
  const clientSlug = (dbP.client || "").toLowerCase();

  if (FACADE_SLUGS.has(clientSlug)) {
    let subcategoryTag = TAG_LOOKUP[clientSlug] || "STRUCTURAL GLAZING";
    if (clientSlug === "facade-engineering" && dbP.title) {
      const lower = dbP.title.toLowerCase();
      if (lower.includes("louver")) subcategoryTag = "LOUVERS";
      else if (lower.includes("spider")) subcategoryTag = "SPIDER GLAZING";
      else if (lower.includes("stone")) subcategoryTag = "STONE CLADDING";
      else if (lower.includes("metal cladding")) subcategoryTag = "METAL CLADDING";
      else if (lower.includes("acp")) subcategoryTag = "ACP";
      else if (lower.includes("grc")) subcategoryTag = "GRC";
      else if (lower.includes("railing")) subcategoryTag = "SS RAILING";
      else if (lower.includes("structural")) subcategoryTag = "STRUCTURAL GLAZING";
    }

    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "facade",
      subcategoryTag,
      imageUrl: dbP.thumbnail_url || "/home/projects/facade.webp",
      location: dbP.location || undefined,
      year: dbP.year || undefined,
    };
  }

  if (MECHANICAL_SLUGS.has(clientSlug)) {
    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "mechanical",
      subcategoryTag: TAG_LOOKUP[clientSlug] || "WAVE TYPE STRUCTURES",
      imageUrl: dbP.thumbnail_url || "/home/projects/power-plant.webp",
      location: dbP.location || undefined,
      year: dbP.year || undefined,
    };
  }

  if (WATER_SLUGS.has(clientSlug)) {
    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "water",
      subcategoryTag: TAG_LOOKUP[clientSlug] || "WATER & WASTE MANAGEMENT",
      imageUrl: dbP.thumbnail_url || "/home/projects/oil.webp",
      location: dbP.location || undefined,
      year: dbP.year || undefined,
    };
  }

  if (CIVIL_SLUGS.has(clientSlug) || dbP.category_id === BUSINESS_CATEGORY_ID) {
    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "civil",
      subcategoryTag: TAG_LOOKUP[clientSlug] || "BUILDING CONSTRUCTION",
      imageUrl: dbP.thumbnail_url || "/home/projects/school.webp",
      location: dbP.location || undefined,
      year: dbP.year || undefined,
    };
  }

  return null;
}

export default async function BusinessPage() {
  const supabase = await createClient();

  const businessProjects: BusinessProjectItem[] = [];

  try {
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("id, title, slug, thumbnail_url, client, location, year, category_id")
      .eq("published", true)
      .order("year", { ascending: false });

    if (dbProjects && dbProjects.length > 0) {
      for (const dbP of dbProjects) {
        const item = mapDbProjectToBusinessItem(dbP);
        if (item) {
          businessProjects.push(item);
        }
      }
    }
  } catch (error) {
    console.error("Error loading business projects from database:", error);
  }

  return <BusinessPageContent projects={businessProjects} />;
}
