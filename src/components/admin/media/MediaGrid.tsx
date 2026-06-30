"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminEmptyState } from "@/components/admin/layout/AdminUx";
import type { Media } from "@/types";

interface MediaGridProps {
  rows: Media[];
  onDelete: (row: Media) => void;
  isBusy?: boolean;
}

function MediaCard({ row, onDelete, isBusy }: { row: Media; onDelete: (row: Media) => void; isBusy: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(row.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <article className="flex flex-col justify-between rounded-lg border border-border bg-white p-3 min-w-0">
      <div>
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

        <div className="mt-3 space-y-2 text-xs text-muted-foreground min-w-0">
          <p className="font-semibold text-foreground/90">Preview details</p>
          
          <div className="flex flex-col gap-1">
            <span className="font-medium text-foreground">File Link:</span>
            <div className="flex items-center gap-1 rounded border border-border bg-muted/30 p-1.5 min-w-0">
              <span className="truncate break-all select-all font-mono text-[10px] text-muted-foreground grow" title={row.url}>
                {row.url}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 hover:bg-muted"
                onClick={handleCopy}
                title="Copy Link"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <p className="truncate">
            <span className="font-medium text-foreground">Alt Text:</span> {row.alt_text ?? "-"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="destructive" size="sm" onClick={() => onDelete(row)} disabled={isBusy}>
          Delete
        </Button>
      </div>
    </article>
  );
}

export function MediaGrid({ rows, onDelete, isBusy = false }: MediaGridProps) {
  if (rows.length === 0) {
    return <AdminEmptyState title="No uploaded media" description="Upload an image to build your media library." />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 min-w-0">
      {rows.map((row) => (
        <MediaCard key={row.id} row={row} onDelete={onDelete} isBusy={isBusy} />
      ))}
    </div>
  );
}
