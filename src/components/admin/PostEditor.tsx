"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { deletePost, savePost } from "@/app/admin/actions";
import { Markdown } from "@/components/Markdown";
import { BLOG_CATEGORIES, slugify, type Post } from "@/lib/cms-types";
import { inputCls, labelCls } from "./ui";

export function PostEditor({ post }: { post?: Post }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [content, setContent] = useState(post?.content ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [cover, setCover] = useState(post?.cover_image ?? "");

  const save = (status: "draft" | "published") => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const fd = new FormData(form);
    fd.set("status", status);
    if (post) fd.set("id", post.id);
    setError(null);
    setSaved(false);
    start(async () => {
      const res = await savePost(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSaved(true);
      if (!post && res.id) router.replace(`/admin/blog/${res.id}`);
      router.refresh();
    });
  };

  const onDelete = () => {
    if (!post || !window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    start(async () => {
      const res = await deletePost(post.id);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.replace("/admin/blog");
      router.refresh();
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        save(post?.status ?? "draft");
      }}
      className="grid gap-6 lg:grid-cols-[1fr_320px] animate-[fade-up_0.6s_var(--ease-out-expo)_both]"
    >
      <div className="space-y-5">
        <div className="card p-6">
          <label htmlFor="title" className={labelCls}>
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            placeholder="A clear, benefit-led headline"
            className={`${inputCls} font-display text-[20px] font-semibold`}
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="slug" className={labelCls}>
                URL slug
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-ash">/blog/</span>
                <input
                  id="slug"
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(e.target.value);
                  }}
                  onBlur={() => setSlug(slugify(slug))}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label htmlFor="excerpt" className={labelCls}>
                Excerpt
              </label>
              <input id="excerpt" name="excerpt" defaultValue={post?.excerpt ?? ""} maxLength={300} placeholder="One or two sentences shown on cards" className={inputCls} />
            </div>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line-soft px-4">
            <div className="flex gap-1">
              {(["write", "preview"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`relative px-3 py-3 text-[13px] font-semibold capitalize transition-colors ${tab === t ? "text-brand" : "text-graphite hover:text-ink"}`}
                >
                  {t}
                  {tab === t && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />}
                </button>
              ))}
            </div>
            <span className="text-[12px] text-ash">Markdown · {content.trim().split(/\s+/).filter(Boolean).length} words</span>
          </div>
          {tab === "write" ? (
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={22}
              placeholder={"## Heading\n\nWrite your article in Markdown. Use **bold**, lists, > quotes, tables and [links](https://...)."}
              className="w-full resize-y bg-paper px-5 py-4 font-mono text-[13.5px] leading-relaxed text-ink outline-none placeholder:text-ash"
            />
          ) : (
            <div className="min-h-[520px] px-6 py-6">
              <input type="hidden" name="content" value={content} />
              {content.trim() ? <Markdown content={content} /> : <p className="text-[14px] text-ash">Nothing to preview yet.</p>}
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-5">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="micro text-ash">Status</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${post?.status === "published" ? "bg-green/10 text-green" : "bg-accent-tint text-accent-deep"}`}>
              {post?.status ?? "new"}
            </span>
          </div>
          <div className="mt-4 grid gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => save("published")}
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand text-[13.5px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(29,78,216,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-deep disabled:opacity-60"
            >
              {pending ? "Saving…" : post?.status === "published" ? "Update & keep live" : "Publish"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => save("draft")}
              className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-paper text-[13.5px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
            >
              {post?.status === "published" ? "Unpublish to draft" : "Save draft"}
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-3 rounded-lg bg-accent-tint px-3 py-2 text-[12.5px] font-medium text-accent-deep">
              {error}
            </p>
          )}
          {saved && !error && <p className="mt-3 text-[12.5px] font-medium text-green">Saved.</p>}
          {post?.status === "published" && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="mt-3 block text-[12.5px] font-semibold text-brand hover:underline">
              View live article →
            </a>
          )}
        </div>

        <div className="card space-y-4 p-5">
          <div>
            <label htmlFor="category" className={labelCls}>
              Category
            </label>
            <select id="category" name="category" defaultValue={post?.category ?? "Guides"} className={inputCls}>
              {BLOG_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tags" className={labelCls}>
              Tags <span className="font-normal text-ash">(comma separated)</span>
            </label>
            <input id="tags" name="tags" defaultValue={post?.tags.join(", ") ?? ""} placeholder="schools, pvc, bulk" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="author_name" className={labelCls}>
                Author
              </label>
              <input id="author_name" name="author_name" defaultValue={post?.author_name ?? "iDM Team"} className={inputCls} />
            </div>
            <div>
              <label htmlFor="read_minutes" className={labelCls}>
                Read (min)
              </label>
              <input id="read_minutes" name="read_minutes" type="number" min={1} max={60} defaultValue={post?.read_minutes ?? 5} className={inputCls} />
            </div>
          </div>
          <label className="flex items-center gap-3 text-[13.5px] font-medium text-ink">
            <input type="checkbox" name="featured" defaultChecked={post?.featured ?? false} className="size-4 accent-brand" />
            Feature on blog homepage
          </label>
        </div>

        <div className="card p-5">
          <label htmlFor="cover_image" className={labelCls}>
            Cover image URL
          </label>
          <input id="cover_image" name="cover_image" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="/illustrations/… or https://…" className={inputCls} />
          {cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="mt-3 aspect-[16/10] w-full rounded-xl object-cover" />
          )}
        </div>

        {post && (
          <button type="button" onClick={onDelete} disabled={pending} className="w-full text-[13px] font-semibold text-accent-deep hover:underline disabled:opacity-60">
            Delete article
          </button>
        )}
      </aside>
    </form>
  );
}
