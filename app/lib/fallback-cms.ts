import { site } from "@/site";
import { images, portfolio } from "../data";
import type { CmsProject, GalleryImage, SiteSettings } from "./cms";

export const fallbackProjects: CmsProject[] = portfolio.map((project, index) => ({
  id: project.slug,
  title: project.title,
  category: project.category,
  copy: project.copy,
  story: project.story,
  location: project.location,
  budget: project.budget,
  year: project.year,
  image: project.image,
  beforeImage: project.beforeImage,
  afterImage: project.afterImage,
  scope: project.scope,
  palette: project.palette,
  notes: project.notes,
  gallery: project.gallery,
  order: index + 1,
  featured: index === 0,
}));

export const fallbackGallery: GalleryImage[] = [
  images.hero,
  images.portfolioKitchen,
  images.afterKitchen,
  images.lounge,
  images.detail,
  images.dining,
  images.beforeKitchen,
  images.portfolioKitchen,
  images.detail,
].map((url, index) => ({
  id: `fallback-${index + 1}`,
  url,
  publicId: "",
  alt: `Steed Art gallery image ${index + 1}`,
  order: index + 1,
  createdAt: 0,
}));

export const fallbackSettings: SiteSettings = {
  email: site.email,
  phone: site.phone,
  whatsapp: site.socials.whatsapp,
  address: site.address,
  facebook: site.socials.facebook,
  instagram: site.socials.instagram,
};
