"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

export interface InnovationProjectItem {
  id: string;
  title: string;
  slug: string;
  category: "construction" | "integrated" | "engineering";
  subcategoryTag: string;
  imageUrl: string;
  location?: string;
  year?: string | number;
}

interface SubCategoryDef {
  title: string;
  description: string;
  tag: string;
}

const CONSTRUCTION_SUBCATEGORIES: { column1: SubCategoryDef[]; column2: SubCategoryDef[]; column3: SubCategoryDef[] } = {
  column1: [
    {
      title: "Composite Structures",
      description: "High-strength steel-concrete composite columns and beams maximizing floor load capacity.",
      tag: "COMPOSITE STRUCTURES",
    },
    {
      title: "Light Gauge Steel Frames",
      description: "Cold-formed precision steel frames for rapid, lightweight, and seismic-resistant builds.",
      tag: "LIGHT GAUGE STEEL FRAMES",
    },
  ],
  column2: [
    {
      title: "Precast Wall & Slab Systems",
      description: "Factory-cured precast modular wall and slab elements ensuring flawless tolerances.",
      tag: "PRECAST WALL & SLAB SYSTEMS",
    },
    {
      title: "Self Supporting Roofing",
      description: "Arch-profiled curved roofing requiring zero intermediate purlins or trusses.",
      tag: "SELF SUPPORTING ROOFING",
    },
  ],
  column3: [
    {
      title: "Suspended Slab Systems",
      description: "High-span post-tensioned and suspended slab designs optimizing clear vertical space.",
      tag: "SUSPENDED SLAB SYSTEMS",
    },
  ],
};

const INTEGRATED_SUBCATEGORIES: { column1: SubCategoryDef[]; column2: SubCategoryDef[]; column3: SubCategoryDef[] } = {
  column1: [
    {
      title: "Hybrid Structural Solutions",
      description: "Seamless integration of PEB, heavy structural steel, and conventional RCC frameworks.",
      tag: "HYBRID STRUCTURAL SOLUTIONS",
    },
  ],
  column2: [
    {
      title: "Multi-Technology Configurations",
      description: "Modular combination of advanced facade, MEP, and civil structural assemblies.",
      tag: "MULTI-TECHNOLOGY CONFIGURATIONS",
    },
  ],
  column3: [],
};

const ENGINEERING_SUBCATEGORIES: { column1: SubCategoryDef[]; column2: SubCategoryDef[]; column3: SubCategoryDef[] } = {
  column1: [
    {
      title: "Optimized Execution Methodologies",
      description: "Lean site operations, 4D BIM sequencing, and pre-engineered erection protocols.",
      tag: "OPTIMIZED EXECUTION METHODOLOGIES",
    },
  ],
  column2: [
    {
      title: "Speed, Safety, and Cost Efficiencies",
      description: "Value-engineered structural designs cutting execution cycles while ensuring zero-harm safety.",
      tag: "SPEED, SAFETY, AND COST EFFICIENCIES",
    },
  ],
  column3: [],
};

/**
 * Running count-up hook for thin, animated stat figures
 */
function useCountUp(target: number, duration: number = 1800): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo curve for smooth decelerating animation
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return count;
}

interface InnovationPageContentProps {
  projects: InnovationProjectItem[];
}

export function InnovationPageContent({ projects }: InnovationPageContentProps) {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const [activeCategoryMenu, setActiveCategoryMenu] = useState<"construction" | "integrated" | "engineering" | null>(null);
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState<{
    section: "construction" | "integrated" | "engineering";
    tag: string;
  } | null>(null);

  // Animated running statistics
  const systemsCount = useCountUp(15, 1600);
  const complianceCount = useCountUp(100, 2000);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleCategoryDrawer = (category: "construction" | "integrated" | "engineering") => {
    if (activeCategoryMenu === category) {
      setActiveCategoryMenu(null);
    } else {
      setActiveCategoryMenu(category);
    }
  };

  const handleSubcategoryClick = (section: "construction" | "integrated" | "engineering", tag: string, sectionId: string) => {
    setSelectedSubcategoryFilter({ section, tag });
    scrollToSection(sectionId);
  };

  // Filter projects by category
  const constructionProjects = projects.filter((p) => p.category === "construction");
  const integratedProjects = projects.filter((p) => p.category === "integrated");
  const engineeringProjects = projects.filter((p) => p.category === "engineering");

  return (
    <div className="min-h-screen bg-white text-[#1f2a44]">
      {/* ─── HERO HEADER SECTION ─────────────────────────────────────────── */}
      <section className="border-b border-[#e5e7eb] bg-[#f0f3f7] py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1720px] px-6 sm:px-10 xl:px-14 2xl:px-20">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Title / Eyebrow */}
            <div className="flex flex-col items-start lg:col-span-4 xl:col-span-3">
              <span className="block text-[14px] font-medium tracking-normal text-[#c59d4d] md:text-[15px]">
                Innovation
              </span>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#1a253c] sm:text-4xl lg:text-[30px] lg:leading-[1.15]">
                Technologies
              </h1>
            </div>

            {/* Middle Description + MORE Toggle */}
            <div className="lg:col-span-5 xl:col-span-6">
              <div className="max-w-[460px]">
                <p className="text-[14px] font-normal leading-[1.75] text-[#404958]">
                  Pioneering modern construction methodologies, Bluechip integrates advanced structural technologies,
                  factory-controlled precast manufacturing, and agile hybrid systems to deliver high-performance,
                  future-ready infrastructure across India.
                </p>

                {/* Extended Description revealed on "MORE" */}
                {isMoreExpanded && (
                  <div className="mt-4 space-y-4 text-[14px] leading-[1.75] text-[#475263]">
                    <p>
                      With over two decades of technical evolution, our specialized engineering teams deploy cutting-edge
                      modular solutions, cold-formed steel frameworks, and arch-profiled roofing systems to accelerate
                      project timelines without compromising structural integrity.
                    </p>
                    <p>
                      Our hybrid structural configurations combine pre-engineered building (PEB) frameworks with heavy RCC
                      cores and suspended floor decking, achieving superior seismic performance, generous floor spans,
                      and optimized material usage across complex commercial and industrial sites.
                    </p>
                    <p>
                      Driven by 4D BIM modeling, streamlined offsite prefabrication, and rigorous safety protocols,
                      Bluechip ensures total project predictability—cutting construction lifecycles, minimizing site
                      wastage, and setting new benchmarks in engineering excellence.
                    </p>
                  </div>
                )}

                {/* MORE / LESS Button */}
                <button
                  type="button"
                  onClick={() => setIsMoreExpanded(!isMoreExpanded)}
                  className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#1067ab] transition-colors hover:text-[#0b4d82] focus-visible:outline-none"
                >
                  {isMoreExpanded ? (
                    <>
                      <span>LESS</span>
                      <ChevronUp className="size-3.5" />
                    </>
                  ) : (
                    <>
                      <span>MORE</span>
                      <ChevronDown className="size-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Statistics Counters with circular gradient */}
            <div className="flex items-start gap-8 sm:gap-12 lg:col-span-3 lg:justify-end">
              <div>
                <div
                  style={{
                    backgroundImage: "radial-gradient(circle at 50% 50%, #117ab2 0%, #023d9f 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                  className="inline-block font-sans text-4xl font-light tracking-tight bg-clip-text text-transparent sm:text-4xl lg:text-[45px] leading-none"
                >
                  {systemsCount}+
                </div>
                <div className="mt-2.5 max-w-[110px] text-[13px] font-normal leading-snug text-[#525f77] sm:text-[14px]">
                  engineered systems
                </div>
              </div>

              <div>
                <div
                  style={{
                    backgroundImage: "radial-gradient(circle at 50% 50%, #117ab2 0%, #023d9f 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                  className="inline-block font-sans text-4xl font-light tracking-tight bg-clip-text text-transparent sm:text-4xl lg:text-[45px] leading-none"
                >
                  {complianceCount}%
                </div>
                <div className="mt-2.5 max-w-[120px] text-[13px] font-normal leading-snug text-[#525f77] sm:text-[14px]">
                  safety & QA compliance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INNOVATION CATEGORIES SUB-NAV BAR ───────────────────────────── */}
      {!isMoreExpanded && (
        <>
          {/* TOP BAR: Always White */}
          <section className="border-b border-[#e5e7eb] bg-white py-6 sm:py-7 transition-colors duration-300">
            <div className="mx-auto max-w-[1720px] px-6 sm:px-10 xl:px-14 2xl:px-20">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
                {/* Left Column: Heading & Description */}
                <div className="w-full shrink-0 lg:w-[280px] xl:w-[320px]">
                  <h2 className="text-[17px] font-bold tracking-wider text-[#1a253c] uppercase">
                    R&D & INNOVATION
                  </h2>
                  {!activeCategoryMenu && (
                    <p className="mt-3 text-[13px] leading-relaxed text-[#687182] md:text-[13.5px]">
                      Bluechip deploys next-generation construction technologies, hybrid structural frameworks, and
                      value-engineered execution methodologies for accelerated, resilient delivery.
                    </p>
                  )}
                </div>

                {/* Right Column: 3 Nav Category Links on ONE single row */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-x-8 overflow-x-auto whitespace-nowrap sm:gap-x-10 xl:gap-x-14 scrollbar-none">
                    {/* 1. Construction Technologies */}
                    <div className="inline-flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollToSection("construction-technologies")}
                        className={cn(
                          "text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-[#1067ab] md:text-[14px]",
                          activeCategoryMenu === "construction" ? "text-[#1a253c]" : "text-[#576070]"
                        )}
                      >
                        Construction Technologies
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCategoryDrawer("construction")}
                        aria-label="Toggle Construction Technologies subcategories"
                        className="p-1 text-[#6b7280] transition-colors hover:text-[#1a253c]"
                      >
                        {activeCategoryMenu === "construction" ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                    </div>

                    {/* 2. Integrated Systems */}
                    <div className="inline-flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollToSection("integrated-systems")}
                        className={cn(
                          "text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-[#1067ab] md:text-[14px]",
                          activeCategoryMenu === "integrated" ? "text-[#1a253c]" : "text-[#576070]"
                        )}
                      >
                        Integrated Systems
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCategoryDrawer("integrated")}
                        aria-label="Toggle Integrated Systems subcategories"
                        className="p-1 text-[#6b7280] transition-colors hover:text-[#1a253c]"
                      >
                        {activeCategoryMenu === "integrated" ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                    </div>

                    {/* 3. Engineering Excellence */}
                    <div className="inline-flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollToSection("engineering-excellence")}
                        className={cn(
                          "text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-[#1067ab] md:text-[14px]",
                          activeCategoryMenu === "engineering" ? "text-[#1a253c]" : "text-[#576070]"
                        )}
                      >
                        Engineering Excellence
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCategoryDrawer("engineering")}
                        aria-label="Toggle Engineering Excellence subcategories"
                        className="p-1 text-[#6b7280] transition-colors hover:text-[#1a253c]"
                      >
                        {activeCategoryMenu === "engineering" ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DROPDOWN DRAWER: Grey Background */}
          {activeCategoryMenu && (
            <section className="border-b border-[#e5e7eb] bg-[#f0f3f7] py-10 transition-all duration-300 animate-in fade-in-50">
              <div className="mx-auto max-w-[1720px] px-6 sm:px-10 xl:px-14 2xl:px-20">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
                  {/* Left Column: Context description */}
                  <div className="w-full shrink-0 lg:w-[280px] xl:w-[320px]">
                    <p className="text-[13px] leading-relaxed text-[#687182] md:text-[13.5px]">
                      {activeCategoryMenu === "construction" &&
                        "Engineered for high velocity and dimensional precision, our advanced construction systems integrate offsite prefabrication, cold-formed framing, and high-tensile composite profiles."}
                      {activeCategoryMenu === "integrated" &&
                        "Synthesizing multidisciplinary civil, structural, and mechanical engineering into unified hybrid systems tailored for complex architectural envelopes."}
                      {activeCategoryMenu === "engineering" &&
                        "Benchmarked against rigorous global standards, our execution methodologies ensure optimized workflows, compressed schedules, and zero-compromise safety."}
                    </p>
                  </div>

                  {/* Right Column: Subcategory Items Grid */}
                  <div className="min-w-0 flex-1">
                    {/* 1. CONSTRUCTION TECHNOLOGIES SUB-CATEGORIES */}
                    {activeCategoryMenu === "construction" && (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                          {CONSTRUCTION_SUBCATEGORIES.column1.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("construction", item.tag, "construction-technologies")}
                              className="group block w-full text-left transition-transform duration-200 hover:translate-x-1"
                            >
                              <h4 className="text-[15px] font-medium text-[#1067ab] group-hover:text-[#0c4e83]">
                                {item.title}
                              </h4>
                              <p className="mt-0.5 text-[12px] leading-tight text-[#6f7887]">
                                {item.description}
                              </p>
                            </button>
                          ))}
                        </div>

                        <div className="space-y-4">
                          {CONSTRUCTION_SUBCATEGORIES.column2.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("construction", item.tag, "construction-technologies")}
                              className="group block w-full text-left transition-transform duration-200 hover:translate-x-1"
                            >
                              <h4 className="text-[15px] font-medium text-[#1067ab] group-hover:text-[#0c4e83]">
                                {item.title}
                              </h4>
                              <p className="mt-0.5 text-[12px] leading-tight text-[#6f7887]">
                                {item.description}
                              </p>
                            </button>
                          ))}
                        </div>

                        <div className="space-y-4">
                          {CONSTRUCTION_SUBCATEGORIES.column3.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("construction", item.tag, "construction-technologies")}
                              className="group block w-full text-left transition-transform duration-200 hover:translate-x-1"
                            >
                              <h4 className="text-[15px] font-medium text-[#1067ab] group-hover:text-[#0c4e83]">
                                {item.title}
                              </h4>
                              <p className="mt-0.5 text-[12px] leading-tight text-[#6f7887]">
                                {item.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. INTEGRATED SYSTEMS SUB-CATEGORIES */}
                    {activeCategoryMenu === "integrated" && (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                          {INTEGRATED_SUBCATEGORIES.column1.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("integrated", item.tag, "integrated-systems")}
                              className="group block w-full text-left transition-transform duration-200 hover:translate-x-1"
                            >
                              <h4 className="text-[15px] font-medium text-[#1067ab] group-hover:text-[#0c4e83]">
                                {item.title}
                              </h4>
                              <p className="mt-0.5 text-[12px] leading-tight text-[#6f7887]">
                                {item.description}
                              </p>
                            </button>
                          ))}
                        </div>

                        <div className="space-y-4">
                          {INTEGRATED_SUBCATEGORIES.column2.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("integrated", item.tag, "integrated-systems")}
                              className="group block w-full text-left transition-transform duration-200 hover:translate-x-1"
                            >
                              <h4 className="text-[15px] font-medium text-[#1067ab] group-hover:text-[#0c4e83]">
                                {item.title}
                              </h4>
                              <p className="mt-0.5 text-[12px] leading-tight text-[#6f7887]">
                                {item.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. ENGINEERING EXCELLENCE SUB-CATEGORIES */}
                    {activeCategoryMenu === "engineering" && (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                          {ENGINEERING_SUBCATEGORIES.column1.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("engineering", item.tag, "engineering-excellence")}
                              className="group block w-full text-left transition-transform duration-200 hover:translate-x-1"
                            >
                              <h4 className="text-[15px] font-medium text-[#1067ab] group-hover:text-[#0c4e83]">
                                {item.title}
                              </h4>
                              <p className="mt-0.5 text-[12px] leading-tight text-[#6f7887]">
                                {item.description}
                              </p>
                            </button>
                          ))}
                        </div>

                        <div className="space-y-4">
                          {ENGINEERING_SUBCATEGORIES.column2.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("engineering", item.tag, "engineering-excellence")}
                              className="group block w-full text-left transition-transform duration-200 hover:translate-x-1"
                            >
                              <h4 className="text-[15px] font-medium text-[#1067ab] group-hover:text-[#0c4e83]">
                                {item.title}
                              </h4>
                              <p className="mt-0.5 text-[12px] leading-tight text-[#6f7887]">
                                {item.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ─── 3 MAIN PROJECT SECTIONS ─────────────────────────────────────── */}
      <div className="space-y-20 py-12 md:space-y-28 md:py-20">
        {/* SECTION 1: CONSTRUCTION TECHNOLOGIES */}
        <section
          id="construction-technologies"
          className="scroll-mt-[100px]"
          aria-labelledby="construction-heading"
        >
          <Container className="px-6 md:px-10">
            {/* Heading + divider line */}
            <div className="flex items-center gap-6">
              <h2
                id="construction-heading"
                className="shrink-0 text-2xl font-semibold tracking-tight text-[#1b253b] sm:text-3xl"
              >
                Construction Technologies
              </h2>
              <div className="h-[1px] flex-1 bg-[#e0e3ea]" />
            </div>

            {/* Active subcategory filter feedback if any */}
            {selectedSubcategoryFilter?.section === "construction" && (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase text-[#64748b]">Filtered by:</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1067ab]/10 px-3 py-1 text-xs font-medium text-[#1067ab]">
                  {selectedSubcategoryFilter.tag}
                  <button
                    type="button"
                    onClick={() => setSelectedSubcategoryFilter(null)}
                    className="ml-1 font-bold hover:text-black"
                  >
                    ×
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSubcategoryFilter(null)}
                  className="text-xs text-[#1067ab] underline hover:text-[#0b4d82]"
                >
                  Show All Construction Technologies
                </button>
              </div>
            )}

            {/* Project Grid */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(selectedSubcategoryFilter?.section === "construction"
                ? constructionProjects.filter(
                    (p) =>
                      p.subcategoryTag.toUpperCase() ===
                      selectedSubcategoryFilter.tag.toUpperCase()
                  )
                : constructionProjects
              ).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>

        {/* SECTION 2: INTEGRATED SYSTEMS */}
        <section
          id="integrated-systems"
          className="scroll-mt-[100px]"
          aria-labelledby="integrated-heading"
        >
          <Container className="px-6 md:px-10">
            {/* Heading + divider line */}
            <div className="flex items-center gap-6">
              <h2
                id="integrated-heading"
                className="shrink-0 text-2xl font-semibold tracking-tight text-[#1b253b] sm:text-3xl"
              >
                Integrated Systems
              </h2>
              <div className="h-[1px] flex-1 bg-[#e0e3ea]" />
            </div>

            {/* Active subcategory filter feedback if any */}
            {selectedSubcategoryFilter?.section === "integrated" && (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase text-[#64748b]">Filtered by:</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1067ab]/10 px-3 py-1 text-xs font-medium text-[#1067ab]">
                  {selectedSubcategoryFilter.tag}
                  <button
                    type="button"
                    onClick={() => setSelectedSubcategoryFilter(null)}
                    className="ml-1 font-bold hover:text-black"
                  >
                    ×
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSubcategoryFilter(null)}
                  className="text-xs text-[#1067ab] underline hover:text-[#0b4d82]"
                >
                  Show All Integrated Systems
                </button>
              </div>
            )}

            {/* Project Grid */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(selectedSubcategoryFilter?.section === "integrated"
                ? integratedProjects.filter(
                    (p) =>
                      p.subcategoryTag.toUpperCase() ===
                      selectedSubcategoryFilter.tag.toUpperCase()
                  )
                : integratedProjects
              ).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>

        {/* SECTION 3: ENGINEERING EXCELLENCE */}
        <section
          id="engineering-excellence"
          className="scroll-mt-[100px]"
          aria-labelledby="engineering-heading"
        >
          <Container className="px-6 md:px-10">
            {/* Heading + divider line */}
            <div className="flex items-center gap-6">
              <h2
                id="engineering-heading"
                className="shrink-0 text-2xl font-semibold tracking-tight text-[#1b253b] sm:text-3xl"
              >
                Engineering Excellence
              </h2>
              <div className="h-[1px] flex-1 bg-[#e0e3ea]" />
            </div>

            {/* Active subcategory filter feedback if any */}
            {selectedSubcategoryFilter?.section === "engineering" && (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase text-[#64748b]">Filtered by:</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1067ab]/10 px-3 py-1 text-xs font-medium text-[#1067ab]">
                  {selectedSubcategoryFilter.tag}
                  <button
                    type="button"
                    onClick={() => setSelectedSubcategoryFilter(null)}
                    className="ml-1 font-bold hover:text-black"
                  >
                    ×
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSubcategoryFilter(null)}
                  className="text-xs text-[#1067ab] underline hover:text-[#0b4d82]"
                >
                  Show All Engineering Excellence
                </button>
              </div>
            )}

            {/* Project Grid */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(selectedSubcategoryFilter?.section === "engineering"
                ? engineeringProjects.filter(
                    (p) =>
                      p.subcategoryTag.toUpperCase() ===
                      selectedSubcategoryFilter.tag.toUpperCase()
                  )
                : engineeringProjects
              ).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}

/**
 * Individual project card replicating the exact design and hover behavior
 * of `BusinessPageContent.tsx` / `ProjectGallerySection.tsx`:
 */
function ProjectCard({ project }: { project: InnovationProjectItem }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden bg-[#dfe3ea]"
    >
      {/* IMAGE */}
      <div className="aspect-[1/1.08] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-all duration-500 ease-out group-hover:opacity-100" />

      {/* CONTENT */}
      <div className="absolute inset-x-0 bottom-0 translate-y-10 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f3d18b] backdrop-blur-sm">
          {project.subcategoryTag}
        </p>

        <h3 className="mt-2 text-xl font-medium text-white">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
