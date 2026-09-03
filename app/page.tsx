import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { ImageCard, PageShell } from "./components";
import { images } from "./data";
import { HomePortfolioPreview } from "./HomePortfolioPreview";
import { KitchenCostCalculator } from "./KitchenCostCalculator";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ReviewsSection } from "./ReviewsSection";
import {
  HomeDeliverablesSection,
  HomeProcessSection,
} from "./HomeDecisionSections";
import { FaqAccordion } from "./FaqAccordion";
import { HomeFinalCta } from "./HomeFinalCta";
import { faqs } from "./faq-data";
import { getPublicProjects, getPublicReviews } from "./lib/server-cms";

export default async function Home() {
  const [projects, reviews] = await Promise.all([
    getPublicProjects(),
    getPublicReviews(),
  ]);

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
            }).replace(/</g, "\\u003c"),
          }}
        />
        <section className="mx-auto px-5 sm:px-8">
          <div className="relative mx-auto min-h-[620px] max-w-[1360px] overflow-hidden rounded-[22px] bg-neutral-950 text-white">
            <Image src={images.hero} alt="Complete Steed Art home renovation in Karachi" fill priority sizes="(max-width: 1360px) 100vw, 1360px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.28em] text-white/75">
                  Complete home renovation in Karachi
                </p>
                <h1 className="max-w-5xl text-6xl font-extrabold leading-[0.9] tracking-normal sm:text-8xl lg:text-[132px]">
                  Homes With Presence
                </h1>
              </div>
              <div className="rounded-[18px] bg-black/55 p-5 backdrop-blur-md">
                <p className="text-sm leading-6 text-white/78">
                  One design-led team for planning, civil work, interiors,
                  custom joinery, finishes, installation, and the details that
                  bring the whole home together.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact#project-enquiry" className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold text-black">
                    Plan Your Renovation <ArrowUpRight size={16} />
                  </Link>
                  <Link href="/portfolio" className="inline-flex h-10 items-center gap-2 rounded-full bg-white/12 px-4 text-sm font-extrabold text-white">
                    See our work
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute right-6 top-6 hidden h-28 w-28 place-items-center rounded-full border border-white/35 text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/80 sm:grid">
              Design to handover
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_0.8fr]">
          <ImageCard
            src={images.renovationAfter}
            alt="Completed room within a Steed Art home renovation"
            title="One Home. One Clear Direction."
            label="End-to-end renovation"
            className="min-h-[520px]"
            href="/portfolio"
            actionLabel="Explore project thinking"
          />
          <div className="grid gap-4">
            <div className="surface-card rounded-[18px] p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#76563f]">The complete picture</p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-normal">
                Renovation works better when every decision belongs together.
              </h2>
              <p className="mt-5 text-sm font-medium leading-7 text-neutral-600">
                From circulation and services to lighting, finishes, joinery,
                furniture, and installation, we shape the home as one connected
                project rather than a collection of disconnected rooms.
              </p>
              <Link
                href="/contact#project-enquiry"
                className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-neutral-950 transition hover:text-[#76563f]"
              >
                Discuss your renovation
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <ImageCard
              src={images.detail}
              alt="Cabinet detail"
              title="Details That Belong To The Whole"
              label="Resolved, not added later"
              className="min-h-[260px]"
              href="/contact#project-enquiry"
              actionLabel="Explore our approach"
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
                A convincing transformation is rarely one dramatic gesture. It
                comes from resolving layout, function, light, materials,
                storage, and execution as parts of the same idea.
              </p>
            </div>
            <BeforeAfterSlider
              beforeSrc={images.renovationBefore}
              afterSrc={images.renovationAfter}
              beforeAlt="Room before Steed Art renovation"
              afterAlt="Room after Steed Art renovation"
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
            <HomePortfolioPreview initialProjects={projects} />
          </div>
        </section>

        <ReviewsSection initialReviews={reviews} />

        <HomeProcessSection />

        <HomeDeliverablesSection />

        <section className="mx-auto max-w-[1360px] px-5 pt-16 sm:px-8 lg:pt-24">
          <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">
            Planning a kitchen within your renovation?
          </p>
          <h2 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
            Get a focused starting estimate for cabinetry or flooring.
          </h2>
          <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-neutral-600">
            This tool estimates selected kitchen work only. A complete home
            renovation is scoped after we understand the property, design
            direction, site conditions, and full extent of work.
          </p>
        </section>

        <div id="kitchen-estimate" className="scroll-mt-6">
          <KitchenCostCalculator />
        </div>

        <FaqAccordion />

        <section className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div className="relative min-h-[520px] overflow-hidden rounded-[18px]">
            <Image
              src={images.bedroom}
              alt="Completed primary bedroom within a Steed Art home renovation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#76563f]">
              One home, one language
            </p>
            <h2 className="mt-5 text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
              Every room should feel like it belongs to the same home.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-neutral-600">
              We connect planning, materials, lighting, fitted elements, and
              furniture from room to room. The result can hold contrast and
              personality without feeling pieced together along the way.
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
