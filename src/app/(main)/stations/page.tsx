import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import StationsOverview from "@/components/StationsOverview";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

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
        <StationsOverview showSectionTitle={false} />
      </main>
      <Footer />
    </>
  );
}
