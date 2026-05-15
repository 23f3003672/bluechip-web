"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import type { JourneyProject } from "@/lib/mock-data";
import type { ProjectSubcategory } from "@/lib/project-subcategories";

interface ProjectSubcategorySectionProps {
  subcategory: ProjectSubcategory;
  projects: JourneyProject[];
}

const PROJECTS_PER_PAGE = 6;

function fallbackDescription(label: string) {
  return `What began as a commitment to honest craftsmanship has grown into a company shaped by responsibility and trust in ${label.toLowerCase()} delivery.`;
}

export function ProjectSubcategorySection({
  subcategory,
  projects,
}: ProjectSubcategorySectionProps) {
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const displayProjects = useMemo(
    () => projects.slice(0, visibleCount),
    [projects, visibleCount]
  );

  const hasMore = visibleCount < projects.length;

  return (
    <section className="bg-[#e9eaec] pb-8 md:pb-12" aria-labelledby="subcategory-projects-title">
      <Container className="px-0">
        <div className="grid min-h-[160px] grid-cols-1 bg-[#edeff3] md:grid-cols-[1.05fr_1fr]">
          <div className="px-6 py-8 md:px-12 md:py-10">
            <p className="text-xs font-medium text-[#c59d4d]">Projects</p>
            <h1
              id="subcategory-projects-title"
              className="mt-2 max-w-[330px] text-4xl font-semibold leading-[1.04] tracking-tight text-[#1f2a44] md:text-[44px]"
            >
              {subcategory.label}
            </h1>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <p className="max-w-[430px] text-sm leading-relaxed text-[#5f6674] md:text-base">
              {projects[0]?.summary ?? fallbackDescription(subcategory.label)}
            </p>
            <Link
              href="/projects"
              className="mt-3 inline-flex text-sm font-medium text-[#1d5ea8] hover:underline"
            >
              More
            </Link>
          </div>
        </div>

        <div className="px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-8">
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <Link
                key={`${subcategory.slug}-${project.id}`}
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden border border-[#d9dce2] bg-white"
                aria-label={`Open project: ${project.title}`}
              >
                <div
                  className="aspect-[1/1.15] w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                  role="img"
                  aria-label={project.title}
                />
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PROJECTS_PER_PAGE)}
                className="border border-[#656d7c] bg-white px-6 py-2 text-sm font-medium text-[#2d3340] transition-colors hover:bg-[#f2f4f8]"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
