"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "./faq-data";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">
            Before you begin
          </p>
          <h2 className="mt-5 max-w-lg text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
            Fewer unknowns. Better first decisions.
          </h2>
          <p className="mt-6 max-w-md text-sm font-medium leading-7 text-neutral-600">
            You do not need a finished brief before speaking to us. A rough
            measurement, a few photographs, and an honest budget are enough to
            start.
          </p>
        </div>

        <div className="border-t border-neutral-300">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={faq.question} className="border-b border-neutral-300">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="flex items-start gap-5">
                    <span className="pt-1 text-xs font-extrabold text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl font-extrabold sm:text-2xl">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown
                    size={21}
                    className={`shrink-0 transition duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={answerId}
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pl-11 text-sm font-medium leading-7 text-neutral-600 sm:pl-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
