import { createClient } from "@/lib/supabase/server";
import { INSIDERS_TAXONOMY } from "@/lib/project-subcategories";
import type { InsidersItem } from "@/types";

export interface InsidersGroup {
  label: string;
  slug: string;
  items: InsidersItem[];
}

export interface InsidersPageData {
  categorySlug: "the-people" | "the-experience";
  title: string;
  description: string;
  groups: InsidersGroup[];
  totalItems: number;
}

export async function getInsidersPageData(
  categorySlug: "the-people" | "the-experience"
): Promise<InsidersPageData> {
  const taxonomy = INSIDERS_TAXONOMY[categorySlug];
  let items: InsidersItem[] = [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("insiders")
      .select("*")
      .eq("category", categorySlug)
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      items = data as InsidersItem[];
    }
  } catch (err) {
    console.warn(`Could not fetch insiders for ${categorySlug} from DB:`, err);
  }

  // Group items by subcategory in taxonomy order
  const groups: InsidersGroup[] = taxonomy.subcategories.map((subcat) => {
    const matchingItems = items.filter(
      (item) => item.subcategory === subcat.slug
    );
    return {
      label: subcat.label,
      slug: subcat.slug,
      items: matchingItems,
    };
  });

  return {
    categorySlug,
    title: taxonomy.title,
    description: taxonomy.description,
    groups,
    totalItems: items.length,
  };
}
