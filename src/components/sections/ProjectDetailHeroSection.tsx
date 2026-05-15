import Link from "next/link";
import type { JourneyProject } from "@/lib/mock-data";

interface ProjectDetailHeroSectionProps {
  project: JourneyProject;
}

export function ProjectDetailHeroSection({
  project,
}: ProjectDetailHeroSectionProps) {
  return (
    <section
      className="w-full bg-[#f3f4f7]"
      aria-labelledby="project-detail-title"
    >
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        
        {/* LEFT CONTENT */}
        <div className="relative flex items-center overflow-hidden px-8 py-16 md:px-16 lg:px-24">
          
          {/* Background Illustration */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          />

          <div className="relative z-10 max-w-[640px]">
            
            {/* Year */}
            <p className="text-[16px] font-medium text-[#c3912e] md:text-[24px]">
              {project.locationYear}
            </p>

            {/* Heading */}
            <h1
              id="project-detail-title"
              className="mt-5 text-[438px] font-semibold leading-[0.95] tracking-[-0.04em] text-[#1d2740] md:text-[50px]"
            >
              {project.title}
            </h1>

            {/* Small Divider */}
            <div className="mt-10 h-[1px] w-10 bg-[#b9bec9]" />

            {/* Description */}
            <p className="mt-10 max-w-[560px] text-[18px] leading-[1.6] text-[#30384b]/90">
              {project.summary}
            </p>

            {/* Bottom Info */}
            <div className="mt-20 grid gap-14 sm:grid-cols-2">
              
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#767e8d]">
                  Category
                </p>

                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-3 text-[20px] font-medium text-primary transition-all duration-300 hover:gap-5"
                >
                  {project.category}
                  <span>›</span>
                </Link>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#767e8d]">
                  Project Type
                </p>

                <Link
                  href="/projects"
                  className="mt-5 inline-flex items-center gap-3 text-[20px] font-medium text-primary transition-all duration-300 hover:gap-5"
                >
                  {project.projectType}
                  <span>›</span>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative min-h-[500px] lg:min-h-screen">
          <img
            src={project.heroImageUrl}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}