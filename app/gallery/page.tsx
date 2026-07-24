import { PageShell } from "../components";
import { GalleryGrid } from "./GalleryGrid";

export const metadata = {
  title: "Gallery",
  description:
    "A visual gallery of Steed Art kitchens, cabinetry, shelving, lounges, and interior details.",
};

export default function GalleryPage() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto max-w-[1360px] px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-5xl font-extrabold leading-none sm:text-7xl">Gallery</h1>
            <p className="max-w-sm text-sm font-medium leading-7 text-neutral-500">
              A simple image dump of kitchens, shelves, rooms, materials, and before states.
            </p>
          </div>
        </section>
        <GalleryGrid />
      </main>
    </PageShell>
  );
}
