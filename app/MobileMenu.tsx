"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/site";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition hover:bg-[#6d4b34]"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={20} strokeWidth={2.4} />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/38 p-3 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Dismiss navigation"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-navigation"
            className="relative ml-auto flex h-full w-full max-w-[390px] flex-col overflow-hidden rounded-[28px] bg-white text-neutral-950 shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-neutral-500">
                  Steed Art
                </p>
                <p className="mt-1 text-sm font-bold text-neutral-950">
                  Karachi interiors
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f0ea] text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} strokeWidth={2.4} />
              </button>
            </div>

            <nav className="grid gap-2 px-3 pt-4" aria-label="Mobile">
              {site.nav.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex min-h-[72px] items-center justify-between rounded-[22px] px-5 text-2xl font-black tracking-normal transition ${
                      isActive
                        ? "bg-neutral-950 text-white"
                        : "bg-[#f4f0ea] text-neutral-950 hover:bg-[#e8ddd0]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-xs font-black tracking-[0.18em] ${
                        isActive ? "text-white/55" : "text-neutral-400"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto px-5 pb-5 pt-7">
              <p className="max-w-[280px] text-sm leading-6 text-neutral-600">
                Kitchen cabinetry, shelving, furniture and full home interiors
                for considered Karachi homes.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex h-12 w-full items-center justify-between rounded-full bg-neutral-950 px-5 text-sm font-black text-white transition hover:bg-[#6d4b34]"
                onClick={() => setIsOpen(false)}
              >
                Book a consultation
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
