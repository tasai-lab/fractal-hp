import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import PageHero from "@/components/PageHero";

import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { regionalData } from "@/lib/regional-data";
import { serviceAreas } from "@/lib/data";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";
import CityAreaCard from "@/components/station/CityAreaCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    return {
      title: "対応エリア一覧｜フラクタル訪問看護",
      description: "フラクタル訪問看護の対応エリア一覧ページです。",
    };
  }

  return {
    title: `対応エリア一覧｜${station.name}`,
    description: `${station.name}の対応エリア一覧。${station.officeInfo.address.city}を中心に24時間365日の訪問看護サービスを提供しています。各地域の詳細情報もご覧いただけます。`,
    alternates: {
      canonical: `/stations/${station.slug}/areas`,
    },
    openGraph: {
      title: `対応エリア一覧｜${station.name}`,
      description: `${station.name}の対応エリア一覧。各地域の詳細情報をご確認ください。`,
      type: "website",
      url: `/stations/${station.slug}/areas`,
      siteName: "フラクタル訪問看護",
      locale: "ja_JP",
    },
  };
}

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export default async function StationAreasPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);

  if (!station) {
    notFound();
  }

  const { slug } = station;

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "ステーション一覧", url: "https://fractal-hokan.com/stations" },
          {
            name: station.name,
            url: `https://fractal-hokan.com/stations/${slug}`,
          },
          {
            name: "対応エリア一覧",
            url: `https://fractal-hokan.com/stations/${slug}/areas`,
          },
        ]}
      />

      <PageHero
        label="SERVICE AREAS"
        title="対応エリア一覧"
        description="船橋市・八千代市・習志野市・千葉市を中心に24時間365日の訪問看護サービスを提供しています"
      />

      {/* エリアマップ */}
      <section className="relative">

        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 relative z-10 space-y-8">
          {/* エリアマップ */}
          <div>
                <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/2]">
                  <Image
                    src="/images/service-area/area-map-new.png"
                    alt="フラクタル訪問看護 船橋 訪問エリアマップ - 船橋市・習志野市・八千代市・千葉市花見川区・稲毛区"
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
                <p className="text-center text-sm text-[var(--color-ink-soft)] mt-4">
                  駐車場代・交通費は訪問可能エリア内であればいただきません
                </p>
              </div>

              {/* 訪問可能エリアカード */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {serviceAreas.priority.cities.map((city) => {
                  const areaData = regionalData.find((r) => r.name === city.name);
                  return (
                    <CityAreaCard
                      key={city.name}
                      city={city}
                      areaData={areaData}
                    />
                  );
                })}

                {/* serviceAreasにないがregionalDataにあるエリア */}
                {regionalData
                  .filter((r) => !serviceAreas.priority.cities.some((c) => c.name === r.name))
                  .map((areaData) => (
                    <CityAreaCard
                      key={areaData.slug}
                      city={{ name: areaData.name, areas: [] }}
                      areaData={areaData}
                    />
                  ))}
          </div>
        </div>
      </section>
    </>
  );
}
