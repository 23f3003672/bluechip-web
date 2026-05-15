import { deleteMediaAction, uploadMediaAction } from "@/actions/media";
import { MediaAdminModule } from "@/components/admin/media/MediaAdminModule";
import { createClient } from "@/lib/supabase/server";

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const { data: mediaData } = await supabase
    .from("media")
    .select("id, filename, url, storage_path, mime_type, size_bytes, alt_text, uploaded_at")
    .order("uploaded_at", { ascending: false });

  return (
    <MediaAdminModule
      initialMedia={mediaData ?? []}
      uploadMediaAction={uploadMediaAction}
      deleteMediaAction={deleteMediaAction}
    />
  );
}
