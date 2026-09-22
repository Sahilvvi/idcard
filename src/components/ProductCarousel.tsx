import { products } from "@/lib/content";
import { AssetImage } from "./ui/AssetImage";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

function ProductCard({ item, index }: { item: (typeof products.items)[number]; index: number }) {
  return (
    <li className="w-[260px] shrink-0 sm:w-[300px]">
      <article className="group relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] p-2 backdrop-blur-sm transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:border-accent/40 hover:bg-white/[0.09]">
        <div className="relative aspect-[4/4.6] overflow-hidden rounded-[18px] bg-navy-soft">
          <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.08]">
            <AssetImage src={item.asset} alt={`${item.name} — product photograph`} tone="dark" caption="none" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
          <span className="micro absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-1 !text-[10px] text-white/80 backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-3 top-3 grid size-9 translate-y-2 place-items-center rounded-full bg-accent text-ink opacity-0 shadow-lg transition-[opacity,transform] duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-display text-[17px] font-semibold text-white">{item.name}</h3>
            <p className="micro mt-1 text-white/60">{item.spec}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export function ProductCarousel() {
  const items = products.items;
  const half = Math.ceil(items.length / 2);
  const a = items.slice(0, half);
  const b = items.slice(half);
  const rowA = [...a, ...a, ...a, ...a];
  const rowB = [...b, ...b, ...b, ...b];

  return (
    <section id="products" className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 size-[420px] rounded-full bg-brand/30 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 size-[380px] rounded-full bg-accent/15 blur-[140px]" />

      <div className="container-x relative">
        <Reveal>
          <SectionHeader label={products.label} title={products.title} accentLine={1} tone="dark" sub={products.sub} />
        </Reveal>
      </div>

      <div className="relative mt-12 space-y-5 sm:mt-16 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="pause-on-hover flex overflow-hidden">
          <ul className="flex shrink-0 gap-5 pr-5 animate-[marquee-x_48s_linear_infinite] motion-reduce:animate-none">
            {rowA.map((p, i) => (
              <ProductCard key={`${p.id}-a-${i}`} item={p} index={i % half} />
            ))}
          </ul>
        </div>
        <div className="pause-on-hover flex overflow-hidden">
          <ul className="flex shrink-0 gap-5 pr-5 animate-[marquee-x-rev_56s_linear_infinite] motion-reduce:animate-none">
            {rowB.map((p, i) => (
              <ProductCard key={`${p.id}-b-${i}`} item={p} index={half + (i % b.length)} />
            ))}
          </ul>
        </div>
      </div>

      <Reveal delay={120}>
        <div className="container-x relative mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-[14px] text-white/60">Hover any card to pause · {items.length} product categories · Custom requirements welcome</p>
          <Button href="#contact" variant="primary">
            Request the full catalogue
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
