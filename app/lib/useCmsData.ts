"use client";

import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "./firebase";
import { cmsPaths, type CmsProject, type Enquiry, type GalleryImage, objectToArray, type SiteSettings } from "./cms";
import { fallbackGallery, fallbackProjects, fallbackSettings } from "./fallback-cms";

export function useCmsProjects() {
  const [projects, setProjects] = useState<CmsProject[]>(fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.projects), (snapshot) => {
      const nextProjects = objectToArray<CmsProject>(snapshot.val()).sort((a, b) => a.order - b.order);
      setProjects(nextProjects.length ? nextProjects : fallbackProjects);
      setIsLoading(false);
    });
  }, []);

  return { projects, isLoading };
}

export function useCmsGallery() {
  const [gallery, setGallery] = useState<GalleryImage[]>(fallbackGallery);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.gallery), (snapshot) => {
      const nextGallery = objectToArray<GalleryImage>(snapshot.val()).sort((a, b) => a.order - b.order);
      setGallery(nextGallery.length ? nextGallery : fallbackGallery);
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

export function useCmsSettings() {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.settings), (snapshot) => {
      setSettings(snapshot.val() || fallbackSettings);
    });
  }, []);

  return settings;
}
