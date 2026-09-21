import {
  deleteMediaAction,
  uploadMediaAction,
} from "@/actions/media";

import { MediaAdminModule } from "@/components/admin/media/MediaAdminModule";

import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const supabase = await createClient();

  const { data: mediaData } = await supabase
    .from("media")
    .select("*")
    .order("uploaded_at", { ascending: false });

  return (
    <MediaAdminModule
      initialMedia={mediaData ?? []}
      uploadMediaAction={uploadMediaAction}
      deleteMediaAction={deleteMediaAction}
    />
  );
}