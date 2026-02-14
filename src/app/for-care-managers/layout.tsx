import type { Metadata } from "next";
import { BreadcrumbStructuredData, generateFAQData } from "@/components/StructuredData";
import Script from "next/script";

// ケアマネ向けFAQ
const careManagerFAQs = [
  {
    question: "最短でいつから訪問開始できますか?",
    answer: "最短即日対応可能です。緊急のご依頼もお受けしておりますので、まずはお電話ください。訪問看護指示書の準備が整い次第、速やかに訪問を開始いたします。",
  },
  {
    question: "土日祝日の訪問は可能ですか?",
    answer: "はい、365日対応しております。土日祝日も通常通り訪問看護サービスを提供しています。利用者様の生活リズムに合わせた柔軟な訪問スケジュールを組むことが可能です。",
  },
  {
    question: "訪問看護指示書の取得をサポートしてもらえますか?",
    answer: "はい、主治医への指示書依頼を代行いたします。かかりつけ医がいらっしゃらない場合も、連携医療機関のご紹介が可能です。指示書取得までの流れについても丁寧にサポートいたします。",
  },
  {
    question: "定期報告はどのように行われますか?",
    answer: "月次で訪問看護報告書をお送りします。訪問内容、バイタルサイン、ADL状況、服薬状況、今後の方針などを詳細に記載いたします。また、状態変化時は都度お電話でご連絡いたします。",
  },
];

export const metadata: Metadata = {
  title: "ケアマネージャー様へ｜訪問看護のご依頼・連携",
  description: "船橋市・八千代市・習志野市のケアマネージャー様へ。フラクタル訪問看護は最短即日対応、365日訪問可能。訪問看護指示書の取得サポート、定期報告体制も充実。047-770-1228",
  keywords: [
    "ケアマネジャー 訪問看護 船橋",
    "訪問看護 紹介方法",
    "介護保険 訪問看護",
    "ケアプラン 訪問看護",
    "居宅介護支援 訪問看護",
    "訪問看護 連携",
  ],
  alternates: {
    canonical: "/for-care-managers",
  },
};

export default function ForCareManagersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqData = generateFAQData(careManagerFAQs);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "ケアマネージャー様へ", url: "https://fractal-hokan.com/for-care-managers" },
        ]}
      />
      <Script
        id="structured-data-care-manager-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
      {children}
    </>
  );
}
