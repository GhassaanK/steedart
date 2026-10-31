import { site } from "@/site";
import type { CmsProject, GalleryImage, SiteSettings } from "./cms";
import { profileWork } from "../profile-data";

export const fallbackProjects: CmsProject[] = profileWork.map((work, index) => ({
  ...work, story: work.copy, location: "", budget: "", year: "", beforeImage: "",
  afterImage: work.image, palette: [], notes: [], order: index + 1,
}));

export const fallbackGallery: GalleryImage[] = [...new Map(profileWork.flatMap(work => work.gallery.map(url => [url, work.category] as const))).entries()].map(([url, alt], index) => ({
  id: `profile-${index}`, url, alt, publicId: "", order: index + 1, createdAt: 0,
}));

export const fallbackSettings: SiteSettings = {
  email: site.email,
  phone: site.phone,
  whatsapp: site.socials.whatsapp,
  address: site.address,
  facebook: site.socials.facebook,
  instagram: site.socials.instagram,
  galleryHeading: "A Closer Look",
  galleryCopy: "Residential interiors, commercial spaces, custom joinery and finishing details. A photographic selection from the Steed Art company profile.",
  portfolioKicker: "Project dossiers",
  portfolioHeading: "The Work",
  portfolioCopy: "Explore residential interiors, commercial fit-outs and custom work from the Steed Art company profile. Each space brings planning, materials and execution together.",
};
