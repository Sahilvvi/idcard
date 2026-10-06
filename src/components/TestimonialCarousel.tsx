"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { defaultPoster, parseVideoUrl, type Testimonial, type VideoEmbed } from "@/lib/cms-types";
import { Reveal } from "./ui/Reveal";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="-mx-4 mt-12 flex snap-x gap-6 overflow-x-auto px-4 pb-6 pt-3 [scrollbar-width:none] sm:mt-16 sm:justify-center sm:gap-10 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {items.map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i, 5) * 80} y={20} scale={0.9} className="shrink-0 snap-center">
            <StoryBubble item={t} onOpen={() => setOpen(i)} />
          </Reveal>
        ))}
      </div>
      {open !== null && <StoryViewer items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function StoryBubble({ item, onOpen }: { item: Testimonial; onOpen: () => void }) {
  const embed = parseVideoUrl(item.video_url);
  const poster = item.poster_url || defaultPoster(embed);

  return (
    <button type="button" onClick={onOpen} aria-label={`Watch testimonial from ${item.person_name}`} className="group flex w-[150px] flex-col items-center text-center sm:w-[196px]">
      <span className="relative grid size-[150px] place-items-center sm:size-[196px]">
        <span aria-hidden className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--color-brand),var(--color-teal),var(--color-accent),var(--color-brand))] opacity-90 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:animate-[spin-slow_6s_linear_infinite] motion-reduce:animate-none" />
        <span aria-hidden className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--color-brand),var(--color-teal),var(--color-accent),var(--color-brand))] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
        <span className="relative size-[136px] overflow-hidden rounded-full border-[4px] border-navy bg-navy-deep sm:size-[180px]">
          {embed.kind === "file" ? (
            <video src={embed.src} poster={poster ?? undefined} muted loop autoPlay playsInline preload="metadata" className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110" />
          ) : embed.kind === "youtube" || embed.kind === "vimeo" ? (
            <BubblePreview embed={embed} poster={poster} />
          ) : poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110" />
          ) : (
            <span className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(29,78,216,0.6),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(14,165,164,0.5),transparent_55%)] font-display text-[40px] font-bold text-white/30">{initialsOf(item.person_name)}</span>
          )}
        </span>
      </span>
      <span className="mt-4 block w-full truncate font-display text-[15px] font-semibold text-white sm:text-[16px]">{item.person_name}</span>
      <span className="block w-full truncate text-[12.5px] text-white/60 sm:text-[13px]">{[item.person_role, item.company].filter(Boolean).join(" · ")}</span>
    </button>
  );
}

function BubblePreview({ embed, poster }: { embed: Extract<VideoEmbed, { kind: "youtube" | "vimeo" }>; poster: string | null }) {
  const src =
    embed.kind === "youtube"
      ? `https://www.youtube.com/embed/${embed.id}?autoplay=1&mute=1&loop=1&playlist=${embed.id}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3`
      : `https://player.vimeo.com/video/${embed.id}?background=1&autoplay=1&muted=1&loop=1&dnt=1`;
  return (
    <span aria-hidden className="absolute inset-0 overflow-hidden">
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <iframe
        src={src}
        title=""
        tabIndex={-1}
        loading="lazy"
        allow="autoplay; encrypted-media"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[calc(125%*16/9)] -translate-x-1/2 -translate-y-1/2 border-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
      />
    </span>
  );
}

function StoryViewer({ items, index, onChange, onClose }: { items: Testimonial[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const item = items[index];
  const embed = parseVideoUrl(item.video_url);
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onChange(index - 1);
      if (e.key === "ArrowRight" && hasNext) onChange(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, hasPrev, hasNext, onChange, onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[120] grid place-items-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`Testimonial from ${item.person_name}`}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-navy-deep/85 backdrop-blur-md animate-[fade-up_0.3s_ease_both]" />

      <div key={item.id} className="relative flex h-[min(88dvh,820px)] w-full max-w-[420px] flex-col overflow-hidden rounded-[28px] bg-black shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 animate-[om-in_0.5s_var(--ease-out-expo)_both]">
        <div aria-hidden className="absolute inset-x-4 top-3 z-20 flex gap-1.5">
          {items.map((t, i) => (
            <span key={t.id} className={`h-1 flex-1 rounded-full ${i <= index ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-4 pb-10 pt-7">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand to-teal font-display text-[13px] font-bold text-white ring-2 ring-white/40">{initialsOf(item.person_name)}</span>
            <div className="min-w-0">
              <p className="truncate font-display text-[15px] font-semibold text-white">{item.person_name}</p>
              <p className="truncate text-[12px] text-white/70">{[item.person_role, item.company].filter(Boolean).join(" · ")}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1">
          <Player embed={embed} />
        </div>

        {item.quote && (
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent px-5 pb-6 pt-14">
            <p className="text-[14.5px] leading-relaxed text-white/90">“{item.quote}”</p>
          </div>
        )}
      </div>

      <NavButton dir="prev" visible={hasPrev} onClick={() => onChange(index - 1)} />
      <NavButton dir="next" visible={hasNext} onClick={() => onChange(index + 1)} />
    </div>,
    document.body,
  );
}

function NavButton({ dir, visible, onClick }: { dir: "prev" | "next"; visible: boolean; onClick: () => void }) {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={`absolute top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-[background-color,transform] hover:bg-white/25 sm:size-12 ${dir === "prev" ? "left-3 sm:left-[calc(50%-290px)]" : "right-3 sm:right-[calc(50%-290px)]"}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dir === "prev" ? "rotate-180" : ""}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

function Player({ embed }: { embed: VideoEmbed }) {
  const cls = "absolute inset-0 h-full w-full";
  if (embed.kind === "youtube") {
    return <iframe className={cls} src={`https://www.youtube-nocookie.com/embed/${embed.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`} title="Client testimonial" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
  }
  if (embed.kind === "vimeo") {
    return <iframe className={cls} src={`https://player.vimeo.com/video/${embed.id}?autoplay=1&dnt=1`} title="Client testimonial" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  }
  if (embed.kind === "instagram") {
    return <iframe className={`${cls} bg-white`} src={`https://www.instagram.com/reel/${embed.id}/embed/`} title="Client testimonial" allow="autoplay; encrypted-media" allowFullScreen />;
  }
  return <video className={`${cls} object-cover`} src={embed.src} controls autoPlay playsInline />;
}
