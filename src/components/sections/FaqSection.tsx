import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "./FaqAccordion";
import { MOCK_FAQS, type MockFaq } from "@/lib/mock-data";

/**
 * Server Component — owns data + layout.
 * Delegates the interactive accordion to the FaqAccordion Client Component.
 *
 * Desktop: 2-column split (intro left, accordion right).
 * Mobile: stacked single column.
 */
export function FaqSection({
  initialFaqs = MOCK_FAQS,
}: {
  initialFaqs?: MockFaq[];
}) {
  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="home-faq-title">
      <div className="bg-white px-6 py-8 md:px-12 md:py-12 lg:px-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
          <div className="pt-2">
            <p className="text-lg font-medium text-[#bf8b2a] md:text-xl">FAQ</p>
            <h2
              id="home-faq-title"
              className="mt-4 max-w-sm text-2xl font-semibold leading-tight tracking-tight text-[#1f2a44] md:text-3xl lg:text-[38px]"
            >
              We are here to help you!
            </h2>
            <p className="mt-8 max-w-md text-base text-[#2a2f3a]/85 md:text-lg">
              Clear Answers. Honest Conversations.
            </p>
          </div>

          <div>
            <FaqAccordion faqs={initialFaqs} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-6 pt-7">
          <p className="text-base text-foreground/80 md:text-lg">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#4e74aa] px-8 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#42679b]"
          >
            Contact Us
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
