"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { faqFormSchema, type FaqFormValues } from "@/lib/validations/admin-crud";
import type { ActionResult, FAQ } from "@/types";

interface FaqAdminModuleProps {
  rows: FAQ[];
  createFaqAction: (payload: FaqFormValues) => Promise<ActionResult<{ id: string }>>;
  updateFaqAction: (id: string, payload: FaqFormValues) => Promise<ActionResult>;
  deleteFaqAction: (id: string) => Promise<ActionResult>;
}

function FaqForm({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmit,
}: {
  initialValues?: FaqFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: FaqFormValues) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema) as Resolver<FaqFormValues>,
    values: initialValues ?? {
      question: "",
      answer: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Question</Label>
        <Textarea rows={3} {...register("question")} />
        {errors.question && <p className="text-xs text-destructive">{errors.question.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Answer</Label>
        <Textarea rows={5} {...register("answer")} />
        {errors.answer && <p className="text-xs text-destructive">{errors.answer.message}</p>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : submitLabel}</Button>
      </div>
    </form>
  );
}

export function FaqAdminModule({
  rows,
  createFaqAction,
  updateFaqAction,
  deleteFaqAction,
}: FaqAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);

  return (
    <section>
      <AdminPageHeading
        title="FAQ"
        description="Manage frequently asked questions."
        pending={isPending}
        action={
          <Button onClick={() => setCreateOpen(true)} disabled={isPending}>
            Create FAQ
          </Button>
        }
      />

      {rows.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            title="No FAQs available"
            description="Create your first FAQ entry to help users quickly."
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-border bg-white p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="max-w-[360px] truncate font-medium">{row.question}</TableCell>
                  <TableCell className="max-w-[420px] truncate">{row.answer}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditing(row)} disabled={isPending}>Edit</Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isPending}
                        onClick={() => {
                          if (!window.confirm("Delete this FAQ?")) return;
                          startTransition(async () => {
                            const result = await deleteFaqAction(row.id);
                            if (!result.success) {
                              toast.error(result.error);
                              return;
                            }
                            toast.success("FAQ deleted");
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
            <DialogTitle>Create FAQ</DialogTitle>
            <DialogDescription>Add a new FAQ entry.</DialogDescription>
          </DialogHeader>
          <FaqForm
            submitLabel="Create"
            isSubmitting={isPending}
            onSubmit={async (values) => {
              startTransition(async () => {
                const result = await createFaqAction(values);
                if (!result.success) {
                  toast.error(result.error);
                  return;
                }
                toast.success("FAQ created");
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
            <DialogTitle>Edit FAQ</DialogTitle>
            <DialogDescription>Update FAQ details.</DialogDescription>
          </DialogHeader>
          {editing && (
            <FaqForm
              submitLabel="Save Changes"
              isSubmitting={isPending}
              initialValues={{
                question: editing.question,
                answer: editing.answer,
              }}
              onSubmit={async (values) => {
                startTransition(async () => {
                  const result = await updateFaqAction(editing.id, values);
                  if (!result.success) {
                    toast.error(result.error);
                    return;
                  }
                  toast.success("FAQ updated");
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
