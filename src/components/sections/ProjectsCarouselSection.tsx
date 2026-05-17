"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";

const ITEMS = [
  {
    src: "/home/projects/home-project-airport.webp",
    sector: "SECTORS",
    title: "Airports",
    subtitle: "Terminal Infrastructure Development",
    href: "/projects/subcategory/airports",
  },
  {
    src: "/home/projects/oil.webp",
    sector: "SECTORS",
    title: "Oil & Gas",
    subtitle: "Industrial Energy Infrastructure",
    href: "/projects/subcategory/oil-gas",
  },
  {
    src: "/home/projects/school.webp",
    sector: "URBAN & INSTITUTIONAL",
    title: "Schools",
    subtitle: "Educational Campus Development",
    href: "/projects/subcategory/schools",
  },
  {
    src: "/home/projects/power-plant.webp",
    sector: "SECTORS",
    title: "Power Plants",
    subtitle: "Power Plant Infrastructure",
    href: "/projects/subcategory/power-plants",
  },
  {
    src: "/home/projects/facade.webp",
    sector: "SERVICES",
    title: "Facade Engineering",
    subtitle: "Facade Design & Engineering Solutions",
    href: "/projects/subcategory/metro-rail",
  },
  {
    src: "/home/projects/commercialbuilding_sgcci.webp",
    sector: "COMMERCIAL",
    title: "Commercial",
    subtitle: "Corporate & Mixed-use Developments",
    href: "/projects/subcategory/commercial",
  },
  {
    src: "/home/projects/residential.webp",
    sector: "RESIDENTIAL",
    title: "Residential",
    subtitle: "Luxury Residential Infrastructure",
    href: "/projects/subcategory/residential",
  },
  {
    src: "/home/projects/PEB_kaviish_m1.webp",
    sector: "INDUSTRIAL",
    title: "Industrial",
    subtitle: "Manufacturing & Industrial Facilities",
    href: "/projects/subcategory/industrial",
  },
];

export function ProjectsCarouselSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const card = el.querySelector("article");
    if (!card) return;

    const cardWidth = card.clientWidth + 20;

    el.scrollBy({
      left: dir * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <SectionWrapper>
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-[32px] font-normal tracking-[-0.04em] text-[#1f2740] md:text-[40px]">
            Our Projects
          </h2>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-hidden pb-6"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {ITEMS.map((item) => (
              <article
                key={item.href}
                className="flex w-[24%] min-w-[24%] shrink-0 flex-col overflow-hidden rounded-sm border border-border bg-white"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative h-[240px] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 80vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b88618]">
                    {item.sector}
                  </p>

                  <h3 className="mt-3 text-[20px] font-semibold leading-tight text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.subtitle}
                  </p>

                  <div className="mt-auto pt-6">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 bg-[#1d2537] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2a3650]"
                    >
                      View Projects
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-xl shadow-sm transition-colors hover:bg-[#1d2537] hover:text-white"
            >
              ‹
            </button>

            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-xl shadow-sm transition-colors hover:bg-[#1d2537] hover:text-white"
            >
              ›
            </button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}