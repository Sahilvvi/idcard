"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { defaultPoster, parseVideoUrl, type Testimonial } from "@/lib/cms-types";
import { Reveal } from "./ui/Reveal";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        const x = track.scrollLeft;
        let best = 0;
        let dist = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft - track.offsetLeft - x);
          if (d < dist) {
            dist = d;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  return (
    <div className="mt-12 sm:mt-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-out-expo)] ${i === index ? "w-8 bg-accent" : "w-2.5 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <ArrowButton dir="prev" disabled={!canPrev} onClick={() => scrollTo(index - 1)} />
          <ArrowButton dir="next" disabled={!canNext} onClick={() => scrollTo(index + 1)} />
        </div>
      </div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i, 3) * 90} y={28} className="w-[85vw] max-w-[380px] shrink-0 snap-start sm:w-[360px]">
            <TestimonialCard item={t} active={playing === t.id} onPlay={() => setPlaying(t.id)} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ArrowButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition-[background-color,border-color,transform,opacity] hover:border-accent/60 hover:bg-white/10 enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dir === "prev" ? "rotate-180" : ""}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

function TestimonialCard({ item, active, onPlay }: { item: Testimonial; active: boolean; onPlay: () => void }) {
  const embed = parseVideoUrl(item.video_url);
  const poster = item.poster_url || defaultPoster(embed);
  const initials = item.person_name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_40px_80px_-30px_rgba(29,78,216,0.45)]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-deep">
        {active ? (
          <Player embed={embed} />
        ) : (
          <button type="button" onClick={onPlay} aria-label={`Play testimonial from ${item.person_name}`} className="absolute inset-0 block h-full w-full text-left">
            {poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" loading="lazy" />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(29,78,216,0.5),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(14,165,164,0.4),transparent_55%)]">
                <span className="font-display text-[64px] font-bold text-white/20">{initials}</span>
              </div>
            )}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
            <span aria-hidden className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-navy shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40 motion-reduce:hidden" style={{ animationDuration: "2.4s" }} />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative ml-1">
                <path d="M7 5v14l12-7L7 5Z" />
              </svg>
            </span>
            <span className="micro absolute left-5 top-5 rounded-full border border-white/15 bg-navy-deep/60 px-3 py-1.5 text-white/80 backdrop-blur">Video testimonial</span>
          </button>
        )}
      </div>

      <div className="relative flex flex-1 flex-col gap-4 p-6">
        {item.quote && <p className="text-[15px] leading-relaxed text-white/80">“{item.quote}”</p>}
        <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-teal font-display text-[14px] font-bold text-white">{initials}</span>
          <div className="min-w-0">
            <p className="truncate font-display text-[16px] font-semibold text-white">{item.person_name}</p>
            <p className="truncate text-[13px] text-white/60">
              {item.person_role}
              {item.person_role && item.company ? " · " : ""}
              {item.company}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function Player({ embed }: { embed: ReturnType<typeof parseVideoUrl> }) {
  const cls = "absolute inset-0 h-full w-full";
  if (embed.kind === "youtube") {
    return <iframe className={cls} src={`https://www.youtube-nocookie.com/embed/${embed.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`} title="Client testimonial" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
  }
  if (embed.kind === "vimeo") {
    return <iframe className={cls} src={`https://player.vimeo.com/video/${embed.id}?autoplay=1&dnt=1`} title="Client testimonial" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  }
  return <video className={`${cls} object-cover`} src={embed.src} controls autoPlay playsInline />;
}
