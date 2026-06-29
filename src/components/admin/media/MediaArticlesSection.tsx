"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MediaArticlesTable } from "./MediaArticlesTable";
import { MediaArticleForm } from "./MediaArticleForm";

import type {
  ActionResult,
  Media,
  MediaArticle,
} from "@/types";

import type { MediaArticleFormValues } from "@/lib/validations/admin-crud";

interface MediaArticlesSectionProps {
  rows: MediaArticle[];

  media: Media[];

  updateMediaArticleAction: (
    id: string,
    payload: MediaArticleFormValues
  ) => Promise<ActionResult>;
}
export function MediaArticlesSection({
  rows,
  media,
  updateMediaArticleAction,
}: MediaArticlesSectionProps) {

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [editing, setEditing] =
    useState<MediaArticle | null>(null);

      return (
    <>
      <MediaArticlesTable
  rows={rows}
  isBusy={isPending}
  onEdit={(row) => setEditing(row)}
/>

            <Dialog
        open={Boolean(editing)}
        onOpenChange={(open) => {
          if (!open) {
            setEditing(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              Edit Media Article
            </DialogTitle>

            <DialogDescription>
              Update the content displayed on the Media & News page.
            </DialogDescription>
          </DialogHeader>

                    {editing && (
            <MediaArticleForm
              media={media}
              submitLabel="Save Changes"
              isSubmitting={isPending}
              initialValues={{
                title: editing.title,
                slug: editing.slug,
                short_description: editing.short_description,
                content: editing.content,

                featured_image_id:
                  editing.featured_image_id ?? "",

                display_order:
                  editing.display_order,

                published_at:
                  editing.published_at.slice(0,16),

                meta_title:
                  editing.meta_title ?? "",

                meta_description:
                  editing.meta_description ?? "",

                meta_keywords:
                  editing.meta_keywords ?? "",
              }}

              onSubmit={async (values) => {

                startTransition(async () => {

                  const result =
                    await updateMediaArticleAction(
                      editing.id,
                      values
                    );

                  if (!result.success) {
                    toast.error(result.error);
                    return;
                  }

                  toast.success(
                    "Media article updated"
                  );

                  setEditing(null);

                  router.refresh();

                });

              }}
            />
          )}
                  </DialogContent>
      </Dialog>
    </>
  );
}