import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// SEO最適化されたメタデータ
export const metadata: Metadata = {
  // 基本情報
  title: {
    default: "フラクタル訪問看護 船橋 | 船橋市・八千代市・習志野市の訪問看護ステーション",
    template: "%s | フラクタル訪問看護 船橋",
  },
  description:
    "船橋市・八千代市・習志野市・千葉市花見川区を中心に365日対応の訪問看護サービスを提供。24時間オンコール対応、終末期ケア、精神科訪問看護、訪問リハビリに対応。看護師・理学療法士・作業療法士・言語聴覚士求人募集中。入社祝い金最大30万円。",

  // キーワード（SEO対策）
  keywords: [
    // メインキーワード
    "訪問看護",
    "船橋市 訪問看護",
    "八千代市 訪問看護",
    "習志野市 訪問看護",
    "千葉市花見川区 訪問看護",
    // 求人関連キーワード
    "船橋市 訪問看護 求人",
    "船橋 看護 求人",
    "訪問看護師 求人 船橋",
    "八千代市 看護師 求人",
    "訪問看護 正社員 千葉",
    // サービス関連
    "訪問看護ステーション 船橋",
    "在宅医療 船橋市",
    "終末期ケア 船橋",
    "精神科訪問看護 船橋",
    "訪問リハビリ 船橋市",
    // ブランド
    "フラクタル訪問看護",
    "フラクタル訪問看護ステーション",
  ],

  // 作成者・発行者
  authors: [{ name: "株式会社フラクタル" }],
  creator: "株式会社フラクタル",
  publisher: "株式会社フラクタル",

  // 正規URL
  metadataBase: new URL("https://fractal-hokan.com"),
  alternates: {
    canonical: "/",
  },

  // Open Graph（Facebook・LINE等）
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://fractal-hokan.com",
    siteName: "フラクタル訪問看護 船橋",
    title: "フラクタル訪問看護 船橋 | 船橋市・八千代市の訪問看護",
    description:
      "船橋市・八千代市・習志野市を中心に365日対応の訪問看護サービス。24時間オンコール対応。看護師求人募集中、入社祝い金最大30万円。",
    images: [
      {
        url: "/images/ogp/ogp-image.png",
        width: 1200,
        height: 630,
        alt: "フラクタル訪問看護 船橋",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "フラクタル訪問看護 船橋 | 船橋市・八千代市の訪問看護",
    description:
      "船橋市・八千代市・習志野市を中心に365日対応の訪問看護サービス。看護師求人募集中。",
    images: ["/images/ogp/ogp-image.png"],
  },

  // 検索エンジン設定
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Google Search Console verification
  // TODO: 実際のverification codeに置き換えてください
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },

  // その他のメタ情報
  category: "医療・福祉",
  classification: "訪問看護ステーション",

  // アプリ関連（PWA対応用）
  applicationName: "フラクタル訪問看護 船橋",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "フラクタル訪問看護",
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
  },

  // その他
  other: {
    "geo.region": "JP-12",
    "geo.placename": "船橋市",
    "geo.position": "35.7048;140.0468",
    ICBM: "35.7048, 140.0468",
  },
};

// ビューポート設定
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Analytics */}
        <GoogleAnalytics />
        {/* 構造化データ */}
        <StructuredData />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${notoSansJP.variable} antialiased`}>{children}</body>
    </html>
  );
}
