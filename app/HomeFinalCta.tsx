"use client";

import Link from "next/link";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useCmsSettings } from "./lib/useCmsData";

export function HomeFinalCta() {
  const { settings, isLoading } = useCmsSettings();

  return (
    <section className="bg-[#f4f0ea] text-neutral-950">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:py-24">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">
            Your next step
          </p>
          <h2 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-normal sm:text-7xl lg:text-[84px]">
            Show us the kitchen you want to change.
          </h2>
          <p className="mt-7 max-w-xl text-sm font-medium leading-7 text-neutral-600">
            Send photographs, approximate measurements, or simply tell us what
            is not working. We will help you understand the right scope from
            there.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:max-w-[260px]">
          <Link
            href="/contact#project-enquiry"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-extrabold text-white transition hover:bg-[#6d4b34]"
          >
            Send an enquiry
            <ArrowUpRight size={17} />
          </Link>
          {isLoading ? (
            <span className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-black/10 px-6 text-neutral-500">
              <LoaderCircle size={17} className="animate-spin" />
            </span>
          ) : (
            <a
              href={settings.whatsapp}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-black transition hover:bg-[#e8ddd0]"
            >
              <FaWhatsapp size={18} />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
