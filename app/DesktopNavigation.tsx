"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, X } from "lucide-react";
import type { GuideNavigationGroup } from "./guide-navigation";

export function DesktopNavigation({ items, guideGroups }: {
  items: { label: string; href: string }[];
  guideGroups: GuideNavigationGroup[];
}) {
  const [open, setOpen] = useState(false);
  const boundary = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusOnOpen = useRef(false);
  const openedByHover = useRef(false);
  const pathname = usePathname();

  const clearCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  useEffect(() => {
    return () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (focusOnOpen.current) {
      panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      focusOnOpen.current = false;
    }
    const outside = (event: PointerEvent) => {
      if (!boundary.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const resize = () => { if (window.matchMedia("(max-width: 79.999rem)").matches) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  return (
    <nav className="studio-nav" aria-label="Main navigation">
      {items.map(item => item.href !== "/blog" ? (
        <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>
      ) : (
        <div key={item.href} ref={boundary} className="guide-menu-boundary"
          onPointerEnter={event => { if (event.pointerType === "mouse") { clearCloseTimer(); if (!open) openedByHover.current = true; setOpen(true); } }}
          onPointerLeave={event => {
            if (event.pointerType !== "mouse") return;
            clearCloseTimer();
            closeTimer.current = setTimeout(() => {
              if (!boundary.current?.contains(document.activeElement)) setOpen(false);
            }, 180);
          }}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
          <button ref={trigger} type="button" className="guide-menu-trigger" aria-expanded={open} aria-controls="renovation-guide-menu"
            onClick={() => {
              clearCloseTimer();
              if (openedByHover.current) { openedByHover.current = false; setOpen(true); }
              else setOpen(value => !value);
            }}
            onKeyDown={event => {
              if (event.key === "ArrowDown") {
                event.preventDefault(); clearCloseTimer(); openedByHover.current = false;
                if (open) panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
                else { focusOnOpen.current = true; setOpen(true); }
              }
            }}>
            Renovation Guide <ChevronDown size={13} className={open ? "is-open" : ""} />
          </button>
          <div ref={panel} id="renovation-guide-menu" className="guide-mega-panel" hidden={!open}>
            <div className="studio-wrap">
              <div className="guide-mega-top"><div><p className="eyebrow">The renovation guide</p><p>Useful answers. One place to start.</p></div><button type="button" aria-label="Close renovation guide" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={19} /></button></div>
              <div className="guide-mega-columns">
                {guideGroups.map(group => <section key={group.id} className="guide-mega-column" aria-labelledby={`guide-column-${group.id}`}>
                  <h2 id={`guide-column-${group.id}`}><Link href={group.href} onClick={() => setOpen(false)}>{group.title}</Link></h2>
                  <p>{group.description}</p>
                  <ul>{group.links.map(link => <li key={link.href}><Link href={link.href} onClick={() => setOpen(false)}><span>{link.label}{link.kind === "section" && <small>In the guide</small>}</span><ArrowUpRight size={14} aria-hidden="true" /></Link></li>)}</ul>
                </section>)}
              </div>
              <div className="guide-mega-bottom"><Link href="/blog" onClick={() => setOpen(false)}>Explore all guides <ArrowRight size={17} /></Link><Link href="/contact#project-enquiry" onClick={() => setOpen(false)}>Have a question about your space? <ArrowUpRight size={16} /></Link></div>
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
}
