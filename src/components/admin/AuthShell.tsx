import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/Navbar";
import { site } from "@/lib/content";

const perks = ["Publish blog articles", "Manage website pages", "Track every lead in one inbox"];

export function AuthShell({ title, sub, children, footer }: { title: string; sub: string; children: ReactNode; footer: ReactNode }) {
  return (
    <main className="relative grid min-h-dvh lg:grid-cols-[1fr_1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-navy text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_80%)]" />
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 size-[460px] rounded-full bg-brand/50 blur-[140px] animate-[pulse-soft_8s_ease-in-out_infinite]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 size-[420px] rounded-full bg-accent/25 blur-[140px] animate-[pulse-soft_10s_ease-in-out_infinite_1s]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

        <Link href="/" className="relative inline-flex w-fit items-center gap-3 animate-[fade-up_0.6s_var(--ease-out-expo)_both]">
          <LogoMark size={34} chip />
          <span className="border-l border-white/20 pl-3 text-[11px] leading-tight text-white/60">
            Admin
            <br />
            Console
          </span>
        </Link>

        <div className="relative max-w-md">
          <p className="micro text-accent animate-[fade-up_0.6s_var(--ease-out-expo)_0.1s_both]">iDM CMS</p>
          <h2 className="display mt-4 text-white animate-[fade-up_0.7s_var(--ease-out-expo)_0.16s_both]" style={{ fontSize: "clamp(2rem,3.4vw,3.25rem)" }}>
            Run the website like you run the plant.
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-white/70 animate-[fade-up_0.7s_var(--ease-out-expo)_0.22s_both]">
            One console for articles, pages and every enquiry that comes through {site.name}.
          </p>
          <ul className="mt-8 space-y-3">
            {perks.map((p, i) => (
              <li key={p} className="flex items-center gap-3 text-[14.5px] text-white/85 animate-[fade-up_0.7s_var(--ease-out-expo)_both]" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                <span className="grid size-6 place-items-center rounded-full bg-teal/20 text-teal">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-between text-[12.5px] text-white/50">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="glass rounded-full px-3 py-1.5 animate-[float-y_7s_ease-in-out_infinite]">Secure · Supabase Auth</span>
        </div>
      </aside>

      {/* Form panel */}
      <section className="relative flex items-center justify-center overflow-hidden bg-surface px-5 py-12 sm:px-10">
        <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[360px] rounded-full bg-brand/15 blur-[120px]" />
        <div className="relative w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex lg:hidden">
            <LogoMark size={36} />
          </Link>
          <div className="card relative overflow-hidden p-7 sm:p-9 animate-[fade-up_0.7s_var(--ease-out-expo)_0.1s_both]">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-teal to-accent" />
            <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">{title}</h1>
            <p className="mt-2 text-[14.5px] text-graphite">{sub}</p>
            <div className="mt-7">{children}</div>
          </div>
          <p className="mt-6 text-center text-[13.5px] text-graphite animate-[fade-up_0.7s_var(--ease-out-expo)_0.2s_both]">{footer}</p>
        </div>
      </section>
    </main>
  );
}

export const authFieldCls =
  "w-full rounded-xl border border-line-soft bg-surface px-4 py-3 text-[14.5px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ash focus:border-brand focus:ring-4 focus:ring-brand/10";
