"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const IMAGES = [
  "/home/about/home-about-1.webp",
  "/home/about/home-about-2.webp",
  "/home/about/home-about-3.webp",
  "/home/about/home-about-4.webp",
  "/home/about/home-about-5.webp",
];

export function AboutJourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useAnimationFrame((time) => {
    const durationPerImage = 4000; // 4 seconds
    const totalDuration = durationPerImage * IMAGES.length; // 20 seconds
    const progress = (time % totalDuration) / totalDuration;
    const index = Math.floor(progress * IMAGES.length);
    setActiveIndex((IMAGES.length - 1 - index) % IMAGES.length);
  });

  return (
    <section
      className="overflow-hidden bg-white pb-0 pt-12 md:pt-16 lg:pt-20"
      aria-labelledby="home-about-title"
    >
      <div className="grid w-full grid-cols-1 items-stretch gap-0 lg:grid-cols-2">

        {/* LEFT: pale timeline panel */}
        <div className="relative z-20 order-2 lg:order-1">
          <div className="flex min-h-[520px] lg:min-h-[660px] flex-col justify-between bg-[#f3f7fb] p-8 md:p-10 lg:px-12 lg:pb-16 lg:pt-10">

            {/* TOP CONTENT */}
            <div className="relative lg:mt-2">

  {/* SMALL HEADING */}
  <div className="relative top-0">
    <span className="block text-[18px] font-medium tracking-[0.02em] text-[#78868e]">
      Our Journey &amp; Milestones
    </span>
  </div>

  {/* MAIN HEADING */}
  <div className="relative top-1">
    <h3 className="mt-1 max-w-[520px] text-[20px] font-normal leading-[1.08] tracking-[-0.02em] text-[#222b40] md:text-[22px] lg:text-[32px]">
      Built steadily since 1998.
    </h3>
  </div>

  {/* BUTTON */}
  <div className="relative top-6 mt-6">
    <a
      className="inline-block bg-[#496a9c] px-6 py-[12px] text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-sm transition-colors duration-300 hover:bg-[#c9962d]"
      href="/projects"
    >
      View our growth story
    </a>
  </div>

</div>

            {/* BOTTOM TIMELINE + IMAGES */}
            <div>

              {/* timeline row */}
              <div className="mt-10 flex items-center gap-5">
                <div className="text-[22px] font-semibold tracking-[-0.02em] text-[#cc962f]">
                  1998
                </div>

                <div className="flex-1 border-t border-dashed border-[#e1d6c9]" />

                <div className="text-[22px] font-semibold tracking-[-0.02em] text-[#cc962f]">
                  Present
                </div>
              </div>

              {/* thumbnails */}
              <div
                className="relative z-30 mt-6 flex overflow-hidden py-6 lg:-ml-20 lg:-mb-3"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                }}
              >
                <motion.div
                  className="flex w-max items-end"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{
                    ease: "linear",
                    duration: 20,
                    repeat: Infinity,
                  }}
                >
                  {/* duplicate block for seamless infinite loop */}
                  {[...Array(2)].map((_, blockIdx) => (
                    <div
                      key={blockIdx}
                      className="flex items-end gap-10 pr-10"
                    >
                      {IMAGES.map((src, i) => {
                        const isActive = activeIndex === i;
                        return (
                          <div
                            key={i}
                            className={`relative shrink-0 overflow-hidden transition-all duration-500 ${
                              isActive
                                ? "h-36 w-36 border-[6px] border-[#eef2f6] shadow-[0_14px_30px_rgba(15,23,42,0.14)]"
                                : "h-32 w-32"
                            }`}
                          >
                            <Image
                              src={src}
                              alt={`Project ${i + 1}`}
                              fill
                              sizes={isActive ? "185px" : "128px"}
                              className="object-cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: building image only */}
        <div className="relative order-1 overflow-hidden bg-[#061224] lg:order-2 min-h-[520px] lg:min-h-[660px]">
          {IMAGES.map((src, idx) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeIndex === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt="BlueChip building"
                fill
                priority={idx === 0}
                sizes="(min-width:1024px) 60vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}