import { PageShell } from "../components";
import { PortfolioExperience } from "./PortfolioExperience";

export const metadata = {
  title: "Portfolio",
  description:
    "Kitchen renovations, cabinetry, shelving, and interior design moments by Steed Art in Karachi.",
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
