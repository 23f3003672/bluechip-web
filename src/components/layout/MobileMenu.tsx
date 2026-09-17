"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download, ChevronDown, ChevronUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation menu & slide-in drawer.
 * Dedicated to mobile view (< lg) - desktop view remains untouched.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isProjectsActive =
    pathname.startsWith("/projects") || pathname.startsWith("/project");
  const isInsidersActive = pathname.startsWith("/insiders");

  const [projectsOpen, setProjectsOpen] = useState(false);
  const [insidersOpen, setInsidersOpen] = useState(false);

  // Auto-expand active dropdown when opening mobile menu
  useEffect(() => {
    if (open) {
      if (isProjectsActive) {
        setProjectsOpen(true);
      }
      if (isInsidersActive) {
        setInsidersOpen(true);
      }
    }
  }, [open, isProjectsActive, isInsidersActive]);

  // Reset or close sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground/70 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-80 max-w-[85vw] p-0 flex flex-col h-full bg-white text-foreground"
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 py-6">
          {/* Top Header: Title + Download Brochure button aligned to top right */}
          <SheetHeader className="mb-4 text-left pr-9 pt-1">
            <div className="flex items-center justify-between gap-2.5">
              <SheetTitle className="text-[15px] font-semibold leading-snug text-foreground">
                {SITE_NAME}
              </SheetTitle>
              <a
                href="/brochure.pdf"
                download="Bluechip_Brochure.pdf"
                aria-label="Download Brochure"
                title="Download Brochure"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] border border-[#c9ccd2] bg-[#f1f2f4] text-[#4b515d] transition-colors hover:border-[#1d2537] hover:bg-[#e6e8ec] hover:text-[#1d2537]"
              >
                <Download className="size-4" strokeWidth={1.8} />
              </a>
            </div>
          </SheetHeader>

          {/* Navigation Links */}
          <nav aria-label="Mobile navigation" className="flex-1 mt-2">
            {/* 1. About */}
            <div className="border-b border-border">
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 text-base font-medium transition-colors",
                  pathname === "/about"
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                About
              </Link>
            </div>

            {/* 2. Business */}
            <div className="border-b border-border">
              <Link
                href="/business"
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 text-base font-medium transition-colors",
                  pathname === "/business"
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                Business
              </Link>
            </div>

            {/* 3. Innovation */}
            <div className="border-b border-border">
              <Link
                href="/innovation"
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 text-base font-medium transition-colors",
                  pathname === "/innovation"
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                Innovation
              </Link>
            </div>

            {/* 4. Projects Link & Dropdown */}
            <div className="border-b border-border">
              <div className="flex w-full items-center justify-between">
                <Link
                  href="/projects"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex-1 py-3 text-base font-medium transition-colors",
                    isProjectsActive
                      ? "text-primary font-semibold"
                      : "text-foreground/80 hover:text-primary"
                  )}
                >
                  Projects
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setProjectsOpen((prev) => !prev);
                  }}
                  className="flex size-10 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none transition-colors"
                  aria-label={projectsOpen ? "Collapse Projects menu" : "Expand Projects menu"}
                  aria-expanded={projectsOpen}
                >
                  {projectsOpen ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </button>
              </div>

              {projectsOpen && (
                <div className="pb-3 pt-0.5 pl-3.5 space-y-1 border-l-2 border-primary/20 ml-2 mb-2">
                  <Link
                    href="/projects/sectors"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-1.5 text-[14.5px] transition-colors",
                      pathname === "/projects/sectors" || pathname === "/project/sectors"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Sectors
                  </Link>
                  <Link
                    href="/projects/urban-institutional"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-1.5 text-[14.5px] transition-colors",
                      pathname === "/projects/urban-institutional" ||
                        pathname === "/project/urban-institutional"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Urban &amp; Institutional
                  </Link>
                </div>
              )}
            </div>

            {/* 5. B'CHIP INSIDERS Dropdown */}
            <div className="border-b border-border">
              <button
                type="button"
                onClick={() => setInsidersOpen(!insidersOpen)}
                className={cn(
                  "flex w-full items-center justify-between py-3 text-base font-medium transition-colors text-left",
                  isInsidersActive
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                )}
                aria-expanded={insidersOpen}
              >
                <span>B&apos;CHIP INSIDERS</span>
                {insidersOpen ? (
                  <ChevronUp className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 text-muted-foreground" />
                )}
              </button>

              {insidersOpen && (
                <div className="pb-3 pt-0.5 pl-3.5 space-y-1 border-l-2 border-primary/20 ml-2 mb-2">
                  <Link
                    href="/insiders/the-people"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-1.5 text-[14.5px] transition-colors",
                      pathname === "/insiders/the-people"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    The People
                  </Link>
                  <Link
                    href="/insiders/the-experience"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-1.5 text-[14.5px] transition-colors",
                      pathname === "/insiders/the-experience"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    The Experience
                  </Link>
                </div>
              )}
            </div>

            {/* 6. Recognitions */}
            <div className="border-b border-border">
              <Link
                href="/recognitions"
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 text-base font-medium transition-colors",
                  pathname === "/recognitions"
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                Recognitions
              </Link>
            </div>

            {/* 7. Careers */}
            <div className="border-b border-border">
              <Link
                href="/careers"
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 text-base font-medium transition-colors",
                  pathname === "/careers" || pathname.startsWith("/careers/")
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                Careers
              </Link>
            </div>
          </nav>

          {/* Bottom Action: Get in Touch */}
          <div className="mt-8 border-t border-border pt-6 pb-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
