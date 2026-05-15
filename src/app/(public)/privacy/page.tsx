import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Bluechip Engineering privacy policy.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-[#f7f8fb] py-14 md:py-18">
      <Container>
        <h1 className="text-3xl font-semibold text-[#1f2a44] md:text-4xl">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#44506a] md:text-base">
          <p>
            Bluechip Engineering values your privacy. Information submitted through forms or
            direct contact channels is used only to respond to your inquiries and provide services.
          </p>
          <p>
            We do not sell personal data. Operational data may be processed by trusted service
            providers strictly for website functionality and communication purposes.
          </p>
          <p>
            For privacy-related requests, please contact us via the details listed on the contact
            page.
          </p>
        </div>
      </Container>
    </section>
  );
}
