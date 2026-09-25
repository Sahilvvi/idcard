"use client";

import { useEffect, useState, type FormEvent } from "react";
import { submitLead } from "@/app/actions/leads";
import { leadPopup, site } from "@/lib/content";
import { LogoMark } from "./Navbar";

const STORAGE_KEY = "ivy-lead-popup-dismissed";
const SHOW_DELAY_MS = 2500;

type Status = "idle" | "sending" | "sent" | "error";

const fieldCls =
  "w-full rounded-xl border border-line-soft bg-surface px-4 py-3 text-[14px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ash focus:border-brand focus:ring-4 focus:ring-brand/10";

function Field({ id, label, type = "text", autoComplete }: { id: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={`lp-${id}`} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
        {label} <span className="text-accent-deep">*</span>
      </label>
      <input id={`lp-${id}`} name={id} type={type} required autoComplete={autoComplete} placeholder={label} className={fieldCls} />
    </div>
  );
}

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const t = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    const fd = new FormData(e.currentTarget);
    const str = (k: string) => String(fd.get(k) ?? "");
    setStatus("sending");
    setError(null);
    const res = await submitLead({
      name: str("name"),
      phone: str("phone"),
      email: str("email"),
      business: str("business"),
      source: "lead-popup",
      pagePath: window.location.pathname,
    });
    if (!res.ok) {
      setStatus("error");
      setError(res.error);
      return;
    }
    setStatus("sent");
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    window.setTimeout(() => setOpen(false), 1800);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="lp-title">
      <button aria-label="Close" onClick={close} className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm animate-[fade-up_0.4s_ease_both]" />

      <div className="relative grid w-full max-w-3xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-[22px] bg-white shadow-[0_60px_120px_-40px_rgba(6,18,42,0.7)] animate-[lp-in_0.6s_var(--ease-out-expo)_both] sm:rounded-[28px] md:max-h-none md:grid-cols-[0.9fr_1.1fr] md:overflow-hidden">
        <button
          type="button"
          onClick={close}
          aria-label="Close popup"
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 md:right-4 md:top-4 md:bg-transparent md:text-graphite md:hover:bg-surface-deep md:hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {/* Brand panel */}
        <div className="relative overflow-hidden bg-navy p-5 text-white sm:p-9">
          <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" />
          <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-brand/60 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 size-64 rounded-full bg-accent/30 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <LogoMark size={34} chip />
          </div>

          <p className="micro relative mt-5 text-accent md:mt-8">{leadPopup.eyebrow}</p>
          <h2 id="lp-title" className="relative mt-2 font-display text-[22px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[30px]">
            {leadPopup.title}
          </h2>
          <p className="relative mt-3 hidden text-[14px] leading-relaxed text-white/70 md:block">{leadPopup.body}</p>

          <ul className="relative mt-4 flex flex-wrap gap-x-4 gap-y-2 md:mt-7 md:block md:space-y-2.5">
            {leadPopup.perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[13.5px] text-white/85">
                <span className="grid size-5 place-items-center rounded-full bg-teal/25 text-teal">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <p className="relative mt-5 hidden text-[12px] text-white/50 md:mt-8 md:block">
            {site.location} · {site.phone}
          </p>
        </div>

        {/* Form */}
        <div className="relative p-5 sm:p-8" aria-live="polite">

          {status === "sent" ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-green/15 text-green animate-[lp-in_0.5s_var(--ease-out-expo)_both]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-6 font-display text-[22px] font-bold text-ink">{leadPopup.success}</h3>
              <p className="mt-2 text-[14px] text-graphite">Usually within one business day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-2 space-y-3.5 sm:space-y-4">
              <p className="micro text-ash">Your details</p>
              <Field id="name" label="Full name" autoComplete="name" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="phone" label="Phone number" type="tel" autoComplete="tel" />
                <Field id="email" label="Email" type="email" autoComplete="email" />
              </div>
              <Field id="business" label="Business / Institution name" autoComplete="organization" />

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[14px] font-semibold text-white shadow-[0_16px_30px_-14px_rgba(29,78,216,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-deep disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : leadPopup.submit}
                <span aria-hidden className={status === "sending" ? "animate-spin" : ""}>
                  {status === "sending" ? "◌" : "→"}
                </span>
              </button>
              <button type="button" onClick={close} className="block w-full text-center text-[12.5px] text-ash transition-colors hover:text-graphite">
                {leadPopup.dismiss}
              </button>
              <p className={`text-center text-[11px] ${error ? "font-medium text-accent-deep" : "text-ash"}`} role={error ? "alert" : undefined}>
                {error ?? "We never share your details. No spam, ever."}
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes lp-in{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
