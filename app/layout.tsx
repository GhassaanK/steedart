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
    "Premium kitchen renovation, custom cabinets, and interior design for Karachi homes. See the Steed Art approach and book a free consultation.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/steedartlogo.png`,
    logo: `${site.url}/steedartlogo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    areaServed: ["Karachi", "DHA Karachi", "Clifton Karachi", "Bahria Town Karachi", "PECHS"],
    priceRange: "PKR 100,000+",
    sameAs: [site.socials.facebook, site.socials.instagram],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kitchen renovation in Karachi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom kitchen cabinets",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior design",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${manrope.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
