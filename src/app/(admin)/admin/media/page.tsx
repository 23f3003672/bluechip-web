import {
  deleteMediaAction,
  uploadMediaAction,
} from "@/actions/media";

import {
  getMediaArticles,
  updateMediaArticleAction,
} from "@/actions/media-articles";

import { MediaAdminModule } from "@/components/admin/media/MediaAdminModule";

import { createClient } from "@/lib/supabase/server";

export default async function AdminMediaPage() {
  const supabase = await createClient();

  const [{ data: mediaData }, mediaArticles] = await Promise.all([
    supabase
      .from("media")
      .select("*")
      .order("uploaded_at", { ascending: false }),

    getMediaArticles(),
  ]);

  return (
    <MediaAdminModule
      initialMedia={mediaData ?? []}
      mediaArticles={mediaArticles}
      uploadMediaAction={uploadMediaAction}
      deleteMediaAction={deleteMediaAction}
      updateMediaArticleAction={updateMediaArticleAction}
    />
  );
}