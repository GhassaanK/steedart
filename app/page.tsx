import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site";
import { ImageCard, PageShell } from "./components";
import { images } from "./data";
import { HomePortfolioPreview } from "./HomePortfolioPreview";
import { KitchenCostCalculator } from "./KitchenCostCalculator";
import { CataloguePreview } from "./CataloguePreview";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ReviewsSection } from "./ReviewsSection";
import {
  HomeDeliverablesSection,
  HomeProcessSection,
} from "./HomeDecisionSections";
import { FaqAccordion } from "./FaqAccordion";
import { HomeFinalCta } from "./HomeFinalCta";
import { faqs } from "./faq-data";

export default function Home() {
  return (
    <PageShell>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
        <section className="mx-auto px-5 sm:px-8">
          <div className="relative mx-auto min-h-[620px] max-w-[1360px] overflow-hidden rounded-[22px] bg-neutral-950 text-white">
            <Image src={images.hero} alt="Steed Art luxury kitchen interior" fill priority sizes="(max-width: 1360px) 100vw, 1360px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.28em] text-white/75">
                  Custom kitchen renovation in Karachi
                </p>
                <h1 className="max-w-5xl text-6xl font-extrabold leading-[0.9] tracking-normal sm:text-8xl lg:text-[132px]">
                  Kitchens With Presence
                </h1>
              </div>
              <div className="rounded-[18px] bg-black/55 p-5 backdrop-blur-md">
                <p className="text-sm leading-6 text-white/78">
                  Custom cabinets, kitchen furniture, shelving, material
                  direction, and installation for Karachi homes. Focused
                  kitchen projects start from {site.startingPrice}.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold text-black">
                    Book consult <ArrowUpRight size={16} />
                  </Link>
                  <Link href="/portfolio" className="inline-flex h-10 items-center gap-2 rounded-full bg-white/12 px-4 text-sm font-extrabold text-white">
                    See our work
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute right-6 top-6 hidden h-28 w-28 place-items-center rounded-full border border-white/35 text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/80 sm:grid">
              {site.startingPrice} plus
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_0.8fr]">
          <ImageCard
            src={images.afterKitchen}
            alt="Completed Steed Art kitchen renovation"
            title="A Complete Kitchen Makeover, Without The Guesswork"
            label="Kitchen first"
            className="min-h-[520px]"
            href="/portfolio"
            actionLabel="See completed work"
          />
          <div className="grid gap-4">
            <div className="surface-card rounded-[18px] p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#76563f]">A focused first project</p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-normal">
                Start with the room that works hardest.
              </h2>
              <p className="mt-5 text-sm font-medium leading-7 text-neutral-600">
                Steed Art brings full interior thinking into a focused kitchen
                project: cabinet planning, storage, finishes, furniture,
                shelving, and installation shaped around the way you live.
              </p>
              <Link
                href="#kitchen-estimate"
                className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-neutral-950 transition hover:text-[#76563f]"
              >
                Calculate a starting estimate
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <ImageCard
              src={images.detail}
              alt="Cabinet detail"
              title="Craft You Can Feel"
              label="Finish detail"
              className="min-h-[260px]"
              href="/catalogues"
              actionLabel="Browse finish catalogues"
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16">
          <div className="before-after-frame grid overflow-hidden rounded-[22px] p-4 text-white lg:grid-cols-[0.9fr_1.1fr] lg:p-6">
            <div className="flex flex-col justify-between p-5 lg:p-8">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-white/55">Before and after</p>
                <h2 className="mt-5 max-w-lg text-5xl font-extrabold leading-[1] tracking-normal sm:text-6xl">
                  Same footprint. Completely different feeling.
                </h2>
              </div>
              <p className="mt-8 max-w-md text-sm font-medium leading-7 text-white/62">
                Good kitchen work rarely starts with more space. It starts with
                better decisions: cabinet rhythm, storage depth, light,
                material, and the discipline to remove visual noise.
              </p>
            </div>
            <BeforeAfterSlider
              beforeSrc={images.beforeKitchen}
              afterSrc={images.afterKitchen}
              beforeAlt="Kitchen before Steed Art renovation"
              afterAlt="Kitchen after Steed Art renovation"
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.5fr_0.5fr] lg:items-start">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">Project dossiers</p>
              <h2 className="mt-5 max-w-xl text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
                See the thinking behind the rooms.
              </h2>
            </div>
            <HomePortfolioPreview />
          </div>
        </section>

        <ReviewsSection />

        <HomeProcessSection />

        <HomeDeliverablesSection />

        <div id="kitchen-estimate" className="scroll-mt-6">
          <KitchenCostCalculator />
        </div>

        <CataloguePreview />

        <FaqAccordion />

        <section className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div className="relative min-h-[520px] overflow-hidden rounded-[18px]">
            <Image
              src={images.dining}
              alt="Steed Art dining and living interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#76563f]">
              Beyond the kitchen
            </p>
            <h2 className="mt-5 text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
              One room can change the direction of the whole home.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-neutral-600">
              We often begin with cabinets, storage, and the daily rhythm of a
              kitchen. Once that language feels right, we can carry its
              materials, proportions, and personality into furniture, dining,
              living spaces, and complete interior direction.
            </p>
            <Link href="/about" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-extrabold text-white transition hover:bg-[#6d4b34]">
              Discover Steed Art <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <HomeFinalCta />
      </main>
    </PageShell>
  );
}
