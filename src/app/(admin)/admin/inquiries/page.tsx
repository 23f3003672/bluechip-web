import { getInquiriesAction, deleteInquiryAction } from "@/actions/inquiries";
import { InquiriesAdminModule } from "@/components/admin/inquiries/InquiriesAdminModule";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const result = await getInquiriesAction();
  const inquiries = result.success && result.data ? result.data : [];

  return (
    <InquiriesAdminModule
      initialInquiries={inquiries}
      deleteInquiryAction={deleteInquiryAction}
    />
  );
}
