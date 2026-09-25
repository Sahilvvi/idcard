import Link from "next/link";
import { deletePage } from "@/app/admin/actions";
import { RowActions } from "@/components/admin/RowActions";
import { Card, EmptyState, PageTitle, PrimaryLink, StatusPill } from "@/components/admin/ui";
import { formatDate, getAllPages } from "@/lib/cms";
import { nav } from "@/lib/content";

export default async function AdminPagesPage() {
  const pages = await getAllPages();
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Pages" title="Website pages" sub="Core pages are built into the site; managed pages are editable here and live at /p/<slug>." action={<PrimaryLink href="/admin/pages/new">+ New page</PrimaryLink>} />

      <Card className="p-6" delay={50}>
        <h2 className="font-display text-[17px] font-semibold text-ink">Core pages</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} target="_blank" className="flex items-center justify-between rounded-xl border border-line-soft px-4 py-3 transition-colors hover:border-brand/40 hover:bg-brand-tint/40">
                <span>
                  <span className="block text-[13.5px] font-semibold text-ink">{n.label}</span>
                  <span className="block text-[12px] text-ash">{n.href}</span>
                </span>
                <span className="rounded-full bg-surface-deep px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-graphite">Built-in</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {pages.length === 0 ? (
        <EmptyState title="No managed pages" body="Create pages like Privacy Policy, Terms or a Partner Program landing page." action={<PrimaryLink href="/admin/pages/new">Create a page</PrimaryLink>} />
      ) : (
        <Card className="overflow-hidden" delay={120}>
          <table className="w-full text-left text-[14px]">
            <thead className="bg-surface text-[11.5px] uppercase tracking-[0.12em] text-ash">
              <tr>
                <th className="px-5 py-3 font-semibold">Page</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">Updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {pages.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-surface/60">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/pages/${p.id}`} className="font-semibold text-ink hover:text-brand">
                      {p.title}
                    </Link>
                    <span className="block text-[12px] text-ash">/p/{p.slug}{p.show_in_nav ? " · in footer" : ""}</span>
                  </td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="hidden px-5 py-3.5 text-graphite lg:table-cell">{formatDate(p.updated_at)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <RowActions editHref={`/admin/pages/${p.id}`} actions={[{ label: "Delete", run: deletePage.bind(null, p.id), confirm: `Delete "${p.title}"?`, danger: true }]} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
