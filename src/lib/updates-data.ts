// 更新情報データ（共通化）
export interface UpdateItem {
  type: "new" | "improve";
  title: string;
  link?: string;
}

export interface Update {
  date: string;
  items: UpdateItem[];
}

export const updates: Update[] = [
  {
    date: "2026-02-22",
    items: [
      { type: "new", title: "千葉市美浜区の訪問看護ページを追加", link: "/areas/chiba-mihama" },
      { type: "improve", title: "各ページのSEO・メタデータを改善" },
    ],
  },
  {
    date: "2026-02-19",
    items: [
      { type: "new", title: "ご利用料金ページを新設", link: "/pricing" },
      { type: "improve", title: "SEOタイトル・メタデータを最適化" },
      { type: "improve", title: "ヘッダーナビ・フッターに料金ページリンクを追加" },
    ],
  },
  {
    date: "2026-02-16",
    items: [
      { type: "new", title: "更新情報ポップアップ通知機能を追加", link: "/updates" },
      { type: "new", title: "トップページに固定求人バナーを追加", link: "/" },
      { type: "improve", title: "メニュー名称を「フラクタルの意味」に変更", link: "/fractal" },
      { type: "improve", title: "代表ページの内容を更新", link: "/company/ceo" },
      { type: "improve", title: "会社ページDAPAEセクションを改善", link: "/company" },
    ],
  },
  {
    date: "2026-02-15",
    items: [
      { type: "new", title: "訪問エリア一覧ページを新設", link: "/areas" },
      { type: "improve", title: "トップページの訪問エリアセクションを改善", link: "/#service-area" },
      { type: "improve", title: "ご利用の流れにケアマネ・医療機関向けリンクを追加", link: "/#flow" },
      { type: "improve", title: "会社概要ページに会社情報を追加", link: "/company" },
      { type: "improve", title: "UIデザインの統一性を向上" },
    ],
  },
  {
    date: "2026-02-14",
    items: [
      { type: "new", title: "アップデート情報ページを新設", link: "/updates" },
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
export const typeConfig = {
  new: {
    label: "新規",
    className: "bg-[var(--color-logo-light-green)] text-white",
  },
  improve: {
    label: "改善",
    className: "bg-[var(--color-logo-yellow)] text-[var(--color-ink)]",
  },
};

// 最新の更新日付を取得
export const getLatestUpdateDate = (): string => {
  return updates[0]?.date || "";
};
