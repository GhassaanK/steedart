import type { MetadataRoute } from "next";
import { site } from "@/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/portfolio", priority: 0.85 },
  { path: "/gallery", priority: 0.8 },
  { path: "/about", priority: 0.75 },
  { path: "/contact", priority: 0.75 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
