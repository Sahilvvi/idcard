import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "brand" | "ghost" | "inverse" | "outline-light";

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  arrow?: boolean;
};

const styles: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-deep shadow-[0_10px_24px_-10px_rgba(245,158,11,0.6)]",
  brand: "bg-brand text-white hover:bg-brand-deep shadow-[0_10px_24px_-10px_rgba(29,78,216,0.55)]",
  ghost: "bg-transparent text-brand border border-brand/30 hover:border-brand hover:bg-brand-tint",
  inverse: "bg-white text-navy hover:bg-white/90",
  "outline-light": "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10",
};

export function Button({ variant = "primary", arrow = true, className = "", children, ...rest }: Props) {
  return (
    <a
      className={`group relative inline-flex h-11 sm:h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold transition-[background-color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 ${styles[variant]} ${className}`}
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
