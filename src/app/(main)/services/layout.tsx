import type { Metadata } from "next";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "船橋市の訪問看護サービス一覧｜精神科・看取り・24時間対応",
  description:
    "フラクタル訪問看護 船橋のサービス一覧。精神科訪問看護・看取り・終末期ケア・24時間対応体制について詳しくご紹介します。船橋市・八千代市・習志野市対応。047-770-1228",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "船橋市の訪問看護サービス一覧｜フラクタル訪問看護 船橋",
    description:
      "精神科訪問看護・看取り・終末期ケア・24時間対応体制。船橋市・八千代市・習志野市で訪問看護サービスを提供。",
    type: "website",
    url: "https://fractal-hokan.com/services",
    siteName: "フラクタル訪問看護 船橋",
    locale: "ja_JP",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          {
            name: "サービス案内",
            url: "https://fractal-hokan.com/services",
          },
        ]}
      />
      {children}
    </>
  );
}
