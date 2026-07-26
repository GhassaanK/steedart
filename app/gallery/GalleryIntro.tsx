"use client";

import { useCmsSettings } from "../lib/useCmsData";

export function GalleryIntro() {
  const { settings, isLoading } = useCmsSettings();

  return (
    <section className="mx-auto max-w-[1360px] px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-end sm:justify-between">
        {isLoading ? (
          <>
            <span className="h-16 w-56 animate-pulse rounded-[18px] bg-black/10 sm:h-20" />
            <span className="h-20 w-full max-w-sm animate-pulse rounded-[18px] bg-black/10" />
          </>
        ) : (
          <>
            <div>
              <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">In the studio</p>
              <h1 className="text-5xl font-extrabold leading-none sm:text-7xl">
                {settings.galleryHeading}
              </h1>
            </div>
            <div className="max-w-sm">
              <p className="text-sm font-medium leading-7 text-neutral-500">
                {settings.galleryCopy}
              </p>
              <a href="/contact" className="mt-5 inline-flex h-11 items-center rounded-full bg-black px-5 text-sm font-extrabold text-white">
                Book a consult
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
