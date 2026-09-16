export type MegaMenuKey = "business" | "projects" | "innovations" | "insiders";

export interface MegaMenuItem {
  label: string;
  slug: string;
}

export interface MegaMenuColumn {
  title: string;
  href: string;
  items: MegaMenuItem[];
}

export interface ProjectSubcategory {
  slug: string;
  label: string;
  megaKey: MegaMenuKey;
  columnTitle: string;
}

export const NAVBAR_MEGA_MENU: Record<MegaMenuKey, MegaMenuColumn[]> = {
  business: [
    {
      title: "Civil Construction",
      href: "/business#civil-construction",
      items: [
        { label: "Piling", slug: "piling" },
        { label: "Road", slug: "road" },
        { label: "Building Construction", slug: "building-construction" },
        { label: "Industrial Construction", slug: "industrial-construction" },
        { label: "Drains", slug: "drains" },
        { label: "Water Network", slug: "water-network" },
        { label: "Elevated Water Tanks", slug: "elevated-water-tanks" },
      ],
    },
    {
      title: "Mechanical Works",
      href: "/business#mechanical-works",
      items: [
        { label: "PEB Wave Type Structures", slug: "peb-wave-type-structures" },
        { label: "Louvers", slug: "louvers" },
        { label: "Metal Sheets", slug: "metal-sheets" },
      ],
    },
    {
      title: "Facade Works",
      href: "/business#facade-works",
      items: [
        { label: "Stone Cladding", slug: "stone-cladding" },
        { label: "Glass Cladding", slug: "glass-cladding" },
        { label: "GRC", slug: "grc" },
        { label: "Innovation", slug: "facade-innovation" },
        { label: "Metal Cladding", slug: "metal-cladding" },
        { label: "Structural Glazing", slug: "structural-glazing" },
        { label: "Spider Glazing", slug: "spider-glazing" },
        { label: "ACP", slug: "acp" },
        { label: "Lift Glazing", slug: "lift-glazing" },
        { label: "SS Railing", slug: "ss-railing" },
      ],
    },
    {
      title: "Water & Solid Waste Management",
      href: "/business#water-and-solid-waste-management",
      items: [
        { label: "Water & Waste Management", slug: "water-and-solid-waste-management" },
        { label: "ETP/STP", slug: "etp-stp" },
      ],
    },
  ],
  projects: [
    {
      title: "Sectors",
      href: "/projects/sectors",
      items: [
        { label: "Airports", slug: "airports" },
        { label: "Power Plants", slug: "power-plants" },
        { label: "Oil & Gas", slug: "oil-gas" },
        { label: "Steel Plants", slug: "steel-plants" },
        { label: "SEZ Infrastructure", slug: "sez-infrastructure" },
      ],
    },
    {
      title: "Urban & Institutional",
      href: "/projects/urban-institutional",
      items: [
        { label: "Commercial Buildings", slug: "commercial-buildings" },
        { label: "Residential Buildings", slug: "residential-buildings" },
        { label: "IT Campuses & Buildings", slug: "it-campuses-buildings" },
        { label: "Hospitality", slug: "hospitality" },
        { label: "Schools", slug: "schools" },
        { label: "Auditoriums", slug: "auditoriums" },
        { label: "Statutory Buildings", slug: "statutory-buildings" },
      ],
    },
  ],
  innovations: [
    {
      title: "Construction Technologies",
      href: "/innovation#construction-technologies",
      items: [
        { label: "Composite Structures", slug: "composite-structures" },
        { label: "Light Gauge Steel Frames", slug: "light-gauge-steel-frames" },
        { label: "Precast Wall & Slab Systems", slug: "precast-wall-slab-systems" },
        { label: "Self Supporting Roofing", slug: "self-supporting-roofing" },
        { label: "Suspended Slab Systems", slug: "suspended-slab-systems" },
      ],
    },
    {
      title: "Integrated Systems",
      href: "/innovation#integrated-systems",
      items: [
        { label: "Hybrid Structural Solutions", slug: "hybrid-structural-solutions" },
        { label: "Multi-Technology Configurations", slug: "multi-technology-configurations" },
      ],
    },
    {
      title: "Engineering Excellence",
      href: "/innovation#engineering-excellence",
      items: [
        { label: "Optimized Execution Methodologies", slug: "optimized-execution-methodologies" },
        { label: "Speed, Safety, and Cost Efficiencies", slug: "speed-safety-and-cost-efficiencies" },
      ],
    },
  ],
  insiders: [
    {
      title: "The People",
      href: "/insiders/the-people",
      items: [
        { label: "Meetings & Moments", slug: "meetings-moments" },
        { label: "Life at BlueChip", slug: "life-at-bluechip" },
      ],
    },
    {
      title: "The Experience",
      href: "/insiders/the-experience",
      items: [
        { label: "Aerial Views", slug: "aerial-views" },
        { label: "Behind the Scenes", slug: "behind-the-scenes" },
        { label: "Events & Milestones", slug: "events-milestones" },
      ],
    },
  ],
};

export const INSIDERS_TAXONOMY = {
  "the-people": {
    slug: "the-people",
    title: "The People",
    description:
      "Celebrating the brilliant minds, collaborative spirit, and vibrant culture that drive Bluechip forward every day.",
    subcategories: [
      { slug: "meetings-moments", label: "Meetings & Moments" },
      { slug: "life-at-bluechip", label: "Life at BlueChip" },
    ],
  },
  "the-experience": {
    slug: "the-experience",
    title: "The Experience",
    description:
      "Immersive perspectives, behind-the-scenes mastery, and milestone moments from our high-impact engineering journeys.",
    subcategories: [
      { slug: "aerial-views", label: "Aerial Views" },
      { slug: "behind-the-scenes", label: "Behind the Scenes" },
      { slug: "events-milestones", label: "Events & Milestones" },
    ],
  },
} as const;

const LEGACY_PROJECT_SUBCATEGORIES: ProjectSubcategory[] = [
  { slug: "facade-engineering", label: "Facade Engineering", megaKey: "business", columnTitle: "Facade Works" },
  { slug: "civil-construction", label: "Civil Construction", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "mechanical-works", label: "Mechanical Works", megaKey: "business", columnTitle: "Mechanical Works" },
  { slug: "epc", label: "EPC", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "piling-foundations", label: "Piling & Foundations", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "drainage-systems", label: "Drainage Systems", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "roads", label: "Roads", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "rigid-pavement-dlc-pqc", label: "Rigid Pavement", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "flexible-pavement-bitumen", label: "Flexible Pavement", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "peb-structures-shades", label: "PEB Structures & Shades", megaKey: "business", columnTitle: "Mechanical Works" },
  { slug: "control-buildings", label: "Control Buildings", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "rcc-flooring", label: "RCC Flooring", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "sewage-networks", label: "Sewage Networks", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "water-supply-networks", label: "Water Supply Networks", megaKey: "business", columnTitle: "Civil Construction" },
  { slug: "cable-trenches", label: "Cable Trenches", megaKey: "business", columnTitle: "Civil Construction" },
];

export const PRIMARY_PROJECT_SUBCATEGORIES: ProjectSubcategory[] = Object.entries(NAVBAR_MEGA_MENU).flatMap(
  ([megaKey, columns]) =>
    columns.flatMap((column) =>
      column.items.map((item) => ({
        slug: item.slug,
        label: item.label,
        megaKey: megaKey as MegaMenuKey,
        columnTitle: column.title,
      }))
    )
);

export const PROJECT_SUBCATEGORIES: ProjectSubcategory[] = [
  ...PRIMARY_PROJECT_SUBCATEGORIES,
  ...LEGACY_PROJECT_SUBCATEGORIES,
];

export const PROJECT_SUBCATEGORY_MAP: Record<string, ProjectSubcategory> =
  PROJECT_SUBCATEGORIES.reduce<Record<string, ProjectSubcategory>>((acc, subcategory) => {
    acc[subcategory.slug] = subcategory;
    return acc;
  }, {});
