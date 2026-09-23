import { footer, nav, site } from "@/lib/content";
import { LogoMark } from "./Navbar";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.98 1.98 0 1 0 0 3.96 1.98 1.98 0 0 0 0-3.96ZM20.44 13.7c0-3.3-1.77-4.84-4.12-4.84-1.9 0-2.75 1.04-3.22 1.78V8.5H9.72V20h3.38v-6.42c0-1.7.32-3.34 2.42-3.34 2.07 0 2.1 1.94 2.1 3.45V20h3.38l-.56-6.3Z" />
    </svg>
  ),
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  ),
  YouTube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
    </svg>
  ),
  WhatsApp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 20l1.3-3.8A8.5 8.5 0 1 1 8.2 19L4 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.2 8.8c.2 2.6 3 5.5 6 6l1.3-1.3-1.9-1-1 .8a5 5 0 0 1-2.4-2.4l.8-1-1-1.9-1.8.8Z" fill="currentColor" />
    </svg>
  ),
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent,#000_30%,#000_70%,transparent)] opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-brand/30 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="container-x relative py-16 sm:py-20">
        {/* Top row: brand + newsletter-like CTA */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <LogoMark size={36} chip />
            </a>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-white/65">{footer.blurb}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-[transform,background-color,color,border-color] duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    {SOCIAL_ICONS[s.label]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass relative overflow-hidden p-6 sm:p-7">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/30 blur-3xl" />
            <p className="micro text-accent">Talk to us</p>
            <p className="mt-2 font-display text-[20px] font-bold leading-tight">Bulk order or partnership? Get a callback within 24 hours.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a href={site.phoneHref} className="flex items-center gap-3 rounded-xl bg-white/5 p-3.5 transition-colors hover:bg-white/10">
                <span className="grid size-9 place-items-center rounded-lg bg-brand text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6.6 10.8c1.3 2.6 3.5 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1 .3 2.1.5 3.2.5.6 0 1 .4 1 1v3.2c0 .6-.4 1-1 1-9 0-16.3-7.3-16.3-16.3 0-.6.4-1 1-1H6.7c.6 0 1 .4 1 1 0 1.1.2 2.2.5 3.2.1.4 0 .8-.2 1l-1.4 2.1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="micro block text-white/50">Call</span>
                  <span className="block text-[14px] font-semibold">{site.phone}</span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-xl bg-white/5 p-3.5 transition-colors hover:bg-white/10">
                <span className="grid size-9 place-items-center rounded-lg bg-teal text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m4 6.5 8 6.5 8-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="micro block text-white/50">Email</span>
                  <span className="block truncate text-[14px] font-semibold">{site.email}</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Link columns + map */}
        <div className="mt-14 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[2.4fr_1fr]">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="micro flex items-center gap-2 text-white">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#products" className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/60 transition-colors hover:text-white">
                        <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <p className="micro flex items-center gap-2 text-white">
              <span className="size-1.5 rounded-full bg-teal" />
              Head office · {site.location.split(",")[0]}
            </p>
            <address className="mt-4 not-italic text-[13.5px] leading-relaxed text-white/60">
              {site.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <iframe
                src={mapSrc}
                title="iDM Siliguri location map"
                loading="lazy"
                className="h-40 w-full opacity-80 grayscale-[35%] transition-opacity duration-300 hover:opacity-100"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.slice(0, 4).map((n) => (
              <li key={n.label}>
                <a href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p aria-hidden className="pointer-events-none select-none px-4 pb-2 text-center font-display text-[16vw] font-bold leading-[0.8] tracking-[-0.06em] text-white/[0.04]">
        iDM
      </p>
    </footer>
  );
}
