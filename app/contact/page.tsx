import { PageShell } from "../components";
import { ContactExperience } from "./ContactExperience";

export const metadata = {
  title: "Contact Steed Art | Book a Kitchen Design Consultation",
  description:
    "Get in touch with Steed Art for a kitchen renovation or interior project in Karachi. Tell us about your space and book a free consultation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Steed Art | Book a Kitchen Design Consultation",
    description:
      "Get in touch with Steed Art for a kitchen renovation or interior project in Karachi.",
    url: "/contact",
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
