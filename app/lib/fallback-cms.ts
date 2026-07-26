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
  galleryHeading: "Gallery",
  galleryCopy: "A simple image dump of kitchens, shelves, rooms, materials, and before states.",
  portfolioKicker: "Portfolio",
  portfolioHeading: "Project dossiers.",
  portfolioCopy: "Portfolio is where we explain the work. Gallery is for browsing images. Open any dossier to see the brief, before state, after result, scope, palette, and design notes.",
};
