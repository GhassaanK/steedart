"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { CmsProject } from "../lib/cms";
import { useCmsProjects, useCmsSettings } from "../lib/useCmsData";

type Project = CmsProject;

export function PortfolioExperience() {
  const { projects, isLoading } = useCmsProjects();
  const { settings, isLoading: isSettingsLoading } = useCmsSettings();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) ?? null,
    [projects, activeId],
  );

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject]);

  return (
    <>
      <section className="mx-auto grid max-w-[1360px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.38fr_0.62fr]">
        <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-64px)]">
          {isSettingsLoading ? <PortfolioIntroSkeleton /> : (
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">{settings.portfolioKicker}</p>
              <h1 className="mt-6 max-w-xl text-6xl font-extrabold leading-[0.98] tracking-normal sm:text-8xl lg:text-7xl">
                {settings.portfolioHeading}
              </h1>
              <p className="mt-7 max-w-md text-sm font-medium leading-7 text-neutral-600">
                {settings.portfolioCopy}
              </p>
            </div>
          )}
          {projects[0]?.image ? <div className="mt-10 hidden overflow-hidden rounded-[22px] lg:block">
            <Image src={projects[0].image} alt={projects[0].title} width={640} height={760} className="h-[42vh] w-full object-cover" priority />
          </div> : null}
        </aside>

        <section className="grid gap-3">
          {isLoading ? (
            <PortfolioSkeleton />
          ) : projects.length ? projects.map((project, index) => (
            <ProjectIndexItem
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setActiveId(project.id)}
            />
          )) : (
            <div className="rounded-[22px] bg-[#f4f0ea] p-8">
              <h2 className="text-3xl font-extrabold">Couldn&apos;t find projects.</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-neutral-600">
                Add portfolio projects from the CMS to show them here.
              </p>
            </div>
          )}
        </section>
      </section>

      {activeProject ? (
        <ProjectModal
          project={activeProject}
          projects={projects}
          onClose={() => setActiveId(null)}
          onSelect={(id) => setActiveId(id)}
        />
      ) : null}
    </>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="grid gap-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="grid gap-4 rounded-[22px] bg-[#f4f0ea] p-3 md:grid-cols-[82px_1fr_210px_48px] md:items-center">
          <span className="h-10 w-14 animate-pulse rounded-full bg-black/10" />
          <span className="grid gap-3">
            <span className="h-4 w-28 animate-pulse rounded-full bg-black/10" />
            <span className="h-10 w-3/4 animate-pulse rounded-full bg-black/10" />
            <span className="h-5 w-full animate-pulse rounded-full bg-black/10" />
          </span>
          <span className="h-28 animate-pulse rounded-[16px] bg-black/10" />
          <span className="h-12 w-12 animate-pulse rounded-full bg-black/10" />
        </div>
      ))}
    </div>
  );
}

function PortfolioIntroSkeleton() {
  return (
    <div>
      <span className="block h-4 w-28 animate-pulse rounded-full bg-black/10" />
      <span className="mt-6 block h-20 w-full max-w-xl animate-pulse rounded-[20px] bg-black/10 sm:h-28" />
      <span className="mt-7 block h-5 w-full max-w-md animate-pulse rounded-full bg-black/10" />
      <span className="mt-3 block h-5 w-4/5 max-w-md animate-pulse rounded-full bg-black/10" />
      <span className="mt-3 block h-5 w-3/5 max-w-md animate-pulse rounded-full bg-black/10" />
    </div>
  );
}

function ProjectIndexItem({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${project.title} project`}
      className="group grid gap-4 rounded-[22px] p-3 text-left transition hover:bg-[#f4f0ea] md:grid-cols-[82px_1fr_210px_48px] md:items-center"
    >
      <p className="text-3xl font-extrabold text-neutral-300">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#76563f]">{project.category}</p>
        <h2 className="mt-2 text-4xl font-extrabold leading-tight">{project.title}</h2>
        <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-neutral-600">{project.copy}</p>
      </div>
      <div className="grid grid-cols-2 overflow-hidden rounded-[16px]">
        <div className="relative h-28">
          {project.beforeImage ? <Image src={project.beforeImage} alt={`${project.title} before`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover grayscale" /> : <ImagePlaceholder label="Before" />}
        </div>
        <div className="relative h-28">
          {project.afterImage ? <Image src={project.afterImage} alt={`${project.title} after`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : <ImagePlaceholder label="After" />}
        </div>
      </div>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-white transition group-hover:rotate-45">
        <ArrowUpRight size={18} />
      </span>
    </button>
  );
}

function ProjectModal({
  project,
  projects,
  onClose,
  onSelect,
}: {
  project: Project;
  projects: Project[];
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="fixed inset-0 z-50 bg-black/72 p-3 backdrop-blur-md sm:p-5" role="dialog" aria-modal="true" aria-label={`${project.title} project details`}>
      <div className="mx-auto flex h-full max-w-[1280px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 sm:px-7">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#76563f]">{project.category}</p>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{project.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close project" className="grid h-11 w-11 place-items-center rounded-full bg-neutral-950 text-white">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-6 sm:px-7">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-[20px] bg-neutral-900">
              {project.afterImage ? <Image src={project.afterImage} alt={`${project.title} after renovation`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : <ImagePlaceholder label="Couldn't find after image" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 max-w-lg text-white">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/65">{project.location}</p>
                <h3 className="mt-2 text-5xl font-extrabold leading-none">After</h3>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="surface-card rounded-[20px] p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Meta label="Year" value={project.year} />
                  <Meta label="Budget" value={project.budget} />
                  <Meta label="Location" value={project.location} />
                  <Meta label="Scope" value={`${project.scope.length} areas`} />
                </div>
                <p className="mt-8 text-sm font-medium leading-7 text-neutral-600">{project.story}</p>
              </div>

              <div className="relative min-h-[260px] overflow-hidden rounded-[20px] bg-neutral-900">
                {project.beforeImage ? <Image src={project.beforeImage} alt={`${project.title} before renovation`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : <ImagePlaceholder label="Couldn't find before image" />}
                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-black">
                  Before
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="rounded-[20px] bg-black p-6 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/45">Scope</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.scope.map((item) => (
                  <span key={item} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-white/45">Palette</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {project.palette.map((item) => (
                  <span key={item} className="rounded-[14px] bg-white px-4 py-3 text-sm font-extrabold text-black">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-[20px] p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#76563f]">Design notes</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {project.notes.map((note) => (
                  <p key={note} className="rounded-[16px] bg-white p-4 text-sm font-medium leading-6 text-neutral-650">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {project.gallery.map((src, index) => (
              <div key={`${project.id}-${src}-${index}`} className="relative min-h-[260px] overflow-hidden rounded-[18px] bg-neutral-900">
                {src ? <Image src={src} alt={`${project.title} gallery image ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /> : <ImagePlaceholder label="Couldn't find image" />}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button type="button" aria-label={`Previous project: ${previous.title}`} onClick={() => onSelect(previous.id)} className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-100 px-5 text-sm font-extrabold">
              <ArrowLeft size={16} /> {previous.title}
            </button>
            <button type="button" aria-label={`Next project: ${next.title}`} onClick={() => onSelect(next.id)} className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-extrabold text-white">
              {next.title} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="grid h-full min-h-full place-items-center bg-neutral-900 p-4 text-center text-xs font-extrabold uppercase tracking-[0.18em] text-white/45">
      {label}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-neutral-400">{label}</p>
      <p className="mt-2 text-base font-extrabold text-neutral-950">{value}</p>
    </div>
  );
}
