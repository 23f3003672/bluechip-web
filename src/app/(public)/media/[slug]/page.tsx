import type { Metadata } from "next";
import { MEDIA_GALLERY_ITEMS } from "@/lib/mock-data";
import { MediaDetailResolverSection } from "@/components/sections/MediaDetailResolverSection";
import { createClient } from "@/lib/supabase/server";
import { mapMediaArticlesToGalleryItems } from "@/lib/public-content";

interface MediaDetailPageProps {
  params: Promise<{ slug: string }>;
}

function getMediaBySlug(slug: string) {
  return MEDIA_GALLERY_ITEMS.find((item) => item.slug === slug);
}

async function getMediaBySlugFromDb(slug: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("media_articles")
    .select(`*, featured_image:media(id, url, alt_text)`)
    .eq("slug", slug)
    .maybeSingle();

  if (!data) {
    return null;
  }

  // We can map it and just grab the 'image' type which has all the text properties we need anyway
  const mapped = mapMediaArticlesToGalleryItems([data as any]);
  return mapped[0] ?? null;
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
