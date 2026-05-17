"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TRUSTED_BRANDS } from "@/lib/mock-data";

export function TrustedLeadersSection() {
  const [startIndex, setStartIndex] = useState(0);

  // Rotate logos every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) =>
        prev + 1 >= TRUSTED_BRANDS.length ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Show only 5 logos at a time
  const visibleBrands = Array.from({ length: 5 }, (_, i) => {
    return TRUSTED_BRANDS[(startIndex + i) % TRUSTED_BRANDS.length];
  });

  return (
    <section
      className="w-full overflow-hidden bg-white py-10 md:py-14"
      aria-labelledby="trusted-leaders-title"
    >
      {/* Full Width */}
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-10 flex items-center gap-6">
          <div
  className="h-[2px] flex-1 bg-[#b4b4b4]"
  aria-hidden="true"
/>

          <h2
  id="trusted-leaders-title"
  className="whitespace-nowrap bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-center text-[28px] font-medium tracking-tight text-transparent md:text-[28px]"
>
  Trusted by Industry Leaders
</h2>

          <div
  className="h-[2px] flex-1 bg-[#b4b4b4]"
  aria-hidden="true"
/>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 items-center sm:grid-cols-3 lg:grid-cols-5">
          {visibleBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="relative flex h-[170px] items-center justify-center px-8 transition-all duration-700"
            >
              {/* Vertical Divider */}
              {index !== 0 && (
                <div className="absolute left-0 top-1/2 hidden h-[52px] w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#dcdcdc] via-[#9d9d9d] to-[#6f6f6f] lg:block" />
              )}

              {brand.imageUrl ? (
                <div className="flex h-[120px] w-full items-center justify-center overflow-hidden">
                  <Image
                    src={brand.imageUrl}
                    alt={brand.name}
                    width={420}
                    height={200}
                    className="h-auto max-h-[70px] w-auto max-w-[200px] object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <span className="text-lg font-semibold text-[#1d2537]">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}