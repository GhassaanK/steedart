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
  galleryCopy: "Rooms, material transitions, custom joinery, lighting, finishes, and the details that make a renovated home feel resolved rather than assembled. New work is added as each Steed Art project is completed.",
  portfolioKicker: "Project dossiers",
  portfolioHeading: "The Work",
  portfolioCopy: "Every Steed Art renovation starts by understanding the property, the people living in it, and what needs to change. This is where that thinking becomes visible, project by project.",
};
