import React from "react";
import { SITE_NAME, SITE_URL, SITE_ADDRESS } from "@/lib/constants";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "GeneralContractor"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: "Bluechip Technologies & Engineering Pvt. Ltd.",
        alternateName: [
          "Bluechip Techno",
          "Bluechip Engineering",
          "Bluechip Technologies",
          "Bluechip Construction",
        ],
        url: SITE_URL,
        logo: `${SITE_URL}/home/footer/footer-logo.webp`,
        image: `${SITE_URL}/home/footer/footer-logo.webp`,
        description:
          "Established in 1998, Bluechip Engineering & Technologies is an integrated engineering and construction company delivering Civil, Mechanical, Facade, and EPC solutions across industrial and infrastructure sectors in India.",
        foundingDate: "1998",
        telephone: "+91-12345 XXXXX",
        email: "bluechiptech.org",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "7-8 Abhishek Sanghavi Tower No. 5 near Gujarat Gas Circle, Adajan",
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          postalCode: "395009",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 21.192572,
          longitude: 72.799736,
        },
        areaServed: [
          {
            "@type": "Country",
            name: "India",
          },
          {
            "@type": "State",
            name: "Gujarat",
          },
        ],
        knowsAbout: [
          "Civil Construction",
          "Mechanical Works",
          "Facade Engineering",
          "EPC Projects",
          "Water & Solid Waste Management",
          "PEB Structures & Wave Roofs",
          "Precast Wall & Slab Systems",
          "Structural Glazing & Cladding",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: "Bluechip Techno",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
