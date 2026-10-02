import { Footer } from "@/components/Footer";
import { LeadPopup } from "@/components/LeadPopup";
import { Navbar } from "@/components/Navbar";
import { OrderModal } from "@/components/OrderModal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <LeadPopup />
      <OrderModal />
    </>
  );
}
