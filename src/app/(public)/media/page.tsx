import type { Metadata } from "next";
import { MediaGallerySection } from "@/components/sections/MediaGallerySection";
import { createClient } from "@/lib/supabase/server";
import { mapMediaListToGalleryItems } from "@/lib/public-content";
import { MEDIA_GALLERY_ITEMS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Media Gallery",
  description:
    "Browse Bluechip Engineering's achievement gallery, international visits, and milestone media highlights.",
};

export default async function MediaPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("media")
    .select("id, filename, url, storage_path, mime_type, size_bytes, alt_text, uploaded_at")
    .order("uploaded_at", { ascending: false });

  const items = data?.length ? mapMediaListToGalleryItems(data) : MEDIA_GALLERY_ITEMS;

  return <MediaGallerySection initialItems={items} />;
}
