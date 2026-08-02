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
    default: "Steed Art | Custom Kitchen Renovation & Cabinets in Karachi",
    template: "%s | Steed Art",
  },
  description:
    "Custom kitchen renovation, cabinets, shelving, and interior design for Karachi homes. Explore Steed Art projects and calculate a starting cost.",
  keywords: [
    "kitchen renovation Karachi",
    "custom kitchen cabinets Karachi",
    "interior design studio Karachi",
    "kitchen furniture Karachi",
    "premium cabinetry Karachi",
    "DHA Karachi interior design",
    "Clifton Karachi interior design",
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
    title: "Steed Art | Custom Kitchen Renovation & Cabinets in Karachi",
    description:
      "Premium kitchen renovation, custom cabinets, and interior design for Karachi homes.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/hero-kitchen.png", width: 1792, height: 1024 }],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steed Art | Custom Kitchen Renovation & Cabinets in Karachi",
    description:
      "Custom kitchen renovation, cabinets, shelving, and interior design for Karachi homes.",
    images: ["/images/hero-kitchen.png"],
  },
  category: "Interior design",
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
        image: `${site.url}/images/hero-kitchen.png`,
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
        priceRange: "PKR 100,000+",
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
          "Kitchen renovation in Karachi",
          "Custom kitchen cabinets",
          "Kitchen furniture and shelving",
          "Residential interior design",
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
