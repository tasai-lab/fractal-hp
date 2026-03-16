import type { StationData } from "@/lib/stations-data";

type Props = { station: StationData };

export default function StationOfficeInfo({ station }: Props) {
  const { officeInfo } = station;

  return (
    <section id="office" className="section-wrapper bg-white relative">
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">事業所情報</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          {/* 事業所情報カード */}
          <div className="section-card section-card-blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* 左側：テキスト情報 */}
              <div className="space-y-6 text-foreground">
                {/* 事業所番号 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    <span className="font-bold text-lg">事業所番号</span>
                  </div>
                  <p className="pl-3 text-2xl md:text-3xl font-bold text-primary tracking-wider">
                    {officeInfo.businessNumber}
                  </p>
                </div>

                {/* 営業時間 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    <span className="font-bold text-lg">営業時間</span>
                  </div>
                  <p className="pl-3 text-lg">{officeInfo.hours}</p>
                </div>

                {/* 所在地 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-primary rounded-full" />
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
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    <span className="font-bold text-lg">お問い合わせ先</span>
                  </div>
                  <div className="pl-3 mt-2 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center">
                        TEL
                      </span>
                      <a
                        href={`tel:${officeInfo.phone.replace(/-/g, "")}`}
                        className="hover:underline font-bold text-xl md:text-2xl text-primary"
                      >
                        {officeInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center">
                        FAX
                      </span>
                      <span className="text-lg">{officeInfo.fax}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-muted bg-white px-2 py-1 rounded text-sm min-w-[3.5rem] text-center mt-1">
                        Email
                      </span>
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

              {/* 右側：Google Maps */}
              {officeInfo.googleMapsUrl && (
                <div className="h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
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
          </div>

        </div>
      </div>
    </section>
  );
}
