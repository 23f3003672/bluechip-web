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
  isBusy?: boolean;
}

export function MediaArticlesTable({
  rows,
  onEdit,
  isBusy = false,
}: MediaArticlesTableProps) {
  if (rows.length === 0) {
    return (
      <AdminEmptyState
        title="No Media Articles"
        description="No media articles have been created."
      />
    );
  }


  return (
    <div className="rounded-lg border border-border bg-white p-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>

            <TableHead>Title</TableHead>

            <TableHead>Position</TableHead>

            <TableHead>Published</TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const image = row.featured_image

            return (
              <TableRow key={row.id}>
                <TableCell className="w-28">
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.alt_text ?? row.title}
                      width={80}
                      height={60}
                      className="rounded-md object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-[60px] w-[80px] items-center justify-center rounded-md border text-xs text-muted-foreground">
                      No Image
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">
                      {row.title}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {row.slug}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  Position {row.display_order}
                </TableCell>

                <TableCell>
                  {new Date(
                    row.published_at
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isBusy}
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}