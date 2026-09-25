"use client";

import { useState } from "react";

export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] font-semibold text-graphite transition-colors hover:border-brand hover:text-brand"
        >
          {l.label}
        </a>
      ))}
      <button type="button" onClick={copy} className="rounded-full bg-brand-tint px-3.5 py-1.5 text-[12.5px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white">
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
