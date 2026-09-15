import { trustMetrics } from "@/lib/content";

export function TrustMetrics() {
  return (
    <section aria-label="Network metrics" className="bg-cream pb-16 sm:pb-20">
      <div className="container-x">
        <div className="grid grid-cols-3 divide-x divide-line rounded-2xl">
          {trustMetrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1 px-2 text-center">
              <span className="font-display text-[clamp(1.75rem,5vw,3rem)] font-bold leading-none tracking-[-0.02em] text-orange tabular-nums">
                {m.value}
                {m.suffix}
              </span>
              <span className="micro mt-1 text-ash">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
