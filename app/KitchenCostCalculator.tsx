"use client";

import { useEffect, useMemo, useState } from "react";
import { Calculator, CheckCircle2, MessageCircle, PlayCircle, X } from "lucide-react";
import { useCmsSettings } from "./lib/useCmsData";

type CalculatorMode = "kitchen" | "flooring";

export type KitchenEstimate = {
  mode: CalculatorMode;
  title: string;
  total: number;
  message: string;
  summary: string[];
};

const doorRates = [
  { label: "Lamination / tactile", rate: 1100 },
  { label: "Polyester", rate: 1500 },
  { label: "PVC", rate: 1800 },
  { label: "Glass and aluminium", rate: 2000 },
];

const frameRate = 1200;
const tileRate = 500;

export function KitchenCostCalculator({
  compact = false,
  onEstimateChange,
}: {
  compact?: boolean;
  onEstimateChange?: (estimate: KitchenEstimate | null) => void;
}) {
  const { settings, isLoading } = useCmsSettings();
  const [mode, setMode] = useState<CalculatorMode>("kitchen");
  const [doorArea, setDoorArea] = useState("");
  const [finish, setFinish] = useState(doorRates[0].label);
  const [includeFrame, setIncludeFrame] = useState(false);
  const [frameArea, setFrameArea] = useState("");
  const [tileArea, setTileArea] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const selectedFinish = doorRates.find((item) => item.label === finish) ?? doorRates[0];
  const doorSqft = parsePositiveNumber(doorArea);
  const frameSqft = parsePositiveNumber(frameArea);
  const tileSqft = parsePositiveNumber(tileArea);

  const estimate = useMemo<KitchenEstimate | null>(() => {
    if (mode === "kitchen") {
      if (!doorSqft) return null;

      const doorCost = doorSqft * selectedFinish.rate;
      const frameCost = includeFrame ? frameSqft * frameRate : 0;
      const total = doorCost + frameCost;
      const summary = [
        `Cabinet doors: ${doorSqft} sq ft x Rs. ${selectedFinish.rate.toLocaleString("en-PK")} = ${formatPkr(doorCost)}`,
        `Finish: ${selectedFinish.label}`,
      ];

      if (includeFrame) {
        summary.push(`Cabinet frame: ${frameSqft || 0} sq ft x Rs. ${frameRate.toLocaleString("en-PK")} = ${formatPkr(frameCost)}`);
      } else {
        summary.push("Cabinet frame: Not included");
      }

      return {
        mode,
        title: "Kitchen makeover estimate",
        total,
        summary,
        message: buildInquiryMessage("Kitchen makeover", summary, total),
      };
    }

    if (!tileSqft) return null;

    const total = tileSqft * tileRate;
    const summary = [
      `Flooring area: ${tileSqft} sq ft x Rs. ${tileRate.toLocaleString("en-PK")} = ${formatPkr(total)}`,
      "Assumption: selected tile material is under Rs. 2,500 per meter",
      "Note: premium tiles may change the estimate",
    ];

    return {
      mode,
      title: "Flooring estimate",
      total,
      summary,
      message: buildInquiryMessage("Flooring", summary, total),
    };
  }, [doorSqft, frameSqft, includeFrame, mode, selectedFinish.label, selectedFinish.rate, tileSqft]);

  useEffect(() => {
    onEstimateChange?.(estimate);
  }, [estimate, onEstimateChange]);

  useEffect(() => {
    if (!isVideoOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsVideoOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  const whatsappHref = estimate && !isLoading
    ? `${settings.whatsapp}?text=${encodeURIComponent(estimate.message)}`
    : "";

  return (
    <section className={compact ? "" : "mx-auto max-w-[1360px] px-5 py-12 sm:px-8 lg:py-14"}>
      <div className={`overflow-hidden rounded-[24px] bg-black text-white ${compact ? "" : "grid lg:grid-cols-[0.9fr_1.1fr]"}`}>
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-8 xl:p-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white/65">
              <Calculator size={15} />
              Kitchen estimate studio
            </p>
            <h2 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[0.96] tracking-normal sm:text-7xl">
              Know your kitchen number before the first call.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-white/62">
              Get a working estimate for cabinet doors, optional cabinet frames,
              or flooring. It is not a final quote, but it gives you a clear
              starting point before a consultation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="group grid gap-4 rounded-[18px] bg-white/8 p-4 text-left transition hover:bg-white/12 sm:grid-cols-[96px_1fr] sm:items-center"
          >
            <span className="grid aspect-video place-items-center rounded-[14px] bg-white text-black shadow-xl transition group-hover:bg-[#d9c6b4]">
              <PlayCircle size={34} />
            </span>
            <span>
              <span className="block text-sm font-extrabold text-white">
                Watch before you measure
              </span>
              <span className="mt-2 block text-sm font-medium leading-6 text-white/62">
                A quick guide to calculating square feet, so your estimate is
                closer to reality before you send it.
              </span>
            </span>
          </button>

          {isVideoOpen ? (
            <div className="fixed inset-0 z-50 bg-black/90 p-3 text-white backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label="How to calculate square feet video">
              <button type="button" className="absolute inset-0 cursor-default" aria-label="Close video backdrop" onClick={() => setIsVideoOpen(false)} />
              <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/45">Measurement guide</p>
                    <h3 className="mt-1 text-2xl font-extrabold">How to calculate square feet</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(false)}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black transition hover:bg-[#d9c6b4]"
                    aria-label="Close video"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-[22px] bg-neutral-950 shadow-2xl">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/p0WgkJG-B_Y?si=gN_1p3TjRxASD2Hj&autoplay=1"
                    title="How to calculate kitchen square feet"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-white/55">
                  After watching, enter your cabinet or flooring area in square
                  feet and the calculator will prepare a working estimate.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="bg-[#f4f0ea] p-4 text-neutral-950 sm:p-6 lg:p-6 xl:p-8">
          <div className="rounded-[22px] bg-white p-4 shadow-2xl sm:p-5 xl:p-6">
            <div className="grid gap-2 sm:grid-cols-2">
              <ModeButton active={mode === "kitchen"} label="Kitchen makeover" onClick={() => setMode("kitchen")} />
              <ModeButton active={mode === "flooring"} label="Flooring" onClick={() => setMode("flooring")} />
            </div>

            {mode === "kitchen" ? (
              <div className="mt-5 grid gap-4 xl:mt-6 xl:gap-5">
                <Field label="Cabinet door area" suffix="sq ft" value={doorArea} onChange={setDoorArea} placeholder="Example: 80" />
                <label className="block">
                  <span className="text-sm font-extrabold text-neutral-700">Door finish</span>
                  <select
                    value={finish}
                    onChange={(event) => setFinish(event.target.value)}
                    className="mt-2 h-12 w-full rounded-[14px] border border-black/10 bg-[#f8f5f1] px-4 text-sm font-bold outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-black/5"
                  >
                    {doorRates.map((item) => (
                      <option key={item.label} value={item.label}>
                        {item.label} - Rs. {item.rate.toLocaleString("en-PK")}/sq ft
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center justify-between gap-4 rounded-[16px] bg-[#f8f5f1] p-4">
                  <span>
                    <span className="block text-sm font-extrabold text-neutral-950">Include cabinet frame</span>
                    <span className="mt-1 block text-xs font-bold text-neutral-500">Rs. {frameRate.toLocaleString("en-PK")}/sq ft</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={includeFrame}
                    onChange={(event) => setIncludeFrame(event.target.checked)}
                    className="h-5 w-5 accent-neutral-950"
                  />
                </label>
                {includeFrame ? (
                  <Field label="Cabinet frame area" suffix="sq ft" value={frameArea} onChange={setFrameArea} placeholder="Example: 60" />
                ) : null}
              </div>
            ) : (
              <div className="mt-5 grid gap-4 xl:mt-6 xl:gap-5">
                <Field label="Flooring area" suffix="sq ft" value={tileArea} onChange={setTileArea} placeholder="Example: 120" />
                <div className="rounded-[16px] bg-[#f8f5f1] p-4">
                  <p className="text-sm font-extrabold text-neutral-950">Tile calculation rule</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-neutral-600">
                    If your selected tile material is under Rs. 2,500 per meter,
                    the estimate is Rs. 500 per sq ft with installation.
                    Premium tiles may change the final estimate.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5 rounded-[18px] bg-neutral-950 p-5 text-white xl:mt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/45">Working estimate</p>
              <p className="mt-3 text-5xl font-extrabold tracking-normal">
                {estimate ? formatPkr(estimate.total) : "Rs. 0"}
              </p>
              <div className="mt-5 grid gap-2">
                {(estimate?.summary ?? ["Enter your measurements to see the estimate."]).map((item) => (
                  <p key={item} className="flex gap-2 text-sm font-medium leading-6 text-white/68">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#d9c6b4]" />
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-xs font-semibold leading-5 text-white/45">
                This is an approximate estimate. Final quote depends on site
                condition, exact measurements, material selection, hardware, and
                installation complexity.
              </p>
              {estimate && whatsappHref ? (
                <a href={whatsappHref} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-black transition hover:bg-[#d9c6b4]">
                  Send estimate on WhatsApp <MessageCircle size={17} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-full px-4 text-sm font-extrabold transition ${active ? "bg-neutral-950 text-white" : "bg-[#f4f0ea] text-neutral-950 hover:bg-[#e8ddd0]"}`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  suffix,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  suffix: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold text-neutral-700">{label}</span>
      <span className="mt-2 flex h-12 items-center overflow-hidden rounded-[14px] border border-black/10 bg-[#f8f5f1] focus-within:border-neutral-950 focus-within:ring-4 focus-within:ring-black/5">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputMode="decimal"
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm font-bold outline-none"
        />
        <span className="grid h-full place-items-center bg-white px-4 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
          {suffix}
        </span>
      </span>
    </label>
  );
}

function parsePositiveNumber(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatPkr(value: number) {
  return `Rs. ${Math.round(value).toLocaleString("en-PK")}`;
}

function buildInquiryMessage(mode: string, summary: string[], total: number) {
  return [
    "Hi Steed Art, I used the kitchen estimate calculator.",
    "",
    `Mode: ${mode}`,
    ...summary,
    "",
    `Approx total: ${formatPkr(total)}`,
    "",
    "Please confirm the scope and guide me with the next steps.",
  ].join("\n");
}
