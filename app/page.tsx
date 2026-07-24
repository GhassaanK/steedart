import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site";
import { ImageCard, PageShell } from "./components";
import { images, portfolio, process, services, stats } from "./data";

export default function Home() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto px-5 sm:px-8">
          <div className="relative mx-auto min-h-[620px] max-w-[1360px] overflow-hidden rounded-[22px] bg-neutral-950 text-white">
            <Image src={images.hero} alt="Steed Art luxury kitchen interior" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.28em] text-white/75">
                  Kitchen renovation in Karachi
                </p>
                <h1 className="max-w-5xl text-6xl font-extrabold leading-[0.9] tracking-normal sm:text-8xl lg:text-[132px]">
                  Kitchens With Presence
                </h1>
              </div>
              <div className="rounded-[18px] bg-black/55 p-5 backdrop-blur-md">
                <p className="text-sm leading-6 text-white/78">
                  Tailored cabinets, kitchen furniture, shelving, and complete
                  design direction for Karachi homes that deserve more than a
                  standard renovation.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold text-black">
                    Book consult <ArrowUpRight size={16} />
                  </Link>
                  <Link href="/portfolio" className="inline-flex h-10 items-center gap-2 rounded-full bg-white/12 px-4 text-sm font-extrabold text-white">
                    View work
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute right-6 top-6 hidden h-28 w-28 place-items-center rounded-full border border-white/35 text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/80 sm:grid">
              {site.startingPrice} plus
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_0.8fr]">
          <ImageCard src={images.lounge} alt="Steed Art interior lounge" title="Designed For Homes Lived In Beautifully" label="Interior led" notch={false} className="min-h-[520px]" />
          <div className="grid gap-4">
            <div className="surface-card rounded-[18px] p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#76563f]">A focused first project</p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-normal">
                Your kitchen is the first room we perfect.
              </h2>
              <p className="mt-5 text-sm font-medium leading-7 text-neutral-600">
                Many clients begin with a kitchen. Once they experience the
                difference a designed space makes, the rest of the home starts
                to feel possible.
              </p>
            </div>
            <ImageCard src={images.detail} alt="Cabinet detail" title="Craft You Can Feel" label="Finish detail" className="min-h-[260px]" />
          </div>
        </section>

        <section className="mx-auto grid max-w-[1360px] grid-cols-2 gap-8 px-5 pb-16 text-center sm:px-8 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={value}>
              <p className="text-4xl font-extrabold tracking-normal sm:text-6xl">{value}</p>
              <p className="mt-3 text-sm text-neutral-500">{label}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto grid max-w-[1360px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[520px] overflow-hidden rounded-[18px]">
            <Image src={images.afterKitchen} alt="Renovated compact kitchen" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#76563f]">Elegance with purpose</p>
            <h2 className="mt-5 text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
              Premium does not have to feel distant.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-neutral-600">
              A kitchen should open smoothly, store intelligently, clean easily,
              and still feel special at the end of a long day. We bring full
              interior design thinking into every cabinet, shelf, surface, and
              detail.
            </p>
            <Link href="/about" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-extrabold text-white">
              About us <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.5fr_0.5fr] lg:items-start">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">Project dossiers</p>
              <h2 className="mt-5 max-w-xl text-5xl font-extrabold leading-[1] tracking-normal sm:text-7xl">
                See the thinking behind the rooms.
              </h2>
            </div>
            <div className="grid gap-2">
              {portfolio.slice(0, 4).map((project, index) => (
                <Link
                  key={project.slug}
                  href="/portfolio"
                  className="grid gap-4 rounded-[18px] p-4 transition hover:bg-[#f4f0ea] sm:grid-cols-[54px_1fr_110px] sm:items-center"
                >
                  <span className="text-2xl font-extrabold text-neutral-300">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">{project.category}</span>
                    <span className="mt-1 block text-2xl font-extrabold">{project.title}</span>
                  </span>
                  <span className="relative h-20 overflow-hidden rounded-[14px]">
                    <Image src={project.afterImage} alt={project.title} fill className="object-cover" />
                  </span>
                </Link>
              ))}
              <Link href="/portfolio" className="mt-3 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-black px-5 text-sm font-extrabold text-white">
                Open portfolio <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-16 sm:px-8 md:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="surface-card rounded-[18px] p-6">
                <Icon />
                <h3 className="mt-8 text-2xl font-extrabold">{service.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-neutral-600">{service.copy}</p>
              </div>
            );
          })}
        </section>

        <section className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8">
          <div className="before-after-frame grid overflow-hidden rounded-[22px] p-4 text-white lg:grid-cols-[0.9fr_1.1fr] lg:p-6">
            <div className="flex flex-col justify-between p-5 lg:p-8">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-white/55">Before and after</p>
                <h2 className="mt-5 max-w-lg text-5xl font-extrabold leading-[1] tracking-normal sm:text-6xl">
                  Same footprint. Completely different feeling.
                </h2>
              </div>
              <p className="mt-8 max-w-md text-sm font-medium leading-7 text-white/62">
                The best kitchen work does not always begin with more space. It
                begins with better decisions: cabinet rhythm, storage depth,
                light, material, and the discipline to remove visual noise.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative min-h-[430px] overflow-hidden rounded-[18px]">
                <Image src={images.beforeKitchen} alt="Kitchen before renovation" fill className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-black">Before</span>
              </div>
              <div className="relative min-h-[430px] overflow-hidden rounded-[18px]">
                <Image src={images.afterKitchen} alt="Kitchen after renovation" fill className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-black">After</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8">
          <div className="grid gap-4 rounded-[22px] bg-black p-4 text-white md:grid-cols-4">
            {process.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="p-5">
                  <Icon />
                  <h3 className="mt-8 text-2xl font-extrabold">{step.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-white/62">{step.copy}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
