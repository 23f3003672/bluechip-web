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
    redirect("/business#facade-works");
  }
  if (subcategory === "industrial" || subcategory === "sez-infra") {
    redirect("/projects/sectors#sez-infrastructure");
  }
  if (subcategory === "commercial") {
    redirect("/projects/urban-institutional#commercial-buildings");
  }
  if (subcategory === "airport") {
    redirect("/projects/sectors#airports");
  }

  const item = PROJECT_SUBCATEGORY_MAP[subcategory];

  if (!item) {
    redirect("/projects");
  }

  if (item.columnTitle === "Sectors") {
    redirect(`/projects/sectors#${item.slug}`);
  }

  if (item.columnTitle === "Urban & Institutional") {
    redirect(`/projects/urban-institutional#${item.slug}`);
  }

  const routeMap: Record<string, string> = {

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