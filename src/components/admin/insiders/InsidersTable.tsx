"use client";

import Image from "next/image";
import { Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InsidersItem } from "@/types";

interface InsidersTableProps {
  rows: InsidersItem[];
  isBusy: boolean;
  onEdit: (item: InsidersItem) => void;
  onDelete: (id: string, title: string) => void;
}

const SUBCATEGORY_LABELS: Record<string, string> = {
  "meetings-moments": "Meetings & Moments",
  "life-at-bluechip": "Life at BlueChip",
  "aerial-views": "Aerial Views",
  "behind-the-scenes": "Behind the Scenes",
  "events-milestones": "Events & Milestones",
};

export function InsidersTable({
  rows,
  isBusy,
  onEdit,
  onDelete,
}: InsidersTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-base font-medium text-foreground">No Insiders posts found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Click &quot;New Insiders Feature&quot; above to create your first card.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3.5">Media</th>
              <th className="px-4 py-3.5">Title / Slug</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Subcategory</th>
              <th className="px-4 py-3.5">Location / Year</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-muted/30">
                {/* Thumbnail */}
                <td className="px-4 py-3">
                  <div className="relative h-14 w-20 overflow-hidden rounded-md border border-border bg-muted">
                    {row.image_url ? (
                      <Image
                        src={row.image_url}
                        alt={row.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </td>

                {/* Title / Slug */}
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground max-w-[240px] truncate">
                    {row.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono truncate max-w-[240px]">
                    /{row.slug}
                  </p>
                </td>

                {/* Category */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                    {row.category === "the-people" ? "The People" : "The Experience"}
                  </span>
                </td>

                {/* Subcategory */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 border border-amber-200">
                    {SUBCATEGORY_LABELS[row.subcategory] ?? row.subcategory}
                  </span>
                </td>

                {/* Location / Year */}
                <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                  <div>{row.location || "—"}</div>
                  <div className="text-[11px] text-muted-foreground/80">{row.year || "—"}</div>
                </td>

                {/* Status */}
                <td className="px-4 py-3 whitespace-nowrap">
                  {row.published ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <Eye className="h-3.5 w-3.5" /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <EyeOff className="h-3.5 w-3.5" /> Draft
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={isBusy}
                      onClick={() => onEdit(row)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={isBusy}
                      onClick={() => onDelete(row.id, row.title)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
