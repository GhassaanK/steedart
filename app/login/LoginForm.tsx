"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { auth } from "../lib/firebase";

const errorMessages: Record<string, string> = {
  "auth/invalid-credential": "The email or password is not correct.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account exists for this email.",
  "auth/wrong-password": "The email or password is not correct.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/admin";
    } catch (caughtError) {
      if (caughtError instanceof FirebaseError) {
        setError(errorMessages[caughtError.code] ?? "Unable to sign in. Please check your details.");
      } else {
        setError("Unable to sign in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white p-4 text-neutral-950 sm:p-6">
      <section className="mx-auto grid min-h-[calc(100vh-32px)] max-w-[1360px] overflow-hidden rounded-[28px] bg-[#f4f0ea] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between p-6 sm:p-10">
          <Link href="/" className="flex w-fit items-center gap-3" aria-label="Steed Art home">
            <Image src="/steedartlogo.png" alt="Steed Art logo" width={48} height={48} className="h-12 w-12 object-contain" priority />
            <span className="text-lg font-extrabold tracking-[0.16em]">STEED ART</span>
          </Link>

          <div className="my-14 max-w-xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">
              Studio access
            </p>
            <h1 className="mt-6 text-6xl font-extrabold leading-[0.98] tracking-normal sm:text-7xl">
              Sign in to manage the studio.
            </h1>
            <p className="mt-6 max-w-md text-sm font-medium leading-7 text-neutral-600">
              Email and password access for Steed Art project content,
              enquiries, and future Realtime Database updates.
            </p>
          </div>

          <p className="text-sm font-semibold text-neutral-500">hello@steedart.pk</p>
        </div>

        <div className="flex items-center justify-center bg-black p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#76563f]">
                Login
              </p>
              <h2 className="mt-3 text-3xl font-extrabold">Welcome back</h2>
            </div>

            <label className="block">
              <span className="text-sm font-extrabold text-neutral-700">Email</span>
              <span className="mt-2 flex h-13 items-center gap-3 rounded-[16px] border border-black/10 bg-[#f8f5f1] px-4">
                <Mail size={18} className="text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                />
              </span>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-extrabold text-neutral-700">Password</span>
              <span className="mt-2 flex h-13 items-center gap-3 rounded-[16px] border border-black/10 bg-[#f8f5f1] px-4">
                <LockKeyhole size={18} className="text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Password"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="grid h-8 w-8 place-items-center rounded-full text-neutral-500 transition hover:bg-white hover:text-black"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
            </label>

            {error ? (
              <p className="mt-5 rounded-[16px] bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in" : "Sign in"}
              <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
