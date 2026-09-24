import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailHeroSection } from "@/components/sections/ProjectDetailHeroSection";
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

  return null;
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

  const description =
    project.description?.trim()
      ? project.description.slice(0, 160)
      : `${project.title} — ${project.category} (${project.projectType}) project executed by Bluechip Engineering & Technologies in ${project.locationYear}.`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Bluechip Engineering & Technologies`,
      description,
      url: `/projects/${slug}`,
      images: project.thumbnailUrl ? [{ url: project.thumbnailUrl, alt: project.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Bluechip Engineering & Technologies`,
      description,
      images: project.thumbnailUrl ? [project.thumbnailUrl] : [],
    },
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
