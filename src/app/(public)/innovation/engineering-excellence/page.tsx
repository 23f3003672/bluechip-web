import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function EngineeringExcellencePage() {
  const projects = await getProjectsByColumnTitle("Engineering Excellence");

  return (
    <ProjectsGallerySection
      title="Engineering Excellence"
      projects={projects}
    />
  );
}