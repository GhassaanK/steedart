import { PageShell } from "../components";
import type { Metadata } from "next";
import { ContactExperience } from "./ContactExperience";

export const metadata: Metadata = {
  title: "Interior Design & Renovation Consultation",
  description:
    "Talk to Steed Art about a complete home renovation in Karachi, from spatial planning and civil work to interiors, custom joinery, and handover.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Interior Design & Renovation Consultation | Steed Art",
    description:
      "Discuss a complete, design-led home renovation with Steed Art in Karachi.",
    url: "/contact",
    images: [{ url: "/images/profile/living-dining.webp", width: 1280, height: 960 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design & Renovation Consultation | Steed Art",
    description: "Discuss a complete residential renovation with Steed Art in Karachi.",
    images: ["/images/profile/living-dining.webp"],
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <main id="main-content">
        <ContactExperience />
      </main>
    </PageShell>
  );
}
