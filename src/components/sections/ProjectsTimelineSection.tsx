"use client";
/*     /projects page              */

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  JourneyPhase,
  JOURNEY_PHASE_LABELS,
  JOURNEY_PROJECTS,
  type JourneyProject,
} from "@/lib/mock-data";

import { Container } from "@/components/layout/Container";

type FilterKey = "all" | JourneyPhase;

const filterTabs: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "recent", label: JOURNEY_PHASE_LABELS.recent },
  { key: "expansion", label: JOURNEY_PHASE_LABELS.expansion },
  { key: "foundation", label: JOURNEY_PHASE_LABELS.foundation },
];

function buildTiles(projects: JourneyProject[], count: number) {
  if (projects.length === 0) {
    return [];
  }

  return Array.from(
    { length: count },
    (_, index) => projects[index % projects.length]
  );
}

export function ProjectsTimelineSection({
  initialProjects = JOURNEY_PROJECTS,
}: {
  initialProjects?: JourneyProject[];
}) {
  const [activeFilter, setActiveFilter] =
    useState<FilterKey>("all");

  const filteredProjects = useMemo(() => {
    let list = initialProjects;
    if (activeFilter !== "all") {
      list = initialProjects.filter(
        (project) => project.phase === activeFilter
      );
    }
    
    // Use featured projects to only show the "best looking" ones
    const featured = list.filter(p => p.featured);
    return featured.length > 0 ? featured : list;
  }, [activeFilter, initialProjects]);

  const tiles = useMemo(
    () => buildTiles(filteredProjects, 90),
    [filteredProjects]
  );

  return (
    <section
      className="bg-[#f5f8ff] pt-2 pb-10 md:pt-4 md:pb-14"
      aria-labelledby="journey-timeline-title"
    >
      <div className="mx-auto w-full max-w-[1850px] px-6 md:px-10 lg:px-16">
        {/* Top Section */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl text-[#78868e] md:text-[18px]">
              Our Journey &amp; Milestones
            </p>

            <h1
              id="journey-timeline-title"
              className="mt-2 text-3xl font-medium tracking-tight text-[#212a3f] md:text-3xl"
            >
              Built steadily since 1998.
            </h1>
          </div>

          {/* Filter Buttons */}
          <div className="inline-flex w-full max-w-fit overflow-hidden rounded-full border border-[#d4d9e2] bg-[#f6f8fb] shadow-sm">
            {filterTabs.map((tab) => {
              const isActive = tab.key === activeFilter;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={
                    isActive
                      ? "bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] px-3 md:px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white transition-all duration-300"
                      : "border-l border-[#d4d9e2] px-3 md:px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#677083] first:border-l-0 hover:bg-[#eef2f8] transition-all duration-300"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-6 gap-[1px] sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-14 xl:grid-cols-18">
          {tiles.map((project, index) => (
            <Link
              key={`${project.id}-${index}`}
              href={`/projects/${project.slug}`}
              className="group relative block overflow-visible"
            >
              {/* Smaller Image Tiles */}
              <div
                className="aspect-square w-full overflow-hidden bg-cover bg-center transition-all duration-300 group-hover:scale-[1.04] group-hover:z-10"
                style={{
                  backgroundImage: `url(${project.thumbnailUrl})`,
                }}
                role="img"
                aria-label={project.title}
              />

              {/* Hover Description Box */}
              <div className="pointer-events-none absolute left-1/2 top-0 z-30 hidden -translate-x-1/2 -translate-y-[115%] group-hover:block">
                <div className="relative min-w-[220px] bg-[#efefef] px-4 py-4 shadow-lg">
                  {/* Bottom Triangle */}
                  <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#efefef]" />

                  <p className="text-center text-[14px] font-semibold leading-snug text-[#4b4b4b]">
                    {project.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Timeline Footer */}
        <div className="mt-8 flex items-center justify-between text-2xl font-semibold text-[#cc962f] md:text-2xl">
          <span>Present</span>

          <div className="mx-3 h-px flex-1 border-t border-dashed border-[#adb4c4]" />

          <span>1998</span>
        </div>
      </div>
    </section>
  );
}
