"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { images } from "./data";

const slides = [
  {
    src: images.hero,
    alt: "Connected living and dining spaces in a complete Steed Art home renovation",
  },
  {
    src: images.renovationAfter,
    alt: "Completed family lounge renovation by Steed Art in Karachi",
  },
  {
    src: images.bedroom,
    alt: "Completed primary bedroom renovation by Steed Art in Karachi",
  },
];

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section className="mx-auto px-5 pb-4 sm:px-8">
      <div className="mx-auto max-w-[1360px] rounded-[24px] border border-black/8 bg-white p-3 shadow-[0_28px_80px_rgba(38,28,20,0.12)] sm:p-4">
        <div
          className="relative min-h-[660px] overflow-hidden rounded-[18px] bg-neutral-950 text-white sm:min-h-[620px] lg:min-h-[600px]"
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {slides.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1360px) 100vw, 1360px"
              className={`object-cover transition-opacity duration-700 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-black/15" />

          <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-black/20 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:left-8 sm:top-8">
            Complete renovation, Karachi
          </div>

          <div className="absolute right-5 top-5 flex gap-2 sm:right-8 sm:top-8">
            <button type="button" onClick={showPrevious} aria-label="Show previous hero image" className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/25 text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={showNext} aria-label="Show next hero image" className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/25 text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 grid gap-6 p-5 pb-8 sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-12">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-extrabold leading-[0.94] tracking-normal sm:text-7xl lg:text-8xl">
                Homes With Presence
              </h1>
              <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-white/78 sm:text-base">
                One design-led team for planning, civil work, interiors,
                custom joinery, finishes, installation, and handover.
              </p>
              <Link href="/contact#project-enquiry" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-black transition hover:bg-[#f4f0ea]">
                Plan Your Renovation <ArrowUpRight size={16} />
              </Link>
            </div>

            <Link href="/portfolio" className="group grid grid-cols-[76px_1fr_42px] items-center gap-3 rounded-[16px] bg-white p-2.5 text-neutral-950 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-1" aria-label="Explore Steed Art renovation projects">
              <span className="relative h-[72px] overflow-hidden rounded-[10px]">
                <Image src={slides[(activeSlide + 1) % slides.length].src} alt="Preview of another Steed Art renovation" fill sizes="76px" className="object-cover transition duration-500 group-hover:scale-105" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#76563f]">Inside the work</span>
                <span className="mt-1 block text-sm font-extrabold leading-5">See how a complete home comes together</span>
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-neutral-950 text-white transition group-hover:bg-[#76563f]">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </div>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2" aria-label={`Hero image ${activeSlide + 1} of ${slides.length}`}>
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show hero image ${index + 1}`}
                aria-current={index === activeSlide ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/75"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
