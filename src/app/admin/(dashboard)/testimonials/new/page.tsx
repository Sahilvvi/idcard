import { TestimonialEditor } from "@/components/admin/TestimonialEditor";
import { PageTitle } from "@/components/admin/ui";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Testimonials" title="New testimonial" sub="Paste a YouTube, Vimeo, Instagram reel or direct MP4 link." />
      <TestimonialEditor />
    </div>
  );
}
