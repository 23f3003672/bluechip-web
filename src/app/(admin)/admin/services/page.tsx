import {
  createServiceAction,
  deleteServiceAction,
  updateServiceAction,
} from "@/actions/services";
import { ServicesAdminModule } from "@/components/admin/services/ServicesAdminModule";
import { createClient } from "@/lib/supabase/server";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, title, slug, description, icon, image_url, published, sort_order, created_at, updated_at")
    .order("created_at", { ascending: false });

  return (
    <ServicesAdminModule
      rows={data ?? []}
      createServiceAction={createServiceAction}
      updateServiceAction={updateServiceAction}
      deleteServiceAction={deleteServiceAction}
    />
  );
}
