import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/layout/Container";
import { getSiteSettings } from "@/lib/site-settings";
import { JobApplyCard } from "@/components/sections/JobApplyCard";
import {
  Calendar,
  MapPin,
  FileText,
  ArrowLeft,
  Download,
} from "lucide-react";
import Link from "next/link";

interface CareerDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("careers")
    .select("title")
    .eq("slug", decodedSlug)
    .single();

  if (!job) {
    return {
      title: "Position Not Found",
    };
  }

  return {
    title: `${job.title} | Careers`,
    description: `Explore the ${job.title} job opening at Bluechip Engineering & Technologies.`,
  };
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const supabase = await createClient();
  const settings = await getSiteSettings();

  const { data: job } = await supabase
    .from("careers")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!job) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#f8fafc] pb-20 md:pb-28">
      {/* Header / Hero Area */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a56a8]/5 via-[#f8fafc] to-[#f8fafc] pt-12 pb-16">
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#1a56a8 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        <Container className="relative z-10">
          {/* Back button */}
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-[#1a56a8] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Opportunities</span>
          </Link>

          <div className="max-w-4xl">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-md bg-[#1a56a8]/10 px-2.5 py-1 text-xs font-semibold text-[#1a56a8] border border-[#1a56a8]/15">
                {job.department}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-500/15">
                {job.employment_type}
              </span>
            </div>

            {/* Job Title */}
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-[#1f2a44] sm:text-4xl md:text-5xl tracking-tight">
              {job.title}
            </h1>

            {/* Quick Details Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-500 border-t border-slate-200/60 pt-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{job.location || "Remote"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Posted: {job.posted_at ? new Date(job.posted_at).toLocaleDateString() : new Date(job.created_at).toLocaleDateString()}</span>
              </div>
              {job.closing_date && (
                <div className="flex items-center gap-2 text-amber-700 font-medium">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Closing: {new Date(job.closing_date).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Content Area */}
      <Container className="mt-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main details */}
          <div className="space-y-10 rounded-3xl border border-slate-100 bg-white p-6 md:p-10 shadow-xs">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1f2a44] tracking-tight">Position Overview</h2>
              <p className="text-base leading-[1.8] text-slate-600 whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {(job.responsibilities || job.responsibilities_file_url) && (
              <div className="border-t border-slate-100 pt-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-[#1f2a44] tracking-tight">Key Responsibilities</h2>
                  
                  {job.responsibilities_file_url && (
                    <a
                      href={job.responsibilities_file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a56a8] px-3 py-1.5 text-xs font-semibold text-[#1a56a8] bg-white transition hover:bg-[#1a56a8]/5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download PDF Details</span>
                    </a>
                  )}
                </div>

                {job.responsibilities && (
                  <p className="text-sm leading-[1.8] text-slate-600 whitespace-pre-wrap">
                    {job.responsibilities}
                  </p>
                )}
              </div>
            )}

            {/* Qualifications */}
            {(job.qualifications || job.qualifications_file_url) && (
              <div className="border-t border-slate-100 pt-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-[#1f2a44] tracking-tight">Required Qualifications</h2>

                  {job.qualifications_file_url && (
                    <a
                      href={job.qualifications_file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a56a8] px-3 py-1.5 text-xs font-semibold text-[#1a56a8] bg-white transition hover:bg-[#1a56a8]/5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download PDF Details</span>
                    </a>
                  )}
                </div>

                {job.qualifications && (
                  <p className="text-sm leading-[1.8] text-slate-600 whitespace-pre-wrap">
                    {job.qualifications}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar / CTA card */}
          <div className="space-y-6">
            {/* Quick Summary Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs space-y-4.5">
              <h3 className="font-bold text-[#1f2a44] text-base">Job Summary</h3>
              
              <ul className="space-y-3.5 text-xs">
                <li className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium font-mono uppercase">Department</span>
                  <span className="font-semibold text-slate-800 text-right">{job.department}</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium font-mono uppercase">Employment</span>
                  <span className="font-semibold text-slate-800 text-right">{job.employment_type}</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-medium font-mono uppercase">Location</span>
                  <span className="font-semibold text-slate-800 text-right">{job.location || "Remote"}</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-slate-400 font-medium font-mono uppercase">Experience</span>
                  <span className="font-semibold text-slate-800 text-right">{job.experience || "2+ Years"}</span>
                </li>
              </ul>
            </div>

            {/* Application Card Client Component */}
            <JobApplyCard
              jobId={job.id}
              jobTitle={job.title}
              contactPhone={settings.contact.phone}
            />
          </div>
        </div>
      </Container>
    </article>
  );
}
