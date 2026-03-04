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

// FAQアコーディオン（useState + max-h パターン）
function FAQAccordion({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm border border-[var(--color-muted)]/20 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left p-4 md:p-5 flex items-start gap-3"
          >
            <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color-logo-dark-green)] text-white flex items-center justify-center text-sm md:text-base font-bold">
              Q
            </span>
            <span className="flex-1 text-base md:text-lg font-bold text-[var(--color-ink)] pt-1">
              {faq.question}
            </span>
            <svg
              className={`w-5 h-5 flex-shrink-0 text-[var(--color-logo-dark-green)] transition-transform mt-2 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color-accent-pink)] text-[var(--color-logo-dark-green)] flex items-center justify-center text-sm md:text-base font-bold">
                A
              </span>
              <p className="flex-1 text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed pt-1">
                {faq.answer}
              </p>
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

const bgPatterns = ["flow", "features", "office"];

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams =
    typeof params === "object" && "then" in params
      ? use(params as Promise<{ slug: string }>)
      : (params as { slug: string });

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
      <main className="pt-14 lg:pt-20 bg-white">
        {/* ===== ヒーローセクション ===== */}
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="about" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h1 className="section-title heading-gothic">{service.h1}</h1>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                {/* パンくずリスト */}
                <nav className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-4">
                  <Link href="/" className="hover:underline">
                    ホーム
                  </Link>
                  <span>/</span>
                  <Link href="/services" className="hover:underline">
                    サービス案内
                  </Link>
                  <span>/</span>
                  <span className="text-[var(--color-logo-dark-green)]">
                    {service.heroTitle}
                  </span>
                </nav>
                <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6 text-base md:text-lg">
                  {service.heroDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${officeInfo.phone}`}
                    className="inline-flex items-center justify-center gap-2 bg-[var(--color-logo-dark-green)] text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
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
                    className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] px-6 py-3 rounded-full font-bold text-sm hover:bg-[var(--color-logo-yellow)] transition-colors"
                  >
                    お問い合わせ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== コンテンツセクション ===== */}
        {service.sections.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className="section-wrapper bg-white relative overflow-x-hidden"
          >
            <BackgroundTriangles
              pattern={bgPatterns[sectionIndex % bgPatterns.length]}
            />
            <div className="section-inner relative z-10">
              <div className="section-title-area">
                <h2 className="section-title heading-gothic">
                  {section.heading}
                </h2>
                <div className="section-title-line" />
              </div>
              <div className="section-content">
                <AnimatedSection>
                  <div className="section-card section-card-mint">
                    <p className="text-[var(--color-ink-soft)] leading-relaxed mb-5">
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
                            <span className="text-[var(--color-ink-soft)] text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        ))}

        {/* ===== よくある質問 ===== */}
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="faq" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">よくある質問</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-blue">
                <FAQAccordion faqs={service.faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 関連サービス ===== */}
        {relatedServices.length > 0 && (
          <section className="section-wrapper bg-white relative overflow-x-hidden">
            <BackgroundTriangles pattern="staff" />
            <div className="section-inner relative z-10">
              <div className="section-title-area">
                <h2 className="section-title heading-gothic">関連サービス</h2>
                <div className="section-title-line" />
              </div>
              <div className="section-content">
                <div className="section-card">
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
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== お問い合わせ ===== */}
        <section
          id="contact"
          className="section-wrapper bg-white relative overflow-x-hidden"
        >
          <BackgroundTriangles pattern="contact" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">お問い合わせ</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <Contact
                embedded
                hideTitle
                initialContactType={service.heroTitle}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
