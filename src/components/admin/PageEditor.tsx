"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { deletePage, savePage } from "@/app/admin/actions";
import { Markdown } from "@/components/Markdown";
import { slugify, type Page } from "@/lib/cms-types";
import { inputCls, labelCls } from "./ui";

export function PageEditor({ page }: { page?: Page }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [title, setTitle] = useState(page?.title ?? "");
  const [slug, setSlug] = useState(page?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(page));
  const [content, setContent] = useState(page?.content ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");

  const save = (status: "draft" | "published") => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const fd = new FormData(form);
    fd.set("status", status);
    if (page) fd.set("id", page.id);
    setError(null);
    setSaved(false);
    start(async () => {
      const res = await savePage(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSaved(true);
      if (!page && res.id) router.replace(`/admin/pages/${res.id}`);
      router.refresh();
    });
  };

  const onDelete = () => {
    if (!page || !window.confirm(`Delete "${page.title}"?`)) return;
    start(async () => {
      const res = await deletePage(page.id);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.replace("/admin/pages");
      router.refresh();
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        save(page?.status ?? "draft");
      }}
      className="grid gap-6 lg:grid-cols-[1fr_320px] animate-[fade-up_0.6s_var(--ease-out-expo)_both]"
    >
      <div className="space-y-5">
        <div className="card space-y-4 p-6">
          <div>
            <label htmlFor="title" className={labelCls}>
              Page title
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
              className={`${inputCls} font-display text-[20px] font-semibold`}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="slug" className={labelCls}>
                URL slug
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-ash">/p/</span>
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
              <label htmlFor="description" className={labelCls}>
                SEO description
              </label>
              <input id="description" name="description" defaultValue={page?.description ?? ""} maxLength={300} className={inputCls} />
            </div>
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <p className="micro text-ash">Hero</p>
          <div className="grid gap-4 sm:grid-cols-[0.4fr_0.6fr]">
            <div>
              <label htmlFor="eyebrow" className={labelCls}>
                Eyebrow
              </label>
              <input id="eyebrow" name="eyebrow" defaultValue={page?.eyebrow ?? ""} placeholder="Legal" className={inputCls} />
            </div>
            <div>
              <label htmlFor="hero_title" className={labelCls}>
                Hero title <span className="font-normal text-ash">(defaults to page title)</span>
              </label>
              <input id="hero_title" name="hero_title" defaultValue={page?.hero_title ?? ""} className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="hero_sub" className={labelCls}>
              Hero subtitle
            </label>
            <input id="hero_sub" name="hero_sub" defaultValue={page?.hero_sub ?? ""} className={inputCls} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cta_label" className={labelCls}>
                CTA label
              </label>
              <input id="cta_label" name="cta_label" defaultValue={page?.cta_label ?? ""} placeholder="Talk to us" className={inputCls} />
            </div>
            <div>
              <label htmlFor="cta_href" className={labelCls}>
                CTA link
              </label>
              <input id="cta_href" name="cta_href" defaultValue={page?.cta_href ?? ""} placeholder="/contact" className={inputCls} />
            </div>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line-soft px-4">
            <div className="flex gap-1">
              {(["write", "preview"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setTab(t)} className={`relative px-3 py-3 text-[13px] font-semibold capitalize transition-colors ${tab === t ? "text-brand" : "text-graphite hover:text-ink"}`}>
                  {t}
                  {tab === t && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />}
                </button>
              ))}
            </div>
            <span className="text-[12px] text-ash">Markdown body</span>
          </div>
          {tab === "write" ? (
            <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} rows={18} className="w-full resize-y bg-paper px-5 py-4 font-mono text-[13.5px] leading-relaxed text-ink outline-none placeholder:text-ash" />
          ) : (
            <div className="min-h-[420px] px-6 py-6">
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
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${page?.status === "published" ? "bg-green/10 text-green" : "bg-accent-tint text-accent-deep"}`}>{page?.status ?? "new"}</span>
          </div>
          <div className="mt-4 grid gap-2">
            <button type="button" disabled={pending} onClick={() => save("published")} className="inline-flex h-11 items-center justify-center rounded-full bg-brand text-[13.5px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(29,78,216,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-deep disabled:opacity-60">
              {pending ? "Saving…" : page?.status === "published" ? "Update & keep live" : "Publish"}
            </button>
            <button type="button" disabled={pending} onClick={() => save("draft")} className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-paper text-[13.5px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-60">
              {page?.status === "published" ? "Unpublish to draft" : "Save draft"}
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-3 rounded-lg bg-accent-tint px-3 py-2 text-[12.5px] font-medium text-accent-deep">
              {error}
            </p>
          )}
          {saved && !error && <p className="mt-3 text-[12.5px] font-medium text-green">Saved.</p>}
          {page?.status === "published" && (
            <a href={`/p/${page.slug}`} target="_blank" rel="noreferrer" className="mt-3 block text-[12.5px] font-semibold text-brand hover:underline">
              View live page →
            </a>
          )}
        </div>
        <div className="card p-5">
          <label className="flex items-center gap-3 text-[13.5px] font-medium text-ink">
            <input type="checkbox" name="show_in_nav" defaultChecked={page?.show_in_nav ?? false} className="size-4 accent-brand" />
            Show in footer links
          </label>
        </div>
        {page && (
          <button type="button" onClick={onDelete} disabled={pending} className="w-full text-[13px] font-semibold text-accent-deep hover:underline disabled:opacity-60">
            Delete page
          </button>
        )}
      </aside>
    </form>
  );
}
