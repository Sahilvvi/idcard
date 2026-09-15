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

export function IndustrySolutions() {
  const [active, setActive] = useState(0);
  const tab = industries.tabs[active];

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 size-[320px] rounded-full bg-purple/10 blur-[100px]" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeader label={industries.label} title={industries.title} accentLine={1} sub={industries.sub} />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] lg:gap-8">
          <div role="tablist" aria-label="Industries" aria-orientation="vertical" className="flex gap-3 overflow-x-auto no-scrollbar lg:flex-col">
            {industries.tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`is-tab-${t.id}`}
                  aria-selected={on}
                  aria-controls="is-panel"
                  onClick={() => setActive(i)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl border p-4 text-left transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 ${
                    on ? "border-orange/40 bg-paper shadow-[0_8px_20px_-12px_rgba(31,34,48,0.2)]" : "border-line-soft bg-paper/60 hover:border-line-soft"
                  }`}
                >
                  <span className={on ? "icon-badge-orange !size-10" : "icon-badge !size-10 bg-line-soft text-graphite"}>{ICONS[t.id]}</span>
                  <span>
                    <span className="block font-display text-[15px] font-semibold text-ink">{t.name}</span>
                    <span className="micro block text-ash">{t.kicker}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="is-panel" role="tabpanel" aria-labelledby={`is-tab-${tab.id}`} key={tab.id} className="card animate-[is-in_0.4s_var(--ease-out-expo)_both] overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden bg-ink text-white">
              <AssetImage src={tab.asset} alt={tab.assetAlt} tone="dark" caption="none" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-3">
                {tab.stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
                    <p className="font-display text-lg font-bold text-white">{s.value}</p>
                    <p className="micro text-white/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="h-sub text-ink">{tab.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite">{tab.body}</p>

              <p className="micro mt-8 text-ash">Services included</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {tab.services.map((s) => (
                  <li key={s.name} className="flex items-start gap-3 rounded-xl border border-line-soft p-3.5">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-orange" />
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
                      <li key={p} className="rounded-full bg-orange-tint px-3 py-1.5 text-[12px] font-medium text-orange-deep">
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

              <div className="mt-8">
                <Button href="#contact" variant="primary">
                  {tab.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes is-in{from{opacity:0}to{opacity:1}}`}</style>
    </section>
  );
}
