import { PageShell } from "../components";
import type { Metadata } from "next";
import { PortfolioExperience } from "./PortfolioExperience";
import { getPublicProjects, getPublicSettings } from "../lib/server-cms";
import { JsonLd } from "../JsonLd";
import { site } from "@/site";

export const metadata: Metadata = {
  title: "Home Renovation Portfolio in Karachi",
  description:
    "Explore Steed Art home renovations, interiors, custom joinery, and room transformations across Karachi residences.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Home Renovation Portfolio in Karachi | Steed Art",
    description:
      "A look at complete residential renovations, interiors, and custom work by Steed Art.",
    url: "/portfolio",
    images: [{ url: "/images/lounge-after.webp", width: 1536, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Renovation Portfolio in Karachi | Steed Art",
    description: "Explore Steed Art residential renovations, interiors, and custom work across Karachi.",
    images: ["/images/lounge-after.webp"],
  },
};

export default async function PortfolioPage() {
  const [projects, settings] = await Promise.all([
    getPublicProjects(),
    getPublicSettings(),
  ]);

  return (
    <PageShell>
      <main>
        {projects.length ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `${site.url}/portfolio#page`,
              url: `${site.url}/portfolio`,
              name: "Steed Art home renovation portfolio",
              description: metadata.description,
              isPartOf: { "@id": `${site.url}/#website` },
              mainEntity: {
                "@type": "ItemList",
                itemListElement: projects.map((project, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${site.url}/portfolio#project-${project.id}`,
                  item: {
                    "@type": "CreativeWork",
                    name: project.title,
                    description: project.copy,
                    image: project.afterImage || project.image || undefined,
                    locationCreated: project.location || "Karachi",
                  },
                })),
              },
            }}
          />
        ) : null}
        <PortfolioExperience initialProjects={projects} initialSettings={settings} />
      </main>
    </PageShell>
  );
}
