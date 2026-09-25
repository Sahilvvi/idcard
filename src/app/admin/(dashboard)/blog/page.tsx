import Link from "next/link";
import { deletePost, setPostStatus } from "@/app/admin/actions";
import { RowActions } from "@/components/admin/RowActions";
import { Card, EmptyState, PageTitle, PrimaryLink, StatusPill } from "@/components/admin/ui";
import { formatDate, getAllPosts } from "@/lib/cms";

export default async function AdminBlogPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const { q = "", status = "" } = await searchParams;
  const posts = (await getAllPosts()).filter((p) => (!status || p.status === status) && (!q || p.title.toLowerCase().includes(q.toLowerCase())));
  const all = await getAllPosts();

  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Blog" title="Articles" sub={`${all.filter((p) => p.status === "published").length} published · ${all.filter((p) => p.status === "draft").length} drafts`} action={<PrimaryLink href="/admin/blog/new">+ New article</PrimaryLink>} />

      <form className="flex flex-wrap items-center gap-2 animate-[fade-up_0.6s_var(--ease-out-expo)_0.05s_both]">
        <input name="q" defaultValue={q} placeholder="Search titles…" className="h-10 w-64 rounded-full border border-line-soft bg-paper px-4 text-[13.5px] outline-none focus:border-brand" />
        <div className="flex gap-1 rounded-full bg-surface-deep p-1">
          {[
            ["", "All"],
            ["published", "Published"],
            ["draft", "Drafts"],
          ].map(([v, l]) => (
            <Link key={v} href={`/admin/blog${v ? `?status=${v}` : ""}`} className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${status === v ? "bg-paper text-ink shadow-sm" : "text-graphite hover:text-ink"}`}>
              {l}
            </Link>
          ))}
        </div>
      </form>

      {posts.length === 0 ? (
        <EmptyState title="No articles found" body="Write your first article — it will appear on /blog as soon as you publish it." action={<PrimaryLink href="/admin/blog/new">Write an article</PrimaryLink>} />
      ) : (
        <Card className="overflow-hidden" delay={100}>
          <table className="w-full text-left text-[14px]">
            <thead className="bg-surface text-[11.5px] uppercase tracking-[0.12em] text-ash">
              <tr>
                <th className="px-5 py-3 font-semibold">Article</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Category</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">Updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {posts.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-surface/60">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/blog/${p.id}`} className="font-semibold text-ink hover:text-brand">
                      {p.title}
                    </Link>
                    <span className="block text-[12px] text-ash">/blog/{p.slug}{p.featured ? " · featured" : ""}</span>
                  </td>
                  <td className="hidden px-5 py-3.5 text-graphite md:table-cell">{p.category}</td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="hidden px-5 py-3.5 text-graphite lg:table-cell">{formatDate(p.updated_at)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <RowActions
                        actions={[
                          p.status === "published"
                            ? { label: "Unpublish", run: setPostStatus.bind(null, p.id, "draft") }
                            : { label: "Publish", run: setPostStatus.bind(null, p.id, "published") },
                          { label: "Delete", run: deletePost.bind(null, p.id), confirm: `Delete "${p.title}"?`, danger: true },
                        ]}
                        editHref={`/admin/blog/${p.id}`}
                      />
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
