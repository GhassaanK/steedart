"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Reveal } from "./Reveal";
import type { ProjectComparison } from "./lib/project-comparisons";

export function TransformationShowcase({ comparisons }: {
  comparisons: ProjectComparison[];
}) {
  const [activeId, setActiveId] = useState(comparisons[0]?.id);
  const active = comparisons.find(item => item.id === activeId) || comparisons[0];
  if (!active) return null;

  return (
    <section className="transformation-section section-space" id="transformations" aria-labelledby="transformation-heading">
      <div className="studio-wrap">
        <Reveal className="section-heading"><div><p className="eyebrow">Before & after / The transformation</p><h2 id="transformation-heading" className="display-heading">See the difference.<br /><span>Explore the possibilities.</span></h2></div><div className="section-heading-aside"><p>A closer look at how a space changes. Move the divider to explore the room before and after the work.</p><Link href="/contact#project-enquiry" className="text-link">Discuss your transformation <ArrowUpRight size={18} /></Link></div></Reveal>
        {comparisons.length > 1 && <div className="transformation-choices" role="group" aria-label="Choose a before and after comparison">{comparisons.map(item => <button type="button" key={item.id} aria-pressed={item.id === active.id} onClick={() => setActiveId(item.id)}>{item.title}</button>)}</div>}
        <div className="transformation-title" aria-live="polite"><h3>{active.title}</h3><span className="eyebrow">Verified project photography</span></div>
        <BeforeAfterSlider key={active.id} beforeSrc={active.before} afterSrc={active.after} beforeAlt={active.beforeAlt} afterAlt={active.afterAlt}
          caption="Before and after photographs confirmed by Steed Art." />
      </div>
    </section>
  );
}
