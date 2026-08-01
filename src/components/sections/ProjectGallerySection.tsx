"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { getSubcategoryLabelForProject } from "@/lib/project-subcategory-utils";
import type { JourneyProject } from "@/lib/mock-data";

interface ProjectsGallerySectionProps {
  title: string;
  description?: string;
  projects?: JourneyProject[];
  groups?: { label: string; slug: string; projects: JourneyProject[] }[];
}

export function ProjectsGallerySection({
  title,
  description,
  projects,
  groups,
}: ProjectsGallerySectionProps) {
  return (
    <section className="bg-[#ececec] pb-16">
      {/* HERO */}
      <div className="border-b border-[#d8dbe2] bg-[#eef0f4]">
        <Container className="grid min-h-[240px] grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 md:px-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#c59d4d]">
              Projects
            </p>

            <h1 className="mt-3 max-w-[420px] text-5xl font-semibold leading-[1.05] tracking-tight text-[#1f2a44]">
              {title}
            </h1>
          </div>

          <div className="flex items-center">
            <p className="max-w-[500px] text-base leading-relaxed text-[#5d6472]">
              {description ??
                "Driven by innovation and powered by precision engineering, our projects reflect a commitment to quality, performance, and long-term value creation."}
            </p>
          </div>
        </Container>
      </div>

      {/* PROJECT GRID OR GROUPS */}
      <Container className="px-6 pt-10 md:px-10">
        {groups && groups.length > 0 ? (
          <div className="flex flex-col gap-16">
            {groups.map((group) => (
              <div key={group.slug}>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#1f2a44]">
                  {group.label}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {group.projects.length > 0 ? (
                    group.projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center">
                      <p className="text-lg text-[#5d6472]">
                        New projects coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-lg text-[#5d6472]">
                  New projects coming soon
                </p>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: JourneyProject }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden bg-[#dfe3ea]"
    >
      {/* IMAGE */}
      <div
        className="aspect-[1/1.08] w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        style={{
          backgroundImage: `url(${project.thumbnailUrl})`,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-all duration-500 ease-out group-hover:opacity-100" />

      {/* CONTENT */}
      <div className="absolute inset-x-0 bottom-0 translate-y-10 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f3d18b] backdrop-blur-sm">
          {getSubcategoryLabelForProject(project)}
        </p>

        <h3 className="mt-2 text-xl font-medium text-white">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}