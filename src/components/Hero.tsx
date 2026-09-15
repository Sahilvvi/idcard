import { hero } from "@/lib/content";
import { Button } from "./ui/Button";
import { AssetImage } from "./ui/AssetImage";

export function Hero() {
  return (
    <section id="top" className="relative bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16" aria-labelledby="hero-title">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="animate-[hero-fade_0.7s_var(--ease-out-expo)_both]">
          <h1 id="hero-title" className="display text-ink">
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
          <div className="card overflow-hidden !rounded-[20px] aspect-[6/5]">
            <AssetImage src={hero.asset} alt={hero.assetAlt} />
          </div>
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-paper px-4 py-2 text-[11px] font-semibold text-graphite shadow-[0_8px_24px_-8px_rgba(31,34,48,0.25)]">
            <span className="size-1.5 rounded-full bg-green" />
            {hero.caption}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-fade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes hero-slide{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
      `}</style>
    </section>
  );
}
