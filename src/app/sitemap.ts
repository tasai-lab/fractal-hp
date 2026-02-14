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
    // トップページ（最重要）
    {
      url: baseUrl,
      lastModified,
      changeFrequency: weekly,
      priority: 1.0,
    },

    // 採用ページ群（重要）
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
      priority: 0.75,
    },

    // 採用エリア別ページ
    ...recruitAreas.map((area) => ({
      url: `${baseUrl}/recruit/areas/${area.slug}`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.75,
    })),

    // サービス利用者向け地域別ページ（地域SEO重要）
    ...regionalData.map((area) => ({
      url: `${baseUrl}/areas/${area.slug}`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.85,
    })),

    // B2B向けページ（ケアマネ・医療機関）
    {
      url: `${baseUrl}/for-care-managers`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-medical-institutions`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.85,
    },

    // フラクタルを知る
    {
      url: `${baseUrl}/fractal`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.8,
    },
    // 株式会社フラクタル
    {
      url: `${baseUrl}/company`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/flyers`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.5,
    },
  ];
}
