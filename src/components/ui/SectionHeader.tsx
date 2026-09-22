import type { ReactNode } from "react";

type Props = {
  label?: string;
  title: string[];
  accentLine?: number;
  accentColor?: "accent" | "brand" | "gradient";
  sub?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  children?: ReactNode;
};

export function Eyebrow({ label, tone = "light" }: { label: string; tone?: "light" | "dark" }) {
  return (
    <span className={`eyebrow-pill ${tone === "dark" ? "border border-white/15 bg-white/10 text-white" : "border border-brand/15 bg-brand-tint text-brand"}`}>
      <span className={`size-1.5 rounded-full ${tone === "dark" ? "bg-accent" : "bg-brand"}`} />
      {label}
    </span>
  );
}

const accentCls: Record<NonNullable<Props["accentColor"]>, string> = {
  accent: "text-accent",
  brand: "text-brand",
  gradient: "text-gradient",
};

export function SectionHeader({ label, title, accentLine, accentColor = "brand", sub, align = "center", tone = "light", children }: Props) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
      {label && <Eyebrow label={label} tone={tone} />}
      <h2 className={`h-section ${dark ? "text-white" : "text-ink"} ${align === "center" ? "max-w-3xl" : "max-w-xl"}`}>
        {title.map((line, i) => (
          <span key={line} className={accentLine === i ? (dark && accentColor === "brand" ? "text-accent" : accentCls[accentColor]) : undefined}>
            {line}
            {i < title.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
      {sub && <p className={`lede max-w-2xl ${dark ? "!text-white/70" : ""}`}>{sub}</p>}
      {children}
    </div>
  );
}
