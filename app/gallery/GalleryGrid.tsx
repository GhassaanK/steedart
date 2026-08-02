"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCmsGallery } from "../lib/useCmsData";
import type { GalleryImage } from "../lib/cms";

const spans = [
  "lg:col-span-6 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
];

const sizes = [
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 680px",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 453px",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 227px",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 680px",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 453px",
];

export function GalleryGrid({ initialGallery = [] }: { initialGallery?: GalleryImage[] }) {
  const { gallery, isLoading } = useCmsGallery(initialGallery);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : gallery[activeIndex];

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? gallery.length - 1 : current - 1;
    });
  }, [gallery.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === gallery.length - 1 ? 0 : current + 1;
    });
  }, [gallery.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, showNext, showPrevious]);

  return (
    <>
      <section className="mx-auto grid max-w-[1360px] auto-rows-[220px] gap-3 px-5 pb-16 sm:px-8 lg:grid-cols-12">
        {isLoading ? (
          [0, 1, 2, 3].map((item) => (
            <article key={item} className={`animate-pulse rounded-[18px] bg-[#f4f0ea] ${spans[item % spans.length]}`} />
          ))
        ) : gallery.length ? gallery.map((image, index) => (
          <article id={`gallery-image-${image.id}`} key={image.id} className={`relative overflow-hidden rounded-[18px] bg-neutral-900 ${spans[index % spans.length]}`}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block h-full w-full cursor-zoom-in text-left"
              aria-label={`View ${image.alt || `Steed Art gallery image ${index + 1}`}`}
            >
              <Image
                src={image.url}
                alt={image.alt || `Steed Art gallery image ${index + 1}`}
                fill
                sizes={sizes[index % sizes.length]}
                quality={92}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-black text-neutral-950 opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-visible:opacity-100">
                Click to view full image
              </span>
            </button>
          </article>
        )) : (
          <div className="rounded-[22px] bg-[#f4f0ea] p-8 lg:col-span-12">
            <h2 className="text-3xl font-extrabold">Couldn&apos;t find gallery images.</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-neutral-600">
              Upload gallery images from the CMS to show them here.
            </p>
          </div>
        )}
      </section>

      {activeImage ? (
        <div className="fixed inset-0 z-50 bg-black/92 p-3 text-white sm:p-5" role="dialog" aria-modal="true" aria-label="Gallery image viewer">
          <button type="button" className="absolute inset-0 cursor-zoom-out" aria-label="Close image viewer" onClick={() => setActiveIndex(null)} />
          <div className="relative flex h-full flex-col">
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{activeImage.alt || "Steed Art gallery image"}</p>
                <p className="mt-1 text-xs font-bold text-white/45">
                  {(activeIndex ?? 0) + 1} of {gallery.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black transition hover:bg-[#d9c6b4]"
                aria-label="Close image viewer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative z-10 mt-4 min-h-0 flex-1">
              <Image
                src={activeImage.url}
                alt={activeImage.alt || "Steed Art gallery image"}
                fill
                sizes="100vw"
                quality={96}
                className="object-contain"
                priority
              />
            </div>

            {gallery.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-xl transition hover:bg-[#d9c6b4] sm:left-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-xl transition hover:bg-[#d9c6b4] sm:right-2"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
