import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/site-settings";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Award, ArrowRight, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries",
  description:
    "Get in touch with Bluechip Engineering & Technologies in Surat, Gujarat. Connect with our engineering and EPC experts for project consultations, tenders, and inquiries.",
  keywords: [
    "Contact Bluechip Engineering",
    "Bluechip office Surat",
    "EPC project inquiry",
    "construction company contact Gujarat",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contact = settings.contact;

  return (
    <>
      {/* UNIFIED CONTACT SECTION */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-20 md:py-32">
        
        {/* Background Watermark Text - scales properly on mobile and desktop */}
        <div className="absolute top-2 sm:top-0 md:-top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 flex justify-center w-full overflow-hidden px-4">
          <span className="text-[15.5vw] sm:text-[12rem] md:text-[16rem] lg:text-[22rem] font-black tracking-tight uppercase leading-none bg-clip-text text-transparent bg-gradient-to-br from-[#1a56a8]/20 to-[#117ab2]/5 whitespace-nowrap">
            CONTACT
          </span>
        </div>

        <Container className="relative z-10 pt-4 sm:pt-10 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 items-start">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col relative z-10 pt-4 sm:pt-8 lg:pt-20 items-center md:items-start text-center md:text-left">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#1f2a44] text-center md:text-left mt-2 md:mt-0">
                Get in touch
              </h1>
              
              <p className="mt-4 md:mt-6 text-base md:text-lg leading-[1.8] text-slate-500 max-w-md text-center md:text-left mx-auto md:mx-0">
                Have questions or ready to transform your upcoming project with Bluechip Engineering? Our team is here to deliver engineering excellence.
              </p>

              {/* Contact Info Stack */}
              <div className="mt-8 md:mt-12 flex flex-col gap-4 w-full text-left">
                
                {/* Email Block */}
                <a
                  href={`mailto:${contact.email.includes('@') ? contact.email : `info@${contact.email}`}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-[#1a56a8]/30"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 transition-colors group-hover:bg-[#1a56a8]/10 group-hover:text-[#1a56a8]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">Email us</span>
                      <span className="mt-1 text-sm text-slate-500">{contact.email}</span>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#1a56a8] group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                </a>

                {/* Phone Block */}
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-[#1a56a8]/30"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 transition-colors group-hover:bg-[#1a56a8]/10 group-hover:text-[#1a56a8]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">Call us</span>
                      <span className="mt-1 text-sm text-slate-500">{contact.phone}</span>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#1a56a8] group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                </a>

                {/* WhatsApp Block */}
                <a
                  href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-[#25D366]/50"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 transition-colors group-hover:bg-[#25D366]/10 group-hover:text-[#25D366]">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">WhatsApp us</span>
                      <span className="mt-1 text-sm text-slate-500">{contact.phone}</span>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                </a>

                {/* Location Block */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-[#1a56a8]/30"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-600 transition-colors group-hover:bg-[#1a56a8]/10 group-hover:text-[#1a56a8]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">Our location</span>
                      <span className="mt-1 text-sm text-slate-500 max-w-[200px] sm:max-w-xs">{contact.address}</span>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#1a56a8] group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                </a>

              </div>
            </div>

            {/* RIGHT COLUMN (FORM) */}
            <div className="relative mt-8 lg:mt-0 z-10">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-10 -z-10 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#117ab2]/5 blur-[100px] pointer-events-none" />
              
              <ContactForm />
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}