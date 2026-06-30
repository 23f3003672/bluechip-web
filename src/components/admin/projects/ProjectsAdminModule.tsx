"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectForm } from "./ProjectForm";
import { ProjectsTable } from "./ProjectsTable";
import { AdminPageHeading } from "@/components/admin/layout/AdminUx";
import type { Category, Media, Project, ActionResult } from "@/types";
import type { ProjectMutationInput } from "@/lib/validations/project";

interface ProjectsAdminModuleProps {
  initialProjects: Project[];
  categories: Category[];
  mediaItems: Media[];
  createProjectAction: (
    payload: ProjectMutationInput
  ) => Promise<ActionResult<{ id: string }>>;
  updateProjectAction: (
    projectId: string,
    payload: ProjectMutationInput
  ) => Promise<ActionResult>;
  deleteProjectAction: (projectId: string) => Promise<ActionResult>;
}

export function ProjectsAdminModule({
  initialProjects,
  categories,
  mediaItems,
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
}: ProjectsAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const projects = useMemo(
    () => [...initialProjects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
    [initialProjects]
  );

  const handleCreate = async (payload: ProjectMutationInput) => {
    startTransition(async () => {
      const result = await createProjectAction(payload);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Project created");
      setCreateOpen(false);
      router.refresh();
    });
  };

  const handleUpdate = async (payload: ProjectMutationInput) => {
    if (!editingProject) {
      return;
    }

    startTransition(async () => {
      const result = await updateProjectAction(editingProject.id, payload);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Project updated");
      setEditingProject(null);
      router.refresh();
    });
  };

  const handleDelete = (project: Project) => {
    const confirmed = window.confirm(`Delete project \"${project.title}\"?`);
    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result = await deleteProjectAction(project.id);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Project deleted");
      router.refresh();
    });
  };

  return (
    <section>
      <AdminPageHeading
        title="Projects"
        description="Manage all projects from a single module."
        pending={isPending}
        action={
          <Button onClick={() => setCreateOpen(true)} disabled={isPending}>
            Create Project
          </Button>
        }
      />

      <div className="mt-6">
        <ProjectsTable
          rows={projects}
          onEdit={setEditingProject}
          onDelete={handleDelete}
          isBusy={isPending}
        />
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>Add a new project record.</DialogDescription>
          </DialogHeader>
          <ProjectForm
            categories={categories}
            mediaItems={mediaItems}
            isSubmitting={isPending}
            submitLabel="Create Project"
            onSubmit={handleCreate}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editingProject)} onOpenChange={(open) => !open && setEditingProject(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update selected project details.</DialogDescription>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              categories={categories}
              mediaItems={mediaItems}
              isSubmitting={isPending}
              submitLabel="Save Changes"
              initialValues={{
                title: editingProject.title,
                slug: editingProject.slug,
                description: editingProject.description,
                short_description: editingProject.excerpt ?? "",
                location: editingProject.location ?? "",
                year: editingProject.year ?? new Date().getFullYear(),
                category_id: editingProject.category_id ?? "",
                subcategory: editingProject.client ?? "",
                thumbnail_url: editingProject.thumbnail_url ?? "",
                gallery: editingProject.gallery.join("\n"),
                featured: editingProject.featured,
              }}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
