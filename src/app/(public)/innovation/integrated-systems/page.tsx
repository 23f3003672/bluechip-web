import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getGroupedProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function IntegratedSystemsPage() {
  const groups = await getGroupedProjectsByColumnTitle("Integrated Systems");

  return (
    <ProjectsGallerySection
      title="Integrated Systems"
      groups={groups}
    />
  );
}