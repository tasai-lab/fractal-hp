import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { regionalData } from "@/lib/regional-data";
import { serviceAreas } from "@/lib/data";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    return {
      title: "対応エリア一覧｜フラクタル訪問看護",
      description: "フラクタル訪問看護の対応エリア一覧ページです。",
    };
  }

  return {
    title: `対応エリア一覧｜${station.name}`,
    description: `${station.name}の対応エリア一覧。${station.officeInfo.address.city}を中心に24時間365日の訪問看護サービスを提供しています。各地域の詳細情報もご覧いただけます。`,
    alternates: {
      canonical: `https://fractal-hokan.com/stations/${station.slug}/areas`,
    },
    openGraph: {
      title: `対応エリア一覧｜${station.name}`,
      description: `${station.name}の対応エリア一覧。各地域の詳細情報をご確認ください。`,
      type: "website",
      url: `https://fractal-hokan.com/stations/${station.slug}/areas`,
      siteName: "フラクタル訪問看護",
      locale: "ja_JP",
    },
  };
}

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export default async function StationAreasPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    notFound();
  }

  const { slug } = station;

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "ステーション一覧", url: "https://fractal-hokan.com/stations" },
          {
            name: station.name,
            url: `https://fractal-hokan.com/stations/${slug}`,
          },
          {
            name: "対応エリア一覧",
            url: `https://fractal-hokan.com/stations/${slug}/areas`,
          },
        ]}
      />

      <PageHero
        label="SERVICE AREAS"
        title="対応エリア一覧"
        description="船橋市・八千代市・習志野市・千葉市を中心に24時間365日の訪問看護サービスを提供しています"
      />

      {/* エリアマップ */}
      <section className="relative overflow-hidden">
        <BackgroundTriangles pattern="office" />
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 relative z-10 space-y-8">
          {/* エリアマップ */}
          <div>
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
                <p className="text-center text-sm text-[var(--color-ink-soft)] mt-4">
                  駐車場代・交通費は訪問可能エリア内であればいただきません
                </p>
              </div>

              {/* 訪問可能エリアカード */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {serviceAreas.priority.cities.map((city, index) => {
                  const areaData = regionalData.find((r) => r.name === city.name);

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col"
                    >
                      {/* カラーバー */}
                      {areaData && (
                        <div
                          className="h-2"
                          style={{ backgroundColor: areaData.theme.primary }}
                        />
                      )}

                      <div className="p-4 md:p-5 flex flex-col flex-1">
                        {/* 市名とタグライン */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                          <h4
                            className="font-bold text-lg"
                            style={{ color: areaData?.theme.secondary || "var(--color-logo-dark-green)" }}
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
                        <p className="text-[var(--color-ink-soft)] text-xs mb-4">
                          上記以外の地域も承ります
                        </p>

                        {/* 詳細リンク */}
                        {areaData && (
                          <Link
                            href={`/stations/${slug}/areas/${areaData.slug}`}
                            className="group flex items-center justify-between p-3 rounded-lg transition-colors mt-auto"
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
                                <span className="text-xs text-[var(--color-ink-soft)] ml-1">高齢化率</span>
                              </div>
                              <div className="h-4 w-px bg-gray-300" />
                              <div>
                                <span className="text-xs text-[var(--color-ink-soft)]">人口</span>
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

                {/* serviceAreasにないがregionalDataにあるエリア */}
                {regionalData
                  .filter((r) => !serviceAreas.priority.cities.some((c) => c.name === r.name))
                  .map((areaData) => (
                    <div
                      key={areaData.slug}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col"
                    >
                      <div
                        className="h-2"
                        style={{ backgroundColor: areaData.theme.primary }}
                      />
                      <div className="p-4 md:p-5 flex flex-col flex-1">
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

                        <p className="text-sm text-[var(--color-ink-soft)] mb-4">
                          訪問可能エリアについてはお問い合わせください
                        </p>

                        <Link
                          href={`/stations/${slug}/areas/${areaData.slug}`}
                          className="group flex items-center justify-between p-3 rounded-lg transition-colors mt-auto"
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
                              <span className="text-xs text-[var(--color-ink-soft)] ml-1">高齢化率</span>
                            </div>
                            <div className="h-4 w-px bg-gray-300" />
                            <div>
                              <span className="text-xs text-[var(--color-ink-soft)]">人口</span>
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
      </section>
    </>
  );
}
