import { officeInfo, navLinks } from "@/lib/data";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-8 md:py-12 text-white"
      style={{ background: "#1a1a1a" }}
    >
      <div className="section-container">
        {/* ロゴとタイトル（上部中央） */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
          {/* ロゴ画像（白色） */}
          <Image
            src="/images/logos/hokan-logo.png"
            alt="フラクタルロゴ"
            width={60}
            height={60}
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] brightness-0 invert"
          />
          {/* タイトル画像（白色） */}
          <Image
            src="/images/logos/hokan-title.png"
            alt="フラクタル訪問看護 船橋"
            width={200}
            height={50}
            className="h-8 md:h-12 w-auto brightness-0 invert"
          />
        </div>

        {/* 事業所情報とナビゲーション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* 事業所情報 */}
          <div>
            <h3 className="font-bold mb-3 md:mb-4 text-lg md:text-xl">事業所情報</h3>
            <div className="space-y-2 text-sm md:text-base opacity-90">
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

          {/* ナビゲーションリンク */}
          <div>
            <h3 className="font-bold mb-3 md:mb-4 text-lg md:text-xl">サイトマップ</h3>
            <nav className="grid grid-cols-2 gap-2 text-sm md:text-base">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="opacity-90 hover:opacity-100 hover:underline transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-700 pt-4 md:pt-6 text-center text-sm md:text-base opacity-75">
          <p>&copy; 2024 株式会社フラクタル All Rights Reserved.</p>
        </div>

        {/* モバイル下部メニュー分の余白 */}
        <div className="h-16 lg:hidden"></div>
      </div>
    </footer>
  );
}
