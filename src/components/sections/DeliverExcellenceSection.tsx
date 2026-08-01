import { CountUp } from "@/components/ui/count-up";

export function DeliverExcellenceSection() {
  const stats = [
    {
      label: "YEARS OF EXPERIENCE",
      value: "20+",
      numericValue: 20,
      suffix: "+",
      id: "experience",
    },
    {
      label: "MAJOR PROJECTS",
      value: "100+",
      numericValue: 100,
      suffix: "+",
      id: "projects",
    },
    {
      label: "NATIONWIDE PRESENCE",
      value: "Pan-India",
      numericValue: null,
      suffix: "",
      id: "presence",
    },
    {
      label: "SKILLED PROFESSIONALS",
      value: "350+",
      numericValue: 350,
      suffix: "+",
      id: "professionals",
    },
  ];

  return (
    <section className="bg-[#f3f7fb] overflow-hidden py-20 md:py-24 lg:py-28">
      {/* TOP CONTENT */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT */}
        <div className="px-8 md:px-14 lg:px-24">
          <h2 className="max-w-[520px] text-[23.4px] font-bold leading-[1.2] tracking-[-0.02em] text-[#1d2537] md:text-[28px] lg:text-[36px]">
            Delivering Excellence
            <br />
            in every project
          </h2>
        </div>

        {/* RIGHT */}
        <div className="flex items-start px-8 pt-6 md:px-14 lg:px-24 lg:pt-4">
          <p className="max-w-[620px] text-[15px] leading-[1.75] text-[#000000] md:text-[17px]">
            A trusted name in EPC, industrial, and infrastructure construction
            with a proven track record of excellence and reliability.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="mt-24 px-8 md:px-14 lg:px-24">
        <div className="grid gap-y-14 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id}>
              
              {/* LABEL */}
              <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#545454]">
                {stat.label}
              </p>

              {/* VALUE */}
              <p
                className="
                  mt-4
                  text-[22px]
                  font-normal
                  leading-none
                  tracking-[-0.04em]
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f]
                  md:text-[42px]
                "
              >
                {stat.numericValue !== null ? (
                  <CountUp end={stat.numericValue} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}