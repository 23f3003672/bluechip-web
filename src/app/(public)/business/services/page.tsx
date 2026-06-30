import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export default async function ServicesPage() {
  const projects = await getProjectsByColumnTitle("Services");

  return (
    <ProjectsGallerySection
      title="Services"
      projects={projects}
    />
  );
}