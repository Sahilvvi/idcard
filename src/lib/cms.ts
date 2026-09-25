import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
export * from "./cms-types";
import type { Lead, Page, Post, Profile } from "./cms-types";

/* ---------- Public reads (anon-safe, RLS-filtered to published) ---------- */

export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createClient();
  let q = supabase.from("idm_posts").select("*").eq("status", "published").order("published_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data } = await q;
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("idm_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return (data as Post | null) ?? null;
}

export async function getPublishedPages(): Promise<Page[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("idm_pages").select("*").eq("status", "published").order("title");
  return (data ?? []) as Page[];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("idm_pages").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return (data as Page | null) ?? null;
}

/* ---------- Admin reads (require an idm_profiles row; RLS enforces) ---------- */

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("idm_profiles").select("*").eq("id", user.id).maybeSingle();
  return (data as Profile | null) ?? null;
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("idm_posts").select("*").order("updated_at", { ascending: false });
  return (data ?? []) as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("idm_posts").select("*").eq("id", id).maybeSingle();
  return (data as Post | null) ?? null;
}

export async function getAllPages(): Promise<Page[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("idm_pages").select("*").order("updated_at", { ascending: false });
  return (data ?? []) as Page[];
}

export async function getPageById(id: string): Promise<Page | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("idm_pages").select("*").eq("id", id).maybeSingle();
  return (data as Page | null) ?? null;
}

export async function getAllLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("idm_leads").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Lead[];
}
