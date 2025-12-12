import { companyInfo, officeInfo } from "@/lib/data";
import BackgroundTriangles from "./BackgroundTriangles";

export default function Company() {
  return (
    <section id="company" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="company" />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        {/* 丸みを帯びた四角形で囲む */}
        <div className="section-card section-card-blue">
          {/* セクションタイトル */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-primary">
            会社情報
          </h2>

          {/* 会社情報テーブル - 白背景のカード */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-sm">
            <table className="w-full text-sm md:text-base">
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
          <div className="h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-sm">
            <iframe
              src={officeInfo.googleMapsUrl}
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
    </section>
  );
}
