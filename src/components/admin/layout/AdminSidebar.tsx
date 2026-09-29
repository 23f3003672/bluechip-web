"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "./admin-nav";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Image,
  Award,
  Users,
  Wrench,
  HelpCircle,
  Briefcase,
  Settings,
  Mail,
  Sparkles,
  Sliders,
} from "lucide-react";

const NAV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Dashboard: LayoutDashboard,
  Projects: FolderKanban,
  "Hero Slides": Sliders,
  "B'CHIP Insiders": Sparkles,
  Media: Image,
  Recognitions: Award,
  Visionaries: Users,
  Services: Wrench,
  FAQ: HelpCircle,
  Careers: Briefcase,
  Inquiries: Mail,
  Settings: Settings,
};

interface AdminSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function AdminSidebar({ className, onNavigate }: AdminSidebarProps = {}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "border-r border-border bg-white flex flex-col w-60 shrink-0 h-screen sticky top-0 overflow-y-auto z-20 select-none",
        className
      )}
    >
      <div className="border-b border-border px-5 py-4 shrink-0 sticky top-0 bg-white z-10">
        <Link href="/admin" onClick={onNavigate} className="flex items-center gap-3 group">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-md border border-border/70 bg-white p-1 shadow-2xs transition-transform duration-200 group-hover:scale-105">
            <NextImage
              src="/Bluechip-Logo.webp"
              alt="Bluechip Engineering Logo"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#1a56a8] animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a56a8]">
                Bluechip
              </p>
            </div>
            <p className="text-sm font-semibold tracking-tight text-foreground truncate">
              Admin Portal
            </p>
          </div>
        </Link>
      </div>

      <nav aria-label="Admin navigation" className="flex-1 space-y-1.5 px-4 py-6">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          const Icon = NAV_ICONS[item.label] || Settings;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-[#1a56a8] text-white shadow-md shadow-blue-500/10"
                  : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-transform duration-200 group-hover:scale-105",
                  isActive ? "text-white" : "text-muted-foreground/70"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border bg-slate-50 shrink-0 sticky bottom-0">
        <p className="text-[10px] text-muted-foreground text-center font-mono">
          v1.0.0 • Connected
        </p>
      </div>
    </aside>
  );
}
