import {
  createVisionaryAction,
  deleteVisionaryAction,
  updateVisionaryAction,
} from "@/actions/visionaries";
import { VisionariesAdminModule } from "@/components/admin/visionaries/VisionariesAdminModule";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminVisionariesPage() {
  const supabase = await createClient();
  
  const [{ data: visionariesData }, { data: mediaData }] = await Promise.all([
    supabase
      .from("visionaries")
      .select("id, name, designation, bio, image_url, linkedin_url, sort_order, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("media")
      .select("*")
      .order("uploaded_at", { ascending: false }),
  ]);

  return (
    <VisionariesAdminModule
      rows={visionariesData ?? []}
      mediaItems={mediaData ?? []}
      createVisionaryAction={createVisionaryAction}
      updateVisionaryAction={updateVisionaryAction}
      deleteVisionaryAction={deleteVisionaryAction}
    />
  );
}
