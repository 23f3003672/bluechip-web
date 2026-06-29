import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-utils";

export default function InfrastructurePage() {
  const projects = getProjectsByColumnTitle("Infrastructure");

  return (
    <ProjectsGallerySection
      title="Infrastructure"
      projects={projects}
    />
  );
}