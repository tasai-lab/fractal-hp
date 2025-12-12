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
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50 via-white to-cyan-50">
        {/* 装飾的な三角形 - アニメーション追加 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 opacity-10 animate-[spin_20s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-500">
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-20 w-48 h-48 opacity-10 animate-[spin_30s_linear_infinite_reverse]">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-teal-500">
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 opacity-5 animate-pulse">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-cyan-500">
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* ロゴ */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl">
              <Image
                src="/images/logos/corporate-logo.png"
                alt="株式会社フラクタル"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
            株式会社フラクタル
          </h2>

          <p className="text-xl md:text-3xl text-primary/80 mb-10 font-medium">
            シンプルで独創的な社会を実現する
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#philosophy"
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
            >
              理念を知る
            </a>
            <a
              href="#guidelines"
              className="px-8 py-4 bg-white text-emerald-800 border-2 border-emerald-100 rounded-full font-bold hover:border-emerald-600 hover:text-emerald-600 transition-all hover:scale-105 shadow-lg"
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
      <Section id="philosophy" className="bg-white relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10"></div>

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold tracking-wider mb-4">
            PHILOSOPHY
          </span>
          <h3 className="text-3xl md:text-5xl font-bold text-primary">
            {aboutData.philosophy.title}
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-teal-400 rounded-4xl transform rotate-2 blur-sm opacity-70"></div>
          <div className="relative bg-white rounded-4xl p-10 md:p-16 shadow-2xl border border-emerald-100">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-emerald-400 to-teal-400"></div>
            <p className="text-3xl md:text-6xl font-bold text-center bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-8 leading-tight">
              {aboutData.philosophy.main}
            </p>
            <p className="text-center text-slate-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
              {aboutData.philosophy.description}
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-16 h-1 bg-emerald-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* 事業内容 */}
      <Section className="bg-linear-to-b from-white to-emerald-50">
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-100 to-transparent rounded-bl-full opacity-50"></div>
              <h4 className="text-2xl font-bold text-primary mb-4">{item.name}</h4>
              <p className="text-primary/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 成長戦略とビジョン */}
      <Section className="relative bg-slate-900 text-white overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              VISION {aboutData.vision.period}
            </span>
            <h3 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">
              {aboutData.vision.title}
            </h3>
          </div>

          {/* 戦略の柱 */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {aboutData.vision.pillars.map((pillar, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-medium backdrop-blur-md hover:bg-white/10 transition-colors"
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
                className="group relative bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                  {goal.name}
                </h4>
                <p className="text-3xl font-bold mb-4 tracking-tight">{goal.target}</p>
                <p className="text-slate-300 leading-relaxed">{goal.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7つの行動指針 */}
      <Section id="guidelines" className="bg-slate-50">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-bold tracking-wider mb-4">
            GUIDELINES
          </span>
          <h3 className="text-3xl md:text-5xl font-bold text-primary">
            7つの行動指針
          </h3>
          <p className="text-slate-500 mt-4 text-lg">フラクタルで働くということ</p>
        </div>

        {/* インタラクティブな行動指針 */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {aboutData.guidelines.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveGuideline(index)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-lg md:text-xl ${
                  activeGuideline === index
                    ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-100"
                    : "bg-white text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 border border-slate-200"
                }`}
              >
                {item.num}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 rounded-3xl transform rotate-1 opacity-10 blur-xl"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-16 text-center shadow-xl border border-slate-100">
              <div className="mb-8">
                <span className="inline-block px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold mb-4">
                  GUIDELINE {aboutData.guidelines[activeGuideline].num}
                </span>
                <h4 className="text-2xl md:text-4xl font-bold text-primary leading-tight">
                  {aboutData.guidelines[activeGuideline].text}
                </h4>
              </div>
              <div className="w-16 h-1 bg-emerald-100 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 全リスト（モバイル用など一覧性が必要な場合） */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {aboutData.guidelines.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                activeGuideline === index
                  ? "bg-white shadow-md border-l-4 border-emerald-500"
                  : "bg-transparent border border-transparent hover:bg-white hover:border-slate-200"
              }`}
              onClick={() => setActiveGuideline(index)}
            >
              <span
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  activeGuideline === index
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {item.num}
              </span>
              <p className={`font-medium ${activeGuideline === index ? "text-primary" : "text-slate-500"}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DAPAE */}
      <Section className="bg-linear-to-br from-slate-900 via-emerald-900 to-slate-900 text-white relative">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_70%)] animate-pulse"></div>
        </div>

        <div className="text-center mb-16 relative z-10">
          <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-medium mb-4">
            FRAMEWORK
          </span>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            DAPAE<span className="text-emerald-400">.</span>
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            {aboutData.dapae.description}
          </p>
        </div>

          {/* DAPAEサイクル - 独創的な円環デザイン */}
          <div className="relative max-w-4xl mx-auto h-100 md:h-150 flex items-center justify-center dapae-circle-container">
            {/* 中心テキスト */}
            <div className="absolute z-20 text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-sm md:text-base text-emerald-300 font-bold tracking-widest mb-2">GROWTH CYCLE</p>
              <div className="text-3xl md:text-5xl font-bold text-white">成長の<br />サイクル</div>
            </div>

            {/* 循環ライン */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-55 h-55 md:w-110 md:h-110 rounded-full border-2 border-emerald-500/30 animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute w-50 h-50 md:w-105 md:h-105 rounded-full border border-emerald-400/20 animate-[spin_40s_linear_infinite_reverse]"></div>
            </div>

            {/* ステップアイテム */}
            {aboutData.dapae.steps.map((step, index) => {
              const total = aboutData.dapae.steps.length;
              const angle = (index * 360) / total - 90; // -90で上から開始
              
              return (
                <div
                  key={index}
                  className="dapae-item flex flex-col items-center justify-center group"
                  style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                >
                  <div 
                    className={`relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full ${step.color} flex flex-col items-center justify-center shadow-lg shadow-emerald-900/50 transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/50 cursor-pointer border-4 border-slate-900`}
                  >
                    <p className="text-xs md:text-sm font-bold text-white/90">{step.ja}</p>
                    <p className="text-lg md:text-2xl font-bold text-white">{step.name}</p>
                    
                    {/* 番号 */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-slate-900 rounded-full flex items-center justify-center font-bold border-2 border-slate-900">
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* 矢印（CSSで制御） */}
            {aboutData.dapae.steps.map((_, index) => {
              const total = aboutData.dapae.steps.length;
              const angle = (index * 360) / total - 90;
              return (
                <div 
                  key={`arrow-${index}`}
                  className="dapae-arrow"
                  style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                ></div>
              );
            })}
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
          <div className="shrink-0">
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
                className="flex items-start gap-4 p-4 bg-linear-to-r from-amber-50 to-transparent rounded-xl"
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

      {/* 会社案内資料 */}
      <Section className="bg-slate-50">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-slate-200 text-slate-700 rounded-full text-sm font-medium mb-4">
            MATERIALS
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-primary">
            資料で見るフラクタル
          </h3>
          <p className="text-primary/70 mt-4">
            企業理念や事業内容をまとめた資料をご覧いただけます。
          </p>
        </div>

        <div className="flex overflow-x-auto space-x-6 pb-8 px-4 snap-x snap-mandatory scrollbar-hide">
          {[13, 14, 16, 17, 18, 19, 21].map((num) => (
            <div key={num} className="shrink-0 w-[85vw] md:w-150 snap-center">
              <div className="relative aspect-video shadow-xl rounded-xl overflow-hidden border border-slate-200 bg-white group hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src={`/images/philosophy/${num}.png`}
                  alt={`フラクタル資料 ${num}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted mt-4 md:hidden">
          ← スクロールしてご覧ください →
        </p>
      </Section>

      {/* CTA */}
      <Section className="bg-linear-to-r from-emerald-500 to-teal-500 text-white">
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
