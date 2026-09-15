"use client";

import { useId, useState } from "react";
import { faqs } from "@/lib/content";
import { SectionHeader } from "./ui/SectionHeader";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" className="bg-cream py-16 sm:py-24">
      <div className="container-x">
        <SectionHeader title={["Frequently Asked", "Questions"]} accentLine={1} sub="Answers to the most common questions about our B2B printing ecosystem." />

        <ul className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:mt-14">
          {faqs.map((f, i) => {
            const on = open === i;
            const bid = `${base}-b-${i}`;
            const pid = `${base}-p-${i}`;
            return (
              <li key={f.q} className="card overflow-hidden">
                <h3>
                  <button
                    id={bid}
                    type="button"
                    aria-expanded={on}
                    aria-controls={pid}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left sm:px-6"
                  >
                    <span className={`font-display text-[15px] font-semibold sm:text-[16px] ${on ? "text-purple" : "text-ink"}`}>{f.q}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                      className={`shrink-0 text-ash transition-transform duration-300 ${on ? "rotate-180 text-purple" : ""}`}
                    >
                      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </h3>
                <div id={pid} role="region" aria-labelledby={bid} className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-expo)]" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14px] leading-relaxed text-graphite sm:px-6">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
