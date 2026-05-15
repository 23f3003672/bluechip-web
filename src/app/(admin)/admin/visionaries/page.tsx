import {
  createVisionaryAction,
  deleteVisionaryAction,
  updateVisionaryAction,
} from "@/actions/visionaries";
import { VisionariesAdminModule } from "@/components/admin/visionaries/VisionariesAdminModule";
import { createClient } from "@/lib/supabase/server";

export default async function AdminVisionariesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("visionaries")
    .select("id, name, designation, bio, image_url, linkedin_url, sort_order, created_at")
    .order("created_at", { ascending: false });

  return (
    <VisionariesAdminModule
      rows={data ?? []}
      createVisionaryAction={createVisionaryAction}
      updateVisionaryAction={updateVisionaryAction}
      deleteVisionaryAction={deleteVisionaryAction}
    />
  );
}
