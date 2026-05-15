import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailHeroSection } from "@/components/sections/ProjectDetailHeroSection";
import { JOURNEY_PROJECTS } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { mapProjectToJourneyProject } from "@/lib/public-content";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, title, slug, description, excerpt, thumbnail_url, gallery, category_id, client, location, year, featured, published, sort_order, created_at, updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (data) {
    return mapProjectToJourneyProject(data);
  }

  return JOURNEY_PROJECTS.find((project) => project.slug === slug);
}

export async function generateMetadata(
  props: ProjectDetailPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "Requested project could not be found.",
    };
  }

  return {
    title: project.title,
    description: `${project.title} - ${project.category} (${project.projectType}) delivered by Bluechip Engineering in ${project.locationYear}.`,
  };
}

export default async function ProjectDetailPage(props: ProjectDetailPageProps) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailHeroSection project={project} />;
}
