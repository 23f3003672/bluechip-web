import { createFaqAction, deleteFaqAction, updateFaqAction } from "@/actions/faqs";
import { FaqAdminModule } from "@/components/admin/faqs/FaqAdminModule";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("id, question, answer, category, sort_order, published, created_at")
    .order("sort_order", { ascending: true });

  return (
    <FaqAdminModule
      rows={data ?? []}
      createFaqAction={createFaqAction}
      updateFaqAction={updateFaqAction}
      deleteFaqAction={deleteFaqAction}
    />
  );
}
