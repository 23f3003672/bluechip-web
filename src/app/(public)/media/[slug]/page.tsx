import type { Metadata } from "next";
import { MEDIA_GALLERY_ITEMS } from "@/lib/mock-data";
import { MediaDetailResolverSection } from "@/components/sections/MediaDetailResolverSection";
import { createClient } from "@/lib/supabase/server";
import { mapMediaListToGalleryItems } from "@/lib/public-content";

interface MediaDetailPageProps {
  params: Promise<{ slug: string }>;
}

function getMediaBySlug(slug: string) {
  return MEDIA_GALLERY_ITEMS.find((item) => item.slug === slug);
}

async function getMediaBySlugFromDb(slug: string) {
  const supabase = await createClient();
  const parts = slug.split("-");
  const idPrefix = parts[parts.length - 1];

  if (!idPrefix || idPrefix.length !== 6) {
    return null;
  }

  const { data } = await supabase
    .from("media")
    .select("id, filename, url, storage_path, mime_type, size_bytes, alt_text, uploaded_at")
    .like("id", `${idPrefix}%`)
    .maybeSingle();

  if (!data) {
    return null;
  }

  const mapped = mapMediaListToGalleryItems([data]);
  return mapped.find((item) => item.slug === slug) ?? null;
}

export async function generateMetadata(
  props: MediaDetailPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = (await getMediaBySlugFromDb(slug)) ?? getMediaBySlug(slug);

  if (!item) {
    return {
      title: "Media Not Found",
      description: "Requested media item could not be found.",
    };
  }

  return {
    title: item.title,
    description: `${item.title} - media highlight recorded in ${item.recordedYear}.`,
  };
}

export default async function MediaDetailPage(props: MediaDetailPageProps) {
  const { slug } = await props.params;
  const item = (await getMediaBySlugFromDb(slug)) ?? getMediaBySlug(slug);

  return <MediaDetailResolverSection initialItem={item ?? null} />;
}
