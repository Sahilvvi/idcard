import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { PostCard } from "@/components/blog/PostCard";
import { ShareBar } from "@/components/blog/ShareBar";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate, getPostBySlug, getPublishedPosts } from "@/lib/cms";
import { site } from "@/lib/content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found — iDM" };
  return {
    title: `${post.title} — iDM Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: post.cover_image ? [{ url: post.cover_image }] : undefined },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const others = (await getPublishedPosts()).filter((p) => p.id !== post.id);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  const url = `${site.url}/blog/${post.slug}`;

  return (
    <main>
      <article>
        <header className="relative -mt-16 overflow-hidden bg-surface pt-28 sm:-mt-20 sm:pt-36">
          <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[120px]" />
          <div className="container-x relative">
            <nav aria-label="Breadcrumb" className="animate-[fade-up_0.6s_var(--ease-out-expo)_both]">
              <ol className="flex flex-wrap items-center gap-2 text-[12.5px] font-medium text-ash">
                <li>
                  <Link href="/" className="hover:text-brand">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-brand">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-brand">
                    {post.category}
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="mx-auto mt-8 max-w-3xl text-center">
              <span className="eyebrow-pill animate-[fade-up_0.6s_var(--ease-out-expo)_0.05s_both] border border-brand/15 bg-brand-tint text-brand">
                <span className="size-1.5 rounded-full bg-brand" />
                {post.category}
              </span>
              <h1 className="display mt-6 animate-[fade-up_0.7s_var(--ease-out-expo)_0.12s_both] text-ink" style={{ fontSize: "clamp(2rem,4.6vw,3.5rem)" }}>
                {post.title}
              </h1>
              <p className="lede mt-6 animate-[fade-up_0.7s_var(--ease-out-expo)_0.2s_both]">{post.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13.5px] text-graphite animate-[fade-up_0.7s_var(--ease-out-expo)_0.26s_both]">
                <span className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-full bg-brand text-[13px] font-bold text-white">{post.author_name.slice(0, 1)}</span>
                  <span className="font-semibold text-ink">{post.author_name}</span>
                </span>
                <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
                <span>{post.read_minutes} min read</span>
              </div>
            </div>
            <div className="relative mx-auto mt-12 max-w-5xl animate-[fade-up_0.8s_var(--ease-out-expo)_0.32s_both]">
              <div className="aspect-[16/8] overflow-hidden rounded-t-[28px] shadow-[0_40px_80px_-40px_rgba(10,26,58,0.5)]">
                <AssetImage src={post.cover_image ?? "/assets/hero-id-cards.webp"} alt={post.title} priority sizes="(min-width:1024px) 1024px, 100vw" caption="none" />
              </div>
            </div>
          </div>
        </header>

        <div className="bg-paper">
          <div className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_280px] lg:py-20">
            <Reveal y={20}>
              <div className="mx-auto max-w-3xl lg:mx-0">
                <Markdown content={post.content} />
                {post.tags.length > 0 && (
                  <ul className="mt-12 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12.5px] font-medium text-graphite">
                        #{t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal y={20} delay={100}>
                <div className="card p-6">
                  <p className="micro text-ash">Share</p>
                  <ShareBar url={url} title={post.title} />
                </div>
                <div className="relative mt-5 overflow-hidden rounded-2xl bg-navy p-6 text-white">
                  <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand/50 blur-[60px]" />
                  <p className="micro text-accent">Need cards printed?</p>
                  <p className="mt-2 font-display text-[19px] font-semibold leading-snug">Get a quote from iDM within one working day.</p>
                  <Button href="/contact" variant="primary" className="mt-5 w-full justify-center">
                    Get a quote
                  </Button>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-surface py-16 sm:py-24">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="micro text-ash">Keep reading</p>
                <h2 className="h-section mt-2 text-ink">Related articles</h2>
              </div>
              <Button href="/blog" variant="ghost">
                All articles
              </Button>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 90} y={28}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
