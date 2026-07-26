import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { process, services } from "./data";

export function HomeProcessSection() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-white/48">
              How it works
            </p>
            <h2 className="mt-5 max-w-xl text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
              Clear decisions, in the right order.
            </h2>
          </div>
          <p className="max-w-lg text-sm font-medium leading-7 text-white/62 lg:justify-self-end">
            You do not need to arrive with every answer. We move from the
            problem, to the plan, to the final material decisions before
            anything is made.
          </p>
        </div>

        <div className="mt-12 grid border-t border-white/18 md:grid-cols-4">
          {process.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="border-b border-white/18 py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-black">
                    <Icon size={19} />
                  </span>
                  <span className="text-xs font-extrabold text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl font-extrabold">{step.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-white/58">
                  {step.copy}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeDeliverablesSection() {
  return (
    <section className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">
            What you get
          </p>
          <h2 className="mt-5 max-w-xl text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
            A defined scope, not a vague makeover.
          </h2>
        </div>
        <p className="max-w-lg text-sm font-medium leading-7 text-neutral-600 lg:justify-self-end">
          Your exact scope is shaped around the room. These are the practical
          areas Steed Art can design, coordinate, fabricate, and install.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Link
              key={service.title}
              href={service.href}
              className="group grid min-h-[310px] gap-8 bg-[#f4f0ea] p-7 transition hover:bg-[#e8ddd0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:grid-cols-[1fr_auto]"
            >
              <div className="flex flex-col">
                <Icon size={23} />
                <h3 className="mt-8 text-3xl font-extrabold">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-sm font-medium leading-7 text-neutral-600">
                  {service.copy}
                </p>
                <span className="mt-auto pt-8 text-xs font-extrabold uppercase tracking-[0.16em] text-[#76563f]">
                  {service.action}
                </span>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight size={18} />
                </span>
                <ul className="grid gap-3 text-right text-xs font-bold text-neutral-600">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-center justify-end gap-2">
                      {item}
                      <Check size={14} className="text-[#76563f]" />
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
