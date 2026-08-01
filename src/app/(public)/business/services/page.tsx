import { ProjectsGallerySection } from "@/components/sections/ProjectGallerySection";

import { getGroupedProjectsByColumnTitle } from "@/lib/project-subcategory-server-utils";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const groups = await getGroupedProjectsByColumnTitle("Services");

  return (
    <ProjectsGallerySection
      title="Services"
      groups={groups}
    />
  );
}