import "server-only";

import type { CmsProject, CmsReview, GalleryImage, SiteSettings } from "./cms";
import { fallbackSettings } from "./fallback-cms";
import { normalizeProjectImages } from "./normalize-cms";

type FirebaseRecord<T> = Record<string, Omit<T, "id"> & { id?: string }>;

async function readPublicPath<T>(path: string): Promise<T | null> {
  const databaseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL?.replace(/\/$/, "");
  if (!databaseUrl) return null;

  try {
    const response = await fetch(`${databaseUrl}/${path}.json`, {
      cache: "no-store",
    });

    if (!response.ok) return null;
    return (await response.json()) as T | null;
  } catch {
    return null;
  }
}

function recordsToArray<T extends { id: string }>(value: FirebaseRecord<T> | null): T[] {
  if (!value) return [];
  return Object.entries(value).map(([key, item]) => ({ ...item, id: item.id || key }) as T);
}

export async function getPublicProjects(): Promise<CmsProject[]> {
  const value = await readPublicPath<FirebaseRecord<CmsProject>>("cms/projects");
  return recordsToArray<CmsProject>(value)
    .map(normalizeProjectImages)
    .sort((a, b) => a.order - b.order);
}

export async function getPublicGallery(): Promise<GalleryImage[]> {
  const value = await readPublicPath<FirebaseRecord<GalleryImage>>("cms/gallery");
  return recordsToArray<GalleryImage>(value).sort((a, b) => a.order - b.order);
}

export async function getPublicReviews(): Promise<CmsReview[]> {
  const value = await readPublicPath<FirebaseRecord<CmsReview>>("cms/reviews");
  return recordsToArray<CmsReview>(value).sort((a, b) => a.order - b.order);
}

export async function getPublicSettings(): Promise<SiteSettings> {
  const value = await readPublicPath<Partial<SiteSettings>>("cms/settings");
  return { ...fallbackSettings, ...(value || {}) };
}
