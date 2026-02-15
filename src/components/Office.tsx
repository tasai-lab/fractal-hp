import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { officeInfo, serviceAreas } from "@/lib/data";
import { regionalData } from "@/lib/regional-data";
import BackgroundTriangles from "./BackgroundTriangles";

export default function Office() {
  return (
    <section id="office" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="office" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">船橋市の訪問看護ステーション</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content space-y-12">
          {/* 事業所情報カード */}
          <div className="section-card section-card-blue">
            {/* フラクタル訪問看護 船橋 タイトル */}
            <h3 className="text-xl md:text-2xl font-bold text-left text-primary mb-6 md:mb-8">
              {officeInfo.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* 左側：テキスト情報 */}
              <div className="space-y-8">
                <div className="space-y-6 text-foreground">
                  {/* 事業所番号 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      <span className="font-bold text-lg">事業所番号</span>
                    </div>
                    <p className="pl-3 text-2xl md:text-3xl font-bold text-primary tracking-wider">
                      {officeInfo.businessNumber}
                    </p>
                  </div>

                  {/* 営業時間 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      <span className="font-bold text-lg">営業時間</span>
                    </div>
                    <p className="pl-3 text-lg">{officeInfo.hours}</p>
                  </div>

                  {/* 所在地 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      <span className="font-bold text-lg">所在地</span>
                    </div>
                    <p className="pl-3 leading-relaxed">
                      〒{officeInfo.address.postalCode}
                      <br />
                      {officeInfo.address.prefecture}
                      {officeInfo.address.city}
                      {officeInfo.address.street} {officeInfo.address.building}
                    </p>
                  </div>

                  {/* お問い合わせ先 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      <span className="font-bold text-lg">お問い合わせ先</span>
                    </div>
                    <div className="pl-3 mt-2 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center">TEL</span>
                        <a
                          href={`tel:${officeInfo.phone.replace(/-/g, "")}`}
                          className="hover:underline font-bold text-xl md:text-2xl text-primary"
                        >
                          {officeInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center">FAX</span>
                        <span className="text-lg">{officeInfo.fax}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center mt-1">Email</span>
                        <a
                          href={`mailto:${officeInfo.email}`}
                          className="hover:underline break-all text-base md:text-lg mt-0.5"
                        >
                          {officeInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右側：Google Maps */}
              <div className="h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={officeInfo.googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="フラクタル訪問看護 船橋の所在地"
                ></iframe>
              </div>
            </div>
          </div>

          {/* 訪問エリアカード */}
          <div id="service-area" className="section-card section-card-mint space-y-8">
            {/* タイトル */}
            <h3 className="text-xl md:text-2xl font-bold text-center text-primary">訪問エリア</h3>

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
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
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
  );
}
