import { partnershipPaths } from "@/lib/content";
import { AssetImage } from "./ui/AssetImage";
import { Button } from "./ui/Button";
import { SectionHeader } from "./ui/SectionHeader";

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

export function PartnershipPaths() {
  const paths = partnershipPaths.paths;

  return (
    <section id="software" className="bg-paper py-16 sm:py-24">
      <div className="container-x">
        <SectionHeader label={partnershipPaths.label} title={partnershipPaths.title} accentLine={1} accentColor="purple" sub={partnershipPaths.sub} />

        <div className="mt-12 flex flex-col gap-14 sm:mt-16 sm:gap-20">
          {paths.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={p.id} className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <span className="icon-badge-orange">{ICONS[p.id]}</span>
                  <h3 className="h-sub mt-5 text-ink">{p.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-graphite">{p.body}</p>
                  <ul className="mt-6 space-y-2.5">
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
                  <div className="mt-7">
                    <Button href="#contact" variant="purple">
                      {p.cta}
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  {p.badge && (
                    <span className="absolute -top-3 left-6 z-10 rounded-full bg-purple px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                      {p.badge}
                    </span>
                  )}
                  <div className="card overflow-hidden !rounded-2xl aspect-[4/3]">
                    <AssetImage src={p.asset} alt={p.assetAlt} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
