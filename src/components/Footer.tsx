import { officeInfo, navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="py-12 text-white"
      style={{ background: "#1a1a1a" }}
    >
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* ロゴセクション */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              {/* フラクタル三角形ロゴ */}
              <svg
                width="60"
                height="60"
                viewBox="0 0 100 100"
                className="flex-shrink-0"
              >
                <polygon
                  points="50,10 90,80 10,80"
                  fill="white"
                />
                <polygon
                  points="50,10 70,45 30,45"
                  fill="var(--color-accent-blue)"
                />
              </svg>
              <div>
                <div className="text-xl font-bold">フラクタル</div>
                <div className="text-sm opacity-90">訪問看護 船橋</div>
              </div>
            </div>
          </div>

          {/* 事業所情報 */}
          <div>
            <h3 className="font-bold mb-4 text-lg">事業所情報</h3>
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
              <p>営業時間: {officeInfo.hours.nursing}</p>
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
            <h3 className="font-bold mb-4 text-lg">サイトマップ</h3>
            <nav className="grid grid-cols-2 gap-2 text-sm">
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
        <div className="border-t border-gray-700 pt-6 text-center text-sm opacity-75">
          <p>&copy; 2024 株式会社フラクタル All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
