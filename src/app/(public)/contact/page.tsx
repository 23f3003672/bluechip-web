import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactMapSection } from "@/components/sections/ContactMapSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/site-settings";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Bluechip Engineering for project consultations and partnership inquiries.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contact = settings.contact;

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a56a8]/5 via-[#f8fafc] to-white py-20 md:py-32">
        {/* Subtle grid pattern background */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#1a56a8 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        
        {/* Abstract design elements */}
        <div className="absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-linear-to-tr from-[#1a56a8]/10 to-amber-500/10 blur-3xl" />
        <div className="absolute left-10 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#1a56a8]/5 blur-2xl" />

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1a56a8]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a56a8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1a56a8] animate-pulse" />
              Get in Touch
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#1f2a44] sm:text-5xl md:text-7xl">
              Let’s Build Something <br />
              <span className="bg-gradient-to-r from-[#1a56a8] to-amber-600 bg-clip-text text-transparent">
                Exceptional Together
              </span>
            </h1>

            <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-[#1a56a8] to-amber-500" />

            <p className="mt-8 max-w-2xl text-lg leading-[1.8] text-[#4f5a70] md:text-xl">
              Reach out to Bluechip Engineering for civil, mechanical,
              façade, and EPC project consultations. Our team is ready to
              discuss your vision and deliver engineering excellence.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-white pb-20 md:pb-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            
            {/* LEFT INFO PANEL */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-[#1f2a44] p-8 text-white md:p-12 shadow-xl border border-slate-800">
              {/* Overlay glow */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1a56a8]/25 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#c3912e]/10 blur-3xl" />

              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c3912e]">
                  Bluechip Engineering & Technologies
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-[42px] text-white tracking-tight">
                  Start Your Next Project With Confidence
                </h2>

                <p className="mt-6 max-w-md text-sm leading-[1.8] text-slate-300">
                  Whether you are planning a commercial building,
                  industrial facility, or EPC project, our team is here
                  to provide reliable engineering solutions tailored to
                  your requirements.
                </p>
              </div>

              {/* Interactive Info Channels */}
              <div className="relative z-10 mt-12 space-y-6 md:space-y-8">
                
                {/* Phone Card */}
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-5 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 transition-all duration-300 hover:bg-slate-800/80 hover:border-amber-500/50 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 transition-all group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-[#1f2a44]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Call Us Directly
                    </span>
                    <span className="mt-1 block text-lg font-bold text-white transition-colors group-hover:text-amber-500 md:text-xl">
                      {contact.phone}
                    </span>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-5 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 transition-all duration-300 hover:bg-slate-800/80 hover:border-[#1a56a8]/50 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 transition-all group-hover:scale-110 group-hover:bg-[#1a56a8] group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Email Inquiries
                    </span>
                    <span className="mt-1 block text-lg font-bold text-white transition-colors group-hover:text-blue-300 md:text-xl truncate max-w-[200px] sm:max-w-xs md:max-w-none">
                      {contact.email}
                    </span>
                  </div>
                </a>

                {/* Office Location Card */}
                <div className="group flex items-start gap-5 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 transition-all duration-300 hover:bg-slate-800/80">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-500/10 text-slate-300 border border-slate-500/20 transition-all group-hover:scale-110">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Headquarters
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                      {contact.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Trust Details */}
              <div className="relative z-10 mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-slate-400 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#c3912e]" />
                  <span>Mon - Sat: 9 AM - 6 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>ISO 9001 Certified</span>
                </div>
              </div>
            </div>

            {/* FORM PANEL */}
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* MAP SECTION */}
      <ContactMapSection />
    </>
  );
}