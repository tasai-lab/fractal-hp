import { MetadataRoute } from "next";
import { recruitAreas } from "@/lib/recruit-areas";
import { regionalData } from "@/lib/regional-data";

export const dynamic = "force-static";

// コンテンツ更新時にそのページの lastModified 日付を更新すること
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fractal-hokan.com";
  const weekly = "weekly" as const;
  const monthly = "monthly" as const;

  // 頻繁に更新されるページは実際のコンテンツ更新日を設定
  const topPageUpdated = new Date("2026-03-04");
  const recruitUpdated = new Date("2026-03-04");
  const areasUpdated = new Date("2026-02-25");
  const b2bUpdated = new Date("2026-02-25");
  const companyUpdated = new Date("2026-02-25");
  const staticUpdated = new Date("2026-02-25");

  return [
    // === トップページ（最重要）===
    {
      url: baseUrl,
      lastModified: topPageUpdated,
      changeFrequency: weekly,
      priority: 1.0,
    },

    // === サービス利用者向け地域別ページ（地域SEO最重要）===
    // 船橋市・八千代市・習志野市 + 訪問看護 の検索対策
    ...regionalData.map((area) => ({
      url: `${baseUrl}/areas/${area.slug}`,
      lastModified: areasUpdated,
      changeFrequency: weekly,
      priority: 0.9,
    })),

    // === B2B向けページ（ケアマネ・医療機関）===
    // 紹介元向け重要ページ
    {
      url: `${baseUrl}/for-care-managers`,
      lastModified: b2bUpdated,
      changeFrequency: weekly,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/for-medical-institutions`,
      lastModified: b2bUpdated,
      changeFrequency: weekly,
      priority: 0.9,
    },

    // === 料金・エリア一覧ページ ===
    {
      url: `${baseUrl}/pricing`,
      lastModified: b2bUpdated,
      changeFrequency: weekly,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: areasUpdated,
      changeFrequency: weekly,
      priority: 0.8,
    },

    // === 採用ページ群（求人SEO重要）===
    // /recruit/nurse と /recruit/therapist は /recruit に統合済み（301リダイレクト設定）
    {
      url: `${baseUrl}/recruit`,
      lastModified: recruitUpdated,
      changeFrequency: weekly,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recruit/day-flow`,
      lastModified: recruitUpdated,
      changeFrequency: monthly,
      priority: 0.8,
    },

    // 採用エリア別ページ（xx + 訪問看護 + 求人）
    ...recruitAreas.map((area) => ({
      url: `${baseUrl}/recruit/areas/${area.slug}`,
      lastModified: recruitUpdated,
      changeFrequency: weekly,
      priority: 0.85,
    })),

    // === 会社・サービス紹介ページ ===
    {
      url: `${baseUrl}/fractal`,
      lastModified: companyUpdated,
      changeFrequency: monthly,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: companyUpdated,
      changeFrequency: monthly,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/company/ceo`,
      lastModified: companyUpdated,
      changeFrequency: monthly,
      priority: 0.6,
    },

    // === その他 ===
    {
      url: `${baseUrl}/documents`,
      lastModified: staticUpdated,
      changeFrequency: monthly,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: topPageUpdated,
      changeFrequency: weekly,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/flyers`,
      lastModified: staticUpdated,
      changeFrequency: monthly,
      priority: 0.5,
    },
  ];
}
