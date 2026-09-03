import { PageShell } from "../components";
import type { Metadata } from "next";
import { ContactExperience } from "./ContactExperience";

export const metadata: Metadata = {
  title: "Home Renovation Consultation in Karachi",
  description:
    "Talk to Steed Art about a complete home renovation in Karachi, from spatial planning and civil work to interiors, custom joinery, and handover.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Home Renovation Consultation in Karachi | Steed Art",
    description:
      "Discuss a complete, design-led home renovation with Steed Art in Karachi.",
    url: "/contact",
    images: [{ url: "/images/home-hero.webp", width: 1536, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Renovation Consultation in Karachi | Steed Art",
    description: "Discuss a complete residential renovation with Steed Art in Karachi.",
    images: ["/images/home-hero.webp"],
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <main>
        <ContactExperience />
      </main>
    </PageShell>
  );
}
