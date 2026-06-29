import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-utils";

export default function IndustrialStructuresPage() {
  const projects = getProjectsByColumnTitle("Industrial Structures");

  return (
    <ProjectsGallerySection
      title="Industrial Structures"
      projects={projects}
    />
  );
}