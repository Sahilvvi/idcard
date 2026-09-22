"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  sizes?: string;
  /** Where the placeholder label sits; use "top"/"none" when the caller overlays content on the bottom edge. */
  caption?: "bottom" | "top" | "none";
};

/**
 * Renders a real asset from /public/assets when present. Until the photography
 * is supplied, the file 404s and we fall back to a clearly-labelled physical
 * "proof sheet" placeholder that names the file and describes the intended shot
 * (see ASSETS.md).
 */
export function AssetImage({ src, alt, className = "", tone = "light", priority = false, sizes = "100vw", caption = "bottom" }: Props) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const file = src.split("/").pop();

  // The 404 can fire before hydration attaches onError; re-check once mounted.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, [src]);

  if (missing) {
    const dark = tone === "dark";
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex h-full w-full overflow-hidden border border-dashed ${caption === "top" ? "items-start" : "items-end"} ${
          dark ? "border-white/15 bg-navy text-white" : "border-line bg-surface-deep text-ink"
        } ${className}`}
      >
        <span className={`absolute right-4 top-4 grid size-8 place-items-center rounded-lg ${dark ? "bg-white/10 text-white/70" : "bg-white/70 text-ash"}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="m5 17 5-5 3.5 3.5L18 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {caption !== "none" && (
          <div className={`relative z-10 w-full p-4 sm:p-5 ${caption === "top" ? "pt-10 sm:pt-11" : ""}`}>
            <p className="micro opacity-60">Photography · pending</p>
            <p className="mt-1 text-[11px] sm:text-xs break-all opacity-90">{file}</p>
            <p className="mt-2 max-w-md text-[12px] sm:text-[13px] leading-snug opacity-75">{alt}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={img}
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setMissing(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
