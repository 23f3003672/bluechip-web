"use client";

import { useEffect } from "react";
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

const ALIAS_MAP: Record<string, string[]> = {
  airports: ["airport"],
  "oil-gas": ["oil-and-gas", "oil"],
  "power-plants": ["power-plant", "power"],
  "sez-infrastructure": ["sez-infra", "industrial", "sez"],
  "steel-plants": ["steel-plant", "steel"],
  "commercial-buildings": ["commercial", "commercial-building"],
  schools: ["school"],
  "residential-buildings": ["residential", "residential-building"],
  "it-campuses-buildings": ["it-campuses", "it-campus"],
  hospitality: ["hotel"],
  auditoriums: ["auditorium"],
  "statutory-buildings": ["statutory-building"],
};

const REVERSE_ALIAS_MAP: Record<string, string> = {
  airport: "airports",
  airports: "airports",
  "oil-gas": "oil-gas",
  "oil-and-gas": "oil-gas",
  oil: "oil-gas",
  "power-plants": "power-plants",
  "power-plant": "power-plants",
  power: "power-plants",
  "sez-infrastructure": "sez-infrastructure",
  "sez-infra": "sez-infrastructure",
  sez: "sez-infrastructure",
  industrial: "sez-infrastructure",
  "steel-plants": "steel-plants",
  "steel-plant": "steel-plants",
  "commercial-buildings": "commercial-buildings",
  "commercial-building": "commercial-buildings",
  commercial: "commercial-buildings",
  schools: "schools",
  school: "schools",
  "residential-buildings": "residential-buildings",
  residential: "residential-buildings",
  "it-campuses-buildings": "it-campuses-buildings",
  hospitality: "hospitality",
  auditoriums: "auditoriums",
  "statutory-buildings": "statutory-buildings",
};

function sortJourneyProjectsByDateDesc(items: JourneyProject[]): JourneyProject[] {
  return [...items].sort((a, b) => {
    const yearA = typeof a.year === "number" ? a.year : parseInt(String(a.year || a.locationYear?.match(/\d{4}/)?.[0] || 0), 10) || 0;
    const yearB = typeof b.year === "number" ? b.year : parseInt(String(b.year || b.locationYear?.match(/\d{4}/)?.[0] || 0), 10) || 0;
    if (yearB !== yearA) return yearB - yearA;
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });
}

export function ProjectsGallerySection({
  title,
  description,
  projects,
  groups,
}: ProjectsGallerySectionProps) {
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#/, "").toLowerCase().trim();
      if (!rawHash) return;

      const targetId = REVERSE_ALIAS_MAP[rawHash] || rawHash;
      const el = document.getElementById(targetId) || document.getElementById(rawHash);
      if (el) {
        const header = document.querySelector("header");
        const headerHeight = header ? header.getBoundingClientRect().height : 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 24;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      }
    };

    handleHash();
    const timer1 = setTimeout(handleHash, 100);
    const timer2 = setTimeout(handleHash, 400);

    window.addEventListener("hashchange", handleHash);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  return (
    <section className="bg-white pb-16 min-h-screen">
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
            {groups.map((group) => {
              const aliases = ALIAS_MAP[group.slug] || [];
              const sortedProjects = sortJourneyProjectsByDateDesc(group.projects);
              return (
                <div key={group.slug} id={group.slug} className="scroll-mt-28">
                  {aliases.map((alias) => (
                    <span
                      key={alias}
                      id={alias}
                      className="block h-0 w-0 overflow-hidden scroll-mt-28"
                      aria-hidden="true"
                    />
                  ))}
                  <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#1f2a44]">
                    {group.label}
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {sortedProjects.length > 0 ? (
                      sortedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))
                    ) : (
                      <div className="col-span-full py-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60">
                        <p className="text-sm font-medium text-slate-400">
                          Nothing added here yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects && projects.length > 0 ? (
              sortJourneyProjectsByDateDesc(projects).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60">
                <p className="text-sm font-medium text-slate-400">
                  Nothing added here yet.
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