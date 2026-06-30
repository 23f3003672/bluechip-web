"use client";

import Link from "next/link";
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
} from "lucide-react";

const NAV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Dashboard: LayoutDashboard,
  Projects: FolderKanban,
  Media: Image,
  Recognitions: Award,
  Visionaries: Users,
  Services: Wrench,
  FAQ: HelpCircle,
  Careers: Briefcase,
  Inquiries: Mail,
  Settings: Settings,
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-border bg-white flex flex-col h-full">
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#1a56a8] animate-pulse" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a56a8]">
            Bluechip Admin
          </p>
        </div>
        <p className="mt-1 text-sm font-semibold text-foreground/90">Content Management</p>
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
      
      <div className="p-4 border-t border-border bg-slate-50/50">
        <p className="text-[10px] text-muted-foreground text-center font-mono">
          v1.0.0 • Connected
        </p>
      </div>
    </aside>
  );
}
