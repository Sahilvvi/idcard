import { getPublishedTestimonials } from "@/lib/cms";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { SectionHeader } from "./ui/SectionHeader";

export async function VideoTestimonials() {
  const items = await getPublishedTestimonials();
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 size-[480px] rounded-full bg-brand/25 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 size-[420px] rounded-full bg-teal/20 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeader
          label="Client stories"
          title={["Hear It From", "The People We Print For"]}
          accentLine={1}
          tone="dark"
          sub="Schools, event teams, print partners and enterprises on what working with iDM actually looks like — in their own words."
        />
        <TestimonialCarousel items={items} />
      </div>
    </section>
  );
}
