"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { ImagePlus, Loader2, LogOut, Save, Star, Trash2 } from "lucide-react";
import { auth } from "../lib/firebase";
import {
  deleteGalleryImage,
  deleteProject,
  deleteReview,
  saveGalleryImage,
  saveProject,
  saveReview,
  saveSettings,
  updateGalleryImageLabel,
  updateEnquiryStatus,
  type CmsProject,
  type CmsReview,
  type GalleryImage,
  type SiteSettings,
} from "../lib/cms";
import { uploadToCloudinary } from "../lib/cloudinary";
import { useCmsEnquiries, useCmsGallery, useCmsProjects, useCmsReviews, useCmsSettings } from "../lib/useCmsData";

const blankProject: CmsProject = {
  id: "",
  title: "",
  category: "",
  copy: "",
  story: "",
  location: "",
  budget: "",
  year: new Date().getFullYear().toString(),
  image: "",
  beforeImage: "",
  afterImage: "",
  scope: [],
  palette: [],
  notes: [],
  gallery: [],
  order: 1,
};

const blankReview: CmsReview = {
  id: "",
  quote: "",
  name: "",
  location: "",
  project: "",
  rating: 5,
  order: 1,
  published: true,
};

const tabs = ["Projects", "Gallery", "Reviews", "Enquiries", "Settings"] as const;

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Projects");
  const { projects } = useCmsProjects();
  const { gallery } = useCmsGallery();
  const enquiries = useCmsEnquiries();
  const { reviews } = useCmsReviews();
  const { settings } = useCmsSettings();

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsAuthLoading(false);
      if (!nextUser) window.location.href = "/login";
    });
  }, []);

  if (isAuthLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-white">
        <Loader2 className="animate-spin" />
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <header className="mx-auto flex max-w-[1360px] flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/steedartlogo.png" alt="Steed Art logo" width={44} height={44} className="h-11 w-11 object-contain" />
          <span className="text-lg font-extrabold tracking-[0.16em]">STEED ART CMS</span>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition hover:-translate-y-0.5 hover:shadow-lg ${activeTab === tab ? "bg-black text-white" : "bg-[#f4f0ea] text-black hover:bg-[#e8ddd0]"}`}
            >
              {tab}
            </button>
          ))}
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#6d4b34] hover:shadow-lg"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1360px] px-5 pb-16 sm:px-8">
        {activeTab === "Projects" ? <ProjectsPanel projects={projects} settings={settings} /> : null}
        {activeTab === "Gallery" ? <GalleryPanel gallery={gallery} settings={settings} /> : null}
        {activeTab === "Reviews" ? <ReviewsPanel reviews={reviews} /> : null}
        {activeTab === "Enquiries" ? <EnquiriesPanel enquiries={enquiries} /> : null}
        {activeTab === "Settings" ? <SettingsPanel key={JSON.stringify(settings)} settings={settings} /> : null}
      </section>
    </main>
  );
}

function ProjectsPanel({ projects, settings }: { projects: CmsProject[]; settings: SiteSettings }) {
  const [selectedId, setSelectedId] = useState("");
  const selectedProject = useMemo(() => projects.find((project) => project.id === selectedId) ?? blankProject, [projects, selectedId]);

  return (
    <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
      <div className="surface-card rounded-[22px] p-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-4xl font-extrabold">Projects</h1>
        </div>
        <PortfolioCopyEditor settings={settings} />
        <button type="button" onClick={() => setSelectedId("")} className="mt-5 w-full rounded-[16px] bg-white p-4 text-left text-sm font-extrabold transition hover:-translate-y-0.5 hover:bg-[#faf7f3] hover:shadow-md">
          New project
        </button>
        <div className="mt-3 grid gap-2">
          {projects.length ? projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedId(project.id)}
              className={`grid grid-cols-[74px_1fr] gap-3 rounded-[16px] p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md ${selectedId === project.id ? "bg-black text-white" : "bg-white hover:bg-[#faf7f3]"}`}
            >
              <span className="relative h-16 overflow-hidden rounded-[12px] bg-neutral-200">
                {project.afterImage ? <Image src={project.afterImage} alt={project.title} fill sizes="74px" className="object-cover" /> : null}
              </span>
              <span>
                <span className="block text-xs font-extrabold uppercase tracking-[0.18em] opacity-60">{project.category}</span>
                <span className="mt-1 block text-lg font-extrabold">{project.title || "Untitled project"}</span>
              </span>
            </button>
          )) : (
            <p className="rounded-[16px] bg-white p-4 text-sm font-extrabold text-neutral-500">Couldn&apos;t find projects.</p>
          )}
        </div>
      </div>
      <ProjectEditor key={selectedProject.id || "new"} project={selectedProject} />
    </div>
  );
}

function ProjectEditor({ project }: { project: CmsProject }) {
  const [draft, setDraft] = useState<CmsProject>(project);
  const [scopeText, setScopeText] = useState(project.scope.join(", "));
  const [paletteText, setPaletteText] = useState(project.palette.join(", "));
  const [notesText, setNotesText] = useState(project.notes.join("\n"));
  const [orderText, setOrderText] = useState(String(project.order || 1));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const setField = <K extends keyof CmsProject>(field: K, value: CmsProject[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const uploadImage = async (field: "image" | "beforeImage" | "afterImage", file: File | null) => {
    if (!file) return;
    setUploadingField(field);
    try {
      const uploaded = await uploadToCloudinary(file, `steedart/portfolio/${draft.title || "project"}`);
      setField(field, uploaded.url);
      setNotice("Image uploaded.");
    } catch {
      setNotice("Image upload failed. Please try again.");
    } finally {
      setUploadingField(null);
    }
  };

  const uploadGallery = async (file: File | null) => {
    if (!file) return;
    setUploadingField("gallery");
    try {
      const uploaded = await uploadToCloudinary(file, `steedart/portfolio/${draft.title || "project"}`);
      setField("gallery", [...draft.gallery, uploaded.url]);
      setNotice("Gallery image added.");
    } catch {
      setNotice("Gallery upload failed. Please try again.");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setNotice("");
    try {
      await saveProject({
        ...draft,
        scope: splitCommaList(scopeText),
        palette: splitCommaList(paletteText),
        notes: splitLineList(notesText),
        order: Number(orderText) || 1,
      });
      setNotice("Project saved.");
    } catch {
      setNotice("Project could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft.id) return;
    setIsDeleting(true);
    setNotice("");
    try {
      await deleteProject(draft.id);
      setNotice("Project deleted.");
    } catch {
      setNotice("Project could not be deleted. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card rounded-[22px] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-extrabold">{draft.id ? "Edit project" : "New project"}</h2>
        <div className="flex gap-2">
          {draft.id ? (
            <button type="button" disabled={isDeleting} onClick={handleDelete} className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-extrabold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60">
              {isDeleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />} {isDeleting ? "Deleting" : "Delete"}
            </button>
          ) : null}
          <button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] disabled:cursor-not-allowed disabled:opacity-60">
            {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} {isSaving ? "Saving" : "Save"}
          </button>
        </div>
      </div>
      {notice ? <p className="mt-4 rounded-[14px] bg-white p-3 text-sm font-extrabold text-neutral-700">{notice}</p> : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input label="Title" value={draft.title} onChange={(value) => setField("title", value)} />
        <Input label="Category" value={draft.category} onChange={(value) => setField("category", value)} />
        <Input label="Location" value={draft.location} onChange={(value) => setField("location", value)} />
        <Input label="Budget" value={draft.budget} onChange={(value) => setField("budget", value)} />
        <Input label="Year" value={draft.year} onChange={(value) => setField("year", value)} />
        <Input label="Order" value={orderText} onChange={setOrderText} />
      </div>
      <Textarea label="Short copy" value={draft.copy} onChange={(value) => setField("copy", value)} />
      <Textarea label="Story" value={draft.story} onChange={(value) => setField("story", value)} />
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Upload label="Card image" image={draft.image} isUploading={uploadingField === "image"} onUpload={(file) => uploadImage("image", file)} />
        <Upload label="Before image" image={draft.beforeImage} isUploading={uploadingField === "beforeImage"} onUpload={(file) => uploadImage("beforeImage", file)} />
        <Upload label="After image" image={draft.afterImage} isUploading={uploadingField === "afterImage"} onUpload={(file) => uploadImage("afterImage", file)} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Textarea label="Scope, comma separated" value={scopeText} onChange={setScopeText} />
        <Textarea label="Palette, comma separated" value={paletteText} onChange={setPaletteText} />
        <Textarea label="Notes, one per line" value={notesText} onChange={setNotesText} />
      </div>
      <div className="mt-5 rounded-[18px] bg-white p-4">
        <label className={`inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] ${uploadingField === "gallery" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
          {uploadingField === "gallery" ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />} {uploadingField === "gallery" ? "Uploading" : "Add project gallery image"}
          <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadGallery(event.target.files?.[0] || null)} />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {draft.gallery.map((url, index) => (
            <div key={`${url}-${index}`} className="relative h-32 overflow-hidden rounded-[14px]">
              <Image src={url} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

function GalleryPanel({ gallery, settings }: { gallery: GalleryImage[]; settings: SiteSettings }) {
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [savingLabelId, setSavingLabelId] = useState("");
  const [labelDrafts, setLabelDrafts] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  const uploadGalleryImage = async (file: File | null) => {
    if (!file) return;
    setIsUploading(true);
    setNotice("");
    try {
      const uploaded = await uploadToCloudinary(file, "steedart/gallery");
      await saveGalleryImage({
        id: "",
        url: uploaded.url,
        publicId: uploaded.publicId,
        alt: file.name.replace(/\.[^.]+$/, ""),
        order: gallery.length + 1,
        createdAt: Date.now(),
      });
      setNotice("Gallery image uploaded.");
    } catch {
      setNotice("Gallery image could not be uploaded.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setNotice("");
    try {
      await deleteGalleryImage(id);
      setNotice("Gallery image deleted.");
    } catch {
      setNotice("Image could not be deleted.");
    } finally {
      setDeletingId("");
    }
  };

  const getDraftLabel = (image: GalleryImage) => labelDrafts[image.id] ?? image.alt ?? "";

  const handleLabelSave = async (image: GalleryImage) => {
    const nextLabel = getDraftLabel(image).trim();
    setSavingLabelId(image.id);
    setNotice("");
    try {
      await updateGalleryImageLabel(image.id, nextLabel || "Gallery image");
      setNotice("Gallery label saved.");
      setLabelDrafts((current) => {
        const next = { ...current };
        delete next[image.id];
        return next;
      });
    } catch {
      setNotice("Gallery label could not be saved.");
    } finally {
      setSavingLabelId("");
    }
  };

  return (
    <div>
      <div className="mb-5 grid gap-4 lg:grid-cols-[0.62fr_0.38fr]">
        <GalleryCopyEditor settings={settings} />
        <div className="surface-card flex flex-col justify-between rounded-[22px] p-5">
          <h1 className="text-4xl font-extrabold">Gallery</h1>
          <label className={`inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] ${isUploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />} {isUploading ? "Uploading" : "Upload image"}
            <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadGalleryImage(event.target.files?.[0] || null)} />
          </label>
        </div>
      </div>
      {notice ? <p className="mb-4 rounded-[14px] bg-[#f4f0ea] p-3 text-sm font-extrabold text-neutral-700">{notice}</p> : null}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.length ? gallery.map((image) => (
          <div key={image.id} className="relative h-56 overflow-hidden rounded-[18px] bg-neutral-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <Image src={image.url} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 grid gap-2 bg-gradient-to-t from-black/85 to-transparent p-3 pt-12">
              <label className="block">
                <span className="sr-only">Gallery image label</span>
                <input
                  value={getDraftLabel(image)}
                  onChange={(event) => setLabelDrafts((current) => ({ ...current, [image.id]: event.target.value }))}
                  className="h-10 w-full rounded-full border border-white/15 bg-white/92 px-3 text-sm font-extrabold text-neutral-950 outline-none transition focus:border-white focus:ring-4 focus:ring-white/20"
                  placeholder="Gallery label"
                />
              </label>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  disabled={savingLabelId === image.id}
                  onClick={() => handleLabelSave(image)}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-3 text-xs font-black text-neutral-950 shadow-lg transition hover:bg-[#d9c6b4] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {savingLabelId === image.id ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {savingLabelId === image.id ? "Saving" : "Save label"}
                </button>
              <button
                type="button"
                disabled={deletingId === image.id}
                onClick={() => handleDelete(image.id)}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-3 text-xs font-black text-red-600 shadow-lg transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                aria-label={`Delete ${image.alt || "gallery image"}`}
              >
                {deletingId === image.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                {deletingId === image.id ? "Deleting" : "Delete"}
              </button>
              </div>
            </div>
          </div>
        )) : (
          <p className="rounded-[18px] bg-[#f4f0ea] p-5 text-sm font-extrabold text-neutral-500 lg:col-span-4">Couldn&apos;t find gallery images.</p>
        )}
      </div>
    </div>
  );
}

function ReviewsPanel({ reviews }: { reviews: CmsReview[] }) {
  const [selectedId, setSelectedId] = useState("");
  const selectedReview =
    reviews.find((review) => review.id === selectedId) ?? blankReview;

  return (
    <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
      <div className="surface-card rounded-[22px] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">
              Social proof
            </p>
            <h1 className="mt-2 text-4xl font-extrabold">Reviews</h1>
          </div>
          <Star size={24} />
        </div>
        <p className="mt-4 text-sm font-medium leading-6 text-neutral-600">
          Publish only genuine client words. Unpublished reviews stay in the
          CMS and never appear on the website.
        </p>
        <button
          type="button"
          onClick={() => setSelectedId("")}
          className="mt-5 w-full rounded-[16px] bg-white p-4 text-left text-sm font-extrabold transition hover:-translate-y-0.5 hover:bg-[#faf7f3] hover:shadow-md"
        >
          New review
        </button>
        <div className="mt-3 grid gap-2">
          {reviews.length ? (
            reviews.map((review) => (
              <button
                key={review.id}
                type="button"
                onClick={() => setSelectedId(review.id)}
                className={`rounded-[16px] p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                  selectedId === review.id
                    ? "bg-black text-white"
                    : "bg-white hover:bg-[#faf7f3]"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-extrabold">
                    {review.name || "Unnamed client"}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-55">
                    {review.published ? "Published" : "Draft"}
                  </span>
                </span>
                <span className="mt-2 block line-clamp-2 text-sm leading-5 opacity-70">
                  {review.quote || "No review text yet."}
                </span>
              </button>
            ))
          ) : (
            <p className="rounded-[16px] bg-white p-4 text-sm font-extrabold text-neutral-500">
              No reviews added yet.
            </p>
          )}
        </div>
      </div>
      <ReviewEditor
        key={selectedReview.id || "new"}
        review={selectedReview}
      />
    </div>
  );
}

function ReviewEditor({ review }: { review: CmsReview }) {
  const [draft, setDraft] = useState<CmsReview>(review);
  const [ratingText, setRatingText] = useState(String(review.rating || 5));
  const [orderText, setOrderText] = useState(String(review.order || 1));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notice, setNotice] = useState("");

  const setField = <K extends keyof CmsReview>(
    field: K,
    value: CmsReview[K],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setNotice("");
    try {
      await saveReview({
        ...draft,
        rating: Math.min(5, Math.max(1, Number(ratingText) || 5)),
        order: Number(orderText) || 1,
      });
      setNotice("Review saved.");
    } catch {
      setNotice("Review could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft.id) return;
    setIsDeleting(true);
    setNotice("");
    try {
      await deleteReview(draft.id);
      setNotice("Review deleted.");
    } catch {
      setNotice("Review could not be deleted. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card rounded-[22px] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-extrabold">
          {draft.id ? "Edit review" : "New review"}
        </h2>
        <div className="flex gap-2">
          {draft.id ? (
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-extrabold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Trash2 size={15} />
              )}
              {isDeleting ? "Deleting" : "Delete"}
            </button>
          ) : null}
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            {isSaving ? "Saving" : "Save"}
          </button>
        </div>
      </div>
      {notice ? (
        <p className="mt-4 rounded-[14px] bg-white p-3 text-sm font-extrabold text-neutral-700">
          {notice}
        </p>
      ) : null}
      <Textarea
        label="Client review"
        value={draft.quote}
        onChange={(value) => setField("quote", value)}
      />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input
          label="Client name"
          value={draft.name}
          onChange={(value) => setField("name", value)}
        />
        <Input
          label="Location"
          value={draft.location}
          onChange={(value) => setField("location", value)}
        />
        <Input
          label="Project type"
          value={draft.project}
          onChange={(value) => setField("project", value)}
        />
        <Input
          label="Rating, 1 to 5"
          value={ratingText}
          onChange={setRatingText}
        />
        <Input label="Display order" value={orderText} onChange={setOrderText} />
        <label className="flex min-h-12 items-center justify-between gap-4 rounded-[14px] bg-white px-4">
          <span className="text-sm font-extrabold text-neutral-700">
            Publish on website
          </span>
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(event) => setField("published", event.target.checked)}
            className="h-5 w-5 accent-neutral-950"
          />
        </label>
      </div>
    </form>
  );
}

function EnquiriesPanel({ enquiries }: { enquiries: ReturnType<typeof useCmsEnquiries> }) {
  const [updatingId, setUpdatingId] = useState("");
  const markRead = async (id: string) => {
    setUpdatingId(id);
    try {
      await updateEnquiryStatus(id, "read");
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-4xl font-extrabold">Enquiries</h1>
      <div className="grid gap-3">
        {enquiries.map((enquiry) => (
          <article key={enquiry.id} className="surface-card rounded-[18px] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">{enquiry.status || "new"}</p>
                <h2 className="mt-2 text-2xl font-extrabold">{enquiry.name}</h2>
                <p className="mt-2 text-sm font-medium text-neutral-600">{enquiry.phone} | {enquiry.email} | {enquiry.budget}</p>
              </div>
              <button type="button" disabled={updatingId === enquiry.id} onClick={() => markRead(enquiry.id)} className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] disabled:cursor-not-allowed disabled:opacity-60">
                {updatingId === enquiry.id ? <Loader2 size={15} className="animate-spin" /> : null}
                {updatingId === enquiry.id ? "Updating" : "Mark read"}
              </button>
            </div>
            <p className="mt-4 text-sm font-medium leading-7 text-neutral-700">{enquiry.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function GalleryCopyEditor({ settings }: { settings: SiteSettings }) {
  const [heading, setHeading] = useState(settings.galleryHeading);
  const [copy, setCopy] = useState(settings.galleryCopy);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setNotice("");
    try {
      await saveSettings({ ...settings, galleryHeading: heading, galleryCopy: copy });
      setNotice("Gallery page copy saved.");
    } catch {
      setNotice("Gallery page copy could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card rounded-[22px] p-5">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">Public gallery page</p>
      <h2 className="mt-2 text-3xl font-extrabold">Page copy</h2>
      <div className="mt-5 grid gap-4">
        <Input label="Main heading" value={heading} onChange={setHeading} />
        <Textarea label="Paragraph text" value={copy} onChange={setCopy} />
      </div>
      {notice ? <p className="mt-4 rounded-[14px] bg-white p-3 text-sm font-extrabold text-neutral-700">{notice}</p> : null}
      <button type="submit" disabled={isSaving} className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] disabled:cursor-not-allowed disabled:opacity-60">
        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {isSaving ? "Saving copy" : "Save gallery copy"}
      </button>
    </form>
  );
}

function PortfolioCopyEditor({ settings }: { settings: SiteSettings }) {
  const [kicker, setKicker] = useState(settings.portfolioKicker);
  const [heading, setHeading] = useState(settings.portfolioHeading);
  const [copy, setCopy] = useState(settings.portfolioCopy);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setNotice("");
    try {
      await saveSettings({
        ...settings,
        portfolioKicker: kicker,
        portfolioHeading: heading,
        portfolioCopy: copy,
      });
      setNotice("Portfolio page copy saved.");
    } catch {
      setNotice("Portfolio page copy could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 rounded-[18px] bg-white p-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">Public portfolio page</p>
      <h2 className="mt-2 text-2xl font-extrabold">Page copy</h2>
      <div className="mt-4 grid gap-4">
        <Input label="Kicker" value={kicker} onChange={setKicker} />
        <Input label="Main heading" value={heading} onChange={setHeading} />
        <Textarea label="Paragraph text" value={copy} onChange={setCopy} />
      </div>
      {notice ? <p className="mt-4 rounded-[14px] bg-[#f4f0ea] p-3 text-sm font-extrabold text-neutral-700">{notice}</p> : null}
      <button type="submit" disabled={isSaving} className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] disabled:cursor-not-allowed disabled:opacity-60">
        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {isSaving ? "Saving copy" : "Save portfolio copy"}
      </button>
    </form>
  );
}

function SettingsPanel({ settings }: { settings: SiteSettings }) {
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setNotice("");
    try {
      await saveSettings(draft);
      setNotice("Settings saved. Public details will update from the CMS.");
    } catch {
      setNotice("Settings could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card max-w-3xl rounded-[22px] p-5">
      <h1 className="text-4xl font-extrabold">Common details</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {(["email", "phone", "whatsapp", "address", "facebook", "instagram"] as const).map((field) => (
          <label key={field} className="block">
            <span className="text-sm font-extrabold capitalize text-neutral-700">{field}</span>
            <input
              name={field}
              value={draft[field]}
              onChange={(event) => setDraft((current) => ({ ...current, [field]: event.target.value }))}
              className="mt-2 h-12 w-full rounded-[14px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-black/5"
            />
          </label>
        ))}
      </div>
      {notice ? <p className="mt-5 rounded-[14px] bg-white p-3 text-sm font-extrabold text-neutral-700">{notice}</p> : null}
      <button type="submit" disabled={isSaving} className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] disabled:cursor-not-allowed disabled:opacity-60">
        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {isSaving ? "Saving settings" : "Save settings"}
      </button>
    </form>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold capitalize text-neutral-700">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-[14px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-black/5" />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-extrabold text-neutral-700">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-28 w-full rounded-[14px] border border-black/10 bg-white p-4 text-sm font-semibold leading-6 outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-black/5" />
    </label>
  );
}

function Upload({ label, image, isUploading, onUpload }: { label: string; image: string; isUploading: boolean; onUpload: (file: File | null) => void }) {
  return (
    <div className="rounded-[18px] bg-white p-3">
      <div className="relative h-40 overflow-hidden rounded-[14px] bg-neutral-100">
        {image ? <Image src={image} alt={label} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /> : null}
        {isUploading ? (
          <span className="absolute inset-0 grid place-items-center bg-black/35 text-white">
            <Loader2 className="animate-spin" />
          </span>
        ) : null}
      </div>
      <label className={`mt-3 inline-flex rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] ${isUploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
        {isUploading ? "Uploading" : label}
        <input type="file" accept="image/*" className="hidden" onChange={(event) => onUpload(event.target.files?.[0] || null)} />
      </label>
    </div>
  );
}

function splitCommaList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function splitLineList(value: string) {
  return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}
