import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "サイト更新情報 | フラクタル訪問看護 船橋",
  description: "フラクタル訪問看護 船橋のウェブサイト更新情報・お知らせ一覧です。",
};

// 更新情報データ（コミット履歴より）
const updates = [
  {
    date: "2026-02-14",
    items: [
      { type: "new", title: "サイト更新情報ページを追加" },
      { type: "improve", title: "サイトマップを最適化" },
      { type: "fix", title: "住所を省略せず全て記述" },
      { type: "improve", title: "アイコンをSVGに統一" },
      { type: "improve", title: "B2Bページをパステル調カードデザインに変更" },
      { type: "new", title: "ケアマネージャー様向けページを新設", link: "/for-care-managers" },
      { type: "new", title: "医療機関様向けページを新設", link: "/for-medical-institutions" },
      { type: "improve", title: "SEO改善 - メタデータ・構造化データを強化" },
      { type: "improve", title: "地域情報リンクを追加" },
      { type: "improve", title: "訪問エリアボタンを各市への個別リンクに変更" },
      { type: "improve", title: "地域ページのサービスセクションを更新" },
      { type: "improve", title: "採用ページのモバイル下部メニューを追加" },
      { type: "new", title: "代表の取扱説明書ページを追加", link: "/company/ceo" },
      { type: "improve", title: "代表ページにクリフトンストレングス情報を追加" },
      { type: "improve", title: "会社概要ページをシンプルで和風なデザインにリニューアル", link: "/company" },
      { type: "improve", title: "フラクタルカードデザインを実装" },
      { type: "improve", title: "レスポンシブデザイン最適化とメニュー構造改善" },
      { type: "improve", title: "フラクタルとはページをインタラクティブにリデザイン", link: "/fractal" },
      { type: "improve", title: "Lighthouse改善 - 画像WebP化・フォント最適化" },
      { type: "new", title: "地域別ページを追加（船橋・八千代・習志野・千葉市）", link: "/areas/funabashi" },
      { type: "new", title: "グラフコンポーネントを実装" },
    ],
  },
  {
    date: "2026-02-01",
    items: [
      { type: "new", title: "看護師モデル年収を役職別4パターンで追加", link: "/recruit/nurse" },
      { type: "improve", title: "モデル年収UIをサイト雰囲気に合わせて再設計" },
      { type: "new", title: "リハビリ職モデル年収に詳細内訳を追加", link: "/recruit/therapist" },
      { type: "fix", title: "求人給与データを給与テーブル実データに最適化" },
      { type: "improve", title: "地域SEO最適化 - 包括的改善" },
      { type: "improve", title: "求人ページSEO最適化 - 地域名タイトル・構造化データ" },
      { type: "improve", title: "フラクタルを知るページUI再設計" },
      { type: "improve", title: "採用ページの1日の流れと職種情報を刷新", link: "/recruit/day-flow" },
    ],
  },
  {
    date: "2026-01-25",
    items: [
      { type: "improve", title: "SEO対策を強化 - H1タグ最適化" },
      { type: "improve", title: "FAQセクションをページ上に表示" },
      { type: "fix", title: "年間休日を職種別に修正" },
      { type: "improve", title: "フラクタルを知るページを大幅改善" },
      { type: "improve", title: "UIフィードバックに対応してデザインを改善" },
      { type: "new", title: "チラシデータにorientationフィールドを追加" },
    ],
  },
  {
    date: "2026-01-24",
    items: [
      { type: "improve", title: "全ページにfluid値を適用してレスポンシブ改善" },
      { type: "improve", title: "求人ページをカード化してエメラルド系に変更", link: "/recruit" },
      { type: "improve", title: "フラクタルを知るページにロゴ3色を配置" },
      { type: "new", title: "デザインシステムの基盤整備を完了" },
    ],
  },
  {
    date: "2025-12-14",
    items: [
      { type: "improve", title: "モバイルテキストサイズ更新とUI可読性向上" },
    ],
  },
  {
    date: "2025-12-13",
    items: [
      { type: "improve", title: "ファビコンをロゴに更新" },
      { type: "improve", title: "サイトマップボタンを三角形デザインに変更" },
      { type: "new", title: "訪問エリアボタンとスタッフ紹介を追加" },
      { type: "improve", title: "ヘッダーレイアウトとナビゲーションを改善" },
      { type: "improve", title: "訪問エリア画像追加、フォント変更、ヘッダーロゴ拡大" },
      { type: "improve", title: "DAPAEセクションのレイアウト改善" },
    ],
  },
  {
    date: "2025-12-12",
    items: [
      { type: "new", title: "SEO対策とGoogle Analytics/Search Console対応" },
      { type: "improve", title: "リクルートセクションの祝い金表示を改善" },
      { type: "improve", title: "ご利用開始までの流れのデザイン改善" },
      { type: "improve", title: "DAPAEフレームワークの詳細説明を追加" },
      { type: "improve", title: "Heroアニメーションを追加" },
      { type: "new", title: "採用ページ祝い金表示統一とスタッフ紹介モーダル追加" },
      { type: "improve", title: "採用情報ページのモバイルUI最適化" },
      { type: "improve", title: "トップページコンポーネントのモバイルUI最適化" },
      { type: "new", title: "求人ページとフラクタルを知るページを追加" },
      { type: "new", title: "チラシバックナンバーページ追加", link: "/flyers" },
      { type: "improve", title: "レスポンシブデザイン対応とスタッフ写真追加" },
      { type: "new", title: "フラクタル訪問看護 船橋 Webサイト初期実装" },
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
                <div className="space-y-3 ml-6">
                  {update.items.map((item, index) => {
                    const config = typeConfig[item.type as keyof typeof typeConfig];
                    return (
                      <div
                        key={index}
                        className="flex flex-wrap items-center gap-3 py-2"
                      >
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${config.className}`}
                        >
                          {config.label}
                        </span>
                        {item.link ? (
                          <Link
                            href={item.link}
                            className="text-[var(--color-ink)] hover:text-[var(--color-logo-dark-green)] hover:underline"
                          >
                            {item.title}
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
