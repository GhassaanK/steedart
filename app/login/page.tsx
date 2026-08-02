import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: { absolute: "Login | Steed Art" },
  description: "Sign in to the Steed Art studio dashboard.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function LoginPage() {
  return <LoginForm />;
}
