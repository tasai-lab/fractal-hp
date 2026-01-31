import type { Metadata } from "next";
import { RecruitStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "採用情報 | フラクタル訪問看護",
  description:
    "フラクタル訪問看護では看護師・PT・OT・STを募集中。船橋市・八千代市・習志野市・千葉市花見川区・稲毛区エリア。入社祝い金最大30万円、年休139日以上（PT・OT・STは120日以上）。",
  alternates: {
    canonical: "/recruit",
  },
  openGraph: {
    title: "採用情報 | フラクタル訪問看護",
    description:
      "看護師・PT・OT・ST募集中。入社祝い金最大30万円、年休139日以上（PT・OT・STは120日以上）。",
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
    title: "採用情報 | フラクタル訪問看護",
    description:
      "看護師・PT・OT・ST募集中。入社祝い金最大30万円。船橋市・八千代市・習志野市・千葉市花見川区・稲毛区。",
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
