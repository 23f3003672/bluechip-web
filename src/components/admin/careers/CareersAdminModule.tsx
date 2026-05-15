"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CareersTable } from "./CareersTable";
import { CareerForm } from "./CareerForm";
import { AdminPageHeading } from "@/components/admin/layout/AdminUx";

interface CareersAdminModuleProps {
  initialItems: any[];
  createCareerAction: (payload: any) => Promise<any>;
  updateCareerAction: (id: string, payload: any) => Promise<any>;
  deleteCareerAction: (id: string) => Promise<any>;
}

export function CareersAdminModule({ initialItems, createCareerAction, updateCareerAction, deleteCareerAction }: CareersAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const handleCreate = async (payload: any) => {
    startTransition(async () => {
      const res = await createCareerAction(payload);
      if (!res.success) {
        toast.error(res.error ?? "Failed");
        return;
      }
      toast.success("Career created");
      setCreateOpen(false);
      router.refresh();
    });
  };

  const handleUpdate = async (payload: any) => {
    if (!editing) return;
    startTransition(async () => {
      const res = await updateCareerAction(editing.id, payload);
      if (!res.success) {
        toast.error(res.error ?? "Failed");
        return;
      }
      toast.success("Career updated");
      setEditing(null);
      router.refresh();
    });
  };

  const handleDelete = (item: any) => {
    if (!confirm(`Delete job "${item.title}"?`)) return;
    startTransition(async () => {
      const res = await deleteCareerAction(item.id);
      if (!res.success) {
        toast.error(res.error ?? "Failed");
        return;
      }
      toast.success("Career deleted");
      router.refresh();
    });
  };

  return (
    <section>
      <AdminPageHeading
        title="Careers"
        description="Manage job postings and hiring announcements."
        pending={isPending}
        action={<Button onClick={() => setCreateOpen(true)}>Create Job</Button>}
      />

      <div className="mt-6">
        <CareersTable rows={initialItems} onEdit={setEditing} onDelete={handleDelete} isBusy={isPending} />
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
            <DialogDescription>Add a new job posting.</DialogDescription>
          </DialogHeader>
          <CareerForm submitLabel="Create Job" isSubmitting={isPending} onSubmit={handleCreate} />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>Update selected job posting.</DialogDescription>
          </DialogHeader>
          {editing && (
            <CareerForm
              submitLabel="Save Changes"
              isSubmitting={isPending}
              initialValues={{
                title: editing.title,
                slug: editing.slug,
                description: editing.description,
                location: editing.location,
                employment_type: editing.employment_type,
                department: editing.department,
                responsibilities: editing.responsibilities,
                qualifications: editing.qualifications,
              }}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
