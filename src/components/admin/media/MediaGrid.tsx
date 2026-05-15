"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AdminEmptyState } from "@/components/admin/layout/AdminUx";
import type { Media } from "@/types";

interface MediaGridProps {
  rows: Media[];
  onDelete: (row: Media) => void;
  isBusy?: boolean;
}

export function MediaGrid({ rows, onDelete, isBusy = false }: MediaGridProps) {
  if (rows.length === 0) {
    return <AdminEmptyState title="No uploaded media" description="Upload an image to build your media library." />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((row) => (
        <article key={row.id} className="rounded-lg border border-border bg-white p-3">
          <div className="aspect-video overflow-hidden rounded-md bg-muted">
            <Image
              src={row.url}
              alt={row.alt_text ?? row.filename}
              width={640}
              height={360}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>

          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <p className="font-medium text-foreground/90">Preview</p>
            <p>
              <span className="font-medium text-foreground">file_url:</span> {row.url}
            </p>
            <p>
              <span className="font-medium text-foreground">alt_text:</span> {row.alt_text ?? "-"}
            </p>
          </div>

          <div className="mt-3 flex justify-end">
            <Button variant="destructive" size="sm" onClick={() => onDelete(row)} disabled={isBusy}>
              Delete
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
