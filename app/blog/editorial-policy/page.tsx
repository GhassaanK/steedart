import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../../components";

export const metadata: Metadata = {
  title: "Our Editorial Approach",
  description: "How Steed Art's renovation guides use company information, real photographs and clear limits on project-specific advice.",
  alternates: { canonical: "/blog/editorial-policy" },
  openGraph: { type: "website", title: "Our Editorial Approach | Steed Art", description: "The sources and principles behind our renovation guides.", url: "/blog/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return <PageShell><main id="main-content"><section className="studio-wrap interior-heading"><div><p className="eyebrow">The journal / Our approach</p><h1 className="interior-title">Useful answers.<br /><em>Honest context.</em></h1></div><p className="section-heading-aside">Our guides help you prepare for a renovation conversation and understand the decisions that need to be made.</p></section><div className="studio-wrap editorial-policy guide-body">
    <section className="guide-section"><h2>What these guides are based on</h2><p>The initial guides draw on Steed Art’s supplied company profile, its stated service scope and its five-stage delivery process. They turn those subjects into planning questions and checklists for homeowners and commercial clients.</p><p>The articles are prepared with AI assistance and published under the business name. They are not presented as personally authored or independently reviewed by a named professional. A site visit, technical assessment or project-specific design cannot be replaced by a general guide.</p></section>
    <section className="guide-section"><h2>Real photographs, clearly described</h2><p>The initial article photographs come from the Steed Art company profile. The photographic selection excludes the profile’s identified 3D office concepts. Images illustrate the relevant type of work; they do not establish a budget, duration or client outcome for your own project.</p></section>
    <section className="guide-section"><h2>Prices, timings and technical requirements</h2><p>The guides do not invent local price ranges, fixed completion times, guarantees or building requirements. Request a specification and quotation for your actual property. Confirm any product-specific requirements with its manufacturer and the responsible project professionals.</p></section>
    <section className="guide-section"><h2>Corrections and new questions</h2><p>If a guide leaves a question unresolved or you notice something that needs clarification, contact Steed Art and include the page title. Material changes should be reflected in the article itself. We do not add invented publication histories, expert credentials or review claims.</p><Link href="/contact" className="text-link">Send a question or correction <ArrowUpRight size={17} /></Link></section>
    <Link href="/blog" className="text-link">Explore the guides <ArrowUpRight size={17} /></Link>
  </div></main></PageShell>;
}
