"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MediaUploadForm } from "./MediaUploadForm";
import { MediaGrid } from "./MediaGrid";
import { AdminPageHeading } from "@/components/admin/layout/AdminUx";
import type { ActionResult, Media } from "@/types";

interface MediaAdminModuleProps {
  initialMedia: Media[];
  uploadMediaAction: (
    formData: FormData
  ) => Promise<ActionResult<{ id: string; url: string }>>;
  deleteMediaAction: (
    mediaId: string
  ) => Promise<ActionResult>;
}

export function MediaAdminModule({
  initialMedia,
  uploadMediaAction,
  deleteMediaAction,
}: MediaAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (row: Media) => {
    const confirmed = window.confirm(`Delete media file \"${row.filename}\"?`);
    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result = await deleteMediaAction(row.id);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Media deleted");
      router.refresh();
    });
  };

  return (
    <section>
      <AdminPageHeading
        title="Media Library"
        description="Upload images to your media storage and copy public URLs for projects, leadership, and sections across the site."
        pending={isPending}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <MediaUploadForm
          uploadMediaAction={uploadMediaAction}
          onUploaded={() => router.refresh()}
        />

        <MediaGrid
          rows={initialMedia}
          onDelete={handleDelete}
          isBusy={isPending}
        />
      </div>
    </section>
  );
}
