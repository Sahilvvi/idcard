"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitLead } from "@/app/actions/leads";

export function NewsletterForm({ source = "newsletter" }: { source?: string }) {
  const [state, setState] = useState<{ kind: "idle" } | { kind: "ok" } | { kind: "err"; msg: string }>({ kind: "idle" });
  const [pending, start] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "");
    start(async () => {
      const res = await submitLead({ name: email.split("@")[0] || "Subscriber", email, source, interest: "Newsletter", pagePath: window.location.pathname });
      if (res.ok) {
        setState({ kind: "ok" });
        form.reset();
      } else setState({ kind: "err", msg: res.error });
    });
  };

  if (state.kind === "ok") {
    return (
      <p className="flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-4 text-[14.5px] font-medium text-white">
        <span className="grid size-6 place-items-center rounded-full bg-teal text-white">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        You&apos;re on the list. Expect one useful email a month.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        className="h-12 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-[14.5px] text-white outline-none placeholder:text-white/40 focus:border-accent focus:ring-4 focus:ring-accent/20"
      />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-[14px] font-semibold text-ink transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-accent-deep disabled:opacity-60"
      >
        {pending ? "Subscribing…" : "Subscribe"}
      </button>
      {state.kind === "err" && <p className="text-[13px] text-accent sm:absolute sm:mt-14">{state.msg}</p>}
    </form>
  );
}
