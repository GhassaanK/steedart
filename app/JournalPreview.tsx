import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { guides } from "./blog/content";
import { guideSummary } from "./blog/helpers";
import { GuideCard } from "./blog/GuideCard";

export function JournalPreview() {
  return <section className="studio-wrap section-space journal-home-preview">
    <Reveal className="section-heading"><div><p className="eyebrow">From the journal</p><h2 className="display-heading">A clearer start<br />for your next space.</h2></div><div className="section-heading-aside"><p>Practical answers to the questions that come before a renovation.</p><Link href="/blog" className="text-link">Explore all guides <ArrowUpRight size={18} /></Link></div></Reveal>
    <div className="guide-card-grid">{guides.slice(0, 3).map((guide, index) => <Reveal key={guide.slug} delay={index * 80}><GuideCard guide={guideSummary(guide)} /></Reveal>)}</div>
  </section>;
}
