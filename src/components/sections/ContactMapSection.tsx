import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";

export async function ContactMapSection() {
  const settings = await getSiteSettings();

  return (
    <section className="relative" aria-labelledby="home-contact-title">
      <h2 id="home-contact-title" className="sr-only">
        Contact Location
      </h2>

      <div className="relative h-[420px] w-full overflow-hidden md:h-[58vh] md:min-h-[560px]">
        <iframe
          title="Bluechip office map"
          src={settings.contact.map_url}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="pointer-events-none absolute inset-0 bg-[#1f2c4b]/22" aria-hidden="true" />

        <article
          className="absolute left-4 top-5 w-[240px] max-w-[82vw] bg-[#15233f]/95 px-4 py-4 text-white shadow-xl md:left-16 md:top-8 md:w-[330px] md:px-6 md:py-6"
          style={{ color: "#fff" }}
        >
          <h3 className="mb-4 text-2xl font-semibold text-white md:text-[30px]">Contact Us</h3>

          <ul className="space-y-3 text-[12px] leading-relaxed text-white/90 md:text-sm lg:text-[14px]">
            <li className="flex items-start gap-3 text-white">
              <Phone className="mt-1 size-4 shrink-0" />
              <a href={`tel:${settings.contact.phone.replace(/\\s/g, "")}`} className="hover:underline">
                {settings.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white">
              <Mail className="mt-1 size-4 shrink-0" />
              <a href={`mailto:${settings.contact.email}`} className="hover:underline">
                {settings.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 leading-relaxed text-white">
              <MapPin className="mt-1 size-4 shrink-0" />
              <span>{settings.contact.address}</span>
            </li>
          </ul>
        </article>

        <a
          href="#"
          aria-label="Back to top"
          className="absolute bottom-5 right-5 inline-flex size-10 items-center justify-center rounded-full bg-[#15233f] text-white shadow-lg md:size-11" 
        >
          <ArrowUp className="size-4" />
        </a>
      </div>
    </section>
  );
}
