import { createClient } from "@/lib/supabase/server";
import { mapProjectToJourneyProject } from "@/lib/public-content";
import { PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";

export async function getProjectsForSubcategory(subcategorySlug: string) {
  try {
    const supabase = await createClient();
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("id, title, slug, description, excerpt, thumbnail_url, gallery, category_id, client, location, year, featured, published, sort_order, created_at, updated_at")
      .eq("published", true)
      .eq("client", subcategorySlug)
      .order("year", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects
        .map(mapProjectToJourneyProject)
        .sort((a, b) => {
          const yearA = a.year ?? 0;
          const yearB = b.year ?? 0;
          if (yearB !== yearA) return yearB - yearA;
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
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
      .order("year", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects
        .map(mapProjectToJourneyProject)
        .sort((a, b) => {
          const yearA = a.year ?? 0;
          const yearB = b.year ?? 0;
          if (yearB !== yearA) return yearB - yearA;
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
    }
  } catch (error) {
    console.error("Error fetching projects for column:", error);
  }

  return [];
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
