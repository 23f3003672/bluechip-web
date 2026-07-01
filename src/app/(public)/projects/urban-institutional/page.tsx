import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function UrbanInstitutionalPage() {
  const projects = await getProjectsByColumnTitle(
    "Urban & Institutional"
  );

  return (
    <ProjectsGallerySection
      title="Urban & Institutional"
      projects={projects}
    />
  );
}