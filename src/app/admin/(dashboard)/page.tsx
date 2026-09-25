import Link from "next/link";
import { Card, PageTitle, PrimaryLink, StatCard, StatusPill } from "@/components/admin/ui";
import { formatDate, getAllLeads, getAllPages, getAllPosts, type Lead } from "@/lib/cms";
import { nav } from "@/lib/content";

const DAY = 86_400_000;

function leadTrend(leads: Lead[]) {
  const now = Date.now();
  const age = (l: Lead) => now - new Date(l.created_at).getTime();
  const last7 = leads.filter((l) => age(l) < 7 * DAY).length;
  const prev7 = leads.filter((l) => age(l) >= 7 * DAY && age(l) < 14 * DAY).length;
  const trend = prev7 === 0 ? (last7 > 0 ? "+100%" : "—") : `${last7 >= prev7 ? "+" : ""}${Math.round(((last7 - prev7) / prev7) * 100)}%`;
  return { last7, trend };
}

export default async function OverviewPage() {
  const [posts, pages, leads] = await Promise.all([getAllPosts(), getAllPages(), getAllLeads()]);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.length - published.length;
  const { last7: leads7, trend } = leadTrend(leads);
  const newLeads = leads.filter((l) => l.status === "new").length;

  const bySource = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.source] = (acc[l.source] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const byStatus = (["new", "contacted", "qualified", "closed"] as const).map((s) => [s, leads.filter((l) => l.status === s).length] as const);
  const max = Math.max(1, ...bySource.map(([, n]) => n));

  const publicPages = [...nav, ...pages.filter((p) => p.status === "published").map((p) => ({ label: p.title, href: `/p/${p.slug}` }))];

  return (
    <div className="space-y-8">
      <PageTitle eyebrow="Overview" title="Website at a glance" sub="Content, pages and enquiries across the iDM website." action={<PrimaryLink href="/admin/blog/new">+ New article</PrimaryLink>} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total leads" value={leads.length} hint={`${newLeads} awaiting first contact`} tone="brand" />
        <StatCard label="Leads · last 7 days" value={leads7} hint={`${trend} vs previous 7 days`} tone="accent" delay={60} />
        <StatCard label="Published articles" value={published.length} hint={`${drafts} draft${drafts === 1 ? "" : "s"} in progress`} tone="teal" delay={120} />
        <StatCard label="Live pages" value={publicPages.length} hint={`${nav.length} core + ${publicPages.length - nav.length} managed`} tone="navy" delay={180} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Recent leads */}
        <Card className="p-6" delay={200}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[18px] font-semibold text-ink">Recent enquiries</h2>
            <Link href="/admin/leads" className="text-[13px] font-semibold text-brand hover:underline">
              View all →
            </Link>
          </div>
          {leads.length === 0 ? (
            <p className="mt-6 text-[14px] text-graphite">No enquiries yet. Leads from the contact page, popup and newsletter forms will show up here.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line-soft">
              {leads.slice(0, 6).map((l) => (
                <li key={l.id} className="flex items-center gap-4 py-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-tint text-[13px] font-bold text-brand">{l.name.slice(0, 1).toUpperCase()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-ink">
                      {l.name}
                      {l.business ? <span className="font-normal text-graphite"> · {l.business}</span> : null}
                    </span>
                    <span className="block truncate text-[12.5px] text-ash">
                      {l.interest || l.source} · {formatDate(l.created_at)}
                    </span>
                  </span>
                  <StatusPill status={l.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Lead sources */}
        <Card className="p-6" delay={260}>
          <h2 className="font-display text-[18px] font-semibold text-ink">Where leads come from</h2>
          {bySource.length === 0 ? (
            <p className="mt-6 text-[14px] text-graphite">No data yet.</p>
          ) : (
            <ul className="mt-5 space-y-4">
              {bySource.map(([src, n], i) => (
                <li key={src}>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-ink">{src}</span>
                    <span className="text-graphite">{n}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-deep">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-teal animate-[grow-x_1s_var(--ease-out-expo)_both]"
                      style={{ width: `${(n / max) * 100}%`, animationDelay: `${300 + i * 80}ms`, transformOrigin: "left" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h3 className="micro mt-8 text-ash">Pipeline</h3>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {byStatus.map(([s, n]) => (
              <div key={s} className="rounded-xl bg-surface p-3 text-center">
                <p className="font-display text-[20px] font-bold text-ink">{n}</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-ash">{s}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent posts */}
        <Card className="p-6" delay={320}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[18px] font-semibold text-ink">Latest articles</h2>
            <Link href="/admin/blog" className="text-[13px] font-semibold text-brand hover:underline">
              Manage →
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-line-soft">
            {posts.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-3">
                <span className="min-w-0 flex-1">
                  <Link href={`/admin/blog/${p.id}`} className="block truncate text-[14px] font-semibold text-ink hover:text-brand">
                    {p.title}
                  </Link>
                  <span className="block text-[12.5px] text-ash">
                    {p.category} · {formatDate(p.published_at ?? p.updated_at)}
                  </span>
                </span>
                <StatusPill status={p.status} />
              </li>
            ))}
            {posts.length === 0 && <li className="py-3 text-[14px] text-graphite">No articles yet.</li>}
          </ul>
        </Card>

        {/* Site map */}
        <Card className="p-6" delay={380}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[18px] font-semibold text-ink">Live website</h2>
            <Link href="/admin/pages" className="text-[13px] font-semibold text-brand hover:underline">
              Manage pages →
            </Link>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {publicPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} target="_blank" className="group flex items-center justify-between rounded-xl border border-line-soft px-4 py-3 transition-colors hover:border-brand/40 hover:bg-brand-tint/40">
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-semibold text-ink">{p.label}</span>
                    <span className="block truncate text-[12px] text-ash">{p.href}</span>
                  </span>
                  <span className="text-ash transition-transform group-hover:translate-x-0.5 group-hover:text-brand">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
