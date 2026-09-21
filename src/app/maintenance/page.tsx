import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wrench, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { SITE_NAME, SITE_ADDRESS, SITE_PHONE, SITE_EMAIL } from "@/lib/constants";
import { BypassForm } from "./BypassForm";

export const metadata: Metadata = {
  title: "Under Scheduled Maintenance | Bluechip Engineering & Technologies",
  description:
    "Bluechip Engineering & Technologies is currently undergoing scheduled platform upgrades. We will be back online shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/10 via-primary-600/5 to-transparent blur-3xl opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 w-[500px] h-[400px] bg-gradient-to-t from-primary-900/10 to-transparent blur-3xl opacity-50"
      />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/Bluechip-Logo.webp"
            alt={SITE_NAME}
            width={160}
            height={48}
            className="h-10 w-auto object-contain brightness-110 drop-shadow"
            priority
          />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Maintenance in Progress
        </div>
      </header>

      {/* Main Content Card */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl mx-auto text-center space-y-8">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 text-amber-400 shadow-xl shadow-amber-500/5">
            <Wrench className="w-8 h-8 animate-pulse" />
          </div>

          {/* Heading and Description */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              We&apos;re Upgrading Our Platform
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              Bluechip Engineering &amp; Technologies is currently undergoing scheduled platform
              enhancements to serve our partners and clients better. Both the public portal and
              admin dashboard are temporarily offline.
            </p>
          </div>

          {/* Information Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left pt-2">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-neutral-200">Temporary Downtime</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Systems will automatically be restored as soon as maintenance concludes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-neutral-200">Data &amp; Security</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  All company databases, inquiries, and records remain completely safe and secure.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Contact Options */}
          <div className="pt-6 border-t border-neutral-900 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-4">
              Need Urgent Assistance?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link
                href={`tel:${SITE_PHONE}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{SITE_PHONE}</span>
              </Link>
              <Link
                href={`mailto:${SITE_EMAIL}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{SITE_EMAIL}</span>
              </Link>
            </div>
            <p className="text-xs text-neutral-500 mt-4 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-600" />
              <span>{SITE_ADDRESS}</span>
            </p>
          </div>

          {/* Discreet Staff / Admin Bypass Form */}
          <div className="pt-4">
            <BypassForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 text-center border-t border-neutral-900/80">
        <p className="text-xs text-neutral-600">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
