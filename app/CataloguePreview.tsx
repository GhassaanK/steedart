import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { catalogues } from "./catalogues/data";

export function CataloguePreview() {
  return (
    <section className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex flex-col justify-between bg-[#f4f0ea] p-7 sm:p-9">
          <div>
            <BookOpen size={24} strokeWidth={2.2} />
            <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.22em] text-[#76563f]">
              Material library
            </p>
            <h2 className="mt-4 max-w-md text-5xl font-extrabold leading-[0.98] tracking-normal sm:text-6xl">
              Look through the finishes before we meet.
            </h2>
          </div>
          <div className="mt-12">
            <p className="max-w-md text-sm font-medium leading-7 text-neutral-600">
              Browse complete lamination and surface catalogues online, then
              bring your shortlist into the design conversation.
            </p>
            <Link
              href="/catalogues"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-extrabold text-white transition hover:bg-[#6d4b34]"
            >
              Explore the library
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          {catalogues.map((catalogue, index) => (
            <Link
              key={catalogue.id}
              href="/catalogues"
              className={`card-notch group relative overflow-hidden rounded-[16px] bg-neutral-900 ${
                index === 0 ? "min-h-[520px]" : "min-h-[360px] sm:mt-16"
              }`}
              aria-label={`Explore ${catalogue.title} catalogue`}
            >
              <Image
                src={catalogue.cover}
                alt={catalogue.coverAlt}
                fill
                sizes="(max-width: 640px) 100vw, 38vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/5 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-neutral-950">
                PDF · {catalogue.fileSize}
              </span>
              <span className="absolute bottom-5 left-5 max-w-[calc(100%-90px)] text-white">
                <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-white/65">
                  {catalogue.subtitle}
                </span>
                <span className="mt-2 block text-3xl font-extrabold">
                  {catalogue.title}
                </span>
              </span>
              <span className="notch-button">
                <ArrowUpRight size={19} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
