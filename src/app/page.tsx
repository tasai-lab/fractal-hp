import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Office from "@/components/Office";
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
        <Features />
        <Office />
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
