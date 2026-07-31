import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import "./globals.css";

/* ─── Font ───────────────────────────────────────────────────────── */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

/* ─── Site-wide Metadata ─────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bluechipengineering.com"
  ),
  title: {
    default: "Bluechip Engineering & Technologies",
    template: "%s | Bluechip Engineering & Technologies",
  },
  description:
    "Bluechip Engineering & Technologies — premium infrastructure solutions delivering precision-engineered projects across civil, structural, and industrial domains.",
  keywords: [
    "infrastructure",
    "engineering",
    "construction",
    "civil engineering",
    "industrial projects",
    "Bluechip Engineering",
  ],
  authors: [{ name: "Bluechip Engineering & Technologies" }],
  creator: "Bluechip Engineering & Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bluechip Engineering & Technologies",
    title: "Bluechip Engineering & Technologies",
    description:
      "Premium infrastructure solutions delivering precision-engineered projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluechip Engineering & Technologies",
    description:
      "Premium infrastructure solutions delivering precision-engineered projects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Bluechip-Logo.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a56a8",
  width: "device-width",
  initialScale: 1,
};

/* ─── Root Layout ────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
