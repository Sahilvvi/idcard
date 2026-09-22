import { proofStats } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export function ProofStats() {
  return (
    <section className="bg-paper py-14 sm:py-20">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {proofStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} y={16} className={`text-center ${i > 0 ? "sm:border-l sm:border-line" : ""}`}>
              <p className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-[-0.02em] text-gradient">{s.value}</p>
              <p className="micro mt-3 text-ash">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
