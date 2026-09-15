import type { ReactNode } from "react";

type Props = {
  label?: string;
  title: string[];
  accentLine?: number;
  accentColor?: "orange" | "purple";
  sub?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  children?: ReactNode;
};

export function Eyebrow({ label, tone = "light" }: { label: string; tone?: "light" | "dark" }) {
  return (
    <span className={`eyebrow-pill ${tone === "dark" ? "bg-white/10 text-white" : "bg-purple-tint text-purple"}`}>{label}</span>
  );
}

export function SectionHeader({ label, title, accentLine, accentColor = "orange", sub, align = "center", tone = "light", children }: Props) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
      {label && <Eyebrow label={label} tone={tone} />}
      <h2 className={`h-section ${dark ? "text-white" : "text-ink"} ${align === "center" ? "max-w-2xl" : "max-w-xl"}`}>
        {title.map((line, i) => (
          <span key={line} className={accentLine === i ? (accentColor === "purple" ? "text-purple" : "text-orange") : undefined}>
            {line}
            {i < title.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
      {sub && <p className={`lede max-w-xl ${dark ? "text-white/75" : ""}`}>{sub}</p>}
      {children}
    </div>
  );
}
