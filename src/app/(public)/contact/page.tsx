import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactMapSection } from "@/components/sections/ContactMapSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Bluechip Engineering for project consultations and partnership inquiries.",
};

export default function ContactPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#f3f5f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Container className="relative z-10 py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#c3912e]">
              Contact Us
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#1f2a44] md:text-7xl">
              Let’s Build Something Exceptional Together
            </h1>

            <div className="mt-8 h-[1px] w-16 bg-[#b7becb]" />

            <p className="mt-8 max-w-2xl text-lg leading-[1.8] text-[#4f5a70] md:text-xl">
              Reach out to Bluechip Engineering for civil, mechanical,
              façade, and EPC project consultations. Our team is ready to
              discuss your vision and deliver engineering excellence.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            
            {/* LEFT INFO PANEL */}
            <div className="flex flex-col justify-between rounded-[32px] bg-[#1f2a44] p-10 text-white md:p-14">
              
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#c3912e]">
                  Bluechip Engineering
                </p>

                <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl text-white">
                  Start Your Next Engineering Project With Confidence
                </h2>

                <p className="mt-8 max-w-md text-base leading-[1.9] text-white/75">
                  Whether you are planning a commercial building,
                  industrial facility, or EPC project, our team is here
                  to provide reliable engineering solutions tailored to
                  your requirements.
                </p>
              </div>

              <div className="mt-14 space-y-10">
                
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c3912e]">
                    Phone
                  </p>

                  <a
                    href="tel:+919999999999"
                    className="mt-3 block text-2xl font-medium transition hover:text-[#c3912e]"
                  >
                    +91 99999 99999
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c3912e]">
                    Email
                  </p>

                  <a
                    href="mailto:info@bluechipengineering.com"
                    className="mt-3 block text-2xl font-medium transition hover:text-[#c3912e]"
                  >
                    info@bluechipengineering.com
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c3912e]">
                    Office
                  </p>

                  <p className="mt-3 text-lg leading-relaxed text-white/80">
                    Bluechip Engineering Pvt. Ltd.
                    <br />
                    Surat, Gujarat, India
                  </p>
                </div>
              </div>
            </div>

            {/* FORM PANEL */}
            <div className="rounded-[32px] border border-[#e2e8f0] bg-[#f8fafc] p-8 md:p-12">
              
              <div className="grid gap-6 md:grid-cols-2">
                
                <div>
                  <label className="text-sm font-medium text-[#2d3748]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="John Doe"
                    className="mt-3 h-14 w-full rounded-2xl border border-[#d8dee9] bg-white px-5 text-[#1f2a44] outline-none transition focus:border-[#c3912e]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#2d3748]">
                    Company Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your Company"
                    className="mt-3 h-14 w-full rounded-2xl border border-[#d8dee9] bg-white px-5 text-[#1f2a44] outline-none transition focus:border-[#c3912e]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#2d3748]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-3 h-14 w-full rounded-2xl border border-[#d8dee9] bg-white px-5 text-[#1f2a44] outline-none transition focus:border-[#c3912e]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#2d3748]">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    className="mt-3 h-14 w-full rounded-2xl border border-[#d8dee9] bg-white px-5 text-[#1f2a44] outline-none transition focus:border-[#c3912e]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#2d3748]">
                    Service Interested In
                  </label>

                  <select className="mt-3 h-14 w-full rounded-2xl border border-[#d8dee9] bg-white px-5 text-[#1f2a44] outline-none transition focus:border-[#c3912e]">
                    <option>Select Service</option>
                    <option>Civil Construction</option>
                    <option>Mechanical</option>
                    <option>Facade Engineering</option>
                    <option>EPC Projects</option>
                    <option>Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#2d3748]">
                    Project Location
                  </label>

                  <input
                    type="text"
                    placeholder="City, State"
                    className="mt-3 h-14 w-full rounded-2xl border border-[#d8dee9] bg-white px-5 text-[#1f2a44] outline-none transition focus:border-[#c3912e]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-[#2d3748]">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Tell us about your project..."
                    className="mt-3 w-full rounded-2xl border border-[#d8dee9] bg-white px-5 py-4 text-[#1f2a44] outline-none transition focus:border-[#c3912e]"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                
                <p className="text-sm text-[#64748b]">
                  We typically respond within 24 hours.
                </p>

                <button className="inline-flex items-center justify-center rounded-full bg-[#1f2a44] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#c3912e] hover:text-[#1f2a44]">
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MAP SECTION */}
      <ContactMapSection />
    </>
  );
}