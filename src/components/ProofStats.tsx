import { proofStats } from "@/lib/content";

export function ProofStats() {
  return (
    <section className="bg-paper py-14 sm:py-20">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {proofStats.map((s, i) => (
            <div key={s.label} className={`text-center ${i > 0 ? "sm:border-l sm:border-line" : ""}`}>
              <p className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-[-0.02em] text-orange">{s.value}</p>
              <p className="micro mt-3 text-ash">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
