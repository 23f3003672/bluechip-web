import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BusinessPageContent, type BusinessProjectItem } from "@/components/sections/BusinessPageContent";

export const metadata: Metadata = {
  title: "Business & Engineering Services",
  description:
    "Explore Bluechip Engineering's turnkey EPC solutions across Water & Solid Waste Management, Civil Construction, Mechanical Works, and Facade Engineering.",
};

export const dynamic = "force-dynamic";

const CURATED_BUSINESS_PROJECTS: BusinessProjectItem[] = [
  // ─── 1. Water & Solid Waste Management ──────────────────────────────
  {
    id: "water-1",
    title: "Laying of RCC Hume Pipes for Industrial Project",
    slug: "laying-of-rcc-hume-pipes",
    category: "water",
    subcategoryTag: "WATER & WASTE MANAGEMENT",
    imageUrl: "/home/projects/oil.webp",
    location: "Dahej, Gujarat",
    year: 2023,
  },
  {
    id: "water-2",
    title: "Construction, Supply & Laying of M30 Grade RCC Manhole",
    slug: "construction-supply-laying-of-m30",
    category: "water",
    subcategoryTag: "WATER & WASTE MANAGEMENT",
    imageUrl: "/home/projects/commercialbuilding_sgcci.webp",
    location: "Surat, Gujarat",
    year: 2022,
  },
  {
    id: "water-3",
    title: "Civil Work for Construction of RCC Gutter",
    slug: "civil-work-for-construction-of-rcc",
    category: "water",
    subcategoryTag: "WATER & WASTE MANAGEMENT",
    imageUrl: "/home/projects/home-project-oil.webp",
    location: "Bharuch, Gujarat",
    year: 2021,
  },
  {
    id: "water-4",
    title: "Manufacturing Utility Corridor & Effluent Treatment",
    slug: "manufacturing-utility-corridor",
    category: "water",
    subcategoryTag: "WATER & WASTE MANAGEMENT",
    imageUrl: "/home/projects/power-plant.webp",
    location: "Bharuch, Gujarat",
    year: 2012,
  },

  // ─── 2. Civil Construction (Matches Image 3) ────────────────────────
  {
    id: "civil-1",
    title: "One Indiabulls Park Corporate Campus",
    slug: "one-indiabulls-park",
    category: "civil",
    subcategoryTag: "BUILDING CONSTRUCTION",
    imageUrl: "/home/projects/school.webp",
    location: "Mumbai, Maharashtra",
    year: 2021,
  },
  {
    id: "civil-2",
    title: "Surat Diamond Association Trade Center",
    slug: "surat-diamond-association",
    category: "civil",
    subcategoryTag: "BUILDING CONSTRUCTION",
    imageUrl: "/home/projects/commercialbuilding_sgcci.webp",
    location: "Surat, Gujarat",
    year: 2025,
  },
  {
    id: "civil-3",
    title: "Civil & Structural Work for 400kV Switch Yard (5x800 MW TPS)",
    slug: "civil-structural-architectural-work-for",
    category: "civil",
    subcategoryTag: "INDUSTRIAL CONSTRUCTION",
    imageUrl: "/home/projects/oil.webp",
    location: "Yadadri, Telangana",
    year: 2022,
  },
  {
    id: "civil-4",
    title: "Institutional Academic Complex & Deep Piling Block",
    slug: "institutional-academic-block",
    category: "civil",
    subcategoryTag: "PILING",
    imageUrl: "/home/projects/home-project-airport.webp",
    location: "Pune, Maharashtra",
    year: 2023,
  },
  {
    id: "civil-5",
    title: "Rigid Cement Concrete (RCC) Road Using Sensor Paver",
    slug: "rigid-cement-concrete-rcc-road-construction",
    category: "civil",
    subcategoryTag: "ROAD",
    imageUrl: "/home/projects/PEB_kaviish_m1.webp",
    location: "Hazira, Gujarat",
    year: 2024,
  },
  {
    id: "civil-6",
    title: "Hotel Leela Luxury Towers & Elevated Reservoir Tanks",
    slug: "hotel-leela",
    category: "civil",
    subcategoryTag: "ELEVATED WATER TANKS",
    imageUrl: "/home/projects/residential.webp",
    location: "Gandhinagar, Gujarat",
    year: 2017,
  },

  // ─── 3. Mechanical Works ─────────────────────────────────────────────
  {
    id: "mech-1",
    title: "EPC Pre-Engineered Building (PEB) Structure with Metal Roofing",
    slug: "epc-pre-engineered-building-peb-structure-with",
    category: "mechanical",
    subcategoryTag: "PEB WAVE TYPE STRUCTURES",
    imageUrl: "/home/projects/PEB_kaviish_m1.webp",
    location: "Surat, Gujarat",
    year: 2023,
  },
  {
    id: "mech-2",
    title: "Industrial Ventilation Louvers & Steel Innovation Center",
    slug: "steel-innovation-center",
    category: "mechanical",
    subcategoryTag: "LOUVERS",
    imageUrl: "/home/projects/facade.webp",
    location: "Vadodara, Gujarat",
    year: 2019,
  },
  {
    id: "mech-3",
    title: "High-Tensile Standing Seam Metal Roofing & Decking",
    slug: "metal-roofing",
    category: "mechanical",
    subcategoryTag: "METAL SHEETS",
    imageUrl: "/home/projects/power-plant.webp",
    location: "Dahej, Gujarat",
    year: 2022,
  },
  {
    id: "mech-4",
    title: "Smart Logistics Hub & Heavy Pre-Engineered Warehouse",
    slug: "smart-logistics-hub",
    category: "mechanical",
    subcategoryTag: "PEB WAVE TYPE STRUCTURES",
    imageUrl: "/home/projects/oil.webp",
    location: "Nagpur, Maharashtra",
    year: 2024,
  },

  // ─── 4. Facade Works ─────────────────────────────────────────────────
  {
    id: "facade-1",
    title: "Facade Design & Execution for Airspace Above Gandhinagar Station",
    slug: "facade-design-execution-for-airspace-gandhinagar",
    category: "facade",
    subcategoryTag: "STRUCTURAL GLAZING",
    imageUrl: "/home/projects/facade.webp",
    location: "Gandhinagar, Gujarat",
    year: 2023,
  },
  {
    id: "facade-2",
    title: "Comprehensive Facade & Architectural Envelope (Indiabulls)",
    slug: "comprehensive-facade-interior-works-indiabulls",
    category: "facade",
    subcategoryTag: "GLASS CLADDING",
    imageUrl: "/home/projects/school.webp",
    location: "Mumbai, Maharashtra",
    year: 2021,
  },
  {
    id: "facade-3",
    title: "Specialized Facade & Architectural Metal Cladding at Airport",
    slug: "specialized-epc-work-civil-mechanical-porbandar",
    category: "facade",
    subcategoryTag: "METAL CLADDING",
    imageUrl: "/home/projects/home-project-airport.webp",
    location: "Porbandar, Gujarat",
    year: 2024,
  },
  {
    id: "facade-4",
    title: "Commercial Facade Engineering & Exterior Cladding",
    slug: "facade-work-for-big-bazaar",
    category: "facade",
    subcategoryTag: "ACP",
    imageUrl: "/home/projects/commercialbuilding_sgcci.webp",
    location: "Surat, Gujarat",
    year: 2020,
  },
  {
    id: "facade-5",
    title: "Hotel Leela Balustrades, SS Railing & Lift Glazing",
    slug: "hotel-leela",
    category: "facade",
    subcategoryTag: "SS RAILING",
    imageUrl: "/home/projects/residential.webp",
    location: "Gandhinagar, Gujarat",
    year: 2017,
  },
  {
    id: "facade-6",
    title: "Surat Diamond House Spider Glazing & GRC Feature Walls",
    slug: "surat-diamond-house",
    category: "facade",
    subcategoryTag: "SPIDER GLAZING",
    imageUrl: "/home/projects/home-project-oil.webp",
    location: "Surat, Gujarat",
    year: 2023,
  },
];

const BUSINESS_CATEGORY_ID = "9de32e89-3987-40e9-ab53-12b5b78c0905";

const FACADE_SLUGS = new Set([
  "stone-cladding",
  "glass-cladding",
  "grc",
  "facade-innovation",
  "metal-cladding",
  "structural-glazing",
  "spider-glazing",
  "acp",
  "lift-glazing",
  "ss-railing",
  "facade-engineering",
]);

const MECHANICAL_SLUGS = new Set([
  "peb-wave-type-structures",
  "louvers",
  "metal-sheets",
  "mechanical-works",
  "peb-structures-shades",
]);

const WATER_SLUGS = new Set([
  "water-and-solid-waste-management",
  "water-waste-management",
  "etp-stp",
  "water",
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
  "drainage-systems",
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
  "peb-wave-type-structures": "PEB WAVE TYPE STRUCTURES",
  "peb-structures-shades": "PEB WAVE TYPE STRUCTURES",
  louvers: "LOUVERS",
  "metal-sheets": "METAL SHEETS",
  "mechanical-works": "PEB WAVE TYPE STRUCTURES",
  "stone-cladding": "STONE CLADDING",
  "glass-cladding": "GLASS CLADDING",
  grc: "GRC",
  "facade-innovation": "INNOVATION",
  "metal-cladding": "METAL CLADDING",
  "structural-glazing": "STRUCTURAL GLAZING",
  "spider-glazing": "SPIDER GLAZING",
  acp: "ACP",
  "lift-glazing": "LIFT GLAZING",
  "ss-railing": "SS RAILING",
  "facade-engineering": "STRUCTURAL GLAZING",
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
    return {
      id: dbP.id,
      title: dbP.title,
      slug: dbP.slug,
      category: "facade",
      subcategoryTag: TAG_LOOKUP[clientSlug] || "STRUCTURAL GLAZING",
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
      subcategoryTag: TAG_LOOKUP[clientSlug] || "PEB WAVE TYPE STRUCTURES",
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

  let projects = CURATED_BUSINESS_PROJECTS;

  try {
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("id, title, slug, thumbnail_url, client, location, year, category_id")
      .eq("published", true)
      .order("year", { ascending: false });

    if (dbProjects && dbProjects.length > 0) {
      // Enhance curated projects with any live DB records where slugs match
      const dbMap = new Map(dbProjects.map((p) => [p.slug, p]));

      projects = CURATED_BUSINESS_PROJECTS.map((item) => {
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
      const curatedSlugs = new Set(CURATED_BUSINESS_PROJECTS.map((p) => p.slug));
      const newProjects: BusinessProjectItem[] = [];

      for (const dbP of dbProjects) {
        if (curatedSlugs.has(dbP.slug)) continue;

        const isBusiness =
          dbP.category_id === BUSINESS_CATEGORY_ID ||
          FACADE_SLUGS.has(dbP.client || "") ||
          MECHANICAL_SLUGS.has(dbP.client || "") ||
          WATER_SLUGS.has(dbP.client || "") ||
          CIVIL_SLUGS.has(dbP.client || "");

        if (isBusiness) {
          const item = mapDbProjectToBusinessItem(dbP);
          if (item) {
            newProjects.push(item);
          }
        }
      }

      projects = [...projects, ...newProjects];
    }
  } catch (error) {
    console.error("Error loading business projects from database:", error);
  }

  return <BusinessPageContent projects={projects} />;
}
