"use client";

import { useRef, useState } from "react";
import { products } from "@/lib/content";
import { AssetImage } from "./ui/AssetImage";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

function ProductCard({ item, index }: { item: (typeof products.items)[number]; index: number }) {
  return (
    <Reveal delay={Math.min(index, 4) * 80} className="w-[72vw] shrink-0 snap-center sm:w-[300px] lg:w-[320px]">
      <article className="group relative">
        <div className="card overflow-hidden transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_48px_-24px_rgba(31,34,48,0.35)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream">
            <div className="h-full w-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
              <AssetImage src={item.asset} alt={`${item.name} — product photograph`} />
            </div>
            <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-purple opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-display text-[15px] font-semibold text-ink">{item.name}</h3>
            <p className="micro mt-1 text-ash">{item.spec}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function ProductCarousel() {
  const items = products.items;
  const n = items.length;
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const goTo = (i: number) => {
    const next = ((i % n) + n) % n;
    setIdx(next);
    const el = track.current;
    if (!el) return;
    const card = el.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section id="products" className="relative overflow-hidden bg-cream py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-10 size-[260px] rounded-full bg-orange/10 blur-[90px]" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeader label={products.label} title={products.title} accentLine={1} sub={products.sub} />
        </Reveal>
      </div>

      <div className="container-x mt-10 flex items-center justify-end gap-3 sm:mt-14">
        <button
          type="button"
          onClick={() => goTo(idx - 1)}
          aria-label="Previous product"
          className="grid size-11 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:bg-purple hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M14 8H3m4.5 4.5L3 8l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(idx + 1)}
          aria-label="Next product"
          className="grid size-11 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:bg-purple hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div
        ref={track}
        className="container-x mt-5 flex gap-5 overflow-x-auto scroll-px-5 snap-x snap-mandatory no-scrollbar sm:gap-6"
        onScroll={(e) => {
          const el = e.currentTarget;
          const card = el.children[0] as HTMLElement | undefined;
          if (!card) return;
          const w = card.getBoundingClientRect().width + 20;
          setIdx(Math.round(el.scrollLeft / w));
        }}
      >
        {items.map((p, i) => (
          <ProductCard key={p.id} item={p} index={i} />
        ))}
      </div>

      <div className="container-x mt-8 flex justify-center">
        <ol className="flex gap-1.5" aria-label="Slides">
          {items.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                aria-label={`Show ${p.name}`}
                aria-current={i === idx}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === idx ? "w-6 bg-orange" : "w-1.5 bg-line"}`}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
