import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export default async function ConstructionTechnologiesPage() {
  const projects = await getProjectsByColumnTitle("Construction Technologies");

  return (
    <ProjectsGallerySection
      title="Construction Technologies"
      projects={projects}
    />
  );
}