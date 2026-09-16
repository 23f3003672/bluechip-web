"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { MockFaq } from "@/lib/mock-data";

interface FaqAccordionProps {
  faqs: MockFaq[];
}

/**
 * Client component — required because the accordion tracks open state.
 * Receives pre-fetched FAQ data from the Server Component parent.
 * Swap `MockFaq` for the Supabase `FAQ` type when migrating.
 */
export function FaqAccordion({ faqs }: FaqAccordionProps) {
  if (faqs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center text-slate-500">
        Nothing added here yet.
      </div>
    );
  }

  return (
    <Accordion className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-b border-border px-0">
          <AccordionTrigger className="py-5 text-left text-lg font-normal leading-tight text-foreground hover:no-underline md:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="max-w-3xl pb-5 text-base leading-relaxed text-foreground/90 md:text-lg">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
