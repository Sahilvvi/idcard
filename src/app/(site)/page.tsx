import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";
import { EcosystemSection } from "@/components/EcosystemSection";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { PartnershipPaths } from "@/components/PartnershipPaths";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProofStats } from "@/components/ProofStats";
import { TrustMetrics } from "@/components/TrustMetrics";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <TrustMetrics />
      <PartnerMarquee />
      <EcosystemSection />
      <ProductCarousel />
      <PartnershipPaths />
      <ProofStats />
      <IndustrySolutions />
      <CTASection />
      <FAQ />
      <ContactForm />
    </main>
  );
}
