import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export default async function SectorsPage() {
  const projects = await getProjectsByColumnTitle("Sectors");

  return (
    <ProjectsGallerySection
      title="Sectors"
      projects={projects}
    />
  );
}