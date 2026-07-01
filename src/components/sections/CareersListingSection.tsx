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
      <div className="bg-white">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-slate-50 py-24 md:py-36 text-center flex flex-col items-center">
          
          {/* Decorative Dotted Pattern (Top Left) */}
          <div 
            className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/3 -translate-y-1/4 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#1a56a8 3px, transparent 3px)',
              backgroundSize: '32px 32px',
              maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)'
            }}
          />

          {/* Subtle Right Glow */}
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/3 bg-[#117ab2]/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-[#1f2a44] sm:text-6xl md:text-7xl uppercase">
                Careers
              </h1>

              <h2 className="mt-8 text-3xl font-extrabold tracking-tight text-[#1a56a8] md:text-4xl">
                Join Our Team
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-[1.8] text-slate-500 md:text-lg">
                We are constantly looking for passionate engineers, innovators, and construction specialists across civil, mechanical, facade, and EPC disciplines to shape ambitious national projects.
              </p>
            </div>
          </div>
        </section>

        {/* JOB OPPORTUNITIES LISTING */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16 font-sans">
            
            <div className="flex flex-col items-center text-center pb-10">
              <h2 className="text-3xl font-extrabold text-[#1f2a44] tracking-tight md:text-4xl">
                Current Opportunities
              </h2>
              <p className="mt-3 text-sm text-slate-500 font-mono">
                {initialItems.length} Available Roles
              </p>
            </div>

            {/* EMPTY STATE */}
            {initialItems.length === 0 ? (
              <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-8 md:p-14 text-center max-w-3xl mx-auto shadow-sm">
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
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {initialItems.map((job) => (
                  <Link
                    key={job.id}
                    href={`/careers/${job.slug}`}
                    className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-[#1a56a8]/30 hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-bold text-[#1a56a8] transition-colors mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mb-6">
                      {job.location || "Remote"}
                    </p>
                    
                    <p className="text-sm leading-relaxed text-slate-600 line-clamp-4 flex-grow mb-8">
                      {job.description}
                    </p>
                    
                    <div className="text-xs font-bold uppercase tracking-wider text-[#1a56a8] group-hover:text-[#023d9f] transition-colors mt-auto">
                      JOIN NOW
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* GENERAL APPLICATION SECTION (Redesigned slanted CTA) */}
        {initialItems.length > 0 && (
          <section className="bg-white py-24 pb-32">
            <div className="mx-auto max-w-[1000px] px-6 md:px-10 lg:px-16">
              
              <div className="relative mx-auto mt-12">
                {/* Slanted Background */}
                <div 
                  className="absolute inset-0 bg-[#eff4fa] rounded-[40px] transform -skew-y-3"
                  style={{ transformOrigin: 'center' }}
                />
                
                <div className="relative z-10 flex flex-col items-center text-center p-12 md:p-20">
                  {/* Icon at top, overlapping border slightly like the quote icon in image */}
                  <div className="absolute -top-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a56a8] text-white shadow-xl ring-8 ring-white">
                    <Compass className="h-7 w-7" />
                  </div>
                  
                  <p className="mt-4 text-sm leading-relaxed text-slate-700 max-w-2xl md:text-base md:leading-[1.8]">
                    We are always looking for visionary engineers and specialists across civil, mechanical, facade, and EPC disciplines. Join our Talent Pool, submit your credentials, and we will contact you as soon as a role matching your expertise opens.
                  </p>
                  
                  <div className="mt-10 flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 overflow-hidden">
                       <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Don't see your ideal role?</h4>
                      <p className="text-xs text-slate-500">General Application</p>
                    </div>
                    <SiteButton
                      onClick={() => setIsModalOpen(true)}
                      variant="primary"
                      size="sm"
                      className="mt-4 uppercase tracking-wider text-xs font-bold px-8 shadow-md"
                    >
                      Join Talent Pool
                    </SiteButton>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

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
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:border-slate-300"
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