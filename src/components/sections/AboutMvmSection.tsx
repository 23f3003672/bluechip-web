"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { ABOUT_MVM_ITEMS } from "@/lib/mock-data";

export function AboutMvmSection() {
  const [activeId, setActiveId] = useState<(typeof ABOUT_MVM_ITEMS)[number]["id"]>("mission");

  const active = useMemo(
    () => ABOUT_MVM_ITEMS.find((item) => item.id === activeId) ?? ABOUT_MVM_ITEMS[0],
    [activeId]
  );

  return (
    <section className="bg-[#f7f7f8] py-12 md:py-16 lg:py-20" aria-labelledby="about-mvm-title">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-0">
          <div className="border-r border-[#e3e5ea] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
            <p className="text-4xl font-medium text-[#c2902a] md:text-5xl">{active.eyebrow}</p>
            <h2
              id="about-mvm-title"
              className="mt-4 max-w-md text-6xl font-semibold leading-[1.05] tracking-tight text-[#222b40] md:text-7xl"
            >
              {active.title}
            </h2>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-[#2f3748]/90">
              {active.description}
            </p>
          </div>

          <div className="relative px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
            <div className="absolute left-0 top-0 h-full w-px bg-[#e3e5ea]" />

            <div className="absolute left-0 top-7 z-20 flex w-[180px] -translate-x-1/2 flex-col gap-4 md:w-[220px]">
              {ABOUT_MVM_ITEMS.map((item) => {
                const isActive = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-expanded={isActive}
                    className={isActive ? "flex items-center justify-between rounded-full bg-[#d4d5d9] px-4 py-2 text-left text-sm font-semibold text-[#4a5160]" : "flex items-center gap-3 text-left text-sm font-semibold text-[#1e2537]/90"}
                  >
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-white">
                      <Plus className="size-3.5" />
                    </span>
                    <span className="capitalize">{item.id}</span>
                    {isActive ? (
                      <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#bfc1c6] text-[#5a6270]">
                        <X className="size-3" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="relative ml-8 mt-14 h-[420px] max-w-[530px] md:ml-10 md:h-[470px]">
              <div
                className="absolute right-0 top-0 z-0 h-[230px] w-[58%] bg-cover bg-center"
                style={{ backgroundImage: `url(${active.secondaryImage})` }}
                role="img"
                aria-label={`${active.id} secondary visual`}
              />

              <article className="absolute bottom-0 left-0 z-10 w-[66%] overflow-hidden">
                <div
                  className="h-[300px] bg-cover bg-center md:h-[320px]"
                  style={{ backgroundImage: `url(${active.cardImage})` }}
                  role="img"
                  aria-label={active.cardTitle}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f172a] via-[#0f172abf] to-transparent p-4 text-white md:p-5">
                  <h3 className="text-lg font-semibold leading-tight md:text-xl">{active.cardTitle}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/85 md:text-sm">{active.cardCaption}</p>
                </div>
              </article>

              <span className="absolute right-[22%] top-[28%] z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/80 bg-black/20 text-white">
                <span className="h-3 w-3 rounded-full border-2 border-white" />
              </span>
            </div>
        </div>
      </div>
    </section>
  );
}
