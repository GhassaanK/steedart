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
    <form onSubmit={handleSubmit} className="surface-card rounded-[22px] p-6 sm:p-8 lg:p-10">
      <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#76563f]">Project enquiry</p>
      <h2 className="mt-5 max-w-lg text-4xl font-extrabold leading-tight">
        Tell us what is not working, what you want changed, and what level of finish you have in mind.
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Field label="Name" value={form.name} placeholder="Your name" onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
        <Field label="Phone" value={form.phone} placeholder="+92" onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
        <Field label="Email" value={form.email} placeholder="you@example.com" onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
        <Field label="Project budget" value={form.budget} placeholder="1 lac PKR plus" onChange={(value) => setForm((current) => ({ ...current, budget: value }))} />
      </div>
      <label className="mt-4 block">
        <span className="text-sm font-extrabold text-neutral-700">Project note</span>
        <textarea required value={form.note} onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} className="mt-2 min-h-44 w-full rounded-[14px] border border-black/10 bg-white p-4 text-sm font-medium outline-none transition focus:border-neutral-950" placeholder="Kitchen cabinets, shelving, furniture, full renovation, or full interior direction" />
      </label>
      {status ? <p className="mt-5 rounded-[14px] bg-white p-4 text-sm font-extrabold text-green-700">{status}</p> : null}
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
      <input required value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-[14px] border border-black/10 bg-white px-4 text-sm font-medium outline-none transition focus:border-neutral-950" placeholder={placeholder} />
    </label>
  );
}
