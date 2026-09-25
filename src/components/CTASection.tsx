import { cta, site } from "@/lib/content";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function CTASection() {
  return (
    <section className="relative bg-surface py-16 sm:py-24">
      <div className="container-x">
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[32px] bg-navy px-6 py-16 text-center text-white sm:px-12 sm:py-24">
            <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_75%)]" />
            <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 size-[420px] rounded-full bg-brand/40 blur-[140px] animate-[pulse-soft_7s_ease-in-out_infinite]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 size-[420px] rounded-full bg-accent/25 blur-[140px] animate-[pulse-soft_9s_ease-in-out_infinite]" />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />

            {/* Floating card chips */}
            <div aria-hidden className="pointer-events-none absolute left-[8%] top-[18%] hidden rotate-[-8deg] rounded-xl bg-white/10 px-4 py-3 text-left backdrop-blur-sm animate-[float-y_7s_ease-in-out_infinite] lg:block">
              <p className="micro text-white/60">Order #IDM-2481</p>
              <p className="mt-1 font-display text-[14px] font-semibold">1,200 cards · QC passed</p>
            </div>
            <div aria-hidden className="pointer-events-none absolute bottom-[18%] right-[8%] hidden rotate-[6deg] rounded-xl bg-white/10 px-4 py-3 text-left backdrop-blur-sm animate-[float-y_8s_ease-in-out_infinite_1s] lg:block">
              <p className="micro text-white/60">Dispatch</p>
              <p className="mt-1 font-display text-[14px] font-semibold text-accent">24 hours · {site.location.split(",")[0]}</p>
            </div>

            <div className="relative mx-auto max-w-3xl">
              <span className="eyebrow-pill inline-flex border-white/15 bg-white/10 text-white/80">
                <span className="size-1.5 rounded-full bg-accent" />
                Partner with iDM
              </span>
              <h2 className="display mt-6 text-white">
                {cta.title[0]} <span className="text-gradient" style={{ backgroundImage: "linear-gradient(90deg,#f59e0b 0%,#fbbf24 45%,#5eead4 100%)" }}>{cta.title[1]}</span>
              </h2>
              <p className="lede mx-auto mt-6 max-w-2xl text-white/70">{cta.body}</p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="primary" className="w-full sm:w-auto">
                  {cta.primary}
                </Button>
                <Button href="/#software" variant="outline-light" className="w-full sm:w-auto">
                  {cta.secondary}
                </Button>
              </div>

              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {cta.chips.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[13px] font-medium text-white/75">
                    <span className="grid size-5 place-items-center rounded-full bg-teal/20 text-teal">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
