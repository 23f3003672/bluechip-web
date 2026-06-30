import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { getSiteSettings } from "@/lib/site-settings";

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "News & Media", href: "/media" },
  { label: "Careers", href: "/careers" },
  { label: "Recognitions", href: "/recognitions" },
  { label: "Inquiries", href: "/contact" },
];

const BUSINESS_LINKS = [
  { label: "EPC", href: "/projects/subcategory/epc" },
  { label: "Civil Construction", href: "/projects/subcategory/civil-construction" },
  { label: "Mechanical Works", href: "/projects/subcategory/mechanical-works" },
  { label: "Facade Engineering", href: "/projects/subcategory/facade-engineering" },
  { label: "Industrial Construction", href: "/projects/subcategory/industrial-construction" },
  { label: "Piling & Foundations", href: "/projects/subcategory/piling-foundations" },

  { label: "Control Buildings", href: "/projects/subcategory/control-buildings" },
  { label: "ETP/STP", href: "/projects/subcategory/etp-stp" },
  { label: "PEB Structures & Shades", href: "/projects/subcategory/peb-structures-shades" },
  { label: "RCC Flooring", href: "/projects/subcategory/rcc-flooring" },

  { label: "Roads", href: "/projects/subcategory/roads" },
  { label: "Rigid Pavement (DLC, PQC)", href: "/projects/subcategory/rigid-pavement-dlc-pqc" },
  { label: "Flexible Pavement (Bitumen)", href: "/projects/subcategory/flexible-pavement-bitumen" },
  { label: "Drainage Systems", href: "/projects/subcategory/drainage-systems" },
  { label: "Sewage Networks", href: "/projects/subcategory/sewage-networks" },
  { label: "Water Supply Networks", href: "/projects/subcategory/water-supply-networks" },
  { label: "Cable Trenches", href: "/projects/subcategory/cable-trenches" },
];

const PROJECT_LINKS = [
  { label: "Airports", href: "/projects/subcategory/airports" },
  { label: "Power Plants", href: "/projects/subcategory/power-plants" },
  { label: "Oil & Gas", href: "/projects/subcategory/oil-gas" },
  { label: "Steel Plants", href: "/projects/subcategory/steel-plants" },
  { label: "SEZ Infrastructure", href: "/projects/subcategory/sez-infrastructure" },

  { label: "Commercial Buildings", href: "/projects/subcategory/commercial-buildings" },
  { label: "Residential Buildings", href: "/projects/subcategory/residential-buildings" },
  { label: "IT Campuses & Buildings", href: "/projects/subcategory/it-campuses-buildings" },
  { label: "Hospitality", href: "/projects/subcategory/hospitality" },
  { label: "Schools", href: "/projects/subcategory/schools" },
  { label: "Auditoriums", href: "/projects/subcategory/auditoriums" },
  { label: "Statutory Buildings", href: "/projects/subcategory/statutory-buildings" },
];

const INNOVATION_LINKS = [
  { label: "Composite Structures", href: "/projects/subcategory/composite-structures" },
  { label: "Light Gauge Steel Frames", href: "/projects/subcategory/light-gauge-steel-frames" },
  { label: "Precast Wall & Slab Systems", href: "/projects/subcategory/precast-wall-slab-systems" },
  { label: "Self Supporting Roofing", href: "/projects/subcategory/self-supporting-roofing" },
  { label: "Suspended Slab Systems", href: "/projects/subcategory/suspended-slab-systems" },

  { label: "Hybrid Structural Solutions", href: "/projects/subcategory/hybrid-structural-solutions" },
  { label: "Multi-Technology Configurations", href: "/projects/subcategory/multi-technology-configurations" },

  { label: "Optimized Execution Methodologies", href: "/projects/subcategory/optimized-execution-methodologies" },
  { label: "Speed, Safety, and Cost Efficiencies", href: "/projects/subcategory/speed-safety-and-cost-efficiencies" },
];

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-[#222b3d] text-white">
      <div className="mx-auto max-w-[1500px] px-6 pt-14 md:px-10 xl:px-16">

        {/* Main Footer Grid */}
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4 xl:gap-20">

          {/* Company */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c1902f]">
              Company
            </p>

            <ul className="space-y-4 text-[13px] text-white/82">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c1902f]">
              Business
            </p>

            <ul className="space-y-4 text-[13px] text-white/82">
              {BUSINESS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c1902f]">
              Projects
            </p>

            <ul className="space-y-4 text-[13px] text-white/82">
              {PROJECT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Innovations */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c1902f]">
              Innovations
            </p>

            <ul className="space-y-4 text-[13px] text-white/82">
              {INNOVATION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-16 md:h-20 lg:h-24" aria-hidden="true" />

        <Separator className="bg-white/10" />

        {/* Bottom Footer */}
        <div className="grid gap-10 py-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">

          {/* Company Description */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-white/70 md:text-xs">
              © {new Date().getFullYear()} {settings.footer.company_name.toUpperCase()}. {settings.footer.copyright_text.toUpperCase()}
            </p>

            <p className="mt-6 max-w-5xl text-sm leading-[1.9] text-white/72 md:text-[11px]">
              {settings.footer.footer_note || "Established in 1998, Bluechip Engineering & Technologies is an integrated engineering and construction company delivering Civil, Mechanical, Facade, and EPC solutions across industrial and infrastructure sectors."}
            </p>
          </div>

          {/* Branding */}
          <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
            <Image
              src="/home/footer/footer-logo.webp"
              alt={settings.footer.company_name}
              width={160}
              height={160}
              className="h-auto w-[75px] md:w-[80px] lg:translate-x-[-76px]"
              priority={false}
            />

            <div className="flex flex-col gap-[2px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/78 md:text-xs">
                Civil | Mechanical | Facade | EPC
              </p>

              {settings.footer.tagline ? (
                <p className="text-[9px] italic text-white/68 md:text-[10px]">
                  {settings.footer.tagline}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}