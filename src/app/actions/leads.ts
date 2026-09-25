"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

export type LeadInput = {
  name: string;
  email?: string;
  phone?: string;
  business?: string;
  interest?: string;
  message?: string;
  source: string;
  pagePath?: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

const clean = (v: string | undefined, max = 500) => {
  const s = (v ?? "").toString().trim();
  return s ? s.slice(0, max) : null;
};

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const name = clean(input.name, 200);
  if (!name) return { ok: false, error: "Please enter your name." };
  const email = clean(input.email, 200);
  const phone = clean(input.phone, 40);
  if (!email && !phone) return { ok: false, error: "Add a phone number or email so we can reach you." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "That email address doesn't look right." };

  if (!supabaseConfigured) {
    console.warn("[leads] Supabase not configured; lead dropped", { name, email, phone });
    return { ok: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("idm_leads").insert({
    name,
    email,
    phone,
    business: clean(input.business, 200),
    interest: clean(input.interest, 120),
    message: clean(input.message, 4000),
    source: clean(input.source, 60) ?? "website",
    page_path: clean(input.pagePath, 200),
  });
  if (error) {
    console.error("[leads] insert failed", error.message);
    return { ok: false, error: "Something went wrong. Please call us or try again." };
  }
  return { ok: true };
}

export async function submitLeadForm(formData: FormData): Promise<LeadResult> {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : undefined;
  };
  return submitLead({
    name: get("name") ?? "",
    email: get("email"),
    phone: get("phone"),
    business: get("business"),
    interest: get("interest"),
    message: get("message"),
    source: get("source") ?? "website",
    pagePath: get("pagePath"),
  });
}
