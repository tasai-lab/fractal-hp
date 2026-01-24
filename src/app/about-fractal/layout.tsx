import type { Metadata } from "next";
import { AboutFractalStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "フラクタルを知る | 企業理念・ビジョン・行動指針",
  description:
    "株式会社フラクタルの企業理念「シンプルで独創的な社会を実現する」、成長戦略、7つの行動指針、DAPAEフレームワークについてご紹介。訪問看護事業とIT支援事業を展開。",
  keywords: [
    "株式会社フラクタル",
    "フラクタル 企業理念",
    "訪問看護 会社",
    "船橋 医療法人",
    "フラクタル ビジョン",
  ],
  alternates: {
    canonical: "/about-fractal",
  },
  openGraph: {
    title: "フラクタルを知る | 株式会社フラクタル",
    description:
      "企業理念「シンプルで独創的な社会を実現する」。訪問看護事業とIT支援事業を展開。",
    url: "https://fractal-hokan.com/about-fractal",
  },
};

export default function AboutFractalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AboutFractalStructuredData />
      {children}
    </>
  );
}
