import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { PageShell } from "../../components";
import { JsonLd } from "../../JsonLd";
import { Reveal } from "../../Reveal";
import { getGuide, getTopic, guides, readingMinutes } from "../content";
import { guideMetadata, guideStructuredData, guideSummary } from "../helpers";
import { GuideCard } from "../GuideCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(guide => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return guideMetadata(guide);
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const topic = getTopic(guide.topic)!;
  const related = guide.related.map(getGuide).filter(item => item !== undefined);

  return (
    <PageShell>
      <main id="main-content">
        <JsonLd data={guideStructuredData(guide)} />
        <article>
          <header className="studio-wrap guide-header">
            <nav className="guide-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Guides</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.title}</span></nav>
            <Reveal><p className="eyebrow">The Steed Art Journal / {topic.name}</p><h1>{guide.title}</h1><div className="guide-byline"><span>Published by <Link href="/about">Steed Art</Link></span><span>{readingMinutes(guide)} min read</span><span>Planning guide</span></div></Reveal>
          </header>
          <div className="studio-wrap guide-cover"><Image src={guide.image} alt={guide.imageAlt} fill preload sizes="(max-width: 1400px) 100vw, 1360px" /></div>
          <p className="studio-wrap guide-image-caption">Photography from the Steed Art company profile.</p>
          <div className="studio-wrap guide-layout">
            <aside className="guide-sidebar" aria-label="On this page"><p className="eyebrow">In this guide</p><nav><a href="#short-answer">The short answer</a>{guide.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}<a href="#common-questions">Common questions</a></nav><Link href="/contact#project-enquiry" className="text-link">Discuss your project <ArrowUpRight size={16} /></Link></aside>
            <div className="guide-body">
              <section id="short-answer" className="guide-short-answer"><p className="eyebrow">The short answer</p><p>{guide.answer}</p></section>
              <section className="guide-takeaways" aria-labelledby="takeaways"><h2 id="takeaways">Keep these in mind</h2><ul>{guide.takeaways.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul></section>
              {guide.sections.map(section => <section className="guide-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                {section.checklist && <ul className="guide-checklist">{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}
                {section.table && <div className="guide-table-wrap" role="region" aria-label={section.title} tabIndex={0}><table><caption className="sr-only">{section.title}</caption><thead><tr>{section.table.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>}
              </section>)}
              <section className="guide-section guide-questions" id="common-questions"><h2>Common questions</h2>{guide.questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</section>
              <div className="guide-editorial-note"><p>About this guide</p><p>This planning guide draws on Steed Art’s company profile and service scope. Photographs show work included in that profile. Confirm specifications, prices, responsibilities and programme against your own property and written agreement.</p><Link href="/blog/editorial-policy">Read our editorial approach</Link></div>
              <div className="guide-action"><p className="eyebrow">Take the next step</p><h2>Bring the questions.<br />We’ll discuss the space.</h2><p>Share photographs, plans if available and a short description of what you want to change.</p><div><Link href="/contact#project-enquiry" className="text-link">Discuss your project <ArrowUpRight size={17} /></Link><Link href="/portfolio" className="text-link">Explore our work <ArrowUpRight size={17} /></Link></div></div>
            </div>
          </div>
        </article>
        <section className="studio-wrap guide-related section-space"><Reveal className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2 className="display-heading">Your next<br />useful read.</h2></div><Link href="/blog" className="text-link"><ArrowLeft size={16} /> All guides</Link></Reveal><div className="guide-card-grid">{related.map(item => <GuideCard key={item.slug} guide={guideSummary(item)} />)}</div></section>
      </main>
    </PageShell>
  );
}
