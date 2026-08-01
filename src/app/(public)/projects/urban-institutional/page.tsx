import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getGroupedProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function UrbanInstitutionalPage() {
  const groups = await getGroupedProjectsByColumnTitle(
    "Urban & Institutional"
  );

  return (
    <ProjectsGallerySection
      title="Urban & Institutional"
      groups={groups}
    />
  );
}