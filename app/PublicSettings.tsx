"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { useCmsSettings } from "./lib/useCmsData";

export function FooterContactActions() {
  const { settings, isLoading } = useCmsSettings();

  if (isLoading) {
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        <span className="h-11 w-56 animate-pulse rounded-full bg-white/15" />
        <span className="h-11 w-32 animate-pulse rounded-full bg-white/15" />
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <ContactButton href={`mailto:${settings.email}`} icon={<Mail size={17} />} label={settings.email} />
      <ContactButton href={settings.whatsapp} icon={<MessageCircle size={17} />} label="WhatsApp" />
    </div>
  );
}

export function FooterSocialLinks() {
  const { settings, isLoading } = useCmsSettings();

  if (isLoading) {
    return (
      <div className="mt-5 flex gap-3">
        <span className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
        <span className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
        <span className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
      </div>
    );
  }

  return (
    <div className="mt-5 flex gap-3">
      <IconLink href={settings.instagram} label="Instagram">
        <FaInstagram size={18} />
      </IconLink>
      <IconLink href={settings.facebook} label="Facebook">
        <FaFacebookF size={16} />
      </IconLink>
      <IconLink href={settings.whatsapp} label="WhatsApp">
        <FaWhatsapp size={18} />
      </IconLink>
    </div>
  );
}

export function ContactDetails() {
  const { settings, isLoading } = useCmsSettings();

  if (isLoading) {
    return (
      <div className="grid gap-5">
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
        <div className="flex gap-3 pt-4">
          <span className="h-11 w-11 rounded-full bg-white/14" />
          <span className="h-11 w-11 rounded-full bg-white/14" />
          <span className="h-11 w-11 rounded-full bg-white/14" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 text-sm font-medium text-white/68">
      <p className="flex items-center gap-3"><MapPin size={18} /> {settings.address}</p>
      <p className="flex items-center gap-3"><Mail size={18} /> {settings.email}</p>
      <p className="flex items-center gap-3"><Phone size={18} /> {settings.phone}</p>
      <div className="flex gap-3 pt-4">
        <a href={settings.instagram} aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition hover:bg-[#d9c6b4]"><FaInstagram size={18} /></a>
        <a href={settings.facebook} aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition hover:bg-[#d9c6b4]"><FaFacebookF size={16} /></a>
        <a href={settings.whatsapp} aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition hover:bg-[#d9c6b4]"><FaWhatsapp size={18} /></a>
      </div>
    </div>
  );
}

export function ContactStripLinks() {
  const { settings, isLoading } = useCmsSettings();

  if (isLoading) {
    return (
      <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-12 sm:px-8 lg:grid-cols-3">
        <ContactCardSkeleton />
        <ContactCardSkeleton />
        <ContactCardSkeleton dark />
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-[1360px] gap-4 px-5 py-12 sm:px-8 lg:grid-cols-3">
      <a href={`mailto:${settings.email}`} className="surface-card rounded-[18px] p-6 transition hover:-translate-y-1 hover:bg-[#eadfd4] hover:shadow-lg">
        <Mail />
        <p className="mt-8 text-sm text-neutral-500">Email</p>
        <h3 className="mt-2 text-2xl font-extrabold">{settings.email}</h3>
      </a>
      <a href={`tel:${settings.phone}`} className="surface-card rounded-[18px] p-6 transition hover:-translate-y-1 hover:bg-[#eadfd4] hover:shadow-lg">
        <Phone />
        <p className="mt-8 text-sm text-neutral-500">Phone</p>
        <h3 className="mt-2 text-2xl font-extrabold">{settings.phone}</h3>
      </a>
      <a href={settings.whatsapp} className="rounded-[18px] bg-neutral-950 p-6 text-white transition hover:-translate-y-1 hover:bg-[#6d4b34] hover:shadow-lg">
        <FaWhatsapp size={24} />
        <p className="mt-8 text-sm text-white/55">WhatsApp</p>
        <h3 className="mt-2 text-2xl font-extrabold">Start a conversation</h3>
      </a>
    </section>
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

function SkeletonLine() {
  return <span className="h-5 w-full max-w-xs animate-pulse rounded-full bg-white/14" />;
}

function ContactCardSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`rounded-[18px] p-6 ${dark ? "bg-neutral-950" : "surface-card"}`}>
      <span className={`block h-7 w-7 animate-pulse rounded-full ${dark ? "bg-white/20" : "bg-black/10"}`} />
      <span className={`mt-8 block h-4 w-16 animate-pulse rounded-full ${dark ? "bg-white/15" : "bg-black/10"}`} />
      <span className={`mt-4 block h-8 w-3/4 animate-pulse rounded-full ${dark ? "bg-white/15" : "bg-black/10"}`} />
    </div>
  );
}
