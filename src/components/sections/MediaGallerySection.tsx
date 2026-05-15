"use client";

import Link from "next/link";
import { useState } from "react";
import { MEDIA_GALLERY_ITEMS, type MediaGalleryItem } from "@/lib/mock-data";
import { Container } from "@/components/layout/Container";

const collageClasses = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

function MediaTile({
  slug,
  title,
  excerpt,
  recordedYear,
  imageUrl,
  imageAlt,
  index,
}: {
  slug: string;
  title: string;
  excerpt: string;
  recordedYear: number;
  imageUrl: string;
  imageAlt: string;
  index: number;
}) {
  const className = collageClasses[index % collageClasses.length] ?? "col-span-1 row-span-1";

  return (
    <article className={`group relative overflow-hidden ${className}`}>
      <div
        className="h-full min-h-[110px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={imageAlt}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-white opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/85">{excerpt}</p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/80">Recd. in {recordedYear}</p>
        <Link
          href={`/media/${slug}`}
          className="mt-2 inline-flex rounded bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1e283d]"
        >
          Show More
        </Link>
      </div>
    </article>
  );
}

export function MediaGallerySection({
  initialItems = MEDIA_GALLERY_ITEMS,
}: {
  initialItems?: MediaGalleryItem[];
}) {
  const [items] = useState<MediaGalleryItem[]>(initialItems);

  return (
    <section className="bg-[#f3f5f9] pb-16 pt-10 md:pt-14" aria-labelledby="media-gallery-title">
      <Container>
        <p className="text-3xl font-medium text-[#c1902f]">Media</p>
        <h1
          id="media-gallery-title"
          className="mt-2 text-6xl font-medium tracking-tight text-[#252f44] md:text-7xl"
        >
          Our Achievements&apos; Gallery
        </h1>

        <div className="mt-8 grid auto-rows-[90px] grid-cols-6 gap-2 md:mt-10 md:auto-rows-[110px] md:grid-cols-12 md:gap-3">
          {items.map((item, index) => (
            <MediaTile key={item.id} {...item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
