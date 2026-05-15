"use client";

import { useEffect, useMemo, useState, type TouchEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SiteButtonLink } from "@/components/ui/site-button";
import { HERO_SLIDES } from "@/lib/mock-data";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [didSwipe, setDidSwipe] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const activeSlide = useMemo(() => HERO_SLIDES[activeIndex], [activeIndex]);

  useEffect(() => {
    if (isVideoOpen || isHovering || HERO_SLIDES.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [isVideoOpen, isHovering, HERO_SLIDES.length]);

  const openVideo = (index: number) => {
    if (didSwipe) {
      setDidSwipe(false);
      return;
    }

    setActiveIndex(index);
    setIsVideoOpen(true);
  };

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? HERO_SLIDES.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null || touchStartY === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      setDidSwipe(true);
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }

      window.setTimeout(() => setDidSwipe(false), 0);
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#f2f4f8]">
        <div
          className="relative h-[56vh] min-h-[420px] sm:h-[62vh] sm:min-h-[500px] lg:h-[calc(100vh-4rem)] lg:max-h-[680px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeIndex
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={() => openVideo(index)}
                className="relative h-full w-full text-left"
                aria-label={`Open video for ${slide.title}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${slide.imageUrl}')` }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b2b5b]/83 via-[#0b2b5b]/52 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                <Container className="relative z-10 flex h-full items-end pb-14 pt-16 sm:pb-20 sm:pt-20">
                  <div className="max-w-2xl text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/80 sm:text-sm">
                      {slide.eyebrow}
                    </p>
                    <h1 className="mt-2.5 text-2xl font-semibold leading-tight text-white sm:text-[30px] lg:text-[38px]">
                      {slide.title}
                    </h1>
                    <p className="mt-3.5 max-w-xl text-[11px] text-white/85 sm:text-xs lg:text-sm">
                      {slide.location}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <SiteButtonLink
                        href={slide.projectHref}
                        size="md"
                        variant="light"
                        className="h-10 rounded-none border border-white/80 px-4 text-[9px] font-semibold uppercase tracking-[0.08em]"
                        onClick={(event) => event.stopPropagation()}
                      >
                        View Our Projects
                        <ArrowRight className="size-4" />
                      </SiteButtonLink>

                      <Link
                        href={slide.projectHref}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex h-10 items-center gap-2 rounded-none border border-[#f3b246] bg-white px-4 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#1c3767] transition-colors hover:bg-[#fff5df]"
                      >
                        Watch Project Walkthrough
                      </Link>
                    </div>
                  </div>
                </Container>
              </button>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20">
            <Container className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                className="pointer-events-auto inline-flex size-8 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white transition-colors hover:bg-black/55"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="pointer-events-auto inline-flex size-8 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white transition-colors hover:bg-black/55"
                aria-label="Next slide"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </Container>
          </div>

          <div className="absolute inset-x-0 bottom-2 z-20">
            <Container>
              <div className="flex items-center justify-center gap-2 pb-2">
                {HERO_SLIDES.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-7 bg-white"
                        : "w-4 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Container>
          </div>
        </div>
      </section>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-[960px] overflow-hidden border border-border/60 bg-background p-0 sm:max-w-[960px]" showCloseButton>
          <DialogTitle className="sr-only">
            {activeSlide?.title} video walkthrough
          </DialogTitle>
          <div className="relative bg-black pt-[56.25%]">
            {activeSlide && (
              <iframe
                title={`${activeSlide.title} walkthrough video`}
                src={activeSlide.videoEmbedUrl}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                Watch Project Video
              </p>
              <p className="mt-1 text-sm font-medium text-foreground sm:text-base">
                {activeSlide?.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {activeSlide?.location}
              </p>
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-muted"
            >
              Next Video
              <Play className="size-3.5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
