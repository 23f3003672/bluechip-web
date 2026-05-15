"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminEmptyState } from "@/components/admin/layout/AdminUx";
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
            <TableHead>Category ID</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="max-w-[280px] truncate font-medium text-foreground">
                {row.title}
              </TableCell>
              <TableCell className="text-muted-foreground">{row.category_id ?? "-"}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
