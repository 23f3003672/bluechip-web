import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-utils";

export default function UrbanInstitutionalPage() {
  const projects = getProjectsByColumnTitle(
    "Urban & Institutional"
  );

  return (
    <ProjectsGallerySection
      title="Urban & Institutional"
      projects={projects}
    />
  );
}