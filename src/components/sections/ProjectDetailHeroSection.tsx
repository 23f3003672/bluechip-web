import Link from "next/link";
import type { JourneyProject } from "@/lib/mock-data";
import { ProjectHeroSlider } from "./ProjectHeroSlider";

interface ProjectDetailHeroSectionProps {
  project: JourneyProject;
}

export function ProjectDetailHeroSection({
  project,
}: ProjectDetailHeroSectionProps) {
  const images = Array.from(new Set([project.heroImageUrl, ...(project.gallery || [])])).filter(Boolean);

  return (
    <section
      className="w-full overflow-hidden bg-[#f3f4f7]"
      aria-labelledby="project-detail-title"
    >
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        
        {/* LEFT CONTENT SECTION */}
        <div className="relative flex min-h-screen overflow-hidden bg-[#ececf1] px-8 py-16 md:px-16 lg:px-24">
          
          {/* Bottom Architectural Background Illustration */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[50%] opacity-[0.1]"
            style={{
              backgroundImage: "url('/project-detail-bg.webp')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
              backgroundSize: "90%",
            }}
          />

          {/* Content Wrapper */}
          <div className="relative z-10 flex w-full items-center">
            <div className="max-w-[640px] -mt-16 md:-mt-28">
              
              {/* Year & Location */}
              <p className="text-[12px] font-medium text-[#c9962d] md:text-[18px]">
                {project.locationYear}
              </p>

              {/* Main Heading */}
              <h1
                id="project-detail-title"
                className="mt-6 text-[30px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1d2740] md:text-[35px]"
              >
                {project.title}
              </h1>

              {/* Description */}
              <p className="mt-10 max-w-[580px] text-[16px] leading-[1.8] text-[#222b3d]/90 md:text-[15px]">
                {project.summary}
              </p>

              {/* Bottom Info */}
              <div className="mt-20 grid gap-14 sm:grid-cols-2">
                
                {/* Category */}
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#545454]">
                    Category
                  </p>

                  <Link
  href="/services"
  className="mt-5 inline-flex items-center gap-3 text-[20px] font-medium transition-all duration-300 hover:gap-5"
>
  <span className="bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-transparent">
    {project.category}
  </span>

  <span className="bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-[26px] leading-none text-transparent">
    ›
  </span>
</Link>
                </div>

                {/* Project Type */}
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#545454]">
                    Project Type
                  </p>

                  <Link
  href="/projects"
  className="mt-5 inline-flex items-center gap-3 text-[20px] font-medium transition-all duration-300 hover:gap-5"
>
  <span className="bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-transparent">
    {project.projectType}
  </span>

  <span className="bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-[26px] leading-none text-transparent">
    ›
  </span>
</Link>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative min-h-[500px] overflow-hidden lg:min-h-screen">
          <ProjectHeroSlider images={images} title={project.title} />
        </div>
      </div>
    </section>
  );
}