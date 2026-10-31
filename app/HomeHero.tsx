"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { profileImages } from "./profile-data";
const slides = [
  { src: profileImages.living, label: "Living & dining", category: "Residential interiors", position: "center 55%" },
  { src: profileImages.office, label: "Glass & workspace", category: "Commercial interiors", position: "center" },
  { src: profileImages.kitchen, label: "Kitchen & cabinetry", category: "Custom joinery", position: "center" },
];
export function HomeHero() {
  const [active, setActive] = useState(0);
  const [requested, setRequested] = useState(0);
  const [visited, setVisited] = useState([0]);
  const loaded = useRef(new Set<number>());
  const showSlide = (index: number) => {
    setRequested(index);
    setVisited(previous => previous.includes(index) ? previous : [...previous, index]);
    if (loaded.current.has(index)) setActive(index);
  };
  return <section className="studio-hero" aria-label="Steed Art interiors">
    <div className="hero-heading studio-wrap">
      <div className="hero-topline"><span className="eyebrow"><i /> Interior design & renovation</span><span className="eyebrow hero-location">Karachi, Pakistan</span></div>
      <h1 className="hero-title">Spaces, thoughtfully<br /><span>designed</span> & built<span className="hero-period">.</span></h1>
      <div className="hero-description"><p>Homes to settle into. Places to do your best work.<br className="desktop-break" /> Design and execution, brought together by Steed Art.</p><Link className="text-link" href="/contact#project-enquiry">Let’s discuss your space <ArrowUpRight size={20} /></Link></div>
    </div>
    <div className="hero-photograph" aria-busy={requested !== active}>
      {slides.map((slide, index) => visited.includes(index) && <Image key={slide.src} src={slide.src} alt={`${slide.label}, photographed for the Steed Art company profile`} aria-hidden={index !== active} fill preload={index === 0} loading={index === requested && index !== 0 ? "eager" : undefined} sizes="100vw" className={`hero-photo ${active === index ? "is-active" : ""}`} style={{ objectPosition: slide.position }} onLoad={() => { loaded.current.add(index); if (index === requested) setActive(index); }} />)}
      <div className="hero-photo-shade" />
      <div className="hero-photo-bottom studio-wrap"><a className="hero-explore" href="#selected-work"><span className="round-arrow"><ArrowDown size={20} /></span><span>Explore our work</span></a><div className="hero-caption" aria-live="polite"><span>{slides[active].category}</span><strong>{slides[active].label}</strong></div><div className="hero-controls"><button aria-label="Previous project photograph" onClick={() => showSlide((requested + slides.length - 1) % slides.length)}><ArrowLeft size={18} /></button><span>0{active + 1}<span> / 03</span></span><button aria-label="Next project photograph" onClick={() => showSlide((requested + 1) % slides.length)}><ArrowRight size={18} /></button></div></div>
    </div>
    <div className="hero-footnote studio-wrap"><span>Residential & commercial interiors</span><span>From planning to handover <ArrowUpRight size={14} /></span></div>
  </section>;
}
