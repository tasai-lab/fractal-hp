import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RecruitCTA from "@/components/RecruitCTA";
import StationOfficeInfo from "@/components/station/StationOfficeInfo";
import StationStaff from "@/components/station/StationStaff";
import StationFeatures from "@/components/station/StationFeatures";
import StationFlow from "@/components/station/StationFlow";
import StationFAQ from "@/components/station/StationFAQ";
import PerformanceSection from "@/components/PerformanceSection";
import ConditionsTable from "@/components/ConditionsTable";
import Contact from "@/components/Contact";
import { getStation, getAllStationSlugs } from "@/lib/stations-data";
import { getStationContent } from "@/lib/station-content";
import { serviceAreas } from "@/lib/data";
import { regionalData } from "@/lib/regional-data";
import CityAreaCard from "@/components/station/CityAreaCard";

export function generateStaticParams() {
  return getAllStationSlugs().map((slug) => ({ slug }));
}

export default async function StationPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const station = getStation(resolvedParams.slug);
  const content = getStationContent(resolvedParams.slug);

  if (!station || !content) {
    notFound();
  }

  return (
    <>
      {/* 事業所ヒーロー: ロゴ画像 */}
      <section className="relative z-[2] bg-white">
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20 text-center">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--color-logo-light-green)] mb-4">
            STATION
          </span>
          <h1 className="flex justify-center mb-4">
            <span className="sr-only">{station.name} - {station.officeInfo.address.city}の訪問看護ステーション</span>
            <Image
              src={`/images/logos/hokan-title-${station.slug}.png`}
              alt={station.name}
              width={600}
              height={80}
              className="h-14 md:h-20 w-auto"
              priority
            />
          </h1>
          <p className="text-sm md:text-base text-[var(--color-ink-soft)] max-w-2xl mx-auto leading-relaxed">
            {station.officeInfo.address.city}を中心に24時間365日の訪問看護サービスを提供しています
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-0.5 bg-[var(--color-logo-light-green)]" />
          </div>
        </div>
      </section>
      <StationOfficeInfo station={station} />
      <StationFeatures />

      {/* 訪問エリア + 実績 */}
      <section id="service-area" className="section-wrapper bg-white relative">
        <div className="section-inner relative z-10">
          <div className="section-title-area">
            <h2 className="section-title heading-gothic">訪問エリア</h2>
            <div className="section-title-line" />
          </div>
          <div className="section-content space-y-8">
            <div className="section-card section-card-mint">
              {/* エリアマップ */}
              <div className="mb-6 md:mb-8 flex justify-center">
                <div className="rounded-2xl overflow-hidden shadow-lg max-w-lg w-full">
                  <Image
                    src="/images/service-area/area-map-new.png"
                    alt={`${station.name} 対応エリアマップ`}
                    width={800}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <p className="text-[var(--color-ink-soft)] text-sm md:text-base mb-6">
                {serviceAreas.priority.note}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {serviceAreas.priority.cities.map((city) => {
                  const areaData = regionalData.find((r) => r.name === city.name);
                  return (
                    <CityAreaCard
                      key={city.name}
                      city={city}
                      areaData={areaData}
                      showColorBar={false}
                    />
                  );
                })}
              </div>

              {/* 実績をもっと見るボタン */}
              <div className="text-center mt-6">
                <Link
                  href={`/stations/${station.slug}/areas`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm md:text-base hover:opacity-90 transition-opacity shadow-lg"
                >
                  エリア別の実績をもっと見る
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PerformanceSection />

      {/* 受け入れ可能な状態 */}
      <section id="conditions" className="section-wrapper bg-white relative">
        <div className="section-inner relative z-10">
          <div className="section-title-area">
            <h2 className="section-title heading-gothic">受入可能な状態</h2>
            <div className="section-title-line" />
          </div>
          <div className="section-content">
            <div className="section-card section-card-blue">
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <ConditionsTable embedded />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StationFlow flowSteps={content.flowSteps} />
      <StationStaff staffMembers={station.staffMembers} stationName={station.name} />
      <StationFAQ faqs={content.faq} />
      <RecruitCTA recruitHref={`/stations/${station.slug}/recruit`} />
      <section id="contact" className="section-wrapper bg-white relative">
        <div className="section-inner relative z-10">
          <div className="section-title-area">
            <h2 className="section-title">お問い合わせ</h2>
            <div className="section-title-line" />
          </div>
          <div className="section-content">
            <Contact embedded hideTitle />
          </div>
        </div>
      </section>
    </>
  );
}
