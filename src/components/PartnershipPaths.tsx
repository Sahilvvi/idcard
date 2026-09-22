import { connectFlow, partnershipPaths } from "@/lib/content";
import { AssetImage } from "./ui/AssetImage";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { LogoMark } from "./Navbar";

const ICONS: Record<string, React.ReactNode> = {
  vendor: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9.5 5 4h14l1 5.5M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0M4 9.5V19a1 1 0 0 0 1 1h4v-5h6v5h4a1 1 0 0 0 1-1V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  materials: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  production: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 7h11v9H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

function ConnectDiagram() {
  const [vendor, hub, production] = connectFlow.nodes;
  return (
    <div className="relative mx-auto mt-14 max-w-5xl sm:mt-20">
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-0">
        {/* Left node */}
        <div className="card relative z-10 p-6 lg:mr-10">
          <span className="icon-badge-brand">{ICONS.vendor}</span>
          <h4 className="mt-4 font-display text-[17px] font-semibold text-ink">{vendor.title}</h4>
          <p className="mt-2 text-[14px] leading-relaxed text-graphite">{vendor.desc}</p>
        </div>

        {/* Hub */}
        <div className="relative z-10 mx-auto flex flex-col items-center text-center">
          <span aria-hidden className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/30 animate-[spin-slow_30s_linear_infinite]" />
          <span aria-hidden className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/10 animate-[pulse-soft_5s_ease-in-out_infinite]" />
          <div className="relative grid size-28 place-items-center rounded-full bg-gradient-to-br from-brand to-teal text-white shadow-[0_30px_60px_-20px_rgba(29,78,216,0.6)]">
            <LogoMark size={52} className="!bg-white/15 !shadow-none" />
          </div>
          <p className="relative mt-4 font-display text-[15px] font-semibold text-ink">{hub.title}</p>
          <p className="relative mt-1 max-w-[220px] text-[12.5px] leading-snug text-graphite">{hub.desc}</p>
        </div>

        {/* Right node */}
        <div className="card relative z-10 p-6 lg:ml-10">
          <span className="icon-badge-accent">{ICONS.production}</span>
          <h4 className="mt-4 font-display text-[17px] font-semibold text-ink">{production.title}</h4>
          <p className="mt-2 text-[14px] leading-relaxed text-graphite">{production.desc}</p>
        </div>

        {/* Connectors (desktop) */}
        <span aria-hidden className="pointer-events-none absolute left-[calc(50%-9rem)] top-1/2 hidden h-0.5 w-16 -translate-y-8 bg-[repeating-linear-gradient(90deg,#1d4ed8_0_8px,transparent_8px_16px)] lg:block animate-[dash-x_1.2s_linear_infinite]" />
        <span aria-hidden className="pointer-events-none absolute right-[calc(50%-9rem)] top-1/2 hidden h-0.5 w-16 -translate-y-8 bg-[repeating-linear-gradient(90deg,#0ea5a4_0_8px,transparent_8px_16px)] lg:block animate-[dash-x_1.2s_linear_infinite]" />
      </div>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {["Demand", "Materials", "Software", "Production", "QC & Delivery"].map((s) => (
          <li key={s} className="micro flex items-center gap-2 text-ash">
            <span className="size-1.5 rounded-full bg-teal" />
            {s}
          </li>
        ))}
      </ul>
      <style>{`@keyframes dash-x{to{background-position:16px 0}}`}</style>
    </div>
  );
}

export function PartnershipPaths() {
  const paths = partnershipPaths.paths;

  return (
    <section id="software" className="relative overflow-hidden bg-surface py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 size-[420px] rounded-full bg-brand/10 blur-[120px]" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeader label={partnershipPaths.label} title={partnershipPaths.title} accentLine={1} accentColor="brand" sub={partnershipPaths.sub} />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {paths.map((p, i) => (
            <Reveal key={p.id} delay={i * 100} y={28} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-line-soft bg-white shadow-[0_20px_50px_-30px_rgba(11,18,32,0.3)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:shadow-[0_40px_70px_-30px_rgba(29,78,216,0.35)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                  <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
                    <AssetImage src={p.asset} alt={p.assetAlt} tone="dark" caption="none" />
                  </div>
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm">{ICONS[p.id]}</span>
                  {p.badge && <span className="micro absolute right-4 top-4 rounded-full bg-accent px-2.5 py-1 !text-[10px] text-ink">{p.badge}</span>}
                  <span className="absolute bottom-4 left-4 font-display text-[13px] font-semibold text-white/80">{p.nav}</span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.01em] text-ink">{p.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-graphite">{p.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt) => (
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
                  <div className="mt-auto pt-7">
                    <Button href="#contact" variant={i === 1 ? "brand" : "ghost"} className="w-full justify-center">
                      {p.cta}
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-20 flex flex-col items-center text-center sm:mt-28">
            <SectionHeader label={connectFlow.label} title={connectFlow.title} accentLine={1} accentColor="gradient" sub={connectFlow.sub} />
          </div>
          <ConnectDiagram />
        </Reveal>
      </div>
    </section>
  );
}
