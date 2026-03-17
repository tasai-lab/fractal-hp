import Link from "next/link";
import { getActiveStations } from "@/lib/stations-data";
import { serviceAreas } from "@/lib/data";
export default function StationsOverview() {
  const stations = getActiveStations();

  return (
    <section
      id="stations"
      className="section-wrapper bg-white relative"
    >
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">事業所紹介</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="space-y-8">
            {stations.map((station) => {
              const { officeInfo } = station;

              return (
                <div key={station.slug}>
                  <div className="section-card section-card-blue">
                    <h3 className="text-lg md:text-xl font-bold text-left text-primary mb-4 md:mb-6">
                      {officeInfo.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* 左側：テキスト情報 */}
                      <div className="space-y-5">
                        <div className="space-y-4 text-foreground">
                          {/* 事業所番号 */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1 h-5 bg-primary rounded-full" />
                              <span className="font-bold text-sm md:text-base">事業所番号</span>
                            </div>
                            <p className="pl-3 text-lg md:text-xl font-bold text-primary tracking-wider">
                              {officeInfo.businessNumber}
                            </p>
                          </div>

                          {/* 営業時間 */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1 h-5 bg-primary rounded-full" />
                              <span className="font-bold text-sm md:text-base">営業時間</span>
                            </div>
                            <p className="pl-3 text-sm md:text-base">{officeInfo.hours}</p>
                          </div>

                          {/* 所在地 */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1 h-5 bg-primary rounded-full" />
                              <span className="font-bold text-sm md:text-base">所在地</span>
                            </div>
                            <p className="pl-3 text-sm md:text-base leading-relaxed">
                              〒{officeInfo.address.postalCode}
                              <br />
                              {officeInfo.address.prefecture}
                              {officeInfo.address.city}
                              {officeInfo.address.street} {officeInfo.address.building}
                            </p>
                          </div>

                          {/* お問い合わせ先 */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1 h-5 bg-primary rounded-full" />
                              <span className="font-bold text-sm md:text-base">お問い合わせ先</span>
                            </div>
                            <div className="pl-3 mt-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-muted bg-white px-2 py-0.5 rounded text-xs min-w-[3rem] text-center">
                                  TEL
                                </span>
                                <a
                                  href={`tel:${officeInfo.phone.replace(/-/g, "")}`}
                                  className="hover:underline font-bold text-base md:text-lg text-primary"
                                >
                                  {officeInfo.phone}
                                </a>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-muted bg-white px-2 py-0.5 rounded text-xs min-w-[3rem] text-center">
                                  FAX
                                </span>
                                <span className="text-sm md:text-base">{officeInfo.fax}</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <span className="font-bold text-muted bg-white px-2 py-0.5 rounded text-xs min-w-[3rem] text-center mt-0.5">
                                  Email
                                </span>
                                <a
                                  href={`mailto:${officeInfo.email}`}
                                  className="hover:underline break-all text-sm md:text-base"
                                >
                                  {officeInfo.email}
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* 訪問エリア */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1 h-5 bg-primary rounded-full" />
                              <span className="font-bold text-sm md:text-base">訪問エリア</span>
                            </div>
                            <div className="pl-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                              {serviceAreas.priority.cities.map((city) => (
                                <div key={city.name} className="bg-white rounded-xl p-3 shadow-sm">
                                  <h4 className="text-sm font-bold text-[var(--color-logo-dark-green)] heading-gothic mb-2">
                                    {city.name}
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {city.areas.map((area) => (
                                      <span
                                        key={area}
                                        className="inline-block px-2 py-0.5 text-xs rounded-full bg-[var(--color-logo-light-green)]/15 text-[var(--color-logo-dark-green)]"
                                      >
                                        {area}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 右側：Google Maps */}
                      {officeInfo.googleMapsUrl && (
                        <div className="h-[200px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg">
                          <iframe
                            src={officeInfo.googleMapsUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`${officeInfo.name}の所在地`}
                          />
                        </div>
                      )}
                    </div>

                    {/* 詳しく見るリンク */}
                    <div className="mt-6 pt-6 border-t border-[var(--color-accent-blue-light)]">
                      <Link
                        href={`/stations/${station.slug}/`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] font-bold text-sm md:text-base hover:bg-[var(--color-logo-light-green)]/20 transition-colors"
                      >
                        {station.name}の詳細を見る
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
