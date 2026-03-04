import { MetadataRoute } from "next";
import { recruitAreas } from "@/lib/recruit-areas";
import { regionalData } from "@/lib/regional-data";
import { servicesData } from "@/lib/services-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fractal-hokan.com";
  const weekly = "weekly" as const;
  const monthly = "monthly" as const;

  // ページ毎に最終更新日を管理（ビルド時の new Date() は不正確なため静的に管理）
  const lastModifiedDates = {
    top: new Date("2026-03-04"),
    areas: new Date("2026-03-04"),
    b2b: new Date("2026-02-25"),
    pricing: new Date("2026-02-25"),
    recruit: new Date("2026-03-04"),
    services: new Date("2026-03-04"),
    company: new Date("2026-02-25"),
    documents: new Date("2026-02-15"),
    updates: new Date("2026-03-04"),
    flyers: new Date("2026-02-10"),
  };

  return [
    // === トップページ（最重要）===
    {
      url: baseUrl,
      lastModified: lastModifiedDates.top,
      changeFrequency: weekly,
      priority: 1.0,
    },

    // === サービス利用者向け地域別ページ（地域SEO最重要）===
    // 船橋市・八千代市・習志野市 + 訪問看護 の検索対策
    ...regionalData.map((area) => ({
      url: `${baseUrl}/areas/${area.slug}`,
      lastModified: lastModifiedDates.areas,
      changeFrequency: weekly,
      priority: 0.9,
    })),

    // === サービス別ページ（精神科・看取り・24時間対応）===
    {
      url: `${baseUrl}/services`,
      lastModified: lastModifiedDates.services,
      changeFrequency: monthly,
      priority: 0.85,
    },
    ...servicesData.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: lastModifiedDates.services,
      changeFrequency: monthly,
      priority: 0.85,
    })),

    // === B2B向けページ（ケアマネ・医療機関）===
    // 紹介元向け重要ページ
    {
      url: `${baseUrl}/for-care-managers`,
      lastModified: lastModifiedDates.b2b,
      changeFrequency: weekly,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/for-medical-institutions`,
      lastModified: lastModifiedDates.b2b,
      changeFrequency: weekly,
      priority: 0.9,
    },

    // === 料金・エリア一覧ページ ===
    {
      url: `${baseUrl}/pricing`,
      lastModified: lastModifiedDates.pricing,
      changeFrequency: weekly,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: lastModifiedDates.areas,
      changeFrequency: weekly,
      priority: 0.8,
    },

    // === 採用ページ群（求人SEO重要）===
    // /recruit/nurse と /recruit/therapist は /recruit に統合済み（301リダイレクト設定）
    {
      url: `${baseUrl}/recruit`,
      lastModified: lastModifiedDates.recruit,
      changeFrequency: weekly,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recruit/day-flow`,
      lastModified: lastModifiedDates.recruit,
      changeFrequency: monthly,
      priority: 0.8,
    },

    // 採用エリア別ページ（xx + 訪問看護 + 求人）
    ...recruitAreas.map((area) => ({
      url: `${baseUrl}/recruit/areas/${area.slug}`,
      lastModified: lastModifiedDates.recruit,
      changeFrequency: weekly,
      priority: 0.85,
    })),

    // === 会社・サービス紹介ページ ===
    {
      url: `${baseUrl}/fractal`,
      lastModified: lastModifiedDates.company,
      changeFrequency: monthly,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: lastModifiedDates.company,
      changeFrequency: monthly,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/company/ceo`,
      lastModified: lastModifiedDates.company,
      changeFrequency: monthly,
      priority: 0.6,
    },

    // === その他 ===
    {
      url: `${baseUrl}/documents`,
      lastModified: lastModifiedDates.documents,
      changeFrequency: monthly,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: lastModifiedDates.updates,
      changeFrequency: weekly,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/flyers`,
      lastModified: lastModifiedDates.flyers,
      changeFrequency: monthly,
      priority: 0.5,
    },
  ];
}
