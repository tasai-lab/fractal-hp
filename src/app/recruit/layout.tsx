import type { Metadata } from "next";
import { RecruitStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "【船橋市】訪問看護師・PT・OT・ST求人｜フラクタル訪問看護",
  description:
    "船橋市・八千代市・習志野市で訪問看護師・PT・OT・STを募集中。年間休日139日以上、入社祝い金最大30万円。直行直帰OK、AI活用で記録業務を効率化。未経験・ブランク歓迎。047-770-1228",
  alternates: {
    canonical: "/recruit",
  },
  openGraph: {
    title: "【船橋市】訪問看護師・PT・OT・ST求人｜フラクタル訪問看護",
    description:
      "船橋市・八千代市・習志野市で訪問看護師・PT・OT・STを募集中。年間休日139日以上、入社祝い金最大30万円。直行直帰OK、AI活用で記録業務を効率化。未経験・ブランク歓迎。",
    url: "https://fractal-hokan.com/recruit",
    images: [
      {
        url: "/images/ogp/recruit-ogp.png",
        width: 1200,
        height: 630,
        alt: "フラクタル訪問看護 船橋 採用情報",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "【船橋市】訪問看護師・PT・OT・ST求人｜フラクタル訪問看護",
    description:
      "船橋市・八千代市・習志野市で訪問看護師・PT・OT・STを募集中。年間休日139日以上、入社祝い金最大30万円。直行直帰OK、未経験・ブランク歓迎。",
  },
};

export default function RecruitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RecruitStructuredData />
      {children}
    </>
  );
}
