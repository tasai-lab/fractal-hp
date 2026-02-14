import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "サイト更新情報 | フラクタル訪問看護 船橋",
  description: "フラクタル訪問看護 船橋のウェブサイト更新情報・お知らせ一覧です。",
};

// 更新情報データ
const updates = [
  {
    date: "2026-02-14",
    items: [
      { type: "new", title: "ケアマネージャー様向けページを新設", link: "/for-care-managers" },
      { type: "new", title: "医療機関様向けページを新設", link: "/for-medical-institutions" },
      { type: "new", title: "代表の取扱説明書ページを追加", link: "/company/ceo" },
      { type: "new", title: "地域別ページを追加（船橋・八千代・習志野・千葉市）", link: "/areas/funabashi" },
      { type: "improve", title: "フラクタルを知るページをリニューアル", link: "/fractal" },
      { type: "improve", title: "会社概要ページをリニューアル", link: "/company" },
      { type: "improve", title: "採用ページに職種タブを追加し統合", link: "/recruit#positions" },
      { type: "improve", title: "SEO対策を強化" },
    ],
  },
  {
    date: "2026-02-01",
    items: [
      { type: "new", title: "モデル年収情報を追加", link: "/recruit" },
      { type: "improve", title: "求人ページのSEO最適化", link: "/recruit" },
    ],
  },
  {
    date: "2026-01-25",
    items: [
      { type: "improve", title: "SEO対策を強化" },
      { type: "improve", title: "UIデザインを改善" },
    ],
  },
  {
    date: "2026-01-24",
    items: [
      { type: "improve", title: "デザインシステムの基盤整備" },
      { type: "improve", title: "レスポンシブデザインを改善" },
    ],
  },
  {
    date: "2025-12-12",
    items: [
      { type: "new", title: "Webサイトを公開" },
      { type: "new", title: "採用情報ページを追加", link: "/recruit" },
      { type: "new", title: "チラシ一覧ページを追加", link: "/flyers" },
    ],
  },
];

// タイプに応じたラベルとスタイル
const typeConfig = {
  new: {
    label: "新規",
    className: "bg-[var(--color-logo-light-green)] text-white",
  },
  improve: {
    label: "改善",
    className: "bg-[var(--color-logo-yellow)] text-[var(--color-ink)]",
  },
};

export default function UpdatesPage() {
  return (
    <>
      <Header />
      <main className="pt-14 lg:pt-20 bg-white min-h-screen">
        {/* ヘッダー */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold heading-gothic text-[var(--color-ink)] mb-4">
              サイト更新情報
            </h1>
            <p className="text-[var(--color-ink-soft)]">
              フラクタル訪問看護 船橋のウェブサイト更新情報
            </p>
          </div>
        </div>

        {/* 更新一覧 */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-10">
            {updates.map((update) => (
              <div key={update.date}>
                {/* 日付 */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-logo-dark-green)]" />
                  <h2 className="text-lg font-bold text-[var(--color-ink)]">
                    {update.date.replace(/-/g, ".")}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* 更新項目 */}
                <div className="space-y-2 ml-6">
                  {update.items.map((item, index) => {
                    const config = typeConfig[item.type as keyof typeof typeConfig];
                    return (
                      <div
                        key={index}
                        className="flex flex-wrap items-center gap-3 py-1"
                      >
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${config.className}`}
                        >
                          {config.label}
                        </span>
                        {item.link ? (
                          <Link
                            href={item.link}
                            className="inline-flex items-center gap-1 text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)]"
                          >
                            <span className="hover:underline">{item.title}</span>
                            {item.type === "new" && (
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                          </Link>
                        ) : (
                          <span className="text-[var(--color-ink)]">{item.title}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* トップへ戻る */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-logo-dark-green)] text-white rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              トップページへ戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
