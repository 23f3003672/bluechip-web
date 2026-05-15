import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_PHONE } from "@/lib/constants";

/**
 * Homepage CTA banner.
 *
 * Uses the brand primary blue as the background — the only time it
 * dominates the full width of the page. Kept typographically simple:
 * a strong headline, one line of supporting copy, two actions.
 *
 * The dot-grid pattern (same as Hero) creates visual coherence across
 * the page without requiring a design asset.
 */
export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden bg-primary"
      style={{
        backgroundImage:
          "radial-gradient(oklch(1 0 0 / 0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Subtle top edge fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <Container>
        <div className="flex flex-col items-center gap-6 py-20 text-center md:py-24">

          {/* Headline */}
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Build Something Exceptional?
          </h2>

          {/* Sub-copy */}
          <p className="max-w-xl text-lg leading-relaxed text-white/65">
            Partner with a team that brings precision, reliability, and
            25 years of infrastructure expertise to every project.
          </p>

          {/* Actions */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-7 text-sm font-semibold text-primary transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Start a Conversation
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-7 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              View Our Work
            </Link>
          </div>

          {/* Phone nudge */}
          <p className="mt-2 flex items-center gap-2 text-sm text-white/45">
            <Phone className="size-3.5" />
            Or call us directly at{" "}
            <a
              href={`tel:${SITE_PHONE.replace(/\s/g, "")}`}
              className="text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              {SITE_PHONE}
            </a>
          </p>

        </div>
      </Container>
    </section>
  );
}
