import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { regionalData, getRegionalDataBySlug } from "@/lib/regional-data";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";
import {
  BreadcrumbStructuredData,
  AreaFAQStructuredData,
} from "@/components/StructuredData";

// 地域別LocalBusinessスキーマを生成
function generateAreaLocalBusinessData(
  areaName: string,
  stationOfficeInfo: {
    phone: string;
    address: {
      street: string;
      city: string;
      prefecture: string;
      postalCode: string;
    };
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    name: `フラクタル訪問看護 ${areaName}対応`,
    description: `${areaName}で訪問看護サービスを提供。24時間365日対応、終末期ケア・精神科訪問看護・リハビリに対応。`,
    url: "https://fractal-hokan.com",
    telephone: stationOfficeInfo.phone,
    areaServed: {
      "@type": areaName.includes("区") ? "AdministrativeArea" : "City",
      name: areaName,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: stationOfficeInfo.address.street,
      addressLocality: stationOfficeInfo.address.city,
      addressRegion: stationOfficeInfo.address.prefecture,
      postalCode: stationOfficeInfo.address.postalCode,
      addressCountry: "JP",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    medicalSpecialty: [
      "訪問看護",
      "終末期ケア",
      "精神科訪問看護",
      "リハビリテーション",
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; areaSlug: string }> | { slug: string; areaSlug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const area = getRegionalDataBySlug(resolvedParams.areaSlug);

  if (!area) {
    return {
      title: "訪問看護｜フラクタル訪問看護",
      description: "フラクタル訪問看護の訪問看護サービスページです。",
    };
  }

  return {
    title: {
      absolute: area.title,
    },
    description: area.description,
    alternates: {
      canonical: `/stations/${resolvedParams.slug}/areas/${area.slug}`,
    },
    openGraph: {
      title: area.title,
      description: area.description,
      type: "website",
      url: `https://fractal-hokan.com/stations/${resolvedParams.slug}/areas/${area.slug}`,
      images: [
        {
          url: "/images/ogp/ogp-image.png",
          width: 1200,
          height: 630,
          alt: `${area.name}の訪問看護｜フラクタル訪問看護`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: area.title,
      description: area.description,
    },
  };
}

export function generateStaticParams() {
  const stationSlugs = getAllStationSlugs();
  const params: { slug: string; areaSlug: string }[] = [];

  for (const slug of stationSlugs) {
    const station = getStation(slug);
    if (!station) continue;

    // ステーションの担当エリアスラッグを使用
    for (const areaSlug of station.serviceAreaSlugs) {
      const area = getRegionalDataBySlug(areaSlug);
      if (area) {
        params.push({ slug, areaSlug });
      }
    }
  }

  return params;
}

export default async function StationAreaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; areaSlug: string }> | { slug: string; areaSlug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const area = getRegionalDataBySlug(resolvedParams.areaSlug);
  const station = getStation(resolvedParams.slug);

  if (!area || !station) {
    notFound();
  }

  const localBusinessData = generateAreaLocalBusinessData(area.name, {
    phone: station.officeInfo.phone,
    address: {
      street: `${station.officeInfo.address.street} ${station.officeInfo.address.building}`,
      city: station.officeInfo.address.city,
      prefecture: station.officeInfo.address.prefecture,
      postalCode: station.officeInfo.address.postalCode,
    },
  });

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          {
            name: "ステーション一覧",
            url: "https://fractal-hokan.com/stations",
          },
          {
            name: station.name,
            url: `https://fractal-hokan.com/stations/${station.slug}`,
          },
          {
            name: `${area.name}の訪問看護`,
            url: `https://fractal-hokan.com/stations/${station.slug}/areas/${area.slug}`,
          },
        ]}
      />
      <AreaFAQStructuredData faqs={area.faqs} areaSlug={area.slug} />
      <Script
        id={`structured-data-${area.slug}-local-business`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      {children}
    </>
  );
}
