import type { Metadata } from "next";
import { MediaDetailResolverSection } from "@/components/sections/MediaDetailResolverSection";
import { createClient } from "@/lib/supabase/server";
import { mapMediaArticlesToGalleryItems } from "@/lib/public-content";

interface MediaDetailPageProps {
  params: Promise<{ slug: string }>;
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

  const mapped = mapMediaArticlesToGalleryItems([data as any]);
  return mapped[0] ?? null;
}

export async function generateMetadata(
  props: MediaDetailPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = await getMediaBySlugFromDb(slug);

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
  const item = await getMediaBySlugFromDb(slug);

  return <MediaDetailResolverSection initialItem={item ?? null} />;
}
