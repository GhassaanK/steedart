import { PageShell } from "../components";
import { PortfolioExperience } from "./PortfolioExperience";

export const metadata = {
  title: "Portfolio | Steed Art Kitchen Renovations in Karachi",
  description:
    "A look at Steed Art kitchen renovations, custom cabinetry, and interior work across Karachi homes, updated as each project is completed.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio | Steed Art Kitchen Renovations in Karachi",
    description:
      "A look at Steed Art kitchen renovations, custom cabinetry, and interior work across Karachi homes.",
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <main>
        <PortfolioExperience />
      </main>
    </PageShell>
  );
}
