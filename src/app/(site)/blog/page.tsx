import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BLOG_CATEGORIES, getPublishedPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Blog — Guides, materials and case studies from iDM",
  description: "Practical guides on bulk ID card printing, PVC & NTR materials, lanyards, RFID and the software that runs a modern print business.",
};

export const dynamic = "force-dynamic";

const topics = [
  { title: "Bulk printing guides", body: "Checklists and timelines for schools, corporates and events.", icon: "M4 6h16M4 12h16M4 18h10" },
  { title: "Materials explained", body: "PVC, NTR, satin, tube — what to pick and why.", icon: "M4 7l8-4 8 4-8 4-8-4Zm0 5 8 4 8-4M4 17l8 4 8-4" },
  { title: "Software & workflow", body: "How partner vendors remove data and tracking bottlenecks.", icon: "M4 5h16v11H4zM8 21h8" },
  { title: "Case studies", body: "Behind the scenes on the iDM production floor.", icon: "M12 3v18M3 12h18" },
];

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const all = await getPublishedPosts();
  const featured = all.find((p) => p.featured) ?? all[0];
  const filtered = category ? all.filter((p) => p.category === category) : all;
  const rest = filtered.filter((p) => p.id !== featured?.id);
  const popular = [...all].sort((a, b) => b.read_minutes - a.read_minutes).slice(0, 4);
  const categories = BLOG_CATEGORIES.filter((c) => all.some((p) => p.category === c));

  return (
    <main>
      {/* 1. Hero */}
      <PageHero
        eyebrow="iDM Blog"
        title={
          <>
            Ideas, guides and stories from the <span className="text-brand">printing floor</span>
          </>
        }
        sub="Everything we have learned printing over a million ID cards — materials, workflows, software and the occasional 48-hour miracle."
        compact
      >
        <nav aria-label="Categories" className="flex flex-wrap justify-center gap-2">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${!category ? "border-brand bg-brand text-white" : "border-line bg-white text-graphite hover:border-brand hover:text-brand"}`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/blog?category=${encodeURIComponent(c)}`}
              className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${category === c ? "border-brand bg-brand text-white" : "border-line bg-white text-graphite hover:border-brand hover:text-brand"}`}
            >
              {c}
            </Link>
          ))}
        </nav>
      </PageHero>

      {/* 2. Featured */}
      {featured && !category && (
        <section className="bg-surface pb-16 sm:pb-20">
          <div className="container-x">
            <Reveal y={30}>
              <p className="micro mb-4 text-ash">Featured article</p>
              <PostCard post={featured} large />
            </Reveal>
          </div>
        </section>
      )}

      {/* 3. Latest */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x">
          <SectionHeader align="left" label={category ? `Category · ${category}` : "Latest articles"} title={category ? [category, "articles"] : ["Fresh from", "the iDM team"]} accentLine={1} />
          {rest.length === 0 && filtered.length === 0 ? (
            <div className="card mt-10 p-10 text-center">
              <p className="font-display text-xl font-semibold text-ink">No articles yet</p>
              <p className="mt-2 text-graphite">Published posts from the iDM admin will appear here.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(category ? filtered : rest).map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 90} y={28}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Topics */}
      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-brand/40 blur-[140px]" />
        <div className="container-x relative">
          <SectionHeader tone="dark" label="What we write about" title={["Four topics,", "one goal: fewer reprints"]} accentLine={1} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((t, i) => (
              <Reveal key={t.title} delay={i * 90} y={24}>
                <div className="glass group h-full p-6 transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-white/10">
                  <span className="icon-badge bg-teal/15 text-teal transition-transform duration-500 group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d={t.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-[18px] font-semibold">{t.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/65">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Popular list */}
      {popular.length > 0 && (
        <section className="bg-surface py-16 sm:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal x={-20}>
              <SectionHeader align="left" label="Most read" title={["The guides partners", "keep coming back to"]} accentLine={1} />
              <p className="lede mt-6">Long-form, practical and updated as our process changes.</p>
              <div className="mt-8">
                <Button href="/contact" variant="ghost">
                  Ask us a question
                </Button>
              </div>
            </Reveal>
            <ol className="divide-y divide-line-soft rounded-[24px] border border-line-soft bg-paper">
              {popular.map((p, i) => (
                <Reveal key={p.id} delay={i * 80} y={16}>
                  <li>
                    <Link href={`/blog/${p.slug}`} className="group flex items-start gap-5 p-6 transition-colors hover:bg-brand-tint/40">
                      <span className="font-display text-3xl font-bold leading-none text-gradient">0{i + 1}</span>
                      <span className="flex-1">
                        <span className="micro text-ash">
                          {p.category} · {p.read_minutes} min
                        </span>
                        <span className="mt-1.5 block font-display text-[18px] font-semibold text-ink transition-colors group-hover:text-brand">{p.title}</span>
                      </span>
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 text-brand transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 6. Newsletter */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x">
          <Reveal y={30}>
            <div className="relative overflow-hidden rounded-[32px] bg-navy px-6 py-14 text-white sm:px-12 sm:py-20">
              <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_75%)]" />
              <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-[360px] rounded-full bg-brand/40 blur-[130px] animate-[pulse-soft_8s_ease-in-out_infinite]" />
              <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-16 size-[360px] rounded-full bg-accent/25 blur-[130px] animate-[pulse-soft_10s_ease-in-out_infinite]" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <span className="eyebrow-pill inline-flex border-white/15 bg-white/10 text-white/80">
                    <span className="size-1.5 rounded-full bg-accent" />
                    Newsletter
                  </span>
                  <h2 className="h-section mt-5 text-white">One useful printing email a month.</h2>
                  <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-white/70">Material price updates, new guides and partner stories. No spam, unsubscribe anytime.</p>
                </div>
                <div className="relative">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
