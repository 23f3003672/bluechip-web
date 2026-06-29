"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Media } from "@/types";

interface MediaSelectorProps {
  media: Media[];
  value?: string | null;
  onChange: (mediaId: string) => void;
  disabled?: boolean;
}

export function MediaSelector({
  media,
  value,
  onChange,
  disabled = false,
}: MediaSelectorProps) {
  if (media.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground">
        No images have been uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {media.map((item) => {
        const selected = value === item.id;

        return (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(item.id)}
            className={cn(
              "overflow-hidden rounded-lg border bg-white text-left transition-all",
              "hover:border-primary hover:shadow-md",
              selected
                ? "border-primary ring-2 ring-primary"
                : "border-border",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <div className="aspect-video overflow-hidden bg-muted">
              <Image
                src={item.url}
                alt={item.alt_text ?? item.filename}
                width={500}
                height={300}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-1 p-3">
              <p className="truncate text-sm font-medium">
                {item.filename}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {item.alt_text || "No alt text"}
              </p>

              <div className="pt-2">
                {selected ? (
                  <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                    Selected
                  </span>
                ) : (
                  <span className="rounded-full border px-2 py-1 text-xs text-muted-foreground">
                    Click to Select
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}