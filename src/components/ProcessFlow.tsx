"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./ui/SectionHeader";

const STEP_MS = 3600;

const steps = [
  {
    key: "source",
    index: "01",
    title: "Source",
    kicker: "Material ingestion",
    body: "Packed PVC, NTR and Teslin sheets, lanyard rolls and badge stock are quality-checked and loaded into the pipeline.",
    points: ["Audited raw-material suppliers", "Batch-tagged sheets & consumables", "Stock reserved per order"],
  },
  {
    key: "validate",
    index: "02",
    title: "Validate",
    kicker: "Data & proofing",
    body: "Customer photos and database records sync from the iDM app and web dashboard. Every record is proof-checked automatically.",
    points: ["Bulk Excel & photo upload", "Auto-check names, photos & IDs", "Digital proof approval"],
  },
  {
    key: "produce",
    index: "03",
    title: "Produce",
    kicker: "Print · laminate · punch",
    body: "High-speed card printers, lamination and punching machines run scheduled batches to standard specs.",
    points: ["High-volume batch printing", "Lamination & precision punching", "QC scan against data sheet"],
  },
  {
    key: "deliver",
    index: "04",
    title: "Deliver",
    kicker: "Pack & dispatch",
    body: "Cards are packed by batch into labelled boxes and dispatched by express courier with live tracking.",
    points: ["Batch-wise packing & labels", "Express courier dispatch", "Live order tracking link"],
  },
] as const;

type Key = (typeof steps)[number]["key"];

/** Animated vector illustrations, one per stage. Colours follow the site palette. */
function Illustration({ step, active }: { step: Key; active: boolean }) {
  const run = active ? "pf-run" : "";
  if (step === "source")
    return (
      <svg viewBox="0 0 240 160" className={`h-full w-full ${run}`} aria-hidden>
        <rect x="16" y="132" width="208" height="4" rx="2" fill="#dfe5f0" />
        {/* Cartons */}
        <rect x="24" y="84" width="62" height="48" rx="4" fill="#c9a36b" />
        <rect x="24" y="84" width="62" height="10" fill="#b48c55" />
        <rect x="38" y="104" width="34" height="14" rx="2" fill="#fff" />
        <text x="55" y="114.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0755a9">PVC</text>
        <rect x="32" y="40" width="50" height="44" rx="4" fill="#d6b480" />
        <rect x="32" y="40" width="50" height="9" fill="#c19b62" />
        <rect x="42" y="58" width="30" height="13" rx="2" fill="#fff" />
        <text x="57" y="67.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0755a9">NTR</text>
        {/* Sheet stack */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={104 + (i % 2)} y={124 - i * 5} width="70" height="5" rx="1" fill={i % 2 ? "#ffffff" : "#eef2f9"} stroke="#c7d2e6" strokeWidth="0.8" />
        ))}
        <rect className="pf-slide" x="104" y="88" width="70" height="5" rx="1" fill="#ffffff" stroke="#1d4ed8" strokeWidth="1" />
        {/* Lanyard roll */}
        <g className="pf-spin" style={{ transformOrigin: "200px 108px" }}>
          <circle cx="200" cy="108" r="22" fill="#1d4ed8" />
          <circle cx="200" cy="108" r="15" fill="#2a5ee6" />
          <circle cx="200" cy="108" r="6" fill="#fff" />
          <rect x="198" y="86" width="4" height="8" fill="#93b4ff" />
        </g>
        {/* Hooks */}
        <g fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round">
          <path d="M120 40v10a6 6 0 1 0 6 6" />
          <path d="M140 34v10a6 6 0 1 0 6 6" />
          <path d="M160 40v10a6 6 0 1 0 6 6" />
        </g>
        <circle className="pf-ping" cx="188" cy="40" r="10" fill="#16a34a" />
        <path d="m183 40 3.5 3.5L193 37" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (step === "validate")
    return (
      <svg viewBox="0 0 240 160" className={`h-full w-full ${run}`} aria-hidden>
        {/* Laptop */}
        <rect x="18" y="26" width="128" height="88" rx="6" fill="#0a1a3a" />
        <rect x="24" y="32" width="116" height="76" rx="3" fill="#f6f8fc" />
        <rect x="24" y="32" width="116" height="12" rx="3" fill="#1d4ed8" />
        <circle cx="31" cy="38" r="2" fill="#fff" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(30 ${50 + i * 14})`}>
            <rect width="10" height="10" rx="2" fill="#c7d2e6" />
            <rect x="15" y="2" width="44" height="3" rx="1.5" fill="#94a3b8" />
            <rect x="15" y="7" width="28" height="2.5" rx="1.25" fill="#cbd5e1" />
            <circle className="pf-tick" style={{ animationDelay: `${0.4 + i * 0.35}s` }} cx="100" cy="5" r="4" fill="#16a34a" />
          </g>
        ))}
        <rect className="pf-scan" x="24" y="46" width="116" height="2" fill="#0ea5a4" opacity="0.8" />
        <path d="M8 114h156l-8 8H16z" fill="#1e293b" />
        {/* Sync line */}
        <path d="M150 70h26" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 4" />
        <circle className="pf-sync" cx="150" cy="70" r="3.5" fill="#0ea5a4" />
        {/* Phone */}
        <rect x="178" y="30" width="48" height="92" rx="8" fill="#0a1a3a" />
        <rect x="182" y="38" width="40" height="76" rx="3" fill="#fff" />
        <rect x="190" y="46" width="24" height="28" rx="3" fill="#dbe4f5" />
        <circle cx="202" cy="56" r="6" fill="#94a3b8" />
        <path d="M193 74c2-7 16-7 18 0z" fill="#94a3b8" />
        <rect x="188" y="80" width="28" height="3" rx="1.5" fill="#475069" />
        <rect x="192" y="86" width="20" height="2.5" rx="1.25" fill="#cbd5e1" />
        <rect x="188" y="96" width="28" height="10" rx="5" fill="#1d4ed8" />
        {/* Big check */}
        <g className="pf-pop" style={{ transformOrigin: "202px 136px" }}>
          <circle cx="202" cy="136" r="13" fill="#16a34a" />
          <path d="m195 136 5 5 9-9" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  if (step === "produce")
    return (
      <svg viewBox="0 0 240 160" className={`h-full w-full ${run}`} aria-hidden>
        <rect x="16" y="132" width="208" height="4" rx="2" fill="#dfe5f0" />
        {/* Printer */}
        <rect x="22" y="58" width="104" height="74" rx="8" fill="#1e293b" />
        <rect x="22" y="58" width="104" height="18" rx="8" fill="#334155" />
        <rect x="34" y="84" width="44" height="16" rx="3" fill="#0f172a" />
        <circle className="pf-blink" cx="40" cy="67" r="3" fill="#22c55e" />
        <circle cx="50" cy="67" r="3" fill="#f59e0b" />
        <rect x="88" y="86" width="30" height="4" rx="2" fill="#0ea5a4" />
        <rect x="118" y="104" width="12" height="6" rx="1" fill="#0f172a" />
        {/* Gear */}
        <g className="pf-spin" style={{ transformOrigin: "100px 116px" }}>
          <circle cx="100" cy="116" r="9" fill="none" stroke="#64748b" strokeWidth="4" strokeDasharray="4 3" />
          <circle cx="100" cy="116" r="3" fill="#64748b" />
        </g>
        {/* Ejecting cards */}
        {[0, 1, 2].map((i) => (
          <g key={i} className="pf-eject" style={{ animationDelay: `${i * 0.9}s` }}>
            <rect x="122" y="100" width="40" height="26" rx="3" fill="#fff" stroke="#c7d2e6" />
            <rect x="122" y="100" width="40" height="7" rx="3" fill="#0755a9" />
            <rect x="126" y="110" width="9" height="11" rx="1" fill="#cbd5e1" />
            <rect x="138" y="111" width="18" height="2.5" rx="1" fill="#475069" />
            <rect x="138" y="116" width="12" height="2" rx="1" fill="#94a3b8" />
          </g>
        ))}
        {/* Output stack */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="176" y={124 - i * 3.2} width="44" height="8" rx="2" fill={i === 4 ? "#0755a9" : "#fff"} stroke="#c7d2e6" strokeWidth="0.8" />
        ))}
        {/* Laminator */}
        <rect x="150" y="34" width="70" height="26" rx="5" fill="#475569" />
        <rect x="158" y="44" width="54" height="5" rx="2.5" fill="#f59e0b" className="pf-heat" />
        <text x="185" y="30" textAnchor="middle" fontSize="7" fontWeight="600" fill="#8a93a8">LAMINATE · PUNCH</text>
      </svg>
    );
  return (
    <svg viewBox="0 0 240 160" className={`h-full w-full ${run}`} aria-hidden>
      <rect x="0" y="132" width="240" height="4" rx="2" fill="#dfe5f0" />
      {/* Boxes */}
      <rect x="18" y="92" width="44" height="40" rx="3" fill="#c9a36b" />
      <rect x="18" y="92" width="44" height="8" fill="#b48c55" />
      <rect x="26" y="108" width="28" height="12" rx="2" fill="#fff" />
      <rect x="29" y="112" width="22" height="2" fill="#0755a9" />
      <rect x="29" y="116" width="14" height="1.6" fill="#94a3b8" />
      <rect x="24" y="56" width="34" height="36" rx="3" fill="#d6b480" />
      <rect x="24" y="56" width="34" height="7" fill="#c19b62" />
      <rect x="66" y="104" width="30" height="28" rx="3" fill="#d6b480" />
      <rect x="66" y="104" width="30" height="6" fill="#c19b62" />
      {/* Truck */}
      <g className="pf-drive">
        <g className="pf-lines" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
          <path d="M106 96h14M100 106h18M108 116h12" />
        </g>
        <rect x="124" y="78" width="66" height="42" rx="4" fill="#1d4ed8" />
        <text x="157" y="103" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">EXPRESS</text>
        <path d="M190 90h20l12 14v16h-32z" fill="#0a1a3a" />
        <path d="M194 94h14l8 10h-22z" fill="#93c5fd" />
        <circle cx="142" cy="122" r="8" fill="#0f172a" />
        <circle cx="142" cy="122" r="3" fill="#cbd5e1" />
        <circle cx="206" cy="122" r="8" fill="#0f172a" />
        <circle cx="206" cy="122" r="3" fill="#cbd5e1" />
      </g>
      {/* Pin */}
      <g className="pf-bob">
        <path d="M200 20c-9 0-15 6.5-15 14.5C185 46 200 60 200 60s15-14 15-25.5C215 26.5 209 20 200 20Z" fill="#f59e0b" />
        <circle cx="200" cy="34" r="5.5" fill="#fff" />
      </g>
      <path d="M40 40c40-20 90-24 140-6" stroke="#0ea5a4" strokeWidth="2" strokeDasharray="4 5" fill="none" className="pf-route" />
    </svg>
  );
}

export function ProcessFlow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((v) => (v + 1) % steps.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, seen]);

  const step = steps[active];

  return (
    <section ref={ref} id="how-it-works" className="relative overflow-hidden bg-surface py-16 sm:py-24" aria-labelledby="pf-title">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 size-[420px] rounded-full bg-brand/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeader
          label="How iDM works"
          title={["Source → Validate → Produce → Deliver,", "under one roof"]}
          accentLine={1}
          sub="Every order moves through the same four-stage fulfilment lifecycle, tracked in one dashboard."
        />

        {/* Stepper */}
        <div className="relative mt-12 sm:mt-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-1 rounded-full bg-line md:block">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-teal transition-[width] duration-700 ease-[var(--ease-out-expo)]"
              style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <ol className="relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5" role="tablist" aria-label="Fulfilment stages">
            {steps.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <li key={s.key} className="flex flex-col items-center text-center">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="pf-panel"
                    onClick={() => setActive(i)}
                    className="group flex flex-col items-center"
                  >
                    <span
                      className={`relative grid size-14 place-items-center rounded-2xl font-display text-[15px] font-bold transition-[background-color,color,transform,box-shadow] duration-500 ${
                        on
                          ? "scale-110 bg-brand text-white shadow-[0_16px_30px_-12px_rgba(29,78,216,0.7)]"
                          : done
                            ? "bg-teal text-white"
                            : "border border-line bg-white text-graphite group-hover:border-brand group-hover:text-brand"
                      }`}
                    >
                      {done ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        s.index
                      )}
                      {on && <span aria-hidden className="absolute inset-0 rounded-2xl ring-4 ring-brand/20 animate-[pulse-soft_2s_ease-in-out_infinite]" />}
                    </span>
                    <span className={`mt-3 font-display text-[16px] font-semibold ${on ? "text-brand" : "text-ink"}`}>{s.title}</span>
                    <span className="micro mt-1 !text-[10px] text-ash">{s.kicker}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Panel */}
          <div id="pf-panel" role="tabpanel" className="card mt-10 grid overflow-hidden !rounded-[28px] lg:grid-cols-[1.15fr_1fr]">
            <div className="relative bg-gradient-to-br from-brand-tint via-white to-teal-tint p-6 sm:p-10">
              <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" />
              <div key={step.key} className="relative aspect-[3/2] w-full animate-[fade-up_0.6s_var(--ease-out-expo)_both]">
                <Illustration step={step.key} active />
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div key={step.key} className="animate-[fade-up_0.6s_var(--ease-out-expo)_both]">
                <p className="micro text-accent-deep">
                  Stage {step.index} · {step.kicker}
                </p>
                <h3 id="pf-title" className="mt-2 font-display text-[28px] font-bold tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite">{step.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {step.points.map((pt) => (
                    <li key={pt} className="check-item">
                      <span className="check-dot">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex gap-1.5" aria-hidden>
                {steps.map((s, i) => (
                  <span key={s.key} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                    <span
                      key={`${active}-${paused}-${seen}`}
                      className={`block h-full rounded-full bg-brand ${i < active ? "w-full" : "w-0"}`}
                      style={i === active && !paused && seen ? { animation: `pf-fill ${STEP_MS}ms linear forwards` } : undefined}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pf-fill{from{width:0}to{width:100%}}
        @keyframes pf-slide{0%{transform:translate(-90px,-20px);opacity:0}40%{opacity:1}70%,100%{transform:none;opacity:1}}
        @keyframes pf-spin{to{transform:rotate(360deg)}}
        @keyframes pf-ping{0%,100%{opacity:.25}50%{opacity:1}}
        @keyframes pf-scan{0%{transform:translateY(0)}100%{transform:translateY(58px)}}
        @keyframes pf-tick{0%,20%{opacity:0;transform:scale(.3)}35%,100%{opacity:1;transform:none}}
        @keyframes pf-sync{0%{transform:translateX(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(26px);opacity:0}}
        @keyframes pf-pop{0%,55%{transform:scale(0)}70%{transform:scale(1.2)}80%,100%{transform:scale(1)}}
        @keyframes pf-eject{0%{transform:translateX(-30px);opacity:0}15%{opacity:1}60%{transform:translateX(16px);opacity:1}100%{transform:translateX(48px) translateY(-6px);opacity:0}}
        @keyframes pf-blink{0%,100%{opacity:1}50%{opacity:.2}}
        @keyframes pf-heat{0%,100%{fill:#f59e0b}50%{fill:#ef4444}}
        @keyframes pf-drive{0%{transform:translateX(-14px)}50%{transform:translateX(6px)}100%{transform:translateX(-14px)}}
        @keyframes pf-lines{0%,100%{opacity:.2}50%{opacity:1}}
        @keyframes pf-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes pf-route{to{stroke-dashoffset:-36}}
        .pf-run .pf-slide{animation:pf-slide 2.4s var(--ease-out-expo) infinite}
        .pf-run .pf-spin{animation:pf-spin 6s linear infinite}
        .pf-run .pf-ping{animation:pf-ping 1.6s ease-in-out infinite}
        .pf-run .pf-scan{animation:pf-scan 2.2s ease-in-out infinite alternate}
        .pf-run .pf-tick{transform-box:fill-box;transform-origin:center;animation:pf-tick 3s ease-out infinite both}
        .pf-run .pf-sync{animation:pf-sync 1.4s linear infinite}
        .pf-run .pf-pop{animation:pf-pop 3s var(--ease-out-expo) infinite}
        .pf-run .pf-eject{animation:pf-eject 2.7s ease-in-out infinite both}
        .pf-run .pf-blink{animation:pf-blink 1s steps(2) infinite}
        .pf-run .pf-heat{animation:pf-heat 2s ease-in-out infinite}
        .pf-run .pf-drive{animation:pf-drive 2.4s ease-in-out infinite}
        .pf-run .pf-lines{animation:pf-lines .6s ease-in-out infinite}
        .pf-run .pf-bob{animation:pf-bob 2s ease-in-out infinite}
        .pf-run .pf-route{animation:pf-route 1.5s linear infinite}
        @media (prefers-reduced-motion: reduce){.pf-run *{animation:none!important}}
      `}</style>
    </section>
  );
}
