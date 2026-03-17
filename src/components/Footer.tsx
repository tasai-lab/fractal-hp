import { companyInfo, footerSitemap, otherMenuCategories } from "@/lib/data";
import { getActiveStations } from "@/lib/stations-data";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const stations = getActiveStations();

  return (
    <footer
      className="relative z-[2] py-8 md:py-12 text-white"
      style={{ background: "#1a1a1a" }}
    >
      <div className="section-container">
        {/* ロゴとタイトル（上部中央） */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
          <Image
            src="/images/logos/hokan-logo.png"
            alt="フラクタルロゴ"
            width={60}
            height={60}
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] brightness-0 invert"
          />
          <Image
            src="/images/logos/hokan-title-corporate.png"
            alt="フラクタル訪問看護"
            width={200}
            height={50}
            className="h-8 md:h-12 w-auto brightness-0 invert"
          />
        </div>

        {/* メインコンテンツ: 4カラム */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* カラム1: 会社情報 */}
          <div>
            <h3 className="font-bold mb-3 text-base md:text-lg">{companyInfo.name}</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p>{companyInfo.address.full}</p>
              <p>
                電話:{" "}
                <a
                  href={`tel:${companyInfo.phone.replace(/-/g, "")}`}
                  className="hover:underline"
                >
                  {companyInfo.phone}
                </a>
              </p>
              <p>営業時間: {companyInfo.hours}</p>
            </div>
          </div>

          {/* カラム2: 事業所・訪問エリア */}
          <div>
            <h3 className="font-bold mb-3 text-base md:text-lg">事業所・訪問エリア</h3>
            <nav className="text-sm space-y-1.5">
              <Link
                href="/stations"
                className="block opacity-90 hover:opacity-100 hover:underline transition-opacity font-medium"
              >
                事業所一覧
              </Link>
              {stations.map((station) => (
                <div key={station.slug}>
                  <Link
                    href={`/stations/${station.slug}`}
                    className="block opacity-90 hover:opacity-100 hover:underline transition-opacity font-medium"
                  >
                    {station.name}
                  </Link>
                  <div className="pl-3 mt-1 space-y-0.5 text-xs opacity-75">
                    <Link
                      href={`/stations/${station.slug}/areas`}
                      className="block hover:opacity-100 hover:underline transition-opacity"
                    >
                      対応エリア
                    </Link>
                    <Link
                      href={`/stations/${station.slug}/documents`}
                      className="block hover:opacity-100 hover:underline transition-opacity"
                    >
                      各種書類
                    </Link>
                    <Link
                      href={`/stations/${station.slug}/recruit`}
                      className="block hover:opacity-100 hover:underline transition-opacity"
                    >
                      採用情報
                    </Link>
                    <Link
                      href={`/stations/${station.slug}/flyers`}
                      className="block hover:opacity-100 hover:underline transition-opacity"
                    >
                      チラシ
                    </Link>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* カラム3: サービス案内 */}
          <div>
            <h3 className="font-bold mb-3 text-base md:text-lg">{footerSitemap.service.title}</h3>
            <nav className="text-sm space-y-1.5">
              {footerSitemap.service.items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block opacity-90 hover:opacity-100 hover:underline transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* カラム4: 採用・その他 */}
          <div className="space-y-5">
            <div>
              <h3 className="font-bold mb-3 text-base md:text-lg">{footerSitemap.recruit.title}</h3>
              <nav className="text-sm space-y-1.5">
                {footerSitemap.recruit.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block opacity-90 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-base md:text-lg">{footerSitemap.company.title}</h3>
              <nav className="text-sm space-y-1.5">
                {footerSitemap.company.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block opacity-90 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-base md:text-lg">{otherMenuCategories.external.title}</h3>
              <nav className="text-sm space-y-1.5">
                {otherMenuCategories.external.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block opacity-90 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-base md:text-lg">{footerSitemap.site.title}</h3>
              <nav className="text-sm space-y-1.5">
                {footerSitemap.site.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block opacity-90 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-700 pt-4 md:pt-6 text-center text-sm md:text-base opacity-75">
          <p>&copy; 2025 株式会社フラクタル All Rights Reserved.</p>
        </div>

        {/* モバイル下部メニュー分の余白 */}
        <div className="h-16 lg:hidden"></div>
      </div>
    </footer>
  );
}
