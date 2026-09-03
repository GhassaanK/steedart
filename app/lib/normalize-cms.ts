import type { CmsProject, SiteSettings } from "./cms";

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

const legacyGalleryCopy =
  "Cabinet joinery, shelving detail, finish and material choices, the small things that make a kitchen feel considered instead of assembled. Photos are added here as each Steed Art project is completed.";
const legacyPortfolioCopy =
  "Every Steed Art project starts the same way: understand the home, then design a kitchen that actually fits it. This is where that thinking becomes visible, project by project, as each one is completed.";

export function normalizeSiteSettings(settings: SiteSettings): SiteSettings {
  return {
    ...settings,
    galleryCopy:
      settings.galleryCopy === legacyGalleryCopy
        ? "Rooms, material transitions, custom joinery, lighting, finishes, and the details that make a renovated home feel resolved rather than assembled. New work is added as each Steed Art project is completed."
        : settings.galleryCopy,
    portfolioCopy:
      settings.portfolioCopy === legacyPortfolioCopy
        ? "Every Steed Art renovation starts by understanding the property, the people living in it, and what needs to change. This is where that thinking becomes visible, project by project."
        : settings.portfolioCopy,
  };
}
