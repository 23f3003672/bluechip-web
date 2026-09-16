"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MediaUploadForm } from "./MediaUploadForm";
import { MediaGrid } from "./MediaGrid";
import { AdminPageHeading } from "@/components/admin/layout/AdminUx";
import type { ActionResult, Media } from "@/types";
import { MediaArticlesSection } from "./MediaArticlesSection";
import { InsidersAdminSection } from "../insiders/InsidersAdminSection";
import type { MediaArticle, InsidersItem } from "@/types";
import type { MediaArticleFormValues } from "@/lib/validations/admin-crud";

interface MediaAdminModuleProps {
  initialMedia: Media[];

  mediaArticles: MediaArticle[];

  insidersItems: InsidersItem[];

  uploadMediaAction: (
    formData: FormData
  ) => Promise<ActionResult<{ id: string; url: string }>>;

  deleteMediaAction: (
    mediaId: string
  ) => Promise<ActionResult>;

  updateMediaArticleAction: (
    id: string,
    payload: MediaArticleFormValues
  ) => Promise<ActionResult>;
}

export function MediaAdminModule({
  initialMedia,
  mediaArticles,
  insidersItems,
  uploadMediaAction,
  deleteMediaAction,
  updateMediaArticleAction,
}: MediaAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"insiders" | "library" | "news">("insiders");

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
        title="B'CHIP Insiders & Media"
        description="Manage B'CHIP Insiders photo features (The People & The Experience) and upload assets to your media library."
        pending={isPending}
      />

      {/* Tabs Controls */}
      <div className="mb-6 flex border-b border-border gap-6">
        <button
          type="button"
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-[2px] cursor-pointer focus:outline-none ${
            activeTab === "insiders"
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
          onClick={() => setActiveTab("insiders")}
        >
          B&apos;CHIP Insiders
        </button>
        <button
          type="button"
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-[2px] cursor-pointer focus:outline-none ${
            activeTab === "library"
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
          onClick={() => setActiveTab("library")}
        >
          Media Library
        </button>
        <button
          type="button"
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-[2px] cursor-pointer focus:outline-none ${
            activeTab === "news"
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
          onClick={() => setActiveTab("news")}
        >
          Legacy Articles
        </button>
      </div>

      {activeTab === "insiders" ? (
        <div className="w-full">
          <InsidersAdminSection
            rows={insidersItems}
            media={initialMedia}
          />
        </div>
      ) : activeTab === "library" ? (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
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
      ) : (
        <div className="w-full">
          <MediaArticlesSection
            rows={mediaArticles}
            media={initialMedia}
            updateMediaArticleAction={updateMediaArticleAction}
          />
        </div>
      )}
    </section>
  );
}
