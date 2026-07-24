import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { site } from "@/site";
import { PageShell } from "../components";
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
            <div className="grid gap-5 text-sm font-medium text-white/68">
              <p className="flex items-center gap-3"><MapPin size={18} /> {site.address}</p>
              <p className="flex items-center gap-3"><Mail size={18} /> {site.email}</p>
              <p className="flex items-center gap-3"><Phone size={18} /> {site.phone}</p>
              <div className="flex gap-3 pt-4">
                <a href={site.socials.instagram} aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"><FaInstagram size={18} /></a>
                <a href={site.socials.facebook} aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"><FaFacebookF size={16} /></a>
                <a href={site.socials.whatsapp} aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"><FaWhatsapp size={18} /></a>
              </div>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
    </PageShell>
  );
}
