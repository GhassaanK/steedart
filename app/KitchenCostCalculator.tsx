"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Calculator, Check, Info, MessageCircle, PlayCircle, X } from "lucide-react";
import { useCmsSettings } from "./lib/useCmsData";

type CalculatorMode = "kitchen" | "flooring";

export type KitchenEstimate = {
  mode: CalculatorMode;
  title: string;
  total: number;
  message: string;
  summary: string[];
  complete: boolean;
  calculations: {
    label: string;
    formula: string;
    amount?: number;
    pending?: boolean;
  }[];
  totalFormula: string;
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
      const complete = !includeFrame || frameSqft > 0;
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
        title: complete ? "Kitchen makeover estimate" : "Partial kitchen estimate",
        total,
        summary,
        message: buildInquiryMessage("Kitchen makeover", summary, total),
        complete,
        calculations: [
          {
            label: `${selectedFinish.label} cabinet doors`,
            formula: `${formatNumber(doorSqft)} sq ft x Rs. ${selectedFinish.rate.toLocaleString("en-PK")}`,
            amount: doorCost,
          },
          ...(includeFrame
            ? [
                frameSqft
                  ? {
                      label: "Cabinet frame",
                      formula: `${formatNumber(frameSqft)} sq ft x Rs. ${frameRate.toLocaleString("en-PK")}`,
                      amount: frameCost,
                    }
                  : {
                      label: "Cabinet frame",
                      formula: "Enter the frame area to complete this estimate",
                      pending: true,
                    },
              ]
            : []),
        ],
        totalFormula:
          includeFrame && frameSqft
            ? `${formatPkr(doorCost)} + ${formatPkr(frameCost)}`
            : `${formatPkr(doorCost)} for cabinet doors`,
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
      complete: true,
      calculations: [
        {
          label: "Flooring with installation",
          formula: `${formatNumber(tileSqft)} sq ft x Rs. ${tileRate.toLocaleString("en-PK")}`,
          amount: total,
        },
      ],
      totalFormula: `${formatNumber(tileSqft)} sq ft x Rs. ${tileRate.toLocaleString("en-PK")}`,
    };
  }, [doorSqft, frameSqft, includeFrame, mode, selectedFinish.label, selectedFinish.rate, tileSqft]);

  useEffect(() => {
    onEstimateChange?.(estimate?.complete ? estimate : null);
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

  const whatsappHref = estimate?.complete && !isLoading
    ? `${settings.whatsapp}?text=${encodeURIComponent(estimate.message)}`
    : "";

  return (
    <section className={compact ? "" : "mx-auto max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16"}>
      <div className="overflow-hidden rounded-[22px] bg-black">
        <div className="grid gap-8 p-6 text-white sm:p-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:p-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-black">
              <Calculator size={15} />
              Kitchen estimate studio
            </p>
            <h2 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[0.96] tracking-normal sm:text-6xl lg:text-7xl">
              Know the number before the first call.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-[1fr_280px] sm:items-center">
            <div>
              <p className="text-base font-medium leading-7 text-white/74">
                Start with the short measurement guide, then enter your areas.
                You will see every rate, equation, and subtotal before sending
                the estimate.
              </p>
              <div className="mt-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.15em] text-white/48">
                <span>1. Watch</span>
                <ArrowUpRight size={14} />
                <span>2. Measure</span>
                <ArrowUpRight size={14} />
                <span>3. Estimate</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="group relative aspect-[16/10] overflow-hidden rounded-[14px] bg-neutral-800 text-left shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label="Watch how to calculate square feet"
            >
              <Image
                src="/images/measurement-video.jpg"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 280px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/38 transition group-hover:bg-black/48" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 text-white">
                <span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.17em] text-white/66">
                    Step 1
                  </span>
                  <span className="mt-1 block text-sm font-extrabold">
                    Watch how to measure
                  </span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black">
                  <PlayCircle size={23} />
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="bg-[#f4f0ea] p-3 text-neutral-950 sm:p-5 lg:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div className="rounded-[16px] bg-white p-5 sm:p-6">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#76563f]">
                  Step 2: Enter measurements
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-neutral-600">
                  Choose the work you want to estimate. Values are in square
                  feet.
                </p>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <ModeButton active={mode === "kitchen"} label="Kitchen makeover" onClick={() => setMode("kitchen")} />
                <ModeButton active={mode === "flooring"} label="Flooring" onClick={() => setMode("flooring")} />
              </div>

              {mode === "kitchen" ? (
                <div className="mt-6 grid gap-5">
                  <Field label="Cabinet door area" suffix="sq ft" value={doorArea} onChange={setDoorArea} placeholder="Example: 80" />
                  <fieldset>
                    <legend className="text-sm font-extrabold text-neutral-950">
                      Choose a cabinet door finish
                    </legend>
                    <p className="mt-1 text-xs font-medium leading-5 text-neutral-500">
                      Rates shown are per square foot.
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {doorRates.map((item) => {
                        const isSelected = item.label === finish;

                        return (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => setFinish(item.label)}
                            aria-pressed={isSelected}
                            className={`relative min-h-[82px] rounded-[10px] border p-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                              isSelected
                                ? "border-black bg-black text-white shadow-[0_7px_18px_rgba(0,0,0,0.14)]"
                                : "border-black/12 bg-[#f8f5f1] text-neutral-950 hover:border-black/35 hover:bg-white"
                            }`}
                          >
                            <span className="block pr-7 text-sm font-extrabold leading-5">
                              {item.label}
                            </span>
                            <span className={`mt-2 block text-sm font-bold ${isSelected ? "text-white/72" : "text-[#76563f]"}`}>
                              Rs. {item.rate.toLocaleString("en-PK")} / sq ft
                            </span>
                            {isSelected ? (
                              <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white text-black">
                                <Check size={14} strokeWidth={3} />
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-[12px] border p-4 transition ${
                    includeFrame
                      ? "border-black bg-white shadow-[0_5px_16px_rgba(0,0,0,0.08)]"
                      : "border-black/10 bg-[#f8f5f1] hover:border-black/30"
                  }`}>
                    <span>
                      <span className="block text-sm font-extrabold text-neutral-950">Include cabinet frame</span>
                      <span className="mt-1 block text-sm font-bold text-[#76563f]">
                        Rs. {frameRate.toLocaleString("en-PK")} / sq ft
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={includeFrame}
                      onChange={(event) => setIncludeFrame(event.target.checked)}
                      className="h-6 w-6 accent-neutral-950"
                    />
                  </label>
                  {includeFrame ? (
                    <Field label="Cabinet frame area" suffix="sq ft" value={frameArea} onChange={setFrameArea} placeholder="Example: 60" />
                  ) : null}
                </div>
              ) : (
                <div className="mt-6 grid gap-5">
                  <Field label="Flooring area" suffix="sq ft" value={tileArea} onChange={setTileArea} placeholder="Example: 120" />
                  <div className="rounded-[12px] border border-black/8 bg-[#f8f5f1] p-4">
                    <p className="text-sm font-extrabold text-neutral-950">Installed tile rate</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-neutral-600">
                      Rs. 500 per sq ft when the selected tile material is under
                      Rs. 2,500 per meter. Premium tiles may change the final
                      estimate.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <EstimatePanel
              estimate={estimate}
              mode={mode}
              whatsappHref={whatsappHref}
            />
          </div>
        </div>
      </div>

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
            <div className="relative aspect-video overflow-hidden rounded-[18px] bg-neutral-950 shadow-2xl">
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
              After watching, enter your cabinet or flooring area in square feet
              and the calculator will prepare a working estimate.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function EstimatePanel({
  estimate,
  mode,
  whatsappHref,
}: {
  estimate: KitchenEstimate | null;
  mode: CalculatorMode;
  whatsappHref: string;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-neutral-950 text-white">
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#d9c6b4]">
            Step 3: Your estimate
          </p>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/70">
            Approximate
          </span>
        </div>
        <p className="mt-4 text-[2.5rem] font-extrabold leading-none tracking-normal sm:text-6xl">
          {estimate ? formatPkr(estimate.total) : "Rs. 0"}
        </p>
        <p className="mt-3 text-sm font-medium leading-6 text-white/72">
          {estimate
            ? estimate.complete
              ? "Every part of this number is shown below."
              : "Cabinet doors are calculated. Add the frame area to complete the total."
            : "Enter an area to see the calculation update here."}
        </p>
      </div>

      <div className="border-t border-white/14 bg-white/[0.04] px-5 sm:px-7">
        <p className="py-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white/55">
          Calculation breakdown
        </p>
        {estimate ? (
          <ol className="border-t border-white/12">
            {estimate.calculations.map((calculation, index) => (
              <li
                key={`${calculation.label}-${index}`}
                className="grid gap-3 border-b border-white/12 py-5 sm:grid-cols-[34px_1fr_auto] sm:items-center"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-extrabold text-black">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-white">
                    {calculation.label}
                  </span>
                  <span className={`mt-1 block text-sm font-medium leading-6 ${calculation.pending ? "text-[#f0c58f]" : "text-white/70"}`}>
                    {calculation.formula}
                  </span>
                </span>
                <span className={`text-left text-base font-extrabold sm:text-right ${calculation.pending ? "text-[#f0c58f]" : "text-white"}`}>
                  {calculation.amount !== undefined
                    ? `= ${formatPkr(calculation.amount)}`
                    : "Waiting"}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="border-t border-white/12 py-6">
            <div className="grid gap-3 sm:grid-cols-[34px_1fr] sm:items-center">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-extrabold text-white/60">
                1
              </span>
              <p className="text-sm font-medium leading-6 text-white/60">
                {mode === "kitchen"
                  ? "Cabinet door area x selected finish rate"
                  : "Flooring area x installed tile rate"}
              </p>
            </div>
          </div>
        )}
      </div>

      {estimate ? (
        <div className="grid gap-2 border-t border-white/14 bg-white px-5 py-5 text-black sm:grid-cols-[1fr_auto] sm:items-center sm:px-7">
          <span>
            <span className="block text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-500">
              Total calculation
            </span>
            <span className="mt-1 block text-sm font-bold text-neutral-700">
              {estimate.totalFormula}
            </span>
          </span>
          <span className="text-2xl font-extrabold sm:text-right">
            {formatPkr(estimate.total)}
          </span>
        </div>
      ) : null}

      <div className="p-5 sm:p-7">
        <p className="flex gap-2 text-xs font-semibold leading-5 text-white/60">
          <Info size={15} className="mt-0.5 shrink-0 text-[#d9c6b4]" />
          <span>
            Final pricing depends on exact measurements, site condition,
            materials, hardware, and installation complexity.
          </span>
        </p>
        {estimate?.complete && whatsappHref ? (
          <a href={whatsappHref} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-black transition hover:bg-[#d9c6b4]">
            Share with us <MessageCircle size={17} />
          </a>
        ) : null}
      </div>
    </div>
  );
}

function ModeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-full px-4 text-[15px] font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 ${active ? "bg-neutral-950 text-white shadow-lg" : "bg-[#f4f0ea] text-neutral-950 hover:bg-[#e8ddd0]"}`}
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
      <span className="text-sm font-extrabold text-neutral-950">{label}</span>
      <span className="mt-2 flex h-14 items-center overflow-hidden rounded-[12px] border border-black/15 bg-[#f8f5f1] focus-within:border-neutral-950 focus-within:ring-4 focus-within:ring-black/5">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputMode="decimal"
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-base font-bold text-neutral-950 outline-none placeholder:text-neutral-400"
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

function formatNumber(value: number) {
  return value.toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  });
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
