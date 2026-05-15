import { createCareerAction, deleteCareerAction, updateCareerAction } from "@/actions/careers";
import { CareersAdminModule } from "@/components/admin/careers/CareersAdminModule";
import { createClient } from "@/lib/supabase/server";

export default async function AdminCareersPage() {
  const supabase = await createClient();

  const { data: careersData } = await supabase
    .from("careers")
    .select("id, title, slug, description, location, employment_type, department, posted_at, closing_date, published, created_at")
    .order("created_at", { ascending: false });

  return (
    <CareersAdminModule
      initialItems={careersData ?? []}
      createCareerAction={createCareerAction}
      updateCareerAction={updateCareerAction}
      deleteCareerAction={deleteCareerAction}
    />
  );
}
