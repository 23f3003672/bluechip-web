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
  uploadMediaAction: (formData: FormData) => Promise<ActionResult<{ id: string; url: string }>>;
  deleteMediaAction: (mediaId: string) => Promise<ActionResult>;
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
        title="Media"
        description="Upload images and manage media references used across the website."
        pending={isPending}
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <MediaUploadForm
          uploadMediaAction={uploadMediaAction}
          onUploaded={() => router.refresh()}
        />

        <div>
          <MediaGrid rows={initialMedia} onDelete={handleDelete} isBusy={isPending} />
        </div>
      </div>
    </section>
  );
}
