import { ABOUT_STRENGTHS } from "@/lib/mock-data";

export function AboutStrengthsSection() {
  return (
    <section
      className="bg-[#f4f7fe] py-12 md:py-14 lg:py-16"
      aria-labelledby="about-strengths-title"
    >
      <div className="px-6 md:px-12 lg:px-20">

        {/* TOP */}
        <div className="max-w-[620px]">
          <p className="text-[15px] font-normal text-[#c69222] md:text-[17px]">
            Our strengths
          </p>

          <h2
            id="about-strengths-title"
            className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#222b3d] md:text-[34px] lg:text-[40px]"
          >
            Precision.
            Performance.
            <br />
            Partnership.
          </h2>
        </div>

        {/* GRID */}
        <ul className="mt-12 grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-14">

          {ABOUT_STRENGTHS.map((item) => (
            <li
              key={item.id}
              className="border-l border-[#d5d9e1] pl-7"
            >

              {/* NUMBER */}
              <p className="text-[22px] font-normal tracking-[-0.02em] text-[#117ab2]">
                {item.number}
              </p>

              {/* TITLE */}
              <h3 className="mt-2 max-w-[350px] text-[22px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#222b3d] md:text-[26px]">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 max-w-[320px] text-[16px] leading-[1.6] text-[#545454]">
                {item.description}
              </p>

            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}