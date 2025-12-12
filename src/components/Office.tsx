import { officeInfo } from "@/lib/data";
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

        <div className="section-content">
          {/* 事業所情報カード - 丸みを帯びた四角形で囲む */}
          <div className="section-card section-card-blue">
            {/* フラクタルロゴ（SVG三角形）- 中央配置 */}
            <div className="flex justify-center mb-8">
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                className="flex-shrink-0"
              >
                <polygon
                  points="50,10 90,80 10,80"
                  fill="var(--color-primary)"
                />
                <polygon
                  points="50,10 70,45 30,45"
                  fill="var(--color-accent-blue)"
                />
              </svg>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* 左側：テキスト情報 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-6">
                    {officeInfo.name}
                  </h3>

                  <div className="space-y-3 text-foreground">
                    <div className="flex gap-2">
                      <span className="font-medium min-w-[6rem]">事業所番号:</span>
                      <span>{officeInfo.businessNumber}</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="font-medium min-w-[6rem]">営業時間:</span>
                      <div>
                        <div>看護: {officeInfo.hours.nursing}</div>
                        <div>リハビリ: {officeInfo.hours.rehabilitation}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <span className="font-medium min-w-[6rem]">住所:</span>
                      <span>{officeInfo.address.full}</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="font-medium min-w-[6rem]">電話:</span>
                      <a
                        href={`tel:${officeInfo.phone.replace(/-/g, "")}`}
                        className="hover:underline"
                      >
                        {officeInfo.phone}
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <span className="font-medium min-w-[6rem]">FAX:</span>
                      <span>{officeInfo.fax}</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="font-medium min-w-[6rem]">メール:</span>
                      <a
                        href={`mailto:${officeInfo.email}`}
                        className="hover:underline break-all"
                      >
                        {officeInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右側：Google Maps */}
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
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
        </div>
      </div>
    </section>
  );
}
