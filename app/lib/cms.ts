import { push, ref, remove, set, update } from "firebase/database";
import { database } from "./firebase";

export type CmsImage = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
};

export type CmsProject = {
  id: string;
  title: string;
  category: string;
  copy: string;
  story: string;
  location: string;
  budget: string;
  year: string;
  image: string;
  beforeImage: string;
  afterImage: string;
  scope: string[];
  palette: string[];
  notes: string[];
  gallery: string[];
  order: number;
  featured?: boolean;
};

export type GalleryImage = {
  id: string;
  url: string;
  publicId: string;
  alt: string;
  order: number;
  createdAt: number;
};

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  budget: string;
  note: string;
  createdAt: number;
  status?: "new" | "read" | "archived";
};

export type CmsReview = {
  id: string;
  quote: string;
  name: string;
  location: string;
  project: string;
  rating: number;
  order: number;
  published: boolean;
};

export type SiteSettings = {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  galleryHeading: string;
  galleryCopy: string;
  portfolioKicker: string;
  portfolioHeading: string;
  portfolioCopy: string;
};

export const cmsPaths = {
  projects: "cms/projects",
  gallery: "cms/gallery",
  enquiries: "cms/enquiries",
  reviews: "cms/reviews",
  settings: "cms/settings",
};

export function objectToArray<T extends { id: string }>(value: Record<string, Omit<T, "id">> | null | undefined): T[] {
  if (!value) return [];
  return Object.entries(value).map(([id, item]) => ({ id, ...item }) as T);
}

export async function saveProject(project: CmsProject) {
  const projectRef = project.id ? ref(database, `${cmsPaths.projects}/${project.id}`) : push(ref(database, cmsPaths.projects));
  const id = project.id || projectRef.key;
  if (!id) throw new Error("Could not create project id.");
  await set(projectRef, { ...project, id });
  return id;
}

export async function deleteProject(id: string) {
  await remove(ref(database, `${cmsPaths.projects}/${id}`));
}

export async function saveGalleryImage(image: GalleryImage) {
  const imageRef = image.id ? ref(database, `${cmsPaths.gallery}/${image.id}`) : push(ref(database, cmsPaths.gallery));
  const id = image.id || imageRef.key;
  if (!id) throw new Error("Could not create gallery image id.");
  await set(imageRef, { ...image, id });
  return id;
}

export async function deleteGalleryImage(id: string) {
  await remove(ref(database, `${cmsPaths.gallery}/${id}`));
}

export async function updateGalleryImageLabel(id: string, alt: string) {
  await update(ref(database, `${cmsPaths.gallery}/${id}`), { alt });
}

export async function saveEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt" | "status">) {
  const enquiryRef = push(ref(database, cmsPaths.enquiries));
  const id = enquiryRef.key;
  if (!id) throw new Error("Could not create enquiry id.");
  await set(enquiryRef, {
    ...enquiry,
    id,
    status: "new",
    createdAt: Date.now(),
  });
  return id;
}

export async function updateEnquiryStatus(id: string, status: Enquiry["status"]) {
  await update(ref(database, `${cmsPaths.enquiries}/${id}`), { status });
}

export async function saveReview(review: CmsReview) {
  const reviewRef = review.id
    ? ref(database, `${cmsPaths.reviews}/${review.id}`)
    : push(ref(database, cmsPaths.reviews));
  const id = review.id || reviewRef.key;
  if (!id) throw new Error("Could not create review id.");
  await set(reviewRef, { ...review, id });
  return id;
}

export async function deleteReview(id: string) {
  await remove(ref(database, `${cmsPaths.reviews}/${id}`));
}

export async function saveSettings(settings: SiteSettings) {
  await set(ref(database, cmsPaths.settings), settings);
}
