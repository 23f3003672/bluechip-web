"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminEmptyState } from "@/components/admin/layout/AdminUx";
import { PROJECT_SUBCATEGORIES } from "@/lib/project-subcategories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Project } from "@/types";

interface ProjectsTableProps {
  rows: Project[];
  onEdit: (row: Project) => void;
  onDelete: (row: Project) => void;
  isBusy?: boolean;
}

export function ProjectsTable({ rows, onEdit, onDelete, isBusy = false }: ProjectsTableProps) {
  if (rows.length === 0) {
    return (
      <AdminEmptyState
        title="No projects found"
        description="Create your first project to populate this list."
      />
    );
  }

  return (
    <div className="rounded-lg border border-border bg-white p-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const sub = PROJECT_SUBCATEGORIES.find((s) => s.slug === row.client);
            const resolvedCategory = sub
              ? sub.megaKey.charAt(0).toUpperCase() + sub.megaKey.slice(1)
              : "General";

            return (
              <TableRow key={row.id}>
                <TableCell className="max-w-[320px] font-medium text-foreground">
                  <div className="flex items-center gap-3">
                    {row.thumbnail_url ? (
                      <div className="h-10 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={row.thumbnail_url} 
                          alt={row.title} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md border border-border bg-slate-50">
                        <span className="text-[10px] text-muted-foreground">N/A</span>
                      </div>
                    )}
                    <span className="truncate">{row.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{resolvedCategory}</TableCell>
                <TableCell className="text-muted-foreground">{row.year ?? "-"}</TableCell>
                <TableCell>
                  {row.featured ? <Badge>Yes</Badge> : <Badge variant="outline">No</Badge>}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(row)} disabled={isBusy}>
                      Edit
                    </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(row)} disabled={isBusy}>
                    Delete
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
