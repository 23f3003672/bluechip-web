import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function IntegratedSystemsPage() {
  const projects = await getProjectsByColumnTitle("Integrated Systems");

  return (
    <ProjectsGallerySection
      title="Integrated Systems"
      projects={projects}
    />
  );
}