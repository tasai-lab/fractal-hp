import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PopulationChart from "@/components/charts/PopulationChart";
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import ElderlyRateTrendChart from "@/components/charts/ElderlyRateTrendChart";
import {
  getRegionalDataBySlug,
  getAllRegionalSlugs,
  regionalData,
} from "@/lib/regional-data";

export function generateStaticParams() {
  return getAllRegionalSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const area = getRegionalDataBySlug(resolvedParams.slug);

  if (!area) {
    return {
      title: "ページが見つかりません",
    };
  }

  return {
    title: area.title,
    description: area.description,
    openGraph: {
      title: area.title,
      description: area.description,
      type: "website",
    },
  };
}

export default async function RegionalAreaPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const area = getRegionalDataBySlug(resolvedParams.slug);

  if (!area) {
    notFound();
  }

  // 他の地域へのリンク
  const otherAreas = regionalData.filter((a) => a.slug !== area.slug);

  // カテゴリ別特産物
  const agricultureProducts = area.specialties.filter(
    (s) => s.category === "agriculture"
  );
  const foodProducts = area.specialties.filter((s) => s.category === "food");
  const craftProducts = area.specialties.filter((s) => s.category === "craft");

  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20">
        {/* ヒーローセクション */}
        <section className="bg-gradient-to-br from-[var(--color-logo-light-green)]/20 to-[var(--color-logo-yellow)]/20 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-[var(--color-logo-dark-green)] mb-2">
                フラクタル訪問看護 船橋
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-logo-dark-green)] mb-6 heading-gothic">
                {area.h1}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {area.intro}
              </p>
              <div className="mt-8">
                <a
                  href="tel:047-770-1228"
                  className="inline-flex items-center gap-2 bg-[var(--color-logo-dark-green)] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[var(--color-logo-dark-green)]/90 transition-colors"
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
                  047-770-1228
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 人口・統計セクション */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}の人口・統計データ
              </h2>

              {/* 人口カード */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-[var(--color-logo-light-green)]/10 to-[var(--color-logo-light-green)]/5 p-6 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">総人口</p>
                  <p className="text-3xl font-bold text-[var(--color-logo-dark-green)] mb-1">
                    {area.population.total}
                  </p>
                  <p className="text-xs text-gray-500">
                    {area.population.source} ({area.population.year})
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[var(--color-logo-dark-green)]/10 to-[var(--color-logo-dark-green)]/5 p-6 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">高齢者人口（65歳以上）</p>
                  <p className="text-3xl font-bold text-[var(--color-logo-dark-green)] mb-1">
                    {area.population.elderly}
                  </p>
                  <p className="text-xs text-gray-500">高齢化率: {area.population.elderlyRate}</p>
                </div>
                <div className="bg-gradient-to-br from-[var(--color-logo-yellow)]/30 to-[var(--color-logo-yellow)]/10 p-6 rounded-xl shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">訪問看護対応</p>
                  <p className="text-3xl font-bold text-[var(--color-logo-dark-green)] mb-1">
                    24時間
                  </p>
                  <p className="text-xs text-gray-500">365日対応体制</p>
                </div>
              </div>

              {/* 人口推移グラフ */}
              <div className="mb-8">
                <PopulationChart
                  data={area.populationProjection}
                  areaName={area.name}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 年齢構成セクション */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                年齢構成と高齢化の推移
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <AgeDistributionChart
                  data={area.ageDistribution}
                />
                <ElderlyRateTrendChart
                  data={area.populationProjection}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 特産物・名産品セクション */}
        {area.specialties.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                  {area.name}の特産物・名産品
                </h2>
                <div className="space-y-8">
                  {agricultureProducts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)] mb-4 flex items-center gap-2">
                        <span className="text-2xl">🌾</span>
                        農産物
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {agricultureProducts.map((product, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-[var(--color-logo-yellow)]/20 to-white p-5 rounded-xl border border-[var(--color-logo-light-green)]/20"
                          >
                            <h4 className="font-bold text-[var(--color-logo-dark-green)] mb-2">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {product.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {foodProducts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)] mb-4 flex items-center gap-2">
                        <span className="text-2xl">🍱</span>
                        食品・加工品
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {foodProducts.map((product, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-[var(--color-logo-light-green)]/10 to-white p-5 rounded-xl border border-[var(--color-logo-light-green)]/20"
                          >
                            <h4 className="font-bold text-[var(--color-logo-dark-green)] mb-2">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {product.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {craftProducts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)] mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎨</span>
                        工芸品
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {craftProducts.map((product, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-[var(--color-logo-dark-green)]/5 to-white p-5 rounded-xl border border-[var(--color-logo-light-green)]/20"
                          >
                            <h4 className="font-bold text-[var(--color-logo-dark-green)] mb-2">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {product.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 交通・道路状況セクション */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                交通・道路状況
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)] mb-4 flex items-center gap-2">
                    <span className="text-2xl">🚗</span>
                    主要道路
                  </h3>
                  <ul className="space-y-2">
                    {area.traffic.mainRoads.map((road, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="text-[var(--color-logo-light-green)] mt-1">
                          ●
                        </span>
                        <span>{road}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)] mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    混雑情報
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {area.traffic.congestion}
                  </p>
                </div>
              </div>
              <div className="mt-6 bg-[var(--color-logo-yellow)]/20 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)] mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚉</span>
                  アクセス情報
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {area.traffic.accessInfo}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 地域の特徴セクション */}
        {area.characteristics.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                  地域の特徴
                </h2>
                <div className="bg-gradient-to-br from-[var(--color-logo-light-green)]/10 to-white p-8 rounded-xl shadow-sm">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {area.characteristics.map((char, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[var(--color-logo-light-green)] text-xl mt-0.5">
                          ✓
                        </span>
                        <span className="text-gray-700">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 医療・介護体制セクション */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                医療・介護体制
              </h2>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {area.healthcare.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {area.healthcare.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-[var(--color-logo-light-green)]/5 p-4 rounded-lg"
                    >
                      <span className="text-[var(--color-logo-light-green)] text-xl mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 訪問可能エリアセクション */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}の訪問可能エリア
              </h2>
              <div className="bg-gradient-to-br from-[var(--color-logo-yellow)]/20 to-white p-8 rounded-xl shadow-sm">
                <div className="flex flex-wrap gap-3 justify-center">
                  {area.visitableAreas.map((areaName, index) => (
                    <span
                      key={index}
                      className="px-5 py-2 bg-white border-2 border-[var(--color-logo-light-green)] text-[var(--color-logo-dark-green)] rounded-full text-sm font-medium shadow-sm hover:bg-[var(--color-logo-light-green)]/10 transition-colors"
                    >
                      {areaName}
                    </span>
                  ))}
                </div>
                <p className="mt-8 text-gray-600 text-sm text-center">
                  上記エリアを中心に、{area.name}全域へ訪問いたします。
                  <br />
                  エリア外でもお気軽にご相談ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 訪問看護サービスセクション */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}で提供する訪問看護サービス
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "訪問看護",
                    icon: "🩺",
                    desc: "看護師による健康状態の観察、医療処置、服薬管理、療養上のケアを提供します。",
                  },
                  {
                    title: "訪問リハビリテーション",
                    icon: "🏃",
                    desc: "理学療法士・作業療法士・言語聴覚士による自宅でのリハビリを行います。",
                  },
                  {
                    title: "精神科訪問看護",
                    icon: "💚",
                    desc: "精神疾患をお持ちの方への訪問看護サービス。心のケアと生活支援を行います。",
                  },
                  {
                    title: "終末期ケア・看取り",
                    icon: "🕊️",
                    desc: "ご自宅での最期を希望される方への緩和ケア、ご家族のサポートを行います。",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[var(--color-logo-light-green)] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{service.icon}</span>
                      <h3 className="text-lg font-bold text-[var(--color-logo-dark-green)]">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/#about"
                  className="inline-flex items-center gap-2 bg-[var(--color-logo-dark-green)] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[var(--color-logo-dark-green)]/90 transition-colors"
                >
                  サービス詳細を見る
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQセクション */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}の訪問看護に関するよくある質問
              </h2>
              <div className="space-y-4">
                {area.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="bg-gray-50 rounded-xl shadow-sm group hover:shadow-md transition-shadow"
                  >
                    <summary className="p-6 cursor-pointer list-none flex items-center justify-between">
                      <span className="font-bold text-[var(--color-logo-dark-green)] pr-4">
                        Q. {faq.question}
                      </span>
                      <span className="text-[var(--color-logo-light-green)] transition-transform group-open:rotate-180 flex-shrink-0">
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">
                        A. {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 他の地域へのリンク */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                その他の対応地域
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {otherAreas.map((otherArea) => (
                  <Link
                    key={otherArea.slug}
                    href={`/areas/${otherArea.slug}`}
                    className="px-6 py-3 bg-white text-[var(--color-logo-dark-green)] rounded-full border-2 border-[var(--color-logo-light-green)] hover:bg-[var(--color-logo-light-green)]/10 transition-colors font-medium shadow-sm"
                  >
                    {otherArea.name}の地域情報
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-logo-dark-green)] mb-8 text-center heading-gothic">
                {area.name}での訪問看護のご相談
              </h2>
              <div className="mb-8 text-center">
                <p className="text-gray-700 mb-4">
                  {area.name}で訪問看護をお探しの方は、お気軽にご相談ください。
                </p>
                <a
                  href="tel:047-770-1228"
                  className="inline-flex items-center gap-2 bg-[var(--color-logo-light-green)] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[var(--color-logo-light-green)]/90 transition-colors"
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
                  047-770-1228（24時間受付）
                </a>
              </div>
              <Contact />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
