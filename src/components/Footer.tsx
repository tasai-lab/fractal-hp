import { officeInfo, footerSitemap } from "@/lib/data";
import { getActiveStations } from "@/lib/stations-data";
import { regionalData } from "@/lib/regional-data";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const stations = getActiveStations();

  return (
    <footer
      className="py-8 md:py-12 text-white"
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
            src="/images/logos/hokan-title.png"
            alt="フラクタル訪問看護 船橋"
            width={200}
            height={50}
            className="h-8 md:h-12 w-auto brightness-0 invert"
          />
        </div>

        {/* メインコンテンツ: 4カラム */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* 事業所情報 */}
          <div>
            <h3 className="font-bold mb-3 text-base md:text-lg">事業所情報</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p>{officeInfo.address.full}</p>
              <p>
                電話:{" "}
                <a
                  href={`tel:${officeInfo.phone.replace(/-/g, "")}`}
                  className="hover:underline"
                >
                  {officeInfo.phone}
                </a>
              </p>
              <p>営業時間: {officeInfo.hours}</p>
              <p>
                メール:{" "}
                <a
                  href={`mailto:${officeInfo.email}`}
                  className="hover:underline break-all"
                >
                  {officeInfo.email}
                </a>
              </p>
            </div>
          </div>

          {/* 事業所・訪問エリア */}
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
                    {regionalData
                      .filter((area) => station.serviceAreaSlugs.includes(area.slug))
                      .map((area) => (
                        <Link
                          key={area.slug}
                          href={`/stations/${station.slug}/areas/${area.slug}`}
                          className="block hover:opacity-100 hover:underline transition-opacity"
                        >
                          {area.name}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* サービス案内 */}
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

          {/* 会社情報・採用 */}
          <div className="space-y-5">
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
