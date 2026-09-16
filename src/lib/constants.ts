import type { NavLink } from "@/types";

/* ─── Site Info ─────────────────────────────────────────────────── */
export const SITE_NAME = "Bluechip Engineering & Technologies";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bluechipengineering.com";
export const SITE_EMAIL = "bluechiptech.org";
export const SITE_PHONE = "+91-12345 XXXXX";
export const SITE_ADDRESS =
  "7-8 Abhishek Sanghavi Tower No. 5 near Gujarat Gas Circle, Adajan, Surat (395009)";

/* ─── Navigation ─────────────────────────────────────────────────── */
export const PUBLIC_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Business", href: "/business" },
  { label: "Projects", href: "/projects" },
  { label: "Recognitions", href: "/recognitions" },
  { label: "Contact", href: "/contact" },
];

export const ADMIN_NAV_LINKS: NavLink[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Services", href: "/admin/services" },
  { label: "Recognitions", href: "/admin/recognitions" },
  { label: "Visionaries", href: "/admin/visionaries" },
  { label: "FAQs", href: "/admin/faq" },
  { label: "Media", href: "/admin/media" },
  { label: "Insiders", href: "/admin/insiders" },
  { label: "Careers", href: "/admin/careers" },
  { label: "Inquiries", href: "/admin/inquiries" },
];

/* ─── Supabase Storage Buckets ───────────────────────────────────── */
export const STORAGE_BUCKETS = {
  projects: "project-images",
  services: "service-images",
  recognitions: "recognition-images",
  visionaries: "visionary-images",
  media: "media",
} as const;

/* ─── Pagination ─────────────────────────────────────────────────── */
export const DEFAULT_PAGE_SIZE = 12;
export const ADMIN_PAGE_SIZE = 20;
