export type Catalogue = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  file: string;
  fileSize: string;
  cover: string;
  coverAlt: string;
  tone: "light" | "dark";
};

export const catalogues: Catalogue[] = [
  {
    id: "elegance",
    title: "Elegance",
    subtitle: "Surface and finish collection",
    description:
      "A considered reference for cabinet faces, furniture surfaces, and the finishes that define how a kitchen feels up close.",
    file: "/catalogues/Elegance-Broucher-4x6-Final-LOW.pdf",
    fileSize: "13.7 MB",
    cover: "/images/cabinet-detail.png",
    coverAlt: "Warm cabinet finish detail from the Elegance collection",
    tone: "dark",
  },
  {
    id: "patex",
    title: "Patex Lamination",
    subtitle: "2026 material catalogue",
    description:
      "Browse laminations for kitchens, wardrobes, shelving, and fitted furniture before narrowing the palette with our studio.",
    file: "/catalogues/Patex-Lamination-Catalogue-10-4-2026.pdf",
    fileSize: "15.7 MB",
    cover: "/images/portfolio-taupe-kitchen.png",
    coverAlt: "Taupe kitchen showing a refined lamination palette",
    tone: "light",
  },
];
