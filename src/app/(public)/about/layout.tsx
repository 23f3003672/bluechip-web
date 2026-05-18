import { AboutPageWrapper } from "@/components/ui/about-page-wrapper";

/**
 * About-page-specific layout.
 * Renders the special B-logo tile-assembly loading animation
 * instead of the generic global loader.
 */
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AboutPageWrapper>{children}</AboutPageWrapper>;
}
