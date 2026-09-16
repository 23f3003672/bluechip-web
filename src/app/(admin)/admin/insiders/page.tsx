import { getInsidersItemsAction } from "@/actions/insiders";
import { InsidersAdminSection } from "@/components/admin/insiders/InsidersAdminSection";
import { AdminPageHeading } from "@/components/admin/layout/AdminUx";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminInsidersPage() {
  const supabase = await createClient();

  const [insidersItems, { data: mediaData }] = await Promise.all([
    getInsidersItemsAction({ publishedOnly: false }),
    supabase
      .from("media")
      .select("*")
      .order("uploaded_at", { ascending: false }),
  ]);

  return (
    <section>
      <AdminPageHeading
        title="B'CHIP Insiders"
        description="Manage photo galleries and milestone stories for The People and The Experience public sections."
      />
      <div className="mt-6">
        <InsidersAdminSection
          rows={insidersItems}
          media={mediaData ?? []}
        />
      </div>
    </section>
  );
}
