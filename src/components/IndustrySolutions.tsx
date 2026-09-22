"use client";

import { useState } from "react";
import { industries } from "@/lib/content";
import { AssetImage } from "./ui/AssetImage";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const ICONS: Record<string, React.ReactNode> = {
  education: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5M22 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  events: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  corporate: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="3" width="10" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 8h6v13h-6M7 7h1M7 11h1M7 15h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const TONES = [
  { grad: "from-brand to-teal", chip: "bg-brand-tint text-brand-deep", dot: "bg-brand", badge: "icon-badge-brand" },
  { grad: "from-accent to-[#fb7185]", chip: "bg-accent-tint text-accent-deep", dot: "bg-accent", badge: "icon-badge-accent" },
  { grad: "from-navy-soft to-brand", chip: "bg-teal-tint text-teal", dot: "bg-teal", badge: "icon-badge-brand" },
];

export function IndustrySolutions() {
  const [active, setActive] = useState(0);
  const tab = industries.tabs[active];
  const tone = TONES[active % TONES.length];

  return (
    <section id="industries" className="relative overflow-hidden bg-surface-deep py-16 sm:py-24">
      <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 size-[360px] rounded-full bg-teal/15 blur-[120px]" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeader label={industries.label} title={industries.title} accentLine={1} accentColor="brand" sub={industries.sub} />
        </Reveal>

        {/* Top-level tab bar — all sectors visible */}
        <Reveal delay={80}>
          <div role="tablist" aria-label="Industries" className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3 sm:mt-14">
            {industries.tabs.map((t, i) => {
              const on = i === active;
              const tn = TONES[i % TONES.length];
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`is-tab-${t.id}`}
                  aria-selected={on}
                  aria-controls="is-panel"
                  onClick={() => setActive(i)}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-1 ${
                    on
                      ? "border-transparent bg-navy text-white shadow-[0_24px_50px_-24px_rgba(10,26,58,0.6)]"
                      : "border-line bg-white text-ink hover:border-brand/30 hover:shadow-[0_16px_40px_-24px_rgba(29,78,216,0.35)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 h-1 origin-left bg-gradient-to-r ${tn.grad} transition-transform duration-500 ease-[var(--ease-out-expo)] ${on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${on ? `bg-gradient-to-br ${tn.grad} text-white` : "bg-surface-deep text-graphite group-hover:bg-brand-tint group-hover:text-brand"}`}>
                    {ICONS[t.id]}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-semibold">{t.name}</span>
                    <span className={`micro block ${on ? "text-white/60" : "text-ash"}`}>{t.kicker}</span>
                  </span>
                  <span className={`micro ml-auto !text-[10px] ${on ? "text-white/60" : "text-ash"}`}>0{i + 1}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <div
          id="is-panel"
          role="tabpanel"
          aria-labelledby={`is-tab-${tab.id}`}
          key={tab.id}
          className="mt-8 grid overflow-hidden rounded-[28px] border border-line-soft bg-white shadow-[0_40px_90px_-50px_rgba(11,18,32,0.4)] lg:grid-cols-[0.46fr_0.54fr] animate-[is-in_0.55s_var(--ease-out-expo)_both]"
        >
          <div className="relative min-h-[320px] overflow-hidden bg-navy text-white lg:min-h-full">
            <div className="absolute inset-0 animate-[is-img_0.8s_var(--ease-out-expo)_both]">
              <AssetImage src={tab.asset} alt={tab.assetAlt} tone="dark" caption="none" />
            </div>
            <div aria-hidden className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent`} />
            <div aria-hidden className={`pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-gradient-to-br ${tone.grad} opacity-40 blur-3xl`} />

            <div className="absolute left-6 top-6 flex items-center gap-2">
              <span className={`grid size-9 place-items-center rounded-lg bg-gradient-to-br ${tone.grad} text-white`}>{ICONS[tab.id]}</span>
              <span className="micro text-white/80">{tab.kicker}</span>
            </div>

            <div className="absolute inset-x-6 bottom-6">
              <h3 className="font-display text-[26px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[30px]">{tab.title}</h3>
              <div className="mt-5 flex gap-3">
                {tab.stats.map((s, i) => (
                  <div key={s.label} className="glass rounded-2xl px-4 py-3 animate-[fade-up_0.6s_var(--ease-out-expo)_both]" style={{ animationDelay: `${150 + i * 100}ms` }}>
                    <p className="font-display text-[22px] font-bold leading-none text-white">{s.value}</p>
                    <p className="micro mt-1 text-white/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-9">
            <p className="text-[15px] leading-relaxed text-graphite">{tab.body}</p>

            <p className="micro mt-8 text-ash">Services included</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tab.services.map((s, i) => (
                <li
                  key={s.name}
                  className="flex items-start gap-3 rounded-xl border border-line-soft bg-surface p-3.5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-white animate-[fade-up_0.5s_var(--ease-out-expo)_both]"
                  style={{ animationDelay: `${80 + i * 50}ms` }}
                >
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${tone.dot}`} />
                  <span>
                    <p className="font-display text-[14px] font-semibold text-ink">{s.name}</p>
                    <p className="mt-0.5 text-[13px] leading-snug text-graphite">{s.desc}</p>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="micro text-ash">What we provide</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tab.provide.map((p) => (
                    <li key={p} className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${tone.chip}`}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="micro text-ash">Key partner advantages</p>
                <ul className="mt-3 space-y-2.5">
                  {tab.advantages.map((a) => (
                    <li key={a} className="check-item">
                      <span className="check-dot">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#contact" variant="brand">
                {tab.cta}
              </Button>
              <button
                type="button"
                onClick={() => setActive((active + 1) % industries.tabs.length)}
                className="micro inline-flex items-center gap-2 text-graphite transition-colors hover:text-brand"
              >
                Next: {industries.tabs[(active + 1) % industries.tabs.length].name}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes is-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@keyframes is-img{from{transform:scale(1.08)}to{transform:none}}`}</style>
    </section>
  );
}
