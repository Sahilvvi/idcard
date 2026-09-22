"use client";

import { useEffect, useRef, useState } from "react";
import { partnerLogos, trustedBy } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

function LogoTile({ src, alt, i }: { src: string; alt: string; i: number }) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, [src]);
  return (
    <li className="group flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-line-soft bg-white px-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_36px_-20px_rgba(29,78,216,0.35)]">
      {missing ? (
        <span aria-label={alt} role="img" className="flex items-center gap-2 text-ash">
          <span className="grid size-8 place-items-center rounded-lg bg-surface-deep">
            <span className="micro !text-[9px] !tracking-normal">{String(i + 1).padStart(2, "0")}</span>
          </span>
          <span className="h-2 w-14 rounded-full bg-surface-deep" />
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setMissing(true)}
          className="max-h-10 w-auto object-contain opacity-70 grayscale transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        />
      )}
    </li>
  );
}

export function PartnerMarquee() {
  const rowA = [...partnerLogos, ...partnerLogos];
  const rowB = [...partnerLogos.slice(6), ...partnerLogos.slice(0, 6), ...partnerLogos.slice(6), ...partnerLogos.slice(0, 6)];
  const chips = [...trustedBy.chips, ...trustedBy.chips];

  return (
    <section aria-label={trustedBy.label} className="relative overflow-hidden bg-surface py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="micro text-ash">{trustedBy.label}</p>
            <h2 className="h-sub mt-3 max-w-xl text-ink">{trustedBy.title}</h2>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="pause-on-hover flex overflow-hidden">
          <ul className="flex shrink-0 gap-4 pr-4 animate-[marquee-x_45s_linear_infinite] motion-reduce:animate-none">
            {rowA.map((l, i) => (
              <LogoTile key={`${l.id}-a-${i}`} src={l.src} alt={l.alt} i={i % partnerLogos.length} />
            ))}
          </ul>
        </div>
        <div className="pause-on-hover flex overflow-hidden">
          <ul className="flex shrink-0 gap-4 pr-4 animate-[marquee-x-rev_55s_linear_infinite] motion-reduce:animate-none">
            {rowB.map((l, i) => (
              <LogoTile key={`${l.id}-b-${i}`} src={l.src} alt={l.alt} i={(i + 6) % partnerLogos.length} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <ul className="flex shrink-0 items-center gap-3 pr-3 animate-[marquee-x_30s_linear_infinite] motion-reduce:animate-none">
          {chips.map((c, i) => (
            <li key={`${c}-${i}`} className="micro flex shrink-0 items-center gap-2 rounded-full border border-line-soft bg-white px-4 py-2 text-graphite">
              <span className="size-1.5 rounded-full bg-accent" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
