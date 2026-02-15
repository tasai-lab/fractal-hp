import { companyInfo } from "@/lib/data";
import BackgroundTriangles from "./BackgroundTriangles";

export default function Company() {
  return (
    <section id="company" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="company" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">会社情報</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          {/* 丸みを帯びた四角形で囲む */}
          <div className="section-card section-card-blue">
            {/* 会社情報テーブル - 白背景のカード */}
            <div className="bg-white rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-sm">
              <table className="w-full text-base md:text-lg">
              <tbody className="space-y-4">
                <tr className="border-b border-gray-300">
                  <th className="text-left font-medium py-3 md:py-4 pr-4 md:pr-6 align-top whitespace-nowrap">
                    会社名
                  </th>
                  <td className="py-3 md:py-4">{companyInfo.name}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="text-left font-medium py-3 md:py-4 pr-4 md:pr-6 align-top whitespace-nowrap">
                    住所
                  </th>
                  <td className="py-3 md:py-4">{companyInfo.address.full}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="text-left font-medium py-3 md:py-4 pr-4 md:pr-6 align-top whitespace-nowrap">
                    代表取締役
                  </th>
                  <td className="py-3 md:py-4">{companyInfo.representative}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="text-left font-medium py-3 md:py-4 pr-4 md:pr-6 align-top whitespace-nowrap">
                    電話番号
                  </th>
                  <td className="py-3 md:py-4">
                    <a
                      href={`tel:${companyInfo.phone.replace(/-/g, "")}`}
                      className="hover:underline"
                    >
                      {companyInfo.phone}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th className="text-left font-medium py-3 md:py-4 pr-4 md:pr-6 align-top whitespace-nowrap">
                    営業時間
                  </th>
                  <td className="py-3 md:py-4">{companyInfo.hours}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Google Maps - 下部に配置 */}
          <div className="h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src={companyInfo.googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="会社所在地"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
