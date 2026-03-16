import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import ServicesOverview from "@/components/ServicesOverview";
import StationsOverview from "@/components/StationsOverview";
import RecruitCTA from "@/components/RecruitCTA";
import Contact from "@/components/Contact";
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
        <StationsOverview />
        <RecruitCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingRecruitBanner />
      <ScrollToTop />
    </>
  );
}
