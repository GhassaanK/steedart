import { PageShell } from "../components";
import type { Metadata } from "next";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryIntro } from "./GalleryIntro";
import { getPublicGallery, getPublicSettings } from "../lib/server-cms";
import { JsonLd } from "../JsonLd";
import { site } from "@/site";

export const metadata: Metadata = {
  title: "Kitchen, Cabinet & Interior Gallery in Karachi",
  description:
    "Browse photos of Steed Art kitchens, cabinetry, shelving, and interior detail from real Karachi homes.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Kitchen, Cabinet & Interior Gallery | Steed Art",
    description:
      "Browse photos of Steed Art kitchens, cabinetry, shelving, and interior detail from real Karachi homes.",
    url: "/gallery",
    images: [{ url: "/images/cabinet-detail.png", width: 1792, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen, Cabinet & Interior Gallery | Steed Art",
    description: "Browse Steed Art kitchens, custom cabinetry, shelving, and material details from Karachi projects.",
    images: ["/images/cabinet-detail.png"],
  },
};

export default async function GalleryPage() {
  const [gallery, settings] = await Promise.all([
    getPublicGallery(),
    getPublicSettings(),
  ]);

  return (
    <PageShell>
      <main>
        {gallery.length ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "ImageGallery",
              "@id": `${site.url}/gallery#gallery`,
              url: `${site.url}/gallery`,
              name: settings.galleryHeading,
              description: settings.galleryCopy,
              isPartOf: { "@id": `${site.url}/#website` },
              associatedMedia: gallery.map((image) => ({
                "@type": "ImageObject",
                contentUrl: image.url,
                caption: image.alt,
                url: `${site.url}/gallery#gallery-image-${image.id}`,
              })),
            }}
          />
        ) : null}
        <GalleryIntro initialSettings={settings} />
        <GalleryGrid initialGallery={gallery} />
      </main>
    </PageShell>
  );
}
