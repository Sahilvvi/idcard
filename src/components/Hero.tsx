"use client";

import { useEffect, useRef, useState } from "react";
import { hero, trustMetrics } from "@/lib/content";
import { Button } from "./ui/Button";
import { AssetImage } from "./ui/AssetImage";

const ROTATE = ["Schools", "Corporates", "Events", "Print Vendors"];

function RotatingWord() {
  const [i, setI] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const words = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % ROTATE.length), 2200);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = words.current[i];
      if (el) setWidth(el.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [i]);

  return (
    <span
      className="relative inline-grid h-[1.15em] justify-items-start overflow-hidden text-left align-bottom transition-[width] duration-500 ease-[var(--ease-out-expo)]"
      style={width === null ? undefined : { width }}
    >
      {ROTATE.map((w, k) => (
        <span
          key={w}
          ref={(el) => {
            words.current[k] = el;
          }}
          aria-hidden={k !== i}
          className={`col-start-1 row-start-1 whitespace-nowrap text-teal underline decoration-accent decoration-[0.08em] underline-offset-[0.12em] transition-[transform,opacity] duration-600 ease-[var(--ease-out-expo)] ${
            k === i ? "translate-y-0 opacity-100" : k < i ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative -mt-16 overflow-hidden bg-surface pt-28 sm:-mt-20 sm:pt-36" aria-labelledby="hero-title">
      <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand/15 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-40 size-[380px] rounded-full bg-teal/15 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-64 size-[320px] rounded-full bg-accent/15 blur-[110px]" />

      <div className="container-x relative flex flex-col items-center text-center">
        <h1 id="hero-title" className="display max-w-5xl animate-[fade-up_0.7s_var(--ease-out-expo)_0.08s_both] text-ink">
          {hero.headingPrefix}
          <span className="text-brand">{hero.headingAccent}</span>
          <br className="hidden sm:block" />
          <span className="text-graphite"> for </span>
          <RotatingWord />
        </h1>

        <p className="lede mt-6 max-w-2xl animate-[fade-up_0.7s_var(--ease-out-expo)_0.16s_both]">{hero.body}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-[fade-up_0.7s_var(--ease-out-expo)_0.24s_both]">
          <Button href="#contact" variant="brand">
            {hero.primaryCta}
          </Button>
          <Button href="#ecosystem" variant="ghost" arrow={false}>
            {hero.secondaryCta}
          </Button>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 animate-[fade-up_0.7s_var(--ease-out-expo)_0.32s_both]">
          {trustMetrics.slice(0, 3).map((m) => (
            <li key={m.label} className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-bold text-ink tabular-nums">
                {m.value}
                {m.suffix}
              </span>
              <span className="micro text-ash">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual */}
      <div className="container-x relative mt-14 animate-[fade-up_0.9s_var(--ease-out-expo)_0.4s_both] sm:mt-20">
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute inset-x-8 -bottom-6 h-24 rounded-full bg-brand/25 blur-[60px]" aria-hidden />
          <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white p-2 shadow-[0_40px_80px_-40px_rgba(11,18,32,0.45)]">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[22px] bg-navy sm:aspect-[21/9]">
              <AssetImage src={hero.asset} alt={hero.assetAlt} priority tone="dark" caption="none" />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[12px] font-semibold text-ink shadow-lg sm:bottom-6 sm:left-6">
                <span className="size-2 animate-pulse rounded-full bg-green" />
                {hero.caption}
              </div>
            </div>
          </div>

          {/* Floating chips */}
          <div className="absolute -left-4 top-8 hidden animate-[float-y_6s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-line-soft bg-white p-3 pr-4 shadow-[0_20px_40px_-20px_rgba(11,18,32,0.35)] md:flex lg:-left-10">
            <span className="icon-badge-brand !size-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">Order #IVY-48213</span>
              <span className="block text-[11px] text-ash">QC passed · Dispatched</span>
            </span>
          </div>

          <div className="absolute -right-4 top-1/3 hidden animate-[float-y_7s_ease-in-out_infinite_1s] items-center gap-3 rounded-2xl border border-line-soft bg-white p-3 pr-4 shadow-[0_20px_40px_-20px_rgba(11,18,32,0.35)] md:flex lg:-right-10">
            <span className="icon-badge-accent !size-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">50+ Cities</span>
              <span className="block text-[11px] text-ash">Pan-India delivery</span>
            </span>
          </div>

          <div className="absolute -bottom-6 right-10 hidden animate-[float-y_5.5s_ease-in-out_infinite_0.5s] items-center gap-3 rounded-2xl border border-line-soft bg-white p-3 pr-4 shadow-[0_20px_40px_-20px_rgba(11,18,32,0.35)] md:flex">
            <span className="grid size-10 place-items-center rounded-xl bg-teal-tint text-teal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">24 Hrs dispatch</span>
              <span className="block text-[11px] text-ash">On ready artwork</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
