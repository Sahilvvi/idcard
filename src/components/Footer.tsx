import { footer, site } from "@/lib/content";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.join(" ") + ", " + site.location)}&output=embed`;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-purple text-white">
      <div className="container-x relative py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="4" y="3" width="16" height="18" rx="3" fill="white" fillOpacity="0.95" />
                  <rect x="7" y="7" width="6" height="6" rx="1.4" fill="currentColor" className="text-purple" />
                  <rect x="7" y="15" width="10" height="1.6" rx="0.8" fill="currentColor" className="text-orange" />
                </svg>
              </span>
              <span className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                IVY<span className="font-medium text-white/70">PRINTS</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/70">{footer.blurb}</p>
            <div className="mt-6 space-y-2.5 text-[14px]">
              <a href={site.phoneHref} className="block w-fit hover:underline">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block w-fit hover:underline">
                {site.email}
              </a>
              <address className="not-italic text-white/65">
                {site.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="micro border-b border-orange/50 pb-2 text-orange">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#products" className="text-[13.5px] text-white/75 transition-colors hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-[1fr_1fr_auto]">
          <div>
            <p className="micro text-white/60">Sitemap</p>
            <a href="/sitemap.xml" className="mt-2 block text-[13.5px] text-white/80 hover:text-white">
              Sitemap
            </a>
          </div>
          <div>
            <p className="micro text-white/60">Legal</p>
            <ul className="mt-2 space-y-1.5">
              {footer.legal
                .filter((l) => l.label !== "Sitemap")
                .map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[13.5px] text-white/80 hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div className="sm:w-64">
            <p className="micro text-white/60">Map</p>
            <div className="mt-2 overflow-hidden rounded-xl border border-white/15">
              <iframe
                src={mapSrc}
                title="IvyPrints location map"
                loading="lazy"
                className="h-28 w-full grayscale-[20%]"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 text-[12px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none px-4 pb-2 text-center font-display text-[16vw] font-bold leading-[0.8] tracking-[-0.06em] text-white/[0.06]">
        IVYPRINTS
      </p>
    </footer>
  );
}
