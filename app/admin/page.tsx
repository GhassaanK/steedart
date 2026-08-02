import type { Metadata } from "next";
import { AdminDashboard } from "./AdminDashboard";

export const metadata: Metadata = {
  title: { absolute: "CMS | Steed Art" },
  description: "Manage Steed Art projects, gallery, enquiries, and common details.",
  alternates: { canonical: "/admin" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
