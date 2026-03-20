import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    return {
      title: "チラシ・バックナンバー｜フラクタル訪問看護",
    };
  }

  return {
    title: `チラシ・バックナンバー｜${station.name}`,
    description: `${station.name}のチラシ・バックナンバー一覧。${station.officeInfo.address.city}の訪問看護ステーションの最新情報や地域向け情報誌をご覧いただけます。`,
    alternates: {
      canonical: `/stations/${station.slug}/flyers`,
    },
    openGraph: {
      title: `チラシ・バックナンバー｜${station.name}`,
      description: `${station.name}のチラシ・バックナンバー一覧。`,
      type: "website",
      url: `/stations/${station.slug}/flyers`,
      siteName: "フラクタル訪問看護",
      locale: "ja_JP",
    },
  };
}

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export default async function FlyersLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    notFound();
  }

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com/" },
          { name: "事業所一覧", url: "https://fractal-hokan.com/stations/" },
          {
            name: station.name,
            url: `https://fractal-hokan.com/stations/${station.slug}/`,
          },
          {
            name: "チラシ・バックナンバー",
            url: `https://fractal-hokan.com/stations/${station.slug}/flyers/`,
          },
        ]}
      />
      {children}
    </>
  );
}
