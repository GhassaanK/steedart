import type { Metadata } from "next";
import { site } from "@/site";
import { getTopic, readingMinutes, type Guide } from "./content";
import type { GuideSummary } from "./GuideCard";

export function guideSummary(guide: Guide): GuideSummary {
  return {
    slug: guide.slug, title: guide.title, description: guide.description,
    topic: guide.topic, topicName: getTopic(guide.topic)!.name,
    image: guide.image, imageAlt: guide.imageAlt, minutes: readingMinutes(guide),
  };
}

export function guideMetadata(guide: Guide): Metadata {
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: `/blog/${guide.slug}` },
    authors: [{ name: site.name, url: `${site.url}/about` }],
    openGraph: {
      type: "article", title: guide.seoTitle, description: guide.description,
      url: `/blog/${guide.slug}`, siteName: site.name, locale: "en_PK",
      authors: [`${site.url}/about`],
      images: [{ url: guide.image, alt: guide.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: guide.seoTitle, description: guide.description, images: [guide.image] },
  };
}

export function guideStructuredData(guide: Guide) {
  const url = `${site.url}/blog/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#article`, url,
        headline: guide.title, description: guide.description,
        image: [`${site.url}${guide.image}`], articleSection: getTopic(guide.topic)!.name,
        inLanguage: "en-PK", isAccessibleForFree: true,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Organization", "@id": `${site.url}/#business`, name: site.name, url: `${site.url}/about` },
        publisher: { "@id": `${site.url}/#business` },
        isPartOf: { "@id": `${site.url}/blog#blog` },
        about: { "@type": "Thing", name: getTopic(guide.topic)!.name },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };
}
