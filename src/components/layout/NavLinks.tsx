"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

interface NavLinksProps {
  links: NavLink[];
  /** Rendered in mobile sheet — stacked layout */
  mobile?: boolean;
  onNavigate?: () => void;
}

/**
 * Client component — needed for usePathname (active link highlight).
 * Kept minimal; all layout shell stays in the Server Component Navbar.
 */
export function NavLinks({ links, mobile = false, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "relative text-sm font-medium transition-colors",
              mobile
                ? "block py-3 text-base border-b border-border last:border-0"
                : "py-1",
              isActive
                ? "text-primary"
                : "text-foreground/70 hover:text-[#8f8f8f]"
            )}
          >
            {link.label}
            {/* Active underline — desktop only */}
            {!mobile && isActive && (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </>
  );
}
