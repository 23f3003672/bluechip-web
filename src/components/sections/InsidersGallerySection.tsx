"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import type { InsidersItem } from "@/types";
import { X, MapPin, Calendar, ZoomIn } from "lucide-react";

export interface InsidersGroup {
  label: string;
  slug: string;
  items: InsidersItem[];
}

interface InsidersGallerySectionProps {
  title: string;
  description: string;
  groups: InsidersGroup[];
}

export function InsidersGallerySection({
  title,
  description,
  groups,
}: InsidersGallerySectionProps) {
  const [activeModalItem, setActiveModalItem] = useState<InsidersItem | null>(null);

  return (
    <section className="min-h-screen bg-white pb-20">
      {/* HERO SECTION - Matches /projects/sectors exactly */}
      <div className="border-b border-[#d8dbe2] bg-[#eef0f4]">
        <Container className="grid min-h-[240px] grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 md:px-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#c59d4d]">
              B&apos;CHIP INSIDERS
            </p>

            <h1 className="mt-3 max-w-[480px] text-5xl font-semibold leading-[1.05] tracking-tight text-[#1f2a44]">
              {title}
            </h1>
          </div>

          <div className="flex items-center">
            <p className="max-w-[540px] text-base leading-relaxed text-[#5d6472]">
              {description}
            </p>
          </div>
        </Container>
      </div>

      {/* QUICK IN-PAGE SUB-NAV */}
      <div className="sticky top-[84px] z-20 border-b border-[#d8dbe2] bg-[#f7f8fa]/90 backdrop-blur-md">
        <Container className="flex items-center gap-6 overflow-x-auto px-6 py-3.5 md:px-12 scrollbar-none">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8b919d]">
            Sections:
          </span>
          {groups.map((group) => (
            <a
              key={group.slug}
              href={`#${group.slug}`}
              className="text-sm font-medium text-[#1f2a44] transition-colors hover:text-[#0d5f8c] whitespace-nowrap"
            >
              {group.label} ({group.items.length})
            </a>
          ))}
        </Container>
      </div>

      {/* GROUPS / SUBCATEGORIES GRID */}
      <Container className="px-6 pt-12 md:px-10">
        <div className="flex flex-col gap-16">
          {groups.map((group) => (
            <div key={group.slug} id={group.slug} className="scroll-mt-36">
              <div className="mb-6 flex items-baseline justify-between border-b border-[#d8dbe2] pb-3">
                <h2 className="text-3xl font-semibold tracking-tight text-[#1f2a44]">
                  {group.label}
                </h2>
                <span className="text-xs font-medium uppercase tracking-wider text-[#7c8391]">
                  {group.items.length} {group.items.length === 1 ? "Feature" : "Features"}
                </span>
              </div>

              {group.items.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item) => (
                    <InsidersCard
                      key={item.id}
                      item={item}
                      onSelect={() => setActiveModalItem(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-14 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60">
                  <p className="text-sm font-medium text-slate-400">
                    Nothing added here yet.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>

      {/* LIGHTBOX / DETAIL MODAL */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-[#131926] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/90"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={activeModalItem.image_url}
                alt={activeModalItem.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f3d18b]">
                  {groups.find((g) => g.slug === activeModalItem.subcategory)?.label ??
                    activeModalItem.subcategory}
                </span>

                {activeModalItem.location && (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-300">
                    <MapPin className="h-3.5 w-3.5 text-[#f3d18b]" />
                    {activeModalItem.location}
                  </span>
                )}

                {activeModalItem.year && (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-300">
                    <Calendar className="h-3.5 w-3.5 text-[#f3d18b]" />
                    {activeModalItem.year}
                  </span>
                )}
              </div>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                {activeModalItem.title}
              </h3>

              {activeModalItem.description && (
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  {activeModalItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function InsidersCard({
  item,
  onSelect,
}: {
  item: InsidersItem;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="group relative block cursor-pointer overflow-hidden bg-[#dfe3ea] focus:outline-none focus:ring-2 focus:ring-[#0d5f8c]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* IMAGE - Matches aspect-[1/1.08] */}
      <div
        className="aspect-[1/1.08] w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        style={{
          backgroundImage: `url(${item.image_url})`,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-all duration-500 ease-out group-hover:opacity-100" />

      {/* ZOOM ICON BADGE ON HOVER */}
      <div className="absolute right-4 top-4 translate-y-[-10px] rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ZoomIn className="h-4 w-4" />
      </div>

      {/* CONTENT */}
      <div className="absolute inset-x-0 bottom-0 translate-y-6 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center gap-2">
          {item.location && (
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
              {item.location}
            </span>
          )}
          {item.location && item.year && (
            <span className="text-[11px] text-white/40">•</span>
          )}
          {item.year && (
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
              {item.year}
            </span>
          )}
        </div>

        <h3 className="mt-2 text-xl font-medium text-white leading-snug">
          {item.title}
        </h3>

        {item.description && (
          <p className="mt-2 line-clamp-2 text-xs text-gray-300 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
