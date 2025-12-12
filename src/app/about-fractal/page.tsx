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
      "継続的な改善と目標達成のための当社独自のフレームワーク。\nデータに基づいた意思決定と、実行・評価による学びを重視し、成長し続けます。",
    detailedExplanation: [
      {
        title: "「データ」と「情報」の違い",
        content: "「データ」は未加工の事実や数値の羅列であり、それ自体は意味を持ちません。一方「情報」は、データを分析・解釈し、文脈や意味が付加され、意思決定や行動に役立つ形に変換されたものです。",
      },
      {
        title: "DAPAEサイクルの流れ",
        content: "まず収集したデータを分析して意味のある情報に変換します。その情報をもとに的確な戦略・計画を策定し、計画を実行に移します。実行段階では現場の判断で適切に軌道修正しながら継続。そして成功か失敗かという評価を行い、その結果が新たなデータとなります。このデータを再び分析して情報にするという循環を繰り返すことで、フラクタルは継続的に成長し続けます。",
      },
    ],
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
    <section id={id} className={`py-12 md:py-24 ${className}`}>
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
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-sm md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 戻る
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-primary">
            フラクタルを知る
          </h1>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50 via-white to-cyan-50">
        {/* 装飾的な三角形 - アニメーション追加 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 md:w-32 h-20 md:h-32 opacity-10 animate-[spin_20s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-500">
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 md:right-20 w-32 md:w-48 h-32 md:h-48 opacity-10 animate-[spin_30s_linear_infinite_reverse]">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-teal-500">
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-8">
          {/* ロゴ */}
          <div className="mb-6 md:mb-10 flex justify-center">
            <div className="relative w-24 h-24 md:w-48 md:h-48 drop-shadow-2xl">
              <Image
                src="/images/logos/corporate-logo.png"
                alt="株式会社フラクタル"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-2xl md:text-7xl font-bold text-primary mb-4 md:mb-6 tracking-tight">
            株式会社フラクタル
          </h2>

          <p className="text-base md:text-3xl text-primary/80 mb-6 md:mb-10 font-medium">
            シンプルで独創的な社会を実現する
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <a
              href="#philosophy"
              className="px-6 py-3 md:px-8 md:py-4 bg-emerald-600 text-white rounded-full font-bold text-sm md:text-base hover:bg-emerald-700 transition-all shadow-lg"
            >
              理念を知る
            </a>
            <a
              href="#guidelines"
              className="px-6 py-3 md:px-8 md:py-4 bg-white text-emerald-800 border-2 border-emerald-100 rounded-full font-bold text-sm md:text-base hover:border-emerald-600 hover:text-emerald-600 transition-all shadow-lg"
            >
              行動指針を見る
            </a>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-primary/50"
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
        <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-emerald-50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 md:w-64 h-40 md:h-64 bg-teal-50 rounded-full blur-3xl -z-10"></div>

        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs md:text-sm font-bold tracking-wider mb-3 md:mb-4">
            PHILOSOPHY
          </span>
          <h3 className="text-xl md:text-5xl font-bold text-primary leading-tight">
            {aboutData.philosophy.title}
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-teal-400 rounded-2xl md:rounded-4xl transform rotate-1 md:rotate-2 blur-sm opacity-70"></div>
          <div className="relative bg-white rounded-2xl md:rounded-4xl p-6 md:p-16 shadow-2xl border border-emerald-100">
            <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-linear-to-r from-emerald-400 to-teal-400 rounded-t-2xl md:rounded-t-4xl"></div>
            <p className="text-xl md:text-6xl font-bold text-center bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 md:mb-8 leading-tight">
              {aboutData.philosophy.main}
            </p>
            <p className="text-center text-slate-600 max-w-2xl mx-auto text-sm md:text-xl leading-relaxed font-medium">
              {aboutData.philosophy.description}
            </p>
            <div className="mt-4 md:mt-8 flex justify-center">
              <div className="w-12 md:w-16 h-1 bg-emerald-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* 事業内容 */}
      <Section className="bg-linear-to-b from-white to-emerald-50">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
            BUSINESS
          </span>
          <h3 className="text-2xl md:text-4xl font-bold text-primary">
            {aboutData.business.title}
          </h3>
          <p className="text-primary/70 mt-3 text-sm md:text-base">{aboutData.business.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {aboutData.business.items.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg"
            >
              <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-linear-to-br from-emerald-100 to-transparent rounded-bl-full opacity-50"></div>
              <h4 className="text-lg md:text-2xl font-bold text-primary mb-2 md:mb-4">{item.name}</h4>
              <p className="text-primary/70 leading-relaxed text-sm md:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 成長戦略とビジョン */}
      <Section className="bg-slate-900 text-white">
        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block px-3 py-1 bg-cyan-500 text-white rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
            VISION {aboutData.vision.period}
          </span>
          <h3 className="text-2xl md:text-5xl font-bold text-white">
            {aboutData.vision.title}
          </h3>
        </div>

        {/* 戦略の柱 */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16">
          {aboutData.vision.pillars.map((pillar, index) => (
            <span
              key={index}
              className="px-3 py-2 md:px-6 md:py-3 bg-slate-800 border border-slate-700 rounded-full text-white text-xs md:text-base font-medium"
            >
              {pillar}
            </span>
          ))}
        </div>

        {/* 目標 */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {aboutData.vision.goals.map((goal, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-2xl md:rounded-3xl p-5 md:p-8"
            >
              <h4 className="text-base md:text-xl font-bold text-cyan-400 mb-2 md:mb-4 flex items-center gap-2">
                <span className="w-1.5 md:w-2 h-6 md:h-8 bg-cyan-500 rounded-full"></span>
                {goal.name}
              </h4>
              <p className="text-xl md:text-3xl font-bold mb-2 md:mb-4 tracking-tight">{goal.target}</p>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">{goal.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7つの行動指針 */}
      <Section id="guidelines" className="bg-slate-50">
        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs md:text-sm font-bold tracking-wider mb-3 md:mb-4">
            GUIDELINES
          </span>
          <h3 className="text-2xl md:text-5xl font-bold text-primary">
            7つの行動指針
          </h3>
          <p className="text-slate-500 mt-2 md:mt-4 text-sm md:text-lg">フラクタルで働くということ</p>
        </div>

        {/* インタラクティブな行動指針 */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-12">
            {aboutData.guidelines.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveGuideline(index)}
                className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-base md:text-xl ${
                  activeGuideline === index
                    ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30 ring-2 md:ring-4 ring-emerald-100"
                    : "bg-white text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 border border-slate-200"
                }`}
              >
                {item.num}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl md:rounded-3xl transform rotate-1 opacity-10 blur-xl"></div>
            <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-16 text-center shadow-xl border border-slate-100">
              <div className="mb-4 md:mb-8">
                <span className="inline-block px-4 py-1 md:px-6 md:py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4">
                  GUIDELINE {aboutData.guidelines[activeGuideline].num}
                </span>
                <h4 className="text-lg md:text-4xl font-bold text-primary leading-tight">
                  {aboutData.guidelines[activeGuideline].text}
                </h4>
              </div>
              <div className="w-12 md:w-16 h-1 bg-emerald-100 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 全リスト - モバイルではスクロール可能なリスト */}
        <div className="mt-8 md:mt-16 grid md:grid-cols-2 gap-3 md:gap-6">
          {aboutData.guidelines.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                activeGuideline === index
                  ? "bg-white shadow-md border-l-4 border-emerald-500"
                  : "bg-white/50 border border-transparent hover:bg-white hover:border-slate-200"
              }`}
              onClick={() => setActiveGuideline(index)}
            >
              <span
                className={`shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${
                  activeGuideline === index
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {item.num}
              </span>
              <p className={`font-medium text-sm md:text-base ${activeGuideline === index ? "text-primary" : "text-slate-500"}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DAPAE */}
      <Section className="bg-slate-800 text-white relative overflow-hidden">
        <div className="text-center mb-8 md:mb-16 relative z-10">
          <span className="inline-block px-3 py-1 bg-teal-500 text-white rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
            FRAMEWORK
          </span>
          <div className="flex justify-center">
            <h3 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight inline-flex items-baseline">
              <span>DAPAE</span>
              <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-yellow-400 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 22,22 2,22" />
              </svg>
            </h3>
          </div>
          <p className="text-white/80 max-w-2xl mx-auto text-xs md:text-base leading-relaxed px-4 whitespace-pre-line">
            {aboutData.dapae.description}
          </p>
        </div>

        {/* DAPAEフローチャート */}
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          {/* モバイル: 完全縦並び / デスクトップ: 横並び（2グループ） */}

          {/* モバイル表示: 縦並び（2グループ囲み） */}
          <div className="md:hidden flex flex-col items-center gap-4">
            {/* 情報（Information）囲み */}
            <div className="flex flex-col items-center w-full">
              <p className="text-white/90 text-xs font-bold mb-2">
                情報 <span className="text-white/50">-Information-</span>
              </p>
              <div className="border-2 border-dashed border-amber-400/60 rounded-xl p-4 flex flex-col items-center gap-2 w-full max-w-[200px]">
                {/* Data */}
                <div className="bg-emerald-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-[10px] text-white/80">データ</p>
                  <p className="text-sm font-bold">Data</p>
                </div>
                {/* 下矢印 */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-2 bg-amber-400"></div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-400"></div>
                </div>
                {/* Analysis */}
                <div className="bg-teal-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-[10px] text-white/80">分析</p>
                  <p className="text-sm font-bold">Analysis</p>
                </div>
              </div>
            </div>

            {/* 下矢印（グループ間） */}
            <div className="flex flex-col items-center">
              <div className="w-[2px] h-4 bg-amber-400"></div>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-amber-400"></div>
            </div>

            {/* データ（Data）囲み */}
            <div className="flex flex-col items-center w-full">
              <p className="text-white/90 text-xs font-bold mb-2">
                データ <span className="text-white/50">-Data-</span>
              </p>
              <div className="border-2 border-dashed border-amber-400/60 rounded-xl p-4 flex flex-col items-center gap-2 w-full max-w-[200px]">
                {/* Plan */}
                <div className="bg-cyan-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-[10px] text-white/80">計画</p>
                  <p className="text-sm font-bold">Plan</p>
                </div>
                {/* 下矢印 */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-2 bg-amber-400"></div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-400"></div>
                </div>
                {/* Act */}
                <div className="bg-sky-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-[10px] text-white/80">実行</p>
                  <p className="text-sm font-bold">Act</p>
                </div>
                {/* 下矢印 */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-2 bg-amber-400"></div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-400"></div>
                </div>
                {/* Evaluation */}
                <div className="bg-blue-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-[10px] text-white/80">評価</p>
                  <p className="text-sm font-bold">Evaluation</p>
                </div>
              </div>
            </div>
          </div>

          {/* デスクトップ表示: 横並び（2グループ） */}
          <div className="hidden md:flex items-center justify-center gap-4">
            {/* 情報（Information）囲み: Data + Analysis */}
            <div className="flex flex-col items-center">
              <p className="text-white/90 text-sm font-bold mb-2">
                情報 <span className="text-white/50">-Information-</span>
              </p>
              <div className="border-2 border-dashed border-amber-400/60 rounded-xl p-4 flex items-center gap-3">
                {/* Data */}
                <div className="bg-emerald-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-[11px] text-white/80 text-center">データ</p>
                  <p className="text-base font-bold text-center">Data</p>
                </div>
                {/* 矢印 → */}
                <div className="flex items-center">
                  <div className="w-6 h-[3px] bg-amber-400"></div>
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-amber-400"></div>
                </div>
                {/* Analysis */}
                <div className="bg-teal-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-[11px] text-white/80 text-center">分析</p>
                  <p className="text-base font-bold text-center">Analysis</p>
                </div>
              </div>
            </div>

            {/* 矢印 → */}
            <div className="flex items-center">
              <div className="w-8 h-[3px] bg-amber-400"></div>
              <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[10px] border-l-amber-400"></div>
            </div>

            {/* データ（Data）囲み: Plan + Act + Evaluation */}
            <div className="flex flex-col items-center">
              <p className="text-white/90 text-sm font-bold mb-2">
                データ <span className="text-white/50">-Data-</span>
              </p>
              <div className="border-2 border-dashed border-amber-400/60 rounded-xl p-4 flex items-center gap-3">
                {/* Plan */}
                <div className="bg-cyan-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-[11px] text-white/80 text-center">計画</p>
                  <p className="text-base font-bold text-center">Plan</p>
                </div>
                {/* 矢印 → */}
                <div className="flex items-center">
                  <div className="w-6 h-[3px] bg-amber-400"></div>
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-amber-400"></div>
                </div>
                {/* Act */}
                <div className="bg-sky-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-[11px] text-white/80 text-center">実行</p>
                  <p className="text-base font-bold text-center">Act</p>
                </div>
                {/* 矢印 → */}
                <div className="flex items-center">
                  <div className="w-6 h-[3px] bg-amber-400"></div>
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-amber-400"></div>
                </div>
                {/* Evaluation */}
                <div className="bg-blue-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-[11px] text-white/80 text-center">評価</p>
                  <p className="text-base font-bold text-center">Evaluation</p>
                </div>
              </div>
            </div>
          </div>

          {/* GROWTH CYCLE テキスト */}
          <div className="text-center mt-8 md:mt-12">
            <p className="text-xs md:text-sm text-teal-400 font-bold tracking-widest">GROWTH CYCLE</p>
            <p className="text-white/60 text-[10px] md:text-xs mt-1">データに基づいた継続的な改善</p>
          </div>

          {/* 詳しい説明 */}
          <div className="max-w-3xl mx-auto mt-10 md:mt-16 space-y-5 md:space-y-8">
            {aboutData.dapae.detailedExplanation.map((item, index) => (
              <div key={index} className="bg-slate-700 rounded-xl p-5 md:p-8 border border-slate-600">
                <h4 className="text-sm md:text-lg font-bold text-teal-400 mb-3 md:mb-4">
                  {item.title}
                </h4>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ロゴの意味 */}
      <Section className="bg-white">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
            IDENTITY
          </span>
          <h3 className="text-2xl md:text-4xl font-bold text-primary">
            ロゴに込めた想い
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* ロゴ */}
          <div className="shrink-0">
            <div className="relative w-32 h-32 md:w-64 md:h-64">
              <Image
                src="/images/logos/corporate-logo.png"
                alt="株式会社フラクタル ロゴ"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 意味 */}
          <div className="flex-1 space-y-3 md:space-y-6 w-full">
            {aboutData.logo.meanings.map((meaning, index) => (
              <div
                key={index}
                className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-linear-to-r from-amber-50 to-transparent rounded-xl"
              >
                <span className="text-2xl md:text-3xl">{meaning.icon}</span>
                <div>
                  <h4 className="font-bold text-primary text-base md:text-lg">{meaning.name}</h4>
                  <p className="text-primary/70 text-sm md:text-base">{meaning.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 会社案内資料 */}
      <Section className="bg-slate-50">
        <div className="text-center mb-6 md:mb-12">
          <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
            MATERIALS
          </span>
          <h3 className="text-2xl md:text-4xl font-bold text-primary">
            資料で見るフラクタル
          </h3>
          <p className="text-primary/70 mt-2 md:mt-4 text-sm md:text-base">
            企業理念や事業内容をまとめた資料をご覧いただけます。
          </p>
        </div>

        <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-6 md:pb-8 px-2 md:px-4 snap-x snap-mandatory scrollbar-hide -mx-4">
          {[13, 14, 16, 17, 18, 19, 21].map((num) => (
            <div key={num} className="shrink-0 w-[75vw] md:w-150 snap-center first:ml-4 last:mr-4">
              <div className="relative aspect-video shadow-xl rounded-lg md:rounded-xl overflow-hidden border border-slate-200 bg-white">
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
        <p className="text-center text-xs text-muted mt-2 md:hidden">
          ← スクロールしてご覧ください →
        </p>
      </Section>

      {/* CTA */}
      <Section className="bg-linear-to-r from-emerald-500 to-teal-500 text-white">
        <div className="text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            一緒に働きませんか？
          </h3>
          <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
            フラクタルでは、私たちの理念に共感し、共に成長していける仲間を募集しています。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Link
              href="/recruit"
              className="px-6 py-3 md:px-8 md:py-4 bg-white text-emerald-600 rounded-full font-bold text-sm md:text-lg hover:bg-gray-100 transition-colors"
            >
              採用情報を見る
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 md:px-8 md:py-4 bg-emerald-600 text-white rounded-full font-bold text-sm md:text-lg hover:bg-emerald-700 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </Section>

      {/* モバイル下部メニュー分の余白 */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
}
