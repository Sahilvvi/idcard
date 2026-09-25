"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteLead, updateLead } from "@/app/admin/actions";
import { formatDate, type Lead, type LeadStatus } from "@/lib/cms-types";
import { StatusPill, inputCls } from "./ui";

const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "closed"];

export function LeadRow({ lead, index }: { lead: Lead; index: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [pending, start] = useTransition();

  const run = (fn: () => ReturnType<typeof updateLead>) =>
    start(async () => {
      const res = await fn();
      if (!res.ok) window.alert(res.error);
      router.refresh();
    });

  return (
    <li className={`card overflow-hidden transition-[box-shadow] animate-[fade-up_0.6s_var(--ease-out-expo)_both] ${open ? "shadow-[0_24px_48px_-28px_rgba(10,26,58,0.35)]" : ""}`} style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center gap-4 px-5 py-4 text-left">
        <span className={`grid size-11 shrink-0 place-items-center rounded-full text-[14px] font-bold ${lead.status === "new" ? "bg-brand text-white" : "bg-brand-tint text-brand"}`}>{lead.name.slice(0, 1).toUpperCase()}</span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[15px] font-semibold text-ink">{lead.name}</span>
            {lead.business && <span className="text-[13.5px] text-graphite">· {lead.business}</span>}
          </span>
          <span className="mt-0.5 block truncate text-[12.5px] text-ash">
            {[lead.email, lead.phone].filter(Boolean).join(" · ")} {lead.interest ? `· ${lead.interest}` : ""}
          </span>
        </span>
        <span className="hidden text-[12.5px] text-ash sm:block">{formatDate(lead.created_at)}</span>
        <StatusPill status={lead.status} />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className={`shrink-0 text-ash transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="grid gap-6 border-t border-line-soft bg-surface/50 px-5 py-5 lg:grid-cols-[1fr_320px] animate-[fade-up_0.35s_var(--ease-out-expo)_both]">
          <div className="space-y-4">
            <dl className="grid gap-3 text-[13.5px] sm:grid-cols-2">
              <Item label="Email" value={lead.email} href={lead.email ? `mailto:${lead.email}` : undefined} />
              <Item label="Phone" value={lead.phone} href={lead.phone ? `tel:${lead.phone.replace(/\s/g, "")}` : undefined} />
              <Item label="Business" value={lead.business} />
              <Item label="Interest" value={lead.interest} />
              <Item label="Source" value={lead.source} />
              <Item label="Page" value={lead.page_path} />
              <Item label="Received" value={new Date(lead.created_at).toLocaleString("en-IN")} />
            </dl>
            {lead.message && (
              <div>
                <p className="micro text-ash">Message</p>
                <p className="mt-1.5 whitespace-pre-wrap rounded-xl bg-paper p-4 text-[14px] leading-relaxed text-ink">{lead.message}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {lead.phone && (
                <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center rounded-full bg-green px-4 text-[12.5px] font-semibold text-white hover:opacity-90">
                  WhatsApp
                </a>
              )}
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="inline-flex h-9 items-center rounded-full bg-brand px-4 text-[12.5px] font-semibold text-white hover:bg-brand-deep">
                  Reply by email
                </a>
              )}
            </div>
          </div>

          <div className={`space-y-4 ${pending ? "opacity-60" : ""}`}>
            <div>
              <p className="micro text-ash">Status</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={pending || s === lead.status}
                    onClick={() => run(() => updateLead(lead.id, { status: s }))}
                    className={`rounded-lg px-3 py-2 text-[12.5px] font-semibold capitalize transition-colors ${s === lead.status ? "bg-navy text-white" : "bg-paper text-graphite hover:bg-brand-tint hover:text-brand"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor={`notes-${lead.id}`} className="micro text-ash">
                Internal notes
              </label>
              <textarea id={`notes-${lead.id}`} value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Call summary, quote sent, follow-up date…" className={`${inputCls} mt-2 resize-none`} />
              <button type="button" disabled={pending || notes === (lead.notes ?? "")} onClick={() => run(() => updateLead(lead.id, { notes }))} className="mt-2 text-[12.5px] font-semibold text-brand hover:underline disabled:text-ash disabled:no-underline">
                Save notes
              </button>
            </div>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                if (window.confirm("Delete this lead permanently?")) run(() => deleteLead(lead.id));
              }}
              className="text-[12.5px] font-semibold text-accent-deep hover:underline"
            >
              Delete lead
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function Item({ label, value, href }: { label: string; value: string | null; href?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="micro text-ash">{label}</dt>
      <dd className="mt-0.5 break-all font-medium text-ink">{href ? <a href={href} className="hover:text-brand">{value}</a> : value}</dd>
    </div>
  );
}
