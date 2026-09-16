import {
  deleteMediaAction,
  uploadMediaAction,
} from "@/actions/media";

import {
  getMediaArticles,
  updateMediaArticleAction,
} from "@/actions/media-articles";

import { getInsidersItemsAction } from "@/actions/insiders";

import { MediaAdminModule } from "@/components/admin/media/MediaAdminModule";

import { createClient } from "@/lib/supabase/server";

export default async function AdminMediaPage() {
  const supabase = await createClient();

  const [{ data: mediaData }, mediaArticles, insidersItems] = await Promise.all([
    supabase
      .from("media")
      .select("*")
      .order("uploaded_at", { ascending: false }),

    getMediaArticles(),

    getInsidersItemsAction({ publishedOnly: false }),
  ]);

  return (
    <MediaAdminModule
      initialMedia={mediaData ?? []}
      mediaArticles={mediaArticles}
      insidersItems={insidersItems}
      uploadMediaAction={uploadMediaAction}
      deleteMediaAction={deleteMediaAction}
      updateMediaArticleAction={updateMediaArticleAction}
    />
  );
}