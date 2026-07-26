"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Download,
  Expand,
  ExternalLink,
  Eye,
  LoaderCircle,
  X,
} from "lucide-react";
import type { Catalogue } from "./data";

export function CatalogueExplorer({
  catalogues,
}: {
  catalogues: Catalogue[];
}) {
  const [active, setActive] = useState<Catalogue | null>(null);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [active]);

  function openCatalogue(catalogue: Catalogue) {
    setIsDocumentLoading(true);
    setActive(catalogue);
  }

  async function enterFullscreen() {
    if (viewerRef.current?.requestFullscreen) {
      await viewerRef.current.requestFullscreen();
    }
  }

  return (
    <>
      <section
        className="mx-auto max-w-[1360px] px-5 pb-20 pt-8 sm:px-8 lg:pb-28"
        aria-labelledby="catalogue-library-heading"
      >
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#76563f]">
              Material library
            </p>
            <h2
              id="catalogue-library-heading"
              className="mt-4 text-4xl font-extrabold tracking-normal sm:text-5xl"
            >
              Open a finish book.
            </h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm font-medium leading-7 text-neutral-500 md:block">
            Explore online without downloading, or keep the complete PDF for
            your project references.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {catalogues.map((catalogue, index) => (
            <article
              key={catalogue.id}
              className="group grid gap-7 py-7 md:grid-cols-[minmax(220px,0.7fr)_1.3fr_auto] md:items-center lg:gap-12 lg:py-10"
            >
              <button
                type="button"
                onClick={() => openCatalogue(catalogue)}
                className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[8px] bg-neutral-900 text-left"
                aria-label={`Explore ${catalogue.title} catalogue`}
              >
                <Image
                  src={catalogue.cover}
                  alt={catalogue.coverAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white/75">
                  Volume {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-lg transition group-hover:bg-black group-hover:text-white">
                  <Eye size={18} />
                </span>
              </button>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">
                  {catalogue.subtitle}
                </p>
                <h3 className="mt-3 text-4xl font-extrabold tracking-normal sm:text-5xl">
                  {catalogue.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-neutral-600">
                  {catalogue.description}
                </p>
                <p className="mt-4 text-xs font-bold text-neutral-400">
                  PDF · {catalogue.fileSize}
                </p>
              </div>

              <div className="flex gap-3 md:flex-col md:items-stretch">
                <button
                  type="button"
                  onClick={() => openCatalogue(catalogue)}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                >
                  Explore
                  <ArrowUpRight size={17} />
                </button>
                <a
                  href={catalogue.file}
                  download
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#f4f0ea] px-5 text-sm font-extrabold text-neutral-950 transition hover:bg-[#e8ddd0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                >
                  <Download size={17} />
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {active ? (
        <div
          className="fixed inset-0 z-[80] bg-black/72 p-2 backdrop-blur-md sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} catalogue viewer`}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close catalogue viewer"
            onClick={() => setActive(null)}
          />
          <div
            ref={viewerRef}
            className="relative mx-auto flex h-full max-w-[1480px] flex-col overflow-hidden rounded-[12px] bg-[#efede9] shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
          >
            <div className="flex min-h-[66px] items-center justify-between gap-4 border-b border-black/10 bg-white px-4 sm:px-6">
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-neutral-950">
                  {active.title}
                </p>
                <p className="text-xs font-semibold text-neutral-400">
                  PDF · {active.fileSize}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={active.file}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden h-10 items-center gap-2 rounded-full bg-[#f4f0ea] px-4 text-xs font-extrabold text-neutral-950 transition hover:bg-[#e8ddd0] sm:inline-flex"
                >
                  <ExternalLink size={15} />
                  Open PDF
                </a>
                <a
                  href={active.file}
                  download
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f0ea] text-neutral-950 transition hover:bg-[#e8ddd0]"
                  aria-label={`Download ${active.title}`}
                  title="Download PDF"
                >
                  <Download size={17} />
                </a>
                <button
                  type="button"
                  onClick={enterFullscreen}
                  className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#f4f0ea] text-neutral-950 transition hover:bg-[#e8ddd0] sm:inline-flex"
                  aria-label="Enter fullscreen"
                  title="Enter fullscreen"
                >
                  <Expand size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white transition hover:bg-[#6d4b34]"
                  aria-label="Close catalogue viewer"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1">
              {isDocumentLoading ? (
                <div className="absolute inset-0 z-10 grid place-items-center bg-[#efede9]">
                  <div className="text-center">
                    <LoaderCircle
                      className="mx-auto animate-spin text-neutral-950"
                      size={30}
                    />
                    <p className="mt-4 text-sm font-bold text-neutral-600">
                      Opening catalogue
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      The PDF loads only when requested.
                    </p>
                  </div>
                </div>
              ) : null}
              <iframe
                src={`${active.file}#view=FitH`}
                title={`${active.title} PDF catalogue`}
                className="h-full w-full border-0 bg-[#efede9]"
                onLoad={() => setIsDocumentLoading(false)}
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-black/10 bg-white px-4 py-3 text-xs text-neutral-500 sm:hidden">
              <span>Use your browser controls to browse pages.</span>
              <a
                href={active.file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 font-extrabold text-neutral-950"
              >
                Open
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
