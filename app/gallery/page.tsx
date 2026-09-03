import { PageShell } from "../components";
import type { Metadata } from "next";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryIntro } from "./GalleryIntro";
import { getPublicGallery, getPublicSettings } from "../lib/server-cms";
import { JsonLd } from "../JsonLd";
import { site } from "@/site";

export const metadata: Metadata = {
  title: "Home Renovation & Interior Gallery in Karachi",
  description:
    "Browse Steed Art renovation details, rooms, materials, custom joinery, and completed interiors from Karachi homes.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Home Renovation & Interior Gallery | Steed Art",
    description:
      "Browse rooms, materials, joinery, and details from Steed Art home renovations.",
    url: "/gallery",
    images: [{ url: "/images/primary-bedroom.webp", width: 1536, height: 1024 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Renovation & Interior Gallery | Steed Art",
    description: "Browse rooms, materials, custom work, and details from Steed Art renovations in Karachi.",
    images: ["/images/primary-bedroom.webp"],
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
