import { PageShell } from "../components";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryIntro } from "./GalleryIntro";

export const metadata = {
  title: "Gallery | Steed Art Kitchens, Cabinets & Interiors",
  description:
    "Browse photos of Steed Art kitchens, cabinetry, shelving, and interior detail from real Karachi homes.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | Steed Art Kitchens, Cabinets & Interiors",
    description:
      "Browse photos of Steed Art kitchens, cabinetry, shelving, and interior detail from real Karachi homes.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <PageShell>
      <main>
        <GalleryIntro />
        <GalleryGrid />
      </main>
    </PageShell>
  );
}
