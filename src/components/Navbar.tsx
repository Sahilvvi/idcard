"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      style={{ width: size, height: size }}
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand to-teal text-white shadow-[0_8px_20px_-8px_rgba(29,78,216,0.6)] ${className}`}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="3" width="16" height="18" rx="3" fill="white" fillOpacity="0.96" />
        <rect x="7" y="7" width="6" height="6" rx="1.4" fill="#1d4ed8" />
        <rect x="7" y="15" width="10" height="1.6" rx="0.8" fill="#f59e0b" />
        <rect x="15" y="7" width="2" height="6" rx="0.8" fill="#0ea5a4" />
      </svg>
    </span>
  );
}

export function Logo({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a href="#top" aria-label={`${site.name} home`} className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[17px] font-bold tracking-[-0.01em] ${dark ? "text-white" : "text-ink"}`}>
          IVY<span className={`font-medium ${dark ? "text-white/70" : "text-brand"}`}>PRINTS</span>
        </span>
        <span className={`mt-0.5 hidden text-[10px] sm:block ${dark ? "text-white/50" : "text-ash"}`}>India&apos;s Fastest ID Card Manufacturer</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled ? "bg-white/85 shadow-[0_1px_0_rgba(11,18,32,0.06),0_10px_30px_-20px_rgba(11,18,32,0.25)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between sm:h-20">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="relative rounded-full px-3.5 py-2 text-[14px] font-medium text-graphite transition-colors hover:bg-brand-tint hover:text-brand"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="hidden items-center gap-1.5 text-[13px] font-semibold text-brand xl:flex">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6.6 10.8c1.3 2.6 3.5 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1 .3 2.1.5 3.2.5.6 0 1 .4 1 1v3.2c0 .6-.4 1-1 1-9 0-16.3-7.3-16.3-16.3 0-.6.4-1 1-1H6.7c.6 0 1 .4 1 1 0 1.1.2 2.2.5 3.2.1.4 0 .8-.2 1l-1.4 2.1z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {site.phone}
            </a>
            <a
              href="#contact"
              className="hidden h-10 items-center rounded-full border border-line px-5 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand sm:inline-flex"
            >
              Contact Us
            </a>
            <a
              href="#get-started"
              className="hidden h-10 items-center rounded-full bg-brand px-5 text-[13px] font-semibold text-white shadow-[0_8px_20px_-10px_rgba(29,78,216,0.7)] transition-colors hover:bg-brand-deep sm:inline-flex"
            >
              Login
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-11 place-items-center rounded-full border border-line bg-white lg:hidden"
            >
              <span className={`absolute h-px w-5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[55] flex flex-col bg-navy text-white transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-x flex flex-1 flex-col justify-end pb-10 pt-32">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((n, i) => (
              <div key={n.label} className="border-b border-white/10 py-3">
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 font-display text-[11vw] font-bold leading-none tracking-[-0.02em] sm:text-5xl"
                >
                  <span className="micro w-8 text-accent">0{i + 1}</span>
                  {n.label}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="micro text-white/50">Call</p>
              <a href={site.phoneHref} className="mt-1 block text-lg">
                {site.phone}
              </a>
            </div>
            <div>
              <p className="micro text-white/50">Email</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-lg">
                {site.email}
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 w-fit items-center rounded-full bg-accent px-6 text-[13px] font-semibold text-ink"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
