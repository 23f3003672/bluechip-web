"use client";

import { useState } from "react";
import Link from "next/link";
import { JobApplicationModal } from "@/components/forms/JobApplicationModal";
import { SiteButton } from "@/components/ui/site-button";
import {
  Briefcase,
  MapPin,
  Building2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Settings,
  Compass,
  CheckCircle,
} from "lucide-react";

interface CareersListingSectionProps {
  initialItems?: any[];
}

export function CareersListingSection({
  initialItems = [],
}: CareersListingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Culture benefits list
  const benefits = [
    {
      icon: Award,
      title: "Engineering Excellence",
      description: "Work on major scale infrastructure projects like bullet train stations, heavy industrial complexes, and utility networks.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "We invest in our people with professional mentoring, structured training, and clear pathways to lead multi-million dollar packages.",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Harm Safety",
      description: "ISO-certified safety protocols are our highest priority. We ensure every site maintains rigorous, uncompromising welfare standards.",
    },
    {
      icon: Settings,
      title: "Technological Edge",
      description: "Leverage advanced steel construction systems, smart modeling workflows, and state-of-the-art EPC execution tools.",
    },
  ];

  return (
    <>
      <div className="bg-[#f8fafc]">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#1a56a8]/5 via-[#f8fafc] to-white py-20 md:py-28">
          <div 
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#1a56a8 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
          <div className="absolute right-0 top-1/4 -z-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#1a56a8]/10 to-amber-500/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1a56a8]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a56a8] mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1a56a8] animate-pulse" />
                Careers at Bluechip
              </span>

              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#1f2a44] sm:text-5xl md:text-7xl">
                Build the Future With <br />
                <span className="bg-gradient-to-r from-[#1a56a8] to-amber-600 bg-clip-text text-transparent">
                  Engineering Excellence
                </span>
              </h1>

              <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-[#1a56a8] to-amber-500" />

              <p className="mt-8 max-w-3xl text-lg leading-[1.8] text-[#4f5a70] md:text-xl">
                We are constantly looking for passionate engineers, innovators, and construction specialists across civil, mechanical, facade, and EPC disciplines to shape ambitious national projects.
              </p>
            </div>
          </div>
        </section>

        {/* WHY JOIN BLUECHIP (Culture Grid) */}
        <section className="bg-white py-16 md:py-24 border-t border-slate-100">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">Why Bluechip</p>
              <h2 className="mt-2 text-3xl font-extrabold text-[#1f2a44] tracking-tight md:text-4xl">
                A Career of Impact, Innovation, and Trust
              </h2>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                As a premier engineering enterprise, we empower our teams to design structures that stand the test of time, backed by modern safety cultures and career growth blueprints.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="group rounded-2xl border border-slate-100 bg-[#f8fafc]/50 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-slate-200/60"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a56a8]/10 text-[#1a56a8] transition-colors group-hover:bg-[#1a56a8] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900 tracking-tight">{benefit.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* JOB OPPORTUNITIES LISTING */}
        <section className="py-16 md:py-24 bg-slate-50/50 border-t border-slate-100">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">
            
            <div className="flex items-end justify-between border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">Active Openings</p>
                <h2 className="mt-2 text-3xl font-extrabold text-[#1f2a44] tracking-tight md:text-4xl">
                  Current Opportunities
                </h2>
              </div>
              <p className="hidden text-sm text-slate-500 font-mono md:block">
                {initialItems.length} Available Roles
              </p>
            </div>

            {/* EMPTY STATE */}
            {initialItems.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 md:p-14 text-center max-w-3xl mx-auto shadow-sm">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100 mb-5">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  No Positions Open Right Now
                </h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
                  We are always interested in connecting with exceptional engineering talent. Submit your resume to our general talent pool and we'll reach out as soon as a suitable opening emerges.
                </p>
                <div className="mt-6">
                  <SiteButton
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="uppercase tracking-wider text-xs font-bold px-8 shadow-md shadow-[#1a56a8]/25"
                  >
                    Send General Application
                  </SiteButton>
                </div>
              </div>
            ) : (
              <div className="mt-10 space-y-6">
                {initialItems.map((job) => (
                  <article
                    key={job.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300 md:p-8"
                  >
                    {/* Left Accent Strip */}
                    <div className="absolute left-0 top-0 h-full w-[4px] bg-[#1a56a8] transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      {/* Left Block */}
                      <div className="max-w-4xl space-y-3">
                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#1a56a8]/10 px-2 py-0.5 text-[10px] font-semibold text-[#1a56a8] border border-[#1a56a8]/15 font-mono">
                            {job.department}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-500/15 font-mono">
                            {job.employment_type}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            {job.location || "Remote"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#1a56a8] transition-colors md:text-2xl">
                          {job.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-slate-500 line-clamp-2 max-w-3xl">
                          {job.description}
                        </p>
                      </div>

                      {/* Right Block */}
                      <div className="flex flex-col items-start gap-4 lg:items-end shrink-0">
                        {/* Experience Tag */}
                        <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold text-slate-600 font-mono">
                          {job.experience || "2+ Years Exp"}
                        </div>

                        {/* View Position Button */}
                        <Link
                          href={`/careers/${job.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a56a8] transition-all group-hover:text-[#1a56a8]/80 group-hover:gap-2.5"
                        >
                          <span>View Position</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* GENERAL APPLICATION SECTION (Redesigned replacement of redundant CTA) */}
        {initialItems.length > 0 && (
          <section className="bg-white py-16 border-t border-slate-100">
            <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">
              <div className="rounded-[32px] bg-[#1f2a44] text-white p-8 md:p-14 relative overflow-hidden shadow-xl border border-slate-800">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1a56a8]/20 blur-3xl" />
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="max-w-3xl space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#c3912e] font-mono">Talent Network</span>
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                      Don’t See Your Ideal Role?
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-300 max-w-2xl">
                      We are always looking for visionary engineers and specialists across civil, mechanical, facade, and EPC disciplines. Join our Talent Pool, submit your credentials, and we will contact you as soon as a role matching your expertise opens.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <SiteButton
                      onClick={() => setIsModalOpen(true)}
                      variant="light"
                      size="xl"
                      className="uppercase tracking-wider text-xs font-bold px-8 shadow-sm cursor-pointer"
                    >
                      Join Talent Pool
                    </SiteButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <JobApplicationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        jobId={null}
        jobTitle={null}
      />
    </>
  );
}