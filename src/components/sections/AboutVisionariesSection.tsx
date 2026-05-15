"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ABOUT_VISIONARIES, type AboutVisionary } from "@/lib/mock-data";

const VISIBLE_COUNT = 4;

export function AboutVisionariesSection({
  initialVisionaries = ABOUT_VISIONARIES,
}: {
  initialVisionaries?: AboutVisionary[];
}) {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCards = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
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
      className="overflow-hidden bg-white py-20 lg:py-24"
      aria-labelledby="about-visionaries-title"
    >
      <div className="px-6 md:px-12 lg:px-20">

        {/* TOP SECTION */}
        <div className="mb-16 flex items-start justify-between">

          {/* HEADING */}
          <div>
            <h2
              id="about-visionaries-title"
              className="max-w-[320px] text-[42px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1c2438] md:text-[56px]"
            >
              Meet our
              <br />
              visionaries.
            </h2>

            {/* GOLD CURVE / LINE */}
            <div className="mt-5 h-[7px] w-[140px] rounded-full bg-[#c69222]" />
          </div>

          {/* SLIDER BUTTONS */}
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous visionaries"
              className="flex size-12 items-center justify-center rounded-full bg-[#0f63bc] text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next visionaries"
              className="flex size-12 items-center justify-center rounded-full bg-[#0f63bc] text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {visibleCards.map((person) => (
            <div
              key={person.id}
              className="group [perspective:1400px]"
            >
              <div className="relative h-[560px] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* FRONT SIDE */}
                <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden]">

                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{
                      backgroundImage: `url(${person.imageUrl})`,
                    }}
                  />

                  {/* SUBTLE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 flex rotate-y-180 flex-col justify-between bg-gradient-to-b from-[#0f76be] to-[#0a49a5] p-8 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">

                  {/* TOP CONTENT */}
                  <div>
                    <h3 className="max-w-[220px] text-[28px] font-semibold leading-[1.08] tracking-[-0.03em]">
                      {person.name}
                    </h3>

                    <p className="mt-3 text-[18px] text-white/90">
                      {person.role}
                    </p>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="max-w-[260px] text-[18px] leading-[1.6] text-white/95">
                    {person.bio}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}