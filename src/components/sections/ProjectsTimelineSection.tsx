"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { JourneyPhase, JOURNEY_PHASE_LABELS, JOURNEY_PROJECTS, type JourneyProject } from "@/lib/mock-data";
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

  return Array.from({ length: count }, (_, index) => projects[index % projects.length]);
}

export function ProjectsTimelineSection({
  initialProjects = JOURNEY_PROJECTS,
}: {
  initialProjects?: JourneyProject[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return initialProjects;
    }

    return initialProjects.filter((project) => project.phase === activeFilter);
  }, [activeFilter, initialProjects]);

  const tiles = useMemo(() => buildTiles(filteredProjects, 50), [filteredProjects]);

  return (
    <section className="bg-[#edf0f6] py-10 md:py-14" aria-labelledby="journey-timeline-title">
      <Container>
        <div className="mb-6 flex flex-col gap-6 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-4xl text-[#6c7689] md:text-[40px]">Our Journey &amp; Milestones</p>
            <h1
              id="journey-timeline-title"
              className="mt-3 text-5xl font-medium tracking-tight text-[#212a3f] md:text-6xl"
            >
              Built steadily since 1998.
            </h1>
          </div>

          <div className="inline-flex w-full max-w-[540px] overflow-hidden rounded-full border border-[#d4d9e2] bg-[#f6f8fb]">
            {filterTabs.map((tab) => {
              const isActive = tab.key === activeFilter;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={isActive ? "flex-1 bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white" : "flex-1 border-l border-[#d4d9e2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#677083] first:border-l-0 hover:bg-[#eef2f8]"}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {tiles.map((project, index) => (
            <article key={`${project.id}-${index}`} className="group relative overflow-visible">
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                role="img"
                aria-label={project.title}
              />

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[220px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="bg-white p-3 shadow-xl ring-1 ring-black/8">
                  <p className="text-base font-semibold text-[#252f46]">{project.title}</p>
                  <p className="mt-0.5 text-xs text-[#727b8b]">{project.locationYear}</p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-2 inline-flex items-center text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
                  >
                    Show More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-3xl font-semibold text-[#cc962f] md:mt-8">
          <span>Present</span>
          <div className="mx-3 h-px flex-1 border-t border-dashed border-[#adb4c4]" />
          <span>1998</span>
        </div>
      </Container>
    </section>
  );
}
