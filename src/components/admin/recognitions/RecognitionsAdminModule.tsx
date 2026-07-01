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
import { recognitionFormSchema, type RecognitionFormValues } from "@/lib/validations/admin-crud";
import type { ActionResult, Recognition } from "@/types";

interface RecognitionsAdminModuleProps {
  rows: Recognition[];
  createRecognitionAction: (
    payload: RecognitionFormValues
  ) => Promise<ActionResult<{ id: string }>>;
  updateRecognitionAction: (
    id: string,
    payload: RecognitionFormValues
  ) => Promise<ActionResult>;
  deleteRecognitionAction: (id: string) => Promise<ActionResult>;
}

function RecognitionForm({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmit,
}: {
  initialValues?: RecognitionFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: RecognitionFormValues) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecognitionFormValues>({
    resolver: zodResolver(recognitionFormSchema) as Resolver<RecognitionFormValues>,
    values: initialValues ?? {
      title: "",
      organization: "",
      description: "",
      year: new Date().getFullYear(),
      category: "industry-awards",
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
          <Label>Organization</Label>
          <Input {...register("organization")} />
          {errors.organization && <p className="text-xs text-destructive">{errors.organization.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea rows={3} {...register("description")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Category</Label>
          <select
            {...register("category")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="international">International</option>
            <option value="industry-awards">Industry Awards</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="media">Media</option>
          </select>
          {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Year</Label>
          <Input type="number" {...register("year", { valueAsNumber: true })} />
          {errors.year && <p className="text-xs text-destructive">{errors.year.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : submitLabel}</Button>
      </div>
    </form>
  );
}

export function RecognitionsAdminModule({
  rows,
  createRecognitionAction,
  updateRecognitionAction,
  deleteRecognitionAction,
}: RecognitionsAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Recognition | null>(null);

  return (
    <section>
      <AdminPageHeading
        title="Recognitions"
        description="Manage recognitions records."
        pending={isPending}
        action={
          <Button onClick={() => setCreateOpen(true)} disabled={isPending}>
            Create Recognition
          </Button>
        }
      />

      {rows.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            title="No recognitions available"
            description="Add your first recognition entry to get started."
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-border bg-white p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell>{row.issuer}</TableCell>
                  <TableCell>{row.year}</TableCell>
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
                            const result = await deleteRecognitionAction(row.id);
                            if (!result.success) {
                              toast.error(result.error);
                              return;
                            }
                            toast.success("Recognition deleted");
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
            <DialogTitle>Create Recognition</DialogTitle>
            <DialogDescription>Add a new recognition entry.</DialogDescription>
          </DialogHeader>
          <RecognitionForm
            submitLabel="Create"
            isSubmitting={isPending}
            onSubmit={async (values) => {
              startTransition(async () => {
                const result = await createRecognitionAction(values);
                if (!result.success) {
                  toast.error(result.error);
                  return;
                }
                toast.success("Recognition created");
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
            <DialogTitle>Edit Recognition</DialogTitle>
            <DialogDescription>Update recognition details.</DialogDescription>
          </DialogHeader>
          {editing && (
            <RecognitionForm
              submitLabel="Save Changes"
              isSubmitting={isPending}
              initialValues={{
                title: editing.title,
                organization: editing.issuer,
                description: editing.description ?? "",
                year: editing.year,
                category: (editing.category as any) ?? "industry-awards",
              }}
              onSubmit={async (values) => {
                startTransition(async () => {
                  const result = await updateRecognitionAction(editing.id, values);
                  if (!result.success) {
                    toast.error(result.error);
                    return;
                  }
                  toast.success("Recognition updated");
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
