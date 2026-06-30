export interface AdminNavItem {
  label: string;
  href: string;
  description: string;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    description: "Overview and status",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    description: "Project management",
  },
  {
    label: "Media",
    href: "/admin/media",
    description: "Media library",
  },
  {
    label: "Recognitions",
    href: "/admin/recognitions",
    description: "Awards and achievements",
  },
  {
    label: "Visionaries",
    href: "/admin/visionaries",
    description: "Leadership content",
  },
  {
    label: "Services",
    href: "/admin/services",
    description: "Service categories",
  },
  {
    label: "FAQ",
    href: "/admin/faq",
    description: "Frequently asked questions",
  },
  {
    label: "Careers",
    href: "/admin/careers",
    description: "Job postings and hiring",
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    description: "Client contact form submissions",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    description: "Footer and contact settings",
  },
];
