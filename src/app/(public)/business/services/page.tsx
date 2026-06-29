import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-utils";

export default function ServicesPage() {
  const projects = getProjectsByColumnTitle("Services");

  return (
    <ProjectsGallerySection
      title="Services"
      projects={projects}
    />
  );
}