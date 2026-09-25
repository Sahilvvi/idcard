"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { authFieldCls } from "./AuthShell";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabaseConfigured) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const fullName = String(fd.get("full_name") ?? "").trim();
    setPending(true);
    setError(null);
    const supabase = createClient();

    if (mode === "signup") {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        setPending(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { app: "idm", full_name: fullName } },
      });
      if (error) {
        setError(error.message);
        setPending(false);
        return;
      }
      if (!data.session) {
        setError("Check your inbox to confirm your email, then sign in.");
        setPending(false);
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message === "Invalid login credentials" ? "Incorrect email or password." : error.message);
        setPending(false);
        return;
      }
    }
    const next = params.get("next");
    router.replace(next && next.startsWith("/admin") ? next : "/admin");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <label htmlFor="full_name" className="mb-1.5 block text-[13px] font-semibold text-ink">
            Full name
          </label>
          <input id="full_name" name="full_name" required autoComplete="name" placeholder="Your name" className={authFieldCls} />
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-ink">
          Work email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@idm.in" className={authFieldCls} />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="text-[13px] font-semibold text-ink">
            Password
          </label>
          <button type="button" onClick={() => setShowPw((v) => !v)} className="text-[12px] font-medium text-brand hover:underline">
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        <input
          id="password"
          name="password"
          type={showPw ? "text" : "password"}
          required
          minLength={mode === "signup" ? 8 : undefined}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
          className={authFieldCls}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-accent/30 bg-accent-tint px-4 py-3 text-[13px] font-medium text-accent-deep">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[14.5px] font-semibold text-white shadow-[0_16px_30px_-14px_rgba(29,78,216,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-deep disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {pending ? (mode === "signup" ? "Creating account…" : "Signing in…") : mode === "signup" ? "Create account" : "Sign in"}
        <span aria-hidden className={pending ? "animate-spin" : ""}>
          {pending ? "◌" : "→"}
        </span>
      </button>
    </form>
  );
}
