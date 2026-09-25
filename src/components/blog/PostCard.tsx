import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { formatDate, type Post } from "@/lib/cms-types";

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(10,26,58,0.35)] ${
        large ? "lg:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]"}`}>
        <AssetImage src={post.cover_image ?? "/assets/hero-id-cards.webp"} alt={post.title} className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" sizes="(min-width:1024px) 33vw, 100vw" caption="none" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand shadow-sm backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className={`flex flex-1 flex-col p-6 ${large ? "lg:p-10" : ""}`}>
        <div className="flex items-center gap-2 text-[12.5px] text-ash">
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
          <span aria-hidden>·</span>
          <span>{post.read_minutes} min read</span>
        </div>
        <h3 className={`mt-3 font-display font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-brand ${large ? "text-2xl sm:text-3xl" : "text-[19px]"}`}>
          {post.title}
        </h3>
        <p className={`mt-3 text-graphite ${large ? "text-[15.5px] leading-relaxed" : "line-clamp-3 text-[14px] leading-relaxed"}`}>{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-brand">
          Read article
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
