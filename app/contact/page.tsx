import { PageShell } from "../components";
import { ContactDetails } from "../PublicSettings";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contact Steed Art for kitchen renovation, cabinetry, shelving, and interior design projects in Karachi.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-[650px] flex-col justify-between rounded-[22px] bg-black p-7 text-white lg:p-10">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-white/45">Contact</p>
              <h1 className="mt-6 text-6xl font-extrabold leading-[0.98] tracking-normal sm:text-7xl">
                Bring us the kitchen you keep thinking about.
              </h1>
            </div>
            <ContactDetails />
          </div>
          <ContactForm />
        </section>
      </main>
    </PageShell>
  );
}
