import Link from "next/link";
import { JOURNEY_MILESTONES } from "@/lib/mock-data";

export function AboutJourneySection() {
  return (
    <section className="bg-[#edf0f6] py-12 md:py-16 lg:py-20" aria-labelledby="about-journey-title">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-0">
          <div className="bg-[#edf0f6] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
            <p className="text-4xl text-[#6c7689] md:text-[40px]">Our Journey &amp; Milestones</p>
            <h2
              id="about-journey-title"
              className="mt-4 text-5xl font-medium tracking-tight text-[#222b40] md:text-6xl"
            >
              Built steadily since 1998.
            </h2>

            <Link
              href="/projects"
              className="mt-10 inline-flex bg-[#4e74aa] px-8 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#43689c]"
            >
              View Our Growth Story
            </Link>

            <div className="mt-[4.5rem] flex items-center justify-between text-3xl font-semibold text-[#cc962f] md:mt-24">
              <span>1998</span>
              <div className="mx-3 h-px flex-1 border-t border-dashed border-[#c8cddb]" />
              <span>Present</span>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {JOURNEY_MILESTONES.map((item) => (
                <li key={item.id}>
                  <div
                    className="aspect-[4/3] border border-border bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                    role="img"
                    aria-label={item.title}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div
            className="min-h-[430px] bg-cover bg-center md:min-h-[620px]"
            style={{
              backgroundImage:
                "url('/home/about/home-about-main.webp')",
            }}
            role="img"
            aria-label="Bluechip building milestone"
          />

      </div>
    </section>
  );
}
