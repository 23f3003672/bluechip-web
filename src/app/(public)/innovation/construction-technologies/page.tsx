import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-utils";

export default function ConstructionTechnologiesPage() {
  const projects = getProjectsByColumnTitle("Construction Technologies");

  return (
    <ProjectsGallerySection
      title="Construction Technologies"
      projects={projects}
    />
  );
}