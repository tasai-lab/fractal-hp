import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import ServicesOverview from "@/components/ServicesOverview";
import PerformanceSection from "@/components/PerformanceSection";
import StationsOverview from "@/components/StationsOverview";
import Flow from "@/components/Flow";
import Recruit from "@/components/Recruit";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Company from "@/components/Company";
import Footer from "@/components/Footer";
import FloatingRecruitBanner from "@/components/FloatingRecruitBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { ServiceFAQStructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <ServiceFAQStructuredData />
      <Header />
      <main className="pt-14 lg:pt-20">
        <Hero />
        <About />
        <Features />
        <ServicesOverview />
        <PerformanceSection />
        <StationsOverview />
        <Flow />
        <Recruit />
        <Contact />
        <FAQ />
        <Company />
      </main>
      <Footer />
      <FloatingRecruitBanner />
      <ScrollToTop />
    </>
  );
}
