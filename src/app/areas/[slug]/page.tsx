import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import PopulationChart from "@/components/charts/PopulationChart";
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import ElderlyRateTrendChart from "@/components/charts/ElderlyRateTrendChart";
import { AreaJobPostingStructuredData } from "@/components/StructuredData";
import {
  getRegionalDataBySlug,
  regionalData,
  type Specialty,
} from "@/lib/regional-data";
import { officeInfo } from "@/lib/data";
import AreaHero from "./AreaHero";
import AreaFAQ from "./AreaFAQ";

type ServiceItem = {
  title: string;
  desc: string;
  disabled?: boolean;
  disabledNote?: string;
};

const SERVICE_LIST: ServiceItem[] = [
  {
    title: "訪問看護",
    desc: "看護師による健康状態の観察、医療処置、服薬管理、療養上のケアを提供します。",
  },
  {
    title: "訪問リハビリテーション",
    desc: "理学療法士・作業療法士・言語聴覚士による自宅でのリハビリを行います。",
    disabled: true,
    disabledNote: "現在休止中",
  },
  {
    title: "精神科訪問看護",
    desc: "精神疾患をお持ちの方への訪問看護サービス。心のケアと生活支援を行います。",
  },
  {
    title: "終末期ケア・看取り",
    desc: "ご自宅での最期を希望される方への緩和ケア、ご家族のサポートを行います。",
  },
  {
    title: "24時間対応",
    desc: "緊急時も安心。24時間365日、電話対応と必要に応じた緊急訪問を行います。",
  },
  {
    title: "土日・祝日訪問",
    desc: "土日や祝日も訪問可能。生活リズムに合わせた柔軟な訪問スケジュールに対応します。",
  },
];

const SPECIALTY_CATEGORIES: { key: Specialty["category"]; label: string }[] = [
  { key: "agriculture", label: "農産物" },
  { key: "food", label: "食品・加工品" },
  { key: "craft", label: "工芸品" },
];

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

  const otherAreas = regionalData.filter((a) => a.slug !== area.slug);
  const themeColor = area.theme.primary;

  return (
    <>
      <AreaJobPostingStructuredData areaName={area.name} areaSlug={area.slug} />

      <Header />
      <main className="pt-14 lg:pt-20">
        {/* ===== ヒーロー ===== */}
        <AreaHero area={area} />

        {/* ===== 統計ハイライト ===== */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="about" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title" style={{ color: themeColor }}>
                {area.name}の概要
              </h2>
              <div className="section-title-line" style={{ background: themeColor }} />
            </div>
            <div className="section-content">
              <div className="section-card">
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "総人口", value: area.population.total },
                    { label: "高齢者人口", value: area.population.elderly },
                    { label: "高齢化率", value: area.population.elderlyRate },
                    { label: "対応体制", value: "24時間365日" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white p-4 md:p-5 rounded-xl text-center"
                    >
                      <dt className="text-xs text-gray-500 mb-1">{stat.label}</dt>
                      <dd
                        className="text-lg md:text-xl font-bold"
                        style={{ color: themeColor }}
                      >
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 人口・統計セクション ===== */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="features" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title" style={{ color: themeColor }}>
                人口・統計データ
              </h2>
              <div className="section-title-line" style={{ background: themeColor }} />
            </div>
            <div className="section-content">
              <div className="section-card section-card-blue">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                    <h3 className="text-sm font-bold mb-3 text-gray-700">人口推移予測</h3>
                    <PopulationChart
                      data={area.populationProjection}
                      areaName={area.name}
                      primaryColor={themeColor}
                      secondaryColor={area.theme.accent}
                    />
                  </div>
                  <div className="grid gap-6">
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                      <h3 className="text-sm font-bold mb-3 text-gray-700">年齢構成</h3>
                      <AgeDistributionChart
                        data={area.ageDistribution}
                        primaryColor={themeColor}
                        secondaryColor={area.theme.accent}
                        accentColor={`${themeColor}40`}
                      />
                    </div>
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                      <h3 className="text-sm font-bold mb-3 text-gray-700">高齢化率の推移</h3>
                      <ElderlyRateTrendChart
                        data={area.populationProjection}
                        primaryColor={themeColor}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-right mt-4">
                  出典: {area.population.source} ({area.population.year})
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 訪問看護サービス ===== */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="serviceArea" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title" style={{ color: themeColor }}>
                訪問看護サービス
              </h2>
              <div className="section-title-line" style={{ background: themeColor }} />
            </div>
            <div className="section-content">
              <div className="section-card section-card-mint">
                <div className="grid md:grid-cols-2 gap-5">
                  {SERVICE_LIST.map((service) => {
                    const isDisabled = !!service.disabled;
                    return (
                      <div
                        key={service.title}
                        className={`group relative p-5 md:p-6 rounded-2xl border transition-all ${
                          isDisabled
                            ? "bg-gray-100 opacity-60"
                            : "bg-white hover:shadow-lg hover:-translate-y-0.5"
                        }`}
                        style={{ borderColor: isDisabled ? "#e5e5e5" : `${themeColor}15` }}
                      >
                        <div
                          className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl"
                          style={{ backgroundColor: isDisabled ? "#9ca3af" : themeColor }}
                        />
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className="text-lg font-bold mb-2"
                            style={{ color: isDisabled ? "#9ca3af" : themeColor }}
                          >
                            {service.title}
                          </h3>
                          {service.disabledNote && (
                            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-500 rounded-full flex-shrink-0">
                              {service.disabledNote}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm leading-relaxed ${isDisabled ? "text-gray-400" : "text-gray-600"}`}>
                          {service.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-8">
                  <Link
                    href="/#about"
                    className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-bold transition-all hover:scale-105 hover:shadow-md text-sm"
                    style={{ backgroundColor: themeColor }}
                  >
                    サービス詳細を見る
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 訪問可能エリア ===== */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="flow" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title" style={{ color: themeColor }}>
                訪問可能エリア
              </h2>
              <div className="section-title-line" style={{ background: themeColor }} />
            </div>
            <div className="section-content">
              <div className="section-card">
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {area.visitableAreas.map((areaName) => (
                    <span
                      key={areaName}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${themeColor}08`,
                        color: themeColor,
                      }}
                    >
                      {areaName}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm text-center">
                  上記エリアを中心に、{area.name}全域へ訪問いたします。エリア外もご相談ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 地域の特徴 & 交通 ===== */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="staff" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title" style={{ color: themeColor }}>
                地域情報
              </h2>
              <div className="section-title-line" style={{ background: themeColor }} />
            </div>
            <div className="section-content">
              <div className="section-card section-card-pink">
                <div className="grid lg:grid-cols-2 gap-8">
                  {area.characteristics.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold heading-gothic mb-5" style={{ color: themeColor }}>
                        地域の特徴
                      </h3>
                      <div className="bg-white rounded-2xl p-5 md:p-6">
                        <ul className="space-y-3">
                          {area.characteristics.map((char, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span
                                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                                style={{ backgroundColor: themeColor }}
                              >
                                {index + 1}
                              </span>
                              <span className="text-gray-700 text-sm">{char}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold heading-gothic mb-5" style={{ color: themeColor }}>
                      交通・道路状況
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-4">
                        <h4 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
                          主要道路
                        </h4>
                        <ul className="space-y-1">
                          {area.traffic.mainRoads.map((road) => (
                            <li key={road} className="flex items-center gap-2 text-gray-600 text-sm">
                              <span
                                className="w-1 h-1 rounded-full"
                                style={{ backgroundColor: themeColor }}
                              />
                              {road}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {[
                        { label: "混雑情報", text: area.traffic.congestion },
                        { label: "アクセス情報", text: area.traffic.accessInfo },
                      ].map((item) => (
                        <div key={item.label} className="bg-white rounded-xl p-4">
                          <h4 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
                            {item.label}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 特産物・名産品 ===== */}
        {area.specialties.length > 0 && (
          <section className="section-wrapper bg-white relative overflow-hidden">
            <BackgroundTriangles pattern="recruit" />
            <div className="section-inner relative z-10">
              <div className="section-title-area">
                <h2 className="section-title" style={{ color: themeColor }}>
                  特産物・名産品
                </h2>
                <div className="section-title-line" style={{ background: themeColor }} />
              </div>
              <div className="section-content">
                <div className="section-card">
                  <div className="space-y-6">
                    {SPECIALTY_CATEGORIES.map(({ key, label }) => {
                      const products = area.specialties.filter((s) => s.category === key);
                      if (products.length === 0) return null;
                      return (
                        <div key={key}>
                          <h3 className="text-sm font-bold mb-3" style={{ color: themeColor }}>
                            {label}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {products.map((product) => (
                              <div key={product.name} className="bg-white p-4 rounded-xl shadow-sm">
                                <h4 className="font-bold text-sm mb-1" style={{ color: themeColor }}>
                                  {product.name}
                                </h4>
                                <p className="text-gray-500 text-xs">{product.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== 医療・介護体制 ===== */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="office" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title" style={{ color: themeColor }}>
                医療・介護体制
              </h2>
              <div className="section-title-line" style={{ background: themeColor }} />
            </div>
            <div className="section-content">
              <div className="section-card section-card-blue">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {area.healthcare.description}
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {area.healthcare.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 bg-white p-3 rounded-lg"
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: themeColor }}
                      >
                        ✓
                      </span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <AreaFAQ faqs={area.faqs} themeColor={themeColor} />

        {/* ===== 他の地域へのリンク ===== */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="company" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title" style={{ color: themeColor }}>
                その他の対応地域
              </h2>
              <div className="section-title-line" style={{ background: themeColor }} />
            </div>
            <div className="section-content">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {otherAreas.map((otherArea) => (
                  <Link
                    key={otherArea.slug}
                    href={`/areas/${otherArea.slug}`}
                    className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden border border-gray-100"
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-0.5"
                      style={{ backgroundColor: otherArea.theme.primary }}
                    />
                    <p className="font-bold text-sm" style={{ color: otherArea.theme.primary }}>
                      {otherArea.name}
                    </p>
                    <p className="text-xs text-gray-400">{otherArea.theme.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== お問い合わせ ===== */}
        <section id="contact" className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="contact" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title" style={{ color: themeColor }}>
                お問い合わせ
              </h2>
              <div className="section-title-line" style={{ background: themeColor }} />
            </div>
            <div className="section-content">
              <div className="text-center mb-8">
                <p className="text-gray-600 text-sm mb-4">
                  {area.name}で訪問看護をお探しの方は、お気軽にご相談ください。
                </p>
                <a
                  href={`tel:${officeInfo.phone}`}
                  className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: themeColor }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {officeInfo.phone}
                </a>
                <p className="text-xs text-gray-500 mt-2">24時間受付</p>
              </div>
              <Contact embedded hideTitle />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
