import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the Bluechip Engineering terms of use.",
};

export default function TermsPage() {
  return (
    <section className="bg-[#f7f8fb] py-14 md:py-18">
      <Container>
        <h1 className="text-3xl font-semibold text-[#1f2a44] md:text-4xl">Terms of Use</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#44506a] md:text-base">
          <p>
            By using this website, you agree to use the content for informational purposes and in
            compliance with applicable laws.
          </p>
          <p>
            All company names, project descriptions, and media are owned by Bluechip Engineering
            or used with permission. Unauthorized reuse may be restricted.
          </p>
          <p>
            We may update these terms periodically. Continued use of the website after updates
            indicates acceptance of revised terms.
          </p>
        </div>
      </Container>
    </section>
  );
}
