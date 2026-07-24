import type { Metadata } from "next";
import { AdminDashboard } from "./AdminDashboard";

export const metadata: Metadata = {
  title: "CMS | Steed Art",
  description: "Manage Steed Art projects, gallery, enquiries, and common details.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
