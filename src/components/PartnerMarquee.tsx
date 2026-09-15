"use client";

import { useEffect, useRef, useState } from "react";
import { partnerLogos } from "@/lib/content";

function LogoMark({ src, alt, i }: { src: string; alt: string; i: number }) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, [src]);
  return (
    <li className="flex h-16 w-32 shrink-0 items-center justify-center px-4">
      {missing ? (
        <span aria-label={alt} role="img" className="grid size-12 place-items-center rounded-full border border-line-soft text-ash">
          <span className="micro !text-[9px] !tracking-normal">{String(i + 1).padStart(2, "0")}</span>
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={img} src={src} alt={alt} loading="lazy" onError={() => setMissing(true)} className="max-h-12 w-auto object-contain" />
      )}
    </li>
  );
}

export function PartnerMarquee() {
  const doubled = [...partnerLogos, ...partnerLogos];
  return (
    <section aria-label="Trusted by industry leaders" className="bg-paper py-12 sm:py-16">
      <p className="micro mb-8 text-center text-ash">Trusted by industry leaders</p>
      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="flex shrink-0 animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {doubled.map((l, i) => (
            <LogoMark key={`${l.id}-${i}`} src={l.src} alt={l.alt} i={i % partnerLogos.length} />
          ))}
        </ul>
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
