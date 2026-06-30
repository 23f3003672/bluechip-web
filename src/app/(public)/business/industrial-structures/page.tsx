import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export default async function IndustrialStructuresPage() {
  const projects = await getProjectsByColumnTitle("Industrial Structures");

  return (
    <ProjectsGallerySection
      title="Industrial Structures"
      projects={projects}
    />
  );
}