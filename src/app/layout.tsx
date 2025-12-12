import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "フラクタル訪問看護 船橋 | 船橋市・習志野市の訪問看護",
  description:
    "フラクタル訪問看護 船橋は、船橋市・習志野市・千葉市花見川区を中心に365日対応の訪問看護サービスを提供しています。24時間オンコール対応、終末期ケア、精神科訪問看護にも対応。",
  keywords: [
    "訪問看護",
    "船橋市",
    "習志野市",
    "千葉市",
    "在宅医療",
    "終末期ケア",
    "精神科訪問看護",
  ],
  openGraph: {
    title: "フラクタル訪問看護 船橋",
    description: "船橋市・習志野市を中心に365日対応の訪問看護サービス",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>{children}</body>
    </html>
  );
}
