import type { CmsProject } from "./cms";

const renamedImages: Record<string, string> = {
  "/images/before-kitchen.png": "/images/before-kitchen.jpeg",
  "/images/after-kitchen.png": "/images/after-kitchen.jpeg",
};

export function normalizePublicImageUrl(url: string): string {
  return renamedImages[url] || url || "";
}

export function normalizeProjectImages(project: CmsProject): CmsProject {
  return {
    ...project,
    image: normalizePublicImageUrl(project.image),
    beforeImage: normalizePublicImageUrl(project.beforeImage),
    afterImage: normalizePublicImageUrl(project.afterImage),
    gallery: (project.gallery || []).map(normalizePublicImageUrl),
  };
}
