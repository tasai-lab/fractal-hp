import { MetadataRoute } from "next";
import { recruitAreas } from "@/lib/recruit-areas";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fractal-hokan.com";
  const lastModified = new Date();
  const weekly = "weekly" as const;
  const monthly = "monthly" as const;

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: weekly,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/recruit`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recruit/day-flow`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.8,
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
    ...recruitAreas.map((area) => ({
      url: `${baseUrl}/recruit/areas/${area.slug}`,
      lastModified,
      changeFrequency: weekly,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/about-fractal`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/flyers`,
      lastModified,
      changeFrequency: monthly,
      priority: 0.6,
    },
  ];
}
