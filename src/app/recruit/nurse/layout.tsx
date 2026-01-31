import type { Metadata } from "next";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "看護師の求人 | フラクタル訪問看護",
  description:
    "フラクタル訪問看護の看護師求人。年間休日139日以上、入社祝い金最大30万円。船橋市・八千代市・習志野市・千葉市花見川区・稲毛区エリアで募集しています。",
  alternates: {
    canonical: "/recruit/nurse",
  },
  openGraph: {
    title: "看護師の求人 | フラクタル訪問看護",
    description:
      "年間休日139日以上。訪問看護師の働きやすさと待遇を紹介します。",
    url: "https://fractal-hokan.com/recruit/nurse",
    images: [
      {
        url: "/images/ogp/recruit-ogp.png",
        width: 1200,
        height: 630,
        alt: "フラクタル訪問看護 看護師求人",
      },
    ],
  },
};

export default function RecruitNurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "採用情報", url: "https://fractal-hokan.com/recruit" },
          { name: "看護師求人", url: "https://fractal-hokan.com/recruit/nurse" },
        ]}
      />
      {children}
    </>
  );
}
