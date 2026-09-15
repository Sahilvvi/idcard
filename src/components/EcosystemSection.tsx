import { ecosystem } from "@/lib/content";
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

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="bg-paper py-16 sm:py-24">
      <div className="container-x">
        <SectionHeader label="One Stop Solution" title={ecosystem.title} accentLine={1} accentColor="purple" sub={ecosystem.sub} />

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3">
          {ecosystem.pillars.map((p) => {
            const core = Boolean(p.badge);
            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                  core ? "border-purple/25 bg-purple-tint/40 shadow-[0_20px_40px_-24px_rgba(123,103,176,0.45)]" : "border-line-soft bg-paper"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                    {p.badge}
                  </span>
                )}
                <span className={core ? "icon-badge-purple" : "icon-badge-orange"}>{ICONS[p.id]}</span>
                <h3 className="mt-5 font-display text-[18px] font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-graphite">{p.body}</p>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
