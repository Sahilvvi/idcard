import { deleteTestimonial, setTestimonialStatus } from "@/app/admin/actions";
import { RowActions } from "@/components/admin/RowActions";
import { Card, PageTitle, PrimaryLink, StatusPill } from "@/components/admin/ui";
import { getAllTestimonials } from "@/lib/cms";

export default async function TestimonialsPage() {
  const items = await getAllTestimonials();
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Testimonials" title="Video testimonials" sub="Client videos shown in the carousel on the home page, in sort order." action={<PrimaryLink href="/admin/testimonials/new">+ New testimonial</PrimaryLink>} />
      <Card className="overflow-hidden">
        {items.length === 0 ? (
          <p className="px-6 py-12 text-center text-[14px] text-ash">No testimonials yet. Add your first client video.</p>
        ) : (
          <ul className="divide-y divide-line-soft">
            {items.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-semibold text-ink">
                    <span className="mr-2 text-ash">#{t.sort_order}</span>
                    {t.person_name}
                  </p>
                  <p className="mt-0.5 truncate text-[12.5px] text-graphite">
                    {[t.person_role, t.company].filter(Boolean).join(" · ")} — <span className="text-ash">{t.video_url}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusPill status={t.status} />
                  <RowActions
                    editHref={`/admin/testimonials/${t.id}`}
                    actions={[
                      t.status === "published"
                        ? { label: "Unpublish", run: setTestimonialStatus.bind(null, t.id, "draft") }
                        : { label: "Publish", run: setTestimonialStatus.bind(null, t.id, "published") },
                      { label: "Delete", run: deleteTestimonial.bind(null, t.id), confirm: `Delete testimonial from ${t.person_name}?`, danger: true },
                    ]}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
