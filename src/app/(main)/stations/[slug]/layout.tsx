import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";
import { getStationContent } from "@/lib/station-content";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);
  const content = getStationContent(resolvedParams.slug);

  if (!station) {
    return {
      title: "ステーション情報｜フラクタル訪問看護",
      description: "フラクタル訪問看護のステーション情報ページです。",
    };
  }

  const seoTitle = content?.seoTitle ?? `${station.name}｜フラクタル訪問看護`;
  const seoDescription = content?.seoDescription ?? `${station.name}の事業所情報・スタッフ紹介・訪問エリアをご確認いただけます。${station.officeInfo.address.prefecture}${station.officeInfo.address.city}の訪問看護ステーション。`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `https://fractal-hokan.com/stations/${station.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      url: `https://fractal-hokan.com/stations/${station.slug}`,
      siteName: "フラクタル訪問看護",
      locale: "ja_JP",
    },
  };
}

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export default async function StationLayout({
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
          { name: "ホーム", url: "https://fractal-hokan.com" },
          {
            name: "ステーション一覧",
            url: "https://fractal-hokan.com/stations",
          },
          {
            name: station.name,
            url: `https://fractal-hokan.com/stations/${station.slug}`,
          },
        ]}
      />
      <Header />
      <main className="pt-14 lg:pt-20">{children}</main>
      <Footer />
    </>
  );
}
