"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ABOUT_VISIONARIES, type AboutVisionary } from "@/lib/mock-data";

const VISIBLE_COUNT = 4;

export function AboutVisionariesSection({
  initialVisionaries = ABOUT_VISIONARIES,
}: {
  initialVisionaries?: AboutVisionary[];
}) {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = Math.min(VISIBLE_COUNT, initialVisionaries.length);
  const visibleCards = Array.from({ length: visibleCount }, (_, i) => {
    const index = (startIndex + i) % initialVisionaries.length;
    return initialVisionaries[index];
  });

  const goPrev = () => {
    setStartIndex((prev) =>
      (prev - 1 + initialVisionaries.length) %
      initialVisionaries.length
    );
  };

  const goNext = () => {
    setStartIndex((prev) =>
      (prev + 1) % initialVisionaries.length
    );
  };

  return (
    <section
      className="overflow-hidden bg-white py-12 lg:py-16"
      aria-labelledby="about-visionaries-title"
    >
      <div className="px-6 md:px-12 lg:px-20">

        {/* TOP SECTION */}
        <div className="mb-20 flex items-start justify-between">

          {/* HEADING */}
          <div className="relative">
            <h2
              id="about-visionaries-title"
              className="max-w-[320px] text-[22px] font-bold leading-[1.] tracking-[-0.02em] text-[#1c2438] md:text-[36px]"
            >
              Meet our
              <br />
              visionaries.
            </h2>

            <svg
              className="absolute -bottom-18 left-24 pointer-events-none"
              width="180"
              height="100"
              viewBox="5 2 300 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 85 C 120 10, 240 20, 340 35"
                stroke="#c69222"
                strokeWidth="13"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
          </div>

          {/* SLIDER BUTTONS */}
        {initialVisionaries.length > VISIBLE_COUNT && (
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous visionaries"
              className="flex size-12 items-center justify-center rounded-full bg-[#0f63bc] text-white transition-all duration-300 hover:bg-[#c9962d] hover:scale-105"
            >
              <ArrowLeft className="size-5" />
            </button>
          
            <button
              type="button"
              onClick={goNext}
              aria-label="Next visionaries"
              className="flex size-12 items-center justify-center rounded-full bg-[#0f63bc] text-white transition-all duration-300 hover:bg-[#c9962d] hover:scale-105"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        )}
        </div>

        {/* CARDS */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {visibleCards.map((person) => (
            <div
              key={person.id}
              className="group [perspective:1400px]"
            >
              <div className="relative h-[300px] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* FRONT SIDE */}
                <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden]">

                  <div
                    className="h-full w-full bg-cover bg-[center_top] transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{
                      backgroundImage: `url(${person.imageUrl})`,
                    }}
                  />

                  {/* SUBTLE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 flex rotate-y-180 flex-col justify-between bg-gradient-to-b from-[#0f76be] to-[#0a49a5] p-6 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">

                  {/* TOP CONTENT */}
                  <div>
                    <h3 className="max-w-[220px] text-[20px] font-semibold leading-[1.08] tracking-[-0.03em]">
                      {person.name}
                    </h3>

                    <p className="mt-2 text-[14px] text-white/90">
                      {person.role}
                    </p>
                  </div>

                  {/* DESCRIPTION */}
                  {(() => {
                    const isMD = person.role.toLowerCase().includes("managing director") || 
                                 person.role.toLowerCase().includes("md") || 
                                 person.id === "1" || 
                                 person.name.toLowerCase().includes("dimple shah");

                    return isMD ? (
                      <div className="mt-4 flex flex-col h-full pr-2">
                        <p className="max-w-[260px] text-[13.5px] leading-relaxed text-white/95 line-clamp-4">
                          {person.bio}
                        </p>
                        <div className="mt-auto pt-4 pb-2">
                          <Link href={`/about/visionaries/${person.id}`} className="inline-flex items-center text-sm font-semibold text-[#c9962d] hover:text-white transition-colors">
                            Read More <ArrowRight className="ml-1 size-4" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 flex-1 overflow-y-auto pr-2 scrollbar-sleek">
                        <p className="max-w-[260px] text-[13.5px] leading-relaxed text-white/95">
                          {person.bio}
                        </p>
                      </div>
                    );
                  })()}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}