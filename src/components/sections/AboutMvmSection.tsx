"use client";

import { useMemo, useState } from "react";
import { Plus, X, MousePointerClick } from "lucide-react";
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
    <section className="bg-[#ffffff] py-12 md:py-16 lg:py-20" aria-labelledby="about-mvm-title">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-0">
          <div className="border-r border-[#e3e5ea] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
            <p className="text-4xl font-medium text-[#c2902a] md:text-3xl">{active.eyebrow}</p>
            <h2
              id="about-mvm-title"
              className="mt-4 max-w-md text-6xl font-bold leading-[1.4] tracking-tight text-[#222b40] md:text-5xl"
            >
              {active.title}
            </h2>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-[#222b3d]/100">
              {active.description}
            </p>
          </div>

          <div className="relative px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
            <div className="absolute left-0 top-0 h-full w-px bg-[#e3e5ea]" />



  <div className="absolute left-0 top-0 z-30 h-full -translate-x-[38%]">

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
          ? "flex w-[160px] items-center gap-2.5 rounded-full bg-[#d4d5d9] px-3 py-1.5 text-xs font-semibold text-[#4a5160]"
          : "flex items-center gap-2.5 text-xs font-semibold text-[#1e2537]/90"
      }
    >
      <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#0057b8] text-white">
        <Plus className="size-3" />
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
          ? "flex w-[160px] items-center gap-2.5 rounded-full bg-[#d4d5d9] px-3 py-1.5 text-xs font-semibold text-[#4a5160]"
          : "flex items-center gap-2.5 text-xs font-semibold text-[#1e2537]/90"
      }
    >
      <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#0057b8] text-white">
        <Plus className="size-3" />
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
          ? "flex w-[160px] items-center gap-2.5 rounded-full bg-[#d4d5d9] px-3 py-1.5 text-xs font-semibold text-[#4a5160]"
          : "flex items-center gap-2.5 text-xs font-semibold text-[#1e2537]/90"
      }
    >
      <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#0057b8] text-white">
        <Plus className="size-3" />
      </span>

      <span>Values</span>
    </button>
  </div>
</div>

 <div className="relative ml-8 -mt-30 h-[520px] max-w-[620px] md:ml-10 md:h-[560px]">

  {/* BACK IMAGE */}
  <button
  type="button"
  onClick={() => setIsSwapped(!isSwapped)}
  className={`
    absolute z-0 bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer hover:opacity-95

    ${active.id === "mission" ? "right-[20px] top-[30px]" : ""}
    ${active.id === "vision" ? "right-[10px] top-[100px]" : ""}
    ${active.id === "values" ? "right-[40px] top-[150px]" : ""}
  `}
  style={{
    backgroundImage: `url(${isSwapped ? active.cardImage : active.secondaryImage})`,
    width: "281px",
    height: "341.5px",
  }}
  aria-label="Swap images"
/>

  {/* FRONT IMAGE */}
  <button
  type="button"
  onClick={() => setIsSwapped(!isSwapped)}
  className={`
    absolute z-10 overflow-hidden shadow-[0_18px_40px_rgba(15,23,42,0.18)]
    transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left

    ${active.id === "mission" ? "bottom-[70px] left-[90px]" : ""}
    ${active.id === "vision" ? "bottom-[-20px] left-[90px]" : ""}
    ${active.id === "values" ? "bottom-[-20px] left-[80px]" : ""}
  `}
  style={{
    width: "289.5px",
  }}
  aria-label="Swap images"
>
  <div
    className="h-[341.5px] bg-cover bg-center"
    style={{ backgroundImage: `url(${isSwapped ? active.secondaryImage : active.cardImage})` }}
    role="img"
    aria-label={isSwapped ? active.secondaryCardTitle : active.cardTitle}
  />

  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm text-white transition-opacity hover:bg-black/70">
    <MousePointerClick className="size-3.5" />
    <span className="text-[10px] font-medium uppercase tracking-wider">Click to Swap</span>
  </div>

  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f172a] via-[#0f172abf] to-transparent p-4 text-white md:p-5">
    <h3 className="text-lg font-semibold leading-tight text-white md:text-xl">
      {isSwapped ? active.secondaryCardTitle : active.cardTitle}
    </h3>

    <p className="mt-1 text-xs leading-relaxed text-white/90 md:text-sm">
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
