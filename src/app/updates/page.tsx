import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { updates, typeConfig } from "@/lib/updates-data";

export const metadata: Metadata = {
  title: "アップデート情報 | フラクタル訪問看護 船橋",
  description: "フラクタル訪問看護 船橋のホームページ更新履歴。新規ページ追加・機能改善・デザイン変更など、最新情報をお届けします。船橋市・八千代市・習志野市の訪問看護ステーション。",
  alternates: {
    canonical: "/updates",
  },
  openGraph: {
    title: "アップデート情報 | フラクタル訪問看護 船橋",
    description: "フラクタル訪問看護 船橋のホームページ更新履歴。新規ページ追加・機能改善・デザイン変更など、最新情報をお届けします。",
    url: "https://fractal-hokan.com/updates",
    images: [{ url: "/images/ogp/ogp-image.png", width: 1200, height: 630 }],
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
              アップデート情報
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/recruit/johnny.png"
                  alt="ジョニー"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <p className="text-[var(--color-ink-soft)]">
                ホームページだってDAPAEで成長してるよ <span className="text-xs">by ジョニー</span>
              </p>
            </div>
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
                    const config = typeConfig[item.type];
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
