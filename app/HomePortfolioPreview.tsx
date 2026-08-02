"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCmsProjects } from "./lib/useCmsData";
import type { CmsProject } from "./lib/cms";

export function HomePortfolioPreview({ initialProjects = [] }: { initialProjects?: CmsProject[] }) {
  const { projects, isLoading } = useCmsProjects(initialProjects);
  const visibleProjects = projects.slice(0, 4);

  return (
    <div className="grid gap-2">
      {isLoading ? (
        <HomePortfolioSkeleton />
      ) : visibleProjects.length ? (
        visibleProjects.map((project, index) => (
          <Link
            key={project.id}
            href="/portfolio"
            className="grid gap-4 rounded-[18px] p-4 transition hover:bg-[#f4f0ea] sm:grid-cols-[54px_1fr_110px] sm:items-center"
          >
            <span className="text-2xl font-extrabold text-neutral-300">{String(index + 1).padStart(2, "0")}</span>
            <span>
              <span className="block text-xs font-extrabold uppercase tracking-[0.2em] text-[#76563f]">{project.category}</span>
              <span className="mt-1 block text-2xl font-extrabold">{project.title}</span>
            </span>
            <span className="relative h-20 overflow-hidden rounded-[14px] bg-neutral-900">
              {project.afterImage ? (
                <Image src={project.afterImage} alt={project.title} fill sizes="110px" className="object-cover" />
              ) : (
                <span className="grid h-full place-items-center p-2 text-center text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/45">
                  Couldn&apos;t find image
                </span>
              )}
            </span>
          </Link>
        ))
      ) : (
        <div className="rounded-[18px] bg-[#f4f0ea] p-5">
          <h3 className="text-2xl font-extrabold">Couldn&apos;t find projects.</h3>
          <p className="mt-2 text-sm font-medium leading-7 text-neutral-600">
            Add portfolio projects from the CMS to feature them here.
          </p>
        </div>
      )}
      <Link href="/portfolio" className="mt-3 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-black px-5 text-sm font-extrabold text-white">
        Open portfolio <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}

function HomePortfolioSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="grid gap-4 rounded-[18px] p-4 sm:grid-cols-[54px_1fr_110px] sm:items-center">
          <span className="h-8 w-12 animate-pulse rounded-full bg-black/10" />
          <span className="grid gap-3">
            <span className="h-3 w-28 animate-pulse rounded-full bg-black/10" />
            <span className="h-7 w-3/4 animate-pulse rounded-full bg-black/10" />
          </span>
          <span className="h-20 animate-pulse rounded-[14px] bg-black/10" />
        </div>
      ))}
    </>
  );
}
