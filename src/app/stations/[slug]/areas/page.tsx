import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import PageHero from "@/components/PageHero";

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
      <section className="relative">

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

                        {/* 統計グリッド */}
                        {areaData && (
                          <div className="border-t border-gray-100 pt-3">
                            <div className="grid grid-cols-4 gap-2 mb-2">
                              <div className="text-center">
                                <p
                                  className="text-xs font-bold leading-tight"
                                  style={{ color: areaData.theme.primary }}
                                >
                                  {areaData.population.total}
                                </p>
                                <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">総人口</p>
                              </div>
                              <div className="text-center">
                                <p
                                  className="text-xs font-bold leading-tight"
                                  style={{ color: areaData.theme.primary }}
                                >
                                  {areaData.population.elderlyRate}
                                </p>
                                <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">高齢化率</p>
                              </div>
                              <div className="text-center">
                                <p
                                  className="text-xs font-bold leading-tight"
                                  style={{ color: areaData.theme.primary }}
                                >
                                  {areaData.population.elderly}
                                </p>
                                <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">高齢者人口</p>
                              </div>
                              <div className="text-center">
                                <p
                                  className="text-xs font-bold leading-tight"
                                  style={{ color: areaData.theme.primary }}
                                >
                                  {areaData.population.youngRate}
                                </p>
                                <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">年少人口率</p>
                              </div>
                            </div>

                            {/* 実績グリッド */}
                            {areaData.areaStats && (
                              <div
                                className="grid grid-cols-2 gap-2 mt-2 rounded-lg p-2"
                                style={{ backgroundColor: `${areaData.theme.primary}10` }}
                              >
                                <div className="text-center">
                                  <p
                                    className="text-sm font-bold"
                                    style={{ color: areaData.theme.primary }}
                                  >
                                    {areaData.areaStats.patients}名
                                  </p>
                                  <p className="text-[10px] text-[var(--color-ink-soft)]">利用者数</p>
                                </div>
                                <div className="text-center">
                                  <p
                                    className="text-sm font-bold"
                                    style={{ color: areaData.theme.primary }}
                                  >
                                    {areaData.areaStats.monthlyVisits}件
                                  </p>
                                  <p className="text-[10px] text-[var(--color-ink-soft)]">月間訪問数</p>
                                </div>
                              </div>
                            )}
                          </div>
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

                        {/* 統計グリッド */}
                        <div className="border-t border-gray-100 pt-3">
                          <div className="grid grid-cols-4 gap-2 mb-2">
                            <div className="text-center">
                              <p
                                className="text-xs font-bold leading-tight"
                                style={{ color: areaData.theme.primary }}
                              >
                                {areaData.population.total}
                              </p>
                              <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">総人口</p>
                            </div>
                            <div className="text-center">
                              <p
                                className="text-xs font-bold leading-tight"
                                style={{ color: areaData.theme.primary }}
                              >
                                {areaData.population.elderlyRate}
                              </p>
                              <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">高齢化率</p>
                            </div>
                            <div className="text-center">
                              <p
                                className="text-xs font-bold leading-tight"
                                style={{ color: areaData.theme.primary }}
                              >
                                {areaData.population.elderly}
                              </p>
                              <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">高齢者人口</p>
                            </div>
                            <div className="text-center">
                              <p
                                className="text-xs font-bold leading-tight"
                                style={{ color: areaData.theme.primary }}
                              >
                                {areaData.population.youngRate}
                              </p>
                              <p className="text-[10px] text-[var(--color-ink-soft)] mt-0.5">年少人口率</p>
                            </div>
                          </div>

                          {/* 実績グリッド */}
                          {areaData.areaStats && (
                            <div
                              className="grid grid-cols-2 gap-2 mt-2 rounded-lg p-2"
                              style={{ backgroundColor: `${areaData.theme.primary}10` }}
                            >
                              <div className="text-center">
                                <p
                                  className="text-sm font-bold"
                                  style={{ color: areaData.theme.primary }}
                                >
                                  {areaData.areaStats.patients}名
                                </p>
                                <p className="text-[10px] text-[var(--color-ink-soft)]">利用者数</p>
                              </div>
                              <div className="text-center">
                                <p
                                  className="text-sm font-bold"
                                  style={{ color: areaData.theme.primary }}
                                >
                                  {areaData.areaStats.monthlyVisits}件
                                </p>
                                <p className="text-[10px] text-[var(--color-ink-soft)]">月間訪問数</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
          </div>
        </div>
      </section>
    </>
  );
}
