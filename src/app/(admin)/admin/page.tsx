import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  FolderKanban,
  Image as ImageIcon,
  Award,
  Users,
  Wrench,
  HelpCircle,
  Briefcase,
  Sliders,
  Mail,
  ArrowRight,
  Clock,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    projectsRes,
    mediaRes,
    careersRes,
    inquiriesRes,
    recognitionsRes,
    servicesRes,
    faqsRes,
    visionariesRes,
    recentInquiriesRes,
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("media").select("*", { count: "exact", head: true }),
    supabase.from("careers").select("*", { count: "exact", head: true }),
    supabase.from("contact_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("recognitions").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("visionaries").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_inquiries")
      .select("id, name, email, service, message, created_at")
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  const counts = {
    projects: projectsRes.count ?? 0,
    media: mediaRes.count ?? 0,
    careers: careersRes.count ?? 0,
    inquiries: inquiriesRes.count ?? 0,
    recognitions: recognitionsRes.count ?? 0,
    services: servicesRes.count ?? 0,
    faqs: faqsRes.count ?? 0,
    visionaries: visionariesRes.count ?? 0,
  };

  const recentInquiries = recentInquiriesRes.data ?? [];

  const mainStats = [
    {
      label: "Total Projects",
      value: counts.projects,
      icon: FolderKanban,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      description: "Showcased on website",
    },
    {
      label: "Media Uploads",
      value: counts.media,
      icon: ImageIcon,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      description: "Total images stored",
    },
    {
      label: "Client Inquiries",
      value: counts.inquiries,
      icon: Mail,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      description: "Submitted leads & forms",
    },
    {
      label: "Job Openings",
      value: counts.careers,
      icon: Briefcase,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      description: "Careers page postings",
    },
  ];

  const quickNav = [
    {
      label: "Projects",
      href: "/admin/projects",
      description: "Add, edit, or remove showcase projects",
      count: counts.projects,
      icon: FolderKanban,
    },
    {
      label: "Media Library",
      href: "/admin/media",
      description: "Upload assets & copy image URLs",
      count: counts.media,
      icon: ImageIcon,
    },
    {
      label: "Recognitions",
      href: "/admin/recognitions",
      description: "Manage awards & certifications",
      count: counts.recognitions,
      icon: Award,
    },
    {
      label: "Visionaries",
      href: "/admin/visionaries",
      description: "Update leadership bios and images",
      count: counts.visionaries,
      icon: Users,
    },
    {
      label: "Services",
      href: "/admin/services",
      description: "Edit specialized service cards",
      count: counts.services,
      icon: Wrench,
    },
    {
      label: "FAQ",
      href: "/admin/faq",
      description: "Manage questions and answers",
      count: counts.faqs,
      icon: HelpCircle,
    },
    {
      label: "Careers",
      href: "/admin/careers",
      description: "Manage active job opportunities",
      count: counts.careers,
      icon: Briefcase,
    },
    {
      label: "Inquiries",
      href: "/admin/inquiries",
      description: "View and manage client inquiries & leads",
      count: counts.inquiries,
      icon: Mail,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      description: "Configure contact info & footer detail",
      count: null,
      icon: Sliders,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50/50 via-white to-amber-50/30 p-6 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Welcome back to the Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl">
          Manage all content, media files, job positions, and client responses across the Bluechip Engineering web application.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-border bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-slate-300"
            >
              <div className={`rounded-lg border p-2.5 ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-foreground font-mono">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left Column - Modules Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span>Manage Content Sections</span>
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {quickNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="group">
                  <div className="h-full rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:shadow-md hover:border-[#1a56a8]/50 flex flex-col justify-between cursor-pointer">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-slate-50 p-2 text-[#1a56a8] group-hover:bg-[#1a56a8]/10 group-hover:text-[#1a56a8] transition-colors">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <span className="font-semibold text-foreground group-hover:text-[#1a56a8] transition-colors">
                            {item.label}
                          </span>
                        </div>
                        {item.count !== null && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold font-mono text-slate-600">
                            {item.count} items
                          </span>
                        )}
                      </div>
                      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-[#1a56a8] opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>Open manager</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column - Activity / Inquiries */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Recent Inquiries</h2>
          
          <div className="rounded-xl border border-border bg-white p-5 space-y-4">
            {recentInquiries.length === 0 ? (
              <div className="py-8 text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-slate-300" />
                <p className="mt-2 text-xs font-semibold text-slate-500">No recent inquiries</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Leads from contact form appear here.</p>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-border">
                {recentInquiries.map((inquiry, idx) => (
                  <div key={inquiry.id} className={`${idx > 0 ? "pt-4" : ""} space-y-1.5`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-foreground truncate max-w-[150px]">
                        {inquiry.name}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] text-muted-foreground shrink-0 font-mono">
                        <Clock className="h-2.5 w-2.5" />
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {inquiry.service && (
                      <span className="inline-block rounded bg-blue-50/80 px-1.5 py-0.5 text-[9px] font-medium text-blue-700 font-mono">
                        {inquiry.service}
                      </span>
                    )}
                    <p className="text-[10px] text-muted-foreground line-clamp-2 italic leading-relaxed">
                      &ldquo;{inquiry.message}&rdquo;
                    </p>
                    <p className="text-[9px] text-slate-400 font-mono truncate">{inquiry.email}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 flex gap-2">
              <Link
                href="/admin/inquiries"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer"
              >
                <span>View All Inquiries</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer"
                title="Settings"
              >
                <Sliders className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
