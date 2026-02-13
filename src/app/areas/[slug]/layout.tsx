import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { regionalData, getRegionalDataBySlug } from "@/lib/regional-data";
import {
  BreadcrumbStructuredData,
  AreaFAQStructuredData,
} from "@/components/StructuredData";
import Script from "next/script";

// 地域別LocalBusinessスキーマを生成
function generateAreaLocalBusinessData(areaName: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    name: `フラクタル訪問看護 ${areaName}対応`,
    description: `${areaName}で訪問看護サービスを提供。24時間365日対応、終末期ケア・精神科訪問看護・リハビリに対応。`,
    url: "https://fractal-hokan.com",
    telephone: "047-770-1228",
    areaServed: {
      "@type": areaName.includes("区") ? "AdministrativeArea" : "City",
      name: areaName,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "三山6丁目22-2 パレドール小川201",
      addressLocality: "船橋市",
      addressRegion: "千葉県",
      postalCode: "274-0072",
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
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const area = getRegionalDataBySlug(resolvedParams.slug);

  if (!area) {
    return {
      title: "訪問看護｜フラクタル訪問看護 船橋",
      description: "フラクタル訪問看護の訪問看護サービスページです。",
    };
  }

  return {
    title: {
      absolute: area.title, // ルートのtemplateとの重複を避ける
    },
    description: area.description,
    alternates: {
      canonical: `/areas/${area.slug}`,
    },
    openGraph: {
      title: area.title,
      description: area.description,
      url: `https://fractal-hokan.com/areas/${area.slug}`,
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
  return regionalData.map((area) => ({
    slug: area.slug,
  }));
}

export default async function AreaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const area = getRegionalDataBySlug(resolvedParams.slug);

  if (!area) {
    notFound();
  }

  const localBusinessData = generateAreaLocalBusinessData(area.name);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          {
            name: `${area.name}の訪問看護`,
            url: `https://fractal-hokan.com/areas/${area.slug}`,
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
