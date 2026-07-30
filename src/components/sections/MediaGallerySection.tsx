"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  MEDIA_GALLERY_ITEMS,
  type MediaGalleryItem,
} from "@/lib/mock-data";

import { Container } from "@/components/layout/Container";

/* -------------------------------------------------------------------------- */
/*                                IMAGE BLOCK                                 */
/* -------------------------------------------------------------------------- */

function ImageBlock({
  imageUrl,
  imageAlt,
  className,
  onClick,
  isActive,
}: {
  imageUrl?: string;
  imageAlt?: string;
  className: string;
  onClick?: () => void;
  isActive?: boolean;
}) {
  if (!imageUrl) return null;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        ${className}
        overflow-hidden
        bg-white
        cursor-pointer
      `}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.02 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        role="img"
        aria-label={imageAlt}
      />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                TEXT BLOCK                                  */
/* -------------------------------------------------------------------------- */

function TextBlock({
  slug,
  title,
  excerpt,
  recordedYear,
  className,
  direction = "right",
}: {
  slug: string;
  title?: string;
  excerpt?: string;
  recordedYear?: number;
  className: string;
  direction?: "left" | "right" | "top" | "bottom";
}) {
  const variants = {
    hidden:
      direction === "left"
        ? {
          rotateY: 90,
          opacity: 0,
        }
        : direction === "right"
          ? {
            rotateY: -90,
            opacity: 0,
          }
          : direction === "bottom"
            ? {
              rotateX: 90,
              opacity: 0,
            }
            : {
              rotateX: -90,
              opacity: 0,
            },

    visible: {
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
    },

    exit:
      direction === "left"
        ? {
          rotateY: 90,
          opacity: 0,
        }
        : direction === "right"
          ? {
            rotateY: -90,
            opacity: 0,
          }
          : direction === "bottom"
            ? {
              rotateX: 90,
              opacity: 0,
            }
            : {
              rotateX: -90,
              opacity: 0,
            },
  };

  const transformOrigin =
    direction === "left"
      ? "right center"
      : direction === "right"
        ? "left center"
        : direction === "bottom"
          ? "top center"
          : "bottom center";

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformOrigin,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <h3 className="text-[13px] font-semibold tracking-[-0.04em] text-[#252f44]">
        {title}
      </h3>

      <p className="mt-4 text-[7px] leading-[1.65] text-[#5b6475]">
        {excerpt}
      </p>

      <div className="mt-5 h-px w-full bg-[#d9dee7]" />

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[7px] text-[#8d96a5]">
          Recd. in {recordedYear}
        </p>

        <Link
          href={`/media/${slug}`}
          className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#252f44] transition-opacity duration-300 hover:opacity-60"
        >
          Explore
        </Link>
      </div>

      <div className="mt-3 h-px w-full bg-[#d9dee7]" />
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export function MediaGallerySection({
  initialItems = MEDIA_GALLERY_ITEMS,
}: {
  initialItems?: MediaGalleryItem[];
}) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const images = initialItems.filter((item) => item.type === "image");
  const texts = initialItems.filter((item) => item.type === "text");

  const toggleCard = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section
      className="w-full overflow-hidden bg-white pb-12 pt-12"
      aria-labelledby="media-gallery-title"
    >
      <Container>
        {/* HEADER */}

        <div className="relative -left-[120px] top-[40px]">
          <p className="text-[22px] font-normal text-[#c9962d]">
            Media
          </p>

          <h1
            id="media-gallery-title"
            className="mt-2 max-w-[950px] text-[25px] font-normal leading-[0.94] tracking-[-0.06em] text-[#1d2537]"
          >
            Our Achievements&apos; Gallery
          </h1>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/*                               CANVAS                               */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="relative mx-auto mt-24 h-[520px] w-full max-w-[1600px]"
          style={{
            perspective: "2200px",
          }}
        >
          {/* ================================================================== */}
          {/* TOP CENTER MEDIUM IMAGE */}
          {/* ================================================================== */}

          <ImageBlock
            imageUrl={images[0]?.imageUrl}
            imageAlt={images[0]?.imageAlt}
            isActive={activeCard === 0}
            onClick={() => toggleCard(0)}
            className="
              absolute
              left-[61%]
              top-[-100px]
              h-[150px]
              w-[170px]
              -translate-x-1/2
              z-20
            "
          />

          <AnimatePresence>
            {activeCard === 0 && (
              <TextBlock
                direction="right"
                slug={texts[0]?.slug ?? ""}
                title={texts[0]?.title}
                excerpt={texts[0]?.excerpt}
                recordedYear={texts[0]?.recordedYear}
                className="
                  absolute
                  left-[calc(61%+100px)]
                  top-[-60px]
                  w-[170px]
                  z-40
                "
              />
            )}
          </AnimatePresence>

          {/* ================================================================== */}
          {/* CENTER LEFT LARGE */}
          {/* ================================================================== */}

          <ImageBlock
            imageUrl={images[1]?.imageUrl}
            imageAlt={images[1]?.imageAlt}
            isActive={activeCard === 1}
            onClick={() => toggleCard(1)}
            className="
              absolute
              left-[29%]
              top-[60px]
              h-[260px]
              w-[240px]
              z-10
            "
          />

          <AnimatePresence>
            {activeCard === 1 && (
              <TextBlock
                direction="top"
                slug={texts[1]?.slug ?? ""}
                title={texts[1]?.title}
                excerpt={texts[1]?.excerpt}
                recordedYear={texts[1]?.recordedYear}
                className="
                  absolute
                  left-[35%]
                  top-[2px]
                  w-[170px]
                  z-40
                "
              />
            )}
          </AnimatePresence>

          {/* ================================================================== */}
          {/* CENTER RIGHT LARGE */}
          {/* ================================================================== */}

          <ImageBlock
            imageUrl={images[2]?.imageUrl}
            imageAlt={images[2]?.imageAlt}
            isActive={activeCard === 2}
            onClick={() => toggleCard(2)}
            className="
              absolute
              right-[24.5%]
              top-[60px]
              h-[260px]
              w-[240px]
              z-20
            "
          />

          <AnimatePresence>
            {activeCard === 2 && (
              <TextBlock
                direction="bottom"
                slug={texts[2]?.slug ?? ""}
                title={texts[2]?.title}
                excerpt={texts[2]?.excerpt}
                recordedYear={texts[2]?.recordedYear}
                className="
                  absolute
                  right-[25%]
                  top-[320px]
                  w-[170px]
                  z-40
                "
              />
            )}
          </AnimatePresence>

          {/* ================================================================== */}
          {/* LEFT TOP SMALL IMAGE */}
          {/* ================================================================== */}

          <ImageBlock
            imageUrl={images[3]?.imageUrl}
            imageAlt={images[3]?.imageAlt}
            isActive={activeCard === 3}
            onClick={() => toggleCard(3)}
            className="
              absolute
              left-[17.6%]
              top-[60px]
              h-[100px]
              w-[110px]
              z-30
            "
          />

          <AnimatePresence>
            {activeCard === 3 && (
              <TextBlock
                direction="left"
                slug={texts[3]?.slug ?? ""}
                title={texts[3]?.title}
                excerpt={texts[3]?.excerpt}
                recordedYear={texts[3]?.recordedYear}
                className="
                  absolute
                  left-[calc(17.6%-190px)]
                  top-[50px]
                  w-[170px]
                  z-40
                "
              />
            )}
          </AnimatePresence>

          {/* ================================================================== */}
          {/* LEFT BOTTOM MEDIUM */}
          {/* ================================================================== */}

          <ImageBlock
            imageUrl={images[4]?.imageUrl}
            imageAlt={images[4]?.imageAlt}
            isActive={activeCard === 4}
            onClick={() => toggleCard(4)}
            className="
              absolute
              left-[12%]
              top-[172px]
              h-[150px]
              w-[170px]
              z-20
            "
          />

          <AnimatePresence>
            {activeCard === 4 && (
              <TextBlock
                direction="left"
                slug={texts[4]?.slug ?? ""}
                title={texts[4]?.title}
                excerpt={texts[4]?.excerpt}
                recordedYear={texts[4]?.recordedYear}
                className="
                  absolute
                  left-[calc(12%-190px)]
                  top-[212px]
                  w-[170px]
                  z-40
                "
              />
            )}
          </AnimatePresence>

          {/* ================================================================== */}
          {/* RIGHT TOP MEDIUM IMAGE */}
          {/* ================================================================== */}

          <ImageBlock
            imageUrl={images[5]?.imageUrl}
            imageAlt={images[5]?.imageAlt}
            isActive={activeCard === 5}
            onClick={() => toggleCard(5)}
            className="
              absolute
              right-[7.5%]
              top-[60px]
              h-[150px]
              w-[170px]
              z-20
            "
          />

          <AnimatePresence>
            {activeCard === 5 && (
              <TextBlock
                direction="right"
                slug={texts[5]?.slug ?? ""}
                title={texts[5]?.title}
                excerpt={texts[5]?.excerpt}
                recordedYear={texts[5]?.recordedYear}
                className="
                  absolute
                  right-[calc(7.5%-190px)]
                  top-[100px]
                  w-[170px]
                  z-40
                "
              />
            )}
          </AnimatePresence>

          {/* ================================================================== */}
          {/* RIGHT BOTTOM SMALL IMAGE */}
          {/* ================================================================== */}

          <ImageBlock
            imageUrl={images[6]?.imageUrl}
            imageAlt={images[6]?.imageAlt}
            isActive={activeCard === 6}
            onClick={() => toggleCard(6)}
            className="
              absolute
              right-[13%]
              top-[220px]
              h-[100px]
              w-[110px]
              z-30
            "
          />

          <AnimatePresence>
            {activeCard === 6 && (
              <TextBlock
                direction="right"
                slug={texts[6]?.slug ?? ""}
                title={texts[6]?.title}
                excerpt={texts[6]?.excerpt}
                recordedYear={texts[6]?.recordedYear}
                className="
                  absolute
                  right-[calc(13%-190px)]
                  top-[210px]
                  w-[170px]
                  z-40
                "
              />
            )}
          </AnimatePresence>

          {/* ================================================================== */}
          {/* BOTTOM CENTER MEDIUM IMAGE */}
          {/* ================================================================== */}

          <ImageBlock
            imageUrl={images[7]?.imageUrl}
            imageAlt={images[7]?.imageAlt}
            isActive={activeCard === 7}
            onClick={() => toggleCard(7)}
            className="
              absolute
              left-[43.5%]
              top-[335px]
              h-[150px]
              w-[170px]
              -translate-x-1/2
              z-10
            "
          />

          <AnimatePresence>
            {activeCard === 7 && (
              <TextBlock
                direction="left"
                slug={texts[7]?.slug ?? ""}
                title={texts[7]?.title}
                excerpt={texts[7]?.excerpt}
                recordedYear={texts[7]?.recordedYear}
                className="
                  absolute
                  left-[calc(43.5%-270px)]
                  top-[375px]
                  w-[170px]
                  z-40
                "
              />
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}