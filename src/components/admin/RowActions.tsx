"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { ActionResult } from "@/app/admin/actions";

type Action = { label: string; run: () => Promise<ActionResult>; confirm?: string; danger?: boolean };

export function RowActions({ actions, editHref }: { actions: Action[]; editHref?: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className={`flex items-center gap-3 ${pending ? "opacity-50" : ""}`}>
      {editHref && (
        <Link href={editHref} className="text-[12.5px] font-semibold text-brand hover:underline">
          Edit
        </Link>
      )}
      {actions.map((a) => (
        <button
          key={a.label}
          type="button"
          disabled={pending}
          onClick={() => {
            if (a.confirm && !window.confirm(a.confirm)) return;
            start(async () => {
              const res = await a.run();
              if (!res.ok) window.alert(res.error);
              router.refresh();
            });
          }}
          className={`text-[12.5px] font-semibold hover:underline ${a.danger ? "text-accent-deep" : "text-brand"}`}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
