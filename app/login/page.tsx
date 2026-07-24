import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | Steed Art",
  description: "Sign in to the Steed Art studio dashboard.",
};

export default function LoginPage() {
  return <LoginForm />;
}
