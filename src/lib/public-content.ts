import type {
  AboutVisionary,
  HomeService,
  JourneyPhase,
  JourneyProject,
  MediaGalleryItem,
  MockFaq,
  RecognitionItem,
  RecognitionCategory,
} from "@/lib/mock-data";
import { RECOGNITION_CATEGORY_LABELS } from "@/lib/mock-data";
import type { FAQ, Media, MediaArticle, Project, Recognition, Service, Visionary } from "@/types";
import { PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";
import { slugify, truncate } from "@/lib/utils";

function resolvePhase(year: number | null): JourneyPhase {
  if (!year) {
    return "foundation";
  }

  if (year >= 2021) {
    return "recent";
  }

  if (year >= 2013) {
    return "expansion";
  }

  return "foundation";
}

export function mapProjectToJourneyProject(project: Project): JourneyProject {
  const year = project.year ?? new Date().getFullYear();
  const location = project.location ?? "India";

  const sub = PROJECT_SUBCATEGORIES.find((s) => s.slug === project.client);
  const categoryName = sub
    ? sub.megaKey.charAt(0).toUpperCase() + sub.megaKey.slice(1)
    : "General";
  const projectTypeName = sub ? sub.label : (project.client || "Project Delivery");

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    locationYear: `${location}, ${year}`,
    summary:
      project.excerpt?.trim() ||
      truncate(project.description, 150) ||
      "Precision-led project delivery across infrastructure and EPC domains.",
    category: categoryName,
    projectType: projectTypeName,
    phase: resolvePhase(project.year),
    thumbnailUrl:
      project.thumbnail_url ||
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80",
    heroImageUrl:
      project.thumbnail_url ||
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    featured: project.featured,
  };
}

export function mapRecognitionToPublicItem(row: Recognition): RecognitionItem {
  const category = (row.category as RecognitionCategory) || "industry-awards";
  const categoryLabel = RECOGNITION_CATEGORY_LABELS[category] || "Industry Recognition";

  return {
    id: row.id,
    title: row.title,
    subtitle: row.description?.trim() || `Recognition ${row.year}`,
    categoryLabel,
    category,
    organisedBy: row.issuer,
    emblemImageUrl:
      row.image_url ||
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=520&q=80",
  };
}

export function mapMediaToGalleryItem(row: Media): MediaGalleryItem {
  const baseTitle = row.filename.replace(/\.[^.]+$/, "") || "Media Item";
  const computedSlug = `${slugify(baseTitle)}-${row.id.slice(0, 6)}`;

  return {
    id: row.id,
    slug: computedSlug,
    type: "image",
    title: baseTitle,
    excerpt:
      row.alt_text?.trim() ||
      "A captured project moment from Bluechip Engineering's media archive.",
    recordedYear: new Date(row.uploaded_at).getFullYear(),
    imageUrl: row.url,
    imageAlt: row.alt_text || baseTitle,
  };
}

export function mapMediaListToGalleryItems(rows: Media[]): MediaGalleryItem[] {
  return rows.map(mapMediaToGalleryItem);
}

export function mapMediaArticleToGalleryItems(row: MediaArticle): MediaGalleryItem[] {
  const slug = row.slug || "media";
  const title = row.title;
  const excerpt = row.short_description;
  const content = row.content;
  const recordedYear = new Date(row.published_at).getFullYear();
  const imageUrl = row.featured_image?.url || "https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&w=520&q=80";
  const imageAlt = row.featured_image?.alt_text || title;

  return [
    {
      id: `${row.id}-img`,
      slug,
      type: "image",
      title,
      excerpt,
      content,
      recordedYear,
      imageUrl,
      imageAlt,
    },
    {
      id: `${row.id}-txt`,
      slug,
      type: "text",
      title,
      excerpt,
      content,
      recordedYear,
      imageUrl,
      imageAlt,
    }
  ];
}

export function mapMediaArticlesToGalleryItems(rows: MediaArticle[]): MediaGalleryItem[] {
  return rows.flatMap(mapMediaArticleToGalleryItems);
}

export function mapServiceToHomeService(service: Service): HomeService {
  return {
    id: service.id,
    title: service.title,
    icon: service.icon || "Building2",
    description:
      service.description?.trim() || "Reliable infrastructure services delivered with precision.",
    imageUrl: service.image_url || undefined,
  };
}

export function mapFaqToMockFaq(row: FAQ): MockFaq {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
  };
}

export function mapVisionaryToAboutVisionary(row: Visionary): AboutVisionary {
  return {
    id: row.id,
    name: row.name,
    role: row.designation,
    bio: row.bio || "Leadership profile",
    imageUrl:
      row.image_url ||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
  };
}
