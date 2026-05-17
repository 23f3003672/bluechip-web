import Image from "next/image";

export function JourneyMilestonesSection() {
  return (
    <section className="overflow-hidden bg-white pb-0 pt-12 md:pt-16 lg:pt-20" aria-labelledby="home-about-title">
      <div className="grid w-full grid-cols-1 items-stretch gap-0 lg:grid-cols-2">

        {/* LEFT: dark hero with background image */}
        <div className="relative overflow-hidden bg-[#061224] lg:min-h-[860px]">
          <Image src="/home/about/home-about-main.webp" alt="BlueChip building" fill priority sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[#1d2537]/90" />
          <div className="relative z-10 max-w-[720px] px-6 pt-40 pb-16 md:pt-48 md:pb-24 lg:px-16 lg:pt-[280px]">
            <span className="block text-[#d49a2a] font-medium text-[18px]">About BlueChip</span>

            <h2 id="home-about-title" className="mt-6 text-white text-[34px] font-semibold leading-[1.25] tracking-[-0.02em] md:text-[42px] lg:text-[48px] xl:text-[52px]">
              More than structures
              <br />
              we build trust.
            </h2>

            <p className="mt-14 max-w-[620px] text-[15px] leading-[1.7] text-[rgba(255,255,255,0.9)] md:text-[18px] lg:text-[20px]">
              What began as a commitment to honest craftsmanship has grown into a company shaped by responsibility and trust.
            </p>

            <div className="mt-10">
              <a
  className="inline-block text-[18px] font-normal text-white underline underline-offset-[6px] decoration-[#d49a2a] transition-opacity hover:opacity-80"
  href="/about"
>
                Read our story →
              </a>
            </div>

            <div className="mt-20">
              <a className="inline-block bg-[#4a6fa5] px-6 py-[14px] text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm" href="/projects">
                View our growth story
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: pale timeline panel */}
        <div className="relative z-20">
          <div className="flex min-h-[860px] flex-col justify-end bg-[#f3f7fb] p-8 md:p-10 lg:px-12 lg:pb-20 lg:pt-10">
            <span className="block text-[#9aa3a9] text-[18px]">Our Journey &amp; Milestones</span>

            <h3 className="mt-4 text-[#1f2933] text-[26px] md:text-[34px] lg:text-[36px] font-normal">Built steadily since 1998.</h3>

            {/* timeline row */}
            <div className="mt-10 flex items-center gap-4">
              <div className="text-[#d49a2a] font-bold">Present</div>
              <div className="flex-1 border-t border-dashed border-[#e1d6c9]" />
              <div className="text-[#d49a2a] font-bold">1998</div>
            </div>

            {/* thumbnails */}
<div className="mt-4 flex items-end gap-8 pl-2">  
  {/* FIRST IMAGE */}
<div className="relative z-30 lg:-ml-20 lg:-mb-3">
    <div className="relative h-36 w-36 overflow-hidden border-[6px] border-[#eef2f6] shadow-[0_14px_30px_rgba(15,23,42,0.14)]">
    <Image
      src="/home/about/home-about-1.webp"
      alt="Project 1"
      fill
      sizes="185px"
      className="object-cover"
    />
  </div>
</div>

  {/* SECOND IMAGE */}
  <div className="relative">
    <div className="relative h-32 w-32 overflow-hidden">
      <Image
        src="/home/about/home-about-2.webp"
        alt="Project 2"
        fill
        sizes="128px"
        className="object-cover"
      />
    </div>
  </div>

  {/* THIRD IMAGE */}
  <div className="relative">
    <div className="relative h-32 w-32 overflow-hidden">
      <Image
        src="/home/about/home-about-3.webp"
        alt="Project 3"
        fill
        sizes="128px"
        className="object-cover"
      />
    </div>
  </div>

  {/* FOURTH IMAGE */}
  <div className="relative">
    <div className="relative h-32 w-32 overflow-hidden">
      <Image
        src="/home/about/home-about-4.webp"
        alt="Project 4"
        fill
        sizes="128px"
        className="object-cover"
      />
    </div>
  </div>
  {/* FIFTH IMAGE */}
  <div className="relative">
    <div className="relative h-32 w-32 overflow-hidden">
      <Image
        src="/home/about/home-about-5.webp"
        alt="Project 5"
        fill
        sizes="128px"
        className="object-cover"
      />
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}
