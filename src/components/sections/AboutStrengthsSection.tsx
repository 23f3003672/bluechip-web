import { ABOUT_STRENGTHS } from "@/lib/mock-data";

export function AboutStrengthsSection() {
  return (
    <section
      className="bg-[#f4f7fe] py-16 md:py-20 lg:py-24"
      aria-labelledby="about-strengths-title"
    >
      <div className="px-6 md:px-12 lg:px-20">

        {/* TOP */}
        <div className="max-w-[620px]">
          <p className="text-[16px] font-normal text-[#c69222] md:text-[18px]">
            Our strengths
          </p>

          <h2
            id="about-strengths-title"
            className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#222b3d] md:text-[36px] lg:text-[44px]"
          >
            Precision.
            Performance.
            <br />
            Partnership.
          </h2>
        </div>

        {/* GRID */}
        <ul className="mt-16 grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-20">

          {ABOUT_STRENGTHS.map((item) => (
            <li
              key={item.id}
              className="border-l border-[#d5d9e1] pl-7"
            >

              {/* NUMBER */}
              <p className="text-[24px] font-normal tracking-[-0.02em] text-[#117ab2]">
                {item.number}
              </p>

              {/* TITLE */}
              <h3 className="mt-4 max-w-[350px] text-[28px] font-normal leading-[1.18] tracking-[-0.03em] text-[#222b3d] md:text-[34px]">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-5 max-w-[320px] text-[20px] leading-[1.7] text-[#545454]">
                {item.description}
              </p>

            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}