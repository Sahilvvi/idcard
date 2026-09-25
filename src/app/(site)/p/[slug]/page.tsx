import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate, getPageBySlug } from "@/lib/cms";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Page not found — iDM" };
  return { title: `${page.title} — iDM`, description: page.description };
}

export default async function ManagedPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <main>
      <PageHero eyebrow={page.eyebrow || "iDM"} title={page.hero_title || page.title} sub={page.hero_sub || page.description} crumbs={[{ label: "Home", href: "/" }, { label: page.title }]} compact>
        {page.cta_label && page.cta_href ? (
          <div className="flex justify-center">
            <Button href={page.cta_href} variant="brand">
              {page.cta_label}
            </Button>
          </div>
        ) : undefined}
      </PageHero>
      <section className="bg-paper py-14 sm:py-20">
        <div className="container-x">
          <Reveal y={20}>
            <div className="mx-auto max-w-3xl">
              <Markdown content={page.content} />
              <p className="mt-12 text-[12.5px] text-ash">Last updated {formatDate(page.updated_at)}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
