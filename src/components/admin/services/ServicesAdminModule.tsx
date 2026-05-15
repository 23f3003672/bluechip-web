"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminEmptyState, AdminPageHeading } from "@/components/admin/layout/AdminUx";
import { serviceFormSchema, type ServiceFormValues } from "@/lib/validations/admin-crud";
import type { ActionResult, Service } from "@/types";

interface ServicesAdminModuleProps {
  rows: Service[];
  createServiceAction: (payload: ServiceFormValues) => Promise<ActionResult<{ id: string }>>;
  updateServiceAction: (
    id: string,
    payload: ServiceFormValues
  ) => Promise<ActionResult>;
  deleteServiceAction: (id: string) => Promise<ActionResult>;
}

function ServiceForm({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmit,
}: {
  initialValues?: ServiceFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema) as Resolver<ServiceFormValues>,
    values: initialValues ?? {
      title: "",
      slug: "",
      description: "",
      icon: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Title</Label>
          <Input {...register("title")} />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Slug</Label>
          <Input {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea rows={4} {...register("description")} />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Icon</Label>
        <Input {...register("icon")} placeholder="e.g. Building2" />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : submitLabel}</Button>
      </div>
    </form>
  );
}

export function ServicesAdminModule({
  rows,
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
}: ServicesAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  return (
    <section>
      <AdminPageHeading
        title="Services"
        description="Manage service definitions."
        pending={isPending}
        action={
          <Button onClick={() => setCreateOpen(true)} disabled={isPending}>
            Create Service
          </Button>
        }
      />

      {rows.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            title="No services available"
            description="Create your first service entry to get started."
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-border bg-white p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell>{row.slug}</TableCell>
                  <TableCell>{row.icon ?? "-"}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditing(row)} disabled={isPending}>Edit</Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isPending}
                        onClick={() => {
                          if (!window.confirm(`Delete \"${row.title}\"?`)) return;
                          startTransition(async () => {
                            const result = await deleteServiceAction(row.id);
                            if (!result.success) {
                              toast.error(result.error);
                              return;
                            }
                            toast.success("Service deleted");
                            router.refresh();
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Service</DialogTitle>
            <DialogDescription>Add a new service entry.</DialogDescription>
          </DialogHeader>
          <ServiceForm
            submitLabel="Create"
            isSubmitting={isPending}
            onSubmit={async (values) => {
              startTransition(async () => {
                const result = await createServiceAction(values);
                if (!result.success) {
                  toast.error(result.error);
                  return;
                }
                toast.success("Service created");
                setCreateOpen(false);
                router.refresh();
              });
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update service details.</DialogDescription>
          </DialogHeader>
          {editing && (
            <ServiceForm
              submitLabel="Save Changes"
              isSubmitting={isPending}
              initialValues={{
                title: editing.title,
                slug: editing.slug,
                description: editing.description,
                icon: editing.icon ?? "",
              }}
              onSubmit={async (values) => {
                startTransition(async () => {
                  const result = await updateServiceAction(editing.id, values);
                  if (!result.success) {
                    toast.error(result.error);
                    return;
                  }
                  toast.success("Service updated");
                  setEditing(null);
                  router.refresh();
                });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
