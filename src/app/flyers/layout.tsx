import type { Metadata } from "next";
import { FlyersStructuredData } from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "チラシ・広報誌バックナンバー",
  description:
    "フラクタル訪問看護 船橋の広報誌「ふらくたる」のバックナンバー。船橋市・八千代市・習志野市の訪問看護サービス情報、スタッフ紹介、健康コラムなどを掲載。",
  keywords: [
    "フラクタル訪問看護 チラシ",
    "訪問看護 広報誌",
    "船橋 訪問看護 パンフレット",
  ],
  alternates: {
    canonical: "/flyers",
  },
  openGraph: {
    title: "チラシ・広報誌バックナンバー | フラクタル訪問看護 船橋",
    description: "フラクタル訪問看護 船橋の広報誌バックナンバー。",
    url: "https://fractal-hokan.com/flyers",
  },
};

export default function FlyersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FlyersStructuredData />
      <Header />
      {children}
      <Footer />
    </>
  );
}
