import { JOURNEY_PROJECTS } from "@/lib/mock-data";
import { PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";


export const SUBCATEGORY_KEYWORDS: Record<string, string[]> = {
  epc: ["epc"],
  "civil-construction": ["civil", "construction"],
  "mechanical-works": ["mechanical", "industrial"],
  "facade-engineering": ["facade", "terminal"],
  "industrial-construction": ["industrial"],
  "piling-foundations": ["foundation"],
  "control-buildings": ["control", "campus"],
  "etp-stp": ["utility", "treatment"],
  "peb-structures-shades": ["steel", "structural"],
  "rcc-flooring": ["civil"],

  roads: ["logistics", "transport"],
  "rigid-pavement-dlc-pqc": ["infrastructure", "corridor"],
  "flexible-pavement-bitumen": ["infrastructure", "utility"],
  "drainage-systems": ["utility", "water"],
  "sewage-networks": ["water", "infrastructure"],
  "water-supply-networks": ["water"],
  "cable-trenches": ["utility", "industrial"],

  airports: ["airport", "terminal", "transport"],
  "power-plants": ["industrial", "power"],
  "oil-gas": ["industrial", "utility"],
  "steel-plants": ["steel", "industrial"],
  "sez-infrastructure": ["infrastructure", "logistics"],

  "commercial-buildings": ["commercial", "corporate", "office"],
  "residential-buildings": ["residential", "building"],
  "it-campuses-buildings": ["campus", "corporate"],
  hospitality: ["hospitality", "hotel"],
  schools: ["academic", "institutional"],
  auditoriums: ["institutional", "block"],
  "statutory-buildings": ["institutional", "civil"],

  "composite-structures": ["structural", "steel"],
  "light-gauge-steel-frames": ["steel", "structural"],
  "precast-wall-slab-systems": ["structural", "civil"],
  "self-supporting-roofing": ["facade", "structural"],
  "suspended-slab-systems": ["structural", "building"],

  "hybrid-structural-solutions": ["hybrid", "structural", "epc"],
  "multi-technology-configurations": [
    "technology",
    "utility",
    "engineering",
  ],

  "optimized-execution-methodologies": [
    "delivery",
    "execution",
    "epc",
  ],

  "speed-safety-and-cost-efficiencies": [
    "safety",
    "efficiency",
    "infrastructure",
  ],
};

export function rotateProjects(seed: string) {
  const hash = seed
    .split("")
    .reduce(
      (acc, char, index) => acc + char.charCodeAt(0) * (index + 1),
      0
    );

  const start = hash % JOURNEY_PROJECTS.length;

  const ordered = [
    ...JOURNEY_PROJECTS.slice(start),
    ...JOURNEY_PROJECTS.slice(0, start),
  ];

  return Array.from(
    { length: 12 },
    (_, index) => ordered[index % ordered.length]
  );
}

export function getProjectsForSubcategory(subcategorySlug: string) {
  const keywords = SUBCATEGORY_KEYWORDS[subcategorySlug] ?? [];

  const matches = JOURNEY_PROJECTS.filter((project) => {
    const haystack =
      `${project.title} ${project.category} ${project.projectType} ${project.summary}`.toLowerCase();

    return keywords.some((keyword) =>
      haystack.includes(keyword.toLowerCase())
    );
  });

  if (matches.length >= 6) {
    return matches;
  }

  if (matches.length > 0) {
    const fallback = rotateProjects(subcategorySlug).filter(
      (project) =>
        !matches.some((match) => match.id === project.id)
    );

    return [...matches, ...fallback].slice(0, 12);
  }

  return rotateProjects(subcategorySlug);
}


export function getProjectsByColumnTitle(columnTitle: string) {
  const matchingSubcategories = PROJECT_SUBCATEGORIES.filter(
    (subcategory) => subcategory.columnTitle === columnTitle
  );

  const slugs = matchingSubcategories.map(
    (subcategory) => subcategory.slug
  );

  return JOURNEY_PROJECTS.filter((project) => {
    const haystack =
      `${project.title} ${project.category} ${project.projectType} ${project.summary}`.toLowerCase();

    return slugs.some((slug) => {
      const keywords = SUBCATEGORY_KEYWORDS[slug] ?? [];

      return keywords.some((keyword) =>
        haystack.includes(keyword.toLowerCase())
      );
    });
  });
}

export function getSubcategoryLabelForProject(project: {
  title: string;
  category: string;
  projectType: string;
  summary: string;
}) {
  const haystack =
    `${project.title} ${project.category} ${project.projectType} ${project.summary}`.toLowerCase();

  for (const [slug, keywords] of Object.entries(SUBCATEGORY_KEYWORDS)) {
    const hasMatch = keywords.some((keyword) =>
      haystack.includes(keyword.toLowerCase())
    );

    if (hasMatch) {
      return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  }

  return "Project";
}