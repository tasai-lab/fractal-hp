import type { Metadata } from "next";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "リハビリ職の求人 | フラクタル訪問看護",
  description:
    "理学療法士・作業療法士・言語聴覚士の求人情報。年間休日120日以上、入社祝い金最大30万円。船橋市・八千代市・習志野市・千葉市花見川区・稲毛区で募集しています。",
  alternates: {
    canonical: "/recruit/therapist",
  },
  openGraph: {
    title: "リハビリ職の求人 | フラクタル訪問看護",
    description:
      "PT・OT・ST向けの訪問リハビリ求人。働きやすい環境と待遇を紹介します。",
    url: "https://fractal-hokan.com/recruit/therapist",
    images: [
      {
        url: "/images/ogp/recruit-ogp.png",
        width: 1200,
        height: 630,
        alt: "フラクタル訪問看護 リハビリ職求人",
      },
    ],
  },
};

export default function RecruitTherapistLayout({
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
          {
            name: "リハビリ職求人",
            url: "https://fractal-hokan.com/recruit/therapist",
          },
        ]}
      />
      {children}
    </>
  );
}
