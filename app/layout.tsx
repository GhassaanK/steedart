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
    default: "Steed Art | Kitchen Renovation and Interior Design in Karachi",
    template: "%s | Steed Art",
  },
  description:
    "Steed Art designs premium kitchen renovations, custom cabinets, shelving, kitchen furniture, and interior spaces for refined Karachi homes.",
  openGraph: {
    title: "Steed Art",
    description:
      "Kitchen renovation and interior design for refined Karachi homes.",
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
  return (
    <html lang="en" className={`${manrope.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
