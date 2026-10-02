"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { submitLead } from "@/app/actions/leads";
import { orderModal, site } from "@/lib/content";
import { LogoMark } from "./Navbar";

const EVENT = "idm:order";

type Preset = { requirement?: string; product?: string };
type Status = "idle" | "sending" | "sent" | "error";

/** Opens the quick "Order Now" modal from anywhere on the site. */
export function openOrder(preset: Preset = {}) {
  window.dispatchEvent(new CustomEvent<Preset>(EVENT, { detail: preset }));
}

type ButtonProps = {
  children: ReactNode;
  className?: string;
  requirement?: string;
  product?: string;
  "aria-label"?: string;
};

export function OrderButton({ children, className = "", requirement, product, ...rest }: ButtonProps) {
  return (
    <button type="button" onClick={() => openOrder({ requirement, product })} className={className} {...rest}>
      {children}
    </button>
  );
}

const fieldCls =
  "w-full rounded-xl border border-line-soft bg-surface px-4 py-3 text-[14px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ash focus:border-brand focus:ring-4 focus:ring-brand/10";

function Label({ htmlFor, children, required = true }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
      {children} {required && <span className="text-accent-deep">*</span>}
    </label>
  );
}

export function OrderModal() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<Preset>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setPreset((e as CustomEvent<Preset>).detail ?? {});
      setStatus("idle");
      setError(null);
      setOpen(true);
    };
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
    const str = (k: string) => String(fd.get(k) ?? "").trim();
    setStatus("sending");
    setError(null);
    const res = await submitLead({
      name: str("name"),
      phone: str("phone"),
      business: str("business"),
      interest: str("requirement"),
      message: [
        `Requirement: ${str("requirement")}`,
        preset.product && `Product: ${preset.product}`,
        `Quantity: ${str("quantity")}`,
        `City / State: ${str("city")}`,
        str("notes") && `Notes: ${str("notes")}`,
      ]
        .filter(Boolean)
        .join("\n"),
      source: "order-now",
      pagePath: window.location.pathname,
    });
    if (!res.ok) {
      setStatus("error");
      setError(res.error);
      return;
    }
    setStatus("sent");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] grid place-items-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="om-title">
      <button aria-label="Close" onClick={() => setOpen(false)} className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm animate-[fade-up_0.3s_ease_both]" />

      <div className="relative w-full max-w-xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-[22px] bg-white shadow-[0_60px_120px_-40px_rgba(6,18,42,0.7)] animate-[om-in_0.5s_var(--ease-out-expo)_both] sm:rounded-[28px]">
        <div className="relative overflow-hidden bg-navy px-5 py-6 text-white sm:px-8 sm:py-7">
          <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" />
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-brand/60 blur-3xl" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close order form"
            className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="relative flex items-center gap-3">
            <LogoMark size={28} chip />
            <p className="micro text-accent">{orderModal.eyebrow}</p>
          </div>
          <h2 id="om-title" className="relative mt-4 font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[26px]">
            {preset.product ? `Order ${preset.product}` : orderModal.title}
          </h2>
          <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/70">{orderModal.body}</p>
        </div>

        <div className="p-5 sm:p-8" aria-live="polite">
          {status === "sent" ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-green/15 text-green animate-[om-in_0.5s_var(--ease-out-expo)_both]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-6 font-display text-[22px] font-bold text-ink">{orderModal.success}</h3>
              <p className="mt-2 text-[14px] text-graphite">
                Need it faster? Call{" "}
                <a href={site.phoneHref} className="font-semibold text-brand">
                  {site.phone}
                </a>
              </p>
              <button type="button" onClick={() => setOpen(false)} className="mt-6 text-[13px] font-semibold text-brand hover:text-brand-deep">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="om-requirement">Requirement type</Label>
                  <select id="om-requirement" name="requirement" required defaultValue={preset.requirement ?? ""} className={fieldCls}>
                    <option value="" disabled>
                      Select requirement
                    </option>
                    {orderModal.requirements.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="om-quantity">Quantity</Label>
                  <select id="om-quantity" name="quantity" required defaultValue="" className={fieldCls}>
                    <option value="" disabled>
                      Select quantity
                    </option>
                    {orderModal.quantities.map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="om-name">Full name</Label>
                  <input id="om-name" name="name" required autoComplete="name" placeholder="Your name" className={fieldCls} />
                </div>
                <div>
                  <Label htmlFor="om-phone">Phone / WhatsApp</Label>
                  <input id="om-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91" className={fieldCls} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="om-city">City / State</Label>
                  <input id="om-city" name="city" required autoComplete="address-level2" placeholder="e.g. Guwahati, Assam" className={fieldCls} />
                </div>
                <div>
                  <Label htmlFor="om-business" required={false}>
                    Business / Institution
                  </Label>
                  <input id="om-business" name="business" autoComplete="organization" placeholder="Optional" className={fieldCls} />
                </div>
              </div>
              <div>
                <Label htmlFor="om-notes" required={false}>
                  Specs or notes
                </Label>
                <textarea id="om-notes" name="notes" rows={2} placeholder="Card size, lanyard width, deadline… (optional)" className={`${fieldCls} resize-none`} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[14px] font-semibold text-white shadow-[0_16px_30px_-14px_rgba(29,78,216,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-deep disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : orderModal.submit}
                <span aria-hidden className={status === "sending" ? "animate-spin" : ""}>
                  {status === "sending" ? "◌" : "→"}
                </span>
              </button>
              <p className={`text-center text-[11.5px] ${error ? "font-medium text-accent-deep" : "text-ash"}`} role={error ? "alert" : undefined}>
                {error ?? "Factory-direct pricing · Reply within one business day"}
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes om-in{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
