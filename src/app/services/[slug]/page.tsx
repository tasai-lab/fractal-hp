"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { getServiceBySlug, servicesData } from "@/lib/services-data";
import { officeInfo } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// サービスごとのカラー設定
const serviceColors: Record<string, { primary: string; secondary: string; light: string }> = {
  "psychiatric-nursing": {
    primary: "var(--color-logo-dark-green)",
    secondary: "#0A3D2D",
    light: "var(--color-logo-light-green)",
  },
  "end-of-life-care": {
    primary: "#7C3AED",
    secondary: "#5B21B6",
    light: "#EDE9FE",
  },
  "24h-support": {
    primary: "#0369A1",
    secondary: "#075985",
    light: "#E0F2FE",
  },
};

// FAQアコーディオン（クライアントコンポーネント）
function FAQAccordion({
  faqs,
  primaryColor,
}: {
  faqs: { question: string; answer: string }[];
  primaryColor: string;
}) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <details
          key={index}
          className="group bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <summary className="p-5 cursor-pointer list-none flex items-center justify-between">
            <span
              className="font-bold pr-4 text-sm"
              style={{ color: primaryColor }}
            >
              {faq.question}
            </span>
            <span
              className="transition-transform group-open:rotate-180 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-5">
            <div
              className="pt-3 border-t text-gray-600 text-sm leading-relaxed"
              style={{ borderColor: `${primaryColor}18` }}
            >
              {faq.answer}
            </div>
          </div>
        </details>
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

  const colors = serviceColors[service.slug] ?? {
    primary: "var(--color-logo-dark-green)",
    secondary: "#0A3D2D",
    light: "var(--color-logo-light-green)",
  };

  const relatedServices = service.relatedServices
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20">
        {/* ===== ヒーローセクション ===== */}
        <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.light}20 50%, white 100%)`,
            }}
          />
          <div
            className="absolute top-0 right-0 w-[45%] h-[65%] opacity-[0.05] rounded-bl-[100%]"
            style={{ backgroundColor: colors.primary }}
          />

          <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* パンくずリスト */}
              <nav className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6 animate-fade-in">
                <Link href="/" className="hover:text-gray-600 transition-colors">
                  ホーム
                </Link>
                <span>/</span>
                <Link
                  href="/services"
                  className="hover:text-gray-600 transition-colors"
                >
                  サービス案内
                </Link>
                <span>/</span>
                <span style={{ color: colors.primary }}>{service.heroTitle}</span>
              </nav>

              <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <span
                  className="inline-block px-5 py-2 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {service.heroTagline}
                </span>
              </div>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight heading-gothic animate-fade-in-up"
                style={{ color: colors.secondary, animationDelay: "0.2s" }}
              >
                {service.h1}
              </h1>

              <p
                className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in"
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
                  className="inline-flex items-center justify-center gap-3 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: colors.primary }}
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
                  className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-md hover:shadow-lg border-2"
                  style={{ color: colors.primary, borderColor: colors.primary }}
                >
                  無料相談はこちら
                </a>
              </div>
            </div>
          </div>

          {/* ウェーブ装飾 */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <path
                d="M0 30L80 27C160 24 320 18 480 21C640 24 800 36 960 39C1120 42 1280 36 1360 33L1440 30V61H0V30Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* ===== コンテンツセクション ===== */}
        {service.sections.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className={`py-12 md:py-16 ${sectionIndex % 2 === 0 ? "bg-white" : ""}`}
            style={
              sectionIndex % 2 !== 0
                ? { backgroundColor: `${colors.primary}05` }
                : undefined
            }
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-1 h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors.primary }}
                    />
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-0.5">
                        0{sectionIndex + 1}
                      </span>
                      <h2
                        className="text-xl md:text-2xl font-bold heading-gothic"
                        style={{ color: colors.secondary }}
                      >
                        {section.heading}
                      </h2>
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-6 md:p-8"
                    style={{ backgroundColor: `${colors.primary}06` }}
                  >
                    <p className="text-gray-700 leading-relaxed mb-5">
                      {section.body}
                    </p>

                    {section.items && section.items.length > 0 && (
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {section.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-3 bg-white rounded-xl p-3"
                          >
                            <span
                              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                              style={{ backgroundColor: colors.primary }}
                            >
                              {itemIndex + 1}
                            </span>
                            <span className="text-gray-700 text-sm leading-relaxed">
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
        <section
          className="py-14 md:py-20"
          style={{ backgroundColor: `${colors.primary}05` }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                    FAQ
                  </span>
                  <h2
                    className="text-xl md:text-3xl font-bold heading-gothic"
                    style={{ color: colors.secondary }}
                  >
                    よくある質問
                  </h2>
                </div>
                <FAQAccordion
                  faqs={service.faqs}
                  primaryColor={colors.primary}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ===== 関連サービス ===== */}
        {relatedServices.length > 0 && (
          <section className="py-14 md:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <AnimatedSection>
                  <div className="text-center mb-10">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                      Related Services
                    </span>
                    <h2
                      className="text-xl md:text-3xl font-bold heading-gothic"
                      style={{ color: colors.secondary }}
                    >
                      関連するサービス
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedServices.map((related) => {
                      if (!related) return null;
                      const relatedColors = serviceColors[related.slug] ?? {
                        primary: "var(--color-logo-dark-green)",
                        secondary: "#0A3D2D",
                        light: "var(--color-logo-light-green)",
                      };
                      return (
                        <Link
                          key={related.slug}
                          href={`/services/${related.slug}`}
                          className="group relative bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden border"
                          style={{ borderColor: `${relatedColors.primary}20` }}
                        >
                          <div
                            className="absolute top-0 left-0 w-full h-0.5"
                            style={{ backgroundColor: relatedColors.primary }}
                          />
                          <p
                            className="font-bold text-base mb-1"
                            style={{ color: relatedColors.primary }}
                          >
                            {related.heroTitle}
                          </p>
                          <p className="text-xs text-gray-500">
                            {related.heroTagline}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        )}

        {/* ===== お問い合わせCTA ===== */}
        <section
          className="py-14 md:py-20 relative overflow-hidden"
          style={{ backgroundColor: `${colors.primary}08` }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-2">
                  Contact
                </span>
                <h2
                  className="text-xl md:text-3xl font-bold heading-gothic mb-3"
                  style={{ color: colors.secondary }}
                >
                  {service.heroTitle}についてのご相談
                </h2>
                <p className="text-gray-600 text-sm">
                  ご不明な点やご相談は、お気軽にお問い合わせください。初回相談は無料です。
                </p>
              </div>

              <div className="text-center mb-8">
                <a
                  href={`tel:${officeInfo.phone}`}
                  className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: colors.primary }}
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
                <p className="text-xs text-gray-500 mt-2">24時間受付</p>
              </div>

              <div
                id="contact"
                className="bg-white rounded-2xl p-5 md:p-8 shadow-sm"
              >
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
