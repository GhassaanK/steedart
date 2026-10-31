import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
} from "./icons";
import { site } from "@/site";
import { HomePortfolioPreview } from "./HomePortfolioPreview";
import { MobileMenu } from "./MobileMenu";
import { ScrollProgress } from "./ScrollProgress";
import { DesktopNavigation } from "./DesktopNavigation";
import { getGuideNavigation } from "./guide-navigation";
import { ContactStripLinks, FooterContactActions, FooterSocialLinks } from "./PublicSettings";

export function Header() {
  const guideGroups = getGuideNavigation();
  return <header className="studio-header"><div className="studio-wrap header-inner">
    <Link href="/" className="studio-brand" aria-label="Steed Art home"><Image src="/steedartlogo.png" alt="" width={52} height={52} priority /><span>STEED ART<small>INTERIORS & RENOVATION</small></span></Link>
    <DesktopNavigation items={site.nav.filter(item => item.href !== "/contact")} guideGroups={guideGroups} />
    <Link className="header-cta" href="/contact">Start a project <ArrowUpRight size={17} /></Link><MobileMenu guideGroups={guideGroups} />
  </div></header>;
}
export function Footer() {
  return <footer className="studio-footer"><div className="studio-wrap">
    <div className="footer-invitation"><div><p className="eyebrow">Your next chapter starts with a plan</p><h2>Let's talk<br />about <span>your space.</span></h2></div><Link href="/contact#project-enquiry" className="footer-big-arrow" aria-label="Discuss your project"><ArrowUpRight size={56} strokeWidth={1} /></Link></div>
    <div className="footer-details"><div><Link href="/" className="footer-brand">STEED ART</Link><p>Interior design & turnkey renovation.<br />Residential and commercial. Karachi.</p><FooterSocialLinks /></div><div><p className="eyebrow">Explore</p><div className="footer-nav">{site.nav.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div></div><div><p className="eyebrow">Let's connect</p><FooterContactActions /><p className="footer-location">Karachi, Pakistan</p></div></div>
    <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} Steed Art</span><span>Spaces, thoughtfully designed and built.</span><Link href="/privacy-policy">Privacy policy</Link></div>
  </div></footer>;
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-site min-h-screen text-neutral-950">
      <ScrollProgress /><a className="skip-link" href="#main-content">Skip to content</a><Header />
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
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-neutral-900 backdrop-blur">
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
