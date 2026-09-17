import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { PageTransitionWrapper } from "@/components/ui/page-transition-wrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bluechip Engineering & Technologies",
    template: "%s | Bluechip Engineering & Technologies",
  },
  description:
    "Bluechip Engineering & Technologies — integrated engineering & construction firm delivering Civil, Mechanical, Facade, and EPC solutions across industrial and infrastructure sectors since 1998.",
  keywords: [
    "Bluechip Engineering",
    "Bluechip Techno",
    "Bluechip Technologies",
    "Bluechip Engineering & Technologies",
    "EPC contractor India",
    "civil construction company Gujarat",
    "civil construction Surat",
    "facade engineering contractor",
    "industrial construction India",
    "PEB structures",
    "precast wall slab systems",
    "water solid waste management",
    "infrastructure solutions India",
  ],
  authors: [{ name: "Bluechip Engineering & Technologies" }],
  creator: "Bluechip Engineering & Technologies",
  publisher: "Bluechip Engineering & Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bluechip Engineering & Technologies",
    title: "Bluechip Engineering & Technologies | Premier EPC, Civil & Facade Solutions",
    description:
      "Integrated engineering and construction company delivering Civil, Mechanical, Facade, and EPC solutions across India since 1998.",
    images: [
      {
        url: "/home/footer/footer-logo.webp",
        width: 800,
        height: 600,
        alt: "Bluechip Engineering & Technologies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluechip Engineering & Technologies | Premier EPC, Civil & Facade Solutions",
    description:
      "Integrated engineering and construction company delivering Civil, Mechanical, Facade, and EPC solutions across India since 1998.",
    images: ["/home/footer/footer-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
