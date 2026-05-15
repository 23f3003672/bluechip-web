import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HOME_SERVICES, type HomeService } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/* ─── Service Card ──────────────────────────────────────────────── */
function ServiceCard({ service }: { service: HomeService }) {
  return (
    <Link
      href="/services"
      className={cn(
        "group flex h-full min-h-[360px] flex-col overflow-hidden border border-[#cfd4dc] bg-white text-center shadow-sm",
        "transition-transform duration-200 hover:-translate-y-1 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      <div className="relative h-[165px] w-full bg-[#e8edf4] p-4">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col items-center justify-start gap-2.5 px-5 py-6">
        <h3 className="text-[22px] font-semibold leading-tight tracking-tight text-primary">
          {service.title}
        </h3>
        <p className="mx-auto max-w-[200px] text-[14px] leading-snug text-foreground/70">
          {service.description}
        </p>
      </div>
    </Link>
  );
}

export function ServicesSection({
  initialServices = HOME_SERVICES,
}: {
  initialServices?: HomeService[];
}) {
  return (
    <section className="bg-[#eff2f7] py-16 md:py-20" aria-labelledby="home-services-title">
      <Container>
        <div className="mb-12 text-center md:mb-14">
          <h2
            id="home-services-title"
            className="text-3xl font-medium tracking-tight text-foreground md:text-4xl"
          >
            What We Do
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {initialServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
