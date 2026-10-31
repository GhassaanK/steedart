import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PageShell } from "../components";
import { Reveal } from "../Reveal";
import { profileImages, profileProcess } from "../profile-data";
export const metadata: Metadata = {
  title: "Interior Design & Renovation Studio in Karachi",
  description: "Steed Art brings interior design and execution together for residential and commercial spaces in Karachi.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Steed Art", description: "Residential and commercial interior design and turnkey renovation in Karachi.", url: "/about", images: [profileImages.living] },
};
export default function AboutPage() {
  return <PageShell><main id="main-content"><section className="studio-wrap interior-heading"><Reveal><p className="eyebrow">The studio / Karachi</p><h1 className="interior-title">A complete approach<br />to <em>interiors.</em></h1></Reveal><Reveal delay={100}><p>Steed Art is a Karachi-based interior design and renovation business serving homeowners and commercial clients. We bring the design and execution into one coordinated project.</p><Link href="/contact" className="text-link">Start a conversation <ArrowUpRight size={18} /></Link></Reveal></section><Reveal className="about-wide-photo"><Image src={profileImages.lounge} alt="Living space with coordinated seating, decorative wall mouldings and dining furniture, from the Steed Art company profile" fill preload sizes="100vw" /></Reveal><section className="studio-wrap section-space studio-intro"><Reveal><p className="eyebrow">Our direction</p></Reveal><Reveal><h2 className="display-heading">Good design should<br /><span className="muted-word">work beautifully.</span></h2><div className="intro-copy"><p>We consider the way a space will be used before selecting the finishes that define it. Layout, storage and lighting are part of the same design conversation.</p><p>Our purpose is to make renovation easier to manage, with a clear connection between your brief and the finished space.</p></div></Reveal></section><section className="services-section section-space"><div className="studio-wrap"><Reveal className="section-heading"><div><p className="eyebrow">What we bring together</p><h2 className="display-heading">Homes. Workplaces.<br />The details in between.</h2></div><p className="section-heading-aside">After the grey structure, we take the remaining interior work forward through one agreed project scope.</p></Reveal><div className="about-capabilities">{[
    ["Residential interiors", "Complete home renovations and focused upgrades, planned around the people who live there.", profileImages.bedroom],
    ["Commercial interiors", "Office interiors and commercial fit-outs with coordinated layouts, furniture and architectural finishes.", profileImages.office],
    ["Custom work", "Joinery, furniture, decorative screens, railings and fabrication made around the space.", profileImages.joinery],
  ].map(([title, copy, image], i) => <Reveal key={title} delay={i * 100}><div className="about-capability-image"><Image src={image} alt={title + " from the Steed Art company profile"} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div></section><section className="studio-wrap section-space"><Reveal className="section-heading"><div><p className="eyebrow">Project delivery</p><h2 className="display-heading">A clear route<br />to completion.</h2></div></Reveal><div className="process-track">{profileProcess.map(([title, copy], i) => <Reveal key={title} delay={i * 90}><div className="process-step"><div className="process-marker"><span>0{i + 1}</span><ArrowRight size={16} /></div><h3>{title}</h3><p>{copy}</p></div></Reveal>)}</div></section></main></PageShell>;
}
