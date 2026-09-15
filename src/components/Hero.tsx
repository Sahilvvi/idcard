import { hero } from "@/lib/content";
import { Button } from "./ui/Button";
import { AssetImage } from "./ui/AssetImage";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16" aria-labelledby="hero-title">
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-24 size-[340px] rounded-full bg-orange/20 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 size-[300px] rounded-full bg-purple/20 blur-[90px]" />

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="animate-[hero-fade_0.7s_var(--ease-out-expo)_both]">
          <span className="eyebrow-pill bg-purple-tint text-purple">Trusted by 500+ businesses across India</span>
          <h1 id="hero-title" className="display mt-4 text-ink">
            {hero.headingPrefix}
            <span className="text-orange">{hero.headingAccent}</span>
          </h1>
          <p className="mt-4 text-[15px] font-semibold text-purple sm:text-[17px]">{hero.subheading}</p>
          <p className="lede mt-5 max-w-[540px]">{hero.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#contact" variant="primary">
              {hero.primaryCta}
            </Button>
            <Button href="#ecosystem" variant="ghost" arrow={false}>
              {hero.secondaryCta}
            </Button>
          </div>
        </div>

        <div className="relative animate-[hero-slide_0.8s_var(--ease-out-expo)_0.1s_both]">
          <div className="absolute -right-4 -top-4 hidden w-2/3 rotate-[6deg] rounded-[20px] bg-purple/15 sm:block aspect-[6/5]" aria-hidden />
          <div className="relative animate-[hero-float_6s_ease-in-out_infinite]">
            <div className="card overflow-hidden !rounded-[20px] aspect-[6/5]">
              <AssetImage src={hero.asset} alt={hero.assetAlt} />
            </div>
            <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-paper px-4 py-2 text-[11px] font-semibold text-graphite shadow-[0_8px_24px_-8px_rgba(31,34,48,0.25)]">
              <span className="size-1.5 animate-pulse rounded-full bg-green" />
              {hero.caption}
            </div>
            <div className="absolute -left-5 top-6 hidden rotate-[-4deg] items-center gap-2 rounded-xl bg-paper px-3 py-2 shadow-[0_12px_28px_-10px_rgba(31,34,48,0.3)] sm:flex">
              <span className="icon-badge-orange !size-8">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[11px] font-semibold text-ink">50+ Cities</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-fade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes hero-slide{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes hero-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      `}</style>
    </section>
  );
}
