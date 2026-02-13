import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "フラクタルとは｜私たちの理念",
  description:
    "フラクタルとは、小さな部分が集まって全体の形をつくる自然のしくみ。フラクタル訪問看護は、この考え方を大切に、どのスタッフが訪問しても同じ品質のケアを提供します。",
  keywords: [
    "フラクタル",
    "フラクタルとは",
    "フラクタル構造",
    "自己相似性",
    "フラクタル訪問看護",
    "訪問看護 理念",
  ],
  alternates: {
    canonical: "/fractal",
  },
  openGraph: {
    title: "フラクタルとは｜フラクタル訪問看護 船橋",
    description:
      "フラクタルとは、小さな部分が集まって全体の形をつくる自然のしくみ。私たちはこの考え方を大切にしています。",
    url: "https://fractal-hokan.com/fractal",
  },
};

export default function FractalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
