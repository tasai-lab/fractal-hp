import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Philosophy from "@/components/Philosophy";
import Features from "@/components/Features";
import Office from "@/components/Office";
import ServiceArea from "@/components/ServiceArea";
import Flow from "@/components/Flow";
import Staff from "@/components/Staff";
import Recruit from "@/components/Recruit";
import Contact from "@/components/Contact";
import Company from "@/components/Company";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Features />
        <Office />
        <ServiceArea />
        <Flow />
        <Staff />
        <Recruit />
        <Contact />
        <Company />
      </main>
      <Footer />
    </>
  );
}
