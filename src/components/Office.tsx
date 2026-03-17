import Image from "next/image";
import { officeInfo, serviceAreas } from "@/lib/data";
import { regionalData } from "@/lib/regional-data";
import CityAreaCard from "@/components/station/CityAreaCard";
export default function Office() {
  return (
    <section id="office" className="section-wrapper bg-white relative">
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
              {serviceAreas.priority.cities.map((city) => {
                const areaData = regionalData.find((r) => r.name === city.name);
                return (
                  <CityAreaCard
                    key={city.name}
                    city={city}
                    areaData={areaData}
                    detailHref={areaData ? `/stations/funabashi/areas/${areaData.slug}` : undefined}
                  />
                );
              })}

              {/* 千葉市稲毛区（serviceAreasにないがregionalDataにある） */}
              {regionalData
                .filter((r) => !serviceAreas.priority.cities.some((c) => c.name === r.name))
                .map((areaData) => (
                  <CityAreaCard
                    key={areaData.slug}
                    city={{ name: areaData.name, areas: [] }}
                    areaData={areaData}
                    detailHref={`/stations/funabashi/areas/${areaData.slug}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
