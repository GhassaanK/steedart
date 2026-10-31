"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import type { CmsProject, SiteSettings } from "../lib/cms";
import { useCmsProjects } from "../lib/useCmsData";
import { fallbackProjects } from "../lib/fallback-cms";
import { Reveal } from "../Reveal";
import { useDialog } from "../useDialog";
import { hasVerifiedComparison } from "../lib/project-comparisons";

export function PortfolioExperience({ initialProjects = [], initialSettings }: { initialProjects?: CmsProject[]; initialSettings?: SiteSettings }) {
  const { projects } = useCmsProjects(initialProjects.length ? initialProjects : fallbackProjects, true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All work");
  const active = projects.find(project => project.id === activeId);
  const dialogRef = useDialog(!!active, () => setActiveId(null));
  const categories = ["All work", ...new Set(projects.map(project => project.category).filter(Boolean))];
  const visible = filter === "All work" ? projects : projects.filter(project => project.category === filter);
  useEffect(() => {
    const openHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1)).replace(/^project-/, "");
      if (projects.some(project => project.id === id)) setActiveId(id);
    };
    openHash(); window.addEventListener("hashchange", openHash);
    return () => window.removeEventListener("hashchange", openHash);
  }, [projects]);
  const select = (offset: number) => {
    const index = projects.findIndex(project => project.id === activeId);
    setActiveId(projects[(index + offset + projects.length) % projects.length].id);
  };
  return <>
    <section className="studio-wrap interior-heading"><Reveal><p className="eyebrow">The portfolio / Steed Art</p><h1 className="interior-title">Spaces with<br /><em>purpose.</em></h1></Reveal><Reveal delay={100}><p>{initialSettings?.portfolioCopy || "Residential interiors, commercial fit-outs and custom work. Explore the spaces and details brought together by Steed Art."}</p><Link href="/contact" className="text-link">Discuss your project <ArrowUpRight size={18} /></Link></Reveal></section>
    <section className="studio-wrap portfolio-section"><div className="portfolio-filters" aria-label="Filter projects">{categories.map(category => <button key={category} aria-pressed={filter === category} className={filter === category ? "is-active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="portfolio-cards">{visible.map((project, i) => <Reveal key={project.id} delay={(i % 2) * 100}><button type="button" id={`project-${project.id}`} onClick={() => setActiveId(project.id)} className="portfolio-card work-image-link"><div className="work-image">{project.image || project.afterImage ? <Image src={project.image || project.afterImage} alt={project.copy || project.title} fill sizes="(max-width: 700px) 100vw, 50vw" className="object-cover" /> : <span className="image-missing">{project.title}</span>}<span className="work-open"><ArrowUpRight size={24} /></span></div><div className="work-caption"><div><p className="eyebrow">{project.category}</p><h2>{project.title}</h2></div><ArrowUpRight size={22} /></div><p className="portfolio-card-copy">{project.copy}</p></button></Reveal>)}</div></section>
    {active && <div className="project-overlay" onClick={event => { if (event.target === event.currentTarget) setActiveId(null); }}><div ref={dialogRef} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title"><div className="project-dialog-top"><p className="eyebrow">{active.category}</p><button aria-label="Close project" onClick={() => setActiveId(null)}><X size={22} /></button></div><div className="project-dialog-scroll"><h2 id="project-dialog-title">{active.title}</h2><p className="project-story">{active.story || active.copy}</p><div className="project-meta">{[active.location, active.year, active.budget].filter(Boolean).map(value => <span key={value}>{value}</span>)}</div><div className="project-main-image">{(active.afterImage || active.image) && <Image src={active.afterImage || active.image} alt={active.title} width={1400} height={1000} sizes="(max-width: 700px) 100vw, 1000px" className="object-contain" />}</div><div className="project-scope">{active.scope?.map(scope => <span key={scope}>{scope}</span>)}</div>{hasVerifiedComparison(active) && <div className="project-before"><p className="eyebrow">Before</p><Image src={active.beforeImage} alt={`${active.title} before renovation`} width={800} height={600} sizes="(max-width: 700px) 100vw, 700px" className="object-contain" /></div>}<div className="project-detail-gallery">{active.gallery?.filter(src => src && src !== active.image && src !== active.afterImage).map((src, i) => <Image key={`${src}-${i}`} src={src} alt={`${active.title}, detail ${i + 1}`} width={800} height={700} sizes="(max-width: 700px) 100vw, 500px" className="object-cover" />)}</div>{active.notes?.length > 0 && <div className="project-notes">{active.notes.map(note => <p key={note}>{note}</p>)}</div>}<div className="project-dialog-bottom"><button onClick={() => select(-1)}><ArrowLeft size={18} /> Previous</button><Link href="/contact" className="text-link">Discuss a similar scope <ArrowUpRight size={18} /></Link><button onClick={() => select(1)}>Next <ArrowRight size={18} /></button></div></div></div></div>}
  </>;
}
