"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 企業データ
const aboutData = {
  philosophy: {
    title: "私たちが目指す未来 / 基本理念",
    main: "シンプルで独創的な社会を実現する",
    description:
      "この理念が私たちの存在意義であり、全ての事業活動の原動力です。この理念に基づき、社会に対して新しい価値を提供することを目指しています。",
  },
  business: {
    title: "事業内容",
    description:
      "当社は、以下の事業を通じて「シンプルで独創的な社会」の実現を目指しています。",
    items: [
      {
        name: "訪問看護事業",
        icon: "🏥",
        description:
          "積極的なIT活用で社員の業務負担を軽減することで安定的な地域医療への貢献を目指し、ご利用者様とそのご家族に寄り添ったサービスを提供します。",
      },
      {
        name: "IT支援事業",
        icon: "💻",
        description:
          "関東圏内の中小企業のITの導入・活用の課題解決をサポートし、業務効率化を通じて成長を支援します。",
      },
    ],
  },
  vision: {
    title: "成長戦略とビジョン",
    period: "〜2035年",
    pillars: ["再現性のあるサービス", "安定した基盤構築", "関東圏展開", "ブランド化"],
    goals: [
      {
        name: "訪問看護事業",
        target: "関東圏内に10拠点を展開",
        detail: "年間売上20億円達成、「フラクタル訪問看護」ブランドの確立",
      },
      {
        name: "IT支援事業",
        target: "IT産業への本格参入",
        detail: "ソフトウェア開発部門を設立",
      },
    ],
  },
  guidelines: [
    { num: 1, text: "感情は大切に、ただし判断はロジカルに" },
    { num: 2, text: "全員がチームであり、リーダーである" },
    { num: 3, text: "自己を理解して、他者を理解する" },
    { num: 4, text: "好奇心を知識に、知識を力にする" },
    { num: 5, text: "日々の不便から新たな発見をする" },
    { num: 6, text: "誰か・なにかにとって最善の行動をする" },
    { num: 7, text: "完璧なんてない、だからこそ最適化する" },
  ],
  dapae: {
    steps: [
      { name: "Data", ja: "データ", color: "bg-emerald-500" },
      { name: "Analysis", ja: "分析", color: "bg-teal-500" },
      { name: "Plan", ja: "計画", color: "bg-cyan-500" },
      { name: "Act", ja: "実行", color: "bg-sky-500" },
      { name: "Evaluation", ja: "評価", color: "bg-blue-500" },
    ],
    description:
      "継続的な改善と目標達成のための当社独自のフレームワーク。データに基づいた意思決定と、実行・評価による学びを重視し、成長し続けます。",
  },
  logo: {
    meanings: [
      {
        name: "フラクタル構造",
        description: "シンプルさと独創性、無限の可能性",
        icon: "△",
      },
      {
        name: "三つ葉のクローバー",
        description: "愛・信頼・希望",
        icon: "🍀",
      },
      {
        name: "再現性と最適化",
        description: "効率性とチームワーク",
        icon: "⚡",
      },
    ],
  },
};

// セクションコンポーネント
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-5xl mx-auto px-4">{children}</div>
    </section>
  );
}

export default function AboutFractalPage() {
  const [activeGuideline, setActiveGuideline] = useState(0);

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-lg hover:opacity-80 transition-opacity"
          >
            ← トップに戻る
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            フラクタルを知る
          </h1>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
        {/* 装飾的な三角形 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-500">
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-20 w-48 h-48 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-teal-500">
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-cyan-500">
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center px-4">
          {/* ロゴ */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 md:w-48 md:h-48">
              <Image
                src="/images/logos/corporate-logo.png"
                alt="株式会社フラクタル"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            株式会社フラクタル
          </h2>

          <p className="text-xl md:text-2xl text-primary/70 mb-8">
            シンプルで独創的な社会を実現する
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#philosophy"
              className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
            >
              理念を知る
            </a>
            <a
              href="#guidelines"
              className="px-6 py-3 bg-white text-primary border-2 border-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
            >
              行動指針を見る
            </a>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-primary/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* 基本理念 */}
      <Section id="philosophy" className="bg-white">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            PHILOSOPHY
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-primary">
            {aboutData.philosophy.title}
          </h3>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl transform rotate-1"></div>
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <p className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              {aboutData.philosophy.main}
            </p>
            <p className="text-center text-primary/70 max-w-2xl mx-auto text-lg">
              {aboutData.philosophy.description}
            </p>
          </div>
        </div>
      </Section>

      {/* 事業内容 */}
      <Section className="bg-gradient-to-b from-white to-emerald-50">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            BUSINESS
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-primary">
            {aboutData.business.title}
          </h3>
          <p className="text-primary/70 mt-4">{aboutData.business.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {aboutData.business.items.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-transparent rounded-bl-full opacity-50"></div>
              <span className="text-5xl mb-4 block">{item.icon}</span>
              <h4 className="text-2xl font-bold text-primary mb-4">{item.name}</h4>
              <p className="text-primary/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 成長戦略とビジョン */}
      <Section className="bg-emerald-900 text-white">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-emerald-700 text-emerald-100 rounded-full text-sm font-medium mb-4">
            VISION {aboutData.vision.period}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold">
            {aboutData.vision.title}
          </h3>
        </div>

        {/* 戦略の柱 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {aboutData.vision.pillars.map((pillar, index) => (
            <span
              key={index}
              className="px-6 py-3 bg-emerald-800 rounded-full text-emerald-100 font-medium"
            >
              {pillar}
            </span>
          ))}
        </div>

        {/* 目標 */}
        <div className="grid md:grid-cols-2 gap-8">
          {aboutData.vision.goals.map((goal, index) => (
            <div
              key={index}
              className="bg-emerald-800/50 backdrop-blur rounded-2xl p-6"
            >
              <h4 className="text-xl font-bold text-emerald-300 mb-2">
                {goal.name}
              </h4>
              <p className="text-2xl font-bold mb-2">{goal.target}</p>
              <p className="text-emerald-200/80">{goal.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7つの行動指針 */}
      <Section id="guidelines" className="bg-white">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-4">
            GUIDELINES
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-primary">
            7つの行動指針
          </h3>
          <p className="text-primary/70 mt-4">フラクタルで働くということ</p>
        </div>

        {/* インタラクティブな行動指針 */}
        <div className="grid md:grid-cols-7 gap-2 mb-8">
          {aboutData.guidelines.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveGuideline(index)}
              className={`p-4 rounded-xl transition-all duration-300 ${
                activeGuideline === index
                  ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white scale-110 shadow-lg"
                  : "bg-gray-100 text-primary hover:bg-gray-200"
              }`}
            >
              <span className="text-2xl font-bold">{item.num}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-10"></div>
          <div className="relative bg-white border-2 border-emerald-200 rounded-2xl p-8 md:p-12 text-center">
            <span className="inline-block w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full text-3xl font-bold leading-[4rem] mb-6">
              {aboutData.guidelines[activeGuideline].num}
            </span>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              {aboutData.guidelines[activeGuideline].text}
            </p>
          </div>
        </div>

        {/* 全リスト */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {aboutData.guidelines.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                activeGuideline === index
                  ? "bg-emerald-50 border-l-4 border-emerald-500"
                  : "bg-gray-50"
              }`}
            >
              <span
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  activeGuideline === index
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-primary"
                }`}
              >
                {item.num}
              </span>
              <p className="text-primary font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DAPAE */}
      <Section className="bg-gradient-to-br from-slate-900 to-emerald-900 text-white">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
            FRAMEWORK
          </span>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            DAPAE<span className="text-emerald-400">（ダパエ）</span>
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            {aboutData.dapae.description}
          </p>
        </div>

        {/* DAPAEサイクル */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-2">
          {aboutData.dapae.steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`${step.color} rounded-2xl p-6 text-center min-w-[100px] md:min-w-[120px]`}
              >
                <p className="text-sm opacity-80">{step.ja}</p>
                <p className="text-xl font-bold">{step.name}</p>
              </div>
              {index < aboutData.dapae.steps.length - 1 && (
                <svg
                  className="w-8 h-8 text-white/50 mx-2 hidden md:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* 循環の矢印 */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-emerald-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="font-medium">継続的な改善サイクル</span>
          </div>
        </div>
      </Section>

      {/* ロゴの意味 */}
      <Section className="bg-white">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            IDENTITY
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-primary">
            ロゴに込めた想い
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image
                src="/images/logos/corporate-logo.png"
                alt="株式会社フラクタル ロゴ"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 意味 */}
          <div className="flex-1 space-y-6">
            {aboutData.logo.meanings.map((meaning, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-transparent rounded-xl"
              >
                <span className="text-3xl">{meaning.icon}</span>
                <div>
                  <h4 className="font-bold text-primary text-lg">{meaning.name}</h4>
                  <p className="text-primary/70">{meaning.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            一緒に働きませんか？
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            フラクタルでは、私たちの理念に共感し、共に成長していける仲間を募集しています。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/recruit"
              className="px-8 py-4 bg-white text-emerald-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              採用情報を見る
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-700 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
