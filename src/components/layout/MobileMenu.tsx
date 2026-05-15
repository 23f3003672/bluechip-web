"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import { SITE_NAME, PUBLIC_NAV_LINKS } from "@/lib/constants";

/**
 * Mobile hamburger + slide-in drawer.
 * Client component — owns the open/close state.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground/70 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </SheetTrigger>

      <SheetContent side="right" className="w-72 px-6 pt-8">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-base font-semibold text-foreground">
            {SITE_NAME}
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile navigation">
          <NavLinks
            links={PUBLIC_NAV_LINKS}
            mobile
            onNavigate={() => setOpen(false)}
          />
        </nav>

        <div className="mt-8 border-t border-border pt-6">
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Get in Touch
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
