import { cta } from "@/lib/content";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function CTASection() {
  return (
    <section id="get-started" className="relative overflow-hidden bg-purple py-16 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-white/10 blur-[100px] animate-[cta-pulse_8s_ease-in-out_infinite]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-orange/20 blur-[100px] animate-[cta-pulse_8s_ease-in-out_infinite_1s]" />

      <div className="container-x relative flex flex-col items-center text-center">
        <Reveal>
          <h2 className="display max-w-2xl">
            {cta.title[0]} <span className="text-orange">{cta.title[1]}</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="lede mt-5 max-w-lg !text-white/80">{cta.body}</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="#contact" variant="primary">
              {cta.primary}
            </Button>
            <Button href="#contact" variant="inverse" arrow={false}>
              {cta.secondary}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {cta.chips.map((c) => (
              <li key={c} className="micro flex items-center gap-2 text-white/70">
                <span className="size-1.5 rounded-full bg-orange" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <style>{`@keyframes cta-pulse{0%,100%{transform:translateY(-50%) scale(1);opacity:1}50%{transform:translateY(-50%) scale(1.15);opacity:0.7}}`}</style>
    </section>
  );
}
