import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "代表者インタビュー｜株式会社フラクタル",
  description: "株式会社フラクタル代表のインタビュー。船橋市・八千代市・習志野市で訪問看護ステーションを運営。「完璧より最適を。」の理念のもと、地域に根ざした訪問看護サービスを提供しています。",
  alternates: {
    canonical: "/company/ceo",
  },
  openGraph: {
    title: "代表者インタビュー｜株式会社フラクタル",
    description: "株式会社フラクタル代表のインタビュー。船橋市で訪問看護ステーションを運営。",
    type: "website",
    url: "https://fractal-hokan.com/company/ceo",
    images: [{ url: "/images/ogp/ogp-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "代表者インタビュー｜株式会社フラクタル",
    description: "株式会社フラクタル代表のインタビュー。船橋市・八千代市・習志野市で訪問看護ステーションを運営。",
  },
};

export default function CEOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
