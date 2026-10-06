"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { deleteTestimonial, saveTestimonial } from "@/app/admin/actions";
import { defaultPoster, parseVideoUrl, type Testimonial } from "@/lib/cms-types";
import { inputCls, labelCls } from "./ui";

export function TestimonialEditor({ item }: { item?: Testimonial }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [videoUrl, setVideoUrl] = useState(item?.video_url ?? "");
  const [posterUrl, setPosterUrl] = useState(item?.poster_url ?? "");

  const embed = videoUrl ? parseVideoUrl(videoUrl) : null;
  const preview = posterUrl || (embed ? defaultPoster(embed) : null);

  const save = (status: "draft" | "published") => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const fd = new FormData(form);
    fd.set("status", status);
    if (item) fd.set("id", item.id);
    setError(null);
    setSaved(false);
    start(async () => {
      const res = await saveTestimonial(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSaved(true);
      if (!item && res.id) router.replace(`/admin/testimonials/${res.id}`);
      router.refresh();
    });
  };

  const onDelete = () => {
    if (!item || !window.confirm(`Delete testimonial from "${item.person_name}"?`)) return;
    start(async () => {
      const res = await deleteTestimonial(item.id);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.replace("/admin/testimonials");
      router.refresh();
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        save(item?.status ?? "draft");
      }}
      className="grid gap-6 lg:grid-cols-[1fr_320px] animate-[fade-up_0.6s_var(--ease-out-expo)_both]"
    >
      <div className="space-y-5">
        <div className="card space-y-4 p-6">
          <p className="micro text-ash">Who is speaking</p>
          <div>
            <label htmlFor="person_name" className={labelCls}>
              Full name
            </label>
            <input id="person_name" name="person_name" required defaultValue={item?.person_name ?? ""} maxLength={120} className={`${inputCls} font-display text-[18px] font-semibold`} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="person_role" className={labelCls}>
                Role / designation
              </label>
              <input id="person_role" name="person_role" defaultValue={item?.person_role ?? ""} placeholder="Principal" maxLength={120} className={inputCls} />
            </div>
            <div>
              <label htmlFor="company" className={labelCls}>
                Company / association
              </label>
              <input id="company" name="company" defaultValue={item?.company ?? ""} placeholder="Greenfield Public School" maxLength={120} className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="quote" className={labelCls}>
              One-line caption <span className="font-normal text-ash">(optional, shown under the video)</span>
            </label>
            <input id="quote" name="quote" defaultValue={item?.quote ?? ""} maxLength={240} className={inputCls} />
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <p className="micro text-ash">Video</p>
          <div>
            <label htmlFor="video_url" className={labelCls}>
              Video link
            </label>
            <input id="video_url" name="video_url" required type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=… or https://…/clip.mp4" className={inputCls} />
            <p className="mt-1.5 text-[12px] text-ash">
              YouTube, Vimeo, Instagram reel or a direct .mp4 link (direct .mp4 autoplays silently inside the circle).
              {embed && <span className="ml-1 font-semibold text-brand">Detected: {embed.kind === "file" ? "direct video file" : embed.kind}</span>}
            </p>
          </div>
          <div>
            <label htmlFor="poster_url" className={labelCls}>
              Thumbnail image URL <span className="font-normal text-ash">(YouTube thumbnails are automatic; required for Instagram/Vimeo to show a face in the circle)</span>
            </label>
            <input id="poster_url" name="poster_url" type="url" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      <aside className="space-y-5">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="micro text-ash">Status</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${item?.status === "published" ? "bg-green/10 text-green" : "bg-accent-tint text-accent-deep"}`}>{item?.status ?? "new"}</span>
          </div>
          <div className="mt-4 grid gap-2">
            <button type="button" disabled={pending} onClick={() => save("published")} className="inline-flex h-11 items-center justify-center rounded-full bg-brand text-[13.5px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(29,78,216,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-deep disabled:opacity-60">
              {pending ? "Saving…" : item?.status === "published" ? "Update & keep live" : "Publish"}
            </button>
            <button type="button" disabled={pending} onClick={() => save("draft")} className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-paper text-[13.5px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-60">
              {item?.status === "published" ? "Unpublish to draft" : "Save draft"}
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-3 rounded-lg bg-accent-tint px-3 py-2 text-[12.5px] font-medium text-accent-deep">
              {error}
            </p>
          )}
          {saved && !error && <p className="mt-3 text-[12.5px] font-medium text-green">Saved.</p>}
          {item?.status === "published" && (
            <a href="/#testimonials" target="_blank" rel="noreferrer" className="mt-3 block text-[12.5px] font-semibold text-brand hover:underline">
              View on home page →
            </a>
          )}
        </div>

        <div className="card p-5">
          <label htmlFor="sort_order" className={labelCls}>
            Sort order <span className="font-normal text-ash">(lower shows first)</span>
          </label>
          <input id="sort_order" name="sort_order" type="number" min={0} max={999} defaultValue={item?.sort_order ?? 0} className={inputCls} />
        </div>

        <div className="card overflow-hidden">
          <p className="micro px-5 pt-4 text-ash">Card preview</p>
          <div className="mx-auto my-5 size-[180px] overflow-hidden rounded-full bg-navy ring-4 ring-brand/40">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-[12.5px] text-white/50">Thumbnail appears here</div>
            )}
          </div>
        </div>

        {item && (
          <button type="button" onClick={onDelete} disabled={pending} className="w-full text-[13px] font-semibold text-accent-deep hover:underline disabled:opacity-60">
            Delete testimonial
          </button>
        )}
      </aside>
    </form>
  );
}
