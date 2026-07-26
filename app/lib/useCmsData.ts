"use client";

import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "./firebase";
import { cmsPaths, type CmsProject, type Enquiry, type GalleryImage, objectToArray, type SiteSettings } from "./cms";
import { fallbackSettings } from "./fallback-cms";

export function useCmsProjects() {
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.projects), (snapshot) => {
      const nextProjects = objectToArray<CmsProject>(snapshot.val()).sort((a, b) => a.order - b.order);
      setProjects(nextProjects);
      setIsLoading(false);
    });
  }, []);

  return { projects, isLoading };
}

export function useCmsGallery() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

export function useCmsSettings() {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return onValue(ref(database, cmsPaths.settings), (snapshot) => {
      setSettings({ ...fallbackSettings, ...(snapshot.val() || {}) });
      setIsLoading(false);
    });
  }, []);

  return { settings, isLoading };
}
