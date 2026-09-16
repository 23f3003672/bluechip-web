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

  if (subcategory === "epc") {
    redirect("/business");
  }
  if (subcategory === "civil-construction") {
    redirect("/business#civil-construction");
  }
  if (subcategory === "mechanical-works") {
    redirect("/business#mechanical-works");
  }
  if (subcategory === "facade-engineering" || subcategory === "facade-works") {
    redirect("/business#facade-engineering");
  }

  const item = PROJECT_SUBCATEGORY_MAP[subcategory];

  if (!item) {
    redirect("/projects");
  }

  const routeMap: Record<string, string> = {
    Sectors: "/projects/sectors",

    "Urban & Institutional":
      "/projects/urban-institutional",

    "Civil Construction":
      "/business#civil-construction",

    "Mechanical Works":
      "/business#mechanical-works",

    "Facade Works":
      "/business#facade-engineering",

    "Water & Solid Waste Management":
      "/business#water-and-solid-waste-management",

    Services: "/business",

    Infrastructure:
      "/business",

    "Industrial Structures":
      "/business",

    "Construction Technologies":
      "/innovation/construction-technologies",

    "Integrated Systems":
      "/innovation/integrated-systems",

    "Engineering Excellence":
      "/innovation/engineering-excellence",
  };

  redirect(routeMap[item.columnTitle] ?? "/projects");
}