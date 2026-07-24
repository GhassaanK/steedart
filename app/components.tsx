import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { site } from "@/site";
import { portfolio, services } from "./data";
import { MobileMenu } from "./MobileMenu";

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
          <div className="mt-8 flex flex-wrap gap-3">
            <ContactButton href={`mailto:${site.email}`} icon={<Mail size={17} />} label={site.email} />
            <ContactButton href={site.socials.whatsapp} icon={<MessageCircle size={17} />} label="WhatsApp" />
          </div>
        </div>
        <div className="grid gap-9 sm:grid-cols-3">
          <FooterColumn title="Studio" links={site.nav} />
          <FooterColumn
            title="Services"
            links={services.map((service) => ({ label: service.title, href: "/portfolio" }))}
          />
          <div>
            <h3 className="text-sm font-bold text-white">Social</h3>
            <div className="mt-5 flex gap-3">
              <IconLink href={site.socials.instagram} label="Instagram">
                <FaInstagram size={18} />
              </IconLink>
              <IconLink href={site.socials.facebook} label="Facebook">
                <FaFacebookF size={16} />
              </IconLink>
              <IconLink href={site.socials.whatsapp} label="WhatsApp">
                <FaWhatsapp size={18} />
              </IconLink>
            </div>
            <p className="mt-8 text-5xl font-black tracking-tight">Steed Art</p>
          </div>
        </div>
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

function ContactButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold text-black transition hover:bg-[#d9c6b4]"
    >
      {icon}
      {label}
    </a>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-black"
    >
      {children}
    </a>
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
}: {
  src: string;
  alt: string;
  title: string;
  label: string;
  copy?: string;
  notch?: boolean;
  className?: string;
}) {
  return (
    <article className={`${notch ? "card-notch" : ""} group relative overflow-hidden rounded-[16px] bg-neutral-900 ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-transparent" />
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-neutral-900 backdrop-blur">
        {label}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
        <div>
          <h3 className="max-w-[calc(100%-68px)] text-2xl font-extrabold leading-tight tracking-normal">{title}</h3>
          {copy ? <p className="mt-2 max-w-[220px] text-xs font-semibold leading-5 text-white/72">{copy}</p> : null}
        </div>
        {notch ? (
          <span className="notch-button">
            <ArrowUpRight size={19} />
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function PortfolioGrid() {
  return (
    <div className="mx-auto grid max-w-[1360px] gap-4 px-5 pb-16 sm:px-8 md:grid-cols-3">
      {portfolio.map((item, index) => (
        <ImageCard
          key={item.title}
          src={item.image}
          alt={item.title}
          title={item.title}
          label={item.category}
          copy={item.copy}
          className={index === 1 ? "min-h-[520px] md:row-span-2" : "min-h-[285px]"}
        />
      ))}
    </div>
  );
}

export function ContactStrip() {
  return (
    <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-12 sm:px-8 lg:grid-cols-3">
      <a href={`mailto:${site.email}`} className="surface-card rounded-[18px] p-6 transition hover:bg-[#eadfd4]">
        <Mail />
        <p className="mt-8 text-sm text-neutral-500">Email</p>
        <h3 className="mt-2 text-2xl font-extrabold">{site.email}</h3>
      </a>
      <a href={`tel:${site.phone}`} className="surface-card rounded-[18px] p-6 transition hover:bg-[#eadfd4]">
        <Phone />
        <p className="mt-8 text-sm text-neutral-500">Phone</p>
        <h3 className="mt-2 text-2xl font-extrabold">{site.phone}</h3>
      </a>
      <a href={site.socials.whatsapp} className="rounded-[18px] bg-neutral-950 p-6 text-white transition hover:bg-[#6d4b34]">
        <FaWhatsapp size={24} />
        <p className="mt-8 text-sm text-white/55">WhatsApp</p>
        <h3 className="mt-2 text-2xl font-extrabold">Start a conversation</h3>
      </a>
    </section>
  );
}
