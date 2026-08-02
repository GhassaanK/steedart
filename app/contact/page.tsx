import { PageShell } from "../components";
import type { Metadata } from "next";
import { ContactExperience } from "./ContactExperience";

export const metadata: Metadata = {
  title: "Kitchen Renovation Consultation in Karachi",
  description:
    "Get in touch with Steed Art for a kitchen renovation or interior project in Karachi. Tell us about your space and book a free consultation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Kitchen Renovation Consultation in Karachi | Steed Art",
    description:
      "Get in touch with Steed Art for a kitchen renovation or interior project in Karachi.",
    url: "/contact",
    images: [{ url: "/images/hero-kitchen.png", width: 1792, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Renovation Consultation in Karachi | Steed Art",
    description: "Discuss a custom kitchen, cabinetry, or residential interior project with Steed Art.",
    images: ["/images/hero-kitchen.png"],
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
