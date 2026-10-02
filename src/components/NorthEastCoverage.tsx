import { northEast } from "@/lib/content";
import { OrderButton } from "./OrderModal";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

/* Equirectangular projection of lon 87.5–97.5°E, lat 21.5–29.5°N onto a 600×440 viewBox. */
const proj = (lon: number, lat: number) => [Math.round((lon - 87.5) * 56 + 20), Math.round((29.5 - lat) * 50 + 20)] as const;

/* Simplified outline of North Bengal + the North-East states (illustrative, not survey-accurate). */
const OUTLINE: [number, number][] = [
  [88.0, 26.3], [88.0, 27.1], [88.15, 28.05], [88.85, 27.95], [88.85, 27.1], [89.8, 26.75], [91.0, 26.8], [91.9, 26.85],
  [91.7, 27.75], [92.4, 28.2], [93.4, 28.65], [94.5, 29.2], [95.5, 29.3], [96.3, 29.1], [97.3, 28.2], [96.6, 27.35],
  [95.4, 26.85], [95.2, 26.6], [94.85, 25.6], [94.6, 25.0], [94.2, 24.05], [93.4, 23.9], [93.4, 23.0], [93.2, 22.2],
  [92.6, 21.95], [92.3, 22.9], [92.0, 23.6], [91.6, 22.95], [91.2, 23.4], [91.3, 24.1], [91.95, 24.35], [92.2, 24.9],
  [92.0, 25.15], [90.5, 25.2], [89.85, 25.3], [89.85, 26.0], [89.0, 26.05], [88.4, 25.95],
];

type City = { name: string; lon: number; lat: number; hub?: boolean; dx?: number; dy?: number; anchor?: "start" | "end" | "middle" };

const CITIES: City[] = [
  { name: "Siliguri", lon: 88.43, lat: 26.73, hub: true, dx: -10, dy: 26, anchor: "middle" },
  { name: "Gangtok", lon: 88.61, lat: 27.33, dx: 10, dy: -8, anchor: "start" },
  { name: "Guwahati", lon: 91.74, lat: 26.14, hub: true, dx: -4, dy: 28, anchor: "middle" },
  { name: "Shillong", lon: 91.88, lat: 25.57, dx: -12, dy: 16, anchor: "end" },
  { name: "Tezpur", lon: 92.8, lat: 26.63, dx: 0, dy: -12, anchor: "middle" },
  { name: "Itanagar", lon: 93.62, lat: 27.08, dx: 0, dy: -12, anchor: "middle" },
  { name: "Dibrugarh", lon: 94.91, lat: 27.47, dx: 10, dy: 4, anchor: "start" },
  { name: "Kohima", lon: 94.11, lat: 25.67, dx: 10, dy: 4, anchor: "start" },
  { name: "Imphal", lon: 93.94, lat: 24.82, dx: 10, dy: 4, anchor: "start" },
  { name: "Silchar", lon: 92.8, lat: 24.83, dx: -10, dy: 4, anchor: "end" },
  { name: "Aizawl", lon: 92.72, lat: 23.73, dx: 10, dy: 4, anchor: "start" },
  { name: "Agartala", lon: 91.28, lat: 23.83, dx: -10, dy: 4, anchor: "end" },
];

const STATE_LABELS: { name: string; lon: number; lat: number }[] = [
  { name: "SIKKIM", lon: 88.5, lat: 27.8 },
  { name: "ASSAM", lon: 93.3, lat: 26.25 },
  { name: "ARUNACHAL PRADESH", lon: 94.6, lat: 28.2 },
  { name: "MEGHALAYA", lon: 90.75, lat: 25.4 },
  { name: "NAGALAND", lon: 94.5, lat: 26.15 },
  { name: "MANIPUR", lon: 93.75, lat: 24.4 },
  { name: "MIZORAM", lon: 92.85, lat: 23.05 },
  { name: "TRIPURA", lon: 91.55, lat: 23.25 },
];

function Map() {
  const outline = OUTLINE.map(([lon, lat]) => proj(lon, lat).join(",")).join(" ");
  const [sx, sy] = proj(88.43, 26.73);
  const [gx, gy] = proj(91.74, 26.14);
  const route = (x: number, y: number, fx: number, fy: number) => `M${fx} ${fy} Q${(fx + x) / 2} ${Math.min(fy, y) - 40} ${x} ${y}`;

  return (
    <svg viewBox="0 0 600 440" className="h-auto w-full" role="img" aria-label="Map of iDM coverage across North Bengal and the North-East Indian states, with hubs in Siliguri and Guwahati">
      <defs>
        <pattern id="ne-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.6" fill="#5b8cff" opacity="0.55" />
        </pattern>
        <clipPath id="ne-clip">
          <polygon points={outline} />
        </clipPath>
        <radialGradient id="ne-glow">
          <stop offset="0" stopColor="#f59e0b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      <polygon points={outline} fill="#112a5c" opacity="0.65" />
      <rect width="600" height="440" fill="url(#ne-dots)" clipPath="url(#ne-clip)" />
      <polygon points={outline} fill="none" stroke="#5b8cff" strokeOpacity="0.5" strokeWidth="1.4" strokeLinejoin="round" />

      {STATE_LABELS.map((s) => {
        const [x, y] = proj(s.lon, s.lat);
        return (
          <text key={s.name} x={x} y={y} textAnchor="middle" fontSize="9.5" letterSpacing="1.6" fontWeight="600" fill="#ffffff" opacity="0.35">
            {s.name}
          </text>
        );
      })}

      {/* Routes from the hubs */}
      {CITIES.filter((c) => !c.hub).map((c, i) => {
        const [x, y] = proj(c.lon, c.lat);
        const fromSiliguri = c.lon < 90;
        const [fx, fy] = fromSiliguri ? [sx, sy] : [gx, gy];
        return (
          <path
            key={c.name}
            d={route(x, y, fx, fy)}
            fill="none"
            stroke="#0ea5a4"
            strokeWidth="1.6"
            strokeDasharray="5 6"
            strokeLinecap="round"
            className="ne-route"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        );
      })}
      {/* Trunk route Siliguri → Guwahati */}
      <path d={route(gx, gy, sx, sy)} fill="none" stroke="#f59e0b" strokeWidth="2.6" strokeDasharray="8 7" strokeLinecap="round" className="ne-route" />

      {CITIES.map((c) => {
        const [x, y] = proj(c.lon, c.lat);
        return (
          <g key={c.name}>
            {c.hub ? (
              <>
                <circle cx={x} cy={y} r="34" fill="url(#ne-glow)" />
                <circle cx={x} cy={y} r="10" fill="none" stroke="#f59e0b" strokeWidth="2" className="ne-pulse" style={{ transformOrigin: `${x}px ${y}px` }} />
                <circle cx={x} cy={y} r="7.5" fill="#f59e0b" stroke="#0a1a3a" strokeWidth="2.5" />
              </>
            ) : (
              <circle cx={x} cy={y} r="4.5" fill="#ffffff" stroke="#0ea5a4" strokeWidth="2.5" />
            )}
            <text
              x={x + (c.dx ?? 8)}
              y={y + (c.dy ?? 4)}
              textAnchor={c.anchor ?? "start"}
              fontSize={c.hub ? 15 : 12}
              fontWeight={c.hub ? 800 : 600}
              fill={c.hub ? "#fbbf24" : "#ffffff"}
              paintOrder="stroke"
              stroke="#0a1a3a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            >
              {c.name}
            </text>
          </g>
        );
      })}

      <style>{`
        @keyframes ne-dash{to{stroke-dashoffset:-44}}
        @keyframes ne-pulse{0%{transform:scale(1);opacity:.9}100%{transform:scale(3.2);opacity:0}}
        .ne-route{animation:ne-dash 1.6s linear infinite}
        .ne-pulse{animation:ne-pulse 2.2s ease-out infinite}
        @media (prefers-reduced-motion: reduce){.ne-route,.ne-pulse{animation:none}}
      `}</style>
    </svg>
  );
}

export function NorthEastCoverage() {
  return (
    <section id="north-east" className="relative overflow-hidden bg-navy py-16 text-white sm:py-24" aria-label="North-East India coverage">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 size-[420px] rounded-full bg-brand/35 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 size-[340px] rounded-full bg-accent/15 blur-[140px]" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal x={-24}>
          <SectionHeader align="left" tone="dark" label={northEast.label} title={northEast.title} accentLine={1} sub={northEast.sub} />

          <dl className="mt-8 grid grid-cols-3 gap-3">
            {northEast.stats.map((s) => (
              <div key={s.label} className="glass p-4">
                <dd className="font-display text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-none text-accent">{s.value}</dd>
                <dt className="mt-2 text-[12px] leading-snug text-white/65">{s.label}</dt>
              </div>
            ))}
          </dl>

          <ul className="mt-6 space-y-2.5">
            {northEast.hubs.map((h) => (
              <li key={h.name} className="flex items-center gap-3 text-[14.5px]">
                <span className="grid size-6 place-items-center rounded-full bg-accent/20">
                  <span className="size-2.5 rounded-full bg-accent" />
                </span>
                <span className="font-semibold">{h.name}</span>
                <span className="text-white/55">· {h.note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <OrderButton
              requirement="Finished ID Cards"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[14px] font-semibold text-ink shadow-[0_10px_24px_-10px_rgba(245,158,11,0.6)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-accent-deep"
            >
              Order for the North-East
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </OrderButton>
          </div>
        </Reveal>

        <Reveal x={24} delay={120}>
          <div className="relative rounded-[28px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm sm:p-6">
            <Map />
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 px-2 text-[12px] text-white/60">
              <span className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-accent" /> Production hub
              </span>
              <span className="flex items-center gap-2">
                <span className="size-3 rounded-full border-2 border-teal bg-white" /> Delivery city
              </span>
              <span className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[repeating-linear-gradient(90deg,#0ea5a4_0_4px,transparent_4px_8px)]" /> Dispatch route
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
