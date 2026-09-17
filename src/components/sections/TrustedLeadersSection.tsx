"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TRUSTED_BRANDS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-8 flex items-center gap-3 sm:mb-10 sm:gap-6">
          <div
            className="h-[1.5px] flex-1 bg-[#b4b4b4] sm:h-[2px]"
            aria-hidden="true"
          />

          <h2
            id="trusted-leaders-title"
            className="whitespace-nowrap bg-gradient-to-r from-[#023d9f] via-[#117ab2] to-[#023d9f] bg-clip-text text-center text-[17px] font-medium tracking-tight text-transparent xs:text-[20px] sm:text-[24px] md:text-[28px]"
          >
            Trusted by Industry Leaders
          </h2>

          <div
            className="h-[1.5px] flex-1 bg-[#b4b4b4] sm:h-[2px]"
            aria-hidden="true"
          />
        </div>

        {/* Logos: On mobile, only 2 logos in a single row slider; on desktop, 5 logos */}
        <div className="grid grid-cols-2 items-center sm:grid-cols-3 lg:grid-cols-5">
          {visibleBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className={cn(
                "relative flex h-[110px] items-center justify-center px-4 transition-all duration-700 sm:h-[140px] sm:px-6 lg:h-[170px] lg:px-8",
                index >= 2 && "hidden sm:flex",
                index >= 3 && "sm:hidden lg:flex"
              )}
            >
              {/* Vertical Divider: on desktop between all, on mobile between the 2 visible logos */}
              {index !== 0 && (
                <div
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#dcdcdc] via-[#9d9d9d] to-[#6f6f6f]",
                    index === 1
                      ? "h-[36px] w-[1.5px] sm:h-[44px] lg:h-[52px] lg:w-[2px]"
                      : "hidden h-[52px] w-[2px] lg:block"
                  )}
                />
              )}

              {brand.imageUrl ? (
                <div className="flex h-[80px] w-full items-center justify-center overflow-hidden sm:h-[100px] lg:h-[120px]">
                  <Image
                    src={brand.imageUrl}
                    alt={brand.name}
                    width={420}
                    height={200}
                    className="h-auto max-h-[48px] w-auto max-w-[140px] object-contain transition-transform duration-500 hover:scale-105 sm:max-h-[60px] sm:max-w-[170px] lg:max-h-[70px] lg:max-w-[200px]"
                  />
                </div>
              ) : (
                <span className="text-sm font-semibold text-[#1d2537] sm:text-base lg:text-lg">
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