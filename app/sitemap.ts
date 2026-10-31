import type { MetadataRoute } from "next";
import { site } from "@/site";
import { guides } from "./blog/content";

const routes = [
  { path: "", priority: 1 },
  { path: "/portfolio", priority: 0.85 },
  { path: "/gallery", priority: 0.8 },
  { path: "/about", priority: 0.75 },
  { path: "/contact", priority: 0.75 },
  { path: "/blog", priority: 0.8 },
  { path: "/blog/editorial-policy", priority: 0.3 },
  ...guides.map(guide => ({ path: `/blog/${guide.slug}`, priority: 0.7 })),
  { path: "/privacy-policy", priority: 0.35 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
