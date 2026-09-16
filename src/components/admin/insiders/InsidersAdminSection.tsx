"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InsidersTable } from "./InsidersTable";
import { InsidersForm } from "./InsidersForm";
import {
  createInsidersItemAction,
  updateInsidersItemAction,
  deleteInsidersItemAction,
} from "@/actions/insiders";
import type { InsidersItem, Media } from "@/types";
import type { InsidersItemFormValues } from "@/lib/validations/insiders";

interface InsidersAdminSectionProps {
  rows: InsidersItem[];
  media: Media[];
}

export function InsidersAdminSection({
  rows,
  media,
}: InsidersAdminSectionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InsidersItem | null>(null);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return rows.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }
      if (subcategoryFilter !== "all" && item.subcategory !== subcategoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSlug = item.slug.toLowerCase().includes(q);
        const matchLoc = item.location?.toLowerCase().includes(q) ?? false;
        if (!matchTitle && !matchSlug && !matchLoc) {
          return false;
        }
      }
      return true;
    });
  }, [rows, categoryFilter, subcategoryFilter, searchQuery]);

  // Handle Create
  const handleCreate = async (values: InsidersItemFormValues) => {
    startTransition(async () => {
      const res = await createInsidersItemAction(values);
      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Insiders feature created successfully!");
      setIsCreateOpen(false);
      router.refresh();
    });
  };

  // Handle Update
  const handleUpdate = async (values: InsidersItemFormValues) => {
    if (!editingItem) return;

    startTransition(async () => {
      const res = await updateInsidersItemAction(editingItem.id, values);
      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Insiders feature updated successfully!");
      setEditingItem(null);
      router.refresh();
    });
  };

  // Handle Delete
  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    startTransition(async () => {
      const res = await deleteInsidersItemAction(id);
      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Insiders feature deleted");
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, slug, location..."
            className="pl-9 text-sm"
          />
        </div>

        {/* Category Filters & Add Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card p-1 text-xs">
            <Filter className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
            <button
              type="button"
              onClick={() => {
                setCategoryFilter("all");
                setSubcategoryFilter("all");
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                categoryFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({rows.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setCategoryFilter("the-people");
                setSubcategoryFilter("all");
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                categoryFilter === "the-people"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              The People
            </button>
            <button
              type="button"
              onClick={() => {
                setCategoryFilter("the-experience");
                setSubcategoryFilter("all");
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                categoryFilter === "the-experience"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              The Experience
            </button>
          </div>

          <Button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Insiders Feature
          </Button>
        </div>
      </div>

      {/* Insiders Table */}
      <InsidersTable
        rows={filteredRows}
        isBusy={isPending}
        onEdit={(item) => setEditingItem(item)}
        onDelete={handleDelete}
      />

      {/* CREATE DIALOG */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New B&apos;CHIP Insiders Feature</DialogTitle>
            <DialogDescription>
              Add a moment, behind-the-scenes view, or milestone to The People or The Experience galleries.
            </DialogDescription>
          </DialogHeader>

          <InsidersForm
            media={media}
            isSubmitting={isPending}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog
        open={Boolean(editingItem)}
        onOpenChange={(open) => {
          if (!open) setEditingItem(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit B&apos;CHIP Insiders Feature</DialogTitle>
            <DialogDescription>
              Modify feature content, category, subcategory section, or media.
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <InsidersForm
              initialValues={editingItem}
              media={media}
              isSubmitting={isPending}
              onSubmit={handleUpdate}
              onCancel={() => setEditingItem(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
