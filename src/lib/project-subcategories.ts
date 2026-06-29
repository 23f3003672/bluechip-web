export type MegaMenuKey = "business" | "projects" | "innovations";

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
      title: "Services",
      href: "/business/services",
      items: [
        { label: "EPC", slug: "epc" },
        { label: "Civil Construction", slug: "civil-construction" },
        { label: "Mechanical Works", slug: "mechanical-works" },
        { label: "Facade Engineering", slug: "facade-engineering" },
        { label: "Industrial Construction", slug: "industrial-construction" },
        { label: "Piling & Foundations", slug: "piling-foundations" },
      ],
    },
    {
      title: "Industrial Structures",
      href: "/business/industrial-structures",
      items: [
        { label: "Control Buildings", slug: "control-buildings" },
        { label: "ETP/STP", slug: "etp-stp" },
        { label: "PEB Structures & Shades", slug: "peb-structures-shades" },
        { label: "RCC Flooring", slug: "rcc-flooring" },
      ],
    },
    {
      title: "Infrastructure",
      href: "/business/infrastructure",
      items: [
        { label: "Roads", slug: "roads" },
        { label: "Rigid Pavement (DLC, PQC)", slug: "rigid-pavement-dlc-pqc" },
        { label: "Flexible Pavement (Bitumen)", slug: "flexible-pavement-bitumen" },
        { label: "Drainage Systems", slug: "drainage-systems" },
        { label: "Sewage Networks", slug: "sewage-networks" },
        { label: "Water Supply Networks", slug: "water-supply-networks" },
        { label: "Cable Trenches", slug: "cable-trenches" },
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
      href: "/innovation/construction-technologies",
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
      href: "/innovation/integrated-systems",
      items: [
        { label: "Hybrid Structural Solutions", slug: "hybrid-structural-solutions" },
        { label: "Multi-Technology Configurations", slug: "multi-technology-configurations" },
      ],
    },
    {
      title: "Engineering Excellence",
      href: "/innovation/engineering-excellence",
      items: [
        { label: "Optimized Execution Methodologies", slug: "optimized-execution-methodologies" },
        { label: "Speed, Safety, and Cost Efficiencies", slug: "speed-safety-and-cost-efficiencies" },
      ],
    },
  ],
};

export const PROJECT_SUBCATEGORIES: ProjectSubcategory[] = Object.entries(NAVBAR_MEGA_MENU).flatMap(
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

export const PROJECT_SUBCATEGORY_MAP: Record<string, ProjectSubcategory> =
  PROJECT_SUBCATEGORIES.reduce<Record<string, ProjectSubcategory>>((acc, subcategory) => {
    acc[subcategory.slug] = subcategory;
    return acc;
  }, {});
