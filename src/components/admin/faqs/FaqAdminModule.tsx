"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
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
    control,
    formState: { errors },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema) as Resolver<FaqFormValues>,
    values: initialValues ?? {
      question: "",
      answer: "",
    },
  });

  const questionValue = useWatch({ control, name: "question" });
  const answerValue = useWatch({ control, name: "answer" });

  const questionWordCount = useMemo(() => {
    return questionValue ? questionValue.trim().split(/\s+/).filter(Boolean).length : 0;
  }, [questionValue]);

  const answerWordCount = useMemo(() => {
    return answerValue ? answerValue.trim().split(/\s+/).filter(Boolean).length : 0;
  }, [answerValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <Label>Question</Label>
          <span className={`text-xs ${questionWordCount > 30 ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
            {questionWordCount} / 30 words
          </span>
        </div>
        <Textarea rows={3} {...register("question")} />
        {errors.question && <p className="text-xs text-destructive">{errors.question.message}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <Label>Answer</Label>
          <span className={`text-xs ${answerWordCount > 100 ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
            {answerWordCount} / 100 words
          </span>
        </div>
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
  const [editing, setEditing] = useState<FAQ | null>(null);

  return (
    <section>
      <AdminPageHeading
        title="FAQ"
        description="Manage frequently asked questions (Limit: exactly 5 entries)."
        pending={isPending}
      />

      {rows.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            title="No FAQs available"
            description="The FAQ list is currently empty. Run the Supabase SQL seeding script to populate exactly 5 editable FAQs."
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
                  <TableCell className="max-w-[420px] truncate text-muted-foreground">{row.answer}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditing(row)} disabled={isPending}>Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
