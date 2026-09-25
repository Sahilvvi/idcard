"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "@/components/Navbar";
import { signOut } from "@/app/admin/actions";

const items = [
  { label: "Overview", href: "/admin", icon: "M4 13h6V4H4v9Zm10 7h6v-9h-6v9ZM4 20h6v-5H4v5Zm10-9h6V4h-6v7Z" },
  { label: "Blog", href: "/admin/blog", icon: "M5 4h11l3 3v13H5V4Zm3 6h8M8 14h8M8 18h5" },
  { label: "Pages", href: "/admin/pages", icon: "M6 3h9l4 4v14H6V3Zm9 0v4h4M9 12h6M9 16h6" },
  { label: "Leads", href: "/admin/leads", icon: "M4 6h16v12H4V6Zm0 1 8 6 8-6" },
];

export function Sidebar({ email, name, newLeads }: { email: string; name: string | null; newLeads: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const nav = (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {items.map((it) => {
        const a = active(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            onClick={() => setOpen(false)}
            aria-current={a ? "page" : undefined}
            className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
              a ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-accent transition-transform duration-300 ease-[var(--ease-out-expo)] ${a ? "scale-y-100" : "scale-y-0"}`} />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className={a ? "text-accent" : "text-white/50 group-hover:text-white/80"}>
              <path d={it.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {it.label}
            {it.label === "Leads" && newLeads > 0 && (
              <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-ink">{newLeads}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const user = (
    <div className="glass flex items-center gap-3 p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-[13px] font-bold text-white">{(name || email).slice(0, 1).toUpperCase()}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-semibold text-white">{name || "Admin"}</span>
        <span className="block truncate text-[12px] text-white/50">{email}</span>
      </span>
      <form action={signOut}>
        <button type="submit" title="Sign out" className="grid size-8 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 4h4v16h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-navy px-4 py-3 text-white lg:hidden">
        <Link href="/admin" className="inline-flex items-center gap-2">
          <LogoMark size={26} chip />
          <span className="micro text-white/60">Admin</span>
        </Link>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Toggle menu" className="grid size-10 place-items-center rounded-lg bg-white/10">
          <span className={`absolute h-px w-5 bg-white transition-transform ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
          <span className={`absolute h-px w-5 bg-white transition-transform ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
        </button>
      </header>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[60px] z-30 flex flex-col justify-between bg-navy p-4 lg:hidden">
          {nav}
          {user}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="relative hidden w-[264px] shrink-0 flex-col justify-between overflow-hidden bg-navy p-5 text-white lg:flex">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,#000_10%,transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand/40 blur-[100px]" />
        <div className="relative">
          <Link href="/admin" className="inline-flex items-center gap-3 px-1">
            <LogoMark size={30} chip />
            <span className="border-l border-white/20 pl-3 text-[11px] leading-tight text-white/60">
              Admin
              <br />
              Console
            </span>
          </Link>
          <div className="mt-8">{nav}</div>
          <Link href="/" target="_blank" className="mt-6 flex items-center gap-2 px-3.5 text-[12.5px] font-medium text-white/50 transition-colors hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M14 4h6v6M20 4l-9 9M19 14v5H5V5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            View website
          </Link>
        </div>
        <div className="relative">{user}</div>
      </aside>
    </>
  );
}
