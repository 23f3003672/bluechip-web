import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getGroupedProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function IndustrialStructuresPage() {
  const groups = await getGroupedProjectsByColumnTitle("Industrial Structures");

  return (
    <ProjectsGallerySection
      title="Industrial Structures"
      groups={groups}
    />
  );
}