import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PageShell } from "./components";
import { HomeHero } from "./HomeHero";
import { Reveal } from "./Reveal";
import { ServiceExplorer } from "./ServiceExplorer";
import { profileImages, profileProcess, profileWork } from "./profile-data";
import { FaqAccordion } from "./FaqAccordion";
import { JsonLd } from "./JsonLd";
import { faqs } from "./faq-data";
import { JournalPreview } from "./JournalPreview";
import { TransformationShowcase } from "./TransformationShowcase";
import { getVerifiedProjectComparisons } from "./lib/server-cms";

export default async function Home() {
  const comparisons = await getVerifiedProjectComparisons();
  return <PageShell><main id="main-content">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
    <HomeHero />
    <section className="studio-wrap studio-intro section-space">
      <Reveal><p className="eyebrow section-label"><span>01 / The studio</span><span className="small-cross">+</span></p></Reveal>
      <Reveal delay={100}><h2 className="display-heading">The whole space.<br /><span className="muted-word">Considered together.</span></h2><div className="intro-copy"><p>Steed Art is a Karachi-based interior design and renovation business for homeowners and commercial clients. We bring design and execution into one coordinated project.</p><p>From the layout to the last fitting, we consider how your space will work, feel and come together.</p><Link href="/about" className="text-link">Meet Steed Art <ArrowUpRight size={18} /></Link></div></Reveal>
    </section>
    {comparisons.length > 0 && <TransformationShowcase comparisons={comparisons} />}
    <section id="selected-work" className="studio-wrap section-space work-section">
      <Reveal className="section-heading"><div><p className="eyebrow">02 / Selected work</p><h2 className="display-heading">A closer look<br />at what we do.</h2></div><div className="section-heading-aside"><p>Residential spaces. Working environments.<br />Details made for the way you live.</p><Link className="text-link" href="/portfolio">Explore the portfolio <ArrowUpRight size={18} /></Link></div></Reveal>
      <div className="editorial-work-grid">{profileWork.slice(0, 4).map((project, i) => <Reveal key={project.id} delay={(i % 2) * 130} className={`work-item work-item-${i}`}><Link href={`/portfolio#project-${project.id}`} className="work-image-link"><div className="work-image"><Image src={project.image} alt={project.copy} fill sizes="(max-width: 700px) 100vw, 50vw" /><span className="work-open"><ArrowUpRight size={24} /></span><span className="work-index">0{i + 1}</span></div><div className="work-caption"><div><p className="eyebrow">{project.category}</p><h3>{project.title}</h3></div><ArrowUpRight size={22} /></div></Link></Reveal>)}</div>
    </section>
    <section className="services-section section-space" id="services"><div className="studio-wrap"><Reveal className="section-heading"><div><p className="eyebrow">03 / Our expertise</p><h2 className="display-heading">From first plans<br />to finishing touches.</h2></div><p className="section-heading-aside">A turnkey approach to the work after the grey structure, shaped around your property and an agreed scope.</p></Reveal><Reveal><ServiceExplorer /></Reveal></div></section>
    <section className="approach-section"><div className="approach-photo"><Image src={profileImages.executive} alt="Executive office with custom desk, illuminated display joinery and feature wall from the Steed Art profile" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="approach-content"><Reveal><p className="eyebrow">04 / Our approach</p><h2 className="display-heading">Good design<br />should work<br /><span>beautifully.</span></h2><p>We consider how a space will be used before choosing the finishes that define it. Layout, storage and lighting belong in the same conversation.</p><Link href="/contact" className="text-link">Tell us about your space <ArrowUpRight size={18} /></Link></Reveal></div></section>
    <section className="studio-wrap section-space process-section"><Reveal className="section-heading"><div><p className="eyebrow">05 / How we work</p><h2 className="display-heading">A clear route<br />to completion.</h2></div><p className="section-heading-aside">Each stage connects your brief with the finished space, from the first conversation to handover.</p></Reveal><div className="process-track">{profileProcess.map(([title, copy], i) => <Reveal key={title} delay={i * 90}><div className="process-step"><div className="process-marker"><span>0{i + 1}</span><ArrowRight size={16} /></div><h3>{title}</h3><p>{copy}</p></div></Reveal>)}</div></section>
    <JournalPreview />
    <div className="studio-faq"><FaqAccordion /></div>
  </main></PageShell>;
}
