"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

export interface BusinessProjectItem {
  id: string;
  title: string;
  slug: string;
  category: "water" | "civil" | "mechanical" | "facade";
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

const FACADE_SUBCATEGORIES: { column1: SubCategoryDef[]; column2: SubCategoryDef[]; column3: SubCategoryDef[] } = {
  column1: [
    { title: "Stone Cladding", description: "Timeless texture, natural elegance, lasting durability.", tag: "STONE CLADDING" },
    { title: "Glass Cladding", description: "Elegant, modern, transparent, durable, light-enhancing.", tag: "GLASS CLADDING" },
    { title: "GRC", description: "Lightweight, durable, versatile, weather-resistant, aesthetic.", tag: "GRC" },
    { title: "Innovation", description: "Innovative, sustainable, intelligent, adaptive, future-ready.", tag: "INNOVATION" },
  ],
  column2: [
    { title: "Metal Cladding", description: "Modern finish, sleek strength, lasting protection.", tag: "METAL CLADDING" },
    { title: "Structural Glazing", description: "Seamless, sleek, transparent, modern, frameless.", tag: "STRUCTURAL GLAZING" },
    { title: "Spider Glazing", description: "Frameless, transparent, sleek, minimal, sophisticated.", tag: "SPIDER GLAZING" },
  ],
  column3: [
    { title: "ACP", description: "Lightweight, sleek, durable, versatile, weather-resistant.", tag: "ACP" },
    { title: "Lift Glazing", description: "Elegant, transparent, modern, spacious, illuminated.", tag: "LIFT GLAZING" },
    { title: "SS Railing", description: "Sleek, durable, corrosion-resistant, modern, low-maintenance.", tag: "SS RAILING" },
  ],
};

const CIVIL_SUBCATEGORIES: { column1: SubCategoryDef[]; column2: SubCategoryDef[]; column3: SubCategoryDef[] } = {
  column1: [
    { title: "Piling", description: "Deep bored & driven pile foundations for high-load structures.", tag: "PILING" },
    { title: "Road", description: "Rigid & flexible pavement network development and highways.", tag: "ROAD" },
    { title: "Building Construction", description: "Commercial, corporate, and high-rise structural builds.", tag: "BUILDING CONSTRUCTION" },
  ],
  column2: [
    { title: "Industrial Construction", description: "Heavy industrial complexes, plant facilities, and sheds.", tag: "INDUSTRIAL CONSTRUCTION" },
    { title: "Drains", description: "Stormwater and industrial effluent drainage systems.", tag: "DRAINS" },
  ],
  column3: [
    { title: "Water Network", description: "Distribution pipelines and underground utility networks.", tag: "WATER NETWORK" },
    { title: "Elevated Water Tanks", description: "RCC water reservoirs and community storage balance towers.", tag: "ELEVATED WATER TANKS" },
  ],
};

const MECHANICAL_SUBCATEGORIES: { column1: SubCategoryDef[]; column2: SubCategoryDef[]; column3: SubCategoryDef[] } = {
  column1: [
    { title: "PEB Wave Type Structures", description: "Engineered pre-engineered buildings and wave-form roofing.", tag: "PEB WAVE TYPE STRUCTURES" },
  ],
  column2: [
    { title: "Louvers", description: "Industrial ventilation louvers and architectural acoustic systems.", tag: "LOUVERS" },
  ],
  column3: [
    { title: "Metal Sheets", description: "High-tensile profiled metal cladding and roof decking.", tag: "METAL SHEETS" },
  ],
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

interface BusinessPageContentProps {
  projects: BusinessProjectItem[];
}

export function BusinessPageContent({ projects }: BusinessPageContentProps) {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const [activeCategoryMenu, setActiveCategoryMenu] = useState<"civil" | "mechanical" | "facade" | null>(null);
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState<{
    section: "water" | "civil" | "mechanical" | "facade";
    tag: string;
  } | null>(null);

  // Animated running statistics
  const experienceCount = useCountUp(20, 1600);
  const projectsCount = useCountUp(100, 2000);

  const scrollToSection = (sectionId: string) => {
    const targetId =
      sectionId === "facade-engineering" || sectionId === "facade-works"
        ? (document.getElementById("facade-works") ? "facade-works" : "facade-engineering")
        : sectionId;
    const el = document.getElementById(targetId) || document.getElementById(sectionId);
    if (el) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 135;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 35;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#/, "");
      if (!rawHash) return;

      const targetId =
        rawHash === "facade-engineering" || rawHash === "facade-works"
          ? (document.getElementById("facade-works") ? "facade-works" : "facade-engineering")
          : rawHash;

      const el = document.getElementById(targetId) || document.getElementById(rawHash);
      if (el) {
        const header = document.querySelector("header");
        const headerHeight = header ? header.getBoundingClientRect().height : 135;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 35;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      }
    };

    handleHash();
    const timer1 = setTimeout(handleHash, 100);
    const timer2 = setTimeout(handleHash, 350);

    window.addEventListener("hashchange", handleHash);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  const toggleCategoryDrawer = (category: "civil" | "mechanical" | "facade") => {
    if (activeCategoryMenu === category) {
      setActiveCategoryMenu(null);
    } else {
      setActiveCategoryMenu(category);
    }
  };

  const handleSubcategoryClick = (section: "civil" | "mechanical" | "facade", tag: string, sectionId: string) => {
    setSelectedSubcategoryFilter({ section, tag });
    scrollToSection(sectionId);
  };

  // Filter projects by category
  const waterProjects = projects.filter((p) => p.category === "water");
  const civilProjects = projects.filter((p) => p.category === "civil");
  const mechanicalProjects = projects.filter((p) => p.category === "mechanical");
  const facadeProjects = projects.filter((p) => p.category === "facade");

  return (
    <div className="min-h-screen bg-white text-[#1f2a44]">
      {/* ─── HERO HEADER SECTION (Images 1, 2 & 5) ────────────────────────── */}
      {/* Increased length, vertical padding, and width for spacious premium layout */}
      <section className="border-b border-[#e5e7eb] bg-[#f0f3f7] py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1720px] px-6 sm:px-10 xl:px-14 2xl:px-20">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Title / Eyebrow (Image 2: B and S vertically aligned) */}
            <div className="flex flex-col items-start lg:col-span-4 xl:col-span-3">
              <span className="block text-[14px] font-medium tracking-normal text-[#c59d4d] md:text-[15px]">
                Business
              </span>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#1a253c] sm:text-4xl lg:text-[30px] lg:leading-[1.15]">
                Services
              </h1>
            </div>

            {/* Middle Description + MORE Toggle */}
            <div className="lg:col-span-5 xl:col-span-6">
              <div className={cn("transition-all duration-300", isMoreExpanded ? "max-w-xl xl:max-w-2xl" : "max-w-[480px]")}>
                <p className="text-[14px] font-normal leading-[1.75] text-[#404958]">
                  At Bluechip Technologies & Engineering Pvt. Ltd., we bring together engineering expertise, project execution, and innovative construction technologies to deliver demanding projects across civil construction, infrastructure, mechanical works, façade engineering, and environmental solutions.
                </p>

                {/* Extended Description revealed on "MORE" */}
                {isMoreExpanded && (
                  <div className="mt-5 space-y-4 text-[13.5px] leading-[1.7] text-[#475263]">
                    {/* Industries We Serve Section */}
                    <div className="border-t border-[#e2e8f0] pt-4">
                      <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1067ab]">
                        Industries We Serve
                      </h3>
                      <div className="mt-3 space-y-2.5">
                        <div>
                          <span className="font-semibold text-[#1a253c]">Industrial Infrastructure: </span>
                          <span className="text-[#556277]">Power plants • Chemical plants • Oil & Gas • Steel • Ports • Industrial facilities</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1a253c]">Transportation & Aviation: </span>
                          <span className="text-[#556277]">Airports • Railway infrastructure • Highways • Transportation facilities</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1a253c]">Commercial & Institutional: </span>
                          <span className="text-[#556277]">Commercial buildings • Residential buildings • Auditoriums • Institutional buildings • Warehouses</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1a253c]">Environmental Infrastructure: </span>
                          <span className="text-[#556277]">Water supply • Wastewater • Sewerage • Recycling • Solid waste management</span>
                        </div>
                      </div>
                    </div>
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

            {/* Experience Counters: Un-bolded, thin font-light running statistics with circular gradient */}
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
                  {experienceCount}+
                </div>
                <div className="mt-2.5 max-w-[110px] text-[13px] font-normal leading-snug text-[#525f77] sm:text-[14px]">
                  years of experience
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
                  {projectsCount}+
                </div>
                <div className="mt-2.5 max-w-[120px] text-[13px] font-normal leading-snug text-[#525f77] sm:text-[14px]">
                  projects completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EPC & CATEGORIES SUB-NAV BAR ─────────────────────────────────────── */}
      {/* TOP BAR: Always White */}
      <section className="border-b border-[#e5e7eb] bg-white py-6 sm:py-7 transition-colors duration-300">
        <div className="mx-auto max-w-[1720px] px-6 sm:px-10 xl:px-14 2xl:px-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
            {/* Left Column: EPC Header & Description (visible throughout) */}
            <div className="w-full shrink-0 lg:w-[280px] xl:w-[320px]">
              <h2 className="text-[17px] font-bold tracking-wider text-[#1a253c] uppercase">
                EPC
              </h2>
              {!activeCategoryMenu && (
                <p className="mt-3 text-[13px] leading-relaxed text-[#687182] md:text-[13.5px]">
                  As an integrated EPC partner, Bluechip delivers single-point accountability across engineering, procurement, and construction—unifying civil infrastructure, heavy mechanical works, architectural façades, and environmental management from design through commissioning.
                </p>
              )}
            </div>

                {/* Right Column: 4 Nav Category Links on ONE single row */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-x-8 overflow-x-auto whitespace-nowrap sm:gap-x-10 xl:gap-x-14 scrollbar-none">
                    {/* 1. Water & Solid Waste Management (No subcategories, direct link) */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategoryMenu(null);
                        scrollToSection("water-and-solid-waste-management");
                      }}
                      className="shrink-0 text-[13px] font-semibold uppercase tracking-wider text-[#576070] transition-colors hover:text-[#1067ab] md:text-[14px]"
                    >
                      Water & Solid Waste Management
                    </button>

                    {/* 2. Civil Construction (Link + Chevron Toggle) */}
                    <div className="inline-flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollToSection("civil-construction")}
                        className={cn(
                          "text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-[#1067ab] md:text-[14px]",
                          activeCategoryMenu === "civil" ? "text-[#1a253c]" : "text-[#576070]"
                        )}
                      >
                        Civil Construction
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCategoryDrawer("civil")}
                        aria-label="Toggle Civil Construction subcategories"
                        className="p-1 text-[#6b7280] transition-colors hover:text-[#1a253c]"
                      >
                        {activeCategoryMenu === "civil" ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                    </div>

                    {/* 3. Mechanical Works (Link + Chevron Toggle) */}
                    <div className="inline-flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollToSection("mechanical-works")}
                        className={cn(
                          "text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-[#1067ab] md:text-[14px]",
                          activeCategoryMenu === "mechanical" ? "text-[#1a253c]" : "text-[#576070]"
                        )}
                      >
                        Mechanical Works
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCategoryDrawer("mechanical")}
                        aria-label="Toggle Mechanical Works subcategories"
                        className="p-1 text-[#6b7280] transition-colors hover:text-[#1a253c]"
                      >
                        {activeCategoryMenu === "mechanical" ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                    </div>

                    {/* 4. Facade Works (Link + Chevron Toggle) */}
                    <div className="inline-flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollToSection("facade-works")}
                        className={cn(
                          "text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-[#1067ab] md:text-[14px]",
                          activeCategoryMenu === "facade" ? "text-[#1a253c]" : "text-[#576070]"
                        )}
                      >
                        Facade Works
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCategoryDrawer("facade")}
                        aria-label="Toggle Facade Works subcategories"
                        className="p-1 text-[#6b7280] transition-colors hover:text-[#1a253c]"
                      >
                        {activeCategoryMenu === "facade" ? (
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

          {/* DROPDOWN DRAWER: Grey Background (Image 1) with Placeholder text aligned to Stone Cladding */}
          {activeCategoryMenu && (
            <section className="border-b border-[#e5e7eb] bg-[#f0f3f7] py-10 transition-all duration-300 animate-in fade-in-50">
              <div className="mx-auto max-w-[1720px] px-6 sm:px-10 xl:px-14 2xl:px-20">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
                  {/* Left Column: Dynamic Category Description */}
                  <div className="w-full shrink-0 lg:w-[280px] xl:w-[320px]">
                    {activeCategoryMenu === "civil" && (
                      <p className="text-[13px] leading-relaxed text-[#687182] md:text-[13.5px]">
                        <strong className="font-semibold text-[#1a253c]">Civil Construction: </strong>
                        End-to-end civil construction solutions engineered for scale, durability, and execution excellence—from site development, earthwork, and deep foundations to RCC structures, industrial complexes, roads, pavements, and infrastructure development.
                      </p>
                    )}
                    {activeCategoryMenu === "mechanical" && (
                      <p className="text-[13px] leading-relaxed text-[#687182] md:text-[13.5px]">
                        <strong className="font-semibold text-[#1a253c]">Mechanical Works: </strong>
                        Integrated mechanical execution capabilities supporting industrial, infrastructure, and process facilities—from design and 3D modeling (TEKLA, FEA, STAAD.Pro) and heavy fabrication to erection, piping, installation, testing, and commissioning.
                      </p>
                    )}
                    {activeCategoryMenu === "facade" && (
                      <p className="text-[13px] leading-relaxed text-[#687182] md:text-[13.5px]">
                        <strong className="font-semibold text-[#1a253c]">Façade Works: </strong>
                        High-performance architectural façade solutions engineered for aesthetics, durability, and demanding project conditions—delivering customized engineering and execution across structural glazing, ACP, metal and stone cladding, system windows, innovative louvers, space frames, 3D metal panels, and engineered hanging systems.
                      </p>
                    )}
                  </div>

                  {/* Right Column: Subcategory Items Grid (Image 1) */}
                  <div className="min-w-0 flex-1">
                    {/* FACADE SUB-CATEGORIES (Image 1 replica) */}
                    {activeCategoryMenu === "facade" && (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                          {FACADE_SUBCATEGORIES.column1.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("facade", item.tag, "facade-works")}
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
                          {FACADE_SUBCATEGORIES.column2.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("facade", item.tag, "facade-works")}
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
                          {FACADE_SUBCATEGORIES.column3.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("facade", item.tag, "facade-works")}
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

                    {/* CIVIL SUB-CATEGORIES (User-specified subcategories) */}
                    {activeCategoryMenu === "civil" && (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                          {CIVIL_SUBCATEGORIES.column1.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("civil", item.tag, "civil-construction")}
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
                          {CIVIL_SUBCATEGORIES.column2.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("civil", item.tag, "civil-construction")}
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
                          {CIVIL_SUBCATEGORIES.column3.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("civil", item.tag, "civil-construction")}
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

                    {/* MECHANICAL SUB-CATEGORIES (User-specified subcategories) */}
                    {activeCategoryMenu === "mechanical" && (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                          {MECHANICAL_SUBCATEGORIES.column1.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("mechanical", item.tag, "mechanical-works")}
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
                          {MECHANICAL_SUBCATEGORIES.column2.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("mechanical", item.tag, "mechanical-works")}
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
                          {MECHANICAL_SUBCATEGORIES.column3.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handleSubcategoryClick("mechanical", item.tag, "mechanical-works")}
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

      {/* ─── 4 MAIN PROJECT SECTIONS (Images 3 & 4) ─────────────────────── */}
      {/* Sized and styled to replicate the exact projects/sectors gallery */}
      <div className="space-y-20 py-12 md:space-y-28 md:py-20">
        {/* SECTION 1: WATER & SOLID WASTE MANAGEMENT */}
        <section
          id="water-and-solid-waste-management"
          className="scroll-mt-[170px]"
          aria-labelledby="water-heading"
        >
          <Container className="px-6 md:px-10">
            {/* Heading + divider line */}
            <div className="flex items-center gap-6">
              <h2
                id="water-heading"
                className="shrink-0 text-2xl font-semibold tracking-tight text-[#1b253b] sm:text-3xl"
              >
                Water & Solid Waste Management
              </h2>
              <div className="h-[1px] flex-1 bg-[#e0e3ea]" />
            </div>

            {/* Project Grid (consistent with projects/sectors) */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {waterProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>

        {/* SECTION 2: CIVIL CONSTRUCTION */}
        <section
          id="civil-construction"
          className="scroll-mt-[170px]"
          aria-labelledby="civil-heading"
        >
          <Container className="px-6 md:px-10">
            {/* Heading + divider line */}
            <div className="flex items-center gap-6">
              <h2
                id="civil-heading"
                className="shrink-0 text-2xl font-semibold tracking-tight text-[#1b253b] sm:text-3xl"
              >
                Civil Construction
              </h2>
              <div className="h-[1px] flex-1 bg-[#e0e3ea]" />
            </div>

            {/* Active subcategory filter feedback if any */}
            {selectedSubcategoryFilter?.section === "civil" && (
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
                  Show All Civil Projects
                </button>
              </div>
            )}

            {/* Project Grid (consistent with projects/sectors) */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(selectedSubcategoryFilter?.section === "civil"
                ? civilProjects.filter(
                    (p) =>
                      p.subcategoryTag.toUpperCase() ===
                      selectedSubcategoryFilter.tag.toUpperCase()
                  )
                : civilProjects
              ).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>

        {/* SECTION 3: MECHANICAL WORKS */}
        <section
          id="mechanical-works"
          className="scroll-mt-[170px]"
          aria-labelledby="mechanical-heading"
        >
          <Container className="px-6 md:px-10">
            {/* Heading + divider line */}
            <div className="flex items-center gap-6">
              <h2
                id="mechanical-heading"
                className="shrink-0 text-2xl font-semibold tracking-tight text-[#1b253b] sm:text-3xl"
              >
                Mechanical Works
              </h2>
              <div className="h-[1px] flex-1 bg-[#e0e3ea]" />
            </div>

            {/* Active subcategory filter feedback if any */}
            {selectedSubcategoryFilter?.section === "mechanical" && (
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
                  Show All Mechanical Projects
                </button>
              </div>
            )}

            {/* Project Grid (consistent with projects/sectors) */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(selectedSubcategoryFilter?.section === "mechanical"
                ? mechanicalProjects.filter(
                    (p) =>
                      p.subcategoryTag.toUpperCase() ===
                      selectedSubcategoryFilter.tag.toUpperCase()
                  )
                : mechanicalProjects
              ).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>

        {/* SECTION 4: FACADE WORKS */}
        <section
          id="facade-works"
          className="scroll-mt-[170px]"
          aria-labelledby="facade-heading"
        >
          <div id="facade-engineering" className="scroll-mt-[170px]" />
          <Container className="px-6 md:px-10">
            {/* Heading + divider line */}
            <div className="flex items-center gap-6">
              <h2
                id="facade-heading"
                className="shrink-0 text-2xl font-semibold tracking-tight text-[#1b253b] sm:text-3xl"
              >
                Facade Works
              </h2>
              <div className="h-[1px] flex-1 bg-[#e0e3ea]" />
            </div>

            {/* Active subcategory filter feedback if any */}
            {selectedSubcategoryFilter?.section === "facade" && (
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
                  Show All Facade Projects
                </button>
              </div>
            )}

            {/* Project Grid (consistent with projects/sectors) */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(selectedSubcategoryFilter?.section === "facade"
                ? facadeProjects.filter(
                    (p) =>
                      p.subcategoryTag.toUpperCase() ===
                      selectedSubcategoryFilter.tag.toUpperCase()
                  )
                : facadeProjects
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
 * of `src/components/sections/ProjectGallerySection.tsx` (/projects/sectors):
 *
 * - Aspect ratio: aspect-[1/1.08] (consistent with sectors/projects gallery)
 * - Normal state: Pure clean project photograph
 * - Hover state:
 *   - Smooth scale zoom (scale-[1.08])
 *   - Gradient overlay (black/80 via black/20) fades in
 *   - Golden pill tag badge backdrop-blurred slide up from bottom
 *   - Crisp white project title slides up
 */
function ProjectCard({ project }: { project: BusinessProjectItem }) {
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
