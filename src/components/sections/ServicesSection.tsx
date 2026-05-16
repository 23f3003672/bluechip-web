import Link from "next/link";
import Image from "next/image";
import { HOME_SERVICES, type HomeService } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/* ─── Service Links ──────────────────────────────────────────────── */
const serviceLinks: Record<string, string> = {
  EPC: "/projects/subcategory/epc",
  "Civil Construction": "/projects/subcategory/civil-construction",
  "Mechanical Works": "/projects/subcategory/mechanical-works",
  "Facade Engineering": "/projects/subcategory/facade-engineering",
};

/* ─── Service Card ──────────────────────────────────────────────── */
function ServiceCard({ service }: { service: HomeService }) {
  return (
    <Link
      href={serviceLinks[service.title] || "/services"}
      className={cn(
        "group flex h-[240px] w-full max-w-[240px] flex-col items-center justify-center",
        "border-3 border-[#c8ced8] bg-[#f5f8ff]",
        "px-8 py-8 text-center",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#aeb6c4]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {/* Icon */}
      <div className="relative mb-7 h-[82px] w-[82px]">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="82px"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center">
        <h3 className="max-w-[240px] text-[18px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#0b5db3]">
          {service.title}
        </h3>

        <p className="mt-3 max-w-[220px] text-[14px] leading-[1.7] text-[#5f6673]">
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
    <section
      className="bg-[#f5f8ff] py-14 md:py-16"
      aria-labelledby="home-services-title"
    >
      {/* Full Width Container */}
      <div className="mx-auto w-full max-w-[1700px] px-8 md:px-14">
        
        {/* Heading */}
        <div className="mb-10 text-center md:mb-12">
          <h2
            id="home-services-title"
            className="text-[30px] font-normal tracking-[-0.04em] text-[#1f2740] md:text-[42px]"
          >
            What We Do
          </h2>
        </div>

        {/* Cards */}
<div className="mx-auto grid max-w-[1150px] gap-2 sm:grid-cols-2 lg:grid-cols-4">
  {initialServices.map((service) => (
    <ServiceCard key={service.id} service={service} />
  ))}
</div>
      </div>
    </section>
  );
}