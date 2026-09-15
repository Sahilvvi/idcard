import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "purple" | "ghost" | "inverse";

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  arrow?: boolean;
};

const styles: Record<Variant, string> = {
  primary: "bg-orange text-white hover:bg-orange-deep",
  purple: "bg-purple text-white hover:bg-purple-deep",
  ghost: "bg-transparent text-purple border border-purple/40 hover:border-purple hover:bg-purple-tint",
  inverse: "bg-white text-purple hover:bg-white/90",
};

export function Button({ variant = "primary", arrow = true, className = "", children, ...rest }: Props) {
  return (
    <a
      className={`group relative inline-flex h-11 sm:h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 ${styles[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
        >
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );
}
