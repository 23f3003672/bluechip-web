import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export default async function InfrastructurePage() {
  const projects = await getProjectsByColumnTitle("Infrastructure");

  return (
    <ProjectsGallerySection
      title="Infrastructure"
      projects={projects}
    />
  );
}