import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact iDM — Get a quote for bulk ID card printing",
  description: "Talk to the iDM team about ID cards, lanyards, raw materials or our printing software. We reply within one working day.",
};

const channels = [
  {
    label: "Call us",
    value: site.phone,
    href: site.phoneHref,
    hint: "Mon–Sat · 10:00–19:00 IST",
    icon: "M6.6 10.8c1.3 2.6 3.5 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1 .3 2.1.5 3.2.5.6 0 1 .4 1 1v3.2c0 .6-.4 1-1 1-9 0-16.3-7.3-16.3-16.3 0-.6.4-1 1-1H6.7c.6 0 1 .4 1 1 0 1.1.2 2.2.5 3.2.1.4 0 .8-.2 1l-1.4 2.1z",
  },
  {
    label: "WhatsApp",
    value: "Chat with sales",
    href: `https://wa.me/${site.phoneHref.replace(/\D/g, "")}`,
    hint: "Fastest for quick quotes",
    icon: "M4 20l1.3-3.9A8 8 0 1 1 8.2 19L4 20Zm5-9.5c.4 1.7 1.7 3 3.4 3.4l1.3-1.3 1.8.9c.3.2.4.5.3.8-.3.9-1.2 1.4-2.1 1.2A6.4 6.4 0 0 1 8.5 10.3c-.2-.9.3-1.8 1.2-2.1.3-.1.6 0 .8.3l.9 1.8L10 11.5Z",
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "For RFQs and documents",
    icon: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm1 0 8 6.5L20 7",
  },
  {
    label: "Visit",
    value: site.location,
    href: `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}`,
    hint: site.address.join(" "),
    icon: "M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Zm0-9a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z",
  },
];

const steps = [
  { step: "01", title: "We call you back", body: "Within one working day a specialist calls to understand quantities, deadlines and cities." },
  { step: "02", title: "Quote & sample", body: "You receive a transparent quote and, for large runs, a physical sample card." },
  { step: "03", title: "Data & proof", body: "Upload your sheet and photos; we validate them and share a digital proof." },
  { step: "04", title: "Print, QC, deliver", body: "Cards are printed, scanned and tracked to your door — with a live status link." },
];

const reasons = [
  { value: "< 24h", label: "First response" },
  { value: "3–4 days", label: "Typical school run" },
  { value: "50+", label: "Cities delivered" },
  { value: "100%", label: "QC-scanned cards" },
];

export default function ContactPage() {
  return (
    <main>
      {/* 1. Hero */}
      <PageHero
        eyebrow="Contact iDM"
        title={
          <>
            Let&apos;s talk about your <span className="text-brand">printing</span> requirements
          </>
        }
        sub="Schools, corporates, event agencies and print vendors — tell us what you need and a specialist will reply within one working day."
        compact
      >
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="card group flex items-start gap-4 p-5 text-left transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(29,78,216,0.35)] animate-[fade-up_0.7s_var(--ease-out-expo)_both]"
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              <span className="icon-badge-brand transition-transform duration-500 group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d={c.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="micro block text-ash">{c.label}</span>
                <span className="mt-1 block truncate font-display text-[15px] font-semibold text-ink group-hover:text-brand">{c.value}</span>
                <span className="mt-1 block text-[12px] leading-snug text-graphite">{c.hint}</span>
              </span>
            </a>
          ))}
        </div>
      </PageHero>

      {/* 2. Form */}
      <ContactForm source="contact-page" />

      {/* 3. What happens next */}
      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none absolute -left-32 -bottom-32 size-[420px] rounded-full bg-brand/40 blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[360px] rounded-full bg-teal/25 blur-[140px]" />
        <div className="container-x relative">
          <SectionHeader tone="dark" label="What happens next" title={["From enquiry to delivery", "in four clear steps"]} accentLine={1} />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 100} y={24}>
                <li className="glass relative h-full p-6 transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-white/10">
                  <span className="font-display text-4xl font-bold leading-none text-accent">{s.step}</span>
                  <h3 className="mt-5 font-display text-[18px] font-semibold">{s.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/65">{s.body}</p>
                  {i < steps.length - 1 && (
                    <span aria-hidden className="absolute -right-3 top-8 hidden text-white/30 lg:block">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Why iDM + map */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal x={-24}>
            <SectionHeader align="left" label="Head office" title={["Visit us in", site.location.split(",")[0]]} accentLine={1} sub="Our plant, warehouse and partner-success team work out of one campus in Siliguri — drop by to see cards being printed and scanned." />
            <dl className="mt-8 grid grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <Reveal key={r.label} delay={i * 80} y={16}>
                  <div className="card p-5">
                    <dd className="font-display text-2xl font-bold tracking-tight text-gradient sm:text-3xl">{r.value}</dd>
                    <dt className="micro mt-2 text-ash">{r.label}</dt>
                  </div>
                </Reveal>
              ))}
            </dl>
            <address className="mt-8 text-[15px] not-italic leading-relaxed text-graphite">
              {site.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </Reveal>
          <Reveal x={24} delay={100}>
            <div className="relative overflow-hidden rounded-[28px] border border-line-soft shadow-[0_40px_80px_-40px_rgba(10,26,58,0.4)]">
              <iframe
                title="iDM office map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full grayscale-[0.25] contrast-[1.05]"
              />
              <div className="card absolute bottom-4 left-4 flex items-center gap-3 px-4 py-3 animate-[float-y_6s_ease-in-out_infinite]">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-green" />
                </span>
                <span className="text-[13px] font-semibold text-ink">Team online · replies within 24h</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. FAQ */}
      <FAQ />
    </main>
  );
}
