"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { ImagePlus, Loader2, LogOut, Save, Trash2 } from "lucide-react";
import { auth } from "../lib/firebase";
import {
  deleteGalleryImage,
  deleteProject,
  saveGalleryImage,
  saveProject,
  saveSettings,
  updateEnquiryStatus,
  type CmsProject,
  type GalleryImage,
  type SiteSettings,
} from "../lib/cms";
import { fallbackGallery, fallbackProjects } from "../lib/fallback-cms";
import { uploadToCloudinary } from "../lib/cloudinary";
import { useCmsEnquiries, useCmsGallery, useCmsProjects, useCmsSettings } from "../lib/useCmsData";

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

const tabs = ["Projects", "Gallery", "Enquiries", "Settings"] as const;

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Projects");
  const { projects } = useCmsProjects();
  const { gallery } = useCmsGallery();
  const enquiries = useCmsEnquiries();
  const settings = useCmsSettings();

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
              className={`rounded-full px-4 py-2 text-sm font-extrabold ${activeTab === tab ? "bg-black text-white" : "bg-[#f4f0ea] text-black"}`}
            >
              {tab}
            </button>
          ))}
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1360px] px-5 pb-16 sm:px-8">
        {activeTab === "Projects" ? <ProjectsPanel projects={projects} /> : null}
        {activeTab === "Gallery" ? <GalleryPanel gallery={gallery} /> : null}
        {activeTab === "Enquiries" ? <EnquiriesPanel enquiries={enquiries} /> : null}
        {activeTab === "Settings" ? <SettingsPanel settings={settings} /> : null}
      </section>
    </main>
  );
}

function ProjectsPanel({ projects }: { projects: CmsProject[] }) {
  const [selectedId, setSelectedId] = useState("");
  const selectedProject = useMemo(() => projects.find((project) => project.id === selectedId) ?? blankProject, [projects, selectedId]);

  const seedProjects = async () => {
    for (const project of fallbackProjects) {
      await saveProject(project);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
      <div className="surface-card rounded-[22px] p-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-4xl font-extrabold">Projects</h1>
          <button type="button" onClick={seedProjects} className="rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white">
            Seed dummy
          </button>
        </div>
        <button type="button" onClick={() => setSelectedId("")} className="mt-5 w-full rounded-[16px] bg-white p-4 text-left text-sm font-extrabold">
          New project
        </button>
        <div className="mt-3 grid gap-2">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedId(project.id)}
              className={`grid grid-cols-[74px_1fr] gap-3 rounded-[16px] p-3 text-left ${selectedId === project.id ? "bg-black text-white" : "bg-white"}`}
            >
              <span className="relative h-16 overflow-hidden rounded-[12px] bg-neutral-200">
                {project.afterImage ? <Image src={project.afterImage} alt={project.title} fill className="object-cover" /> : null}
              </span>
              <span>
                <span className="block text-xs font-extrabold uppercase tracking-[0.18em] opacity-60">{project.category}</span>
                <span className="mt-1 block text-lg font-extrabold">{project.title || "Untitled project"}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <ProjectEditor key={selectedProject.id || "new"} project={selectedProject} />
    </div>
  );
}

function ProjectEditor({ project }: { project: CmsProject }) {
  const [draft, setDraft] = useState<CmsProject>(project);
  const [isSaving, setIsSaving] = useState(false);

  const setField = <K extends keyof CmsProject>(field: K, value: CmsProject[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const uploadImage = async (field: "image" | "beforeImage" | "afterImage", file: File | null) => {
    if (!file) return;
    const uploaded = await uploadToCloudinary(file, `steedart/portfolio/${draft.title || "project"}`);
    setField(field, uploaded.url);
  };

  const uploadGallery = async (file: File | null) => {
    if (!file) return;
    const uploaded = await uploadToCloudinary(file, `steedart/portfolio/${draft.title || "project"}`);
    setField("gallery", [...draft.gallery, uploaded.url]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    await saveProject(draft);
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card rounded-[22px] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-extrabold">{draft.id ? "Edit project" : "New project"}</h2>
        <div className="flex gap-2">
          {draft.id ? (
            <button type="button" onClick={() => deleteProject(draft.id)} className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-extrabold text-red-700">
              <Trash2 size={15} /> Delete
            </button>
          ) : null}
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white">
            <Save size={15} /> {isSaving ? "Saving" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input label="Title" value={draft.title} onChange={(value) => setField("title", value)} />
        <Input label="Category" value={draft.category} onChange={(value) => setField("category", value)} />
        <Input label="Location" value={draft.location} onChange={(value) => setField("location", value)} />
        <Input label="Budget" value={draft.budget} onChange={(value) => setField("budget", value)} />
        <Input label="Year" value={draft.year} onChange={(value) => setField("year", value)} />
        <Input label="Order" value={String(draft.order)} onChange={(value) => setField("order", Number(value) || 1)} />
      </div>
      <Textarea label="Short copy" value={draft.copy} onChange={(value) => setField("copy", value)} />
      <Textarea label="Story" value={draft.story} onChange={(value) => setField("story", value)} />
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Upload label="Card image" image={draft.image} onUpload={(file) => uploadImage("image", file)} />
        <Upload label="Before image" image={draft.beforeImage} onUpload={(file) => uploadImage("beforeImage", file)} />
        <Upload label="After image" image={draft.afterImage} onUpload={(file) => uploadImage("afterImage", file)} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Textarea label="Scope, comma separated" value={draft.scope.join(", ")} onChange={(value) => setField("scope", splitList(value))} />
        <Textarea label="Palette, comma separated" value={draft.palette.join(", ")} onChange={(value) => setField("palette", splitList(value))} />
        <Textarea label="Notes, one per line" value={draft.notes.join("\n")} onChange={(value) => setField("notes", value.split("\n").filter(Boolean))} />
      </div>
      <div className="mt-5 rounded-[18px] bg-white p-4">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white">
          <ImagePlus size={16} /> Add project gallery image
          <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadGallery(event.target.files?.[0] || null)} />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {draft.gallery.map((url, index) => (
            <div key={`${url}-${index}`} className="relative h-32 overflow-hidden rounded-[14px]">
              <Image src={url} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

function GalleryPanel({ gallery }: { gallery: GalleryImage[] }) {
  const uploadGalleryImage = async (file: File | null) => {
    if (!file) return;
    const uploaded = await uploadToCloudinary(file, "steedart/gallery");
    await saveGalleryImage({
      id: "",
      url: uploaded.url,
      publicId: uploaded.publicId,
      alt: file.name.replace(/\.[^.]+$/, ""),
      order: gallery.length + 1,
      createdAt: Date.now(),
    });
  };

  const seedGallery = async () => {
    for (const image of fallbackGallery) {
      await saveGalleryImage({ ...image, id: "" });
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-extrabold">Gallery</h1>
        <div className="flex gap-2">
          <button type="button" onClick={seedGallery} className="rounded-full bg-[#f4f0ea] px-4 py-2 text-sm font-extrabold">Seed dummy</button>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white">
            <ImagePlus size={16} /> Upload image
            <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadGalleryImage(event.target.files?.[0] || null)} />
          </label>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((image) => (
          <div key={image.id} className="group relative h-56 overflow-hidden rounded-[18px] bg-neutral-200">
            <Image src={image.url} alt={image.alt} fill className="object-cover" />
            <button type="button" onClick={() => deleteGalleryImage(image.id)} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-red-600 opacity-0 transition group-hover:opacity-100">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnquiriesPanel({ enquiries }: { enquiries: ReturnType<typeof useCmsEnquiries> }) {
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
                <p className="mt-2 text-sm font-medium text-neutral-600">{enquiry.phone} · {enquiry.email} · {enquiry.budget}</p>
              </div>
              <button type="button" onClick={() => updateEnquiryStatus(enquiry.id, "read")} className="rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white">
                Mark read
              </button>
            </div>
            <p className="mt-4 text-sm font-medium leading-7 text-neutral-700">{enquiry.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel({ settings }: { settings: SiteSettings }) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await saveSettings({
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      address: String(formData.get("address") || ""),
      facebook: String(formData.get("facebook") || ""),
      instagram: String(formData.get("instagram") || ""),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card max-w-3xl rounded-[22px] p-5">
      <h1 className="text-4xl font-extrabold">Common details</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {(["email", "phone", "whatsapp", "address", "facebook", "instagram"] as const).map((field) => (
          <label key={field} className="block">
            <span className="text-sm font-extrabold capitalize text-neutral-700">{field}</span>
            <input name={field} defaultValue={settings[field]} className="mt-2 h-12 w-full rounded-[14px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none" />
          </label>
        ))}
      </div>
      <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-extrabold text-white">
        <Save size={16} /> Save settings
      </button>
    </form>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold capitalize text-neutral-700">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-[14px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none" />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-extrabold text-neutral-700">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-28 w-full rounded-[14px] border border-black/10 bg-white p-4 text-sm font-semibold leading-6 outline-none" />
    </label>
  );
}

function Upload({ label, image, onUpload }: { label: string; image: string; onUpload: (file: File | null) => void }) {
  return (
    <div className="rounded-[18px] bg-white p-3">
      <div className="relative h-40 overflow-hidden rounded-[14px] bg-neutral-100">
        {image ? <Image src={image} alt={label} fill className="object-cover" /> : null}
      </div>
      <label className="mt-3 inline-flex cursor-pointer rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white">
        {label}
        <input type="file" accept="image/*" className="hidden" onChange={(event) => onUpload(event.target.files?.[0] || null)} />
      </label>
    </div>
  );
}

function splitList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}
