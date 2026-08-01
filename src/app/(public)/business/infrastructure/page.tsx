import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getGroupedProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function InfrastructurePage() {
  const groups = await getGroupedProjectsByColumnTitle("Infrastructure");

  return (
    <ProjectsGallerySection
      title="Infrastructure"
      groups={groups}
    />
  );
}