"use client";

import { useEffect, useRef, useState } from "react";
import { trustMetrics } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function TrustMetrics() {
  return (
    <section aria-label="Network metrics" className="relative bg-surface pb-8 pt-24 sm:pt-28">
      <div className="container-x">
        <div className="card grid grid-cols-2 divide-line-soft overflow-hidden !rounded-3xl md:grid-cols-4 md:divide-x">
          {trustMetrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 90} y={12} className={`${i < 2 ? "border-b md:border-b-0" : ""} ${i % 2 === 0 ? "border-r md:border-r-0" : ""} border-line-soft`}>
              <div className="relative flex flex-col items-center gap-1 px-4 py-7 text-center sm:py-9">
                <span className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-none tracking-[-0.03em] text-ink">
                  <CountUp value={m.value} suffix={m.suffix} />
                </span>
                <span className="micro mt-2 text-ash">{m.label}</span>
                <span aria-hidden className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-teal" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
