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
  const { data } = await supabase
    .from("media")
    .select("id, filename, url, storage_path, mime_type, size_bytes, alt_text, uploaded_at")
    .order("uploaded_at", { ascending: false });

  if (!data?.length) {
    return null;
  }

  return mapMediaListToGalleryItems(data).find((item) => item.slug === slug) ?? null;
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
