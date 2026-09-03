import Image from "next/image";
import type { Metadata } from "next";
import { PageShell } from "../components";
import { images, process } from "../data";

export const metadata: Metadata = {
  title: "Complete Home Renovation Studio in Karachi",
  description:
    "Steed Art is a design-led home renovation studio in Karachi, managing complete residential transformations from planning and civil work to interiors and handover.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Steed Art | Complete Home Renovation Studio in Karachi",
    description:
      "Meet the Karachi studio delivering design-led, end-to-end home renovations.",
    url: "/about",
    images: [{ url: "/images/home-hero.webp", width: 1536, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steed Art | Complete Home Renovation Studio in Karachi",
    description: "Meet the Karachi studio behind considered, end-to-end residential renovations.",
    images: ["/images/home-hero.webp"],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[680px] overflow-hidden rounded-[22px]">
            <Image src={images.hero} alt="Connected living and dining spaces renovated by Steed Art" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
          </div>
          <div className="surface-card flex min-h-[680px] flex-col justify-between rounded-[22px] p-7 lg:p-10">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">
                About Steed Art
              </p>
              <h1 className="mt-6 text-6xl font-extrabold leading-[0.98] tracking-normal sm:text-7xl">
                Luxury, but with a pulse.
              </h1>
            </div>
            <div className="grid gap-5 text-sm font-medium leading-7 text-neutral-600">
              <p>
                Steed Art is a Karachi renovation studio for homeowners
                who want their homes to feel composed, premium, personal, and
                genuinely easy to live in.
              </p>
              <p>
                We are not interested in empty minimalism. A Steed Art home has
                proportion, storage, craft, warmth, and small moments that make
                people look twice.
              </p>
              <p>
                We take on complete home renovations, bringing planning, civil
                work, services, interior design, custom joinery, finishes, and
                installation under one considered direction from beginning to
                handover.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">What we believe</p>
            <h2 className="mt-5 max-w-md text-5xl font-extrabold leading-[1] tracking-normal">
              A home should reveal its thought slowly.
            </h2>
          </div>
          <div className="grid border-t border-neutral-300 md:grid-cols-3">
            {["Nothing should feel accidental.", "Every room should belong together.", "Premium should still feel human."].map((line, index) => (
              <div
                key={line}
                className="border-b border-neutral-300 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <p className="text-xs font-extrabold text-[#76563f]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-8 text-3xl font-extrabold leading-tight">{line}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1360px] px-5 py-12 sm:px-8">
          <div className="grid overflow-hidden rounded-[22px] bg-black text-white lg:grid-cols-4">
            {process.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="p-6 lg:p-8">
                  <Icon />
                  <h3 className="mt-8 text-2xl font-extrabold">{step.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-white/62">{step.copy}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
