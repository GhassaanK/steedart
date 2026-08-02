import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { site } from "@/site";
import { services } from "./data";
import { HomePortfolioPreview } from "./HomePortfolioPreview";
import { MobileMenu } from "./MobileMenu";
import { ContactStripLinks, FooterContactActions, FooterSocialLinks } from "./PublicSettings";

export function Header() {
  return (
    <header className="mx-auto w-full max-w-[1360px] px-5 py-5 sm:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Steed Art home">
          <Image
            src="/steedartlogo.png"
            alt="Steed Art logo"
            width={46}
            height={46}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="text-lg font-extrabold tracking-[0.16em] text-neutral-950">
            STEED ART
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-bold text-neutral-700 lg:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-neutral-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden h-10 items-center gap-2 rounded-full bg-neutral-950 px-4 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] lg:inline-flex"
        >
          <MessageCircle size={16} />
          Consult
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <h2 className="max-w-xl text-5xl font-extrabold tracking-normal sm:text-6xl">
            Let&apos;s design the room everyone notices.
          </h2>
          <p className="mt-7 max-w-lg text-sm leading-7 text-white/65">
            Start with your kitchen. Build trust through one beautiful project.
            Then let the rest of the home follow naturally.
          </p>
          <p className="mt-5 max-w-lg text-sm font-semibold leading-7 text-white/45">
            Serving DHA, Clifton, Bahria Town, PECHS, and homes across Karachi.
          </p>
          <FooterContactActions />
        </div>
        <div className="grid gap-9 sm:grid-cols-3">
          <FooterColumn title="Studio" links={site.nav} />
          <FooterColumn
            title="Services"
            links={services.map((service) => ({ label: service.title, href: "/portfolio" }))}
          />
          <div>
            <h3 className="text-sm font-bold text-white">Social</h3>
            <FooterSocialLinks />
            <p className="mt-8 text-5xl font-black tracking-tight">Steed Art</p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1360px] flex-col gap-3 px-5 pb-8 text-xs font-semibold text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Steed Art, Karachi</p>
        <Link href="/privacy-policy" className="w-fit transition hover:text-white">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <div className="mt-5 flex flex-col gap-3 text-sm text-white/58">
        {links.map((link) => (
          <Link key={`${title}-${link.label}`} href={link.href} className="transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export function SectionIntro({
  kicker,
  title,
  copy,
}: {
  kicker?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-16">
      <div>
        {kicker ? <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.22em] text-[#76563f]">{kicker}</p> : null}
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-normal sm:text-7xl">
          {title}
        </h1>
      </div>
      {copy ? <p className="max-w-md text-sm font-medium leading-7 text-neutral-600">{copy}</p> : null}
    </div>
  );
}

export function ImageCard({
  src,
  alt,
  title,
  label,
  copy,
  notch = true,
  className = "",
  href,
  actionLabel,
}: {
  src: string;
  alt: string;
  title: string;
  label: string;
  copy?: string;
  notch?: boolean;
  className?: string;
  href?: string;
  actionLabel?: string;
}) {
  const card = (
    <article className={`${notch ? "card-notch" : ""} group relative h-full overflow-hidden rounded-[16px] bg-neutral-900 ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-transparent" />
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-neutral-900 backdrop-blur">
        {label}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
        <div>
          <h3 className="max-w-[calc(100%-68px)] text-2xl font-extrabold leading-tight tracking-normal">{title}</h3>
          {copy ? <p className="mt-2 max-w-[220px] text-xs font-semibold leading-5 text-white/72">{copy}</p> : null}
          {actionLabel ? (
            <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white/72">
              {actionLabel}
            </p>
          ) : null}
        </div>
        {notch ? (
          <span className="notch-button">
            <ArrowUpRight size={19} />
          </span>
        ) : null}
      </div>
    </article>
  );

  return href ? (
    <Link
      href={href}
      className={`block rounded-[16px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 ${className}`}
      aria-label={`${actionLabel ?? "Explore"}: ${title}`}
    >
      {card}
    </Link>
  ) : (
    card
  );
}

export function PortfolioGrid() {
  return (
    <div className="mx-auto max-w-[1360px] px-5 pb-16 sm:px-8">
      <HomePortfolioPreview />
    </div>
  );
}

export function ContactStrip() {
  return <ContactStripLinks />;
}
