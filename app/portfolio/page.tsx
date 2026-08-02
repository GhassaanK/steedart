import { PageShell } from "../components";
import type { Metadata } from "next";
import { PortfolioExperience } from "./PortfolioExperience";
import { getPublicProjects, getPublicSettings } from "../lib/server-cms";
import { JsonLd } from "../JsonLd";
import { site } from "@/site";

export const metadata: Metadata = {
  title: "Kitchen Renovation Portfolio in Karachi",
  description:
    "A look at Steed Art kitchen renovations, custom cabinetry, and interior work across Karachi homes, updated as each project is completed.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Kitchen Renovation Portfolio in Karachi | Steed Art",
    description:
      "A look at Steed Art kitchen renovations, custom cabinetry, and interior work across Karachi homes.",
    url: "/portfolio",
    images: [{ url: "/images/portfolio-taupe-kitchen.png", width: 1792, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Renovation Portfolio in Karachi | Steed Art",
    description: "Explore Steed Art kitchen renovations, cabinetry, and interior projects across Karachi.",
    images: ["/images/portfolio-taupe-kitchen.png"],
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
              name: "Steed Art kitchen renovation portfolio",
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
