import { ecosystem } from "@/lib/content";
import { AssetImage } from "./ui/AssetImage";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const ICONS: Record<string, React.ReactNode> = {
  materials: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  software: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4.5" width="18" height="12" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 20.5h8M12 16.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  fulfilment: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
};

const THEMES = [
  { card: "bg-white border-line-soft text-ink", icon: "icon-badge-brand", num: "text-brand/15", body: "text-graphite", eyebrow: "text-brand", check: "bg-brand-tint text-brand", media: "bg-brand-tint" },
  { card: "bg-navy border-navy-soft text-white", icon: "grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-accent", num: "text-white/10", body: "text-white/70", eyebrow: "text-accent", check: "bg-white/10 text-accent", media: "bg-navy-soft" },
  { card: "bg-brand border-brand-deep text-white", icon: "grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white", num: "text-white/10", body: "text-white/75", eyebrow: "text-white/80", check: "bg-white/15 text-white", media: "bg-brand-deep" },
];

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative bg-white py-16 sm:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeader label={ecosystem.label} title={ecosystem.title} accentLine={1} accentColor="gradient" sub={ecosystem.sub} />
        </Reveal>

        {/* Flow strip */}
        <Reveal delay={80}>
          <ol className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3">
            {ecosystem.flow.map((f, i) => (
              <li key={f} className="flex items-center gap-2 sm:gap-3">
                <span className="micro rounded-full border border-line-soft bg-surface px-3.5 py-1.5 text-graphite">{f}</span>
                {i < ecosystem.flow.length - 1 && (
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className="text-ash">
                    <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 sm:mt-16">
          {ecosystem.pillars.map((p, i) => {
            const t = THEMES[i % THEMES.length];
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.id} delay={60} y={30} className="lg:sticky" style={{ top: `calc(6rem + ${i * 1.25}rem)` }}>
                <article
                  className={`group relative grid overflow-hidden rounded-[28px] border shadow-[0_30px_60px_-40px_rgba(11,18,32,0.5)] transition-transform duration-500 ease-[var(--ease-out-expo)] lg:grid-cols-[1.1fr_0.9fr] ${t.card} ${
                    flip ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative p-7 sm:p-10 lg:p-12">
                    <span aria-hidden className={`pointer-events-none absolute right-6 top-4 font-display text-[7rem] font-bold leading-none tracking-[-0.05em] sm:text-[9rem] ${t.num}`}>
                      {p.index}
                    </span>
                    <div className="relative flex items-center gap-3">
                      <span className={t.icon}>{ICONS[p.id]}</span>
                      <span className={`micro ${t.eyebrow}`}>{p.eyebrow}</span>
                      {p.badge && <span className="micro rounded-full bg-accent px-2.5 py-1 !text-[10px] text-ink">{p.badge}</span>}
                    </div>
                    <h3 className="relative mt-6 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] font-bold leading-tight tracking-[-0.02em]">{p.title}</h3>
                    <p className={`relative mt-4 max-w-xl text-[15px] leading-relaxed sm:text-[16px] ${t.body}`}>{p.body}</p>
                    <ul className="relative mt-7 grid gap-3 sm:grid-cols-2">
                      {p.points.map((pt) => (
                        <li key={pt} className={`flex items-start gap-2.5 text-[14px] leading-snug ${t.body}`}>
                          <span className={`mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full ${t.check}`}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                              <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`relative min-h-[260px] overflow-hidden ${t.media}`}>
                    <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
                      <AssetImage src={p.asset} alt={p.assetAlt} tone={i === 0 ? "light" : "dark"} caption="none" />
                    </div>
                    <div aria-hidden className={`pointer-events-none absolute inset-0 ${flip ? "bg-gradient-to-l" : "bg-gradient-to-r"} ${i === 0 ? "from-white/70" : i === 1 ? "from-navy/70" : "from-brand/70"} via-transparent to-transparent`} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
