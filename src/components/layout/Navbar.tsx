"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { NAVBAR_MEGA_MENU, type MegaMenuKey } from "@/lib/project-subcategories";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";

interface PrimaryCategory {
  label: string;
  href: string;
  megaKey?: MegaMenuKey;
}

const UTILITY_LINKS = [
  { label: "CONTACT US", href: "/contact" },
  { label: "NEWS & MEDIA", href: "/media" },
  { label: "CAREERS", href: "/careers" },
  { label: "FAQs", href: "/#home-faq-title" },
];

const PRIMARY_CATEGORIES: PrimaryCategory[] = [
  { label: "ABOUT US", href: "/about" },
  { label: "BUSINESS", href: "/services", megaKey: "business" },
  { label: "PROJECTS", href: "/projects", megaKey: "projects" },
  { label: "INNOVATIONS", href: "/services#innovations", megaKey: "innovations" },
  { label: "RECOGNITIONS", href: "/recognitions" },
  { label: "INQUIRIES", href: "/contact" },
];

export function Navbar() {
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeMegaKey, setActiveMegaKey] = useState<MegaMenuKey>("business");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
        setSearchOpen(false);
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current) {
        return;
      }

      if (!headerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCategoryClick = (megaKey?: MegaMenuKey) => {
    if (!megaKey) {
      return;
    }

    setActiveMegaKey(megaKey);
    setExpanded(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(query)}`);

    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header
      ref={headerRef}
      className="relative sticky top-0 z-50 w-full border-b border-[#d8d9dd] bg-white"
    >
        <div className="mx-auto flex min-h-[84px] w-full items-center justify-between px-8 py-3 xl:px-14 2xl:px-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Bluechip Engineering home"
          >
            <Image
              src="/Bluechip-Logo.webp"
              alt="Bluechip Engineering Logo"
              width={90}
              height={90}
              className="h-[90px] w-[90px] rounded-sm object-cover"
              priority
            />
            <span className="hidden sm:block">
              <span className="block text-[15px] font-bold uppercase leading-none tracking-tight bg-gradient-to-r from-[#0d5f8c] via-[#117ab2] to-[#0d5f8c] bg-clip-text text-transparent md:text-[18px]">
                CIVIL | MECHANICAL | FACADE | EPC
              </span>
              <span className="mt-1 block text-[12px] italic leading-none text-[#62656b] md:text-[12px]">
                Driven by Innovation, Powered by Technology
              </span>
            </span>
          </Link>

          {/* Utility Nav & Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Utility Links */}
            <nav aria-label="Utility navigation" className="hidden items-center gap-7 md:flex">
              {UTILITY_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[15px] font-medium uppercase tracking-wide text-[#1d2537] transition-all duration-300 hover:text-[#8f8f8f]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Button */}
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="hidden h-7 w-7 items-center justify-center rounded-[5px] border border-[#c9ccd2] bg-[#f1f2f4] text-[#7f838b] transition-colors hover:border-[#1d2537] hover:text-[#1d2537] md:inline-flex"
            >
              <Search className="size-5" />
            </button>

            {/* Separator */}
            <span className="hidden h-9 w-px bg-[#c6c8ce] md:block" aria-hidden="true" />

            {/* Desktop Mega Menu Toggle (desktop only) */}
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              aria-controls="desktop-mega-nav"
              aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
              className="hidden lg:inline-flex h-9 w-9 items-center justify-center text-[#22252b] transition-colors hover:text-[#1d2537]"
            >
              {expanded ? (
                <X className="size-6" strokeWidth={1.8} />
              ) : (
                <Menu className="size-6" strokeWidth={1.8} />
              )}
            </button>

            {/* Mobile hamburger + sheet drawer (mobile only) */}
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      

      {/* Mega Menu */}
      {expanded && (
        <div
          id="desktop-mega-nav"
          className="absolute left-0 top-full z-[55] w-full border-t border-[#e0e2e7] bg-[#f1f2f4] pb-10 shadow-[0_12px_28px_-14px_rgba(16,24,40,0.35)]"
        >
          <Container>
            <nav
              aria-label="Primary navigation"
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-7 text-[14px] font-medium uppercase tracking-[0.01em] text-[#181a1f] lg:text-[15px]"
            >
              {PRIMARY_CATEGORIES.map((category) => {
                const isActive = category.megaKey === activeMegaKey;

                if (category.megaKey) {
                  return (
                    <button
                      key={category.label}
                      type="button"
                      onClick={() => handleCategoryClick(category.megaKey)}
                      aria-expanded={isActive}
                      className={cn(
                          "inline-flex items-center gap-1.5 transition-colors hover:text-[#8f8f8f]",
                          isActive && "text-[#111318]"
                        )}
                    >
                      {category.label}
                      {isActive ? (
                        <ChevronUp className="size-4 text-[#6b6f78]" strokeWidth={1.8} />
                      ) : (
                        <ChevronDown className="size-4 text-[#6b6f78]" strokeWidth={1.8} />
                      )}
                    </button>
                  );
                }

                return (
                  <Link
                    key={category.label}
                    href={category.href}
                    onClick={() => setExpanded(false)}
                      className={cn(
                      "inline-flex items-center gap-1.5 transition-colors hover:text-[#8f8f8f]",
                      isActive && "text-[#111318]"
                    )}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mx-auto mt-8 grid max-w-[860px] gap-10 md:grid-cols-2 lg:grid-cols-3">
              {NAVBAR_MEGA_MENU[activeMegaKey].map((column) => (
                <div key={column.title}>
                  <p className="text-[20px] font-medium text-[#135da9]">{column.title}</p>
                  <ul className="mt-3 space-y-2.5">
                    {column.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/projects/subcategory/${item.slug}`}
                          onClick={() => setExpanded(false)}
                          className="text-[14px] leading-tight text-[#6d727b] transition-colors hover:text-[#8f8f8f]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[59] bg-black/50"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
              <form onSubmit={handleSearch} className="flex items-center gap-4 px-6 py-4">
                <Search className="size-5 shrink-0 text-[#7f838b]" />
                <input
                  type="text"
                  placeholder="Search projects, services, recognitions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-[#c9ccd2]"
                />
                <button
                  type="submit"
                  className="inline-flex h-8 items-center justify-center rounded-md bg-[#0e57a0] px-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0b4681]"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center text-[#7f838b] transition-colors hover:text-[#8f8f8f]"
                  aria-label="Close search"
                >
                  <X className="size-5" />
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
