import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getGroupedProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function SectorsPage() {
  const groups = await getGroupedProjectsByColumnTitle("Sectors");

  return (
    <ProjectsGallerySection
      title="Sectors"
      groups={groups}
    />
  );
}