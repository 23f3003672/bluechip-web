import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-utils";

export default function EngineeringExcellencePage() {
  const projects = getProjectsByColumnTitle("Engineering Excellence");

  return (
    <ProjectsGallerySection
      title="Engineering Excellence"
      projects={projects}
    />
  );
}