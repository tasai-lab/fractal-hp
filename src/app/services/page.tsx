import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import Contact from "@/components/Contact";
import { servicesData } from "@/lib/services-data";
import { officeInfo } from "@/lib/data";

const serviceIconPaths: Record<string, string> = {
  "psychiatric-nursing":
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "end-of-life-care":
    "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "24h-support":
    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
};

const serviceColors: Record<string, { primary: string; light: string }> = {
  "psychiatric-nursing": {
    primary: "var(--color-logo-dark-green)",
    light: "var(--color-logo-light-green)",
  },
  "end-of-life-care": {
    primary: "#7C3AED",
    light: "#EDE9FE",
  },
  "24h-support": {
    primary: "#0369A1",
    light: "#E0F2FE",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20">
        {/* ヒーローセクション */}
        <section className="section-wrapper bg-white relative overflow-x-hidden">
          <BackgroundTriangles pattern="about" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h1 className="section-title heading-gothic">サービス案内</h1>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                <p className="text-gray-600 leading-relaxed mb-6">
                  フラクタル訪問看護では、利用者とそのご家族が安心して在宅療養を続けられるよう、
                  専門的なサービスを提供しています。
                  精神科訪問看護・看取り・24時間対応の各サービスについて、詳しくご紹介します。
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

        {/* サービス一覧 */}
        <section className="section-wrapper relative overflow-x-hidden" style={{ backgroundColor: "#F8FAF9" }}>
          <BackgroundTriangles pattern="features" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title heading-gothic">専門サービス</h2>
              <div className="section-title-line" />
            </div>
            <div className="section-content">
              <div className="grid gap-6 md:gap-8">
                {servicesData.map((service) => {
                  const colors = serviceColors[service.slug] ?? {
                    primary: "var(--color-logo-dark-green)",
                    light: "var(--color-logo-light-green)",
                  };
                  const iconPath = serviceIconPaths[service.slug];

                  return (
                    <div
                      key={service.slug}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div
                        className="h-1.5"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <div className="p-6 md:p-8">
                        <div className="flex items-start gap-5">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: colors.light }}
                          >
                            {iconPath && (
                              <svg
                                className="w-6 h-6"
                                style={{ color: colors.primary }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d={iconPath}
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-xl font-bold heading-gothic mb-2"
                              style={{ color: colors.primary }}
                            >
                              {service.heroTitle}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3 font-medium">
                              {service.heroTagline}
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                              {service.heroDescription}
                            </p>
                            <Link
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                              style={{ color: colors.primary }}
                            >
                              詳しく見る
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
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
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
              <Contact embedded hideTitle />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
