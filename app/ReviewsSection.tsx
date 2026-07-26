"use client";

import { Quote, Star } from "lucide-react";
import { useCmsReviews } from "./lib/useCmsData";

export function ReviewsSection() {
  const { reviews, isLoading } = useCmsReviews();
  const published = reviews.filter((review) => review.published).slice(0, 6);

  if (isLoading || !published.length) {
    return null;
  }

  return (
    <section className="bg-[#f4f0ea]">
      <div className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">
                Client reviews
              </p>
              <h2 className="mt-5 max-w-lg text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
                The part that matters after installation.
              </h2>
            </div>
            <p className="mt-8 max-w-md text-sm font-medium leading-7 text-neutral-600">
              A considered kitchen should still feel right when the drawings,
              samples, and installation activity are over.
            </p>
          </div>

          <div className="divide-y divide-black/12 border-y border-black/12">
            {published.map((review, index) => (
              <article
                key={review.id}
                className="grid gap-6 py-7 sm:grid-cols-[58px_1fr_auto] sm:items-start lg:py-9"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-neutral-950">
                  <Quote size={19} />
                </span>
                <div>
                  <div
                    className="flex gap-1 text-[#76563f]"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, star) => (
                      <Star
                        key={`${review.id}-${star}`}
                        size={14}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 max-w-2xl text-xl font-bold leading-8 sm:text-2xl">
                    “{review.quote}”
                  </blockquote>
                  <p className="mt-5 text-sm font-extrabold">{review.name}</p>
                  <p className="mt-1 text-xs font-semibold text-neutral-500">
                    {[review.project, review.location].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className="hidden text-xs font-extrabold text-neutral-400 sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
