import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminTopbar } from "@/components/admin/layout/AdminTopbar";
import { AdminMain } from "@/components/admin/layout/AdminMain";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f9] text-foreground">
      <AdminSidebar className="hidden lg:flex" />
      <div className="flex flex-1 flex-col h-screen min-w-0 overflow-hidden">
        <AdminTopbar email={user.email ?? "admin@bluechipengineering.com"} />
        <AdminMain>{children}</AdminMain>
      </div>
    </div>
  );
}
