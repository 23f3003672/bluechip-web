import { Container } from "@/components/layout/Container";
import Image from "next/image";
import { TRUSTED_BRANDS } from "@/lib/mock-data";

export function TrustedLeadersSection() {
  return (
    <section className="bg-white py-8 md:py-10" aria-labelledby="trusted-leaders-title">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-4 md:mb-7 md:gap-6">
            <div className="h-px flex-1 bg-border" aria-hidden="true" />
            <h2
              id="trusted-leaders-title"
              className="text-center text-2xl font-medium tracking-tight text-primary"
            >
              Trusted by Industry Leaders
            </h2>
            <div className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>

          <ul className="grid grid-cols-2 border border-border bg-white sm:grid-cols-3 lg:grid-cols-5">
            {TRUSTED_BRANDS.map((brand) => (
              <li
                key={brand.id}
                className="flex min-h-32 items-center justify-center border-b border-r border-border px-5 py-6 text-center text-sm font-semibold text-foreground/85 sm:text-base lg:border-b-0"
              >
                {brand.imageUrl ? (
                  <Image
                    src={brand.imageUrl}
                    alt={brand.name}
                    width={240}
                    height={96}
                    className="h-16 w-auto max-w-[82%] object-contain sm:h-18 lg:h-20"
                  />
                ) : (
                  brand.name
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
