"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { saveEnquiry } from "../lib/cms";
import { useCmsSettings } from "../lib/useCmsData";

export function ContactForm() {
  const { settings, isLoading } = useCmsSettings();
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", note: "" });
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");
    try {
      await saveEnquiry(form);
      setForm({ name: "", phone: "", email: "", budget: "", note: "" });
      setStatus("Your enquiry has been sent.");
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form id="project-enquiry" onSubmit={handleSubmit} className="contact-form surface-card scroll-mt-6 p-6 sm:p-8 lg:p-10">
      <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">Project enquiry</p>
      <h2 className="mt-5 max-w-lg text-4xl font-extrabold leading-tight">
        What do you have in mind?
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Field label="Name" value={form.name} placeholder="Your name" onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
        <Field label="Phone" value={form.phone} placeholder="+92" onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
        <Field label="Email" value={form.email} placeholder="you@example.com" onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
        <Field label="Project budget" value={form.budget} placeholder="Your approximate range" onChange={(value) => setForm((current) => ({ ...current, budget: value }))} />
      </div>
      <p className="mt-3 text-sm font-semibold text-neutral-500">
        Roughly is fine. We will confirm scope on the call.
      </p>
      <label className="mt-4 block">
        <span className="text-sm font-extrabold text-neutral-700">Project note</span>
        <textarea required value={form.note} onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} className="mt-2 min-h-44 w-full rounded-[14px] border border-black/10 bg-white p-4 text-sm font-medium outline-none transition focus:border-neutral-950" placeholder="Tell us about the property, rooms involved, current condition, and what you want to change" />
      </label>
      {status ? <p role="status" className={`mt-5 bg-white p-4 text-sm font-semibold ${status === "Your enquiry has been sent." ? "text-green-700" : "text-red-700"}`}>{status}</p> : null}
      <p className="mt-5 max-w-xl text-xs font-semibold leading-5 text-neutral-500">
        By sending this enquiry, you ask Steed Art to use the details above to
        review and respond to your project. Read our{" "}
        <a href="/privacy-policy" className="font-extrabold text-neutral-950 underline underline-offset-4">
          Privacy Policy
        </a>.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button disabled={isSaving} type="submit" className="inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-extrabold text-white transition hover:bg-[#6d4b34] disabled:cursor-not-allowed disabled:opacity-60">
          {isSaving ? "Sending" : "Send enquiry"} <Mail size={17} className={isSaving ? "animate-pulse" : ""} />
        </button>
        {isLoading ? (
          <span className="h-12 w-36 animate-pulse rounded-full bg-white" />
        ) : (
          <a href={settings.whatsapp} className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-black transition hover:bg-[#eadfd4]">
            WhatsApp <FaWhatsapp size={17} />
          </a>
        )}
      </div>
    </form>
  );
}

function Field({ label, value, placeholder, onChange }: { label: string; value: string; placeholder: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold text-neutral-700">{label}</span>
      <input required type={label === "Email" ? "email" : label === "Phone" ? "tel" : "text"} autoComplete={label === "Email" ? "email" : label === "Phone" ? "tel" : label === "Name" ? "name" : undefined} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-[14px] border border-black/10 bg-white px-4 text-sm font-medium outline-none transition focus:border-neutral-950" placeholder={placeholder} />
    </label>
  );
}
