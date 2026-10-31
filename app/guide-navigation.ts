import { guides, topics } from "./blog/content";

export type GuideNavigationGroup = {
  id: string;
  title: string;
  href: string;
  description: string;
  links: { label: string; href: string; kind: "guide" | "section" }[];
};

// Built on the server so navigation clients receive links, not full articles.
export function getGuideNavigation(): GuideNavigationGroup[] {
  return topics.map(topic => {
    const articles = guides.filter(guide => guide.topic === topic.slug);
    const articleLinks = articles.map(guide => ({
      label: guide.title,
      href: `/blog/${guide.slug}`,
      kind: "guide" as const,
    }));
    const sectionLinks = articles.flatMap(guide => guide.sections.map(section => ({
      label: section.title,
      href: `/blog/${guide.slug}#${section.id}`,
      kind: "section" as const,
    })));

    return {
      id: topic.slug, title: topic.name, href: `/blog#topic-${topic.slug}`,
      description: topic.description,
      links: [...articleLinks, ...sectionLinks.slice(0, Math.max(0, 5 - articleLinks.length))],
    };
  });
}
