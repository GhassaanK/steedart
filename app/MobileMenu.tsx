"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { site } from "@/site";
import { useDialog } from "./useDialog";
import type { GuideNavigationGroup } from "./guide-navigation";

export function MobileMenu({ guideGroups }: { guideGroups: GuideNavigationGroup[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const pathname = usePathname();
  const ref = useDialog(isOpen, () => setIsOpen(false));
  const close = () => { setIsOpen(false); setGuidesOpen(false); };

  return (
    <div className="lg:hidden">
      <button className="mobile-menu-trigger" aria-label="Open menu" aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(true)}><Menu size={22} /></button>
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={event => { if (event.target === event.currentTarget) close(); }}>
          <div ref={ref} id="mobile-navigation" className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <div className="mobile-menu-top"><span className="eyebrow">Steed Art / Navigation</span><button aria-label="Close menu" onClick={close}><X size={22} /></button></div>
            <nav aria-label="Mobile">
              {site.nav.map((item, index) => item.href !== "/blog" ? (
                <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={close}><span className="eyebrow">0{index + 1}</span><span>{item.label}</span><ArrowUpRight size={19} /></Link>
              ) : (
                <div key={item.href} className="mobile-guide-group">
                  <button type="button" className="mobile-menu-guide-trigger" aria-expanded={guidesOpen} aria-controls="mobile-guide-topics" onClick={() => setGuidesOpen(value => !value)}><span className="eyebrow">0{index + 1}</span><span>Renovation Guide</span><ChevronDown size={19} className={guidesOpen ? "is-open" : ""} /></button>
                  <div id="mobile-guide-topics" className="mobile-guide-topics" hidden={!guidesOpen}>
                    <Link href="/blog" className="mobile-all-guides" onClick={close}>Explore all guides <ArrowUpRight size={15} /></Link>
                    {guideGroups.map(group => (
                      <details key={group.id} className="mobile-guide-topic">
                        <summary>{group.title}<ChevronDown size={15} /></summary>
                        <ul>{group.links.map(link => <li key={link.href}><Link href={link.href} onClick={close}>{link.label}{link.kind === "section" && <small>In the guide</small>}</Link></li>)}</ul>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="mobile-menu-bottom"><p>Interior design & turnkey renovation.<br />Residential and commercial. Karachi.</p><Link href="/contact" onClick={close} className="text-link">Start a conversation <ArrowUpRight size={18} /></Link></div>
          </div>
        </div>
      )}
    </div>
  );
}
