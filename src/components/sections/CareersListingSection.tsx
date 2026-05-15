"use client";

import Link from "next/link";

export function CareersListingSection({
  initialItems = [],
}: {
  initialItems?: any[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#f3f5f9] py-16 md:py-24">
      
      {/* BACKGROUND TEXTURE */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">
        
        {/* HERO */}
        <div className="max-w-5xl">
          
          <p className="text-[24px] font-medium text-[#c3912e] md:text-[30px]">
            Careers
          </p>

          <h1 className="mt-4 text-[54px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#1f2740] md:text-[88px]">
            Build the Future With Bluechip Engineering
          </h1>

          <div className="mt-8 h-[1px] w-16 bg-[#b7becb]" />

          <p className="mt-8 max-w-3xl text-[18px] leading-[1.9] text-[#4f5a70] md:text-[21px]">
            We are constantly looking for passionate engineers,
            innovators, and professionals across civil, mechanical,
            façade, and EPC disciplines to help shape ambitious
            projects and engineering excellence.
          </p>
        </div>

        {/* OPENINGS */}
        <div className="mt-20">
          
          <div className="flex items-end justify-between border-b border-[#dbe2ea] pb-5">
            
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[#7a8496]">
                Open Positions
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-[#1f2740] md:text-4xl">
                Current Opportunities
              </h2>
            </div>

            <p className="hidden text-sm text-[#64748b] md:block">
              {initialItems.length} Open Roles
            </p>
          </div>

          {/* EMPTY STATE */}
          {initialItems.length === 0 ? (
            <div className="mt-10 rounded-[28px] border border-[#dce3ec] bg-white px-10 py-16 text-center shadow-[0_10px_40px_rgba(15,23,42,0.03)]">
              
              <h3 className="text-3xl font-semibold text-[#1f2740]">
                No Openings Currently Available
              </h3>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#5c6678]">
                We are always interested in exceptional talent.
                Feel free to send your profile for future
                opportunities with Bluechip Engineering.
              </p>

              <button className="mt-8 rounded-full bg-[#1f2740] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#c3912e] hover:text-[#1f2740]">
                Send General Application
              </button>
            </div>
          ) : (
            <div className="mt-10 space-y-5">
              
              {initialItems.map((job, index) => (
                <article
                  key={job.id}
                  className="group relative overflow-hidden rounded-[28px] border border-[#dde4ec] bg-white px-8 py-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#c3912e]/40 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:px-10 md:py-10"
                >
                  
                  {/* HOVER ACCENT */}
                  <div className="absolute left-0 top-0 h-full w-[4px] scale-y-0 bg-[#c3912e] transition-transform duration-500 group-hover:scale-y-100" />

                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    
                    {/* LEFT */}
                    <div className="max-w-3xl">
                      
                      {/* META */}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[#7a8496]">
                        
                        <span>{job.department}</span>

                        <span className="h-1 w-1 rounded-full bg-[#94a3b8]" />

                        <span>{job.employment_type}</span>

                        <span className="h-1 w-1 rounded-full bg-[#94a3b8]" />

                        <span>{job.location}</span>
                      </div>

                      {/* TITLE */}
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[#1f2740] transition-colors duration-300 group-hover:text-[#c3912e] md:text-4xl">
                        {job.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="mt-5 max-w-2xl text-[16px] leading-[1.9] text-[#536072] md:text-[17px]">
                        {job.description}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-start gap-5 lg:items-end">
                      
                      {/* EXPERIENCE */}
                      <div className="rounded-full border border-[#d9e1ea] bg-[#f8fafc] px-5 py-2 text-sm font-medium text-[#475569]">
                        {job.experience || "2+ Years Experience"}
                      </div>

                      {/* BUTTON */}
                      <Link
                        href={`/careers/${job.slug}`}
                        className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f2740] transition-all duration-300 hover:gap-5 hover:text-[#c3912e]"
                      >
                        View Position
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-24 rounded-[36px] bg-[#1f2740] px-8 py-14 text-center md:px-14 md:py-20">
          
          <p className="text-sm uppercase tracking-[0.24em] text-[#c3912e]">
            Join Bluechip
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            Create Impact Through Engineering Excellence
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-[1.9] text-white/70">
            Work alongside industry professionals on projects
            that shape infrastructure, innovation, and the future
            of engineering.
          </p>

          <button className="mt-10 rounded-full bg-[#c3912e] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f2740] transition hover:bg-white">
            Explore Careers
          </button>
        </div>
      </div>
    </section>
  );
}