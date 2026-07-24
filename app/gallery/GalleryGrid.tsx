"use client";

import Image from "next/image";
import { useCmsGallery } from "../lib/useCmsData";

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

export function GalleryGrid() {
  const { gallery } = useCmsGallery();

  return (
    <section className="mx-auto grid max-w-[1360px] auto-rows-[220px] gap-3 px-5 pb-16 sm:px-8 lg:grid-cols-12">
      {gallery.map((image, index) => (
        <article key={image.id} className={`group relative overflow-hidden rounded-[18px] bg-neutral-900 ${spans[index % spans.length]}`}>
          <Image src={image.url} alt={image.alt || `Steed Art gallery image ${index + 1}`} fill className="object-cover transition duration-700 group-hover:scale-105" />
        </article>
      ))}
    </section>
  );
}
