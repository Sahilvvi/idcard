import { notFound } from "next/navigation";
import { TestimonialEditor } from "@/components/admin/TestimonialEditor";
import { PageTitle } from "@/components/admin/ui";
import { getTestimonialById } from "@/lib/cms";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getTestimonialById(id);
  if (!item) notFound();
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Testimonials" title="Edit testimonial" sub={item.person_name} />
      <TestimonialEditor item={item} />
    </div>
  );
}
