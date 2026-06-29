import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-utils";

export default function SectorsPage() {
  const projects = getProjectsByColumnTitle("Sectors");

  return (
    <ProjectsGallerySection
      title="Sectors"
      projects={projects}
    />
  );
}