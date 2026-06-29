"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminEmptyState } from "@/components/admin/layout/AdminUx";
import type { MediaArticle } from "@/types";

interface MediaArticlesTableProps {
  rows: MediaArticle[];
  onEdit: (row: MediaArticle) => void;
  onDelete: (row: MediaArticle) => void;
  isBusy?: boolean;
}

export function MediaArticlesTable({
  rows,
  onEdit,
  onDelete,
  isBusy = false,
}: MediaArticlesTableProps) {
  if (rows.length === 0) {
    return (
      <AdminEmptyState
        title="No Media Articles"
        description="Create your first article."
      />
    );
  }

  return (
    <div className="rounded-lg border border-border bg-white p-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Order</TableHead>
            <TableHead className="w-28">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="w-40">Published</TableHead>
            <TableHead className="text-right w-44">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.display_order}</TableCell>

              <TableCell>
                {row.featured_image ? (
                  <Image
                    src={row.featured_image.url}
                    alt={row.featured_image.alt_text ?? row.title}
                    width={72}
                    height={48}
                    className="rounded object-cover border"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-12 w-[72px] items-center justify-center rounded border text-xs text-muted-foreground">
                    No Image
                  </div>
                )}
              </TableCell>

              <TableCell className="font-medium">
                {row.title}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {row.slug}
              </TableCell>

              <TableCell>
                {new Date(row.published_at).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isBusy}
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isBusy}
                    onClick={() => onDelete(row)}
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
  );
}