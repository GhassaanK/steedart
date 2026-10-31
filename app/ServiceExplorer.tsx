"use client";
import Image from "next/image";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { profileServices } from "./profile-data";
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  return <div className="service-explorer"><div className="service-visual">{profileServices.map((service, i) => <Image key={service.title} src={service.image} alt={service.title + " in the Steed Art company profile"} fill sizes="(max-width: 800px) 100vw, 42vw" className={active === i || (active === -1 && i === 0) ? "is-active" : ""} />)}<div className="service-visual-caption"><span>One coordinated scope</span><p>After the grey structure,<br />we take it forward.</p></div></div><div className="service-list">{profileServices.map((service, i) => <div className={`service-row ${active === i ? "is-active" : ""}`} key={service.title}><button aria-expanded={active === i} aria-controls={`service-${i}`} onClick={() => setActive(active === i ? -1 : i)}><span className="service-number">0{i + 1}</span><span>{service.title}</span>{active === i ? <Minus size={18} /> : <Plus size={18} />}</button><div id={`service-${i}`} className="service-answer" inert={active !== i}><div><p>{service.copy}</p><Link href="/contact#project-enquiry" className="text-link">Discuss your scope <ArrowUpRight size={16} /></Link></div></div></div>)}<p className="scope-note">Final inclusions follow the agreed project scope.</p></div></div>;
}
