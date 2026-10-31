import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type GuideSummary = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  topicName: string;
  image: string;
  imageAlt: string;
  minutes: number;
};

export function GuideCard({ guide }: { guide: GuideSummary }) {
  return (
    <Link href={`/blog/${guide.slug}`} className="guide-card">
      <div className="guide-card-image">
        <Image src={guide.image} alt={guide.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span className="guide-card-arrow"><ArrowUpRight size={20} /></span>
      </div>
      <div className="guide-card-meta"><span className="eyebrow">{guide.topicName}</span><span>{guide.minutes} min read</span></div>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <span className="guide-card-link">Read the guide <ArrowUpRight size={16} /></span>
    </Link>
  );
}
