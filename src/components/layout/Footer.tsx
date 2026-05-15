import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "./Container";
import { Separator } from "@/components/ui/separator";
import { PUBLIC_NAV_LINKS } from "@/lib/constants";
import { getSiteSettings } from "@/lib/site-settings";

const SERVICES_LINKS = [
  { label: "Civil Engineering", href: "/services" },
  { label: "Structural Works", href: "/services" },
  { label: "Industrial Projects", href: "/services" },
  { label: "Infrastructure", href: "/services" },
];

/**
 * Site-wide footer.
 * Pure Server Component — no interactivity needed.
 *
 * Layout (desktop): 4 columns
 *   1. Brand + tagline
 *   2. Quick links (navigation)
 *   3. Services
 *   4. Contact details
 */
export async function Footer() {
  const settings = await getSiteSettings();
  const siteEmail = settings.contact.email;
  const sitePhone = settings.contact.phone;
  const siteAddress = settings.contact.address;

  return (
    <footer className="bg-[#11151c] text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 lg:px-14 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.95fr_1fr] lg:gap-16">
          

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Company
            </p>
            <ul className="space-y-4 text-sm text-white/80 md:text-base">
              {PUBLIC_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Services
            </p>
            <ul className="space-y-4 text-sm text-white/80 md:text-base">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Contact
            </p>
            <ul className="space-y-4 text-sm text-white/80 md:text-base">
              <li>
                <a href={`mailto:${siteEmail}`} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-[#1d2537]" />
                  <span>{siteEmail}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${sitePhone.replace(/\s/g, "")}`} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-[#1d2537]" />
                  <span>{sitePhone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#1d2537]" />
                <span className="max-w-sm">{siteAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-40 md:h-56 lg:h-64" aria-hidden="true" />

        <Separator className="bg-white/12" />

        <div className="grid gap-8 py-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:py-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              &copy; 2026 BLUECHIP TECHNOLOGIES AND ENGINEERING PVT. LTD. All Rights Reserved.
            </p>
            <p className="mt-6 max-w-5xl text-sm leading-relaxed text-white/72 md:text-[15px]">
              Established in 1998, Bluechip Engineering &amp; Technologies is an integrated engineering and construction company delivering Civil, Mechanical, Facade, and EPC solutions across industrial and infrastructure sectors. Driven by a sustainable vision and a mission to engineer responsible, future-ready infrastructure, we combine technical expertise with innovation, quality, and safety. Our commitment to precision, performance, and long-term value creation enables us to build resilient environments that contribute to sustainable growth and development.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
            <Image
            src="/home/footer/footer-logo.webp"
            alt="Bluechip Technologies and Engineering Pvt. Ltd."
            width={170}
            height={170}
            className="h-auto w-[120px] md:w-[150px] lg:translate-x-[-58px]"
            priority={false}
            />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75 md:text-sm">
              Civil | Mechanical | Facade | EPC
            </p>
            <p className="text-xs italic text-white/70 md:text-sm">
              Driven by Innovation, Powered by Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
