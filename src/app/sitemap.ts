import { MetadataRoute } from "next";
import { recruitAreas } from "@/lib/recruit-areas";
import { regionalData } from "@/lib/regional-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fractal-hokan.com";
  const lastModified = new Date();
  const weekly = "weekly" as const;
  const monthly = "monthly" as const;

  return [
    // === トップページ（最重要）===
    {
      url: baseUrl,
      lastModified,
      changeFrequency: weekly,
      priority: 1.0,
    },

    // === サービス利用者向け地域別ページ（地域SEO最重要）===
    // 船橋市・八千代市・習志野市 + 訪問看護 の検索対策
    ...regionalData.map((area) => ({
      url: `${baseUrl}/areas/${area.slug}`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.9,
    })),

    // === B2B向けページ（ケアマネ・医療機関）===
    // 紹介元向け重要ページ
    {
      url: `${baseUrl}/for-care-managers`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/for-medical-institutions`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.9,
    },

    // === 採用ページ群（求人SEO重要）===
    {
      url: `${baseUrl}/recruit`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recruit/nurse`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/recruit/therapist`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/recruit/day-flow`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.8,
    },

    // 採用エリア別ページ（xx + 訪問看護 + 求人）
    ...recruitAreas.map((area) => ({
      url: `${baseUrl}/recruit/areas/${area.slug}`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.85,
    })),

    // === 会社・サービス紹介ページ ===
    {
      url: `${baseUrl}/fractal`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/company`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/company/ceo`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.6,
    },

    // === その他 ===
    {
      url: `${baseUrl}/updates`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/flyers`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.5,
    },
  ];
}
