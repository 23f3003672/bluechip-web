import Image from "next/image";

export function AboutIntroSection() {
  return (
    <section
      className="overflow-x-hidden bg-white py-12 md:py-16 lg:py-20"
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
          <div className="relative flex justify-center px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-0">
            <div className="relative h-[500px] w-[350px] overflow-visible">

              <Image
                src="/about/about-main.webp"
                alt="About Bluechip"
                fill
                className="object-cover object-center"
              />

              {/* Dark Overlay - Strict Rectangle extending slightly past the image */}
              <div className="absolute left-[34%] top-[-5%] z-10 h-[115%] w-[75px] bg-[#5A6372]/90" />

              {/* Light Overlay - Strict Rectangle */}
              <div className="absolute left-[51%] top-[-5%] z-10 h-[115%] w-[140px] bg-[#8B96A8]/70" />

              {/* Thin Divider Line */}
              <div className="absolute left-[51%] top-[-5%] z-20 h-[110%] w-[6px] bg-white" />

              {/* "about" text */}
              <div className="absolute right-[-120px] top-[48%] z-30 -translate-y-1/2">
                <span className="font-serif text-[40px] font-semibold tracking-wide text-black">
                  about
                </span>
              </div>

              {/* "LUECHIP" in white box overlapping the rectangles */}
              <div className="absolute right-[-160px] top-[55%] z-30">
                <div className="bg-white/55 px-6 py-3 shadow-sm">
                  <span className="font-serif text-[42px] font-light tracking-[0.2em] text-[#4B668D]">
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