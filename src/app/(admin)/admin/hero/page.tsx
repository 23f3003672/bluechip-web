import type { Metadata } from "next";
import {
  createHeroSlideAction,
  updateHeroSlideAction,
  deleteHeroSlideAction,
  toggleHeroSlideAction,
} from "@/actions/hero-slides";
import { HeroSlidesAdminModule } from "@/components/admin/hero/HeroSlidesAdminModule";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Hero Slides | Admin",
  description: "Manage homepage hero slides",
};

export const dynamic = "force-dynamic";

export default async function AdminHeroSlidesPage() {
  const supabase = await createClient();

  const [{ data: slidesData }, { data: mediaData }] = await Promise.all([
    supabase
      .from("hero_slides")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("media")
      .select("*")
      .order("uploaded_at", { ascending: false }),
  ]);

  return (
    <HeroSlidesAdminModule
      rows={slidesData ?? []}
      mediaItems={mediaData ?? []}
      createHeroSlideAction={createHeroSlideAction}
      updateHeroSlideAction={updateHeroSlideAction}
      deleteHeroSlideAction={deleteHeroSlideAction}
      toggleHeroSlideAction={toggleHeroSlideAction}
    />
  );
}
