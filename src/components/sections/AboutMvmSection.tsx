"use client";

import { useMemo, useState } from "react";
import { Plus, MousePointerClick } from "lucide-react";
import { ABOUT_MVM_ITEMS } from "@/lib/mock-data";

export function AboutMvmSection() {
  const [activeId, setActiveId] = useState<(typeof ABOUT_MVM_ITEMS)[number]["id"]>("mission");
  const [isSwapped, setIsSwapped] = useState(false);

  const active = useMemo(
    () => ABOUT_MVM_ITEMS.find((item) => item.id === activeId) ?? ABOUT_MVM_ITEMS[0],
    [activeId]
  );

  const handleSetActive = (id: (typeof ABOUT_MVM_ITEMS)[number]["id"]) => {
    setActiveId(id);
    setIsSwapped(false);
  };

  return (
    <section className="bg-[#ffffff] py-10 md:py-16 lg:py-20" aria-labelledby="about-mvm-title">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-0">
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="border-b md:border-b-0 md:border-r border-[#e3e5ea] px-6 py-8 sm:py-12 md:px-12 md:py-20 lg:px-20 lg:py-24">
          <p className="text-base sm:text-lg font-medium text-[#c2902a] md:text-xl">{active.eyebrow}</p>
          <h2
            id="about-mvm-title"
            className="mt-3 md:mt-4 max-w-md text-3xl font-bold leading-[1.3] tracking-tight text-[#222b40] sm:text-4xl md:text-5xl"
          >
            {active.title}
          </h2>
          <p className="mt-5 md:mt-10 max-w-xl text-base leading-relaxed text-[#222b3d]/100 sm:text-lg">
            {active.description}
          </p>
        </div>

        {/* RIGHT COLUMN: BUTTONS & IMAGES */}
        <div className="relative px-4 sm:px-6 py-8 sm:py-12 md:px-12 md:py-20 lg:px-20 lg:py-24">
          {/* Desktop divider line */}
          <div className="hidden md:block absolute left-0 top-0 h-full w-px bg-[#e3e5ea]" />

          {/* MOBILE BUTTON SWITCHER (md:hidden) - Never jumps or misaligns */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-6 px-1">
            {(["mission", "vision", "values"] as const).map((id) => {
              const isActive = active.id === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSetActive(id)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#d4d5d9] text-[#4a5160] shadow-sm"
                      : "bg-[#f1f2f5] text-[#1e2537]/80 hover:bg-[#e4e7ec]"
                  }`}
                >
                  <span className="inline-flex size-4 sm:size-4.5 items-center justify-center rounded-full bg-[#0057b8] text-white">
                    <Plus className="size-2.5 sm:size-3" />
                  </span>
                  <span className="capitalize">{id}</span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP BUTTONS (hidden md:block) - Preserved 100% identically */}
          <div className="hidden md:block absolute left-0 top-0 z-30 h-full -translate-x-[38%]">
            {/* MISSION */}
            <div
              className={`
                absolute left-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${active.id === "mission" ? "top-2" : "top-14"}
              `}
            >
              <button
                type="button"
                onClick={() => handleSetActive("mission")}
                className={
                  active.id === "mission"
                    ? "flex w-[190px] items-center gap-3 rounded-full bg-[#d4d5d9] px-4 py-2 text-sm font-semibold text-[#4a5160]"
                    : "flex items-center gap-3 text-sm font-semibold text-[#1e2537]/90"
                }
              >
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#0057b8] text-white">
                  <Plus className="size-3.5" />
                </span>
                <span>Mission</span>
              </button>
            </div>

            {/* VISION */}
            <div
              className={`
                absolute left-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  active.id === "mission"
                    ? "top-[500px]"
                    : active.id === "vision"
                    ? "top-[100px]"
                    : "top-[80px]"
                }
              `}
            >
              <button
                type="button"
                onClick={() => handleSetActive("vision")}
                className={
                  active.id === "vision"
                    ? "flex w-[190px] items-center gap-3 rounded-full bg-[#d4d5d9] px-4 py-2 text-sm font-semibold text-[#4a5160]"
                    : "flex items-center gap-3 text-sm font-semibold text-[#1e2537]/90"
                }
              >
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#0057b8] text-white">
                  <Plus className="size-3.5" />
                </span>
                <span>Vision</span>
              </button>
            </div>

            {/* VALUES */}
            <div
              className={`
                absolute left-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  active.id === "values"
                    ? "top-[120px]"
                    : active.id === "vision"
                    ? "top-[580px]"
                    : "top-[550px]"
                }
              `}
            >
              <button
                type="button"
                onClick={() => handleSetActive("values")}
                className={
                  active.id === "values"
                    ? "flex w-[190px] items-center gap-3 rounded-full bg-[#d4d5d9] px-4 py-2 text-sm font-semibold text-[#4a5160]"
                    : "flex items-center gap-3 text-sm font-semibold text-[#1e2537]/90"
                }
              >
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#0057b8] text-white">
                  <Plus className="size-3.5" />
                </span>
                <span>Values</span>
              </button>
            </div>
          </div>

          {/* IMAGE STACK CONTAINER */}
          <div className="relative mx-auto mt-2 h-[310px] sm:h-[370px] w-full max-w-[320px] sm:max-w-[400px] md:ml-10 md:mr-0 md:-mt-30 md:h-[560px] md:max-w-[620px]">
            {/* BACK IMAGE */}
            <button
              type="button"
              onClick={() => setIsSwapped(!isSwapped)}
              className={`
                absolute z-0 bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer hover:opacity-95 rounded-lg md:rounded-none
                w-[180px] h-[230px] sm:w-[220px] sm:h-[280px] md:w-[281px] md:h-[341.5px]

                ${active.id === "mission" ? "right-1 top-2 sm:right-3 sm:top-4 md:right-[20px] md:top-[30px]" : ""}
                ${active.id === "vision" ? "right-0 top-6 sm:right-2 sm:top-8 md:right-[10px] md:top-[100px]" : ""}
                ${active.id === "values" ? "right-2 top-8 sm:right-4 sm:top-12 md:right-[40px] md:top-[150px]" : ""}
              `}
              style={{
                backgroundImage: `url(${isSwapped ? active.cardImage : active.secondaryImage})`,
              }}
              aria-label="Swap images"
            />

            {/* FRONT IMAGE */}
            <button
              type="button"
              onClick={() => setIsSwapped(!isSwapped)}
              className={`
                absolute z-10 overflow-hidden shadow-[0_18px_40px_rgba(15,23,42,0.18)]
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left rounded-lg md:rounded-none
                w-[190px] sm:w-[230px] md:w-[289.5px]

                ${active.id === "mission" ? "left-1 bottom-3 sm:left-3 sm:bottom-6 md:bottom-[70px] md:left-[90px]" : ""}
                ${active.id === "vision" ? "left-1 bottom-0 sm:left-3 sm:bottom-0 md:bottom-[-20px] md:left-[90px]" : ""}
                ${active.id === "values" ? "left-0 bottom-0 sm:left-2 sm:bottom-0 md:bottom-[-20px] md:left-[80px]" : ""}
              `}
              aria-label="Swap images"
            >
              <div
                className="w-full h-[235px] sm:h-[285px] md:h-[341.5px] bg-cover bg-center"
                style={{ backgroundImage: `url(${isSwapped ? active.secondaryImage : active.cardImage})` }}
                role="img"
                aria-label={isSwapped ? active.secondaryCardTitle : active.cardTitle}
              />

              <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center justify-center rounded-full bg-black/50 p-1.5 md:p-2 backdrop-blur-sm text-white transition-opacity hover:bg-black/70">
                <MousePointerClick className="size-3 md:size-4" />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f172a] via-[#0f172abf] to-transparent p-3 sm:p-4 md:p-5 text-white">
                <h3 className="text-xs sm:text-base md:text-xl font-semibold leading-tight text-white">
                  {isSwapped ? active.secondaryCardTitle : active.cardTitle}
                </h3>

                <p className="mt-1 text-[10px] sm:text-xs md:text-sm leading-relaxed text-white/90 line-clamp-2 md:line-clamp-none">
                  {isSwapped ? active.secondaryCardCaption : active.cardCaption}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

