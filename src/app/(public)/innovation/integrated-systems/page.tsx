import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-utils";

export default function IntegratedSystemsPage() {
  const projects = getProjectsByColumnTitle("Integrated Systems");

  return (
    <ProjectsGallerySection
      title="Integrated Systems"
      projects={projects}
    />
  );
}