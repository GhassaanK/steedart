"use client";

import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { useState } from "react";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="group relative min-h-[430px] overflow-hidden rounded-[18px] bg-neutral-900 sm:min-h-[520px]">
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="select-none object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="select-none object-cover"
          draggable={false}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-black shadow-lg">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black px-4 py-2 text-xs font-extrabold text-white shadow-lg">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.16)]"
        style={{ left: `${position}%` }}
      >
        <span className="before-after-handle absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.34)] transition group-hover:scale-105">
          <ChevronsLeftRight size={20} strokeWidth={2.4} />
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Reveal before and after kitchen renovation"
        aria-valuetext={`${position}% before image visible`}
        className="before-after-range absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />

      <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/65 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
        Drag to compare
      </p>
    </div>
  );
}
