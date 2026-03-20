import { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";
import { getActiveStations } from "@/lib/stations-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fractal-hokan.com";
  const weekly = "weekly" as const;
  const monthly = "monthly" as const;

  const lastModifiedDates = {
    top: new Date("2026-03-20"),
    stations: new Date("2026-03-20"),
    areas: new Date("2026-03-20"),
    b2b: new Date("2026-03-20"),
    pricing: new Date("2026-03-20"),
    recruit: new Date("2026-03-20"),
    services: new Date("2026-03-20"),
    company: new Date("2026-03-20"),
    updates: new Date("2026-03-20"),
  };

  const stations = getActiveStations();

  return [
    // === トップページ（最重要）===
    {
      url: baseUrl,
      lastModified: lastModifiedDates.top,
      changeFrequency: weekly,
      priority: 1.0,
    },

    // === 事業所一覧 ===
    {
      url: `${baseUrl}/stations`,
      lastModified: lastModifiedDates.stations,
      changeFrequency: weekly,
      priority: 0.9,
    },

    // === 事業所別ページ ===
    ...stations.flatMap((station) => [
      {
        url: `${baseUrl}/stations/${station.slug}`,
        lastModified: lastModifiedDates.stations,
        changeFrequency: weekly,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/stations/${station.slug}/recruit`,
        lastModified: lastModifiedDates.recruit,
        changeFrequency: weekly,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/stations/${station.slug}/areas`,
        lastModified: lastModifiedDates.areas,
        changeFrequency: weekly,
        priority: 0.85,
      },
      {
        url: `${baseUrl}/stations/${station.slug}/documents`,
        lastModified: lastModifiedDates.stations,
        changeFrequency: monthly,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/stations/${station.slug}/flyers`,
        lastModified: lastModifiedDates.stations,
        changeFrequency: monthly,
        priority: 0.5,
      },
    ]),

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
    {
      url: `${baseUrl}/services/for-care-managers`,
      lastModified: lastModifiedDates.b2b,
      changeFrequency: weekly,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/for-medical-institutions`,
      lastModified: lastModifiedDates.b2b,
      changeFrequency: weekly,
      priority: 0.9,
    },

    // === 料金ページ ===
    {
      url: `${baseUrl}/pricing`,
      lastModified: lastModifiedDates.pricing,
      changeFrequency: weekly,
      priority: 0.85,
    },

    // === 採用ページ群（求人SEO重要）===
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
      url: `${baseUrl}/updates`,
      lastModified: lastModifiedDates.updates,
      changeFrequency: weekly,
      priority: 0.6,
    },
  ];
}
