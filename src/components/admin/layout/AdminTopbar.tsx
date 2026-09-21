"use client";

import { useState } from "react";
import { AdminSignOutButton } from "./AdminSignOutButton";
import { AdminSidebar } from "./AdminSidebar";
import { Menu, X } from "lucide-react";

interface AdminTopbarProps {
  email: string;
}

export function AdminTopbar({ email }: AdminTopbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-slate-100 hover:text-foreground lg:hidden cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <p className="text-sm font-semibold text-foreground">Admin Panel</p>
            <p className="text-xs text-muted-foreground">Manage website content</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="hidden text-sm text-muted-foreground md:block">{email}</p>
          <AdminSignOutButton />
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex w-64 max-w-xs flex-col bg-white shadow-xl z-50">
            <div className="absolute top-4 right-3 z-30">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <AdminSidebar
              className="w-full h-full border-r-0"
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
