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
      {
        type: "new",
        title: "ケアマネージャー様向けページを新設",
        description: "ケアマネージャーの皆様への情報を集約した専用ページを追加しました。",
        link: "/for-care-managers",
      },
      {
        type: "new",
        title: "医療機関様向けページを新設",
        description: "医療機関の皆様への情報を集約した専用ページを追加しました。",
        link: "/for-medical-institutions",
      },
      {
        type: "improve",
        title: "SEO対策を強化",
        description: "サイトマップの最適化、メタデータの改善を行いました。",
      },
      {
        type: "improve",
        title: "地域別ページを拡充",
        description: "船橋市・八千代市・習志野市・千葉市花見川区・千葉市稲毛区の地域情報を追加しました。",
        link: "/areas/funabashi",
      },
      {
        type: "new",
        title: "代表の取扱説明書ページを追加",
        description: "代表・浅井の強みや働き方についてご紹介するページを追加しました。",
        link: "/company/ceo",
      },
      {
        type: "improve",
        title: "フラクタルを知るページをリニューアル",
        description: "フラクタルの理念をインタラクティブに伝えるデザインに刷新しました。",
        link: "/fractal",
      },
      {
        type: "improve",
        title: "会社概要ページをリニューアル",
        description: "シンプルで和風なデザインに刷新しました。",
        link: "/company",
      },
      {
        type: "improve",
        title: "UIデザインを改善",
        description: "レスポンシブデザインの最適化、アニメーションの調整を行いました。",
      },
    ],
  },
  {
    date: "2026-02-01",
    items: [
      {
        type: "new",
        title: "看護師モデル年収情報を追加",
        description: "役職別4パターンのモデル年収を採用ページに追加しました。",
        link: "/recruit/nurse",
      },
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
  fix: {
    label: "修正",
    className: "bg-gray-200 text-gray-700",
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
          <div className="space-y-12">
            {updates.map((update) => (
              <div key={update.date}>
                {/* 日付 */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-logo-dark-green)]" />
                  <h2 className="text-xl font-bold text-[var(--color-ink)]">
                    {update.date.replace(/-/g, ".")}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* 更新項目 */}
                <div className="space-y-4 ml-6">
                  {update.items.map((item, index) => {
                    const config = typeConfig[item.type as keyof typeof typeConfig];
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-wrap items-start gap-3 mb-2">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${config.className}`}
                          >
                            {config.label}
                          </span>
                          <h3 className="text-lg font-bold text-[var(--color-ink)]">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[var(--color-ink-soft)] text-sm leading-relaxed mb-3">
                          {item.description}
                        </p>
                        {item.link && (
                          <Link
                            href={item.link}
                            className="inline-flex items-center text-sm font-medium text-[var(--color-logo-dark-green)] hover:underline"
                          >
                            詳しく見る
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
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
