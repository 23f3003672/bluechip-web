import Image from "next/image";

export function AboutIntroSection() {
  return (
    <section
      className="overflow-x-hidden bg-white pt-4 pb-0 md:pt-6 md:pb-0 lg:pt-8 lg:pb-0"
      aria-labelledby="about-us-title"
    >
      <div className="grid w-full grid-cols-1 items-start gap-0 lg:grid-cols-2">

          {/* LEFT: TEXT CONTENT */}
          <div className="px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 ml-10">
            <h2
              id="about-us-title"
              className="max-w-[620px] text-[30px] font-bold leading-[1.35] tracking-[-0.02em] text-[#1c2438] md:text-[30px] lg:text-[38px]"
            >
              More than structures
              <br />
              we build trust.
            </h2>

            {/* Added the missing second half of the paragraph */}
            <p className="mt-12 max-w-[520px] text-[14px] leading-[1.30] tracking-[0.004em] text-[#000000] md:text-[14px] lg:text-[16px]">
              What began as a commitment to honest craftsmanship has grown into a company shaped by responsibility and trust. At BlueChip, every project is guided by precision, accountability, and long-term thinking. We believe infrastructure should serve people, endure time, and reflect integrity. That belief is what drives every build we deliver.
            </p>
          </div>

          {/* RIGHT: RECTANGULAR GRAPHICS */}
          <div className="relative flex justify-center px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-0 -translate-y-[45px]">
            <div className="relative left-[-60px] h-[550px] w-[400px] overflow-visible">

              <div className="absolute inset-0 overflow-hidden">
                <Image
                 src="/about/about-main.webp"
                 alt="About Bluechip"
                 fill
                 priority
                 sizes="(max-width: 768px) 80vw, 440px"
                 className="object-cover scale-x-[0.94] scale-y-[0.81] -translate-x-[50px] translate-y-[0px]"
                />
             </div>

              {/* Dark Overlay - Strict Rectangle extending slightly past the image */}
              <div className="absolute left-[25%] top-[-5%] z-10 h-[113%] w-[76px] bg-[#1d2537]/75" />

              {/* Light Overlay - Strict Rectangle */}
              <div className="absolute left-[46%] top-[-5%] z-10 h-[113%] w-[155px] bg-[#687289]/75" />

              {/* Thin Divider Line */}
              {/* <div className="absolute left-[51%] top-[-5%] z-20 h-[110%] w-[6px] bg-white" /> */}
              

              {/* "about" text */}
              <div className="absolute right-[-80px] top-[51%] z-30 -translate-y-1/2">
                <span className="font-serif text-[40px] font-semibold tracking-wide text-black">
                  about
                </span>
              </div>

              {/* "LUECHIP" in white box overlapping the rectangles */}
              <div className="absolute right-[-120px] top-[55%] z-30">
                <div className="bg-white/80 w-[336px] h-[60px] flex items-center justify-center">
                  <span className="translate-x-[20px] font-serif text-[40px] font-light tracking-[0.2em] text-[#496a9c]">
                    LUECHIP
                  </span>
                </div>
              </div>

            </div>
          </div>
      </div>
    </section>
  );
}