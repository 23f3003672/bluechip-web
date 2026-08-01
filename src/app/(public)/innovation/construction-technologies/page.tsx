import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getGroupedProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function ConstructionTechnologiesPage() {
  const groups = await getGroupedProjectsByColumnTitle("Construction Technologies");

  return (
    <ProjectsGallerySection
      title="Construction Technologies"
      groups={groups}
    />
  );
}