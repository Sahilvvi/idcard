import Link from "next/link";
import type { ReactNode } from "react";

export function PageTitle({ eyebrow, title, sub, action }: { eyebrow: string; title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 animate-[fade-up_0.6s_var(--ease-out-expo)_both]">
      <div>
        <p className="micro text-brand">{eyebrow}</p>
        <h1 className="mt-1.5 font-display text-[28px] font-bold tracking-tight text-ink sm:text-[32px]">{title}</h1>
        {sub && <p className="mt-1.5 text-[14.5px] text-graphite">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`card animate-[fade-up_0.6s_var(--ease-out-expo)_both] ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, hint, tone = "brand", delay = 0 }: { label: string; value: string | number; hint?: string; tone?: "brand" | "teal" | "accent" | "navy"; delay?: number }) {
  const tones = {
    brand: "from-brand to-brand-deep",
    teal: "from-teal to-[#0b8483]",
    accent: "from-accent to-accent-deep",
    navy: "from-navy-soft to-navy",
  } as const;
  return (
    <Card className="relative overflow-hidden p-5" delay={delay}>
      <div aria-hidden className={`pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-gradient-to-br opacity-15 blur-2xl ${tones[tone]}`} />
      <p className="micro text-ash">{label}</p>
      <p className="mt-2 font-display text-[34px] font-bold leading-none tracking-tight text-ink">{value}</p>
      {hint && <p className="mt-2 text-[12.5px] text-graphite">{hint}</p>}
    </Card>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-[13.5px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(29,78,216,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-deep"
    >
      {children}
    </Link>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-green/10 text-green",
    draft: "bg-accent-tint text-accent-deep",
    new: "bg-brand-tint text-brand",
    contacted: "bg-accent-tint text-accent-deep",
    qualified: "bg-teal-tint text-[#0b8483]",
    closed: "bg-surface-deep text-graphite",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${map[status] ?? "bg-surface-deep text-graphite"}`}>{status}</span>;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="icon-badge-brand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <p className="mt-4 font-display text-[19px] font-semibold text-ink">{title}</p>
      <p className="mt-1.5 max-w-sm text-[14px] text-graphite">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-line-soft bg-surface px-4 py-2.5 text-[14px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ash focus:border-brand focus:ring-4 focus:ring-brand/10";
export const labelCls = "mb-1.5 block text-[12.5px] font-semibold text-ink";
