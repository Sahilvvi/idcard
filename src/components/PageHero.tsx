import type { ReactNode } from "react";
import Link from "next/link";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  align?: "center" | "left";
  compact?: boolean;
};

/** Shared page header that mirrors the landing hero: light grid, brand/teal/amber glows, staggered fade-up. */
export function PageHero({ eyebrow, title, sub, crumbs, children, align = "center", compact = false }: Props) {
  const center = align === "center";
  return (
    <section className={`relative -mt-16 overflow-hidden bg-surface pt-28 sm:-mt-20 sm:pt-36 ${compact ? "pb-10 sm:pb-14" : "pb-16 sm:pb-24"}`}>
      <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-24 size-[340px] rounded-full bg-teal/15 blur-[110px] animate-[pulse-soft_8s_ease-in-out_infinite]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-40 size-[300px] rounded-full bg-accent/15 blur-[110px] animate-[pulse-soft_10s_ease-in-out_infinite_1s]" />

      <div className={`container-x relative flex flex-col ${center ? "items-center text-center" : "items-start text-left"}`}>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 animate-[fade-up_0.6s_var(--ease-out-expo)_both]">
            <ol className="flex flex-wrap items-center gap-2 text-[12.5px] font-medium text-ash">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-brand">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-graphite">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden className="text-line">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <span className="eyebrow-pill animate-[fade-up_0.6s_var(--ease-out-expo)_0.05s_both] border border-brand/15 bg-brand-tint text-brand">
          <span className="size-1.5 rounded-full bg-brand animate-[pulse-soft_2.4s_ease-in-out_infinite]" />
          {eyebrow}
        </span>
        <h1 className={`display mt-6 animate-[fade-up_0.7s_var(--ease-out-expo)_0.12s_both] text-ink ${center ? "max-w-4xl" : "max-w-3xl"}`}>{title}</h1>
        {sub && <p className={`lede mt-6 animate-[fade-up_0.7s_var(--ease-out-expo)_0.2s_both] ${center ? "max-w-2xl" : "max-w-xl"}`}>{sub}</p>}
        {children && <div className="mt-8 w-full animate-[fade-up_0.7s_var(--ease-out-expo)_0.28s_both]">{children}</div>}
      </div>
    </section>
  );
}
