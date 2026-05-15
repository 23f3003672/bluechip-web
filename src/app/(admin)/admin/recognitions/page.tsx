import {
  createRecognitionAction,
  deleteRecognitionAction,
  updateRecognitionAction,
} from "@/actions/recognitions";
import { RecognitionsAdminModule } from "@/components/admin/recognitions/RecognitionsAdminModule";
import { createClient } from "@/lib/supabase/server";

export default async function AdminRecognitionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recognitions")
    .select("id, title, issuer, year, description, image_url, published, sort_order, created_at")
    .order("created_at", { ascending: false });

  return (
    <RecognitionsAdminModule
      rows={data ?? []}
      createRecognitionAction={createRecognitionAction}
      updateRecognitionAction={updateRecognitionAction}
      deleteRecognitionAction={deleteRecognitionAction}
    />
  );
}
