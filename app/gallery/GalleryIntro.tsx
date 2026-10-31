"use client";

import { useCmsSettings } from "../lib/useCmsData";
import type { SiteSettings } from "../lib/cms";

export function GalleryIntro({ initialSettings }: { initialSettings?: SiteSettings }) {
  const { settings, isLoading } = useCmsSettings(initialSettings);

  return (
    <section className="studio-wrap gallery-intro">
      <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-end sm:justify-between">
        {isLoading ? (
          <>
            <span className="h-16 w-56 animate-pulse rounded-[18px] bg-black/10 sm:h-20" />
            <span className="h-20 w-full max-w-sm animate-pulse rounded-[18px] bg-black/10" />
          </>
        ) : (
          <>
            <div>
              <p className="eyebrow">The gallery / Spaces & details</p>
              <h1 className="interior-title">
                {settings.galleryHeading}
              </h1>
            </div>
            <div className="max-w-sm">
              <p className="text-sm font-medium leading-7 text-neutral-500">
                {settings.galleryCopy}
              </p>
              <a href="/contact" className="text-link mt-5">
                Discuss your space
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
