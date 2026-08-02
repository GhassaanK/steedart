"use client";

import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "./firebase";
import { cmsPaths, type CmsProject, type CmsReview, type Enquiry, type GalleryImage, objectToArray, type SiteSettings } from "./cms";
import { fallbackSettings } from "./fallback-cms";
import { normalizeProjectImages } from "./normalize-cms";

export function useCmsProjects(initialProjects: CmsProject[] = []) {
  const [projects, setProjects] = useState<CmsProject[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.projects), (snapshot) => {
      const nextProjects = objectToArray<CmsProject>(snapshot.val())
        .map(normalizeProjectImages)
        .sort((a, b) => a.order - b.order);
      setProjects(nextProjects);
      setIsLoading(false);
    });
  }, []);

  return { projects, isLoading };
}

export function useCmsGallery(initialGallery: GalleryImage[] = []) {
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);
  const [isLoading, setIsLoading] = useState(initialGallery.length === 0);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.gallery), (snapshot) => {
      const nextGallery = objectToArray<GalleryImage>(snapshot.val()).sort((a, b) => a.order - b.order);
      setGallery(nextGallery);
      setIsLoading(false);
    });
  }, []);

  return { gallery, isLoading };
}

export function useCmsEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.enquiries), (snapshot) => {
      setEnquiries(objectToArray<Enquiry>(snapshot.val()).sort((a, b) => b.createdAt - a.createdAt));
    });
  }, []);

  return enquiries;
}

export function useCmsReviews(initialReviews: CmsReview[] = []) {
  const [reviews, setReviews] = useState<CmsReview[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(initialReviews.length === 0);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.reviews), (snapshot) => {
      setReviews(
        objectToArray<CmsReview>(snapshot.val()).sort(
          (a, b) => a.order - b.order,
        ),
      );
      setIsLoading(false);
    });
  }, []);

  return { reviews, isLoading };
}

export function useCmsSettings(initialSettings?: SiteSettings) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings || fallbackSettings);
  const [isLoading, setIsLoading] = useState(!initialSettings);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.settings), (snapshot) => {
      setSettings({ ...fallbackSettings, ...(snapshot.val() || {}) });
      setIsLoading(false);
    });
  }, []);

  return { settings, isLoading };
}
