import Image from "next/image";
import { site } from "@/site";
import { PageShell } from "../components";
import { images, process } from "../data";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Steed Art, a Karachi-based interior design studio focused on premium kitchen renovations and refined home interiors.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[680px] overflow-hidden rounded-[22px]">
            <Image src={images.lounge} alt="Steed Art lounge interior" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
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
                Steed Art is a Karachi-based interior design studio for
                homeowners who want their spaces to feel composed, premium,
                personal, and deeply usable.
              </p>
              <p>
                We are not interested in empty minimalism. A Steed Art home has
                proportion, storage, craft, warmth, and little moments that make
                people look twice.
              </p>
              <p>
                Kitchen renovation is our focused first offer, starting from
                {` ${site.startingPrice}`}. It lets clients experience our
                thinking through one high-impact room before moving into fuller
                interior work.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">What we believe</p>
            <h2 className="mt-5 max-w-md text-5xl font-extrabold leading-[1] tracking-normal">
              A room should reveal its thought slowly.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Nothing should feel accidental.", "Storage should look designed.", "Premium should still feel human."].map((line) => (
              <div key={line} className="surface-card rounded-[18px] p-6">
                <p className="text-3xl font-extrabold leading-tight">{line}</p>
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
