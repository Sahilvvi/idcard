import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";
import { EcosystemSection } from "@/components/EcosystemSection";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { NorthEastCoverage } from "@/components/NorthEastCoverage";
import { PartnershipPaths } from "@/components/PartnershipPaths";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProofStats } from "@/components/ProofStats";
import { TrustMetrics } from "@/components/TrustMetrics";
import { VideoTestimonials } from "@/components/VideoTestimonials";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <TrustMetrics />
      <NorthEastCoverage />
      <EcosystemSection />
      <ProductCarousel />
      <PartnershipPaths />
      <ProofStats />
      <IndustrySolutions />
      <CTASection />
      <VideoTestimonials />
      <FAQ />
      <ContactForm />
    </main>
  );
}
