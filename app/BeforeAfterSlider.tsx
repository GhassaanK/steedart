"use client";

import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { useId, useRef, useState, type PointerEvent } from "react";

export function BeforeAfterSlider({
  beforeSrc, afterSrc, beforeAlt, afterAlt,
  beforeLabel = "Before", afterLabel = "After", caption,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  const [position, setPosition] = useState(50);
  const dragging = useRef<number | null>(null);
  const id = useId();

  const updateFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width) setPosition(Math.round(Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100))));
  };

  return (
    <figure className="before-after-comparison">
      <div className="comparison-stage"
        onPointerDown={event => {
          if (!event.isPrimary || event.button !== 0) return;
          dragging.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromPointer(event);
        }}
        onPointerMove={event => { if (dragging.current === event.pointerId) updateFromPointer(event); }}
        onPointerUp={() => { dragging.current = null; }}
        onPointerCancel={() => { dragging.current = null; }}
        onLostPointerCapture={() => { dragging.current = null; }}>
        <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 1400px) 100vw, 1280px" className="comparison-image" draggable={false} />
        <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={beforeSrc} alt={beforeAlt} fill sizes="(max-width: 1400px) 100vw, 1280px" className="comparison-image" draggable={false} />
        </div>
        <div className="comparison-labels" aria-hidden="true"><span>{beforeLabel}</span><span>{afterLabel}</span></div>
        <div className="comparison-divider" style={{ left: `${position}%` }} aria-hidden="true"><span><ChevronsLeftRight size={24} /></span></div>
        <span className="comparison-drag-hint" aria-hidden="true">Drag to compare</span>
      </div>
      <div className="comparison-controls">
        <button type="button" onClick={() => setPosition(100)} aria-label={`Show the full ${beforeLabel.toLowerCase()} image`}>{beforeLabel}</button>
        <label className="sr-only" htmlFor={id}>Compare {beforeLabel.toLowerCase()} and {afterLabel.toLowerCase()}</label>
        <input id={id} type="range" min={0} max={100} step={1} value={position}
          aria-describedby={`${id}-instructions`} aria-valuetext={`${position}% of the ${beforeLabel.toLowerCase()} image visible`}
          onChange={event => setPosition(Number(event.target.value))} />
        <button type="button" onClick={() => setPosition(0)} aria-label={`Show the full ${afterLabel.toLowerCase()} image`}>{afterLabel}</button>
      </div>
      <figcaption className="comparison-caption"><p id={`${id}-instructions`}>Drag the divider or use the slider. Use arrow keys when the slider is focused.</p>{caption && <p>{caption}</p>}</figcaption>
    </figure>
  );
}
