import type { Metadata } from "next";
import {
  BreadcrumbStructuredData,
  AreaJobPostingStructuredData,
  AreaFAQStructuredData,
} from "@/components/StructuredData";
import { recruitAreas } from "@/lib/recruit-areas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const area = recruitAreas.find((item) => item.slug === resolvedParams.slug);

  if (!area) {
    return {
      title: "採用情報 | フラクタル訪問看護",
      description: "フラクタル訪問看護の採用情報ページです。",
      alternates: {
        canonical: "/recruit",
      },
    };
  }

  return {
    title: `${area.name} 訪問看護 求人 | 看護師・PT募集 | フラクタル訪問看護`,
    description: `${area.name}で訪問看護師・理学療法士・作業療法士を募集中。年間休日139日以上（PT・OT・STは120日以上）、入社祝い金最大30万円、直行直帰OK。${area.shortCopy}`,
    alternates: {
      canonical: `/recruit/areas/${area.slug}`,
    },
    openGraph: {
      title: `${area.name} 訪問看護 求人 | 看護師・PT募集 | フラクタル訪問看護`,
      description: `${area.name}で訪問看護師・理学療法士・作業療法士を募集中。年間休日139日以上（PT・OT・STは120日以上）、入社祝い金最大30万円、直行直帰OK。${area.shortCopy}`,
      url: `https://fractal-hokan.com/recruit/areas/${area.slug}`,
      images: [
        {
          url: "/images/ogp/recruit-ogp.png",
          width: 1200,
          height: 630,
          alt: "フラクタル訪問看護 採用情報",
        },
      ],
    },
  };
}

export default async function RecruitAreaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const area = recruitAreas.find((item) => item.slug === resolvedParams.slug);

  return (
    <>
      {area && (
        <>
          <BreadcrumbStructuredData
            items={[
              { name: "ホーム", url: "https://fractal-hokan.com" },
              { name: "採用情報", url: "https://fractal-hokan.com/recruit" },
              {
                name: `${area.name}の求人`,
                url: `https://fractal-hokan.com/recruit/areas/${area.slug}`,
              },
            ]}
          />
          <AreaJobPostingStructuredData
            areaName={area.name}
            areaSlug={area.slug}
          />
          {area.faq && area.faq.length > 0 && (
            <AreaFAQStructuredData faqs={area.faq} areaSlug={area.slug} />
          )}
        </>
      )}
      {children}
    </>
  );
}
