"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
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
import { visionaryFormSchema, type VisionaryFormValues } from "@/lib/validations/admin-crud";
import type { ActionResult, Visionary, Media } from "@/types";

interface VisionariesAdminModuleProps {
  rows: Visionary[];
  mediaItems: Media[];
  createVisionaryAction: (
    payload: VisionaryFormValues
  ) => Promise<ActionResult<{ id: string }>>;
  updateVisionaryAction: (
    id: string,
    payload: VisionaryFormValues
  ) => Promise<ActionResult>;
  deleteVisionaryAction: (id: string) => Promise<ActionResult>;
}

function VisionaryForm({
  initialValues,
  mediaItems,
  submitLabel,
  isSubmitting,
  onSubmit,
}: {
  initialValues?: VisionaryFormValues;
  mediaItems: Media[];
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: VisionaryFormValues) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<VisionaryFormValues>({
    resolver: zodResolver(visionaryFormSchema) as Resolver<VisionaryFormValues>,
    values: initialValues ?? {
      name: "",
      role: "",
      image_url: "",
      bio: "",
    },
  });

  const imageUrlValue = useWatch({ control, name: "image_url" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Role</Label>
          <Input {...register("role")} />
          {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Image URL</Label>
        <Input {...register("image_url")} />
        {errors.image_url && <p className="text-xs text-destructive">{errors.image_url.message}</p>}
        
        <div className="rounded-md border border-border bg-muted/20 p-2">
          <p className="mb-1 text-xs font-medium text-muted-foreground">Pick from uploaded media</p>
          <select
            value={imageUrlValue ?? ""}
            onChange={(event) =>
              setValue("image_url", event.target.value, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="">Select image URL</option>
            {mediaItems.map((item) => (
              <option key={item.id} value={item.url}>
                {item.filename}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Bio</Label>
        <Textarea rows={4} {...register("bio")} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : submitLabel}</Button>
      </div>
    </form>
  );
}

export function VisionariesAdminModule({
  rows,
  mediaItems,
  createVisionaryAction,
  updateVisionaryAction,
  deleteVisionaryAction,
}: VisionariesAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Visionary | null>(null);

  return (
    <section>
      <AdminPageHeading
        title="Visionaries"
        description="Manage visionary profiles."
        pending={isPending}
        action={
          <Button onClick={() => setCreateOpen(true)} disabled={isPending}>
            Create Visionary
          </Button>
        }
      />

      {rows.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            title="No visionaries available"
            description="Create your first visionary profile to get started."
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-border bg-white p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Image URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{row.image_url ?? "-"}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditing(row)} disabled={isPending}>Edit</Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isPending}
                        onClick={() => {
                          if (!window.confirm(`Delete \"${row.name}\"?`)) return;
                          startTransition(async () => {
                            const result = await deleteVisionaryAction(row.id);
                            if (!result.success) {
                              toast.error(result.error);
                              return;
                            }
                            toast.success("Visionary deleted");
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Visionary</DialogTitle>
            <DialogDescription>Add a new visionary profile.</DialogDescription>
          </DialogHeader>
          <VisionaryForm
            mediaItems={mediaItems}
            submitLabel="Create"
            isSubmitting={isPending}
            onSubmit={async (values) => {
              startTransition(async () => {
                const result = await createVisionaryAction(values);
                if (!result.success) {
                  toast.error(result.error);
                  return;
                }
                toast.success("Visionary created");
                setCreateOpen(false);
                router.refresh();
              });
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Visionary</DialogTitle>
            <DialogDescription>Update visionary details.</DialogDescription>
          </DialogHeader>
          {editing && (
            <VisionaryForm
              mediaItems={mediaItems}
              submitLabel="Save Changes"
              isSubmitting={isPending}
              initialValues={{
                name: editing.name,
                role: editing.designation,
                image_url: editing.image_url ?? "",
                bio: editing.bio ?? "",
              }}
              onSubmit={async (values) => {
                startTransition(async () => {
                  const result = await updateVisionaryAction(editing.id, values);
                  if (!result.success) {
                    toast.error(result.error);
                    return;
                  }
                  toast.success("Visionary updated");
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
