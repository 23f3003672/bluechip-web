import { createClient } from "@/lib/supabase/server";
import { mapProjectToJourneyProject } from "@/lib/public-content";
import { JOURNEY_PROJECTS } from "@/lib/mock-data";
import { PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";
import {
  SUBCATEGORY_KEYWORDS,
  rotateProjects,
} from "@/lib/project-subcategory-utils";

export async function getProjectsForSubcategory(subcategorySlug: string) {
  try {
    const supabase = await createClient();
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("id, title, slug, description, excerpt, thumbnail_url, gallery, category_id, client, location, year, featured, published, sort_order, created_at, updated_at")
      .eq("published", true)
      .eq("client", subcategorySlug)
      .order("year", { ascending: false });

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map(mapProjectToJourneyProject);
    }
  } catch (error) {
    console.error("Error fetching projects for subcategory:", error);
  }

  return [];
}

export async function getProjectsByColumnTitle(columnTitle: string) {
  const matchingSubcategories = PROJECT_SUBCATEGORIES.filter(
    (subcategory) => subcategory.columnTitle === columnTitle
  );

  const slugs = matchingSubcategories.map(
    (subcategory) => subcategory.slug
  );

  try {
    const supabase = await createClient();
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("id, title, slug, description, excerpt, thumbnail_url, gallery, category_id, client, location, year, featured, published, sort_order, created_at, updated_at")
      .eq("published", true)
      .in("client", slugs)
      .order("year", { ascending: false });

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map(mapProjectToJourneyProject);
    }
  } catch (error) {
    console.error("Error fetching projects for column:", error);
  }

  // Fallback to mock data filter
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

export async function getGroupedProjectsByColumnTitle(columnTitle: string) {
  const matchingSubcategories = PROJECT_SUBCATEGORIES.filter(
    (subcategory) => subcategory.columnTitle === columnTitle
  );

  const groups = [];

  for (const subcat of matchingSubcategories) {
    const projects = await getProjectsForSubcategory(subcat.slug);
    groups.push({
      label: subcat.label,
      slug: subcat.slug,
      projects: projects || [],
    });
  }

  return groups;
}
