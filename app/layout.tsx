import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Steed Art | Complete Home Renovation in Karachi",
    template: "%s | Steed Art",
  },
  description:
    "End-to-end home renovation in Karachi, from spatial planning and civil work to interiors, custom joinery, finishes, and final handover.",
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
    title: "Steed Art | Complete Home Renovation in Karachi",
    description:
      "Design-led, end-to-end home renovation for Karachi residences.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/home-hero.webp", width: 1536, height: 1024 }],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steed Art | Complete Home Renovation in Karachi",
    description:
      "Design-led, end-to-end home renovation for Karachi residences.",
    images: ["/images/home-hero.webp"],
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
        image: `${site.url}/images/home-hero.webp`,
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
    <html lang="en" className={`${manrope.variable} antialiased`}>
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
