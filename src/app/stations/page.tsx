import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BackgroundTriangles from "@/components/BackgroundTriangles";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { getActiveStations } from "@/lib/stations-data";

export const metadata: Metadata = {
  title: "ステーション一覧｜フラクタル訪問看護",
  description:
    "フラクタル訪問看護のステーション一覧。船橋市・八千代市・習志野市・千葉市を中心に24時間365日の訪問看護サービスを提供しています。",
  alternates: {
    canonical: "https://fractal-hokan.com/stations",
  },
  openGraph: {
    title: "ステーション一覧｜フラクタル訪問看護",
    description:
      "フラクタル訪問看護のステーション一覧。各ステーションの事業所情報・スタッフ・訪問エリアをご確認いただけます。",
    type: "website",
    url: "https://fractal-hokan.com/stations",
    siteName: "フラクタル訪問看護",
    locale: "ja_JP",
  },
};

export default function StationsPage() {
  const stations = getActiveStations();

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "ステーション一覧", url: "https://fractal-hokan.com/stations" },
        ]}
      />

      <Header />
      <main className="pt-14 lg:pt-20">
        <PageHero
          label="STATIONS"
          title="ステーション一覧"
          description="各ステーションの事業所情報・担当スタッフ・訪問エリアをご確認いただけます"
        />

        <section className="relative overflow-hidden">
          <BackgroundTriangles pattern="office" />
          <div className="max-w-4xl mx-auto px-4 py-10 md:py-14 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {stations.map((station) => (
                <div
                  key={station.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* カラーバー */}
                  <div className="h-2 bg-[var(--color-logo-dark-green)]" />

                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-[var(--color-logo-dark-green)] mb-3">
                      {station.name}
                    </h2>

                    <div className="space-y-2 mb-4 text-sm md:text-base text-[var(--color-ink-soft)]">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-[var(--color-ink)] min-w-[3rem]">住所</span>
                        <span>
                          {station.officeInfo.address.prefecture}
                          {station.officeInfo.address.city}
                          {station.officeInfo.address.street}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-[var(--color-ink)] min-w-[3rem]">TEL</span>
                        <a
                          href={`tel:${station.officeInfo.phone.replace(/-/g, "")}`}
                          className="hover:underline text-[var(--color-logo-dark-green)] font-medium"
                        >
                          {station.officeInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-[var(--color-ink)] min-w-[3rem]">営業</span>
                        <span>{station.officeInfo.hours}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={`/stations/${station.slug}`}
                        className="inline-flex items-center justify-center w-full gap-2 bg-[var(--color-logo-dark-green)] text-white px-5 py-3 rounded-full font-bold text-sm md:text-base transition-all hover:scale-105 hover:shadow-md"
                      >
                        詳しく見る
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
