import { PageShell } from "../components";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryIntro } from "./GalleryIntro";

export const metadata = {
  title: "Gallery",
  description:
    "A visual gallery of Steed Art kitchens, cabinetry, shelving, lounges, and interior details.",
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
