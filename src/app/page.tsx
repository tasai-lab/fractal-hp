import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Office from "@/components/Office";
import Flow from "@/components/Flow";
import Staff from "@/components/Staff";
import Recruit from "@/components/Recruit";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Company from "@/components/Company";
import Footer from "@/components/Footer";
import FloatingRecruitBanner from "@/components/FloatingRecruitBanner";
// import UpdatesPopup from "@/components/UpdatesPopup"; // 一時的に無効化
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20">
        <Hero />
        <About />
        <Features />
        <Office />
        <Flow />
        <Staff />
        <Recruit />
        <Contact />
        <FAQ />
        <Company />
      </main>
      <Footer />
      <FloatingRecruitBanner />
      {/* <UpdatesPopup /> 一時的に無効化 */}
      <ScrollToTop />
    </>
  );
}
