import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { site } from "@/site";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Steed Art | Interior Design & Renovation in Karachi",
    template: "%s | Steed Art",
  },
  description:
    "Interior design and turnkey renovation in Karachi. Residential and commercial interiors, from planning and civil work to custom joinery, finishes and handover.",
  keywords: [
    "home renovation Karachi",
    "complete home renovation Karachi",
    "house renovation company Karachi",
    "apartment renovation Karachi",
    "interior renovation Karachi",
    "turnkey renovation Karachi",
    "luxury home renovation Karachi",
    "DHA Karachi home renovation",
    "Clifton Karachi home renovation",
  ],
  alternates: {
    canonical: "/",
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
  icons: {
    icon: [
      {
        url: "/steedartlogo.png",
        sizes: "1000x1000",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/steedartlogo.png",
        sizes: "1000x1000",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Steed Art | Interior Design & Renovation in Karachi",
    description:
      "Interior design and turnkey renovation for homes and commercial spaces in Karachi.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/profile/living-dining.webp", width: 1280, height: 960, alt: "Steed Art living and dining interior" }],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steed Art | Interior Design & Renovation in Karachi",
    description:
      "Interior design and turnkey renovation for homes and commercial spaces in Karachi.",
    images: ["/images/profile/living-dining.webp"],
  },
  category: "Home renovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        alternateName: "Steed Art Karachi",
        inLanguage: "en-PK",
        publisher: { "@id": `${site.url}/#business` },
      },
      {
        "@type": ["HomeAndConstructionBusiness", "Organization"],
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        image: `${site.url}/images/profile/living-dining.webp`,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/steedartlogo.png`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressRegion: "Sindh",
          addressCountry: "PK",
        },
        areaServed: ["Karachi", "DHA Karachi", "Clifton Karachi", "Bahria Town Karachi", "PECHS"],
        priceRange: "Quoted by project scope",
        sameAs: [site.socials.facebook, site.socials.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          telephone: site.phone,
          areaServed: "PK",
          availableLanguage: ["English", "Urdu"],
        },
        makesOffer: [
          "Complete home renovation in Karachi",
          "Apartment and house renovation",
          "Residential interior design",
          "Custom joinery and fitted furniture",
          "Renovation execution and installation",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, areaServed: "Karachi" },
        })),
      },
    ],
  };

  return (
    <html lang="en" className={`${sans.variable} ${display.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
