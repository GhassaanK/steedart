"use client";

import { useState } from "react";
import { ContactDetails } from "../PublicSettings";
import { KitchenCostCalculator, type KitchenEstimate } from "../KitchenCostCalculator";
import { ContactForm } from "./ContactForm";

export function ContactExperience() {
  const [estimate, setEstimate] = useState<KitchenEstimate | null>(null);

  return (
    <>
      <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[650px] flex-col justify-between rounded-[22px] bg-black p-7 text-white lg:p-10">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-white/45">Contact</p>
            <h1 className="mt-6 text-6xl font-extrabold leading-[0.98] tracking-normal sm:text-7xl">
              Bring us the kitchen you keep thinking about.
            </h1>
          </div>
          <ContactDetails />
        </div>
        <ContactForm estimate={estimate} />
      </section>
      <section className="mx-auto max-w-[1360px] px-5 pb-16 sm:px-8">
        <KitchenCostCalculator compact onEstimateChange={setEstimate} />
      </section>
    </>
  );
}
