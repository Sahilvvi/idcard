import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About iDM — India's B2B ID Card Printing Ecosystem",
  description:
    "iDM combines quality-checked raw materials, in-house order software and a pan-India production network to make bulk ID card printing fast, predictable and error-free.",
};

const stats = [
  { value: "2019", label: "Founded in Siliguri" },
  { value: "50+", label: "Cities served" },
  { value: "500+", label: "Partner vendors & institutions" },
  { value: "1M+", label: "Cards printed & QC-scanned" },
];

const values = [
  {
    title: "Speed you can plan around",
    body: "Every order gets a committed dispatch date at proof approval. Our plants are scheduled, not queued.",
    icon: "M13 3 4 14h7l-1 7 9-11h-7l1-7Z",
  },
  {
    title: "Quality by process, not luck",
    body: "Standard materials, standard printers, standard QC scans. The 1,000th card matches the first.",
    icon: "M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Zm-3 9 2 2 4-4",
  },
  {
    title: "Transparent pricing",
    body: "Centralised, published partner rates on sheets, lanyards and accessories. No local-supplier markups.",
    icon: "M4 7h16M4 12h16M4 17h10",
  },
  {
    title: "Technology first",
    body: "Our own platform validates data, tracks production and updates customers — so people spend time on craft, not chasing.",
    icon: "M4 6h16v10H4zM8 20h8M12 16v4",
  },
];

const milestones = [
  { year: "2019", title: "First plant in Siliguri", body: "Started as a single-line PVC card unit serving schools across North Bengal." },
  { year: "2020", title: "Order software goes live", body: "Built our own upload-and-validate tool after seeing 30% of reprints came from bad data." },
  { year: "2021", title: "Raw material supply", body: "Opened the first partner warehouse so vendors could buy quality-checked sheets at one price." },
  { year: "2023", title: "Pan-India partner network", body: "Crossed 300 production and channel partners; launched the partner mobile app." },
  { year: "2025", title: "1 million cards", body: "One million QC-scanned cards delivered across 50+ cities — and counting." },
];

const process = [
  { step: "01", title: "Source", body: "Quality-checked PVC, NTR, lanyard rolls and accessories from audited suppliers.", asset: "/assets/raw-materials.webp" },
  { step: "02", title: "Validate", body: "Uploaded data and photos are checked automatically before a single card is printed.", asset: "/assets/software-platform.webp" },
  { step: "03", title: "Produce", body: "Scheduled printing across partner plants with standard machines and consumables.", asset: "/assets/production-floor.webp" },
  { step: "04", title: "Deliver", body: "Scanned, packed by batch and tracked to your door with a live status link.", asset: "/assets/warehouse.webp" },
];

const team = [
  { name: "Leadership", role: "Founders & operations", body: "Printers by trade, engineers by habit. The founding team still signs off on plant QC standards." },
  { name: "Technology", role: "Platform & mobile", body: "An in-house team that ships the order platform, validation engine and partner app." },
  { name: "Partner success", role: "Vendors & institutions", body: "Regional managers who onboard partners, run training and stay on the phone during peak season." },
];

export default function AboutPage() {
  return (
    <main>
      {/* 1. Hero */}
      <PageHero
        eyebrow="About iDM"
        title={
          <>
            We built the <span className="text-brand">infrastructure</span> behind India&apos;s ID card printing
          </>
        }
        sub="iDM is a technology-driven B2B printing ecosystem: quality-checked materials, our own order software and a nationwide production network — run from Siliguri, West Bengal."
      >
        <dl className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="card px-4 py-5 text-center animate-[fade-up_0.7s_var(--ease-out-expo)_both]"
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              <dd className="font-display text-3xl font-bold tracking-tight text-gradient">{s.value}</dd>
              <dt className="micro mt-2 text-ash">{s.label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* 2. Story */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal x={-24}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(10,26,58,0.5)]">
                <AssetImage src="/assets/production-floor.webp" alt="iDM production floor in Siliguri with card printers and QC stations" sizes="(min-width:1024px) 45vw, 100vw" />
              </div>
              <div className="card absolute -bottom-6 -right-4 max-w-[240px] p-5 animate-[float-y_7s_ease-in-out_infinite] sm:-right-8">
                <p className="micro text-ash">Why we started</p>
                <p className="mt-2 text-[14px] leading-snug text-ink">
                  &ldquo;Every school we met had the same three problems: late cards, wrong names, and no one to call.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal x={24} delay={100}>
            <SectionHeader align="left" label="Our story" title={["From one plant in Siliguri", "to a national network"]} accentLine={1} />
            <div className="mt-6 space-y-4 text-[16px] leading-[1.8] text-graphite">
              <p>
                iDM began in 2019 as a small PVC card unit printing for schools across North Bengal. We printed well — but our customers still
                struggled with data collection, reprints and delivery. So we built software to fix data before printing, opened a warehouse to fix
                material quality, and partnered with vendors across India to fix delivery.
              </p>
              <p>
                Today iDM operates as an ecosystem. Institutions get one accountable partner. Print vendors get materials, orders and software.
                And every card — over a million so far — is scanned against its data sheet before it ships.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="brand">
                Talk to our team
              </Button>
              <Button href="/#ecosystem" variant="ghost" arrow={false}>
                Explore the ecosystem
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Values */}
      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none absolute -left-32 top-0 size-[420px] rounded-full bg-brand/40 blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 size-[380px] rounded-full bg-teal/25 blur-[140px]" />
        <div className="container-x relative">
          <SectionHeader tone="dark" label="What we stand for" title={["Principles that run", "every plant and every order"]} accentLine={1} sub="Four commitments our partners and customers can hold us to." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} y={24}>
                <div className="glass group h-full p-6 transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-white/10">
                  <span className="icon-badge bg-accent/15 text-accent transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d={v.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-[18px] font-semibold">{v.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-x">
          <SectionHeader label="How iDM works" title={["Material → Data → Production → Delivery,", "under one roof"]} accentLine={1} sub="Every order moves through the same four stages, tracked in one dashboard." />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100} y={28}>
                <li className="card group relative h-full overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <AssetImage src={p.asset} alt={p.title} className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
                    <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-xl bg-white/90 font-display text-[13px] font-bold text-brand shadow-sm backdrop-blur">
                      {p.step}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[18px] font-semibold text-ink">{p.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-graphite">{p.body}</p>
                  </div>
                  {i < process.length - 1 && (
                    <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand lg:grid">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Timeline */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal x={-20}>
            <SectionHeader align="left" label="Our journey" title={["Six years,", "one obsession: error-free cards"]} accentLine={1} />
            <p className="lede mt-6">
              Each milestone came from a problem a customer brought us. That is still how we decide what to build next.
            </p>
            <div className="mt-8">
              <Button href="/blog" variant="ghost">
                Read our stories
              </Button>
            </div>
          </Reveal>
          <ol className="relative border-l-2 border-line pl-8 sm:pl-10">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 90} y={20}>
                <li className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border-2 border-brand bg-white sm:-left-[49px]">
                    <span className="size-2 rounded-full bg-brand animate-[pulse-soft_3s_ease-in-out_infinite]" />
                  </span>
                  <p className="micro text-accent-deep">{m.year}</p>
                  <h3 className="mt-1.5 font-display text-[20px] font-semibold text-ink">{m.title}</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-graphite">{m.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Team + HQ */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-x">
          <SectionHeader label="People & place" title={["Run by printers and engineers,", `headquartered in ${site.location.split(",")[0]}`]} accentLine={1} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 90} y={24}>
                <div className="card h-full p-7 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1">
                  <p className="micro text-brand">{t.role}</p>
                  <h3 className="mt-2 font-display text-[22px] font-semibold text-ink">{t.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-graphite">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal y={30} delay={150} className="mt-6">
            <div className="relative overflow-hidden rounded-[28px] bg-navy text-white">
              <div className="grid lg:grid-cols-2">
                <div className="relative p-8 sm:p-12">
                  <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_left,#000_20%,transparent_75%)]" />
                  <div className="relative">
                    <p className="micro text-accent">Headquarters</p>
                    <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">Siliguri, West Bengal</h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
                      The gateway to North-East India. Our plant and warehouse sit on {site.address[0].replace(",", "")}, with dispatch links to Kolkata,
                      Guwahati and the rest of the country within 24 hours.
                    </p>
                    <address className="mt-6 text-[14.5px] not-italic leading-relaxed text-white/80">
                      {site.address.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                    <div className="mt-8">
                      <Button href="/contact" variant="primary">
                        Visit or call us
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[280px]">
                  <iframe
                    title="iDM headquarters map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full grayscale-[0.3] contrast-[1.05]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PartnerMarquee />
      <CTASection />
    </main>
  );
}
