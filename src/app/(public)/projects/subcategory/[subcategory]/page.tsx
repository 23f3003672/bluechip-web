import { redirect } from "next/navigation";

import {
  PROJECT_SUBCATEGORY_MAP,
} from "@/lib/project-subcategories";

interface ProjectSubcategoryPageProps {
  params: Promise<{ subcategory: string }>;
}

export default async function ProjectSubcategoryPage(
  props: ProjectSubcategoryPageProps
) {
  const { subcategory } = await props.params;

  const item = PROJECT_SUBCATEGORY_MAP[subcategory];

  if (!item) {
    redirect("/projects");
  }

  const routeMap: Record<string, string> = {
    Sectors: "/projects/sectors",

    "Urban & Institutional":
      "/projects/urban-institutional",

    Services: "/business/services",

    Infrastructure:
      "/business/infrastructure",

    "Industrial Structures":
      "/business/industrial-structures",

    "Construction Technologies":
      "/innovation/construction-technologies",

    "Integrated Systems":
      "/innovation/integrated-systems",

    "Engineering Excellence":
      "/innovation/engineering-excellence",
  };

  redirect(routeMap[item.columnTitle] ?? "/projects");
}