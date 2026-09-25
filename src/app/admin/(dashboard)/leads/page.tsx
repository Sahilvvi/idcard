import Link from "next/link";
import { LeadRow } from "@/components/admin/LeadRow";
import { EmptyState, PageTitle } from "@/components/admin/ui";
import { getAllLeads } from "@/lib/cms";

const FILTERS = [
  ["", "All"],
  ["new", "New"],
  ["contacted", "Contacted"],
  ["qualified", "Qualified"],
  ["closed", "Closed"],
] as const;

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string; source?: string }> }) {
  const { status = "", q = "", source = "" } = await searchParams;
  const all = await getAllLeads();
  const sources = [...new Set(all.map((l) => l.source))].sort();
  const needle = q.toLowerCase();
  const leads = all.filter(
    (l) =>
      (!status || l.status === status) &&
      (!source || l.source === source) &&
      (!needle || [l.name, l.email, l.phone, l.business, l.interest, l.message].some((v) => v?.toLowerCase().includes(needle))),
  );
  const counts = Object.fromEntries(FILTERS.map(([v]) => [v, v ? all.filter((l) => l.status === v).length : all.length]));

  const href = (patch: Partial<{ status: string; source: string; q: string }>) => {
    const p = new URLSearchParams();
    const next = { status, source, q, ...patch };
    if (next.status) p.set("status", next.status);
    if (next.source) p.set("source", next.source);
    if (next.q) p.set("q", next.q);
    const s = p.toString();
    return `/admin/leads${s ? `?${s}` : ""}`;
  };

  const exportHref = `data:text/csv;charset=utf-8,${encodeURIComponent(
    ["Name,Email,Phone,Business,Interest,Source,Page,Status,Received,Message"]
      .concat(leads.map((l) => [l.name, l.email, l.phone, l.business, l.interest, l.source, l.page_path, l.status, l.created_at, l.message].map((v) => `"${(v ?? "").replace(/"/g, '""')}"`).join(",")))
      .join("\n"),
  )}`;

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Leads"
        title="Enquiry inbox"
        sub={`${counts[""]} total · ${counts.new} new`}
        action={
          <a href={exportHref} download={`idm-leads-${new Date().toISOString().slice(0, 10)}.csv`} className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-paper px-5 text-[13.5px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand">
            Export CSV
          </a>
        }
      />

      <div className="flex flex-wrap items-center gap-3 animate-[fade-up_0.6s_var(--ease-out-expo)_0.05s_both]">
        <div className="flex flex-wrap gap-1 rounded-full bg-surface-deep p-1">
          {FILTERS.map(([v, l]) => (
            <Link key={v} href={href({ status: v })} className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${status === v ? "bg-paper text-ink shadow-sm" : "text-graphite hover:text-ink"}`}>
              {l} <span className="text-ash">{counts[v]}</span>
            </Link>
          ))}
        </div>
        <form className="flex items-center gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          <select name="source" defaultValue={source} className="h-10 rounded-full border border-line-soft bg-paper px-3 text-[13px] outline-none focus:border-brand">
            <option value="">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input name="q" defaultValue={q} placeholder="Search name, email, message…" className="h-10 w-64 rounded-full border border-line-soft bg-paper px-4 text-[13.5px] outline-none focus:border-brand" />
          <button type="submit" className="h-10 rounded-full bg-navy px-4 text-[13px] font-semibold text-white hover:bg-navy-soft">
            Filter
          </button>
        </form>
      </div>

      {leads.length === 0 ? (
        <EmptyState title="No leads here" body={all.length === 0 ? "When someone submits the contact form, popup or newsletter, it appears here instantly." : "Try clearing the filters."} />
      ) : (
        <ul className="space-y-3">
          {leads.map((l, i) => (
            <LeadRow key={l.id} lead={l} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
