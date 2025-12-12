import { officeInfo, serviceAreas } from "@/lib/data";
import BackgroundTriangles from "./BackgroundTriangles";

export default function Office() {
  return (
    <section id="office" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="office" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">事業所情報</h2>
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
              <div className="h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
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
          <div id="service-area" className="section-card section-card-mint">
            {/* タイトル */}
            <h3 className="text-xl md:text-2xl font-bold text-center text-primary mb-6 md:mb-8">訪問エリア</h3>

            <div className="space-y-6 md:space-y-8">
              {/* 地図（上部） */}
              <div className="bg-white rounded-xl p-4 md:p-6 h-[200px] md:h-[300px] flex items-center justify-center shadow-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-muted mb-4">
                    訪問エリア地図
                  </div>
                  <div className="space-y-2 text-muted">
                    <p>船橋市 / 習志野市 / 八千代市</p>
                    <p>千葉市花見川区</p>
                    <p className="text-sm mt-3">及び周辺エリア</p>
                  </div>
                </div>
              </div>

              {/* エリア詳細（下部 2×2） */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {serviceAreas.priority.cities.map((city, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 md:p-4 shadow-sm flex flex-col">
                    <h5 className="font-bold text-sm md:text-base mb-2 text-primary">
                      {city.name}
                    </h5>
                    <ul className={`text-xs md:text-sm flex-1 ${city.areas.length > 6 ? "grid grid-cols-2 gap-x-2 gap-y-1" : "space-y-1"}`}>
                      {city.areas.map((area, areaIndex) => (
                        <li key={areaIndex} className="flex items-start gap-1 md:gap-2">
                          <span className="text-accent-pink mt-0.5">▸</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted text-right text-xs md:text-sm mt-2">上記以外の地域も承ります。</p>
                  </div>
                ))}
              </div>

              {/* 注記 */}
              <div className="bg-white rounded-lg p-4 md:p-5 text-center shadow-sm">
                <p className="font-medium text-foreground text-sm md:text-base">
                  駐車場代・交通費は訪問可能エリア内であればいただきません。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
