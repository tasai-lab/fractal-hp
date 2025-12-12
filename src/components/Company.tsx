import { companyInfo, officeInfo } from "@/lib/data";

export default function Company() {
  return (
    <section id="company" className="py-20 relative overflow-hidden">
      <div className="section-container">
        {/* セクションタイトル - 中央配置・下線付き */}
        <h2 className="text-3xl font-bold text-center mb-12 pb-4 inline-block" style={{
          color: "var(--color-primary)",
          borderBottom: "4px solid var(--color-primary)",
          display: "block",
          width: "fit-content",
          margin: "0 auto 3rem"
        }}>
          会社情報
        </h2>

        {/* 会社情報テーブル - 水色背景のカード */}
        <div className="card card-blue mb-8">
          <table className="w-full">
            <tbody className="space-y-4">
              <tr className="border-b border-gray-300">
                <th className="text-left font-medium py-4 pr-6 align-top whitespace-nowrap">
                  会社名
                </th>
                <td className="py-4">{companyInfo.name}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="text-left font-medium py-4 pr-6 align-top whitespace-nowrap">
                  住所
                </th>
                <td className="py-4">{companyInfo.address.full}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="text-left font-medium py-4 pr-6 align-top whitespace-nowrap">
                  代表取締役
                </th>
                <td className="py-4">{companyInfo.representative}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="text-left font-medium py-4 pr-6 align-top whitespace-nowrap">
                  電話番号
                </th>
                <td className="py-4">
                  <a
                    href={`tel:${companyInfo.phone.replace(/-/g, "")}`}
                    className="hover:underline"
                  >
                    {companyInfo.phone}
                  </a>
                </td>
              </tr>
              <tr>
                <th className="text-left font-medium py-4 pr-6 align-top whitespace-nowrap">
                  営業時間
                </th>
                <td className="py-4">{companyInfo.hours}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Google Maps - 下部に配置 */}
        <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
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
    </section>
  );
}
