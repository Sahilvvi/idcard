"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BLOG_CATEGORIES, slugify, type LeadStatus, type PostStatus } from "@/lib/cms";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("idm_profiles").select("id").eq("id", user.id).maybeSingle();
  if (!profile) redirect("/admin/no-access");
  return { supabase, user };
}

const str = (fd: FormData, k: string, max = 10000) => String(fd.get(k) ?? "").trim().slice(0, max);
const bool = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ---------------- Posts ---------------- */

export async function savePost(formData: FormData): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title", 200);
  if (!title) return { ok: false, error: "Title is required." };
  const slug = slugify(str(formData, "slug", 120) || title);
  if (!slug) return { ok: false, error: "Slug is required." };
  const status = (str(formData, "status") === "published" ? "published" : "draft") as PostStatus;
  const category = BLOG_CATEGORIES.includes(str(formData, "category") as (typeof BLOG_CATEGORIES)[number]) ? str(formData, "category") : "Insights";

  const row = {
    slug,
    title,
    excerpt: str(formData, "excerpt", 500),
    content: str(formData, "content", 100000),
    cover_image: str(formData, "cover_image", 500) || null,
    category,
    tags: str(formData, "tags", 500)
      .split(",")
      .map((t) => slugify(t))
      .filter(Boolean),
    author_name: str(formData, "author_name", 100) || "iDM Team",
    read_minutes: Math.max(1, Math.min(60, Number(str(formData, "read_minutes")) || 5)),
    featured: bool(formData, "featured"),
    status,
  };

  let savedId = id;
  if (id) {
    const { data: existing } = await supabase.from("idm_posts").select("published_at").eq("id", id).maybeSingle();
    const published_at = status === "published" ? (existing?.published_at ?? new Date().toISOString()) : existing?.published_at ?? null;
    const { error } = await supabase.from("idm_posts").update({ ...row, published_at }).eq("id", id);
    if (error) return { ok: false, error: friendly(error.message) };
  } else {
    const { data, error } = await supabase
      .from("idm_posts")
      .insert({ ...row, published_at: status === "published" ? new Date().toISOString() : null, created_by: user.id })
      .select("id")
      .single();
    if (error) return { ok: false, error: friendly(error.message) };
    savedId = data.id;
  }
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  return { ok: true, id: savedId };
}

export async function deletePost(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("idm_posts").delete().eq("id", id);
  if (error) return { ok: false, error: friendly(error.message) };
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { ok: true };
}

export async function setPostStatus(id: string, status: PostStatus): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const patch: { status: PostStatus; published_at?: string } = { status };
  if (status === "published") {
    const { data } = await supabase.from("idm_posts").select("published_at").eq("id", id).maybeSingle();
    if (!data?.published_at) patch.published_at = new Date().toISOString();
  }
  const { error } = await supabase.from("idm_posts").update(patch).eq("id", id);
  if (error) return { ok: false, error: friendly(error.message) };
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { ok: true };
}

/* ---------------- Pages ---------------- */

export async function savePage(formData: FormData): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title", 200);
  if (!title) return { ok: false, error: "Title is required." };
  const slug = slugify(str(formData, "slug", 120) || title);
  if (!slug) return { ok: false, error: "Slug is required." };

  const row = {
    slug,
    title,
    description: str(formData, "description", 300),
    eyebrow: str(formData, "eyebrow", 60),
    hero_title: str(formData, "hero_title", 200),
    hero_sub: str(formData, "hero_sub", 400),
    content: str(formData, "content", 100000),
    cta_label: str(formData, "cta_label", 60),
    cta_href: str(formData, "cta_href", 300),
    show_in_nav: bool(formData, "show_in_nav"),
    status: (str(formData, "status") === "published" ? "published" : "draft") as PostStatus,
  };

  let savedId = id;
  if (id) {
    const { error } = await supabase.from("idm_pages").update(row).eq("id", id);
    if (error) return { ok: false, error: friendly(error.message) };
  } else {
    const { data, error } = await supabase.from("idm_pages").insert(row).select("id").single();
    if (error) return { ok: false, error: friendly(error.message) };
    savedId = data.id;
  }
  revalidatePath(`/p/${slug}`);
  revalidatePath("/admin/pages");
  return { ok: true, id: savedId };
}

export async function deletePage(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("idm_pages").delete().eq("id", id);
  if (error) return { ok: false, error: friendly(error.message) };
  revalidatePath("/admin/pages");
  return { ok: true };
}

/* ---------------- Leads ---------------- */

const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "closed"];

export async function updateLead(id: string, patch: { status?: string; notes?: string }): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const row: { status?: LeadStatus; notes?: string } = {};
  if (patch.status && LEAD_STATUSES.includes(patch.status as LeadStatus)) row.status = patch.status as LeadStatus;
  if (typeof patch.notes === "string") row.notes = patch.notes.slice(0, 4000);
  const { error } = await supabase.from("idm_leads").update(row).eq("id", id);
  if (error) return { ok: false, error: friendly(error.message) };
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteLead(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("idm_leads").delete().eq("id", id);
  if (error) return { ok: false, error: friendly(error.message) };
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { ok: true };
}

function friendly(msg: string) {
  if (/duplicate key/.test(msg)) return "That slug is already in use. Choose another.";
  if (/row-level security/.test(msg)) return "You don't have permission to do that.";
  return msg;
}
