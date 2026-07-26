import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PageShell } from "../components";
import { CatalogueExplorer } from "./CatalogueExplorer";
import { catalogues } from "./data";

export const metadata: Metadata = {
  title: "Kitchen Lamination & Finish Catalogues in Karachi",
  description:
    "Explore and download Steed Art kitchen lamination and cabinet finish catalogues for renovation projects in Karachi.",
  alternates: {
    canonical: "/catalogues",
  },
  openGraph: {
    title: "Kitchen Lamination & Finish Catalogues | Steed Art",
    description:
      "Browse cabinet finishes and lamination references for your Steed Art kitchen or interior project.",
    url: "/catalogues",
    images: [{ url: "/images/cabinet-detail.png", width: 1536, height: 1024 }],
  },
};

export default function CataloguesPage() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto max-w-[1360px] px-5 pb-12 pt-4 sm:px-8 lg:pb-20">
          <div className="grid min-h-[610px] overflow-hidden rounded-[22px] bg-[#f4f0ea] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">
                  The finish library
                </p>
                <h1 className="mt-6 max-w-xl text-6xl font-extrabold leading-[0.92] tracking-normal sm:text-7xl lg:text-[86px]">
                  Materials worth looking closer at.
                </h1>
              </div>
              <div className="mt-12">
                <p className="max-w-lg text-sm font-medium leading-7 text-neutral-600">
                  Explore laminations and cabinet finishes before your
                  consultation. Save what catches your eye, then let us turn a
                  collection of references into one coherent kitchen.
                </p>
                <a
                  href="#catalogue-library-heading"
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-extrabold text-white transition hover:bg-[#6d4b34]"
                >
                  Browse catalogues
                  <ArrowDown size={17} />
                </a>
              </div>
            </div>

            <div className="relative min-h-[480px] overflow-hidden lg:min-h-0">
              <Image
                src="/images/portfolio-taupe-kitchen.png"
                alt="A Steed Art kitchen with a refined neutral material palette"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5 text-white sm:bottom-8 sm:left-8 sm:right-8">
                <p className="max-w-xs text-sm font-bold leading-6">
                  A useful starting point, followed by material guidance in the
                  studio.
                </p>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-black">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </div>
          </div>
        </section>

        <CatalogueExplorer catalogues={catalogues} />

        <section className="mx-auto max-w-[1360px] px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="grid gap-8 bg-black px-7 py-10 text-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-12">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/50">
                Found a direction?
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
                Bring the references. We will make the decisions feel easy.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-black transition hover:bg-[#e8ddd0]"
            >
              Discuss your kitchen
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
