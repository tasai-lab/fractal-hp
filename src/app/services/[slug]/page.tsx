"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import { getServiceBySlug, servicesData } from "@/lib/services-data";
import { officeInfo } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// FAQアコーディオン（クライアントコンポーネント）
function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            aria-expanded={openIndex === index}
          >
            <span className="flex items-start gap-3 md:gap-4">
              <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color-logo-dark-green)] text-white flex items-center justify-center text-sm md:text-base font-bold">
                Q
              </span>
              <span className="text-base md:text-lg font-bold text-[var(--color-ink)] pt-1">
                {faq.question}
              </span>
            </span>
            <span className="flex-shrink-0 ml-4 text-[var(--color-logo-dark-green)]">
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <div
            className={`transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
          >
            <div className="px-4 md:px-6 pb-4 md:pb-6">
              <div className="flex items-start gap-3 md:gap-4 pt-2 border-t border-gray-100">
                <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] flex items-center justify-center text-sm md:text-base font-bold mt-2">
                  A
                </span>
                <p className="text-sm md:text-base text-[var(--color-ink)] leading-relaxed pt-3">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// スクロールアニメーション付きセクション
function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = typeof params === "object" && "then" in params
    ? use(params as Promise<{ slug: string }>)
    : params as { slug: string };

  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = service.relatedServices
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20">
        {/* ===== ヒーローセクション ===== */}
        <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center overflow-hidden bg-gradient-to-br from-[var(--color-logo-light-green)]/10 via-white to-white">
          <div className="absolute top-0 right-0 w-[45%] h-[65%] opacity-[0.05] rounded-bl-[100%] bg-[var(--color-logo-dark-green)]" />

          <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* パンくずリスト */}
              <nav className="flex items-center justify-center gap-2 text-xs text-[var(--color-muted)] mb-6 animate-fade-in">
                <Link href="/" className="hover:text-[var(--color-ink-soft)] transition-colors">
                  ホーム
                </Link>
                <span>/</span>
                <Link
                  href="/services"
                  className="hover:text-[var(--color-ink-soft)] transition-colors"
                >
                  サービス案内
                </Link>
                <span>/</span>
                <span className="text-[var(--color-logo-dark-green)]">{service.heroTitle}</span>
              </nav>

              <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold text-white bg-[var(--color-logo-dark-green)]">
                  {service.heroTagline}
                </span>
              </div>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight heading-gothic animate-fade-in-up text-[var(--color-ink)]"
                style={{ animationDelay: "0.2s" }}
              >
                {service.h1}
              </h1>

              <p
                className="text-base md:text-lg text-[var(--color-ink-soft)] leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                {service.heroDescription}
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                <a
                  href={`tel:${officeInfo.phone}`}
                  className="inline-flex items-center justify-center gap-3 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl bg-[var(--color-logo-dark-green)]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {officeInfo.phone}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-md hover:shadow-lg border-2 text-[var(--color-logo-dark-green)] border-[var(--color-logo-dark-green)]"
                >
                  無料相談はこちら
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== コンテンツセクション ===== */}
        {service.sections.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className={`section-wrapper ${sectionIndex % 2 === 0 ? "bg-white" : "bg-[var(--color-foreground)]/[0.02]"} relative overflow-hidden`}
          >
            <BackgroundTriangles pattern={sectionIndex % 2 === 0 ? "features" : "about"} />
            <div className="relative z-10 section-container">
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-10 rounded-full flex-shrink-0 bg-[var(--color-logo-dark-green)]" />
                  <h2 className="text-xl md:text-2xl font-bold heading-gothic text-[var(--color-ink)]">
                    {section.heading}
                  </h2>
                </div>

                <div className="rounded-2xl p-6 md:p-8 bg-[var(--color-logo-light-green)]/5">
                  <p className="text-[var(--color-ink)] leading-relaxed mb-5">
                    {section.body}
                  </p>

                  {section.items && section.items.length > 0 && (
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 bg-white rounded-xl p-3"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 bg-[var(--color-logo-dark-green)]">
                            {itemIndex + 1}
                          </span>
                          <span className="text-[var(--color-ink)] text-sm leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </section>
        ))}

        {/* ===== よくある質問 ===== */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="faq" />
          <div className="relative z-10 section-container">
            <AnimatedSection>
              <div className="text-center mb-10">
                <h2 className="text-xl md:text-3xl font-bold heading-gothic text-[var(--color-ink)]">
                  よくある質問
                </h2>
              </div>
              <FAQAccordion faqs={service.faqs} />
            </AnimatedSection>
          </div>
        </section>

        {/* ===== 関連サービス ===== */}
        {relatedServices.length > 0 && (
          <section className="section-wrapper bg-white relative overflow-hidden">
            <BackgroundTriangles pattern="serviceArea" />
            <div className="relative z-10 section-container">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-xl md:text-3xl font-bold heading-gothic text-[var(--color-ink)]">
                    関連するサービス
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedServices.map((related) => {
                    if (!related) return null;
                    return (
                      <Link
                        key={related.slug}
                        href={`/services/${related.slug}`}
                        className="group relative bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden border border-[var(--color-logo-dark-green)]/20"
                      >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-[var(--color-logo-dark-green)]" />
                        <p className="font-bold text-base mb-1 text-[var(--color-logo-dark-green)]">
                          {related.heroTitle}
                        </p>
                        <p className="text-xs text-[var(--color-muted)]">
                          {related.heroTagline}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* ===== お問い合わせCTA ===== */}
        <section id="contact" className="section-wrapper bg-[var(--color-logo-light-green)]/5 relative overflow-hidden">
          <BackgroundTriangles pattern="contact" />
          <div className="relative z-10 section-container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-xl md:text-3xl font-bold heading-gothic mb-3 text-[var(--color-ink)]">
                  {service.heroTitle}についてのご相談
                </h2>
                <p className="text-[var(--color-ink-soft)] text-sm">
                  ご不明な点やご相談は、お気軽にお問い合わせください。初回相談は無料です。
                </p>
              </div>

              <div className="text-center mb-8">
                <a
                  href={`tel:${officeInfo.phone}`}
                  className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl bg-[var(--color-logo-dark-green)]"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {officeInfo.phone}
                </a>
                <p className="text-xs text-[var(--color-muted)] mt-2">24時間受付</p>
              </div>

              <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
                <Contact embedded hideTitle initialContactType={service.heroTitle} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
