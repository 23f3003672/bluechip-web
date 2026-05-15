import { createProjectAction, deleteProjectAction, updateProjectAction } from "@/actions/projects";
import { ProjectsAdminModule } from "@/components/admin/projects/ProjectsAdminModule";
import { createClient } from "@/lib/supabase/server";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const [{ data: projectsData }, { data: categoriesData }, { data: mediaData }] = await Promise.all([
    supabase
      .from("projects")
      .select("id, title, slug, description, excerpt, thumbnail_url, gallery, category_id, client, location, year, featured, published, sort_order, created_at, updated_at")
      .order("created_at", { ascending: false }),
    supabase.from("categories").select("id, name, slug, description, created_at").order("name"),
    supabase
      .from("media")
      .select("id, filename, url, storage_path, mime_type, size_bytes, alt_text, uploaded_at")
      .order("uploaded_at", { ascending: false }),
  ]);

  return (
    <ProjectsAdminModule
      initialProjects={projectsData ?? []}
      categories={categoriesData ?? []}
      mediaItems={mediaData ?? []}
      createProjectAction={createProjectAction}
      updateProjectAction={updateProjectAction}
      deleteProjectAction={deleteProjectAction}
    />
  );
}
