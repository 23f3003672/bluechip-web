import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getGroupedProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function EngineeringExcellencePage() {
  const groups = await getGroupedProjectsByColumnTitle("Engineering Excellence");

  return (
    <ProjectsGallerySection
      title="Engineering Excellence"
      groups={groups}
    />
  );
}