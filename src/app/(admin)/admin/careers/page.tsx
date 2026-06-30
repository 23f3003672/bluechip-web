import {
  createCareerAction,
  deleteCareerAction,
  updateCareerAction,
  deleteJobApplicationAction,
} from "@/actions/careers";
import { CareersAdminModule } from "@/components/admin/careers/CareersAdminModule";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const supabase = await createClient();

  const [{ data: careersData }, { data: applicationsData }] = await Promise.all([
    supabase
      .from("careers")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("job_applications")
      .select("*, careers(title)")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <CareersAdminModule
      initialItems={careersData ?? []}
      initialApplications={applicationsData ?? []}
      createCareerAction={createCareerAction}
      updateCareerAction={updateCareerAction}
      deleteCareerAction={deleteCareerAction}
      deleteJobApplicationAction={deleteJobApplicationAction}
    />
  );
}
