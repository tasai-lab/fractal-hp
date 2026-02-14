import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { officeInfo, serviceAreas } from "@/lib/data";
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
                <div className="space-y-5 text-foreground">
                  {/* 事業所番号 */}
                  <div className="fractal-card bg-white/80 !p-4">
                    <span className="text-sm font-bold text-[var(--color-logo-dark-green)]">事業所番号</span>
                    <p className="text-2xl md:text-3xl font-bold text-primary tracking-wider mt-1">
                      {officeInfo.businessNumber}
                    </p>
                  </div>

                  {/* 営業時間 */}
                  <div className="fractal-card bg-white/80 !p-4">
                    <span className="text-sm font-bold text-[var(--color-logo-dark-green)]">営業時間</span>
                    <p className="text-lg mt-1">{officeInfo.hours}</p>
                  </div>

                  {/* 所在地 */}
                  <div className="fractal-card bg-white/80 !p-4">
                    <span className="text-sm font-bold text-[var(--color-logo-dark-green)]">所在地</span>
                    <p className="leading-relaxed mt-1">
                      〒{officeInfo.address.postalCode}
                      <br />
                      {officeInfo.address.prefecture}
                      {officeInfo.address.city}
                      {officeInfo.address.street} {officeInfo.address.building}
                    </p>
                  </div>

                  {/* お問い合わせ先 */}
                  <div className="fractal-card bg-white/80 !p-4">
                    <span className="text-sm font-bold text-[var(--color-logo-dark-green)]">お問い合わせ先</span>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white bg-[var(--color-logo-dark-green)] px-2 py-1 rounded text-sm min-w-[3.5rem] text-center">TEL</span>
                        <a
                          href={`tel:${officeInfo.phone.replace(/-/g, "")}`}
                          className="hover:underline font-bold text-xl md:text-2xl text-primary"
                        >
                          {officeInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white bg-[var(--color-logo-light-green)] px-2 py-1 rounded text-sm min-w-[3.5rem] text-center">FAX</span>
                        <span className="text-lg">{officeInfo.fax}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-[var(--color-logo-dark-green)] bg-[var(--color-logo-yellow)] px-2 py-1 rounded text-sm min-w-[3.5rem] text-center mt-1">Email</span>
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
            <h3 className="text-xl md:text-2xl font-bold text-center text-primary mb-2">船橋市・八千代市・習志野市の訪問エリア</h3>

            <div className="space-y-6 md:space-y-8">
              {/* 地図（上部） */}
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1]">
                <Image
                  src="/images/service-area/area-map.webp"
                  alt="フラクタル訪問看護 船橋 訪問エリアマップ - 船橋市・習志野市・八千代市・千葉市花見川区"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>

              {/* 訪問可能エリア */}
              <div>
                <h4 className="text-lg md:text-xl font-bold text-center text-primary mb-4 md:mb-6">訪問可能エリア</h4>
                {/* エリア詳細（2×2） */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {serviceAreas.priority.cities.map((city, index) => (
                    <div key={index} className="fractal-card bg-white/90 flex flex-col">
                      <h5 className="font-bold text-base md:text-lg mb-3 text-[var(--color-logo-dark-green)]">
                        {city.name}
                      </h5>
                      <ul className={`text-sm md:text-base flex-1 ${city.areas.length > 6 ? "grid grid-cols-2 gap-x-2 gap-y-1" : "space-y-1"}`}>
                        {city.areas.map((area, areaIndex) => (
                          <li key={areaIndex} className="flex items-start gap-1 md:gap-2">
                            <span className="text-[var(--color-logo-light-green)] mt-0.5">▸</span>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-muted text-right text-sm md:text-base mt-3">上記以外の地域も承ります。</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 注記 */}
              <div className="bg-white rounded-lg p-4 md:p-5 text-center shadow-sm">
                <p className="font-medium text-foreground text-sm md:text-base">
                  駐車場代・交通費は訪問可能エリア内であればいただきません。
                </p>
              </div>

              {/* チラシへの誘導ボタン */}
              <div className="text-center mt-4">
                <Link
                  href="/flyers"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-colors shadow-md group text-sm md:text-base"
                >
                  <span>訪問エリアを見る</span>
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
