import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/site";
import { PageShell } from "../components";
import { Reveal } from "../Reveal";
import { JsonLd } from "../JsonLd";
import { guides, topics } from "./content";
import { guideSummary } from "./helpers";
import { GuideLibrary } from "./GuideLibrary";

export const metadata: Metadata = {
  title: "Renovation & Interior Design Guides for Karachi",
  description: "Practical answers to renovation questions: turnkey scope, planning, quotations, kitchens, office fit-outs and handover. Explore Steed Art's guides.",
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", title: "The Steed Art Journal | Renovation Guides", description: "A clearer starting point for your home or workplace renovation.", url: "/blog", images: [{ url: guides[0].image, alt: guides[0].imageAlt }] },
  twitter: { card: "summary_large_image", title: "The Steed Art Journal", description: "Practical guides for planning your home or workplace renovation.", images: [guides[0].image] },
};

export default function BlogPage() {
  const featured = guides[0];
  return (
    <PageShell>
      <main id="main-content">
        <JsonLd data={{
          "@context": "https://schema.org", "@type": "Blog", "@id": `${site.url}/blog#blog`,
          name: "The Steed Art Journal", url: `${site.url}/blog`, description: metadata.description,
          publisher: { "@id": `${site.url}/#business` }, inLanguage: "en-PK",
          blogPost: guides.map(guide => ({ "@type": "BlogPosting", "@id": `${site.url}/blog/${guide.slug}#article`, headline: guide.title, url: `${site.url}/blog/${guide.slug}` })),
        }} />
        <section className="studio-wrap interior-heading journal-heading">
          <Reveal><p className="eyebrow">The journal / Ideas & answers</p><h1 className="interior-title">Good questions.<br /><em>Clearer decisions.</em></h1></Reveal>
          <Reveal delay={120}><p>Planning a home or a workplace? Start with useful answers about the decisions, scope and details behind a renovation.</p><a href="#guide-library" className="text-link">Find your starting point <ArrowDown size={17} /></a></Reveal>
        </section>
        <section className="studio-wrap journal-featured" aria-label="Start here">
          <Reveal><Link href={`/blog/${featured.slug}`} className="journal-featured-link">
            <div className="journal-featured-image"><Image src={featured.image} alt={featured.imageAlt} fill preload sizes="(max-width: 800px) 100vw, 58vw" /></div>
            <div className="journal-featured-copy"><p className="eyebrow">Start here / Planning</p><h2>{featured.title}</h2><p>What happens after the grey structure? Understand the scope, the decisions and the questions to ask before work begins.</p><span className="text-link">Read the guide <ArrowUpRight size={19} /></span></div>
          </Link></Reveal>
        </section>
        <section className="studio-wrap section-space journal-library-section" aria-labelledby="library-title">
          <Reveal className="section-heading"><div><p className="eyebrow">A little clarity goes a long way</p><h2 id="library-title" className="display-heading">Before you<br />make your next move.</h2></div><p className="section-heading-aside">Browse by topic or search for the decision you are working through. Every guide has its own page, a direct answer and a practical checklist.</p></Reveal>
          <GuideLibrary guides={guides.map(guideSummary)} topics={topics.map(({ slug, name }) => ({ slug, name }))} />
        </section>
        <section className="journal-topic-section section-space"><div className="studio-wrap"><Reveal className="section-heading"><div><p className="eyebrow">Explore the essentials</p><h2 className="display-heading">A place for<br />every stage.</h2></div><Link href="/blog/editorial-policy" className="text-link">How we approach our guides <ArrowUpRight size={17} /></Link></Reveal>
          <div className="journal-topic-grid">{topics.map((topic, index) => <Reveal key={topic.slug} delay={index * 70}><div className="journal-topic" id={`topic-${topic.slug}`}><span className="eyebrow">0{index + 1}</span><h3>{topic.name}</h3><p>{topic.description}</p><ul>{guides.filter(guide => guide.topic === topic.slug).map(guide => <li key={guide.slug}><Link href={`/blog/${guide.slug}`}>{guide.title}<ArrowUpRight size={15} /></Link></li>)}</ul></div></Reveal>)}</div>
        </div></section>
        <section className="studio-wrap journal-question section-space"><Reveal><p className="eyebrow">Still have a question?</p><h2 className="display-heading">Let’s talk about<br /><span className="muted-word">your actual space.</span></h2></Reveal><Reveal delay={100}><p>A guide can help you prepare. Your property, priorities and agreed scope shape the next step.</p><Link href="/contact#project-enquiry" className="text-link">Ask Steed Art <ArrowUpRight size={18} /></Link></Reveal></section>
      </main>
    </PageShell>
  );
}
