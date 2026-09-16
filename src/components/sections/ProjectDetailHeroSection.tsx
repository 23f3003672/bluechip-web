import Link from "next/link";
import type { JourneyProject } from "@/lib/mock-data";
import { PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";
import { ProjectHeroSlider } from "./ProjectHeroSlider";

interface ProjectDetailHeroSectionProps {
  project: JourneyProject;
}

const COLUMN_ROUTE_MAP: Record<string, string> = {
  "Civil Construction": "/business#civil-construction",
  "Mechanical Works": "/business#mechanical-works",
  "Facade Works": "/business#facade-engineering",
  "Facade Engineering": "/business#facade-engineering",
  "Water & Solid Waste Management": "/business#water-and-solid-waste-management",
  "Construction Technologies": "/innovation#construction-technologies",
  "Integrated Systems": "/innovation#integrated-systems",
  "Engineering Excellence": "/innovation#engineering-excellence",
  Sectors: "/projects/sectors",
  "Urban & Institutional": "/projects/urban-institutional",
  "The People": "/insiders/the-people",
  "The Experience": "/insiders/the-experience",
};

export function resolveCategoryHref(category?: string): string {
  if (!category) return "/business";
  const catLower = category.trim().toLowerCase();

  if (catLower.includes("business") || catLower.includes("service")) {
    return "/business";
  }
  if (catLower.includes("innovation")) {
    return "/innovation";
  }
  if (catLower === "projects") {
    return "/projects";
  }
  if (catLower.includes("insider")) {
    return "/insiders/the-people";
  }

  // If category itself specifies a specific business section:
  if (catLower.includes("civil")) {
    return "/business#civil-construction";
  }
  if (catLower.includes("mechanical")) {
    return "/business#mechanical-works";
  }
  if (catLower.includes("facade")) {
    return "/business#facade-engineering";
  }
  if (
    catLower.includes("water") ||
    catLower.includes("waste") ||
    catLower.includes("etp") ||
    catLower.includes("stp")
  ) {
    return "/business#water-and-solid-waste-management";
  }
  if (catLower === "epc") {
    return "/business";
  }

  return "/business";
}

export function resolveProjectTypeHref(
  projectType?: string,
  category?: string
): string {
  if (!projectType) {
    return resolveCategoryHref(category);
  }

  const typeTrimmed = projectType.trim();
  const typeLower = typeTrimmed.toLowerCase();

  // 1. Direct match in column route map
  if (COLUMN_ROUTE_MAP[typeTrimmed]) {
    return COLUMN_ROUTE_MAP[typeTrimmed];
  }

  // 2. Direct keyword checks for primary sections
  if (typeLower.includes("civil")) {
    return "/business#civil-construction";
  }
  if (typeLower.includes("mechanical")) {
    return "/business#mechanical-works";
  }
  if (typeLower.includes("facade")) {
    return "/business#facade-engineering";
  }
  if (
    typeLower.includes("water") ||
    typeLower.includes("waste") ||
    typeLower.includes("etp") ||
    typeLower.includes("stp")
  ) {
    return "/business#water-and-solid-waste-management";
  }
  if (typeLower === "epc") {
    return "/business";
  }

  // 3. Innovation sections
  if (
    typeLower.includes("construction tech") ||
    typeLower.includes("composite") ||
    typeLower.includes("precast") ||
    typeLower.includes("suspended slab") ||
    typeLower.includes("light gauge") ||
    typeLower.includes("self supporting")
  ) {
    return "/innovation#construction-technologies";
  }
  if (
    typeLower.includes("integrated system") ||
    typeLower.includes("hybrid structural") ||
    typeLower.includes("multi-technology")
  ) {
    return "/innovation#integrated-systems";
  }
  if (
    typeLower.includes("engineering excellence") ||
    typeLower.includes("methodolog") ||
    typeLower.includes("cost efficienc")
  ) {
    return "/innovation#engineering-excellence";
  }

  // 4. Projects: Sectors & Urban
  if (
    typeLower.includes("sector") ||
    typeLower.includes("airport") ||
    typeLower.includes("power plant") ||
    typeLower.includes("oil") ||
    typeLower.includes("gas") ||
    typeLower.includes("steel plant") ||
    typeLower.includes("sez")
  ) {
    return "/projects/sectors";
  }
  if (
    typeLower.includes("urban") ||
    typeLower.includes("institutional") ||
    typeLower.includes("commercial") ||
    typeLower.includes("residential") ||
    typeLower.includes("campus") ||
    typeLower.includes("hospitality") ||
    typeLower.includes("school") ||
    typeLower.includes("auditorium") ||
    typeLower.includes("statutory")
  ) {
    return "/projects/urban-institutional";
  }

  // 5. Look up in PROJECT_SUBCATEGORIES list
  const matchedSub = PROJECT_SUBCATEGORIES.find(
    (s) =>
      s.label.toLowerCase() === typeLower ||
      s.slug.toLowerCase() === typeLower.replace(/\s+/g, "-") ||
      typeLower.includes(s.label.toLowerCase())
  );

  if (matchedSub) {
    if (matchedSub.megaKey === "business") {
      const col = matchedSub.columnTitle.toLowerCase();
      if (col.includes("civil")) return "/business#civil-construction";
      if (col.includes("mechanical")) return "/business#mechanical-works";
      if (col.includes("facade")) return "/business#facade-engineering";
      if (col.includes("water")) return "/business#water-and-solid-waste-management";
      return "/business";
    }
    if (matchedSub.megaKey === "innovations") {
      const col = matchedSub.columnTitle.toLowerCase();
      if (col.includes("construction")) return "/innovation#construction-technologies";
      if (col.includes("integrated")) return "/innovation#integrated-systems";
      if (col.includes("excellence")) return "/innovation#engineering-excellence";
      return "/innovation";
    }
    if (matchedSub.megaKey === "projects") {
      const col = matchedSub.columnTitle.toLowerCase();
      if (col.includes("sector")) return "/projects/sectors";
      return "/projects/urban-institutional";
    }
    if (matchedSub.megaKey === "insiders") {
      return matchedSub.columnTitle.toLowerCase().includes("experience")
        ? "/insiders/the-experience"
        : "/insiders/the-people";
    }
  }

  // 6. Context-based fallback:
  if (category?.toLowerCase().includes("business")) {
    return "/business";
  }
  if (category?.toLowerCase().includes("innovation")) {
    return "/innovation";
  }

  return "/projects";
}

export function ProjectDetailHeroSection({
  project,
}: ProjectDetailHeroSectionProps) {
  const images = Array.from(
    new Set([project.heroImageUrl, ...(project.gallery || [])])
  ).filter(Boolean);

  const categoryHref = resolveCategoryHref(project.category);
  const projectTypeHref = resolveProjectTypeHref(
    project.projectType,
    project.category
  );

  return (
    <section
      className="w-full overflow-hidden bg-[#f3f4f7]"
      aria-labelledby="project-detail-title"
    >
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        {/* LEFT CONTENT SECTION */}
        <div className="relative flex min-h-screen overflow-hidden bg-[#ececf1] px-8 py-16 md:px-16 lg:px-24">
          {/* Bottom Architectural Background Illustration */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[50%] opacity-[0.1]"
            style={{
              backgroundImage: "url('/project-detail-bg.webp')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
              backgroundSize: "90%",
            }}
          />

          {/* Content Wrapper */}
          <div className="relative z-10 flex w-full items-center">
            <div className="max-w-[640px] -mt-16 md:-mt-28">
              {/* Year & Location */}
              <p className="text-[12px] font-medium text-[#c9962d] md:text-[18px]">
                {project.locationYear}
              </p>

              {/* Main Heading */}
              <h1
                id="project-detail-title"
                className="mt-6 text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1d2740] md:text-[35px]"
              >
                {project.title}
              </h1>

              {/* Description */}
              <p className="mt-10 max-w-[580px] text-[16px] leading-[1.8] text-[#222b3d]/90 md:text-[15px]">
                {project.summary}
              </p>

              {/* Bottom Info */}
              <div className="mt-20 grid gap-14 sm:grid-cols-2">
                {/* Category */}
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#545454]">
                    Category
                  </p>

                  <Link
                    href={categoryHref}
                    className="mt-5 inline-flex items-center gap-3 text-[20px] font-medium transition-all duration-300 hover:gap-5"
                  >
                    <span className="bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-transparent">
                      {project.category}
                    </span>

                    <span className="bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-[26px] leading-none text-transparent">
                      ›
                    </span>
                  </Link>
                </div>

                {/* Project Type */}
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#545454]">
                    Project Type
                  </p>

                  <Link
                    href={projectTypeHref}
                    className="mt-5 inline-flex items-center gap-3 text-[20px] font-medium transition-all duration-300 hover:gap-5"
                  >
                    <span className="bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-transparent">
                      {project.projectType}
                    </span>

                    <span className="bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-[26px] leading-none text-transparent">
                      ›
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative min-h-[500px] overflow-hidden lg:min-h-screen">
          <ProjectHeroSlider images={images} title={project.title} />
        </div>
      </div>
    </section>
  );
}