import { site } from "@/site";
import type { CmsProject, GalleryImage, SiteSettings } from "./cms";

export const fallbackProjects: CmsProject[] = [];

export const fallbackGallery: GalleryImage[] = [];

export const fallbackSettings: SiteSettings = {
  email: site.email,
  phone: site.phone,
  whatsapp: site.socials.whatsapp,
  address: site.address,
  facebook: site.socials.facebook,
  instagram: site.socials.instagram,
  galleryHeading: "A Closer Look",
  galleryCopy: "Cabinet joinery, shelving detail, finish and material choices, the small things that make a kitchen feel considered instead of assembled. Photos are added here as each Steed Art project is completed.",
  portfolioKicker: "Project dossiers",
  portfolioHeading: "The Work",
  portfolioCopy: "Every Steed Art project starts the same way: understand the home, then design a kitchen that actually fits it. This is where that thinking becomes visible, project by project, as each one is completed.",
};
