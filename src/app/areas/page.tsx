import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { regionalData } from "@/lib/regional-data";
import { serviceAreas } from "@/lib/data";

export const metadata: Metadata = {
  title: "訪問看護 対応エリア一覧｜船橋市・八千代市・習志野市・千葉市",
  description:
    "フラクタル訪問看護 船橋の対応エリア一覧。船橋市・八千代市・習志野市・千葉市花見川区・稲毛区で24時間365日の訪問看護サービスを提供しています。各地域の詳細情報もご覧いただけます。",
  alternates: {
    canonical: "https://fractal-hokan.com/areas",
  },
  openGraph: {
    title: "訪問看護 対応エリア一覧｜フラクタル訪問看護 船橋",
    description:
      "船橋市・八千代市・習志野市・千葉市で訪問看護サービスを提供。各地域の詳細情報をご確認ください。",
    type: "website",
    url: "https://fractal-hokan.com/areas",
    siteName: "フラクタル訪問看護 船橋",
    locale: "ja_JP",
  },
};

export default function AreasPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "対応エリア一覧", url: "https://fractal-hokan.com/areas" },
        ]}
      />

      <Header />
      <main className="pt-14 lg:pt-20">
        {/* 訪問可能エリアセクション */}
        <section className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="office" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h1 className="section-title">訪問看護 対応エリア</h1>
              <div className="section-title-line" />
            </div>

            <div className="section-content">
              <div className="section-card section-card-mint space-y-8">
                {/* エリアマップ */}
                <div>
                  <p className="text-center text-gray-600 mb-6">
                    船橋市・八千代市・習志野市・千葉市を中心に24時間365日の訪問看護サービスを提供しています
                  </p>
                  <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/2]">
                    <Image
                      src="/images/service-area/area-map-new.png"
                      alt="フラクタル訪問看護 船橋 訪問エリアマップ - 船橋市・習志野市・八千代市・千葉市花見川区・稲毛区"
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    駐車場代・交通費は訪問可能エリア内であればいただきません
                  </p>
                </div>

                {/* 訪問可能エリアカード */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {serviceAreas.priority.cities.map((city, index) => {
                    // 市名に対応するregionalDataを取得
                    const areaData = regionalData.find((r) => r.name === city.name);

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm"
                      >
                        {/* カラーバー */}
                        {areaData && (
                          <div
                            className="h-2"
                            style={{ backgroundColor: areaData.theme.primary }}
                          />
                        )}

                        <div className="p-4 md:p-5">
                          {/* 市名とタグライン */}
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                            <h4
                              className="font-bold text-lg"
                              style={{ color: areaData?.theme.secondary || "var(--color-primary)" }}
                            >
                              {city.name}
                            </h4>
                            {areaData && (
                              <span
                                className="inline-block px-2 py-0.5 rounded-full text-xs font-bold text-white"
                                style={{ backgroundColor: areaData.theme.primary }}
                              >
                                {areaData.theme.tagline}
                              </span>
                            )}
                          </div>

                          {/* 訪問可能地域リスト */}
                          <ul className={`text-sm md:text-base mb-4 ${city.areas.length > 6 ? "grid grid-cols-2 gap-x-3 gap-y-1" : "space-y-1"}`}>
                            {city.areas.map((area, areaIndex) => (
                              <li key={areaIndex} className="flex items-start gap-2">
                                <span className="text-[var(--color-logo-light-green)] mt-0.5">●</span>
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-gray-500 text-xs mb-4">
                            上記以外の地域も承ります
                          </p>

                          {/* 詳細リンク */}
                          {areaData && (
                            <Link
                              href={`/areas/${areaData.slug}`}
                              className="group flex items-center justify-between p-3 rounded-lg transition-colors"
                              style={{ backgroundColor: `${areaData.theme.primary}15` }}
                            >
                              <div className="flex items-center gap-3">
                                <div>
                                  <span
                                    className="font-bold text-sm"
                                    style={{ color: areaData.theme.primary }}
                                  >
                                    {areaData.population.elderlyRate}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-1">高齢化率</span>
                                </div>
                                <div className="h-4 w-px bg-gray-300" />
                                <div>
                                  <span className="text-xs text-gray-500">人口</span>
                                  <span className="text-sm font-medium ml-1">{areaData.population.total}</span>
                                </div>
                              </div>
                              <div
                                className="flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all"
                                style={{ color: areaData.theme.primary }}
                              >
                                <span>詳しく</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* 千葉市稲毛区（serviceAreasにないがregionalDataにある） */}
                  {regionalData
                    .filter((r) => !serviceAreas.priority.cities.some((c) => c.name === r.name))
                    .map((areaData) => (
                      <div
                        key={areaData.slug}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm"
                      >
                        <div
                          className="h-2"
                          style={{ backgroundColor: areaData.theme.primary }}
                        />
                        <div className="p-4 md:p-5">
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                            <h4
                              className="font-bold text-lg"
                              style={{ color: areaData.theme.secondary }}
                            >
                              {areaData.name}
                            </h4>
                            <span
                              className="inline-block px-2 py-0.5 rounded-full text-xs font-bold text-white"
                              style={{ backgroundColor: areaData.theme.primary }}
                            >
                              {areaData.theme.tagline}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mb-4">
                            訪問可能エリアについてはお問い合わせください
                          </p>

                          <Link
                            href={`/areas/${areaData.slug}`}
                            className="group flex items-center justify-between p-3 rounded-lg transition-colors"
                            style={{ backgroundColor: `${areaData.theme.primary}15` }}
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <span
                                  className="font-bold text-sm"
                                  style={{ color: areaData.theme.primary }}
                                >
                                  {areaData.population.elderlyRate}
                                </span>
                                <span className="text-xs text-gray-500 ml-1">高齢化率</span>
                              </div>
                              <div className="h-4 w-px bg-gray-300" />
                              <div>
                                <span className="text-xs text-gray-500">人口</span>
                                <span className="text-sm font-medium ml-1">{areaData.population.total}</span>
                              </div>
                            </div>
                            <div
                              className="flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all"
                              style={{ color: areaData.theme.primary }}
                            >
                              <span>詳しく</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* フラクタルの特徴 */}
        <Features />

        {/* お問い合わせセクション */}
        <section id="contact" className="section-wrapper bg-white relative overflow-hidden">
          <BackgroundTriangles pattern="about" />
          <div className="section-inner relative z-10">
            <div className="section-title-area">
              <h2 className="section-title">お問い合わせ</h2>
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
