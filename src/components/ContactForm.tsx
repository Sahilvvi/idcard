"use client";

import { useState, type FormEvent } from "react";
import { contact, site } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

type Status = "idle" | "sending" | "sent";

const fieldCls =
  "w-full rounded-xl border border-line-soft bg-paper px-4 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ash focus:border-purple";

function Field({ id, label, type = "text", required, as }: { id: string; label: string; type?: string; required?: boolean; as?: "textarea" }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
        {required ? <span className="text-orange"> *</span> : null}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={id} rows={4} required={required} placeholder="How can we help you?" className={`${fieldCls} resize-none`} />
      ) : (
        <input id={id} name={id} type={type} required={required} placeholder={label} className={fieldCls} />
      )}
    </div>
  );
}

const CONTACT_TILES = (site: { phone: string; phoneHref: string; email: string; location: string }) => [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="m4 6.5 8 6.5 8-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6.6 10.8c1.3 2.6 3.5 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1 .3 2.1.5 3.2.5.6 0 1 .4 1 1v3.2c0 .6-.4 1-1 1-9 0-16.3-7.3-16.3-16.3 0-.6.4-1 1-1H6.7c.6 0 1 .4 1 1 0 1.1.2 2.2.5 3.2.1.4 0 .8-.2 1l-1.4 2.1z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Location",
    value: site.location,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState<"printing" | "software">("printing");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // No backend is wired yet: simulate the request so the success state is demonstrable.
    window.setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <section id="contact" className="bg-cream py-16 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
        <div>
          <Reveal x={-20} y={0}>
            <SectionHeader label={contact.label} title={contact.title} accentLine={2} accentColor="purple" align="left" sub={contact.body} />
          </Reveal>
          <div className="mt-10 space-y-4">
            {CONTACT_TILES(site).map((tile, i) => (
              <Reveal key={tile.label} x={-20} y={0} delay={100 + i * 80}>
                <div className="card flex items-center gap-4 p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-20px_rgba(31,34,48,0.25)]">
                  <span className="icon-badge-purple">{tile.icon}</span>
                  <div>
                    <p className="micro text-ash">{tile.label}</p>
                    {tile.href ? (
                      <a href={tile.href} className="mt-0.5 block font-display text-[15px] font-semibold text-ink hover:text-purple">
                        {tile.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-display text-[15px] font-semibold text-ink">{tile.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal x={20} y={0} delay={120} className="relative">
        <div className="card p-6 sm:p-8" aria-live="polite">
          {status === "sent" ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center">
              <span className="icon-badge-orange">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="micro mt-6 text-ash">Inquiry received</p>
              <h3 className="h-sub mt-2 text-ink">Thank you. We&apos;ll be in touch shortly.</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-graphite">
                Our team reviews every inquiry and typically responds within one business day. For urgent requirements call {site.phone}.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="micro mt-8 text-purple hover:underline">
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate={false} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="company" label="Company / Institution" required />
                <Field id="city" label="City" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="email" label="Email" type="email" required />
                <Field id="phone" label="Phone" type="tel" required />
              </div>

              <fieldset>
                <legend className="mb-1.5 text-[13px] font-semibold text-ink">I&apos;m interested in</legend>
                <div className="inline-flex rounded-full border border-line-soft p-1">
                  {(["printing", "software"] as const).map((t) => (
                    <label key={t} className="relative cursor-pointer">
                      <input type="radio" name="interest" value={t} checked={type === t} onChange={() => setType(t)} className="peer sr-only" />
                      <span className="block rounded-full px-5 py-2 text-[13px] font-semibold capitalize text-graphite transition-colors peer-checked:bg-purple peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-purple/40">
                        {t === "printing" ? "Printing services" : "Software platform"}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="product" className="mb-1.5 block text-[13px] font-semibold text-ink">
                  Product <span className="text-orange">*</span>
                </label>
                <select id="product" name="product" defaultValue="" className={`${fieldCls} appearance-none`}>
                  <option value="" disabled>
                    Select a product
                  </option>
                  {contact.productOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <Field id="message" label="Tell us about your requirement (quantities, deadlines, cities)" as="textarea" required />

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="text-[12px] text-ash">We respond within one business day.</p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-purple px-7 text-[14px] font-semibold text-white transition-colors hover:bg-purple-deep disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Submit Inquiry"}
                  <span aria-hidden className={status === "sending" ? "animate-spin" : ""}>
                    {status === "sending" ? "◌" : "→"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
