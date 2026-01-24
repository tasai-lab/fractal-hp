"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    {
      num: 1,
      shortTitle: "感情は大切に、ただし判断はロジカルに",
      subtitle: "感情と論理の両立：気持ちを大切にしながら、判断は冷静なデータや根拠で行う。",
      description: "自分や相手がどう感じているかという「気持ち」は無視せず、大切に扱う。ただし、仕事の決断を下すときは感情に流されず、事実やデータに基づいた「理屈（ロジカル）」で冷静に判断する。"
    },
    {
      num: 2,
      shortTitle: "全員がチームであり、リーダーである",
      subtitle: "全員がリーダー：全員が責任感を持ち、チーム一丸となって成果を追求する。",
      description: "「誰かがやってくれる」という他人任せの姿勢は捨てる。全員が責任者（リーダー）という意識を持ち、積極的に情報を共有しながら、チームとして最高の成果を追求する。"
    },
    {
      num: 3,
      shortTitle: "自己を理解して、他者を理解する",
      subtitle: "相互理解：己を知り他者を認めることで、お互いの弱みを補い合う。",
      description: "まずは自分の強みと弱みを正しく知る。それが相手を理解することにつながり、お互いの苦手を補い合うことで、一人では出せない大きな力を発揮できるようになる。"
    },
    {
      num: 4,
      shortTitle: "好奇心を知識に、知識を力にする",
      subtitle: "好奇心と知識：学びを武器に変え、多角的な視点で新しい価値を生み出す。",
      description: "「なぜ？」という好奇心を大切にし、学び続ける。知識が増えれば、物事を多角的に見られるようになる。「当たり前」を疑う姿勢が、新しい価値を生み出す武器になる。"
    },
    {
      num: 5,
      shortTitle: "日々の不便から新たな発見をする",
      subtitle: "不便の解消：日常の「使いにくさ」を放置せず、改善のヒントにする。",
      description: "毎日のちょっとした「不便さ」を「仕方ない」と放置しない。その違和感を見逃さずに改善案を出すことが、組織を成長させる大きなヒントになる。"
    },
    {
      num: 6,
      shortTitle: "誰か・なにかにとって最善の行動をする",
      subtitle: "他者への貢献：相手の利益を優先して動くことが、結果的に自らの成長を促す。",
      description: "自分の利益だけを考えず、「相手や社会にとって何が良いか」を基準に動く。他人に貢献することが信頼を生み、結果として自分や会社の成長として返ってくる。"
    },
    {
      num: 7,
      shortTitle: "完璧なんてない、だからこそ最適化する",
      subtitle: "常に最適化：完璧はない。IT等を活用し、常に仕組みをアップデートし続ける。",
      description: "この世に「完璧」なものなど存在しない。だからこそ現状に満足せず、ITなどを活用して、その時々の「ベストな状態」へと常に仕組みをアップデートし続ける。"
    },
  ],
  dapae: {
    title: "DAPAE（ダパエ）",
    tagline: "データ駆動型・成長サイクル",
    description:
      "客観的な事実（データ）を価値ある判断材料（情報）に変え、精度の高い意思決定を繰り返すためのフレームワーク。",
    introduction: {
      text: "ある日、スタッフから『書類作業が多すぎる』という声が上がりました。感情的には『大変そうだ』と思いますが、フラクタルでは感情だけで判断しません。まずはデータを集めるところから始めます。",
      icon: "💬",
    },
    steps: [
      {
        name: "Data",
        ja: "データ",
        subtitle: "事実の収集",
        color: "bg-emerald-500",
        description: "単なる数字や出来事を、色眼鏡なしに集める段階。",
        example: "訪問件数、キャンセル率、スタッフの稼働時間、顧客アンケートの生の声、市場の統計数値。それ自体は「ただの数字」である。",
        story: "まず、感情ではなく事実を集めました。1日の書類作業時間を計測したところ、平均2.5時間。どの書類に時間がかかるか記録すると、訪問記録が最多でした。",
      },
      {
        name: "Analysis",
        ja: "分析",
        subtitle: "情報の抽出",
        color: "bg-teal-500",
        description: "収集したデータを比較・加工し、意味のある「情報」へと変換する。",
        example: "「なぜキャンセルが増えたのか」という要因特定や、「競合他社と比較して自社が優れている点はどこか」という強みの抽出。課題や機会を浮き彫りにする。",
        story: "データを分析すると、パターンが見えてきました。手書き → PC入力 → 印刷という二度手間が発生していました。",
        beforeAfter: {
          before: "手書き → PC入力 → 印刷という二度手間",
          after: "タブレット直接入力 → 自動連携",
        },
      },
      {
        name: "Plan",
        ja: "計画",
        subtitle: "戦略の策定",
        color: "bg-cyan-500",
        description: "分析で得られた情報に基づき、勝算のある具体的な実行プランを立てる。",
        example: "達成すべきKPI（重要指標）の設定、ITツール導入による効率化手順の策定、担当者の割り振り、予算とスケジュールの確定。",
        story: "分析結果から、具体的な改善策を立てました。",
        checklist: [
          "タブレット導入で現場入力",
          "テンプレート統一で転記削減",
          "目標: 書類時間を1時間以内に",
        ],
      },
      {
        name: "Act",
        ja: "実行",
        subtitle: "柔軟な遂行",
        color: "bg-sky-500",
        description: "計画を現場で動かす。ここでは「やり抜くこと」と「状況に応じた微調整」を両立させる。",
        example: "新しいITシステムの運用開始。現場で発生した「不便」に対して、計画をガチガチに守るのではなく、目的達成のためにその場で最適化を行う。",
        story: "計画を実行しながら、現場の声で微調整しました。当初のテンプレートが使いにくいという声があり、現場で改良。入力タイミングも柔軟に変更しました。",
      },
      {
        name: "Evaluation",
        ja: "評価",
        subtitle: "成果の検証と蓄積",
        color: "bg-blue-500",
        description: "実行結果を定量（数字）と定性（質）の両面から振り返る。",
        example: "目標値（KPI）の達成率の確認。成功・失敗の要因を言語化し、それを新たな「データ」として次回のサイクルへと受け渡す。",
        story: "3ヶ月後、結果を検証しました。",
        results: {
          before: "2.5時間",
          after: "1.2時間",
          improvement: "52%削減",
        },
      },
    ],
    conclusion: {
      text: "この評価結果が新たなデータとなり、次の改善サイクルへ",
      subtitle: "DAPAEサイクルは終わらない成長の物語",
    },
    coreIdea: {
      title: "核心となる考え方：「データ」を「情報」へ",
      description: "このサイクルの肝は、「未加工の数値（データ）」に文脈や意味を与えて「行動の指針（情報）」へ昇華させることにある。",
      example: "例えば、単に「売上100万円」というデータがあっても、それが「目標の半分なのか、過去最高なのか」という分析がなければ、次の計画は立てられない。分析を経て「新規顧客は増えたがリピートが減っている」という情報になって初めて、正しい成長のサイクルが回り出す。",
    },
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
const Section = React.forwardRef<
  HTMLElement,
  {
    children: React.ReactNode;
    className?: string;
    id?: string;
  }
>(({ children, className = "", id }, ref) => {
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        paddingTop: 'var(--spacing-fluid-2xl)',
        paddingBottom: 'var(--spacing-fluid-2xl)'
      }}
    >
      <div
        className="max-w-5xl mx-auto"
        style={{ paddingLeft: 'var(--spacing-fluid-md)', paddingRight: 'var(--spacing-fluid-md)' }}
      >
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";

// スクロールアニメーション付きカードコンポーネント（DAPAEステップ用）
const AnimatedStepCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ナビゲーションセクション定義
const sections = [
  { id: "hero", label: "トップ" },
  { id: "philosophy", label: "基本理念" },
  { id: "business", label: "事業内容" },
  { id: "vision", label: "ビジョン" },
  { id: "guidelines", label: "行動指針" },
  { id: "dapae", label: "DAPAE" },
  { id: "logo", label: "ロゴ" },
];

export default function AboutFractalPage() {
  const [activeGuideline, setActiveGuideline] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [passedSections, setPassedSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // 行動指針切り替え時のフェードアニメーション
  const handleGuidelineChange = (index: number) => {
    if (index === activeGuideline) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveGuideline(index);
      setIsChanging(false);
    }, 150);
  };

  // Intersection Observerで現在位置を検出
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section, index) => {
      const element = sectionRefs.current[section.id];
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);

              // 現在のセクションより前のセクションを通過済みとして記録
              const currentIndex = sections.findIndex((s) => s.id === section.id);
              const passed = sections.slice(0, currentIndex).map((s) => s.id);
              setPassedSections(passed);
            }
          });
        },
        {
          rootMargin: "-50% 0px -50% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // セクションへスムーズスクロール
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

      {/* モバイルタブメニュー */}
      <nav className="md:hidden sticky top-[52px] z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 px-2 py-2 min-w-max">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeSection === section.id
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* デスクトップ固定サイドナビゲーション */}
      <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-3">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const isPassed = passedSections.includes(section.id);

            return (
              <div key={section.id} className="relative group">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-4 h-4 bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"
                      : isPassed
                      ? "w-2.5 h-2.5 bg-emerald-300"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`${section.label}へ移動`}
                />
                {/* ツールチップ */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                    {section.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ヒーローセクション */}
      <section
        id="hero"
        ref={(el) => { sectionRefs.current.hero = el; }}
        className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[var(--color-logo-light-green)]/5 to-white"
      >
        {/* 装飾的な三角形 - シンプルなフラクタルパターン */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[var(--color-logo-light-green)]">
              <polygon points="50,0 100,86.6 0,86.6" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[var(--color-logo-dark-green)]">
              <polygon points="50,0 100,86.6 0,86.6" />
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

          <h2
            className="font-bold text-primary tracking-wide"
            style={{
              fontSize: 'var(--font-size-fluid-3xl)',
              marginBottom: 'var(--spacing-fluid-lg)',
              letterSpacing: '0.05em'
            }}
          >
            株式会社フラクタル
          </h2>

          <p
            className="text-primary/70 font-normal"
            style={{
              fontSize: 'var(--font-size-fluid-xl)',
              marginBottom: 'var(--spacing-fluid-2xl)',
              letterSpacing: '0.03em'
            }}
          >
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
      <Section
        id="philosophy"
        className="bg-white relative overflow-hidden"
        ref={(el) => {
          if (el) sectionRefs.current.philosophy = el;
        }}
      >
        {/* 背景装飾 - ライトグリーン */}
        <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-[var(--color-logo-light-green)]/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 md:w-64 h-40 md:h-64 bg-[var(--color-logo-light-green)]/30 rounded-full blur-3xl -z-10"></div>

        <div
          className="text-center"
          style={{ marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          <span
            className="inline-block px-3 py-1 bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] rounded-full font-bold tracking-wider"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            PHILOSOPHY
          </span>
          <h3
            className="font-bold text-primary leading-tight"
            style={{ fontSize: 'var(--font-size-fluid-3xl)' }}
          >
            {aboutData.philosophy.title}
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-logo-light-green)] to-emerald-400 rounded-2xl md:rounded-4xl transform rotate-1 md:rotate-2 blur-sm opacity-70"></div>
          <div
            className="relative bg-white rounded-2xl md:rounded-4xl shadow-2xl border border-[var(--color-logo-light-green)]/30"
            style={{ padding: 'var(--spacing-fluid-lg)' }}
          >
            <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-gradient-to-r from-[var(--color-logo-light-green)] to-emerald-400 rounded-t-2xl md:rounded-t-4xl"></div>
            <p
              className="font-bold text-center bg-gradient-to-r from-emerald-600 to-[var(--color-logo-dark-green)] bg-clip-text text-transparent leading-tight"
              style={{ fontSize: 'var(--font-size-fluid-3xl)', marginBottom: 'var(--spacing-fluid-md)' }}
            >
              {aboutData.philosophy.main}
            </p>
            <p
              className="text-center text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
              style={{ fontSize: 'var(--font-size-fluid-base)' }}
            >
              {aboutData.philosophy.description}
            </p>
            <div
              className="flex justify-center"
              style={{ marginTop: 'var(--spacing-fluid-md)' }}
            >
              <div className="w-12 md:w-16 h-1 bg-[var(--color-logo-light-green)]/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* 事業内容 */}
      <Section
        id="business"
        className="bg-linear-to-b from-white to-emerald-50"
        ref={(el) => {
          if (el) sectionRefs.current.business = el;
        }}
      >
        <div
          className="text-center"
          style={{ marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          <span
            className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-medium"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            BUSINESS
          </span>
          <h3
            className="font-bold text-primary"
            style={{ fontSize: 'var(--font-size-fluid-2xl)' }}
          >
            {aboutData.business.title}
          </h3>
          <p
            className="text-primary/70"
            style={{ marginTop: 'var(--spacing-fluid-sm)', fontSize: 'var(--font-size-fluid-sm)' }}
          >
            {aboutData.business.description}
          </p>
        </div>

        <div
          className="grid md:grid-cols-2"
          style={{ gap: 'var(--spacing-fluid-md)' }}
        >
          {aboutData.business.items.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl md:rounded-3xl shadow-lg border-l-4 border-[var(--color-logo-yellow)] hover:border-[var(--color-logo-light-green)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ padding: 'var(--spacing-fluid-md)' }}
            >
              <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-[var(--color-logo-yellow)]/20 to-transparent rounded-bl-full opacity-50"></div>
              <h4
                className="font-bold text-primary"
                style={{ fontSize: 'var(--font-size-fluid-xl)', marginBottom: 'var(--spacing-fluid-sm)' }}
              >
                {item.name}
              </h4>
              <p
                className="text-primary/70 leading-relaxed"
                style={{ fontSize: 'var(--font-size-fluid-sm)' }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 成長戦略とビジョン */}
      <Section
        id="vision"
        className="bg-slate-900 text-white"
        ref={(el) => {
          if (el) sectionRefs.current.vision = el;
        }}
      >
        <div
          className="text-center"
          style={{ marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          <span
            className="inline-block px-3 py-1 bg-cyan-500 text-white rounded-full font-medium"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            VISION {aboutData.vision.period}
          </span>
          <h3
            className="font-bold text-white"
            style={{ fontSize: 'var(--font-size-fluid-3xl)' }}
          >
            {aboutData.vision.title}
          </h3>
        </div>

        {/* 戦略の柱 */}
        <div
          className="flex flex-wrap justify-center"
          style={{ gap: 'var(--spacing-fluid-sm)', marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          {aboutData.vision.pillars.map((pillar, index) => (
            <span
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-full text-white font-medium"
              style={{ padding: 'var(--spacing-fluid-xs) var(--spacing-fluid-md)', fontSize: 'var(--font-size-fluid-sm)' }}
            >
              {pillar}
            </span>
          ))}
        </div>

        {/* 目標 */}
        <div
          className="grid md:grid-cols-2"
          style={{ gap: 'var(--spacing-fluid-md)' }}
        >
          {aboutData.vision.goals.map((goal, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-2xl md:rounded-3xl"
              style={{ padding: 'var(--spacing-fluid-md)' }}
            >
              <h4
                className="font-bold text-cyan-400 flex items-center"
                style={{ fontSize: 'var(--font-size-fluid-base)', marginBottom: 'var(--spacing-fluid-sm)', gap: 'var(--spacing-fluid-xs)' }}
              >
                <span className="w-1.5 md:w-2 h-6 md:h-8 bg-cyan-500 rounded-full"></span>
                {goal.name}
              </h4>
              <p
                className="font-bold tracking-tight"
                style={{ fontSize: 'var(--font-size-fluid-2xl)', marginBottom: 'var(--spacing-fluid-sm)' }}
              >
                {goal.target}
              </p>
              <p
                className="text-slate-300 leading-relaxed"
                style={{ fontSize: 'var(--font-size-fluid-sm)' }}
              >
                {goal.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7つの行動指針 */}
      <Section
        id="guidelines"
        className="bg-slate-50"
        ref={(el) => {
          if (el) sectionRefs.current.guidelines = el;
        }}
      >
        <div
          className="text-center"
          style={{ marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          <span
            className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold tracking-wider"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            GUIDELINES
          </span>
          <h3
            className="font-bold text-primary"
            style={{ fontSize: 'var(--font-size-fluid-3xl)' }}
          >
            7つの行動指針
          </h3>
          <p
            className="text-slate-500"
            style={{ marginTop: 'var(--spacing-fluid-sm)', fontSize: 'var(--font-size-fluid-base)' }}
          >
            フラクタルで働くということ
          </p>
        </div>

        {/* インタラクティブな行動指針 */}
        <div className="max-w-5xl mx-auto">
          <div
            className="flex flex-wrap justify-center"
            style={{ gap: 'var(--spacing-fluid-sm)', marginBottom: 'var(--spacing-fluid-lg)' }}
          >
            {aboutData.guidelines.map((item, index) => (
              <button
                key={index}
                onClick={() => handleGuidelineChange(index)}
                className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 font-bold hover:scale-110 ${
                  activeGuideline === index
                    ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30 ring-2 md:ring-4 ring-emerald-100"
                    : "bg-white text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 border border-slate-200"
                }`}
                style={{ fontSize: 'var(--font-size-fluid-base)' }}
              >
                {item.num}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl md:rounded-3xl transform rotate-1 opacity-10 blur-xl"></div>
            <div
              className="relative bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100"
              style={{ padding: 'var(--spacing-fluid-lg)' }}
            >
              <div className={`transition-opacity duration-150 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
                <div style={{ marginBottom: 'var(--spacing-fluid-md)' }}>
                  <span
                    className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold"
                    style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
                  >
                    GUIDELINE {aboutData.guidelines[activeGuideline].num}
                  </span>
                  <h4
                    className="font-bold text-primary leading-tight"
                    style={{ fontSize: 'var(--font-size-fluid-2xl)', marginBottom: 'var(--spacing-fluid-sm)' }}
                  >
                    {aboutData.guidelines[activeGuideline].shortTitle}
                  </h4>
                  <p
                    className="text-teal-600 font-medium"
                    style={{ fontSize: 'var(--font-size-fluid-lg)' }}
                  >
                    {aboutData.guidelines[activeGuideline].subtitle}
                  </p>
                </div>
                <div
                  className="w-12 md:w-16 h-1 bg-emerald-100 rounded-full"
                  style={{ marginBottom: 'var(--spacing-fluid-md)' }}
                ></div>
                <p
                  className="text-slate-700 leading-relaxed max-w-3xl mx-auto"
                  style={{ fontSize: 'var(--font-size-fluid-base)' }}
                >
                  {aboutData.guidelines[activeGuideline].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 全リスト - モバイルではスクロール可能なリスト */}
        <div
          className="grid md:grid-cols-2"
          style={{ marginTop: 'var(--spacing-fluid-xl)', gap: 'var(--spacing-fluid-sm)' }}
        >
          {aboutData.guidelines.map((item, index) => (
            <div
              key={index}
              className={`flex items-center rounded-xl transition-all duration-300 cursor-pointer hover:-translate-y-0.5 ${
                activeGuideline === index
                  ? "bg-white shadow-md border-l-4 border-emerald-500"
                  : "bg-white/50 border border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm"
              }`}
              style={{ padding: 'var(--spacing-fluid-sm)', gap: 'var(--spacing-fluid-sm)' }}
              onClick={() => handleGuidelineChange(index)}
            >
              <span
                className={`shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  activeGuideline === index
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
                style={{ fontSize: 'var(--font-size-fluid-xs)' }}
              >
                {item.num}
              </span>
              <p
                className={`font-medium ${activeGuideline === index ? "text-primary" : "text-slate-500"}`}
                style={{ fontSize: 'var(--font-size-fluid-sm)' }}
              >
                {item.shortTitle}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* DAPAE */}
      <Section
        id="dapae"
        className="bg-[var(--color-logo-dark-green)] text-white relative overflow-hidden"
        ref={(el) => {
          if (el) sectionRefs.current.dapae = el;
        }}
      >
        <div
          className="text-center relative z-10"
          style={{ marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          <span
            className="inline-block px-3 py-1 bg-teal-500 text-white rounded-full font-medium"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            FRAMEWORK
          </span>
          <div
            className="text-center"
            style={{ marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            <h3
              className="font-bold tracking-tight"
              style={{ fontSize: 'var(--font-size-fluid-3xl)' }}
            >
              {aboutData.dapae.title}
            </h3>
            <p
              className="text-teal-300 font-medium"
              style={{ marginTop: 'var(--spacing-fluid-xs)', fontSize: 'var(--font-size-fluid-xl)' }}
            >
              {aboutData.dapae.tagline}
            </p>
          </div>
          <p
            className="text-white/80 max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: 'var(--font-size-fluid-sm)' }}
          >
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
              <p className="text-white/90 text-sm font-bold mb-2">
                情報 <span className="text-white/50">-Information-</span>
              </p>
              <div className="border-2 border-dashed border-amber-400/60 rounded-xl p-4 flex flex-col items-center gap-2 w-full max-w-[200px]">
                {/* Data */}
                <div className="bg-emerald-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-xs text-white/80">データ</p>
                  <p className="text-sm font-bold">Data</p>
                </div>
                {/* 下矢印 */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-2 bg-amber-400"></div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-400"></div>
                </div>
                {/* Analysis */}
                <div className="bg-teal-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-xs text-white/80">分析</p>
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
                  <p className="text-xs text-white/80">計画</p>
                  <p className="text-sm font-bold">Plan</p>
                </div>
                {/* 下矢印 */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-2 bg-amber-400"></div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-400"></div>
                </div>
                {/* Act */}
                <div className="bg-sky-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-xs text-white/80">実行</p>
                  <p className="text-sm font-bold">Act</p>
                </div>
                {/* 下矢印 */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-2 bg-amber-400"></div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-400"></div>
                </div>
                {/* Evaluation */}
                <div className="bg-blue-500 text-white px-6 py-2 rounded-lg border-2 border-white/20 shadow-lg w-full text-center">
                  <p className="text-xs text-white/80">評価</p>
                  <p className="text-sm font-bold">Evaluation</p>
                </div>
              </div>
            </div>
          </div>

          {/* デスクトップ表示: 横並び（2グループ） */}
          <div className="hidden md:flex items-end justify-center gap-4">
            {/* 情報（Information）囲み: Data + Analysis */}
            <div className="flex flex-col items-center">
              <p className="text-white/90 text-sm font-bold mb-2">
                情報 <span className="text-white/50">-Information-</span>
              </p>
              <div className="border-2 border-dashed border-amber-400/60 rounded-xl p-4 flex items-center gap-3">
                {/* Data */}
                <div className="bg-emerald-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-xs text-white/80 text-center">データ</p>
                  <p className="text-base font-bold text-center">Data</p>
                </div>
                {/* 矢印 → */}
                <div className="flex items-center">
                  <div className="w-6 h-[3px] bg-amber-400"></div>
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-amber-400"></div>
                </div>
                {/* Analysis */}
                <div className="bg-teal-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-xs text-white/80 text-center">分析</p>
                  <p className="text-base font-bold text-center">Analysis</p>
                </div>
              </div>
            </div>

            {/* 矢印 → （囲いの中央に揃える） */}
            <div className="flex items-center mb-[50px]">
              <div className="w-6 h-[3px] bg-amber-400"></div>
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-amber-400"></div>
            </div>

            {/* データ（Data）囲み: Plan + Act + Evaluation */}
            <div className="flex flex-col items-center">
              <p className="text-white/90 text-sm font-bold mb-2">
                データ <span className="text-white/50">-Data-</span>
              </p>
              <div className="border-2 border-dashed border-amber-400/60 rounded-xl p-4 flex items-center gap-3">
                {/* Plan */}
                <div className="bg-cyan-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-xs text-white/80 text-center">計画</p>
                  <p className="text-base font-bold text-center">Plan</p>
                </div>
                {/* 矢印 → */}
                <div className="flex items-center">
                  <div className="w-6 h-[3px] bg-amber-400"></div>
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-amber-400"></div>
                </div>
                {/* Act */}
                <div className="bg-sky-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-xs text-white/80 text-center">実行</p>
                  <p className="text-base font-bold text-center">Act</p>
                </div>
                {/* 矢印 → */}
                <div className="flex items-center">
                  <div className="w-6 h-[3px] bg-amber-400"></div>
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-amber-400"></div>
                </div>
                {/* Evaluation */}
                <div className="bg-blue-500 text-white px-8 py-3 rounded-lg border-2 border-white/20 shadow-lg">
                  <p className="text-xs text-white/80 text-center">評価</p>
                  <p className="text-base font-bold text-center">Evaluation</p>
                </div>
              </div>
            </div>
          </div>

          {/* GROWTH CYCLE テキスト */}
          <div
            className="text-center"
            style={{ marginTop: 'var(--spacing-fluid-lg)' }}
          >
            <p
              className="text-teal-400 font-bold tracking-widest"
              style={{ fontSize: 'var(--font-size-fluid-xs)' }}
            >
              GROWTH CYCLE
            </p>
            <p
              className="text-white/60"
              style={{ fontSize: 'var(--font-size-fluid-xs)', marginTop: 'var(--spacing-fluid-xs)' }}
            >
              データに基づいた継続的な改善
            </p>
          </div>

          {/* 導入カード */}
          <div
            className="max-w-4xl mx-auto"
            style={{ marginTop: 'var(--spacing-fluid-xl)', marginBottom: 'var(--spacing-fluid-lg)' }}
          >
            <div
              className="bg-slate-700/50 rounded-xl border-l-4 border-yellow-400"
              style={{ padding: 'var(--spacing-fluid-md)' }}
            >
              <div
                className="flex items-start"
                style={{ gap: 'var(--spacing-fluid-sm)' }}
              >
                <span
                  className="shrink-0"
                  style={{ fontSize: 'var(--font-size-fluid-2xl)' }}
                >
                  {aboutData.dapae.introduction.icon}
                </span>
                <p
                  className="text-white/90 italic leading-relaxed"
                  style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                >
                  {aboutData.dapae.introduction.text}
                </p>
              </div>
            </div>
          </div>

          {/* 各ステップの詳細説明 */}
          <div className="max-w-4xl mx-auto">
            {aboutData.dapae.steps.map((step, index) => (
              <AnimatedStepCard key={index} delay={index * 100}>
                <div className="flex items-start" style={{ gap: 'var(--spacing-fluid-md)' }}>
                  {/* 左側の大きな頭文字 */}
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 border-2 border-white/20">
                    <span
                      className="font-bold text-white"
                      style={{ fontSize: 'var(--font-size-fluid-2xl)' }}
                    >
                      {step.name[0]}
                    </span>
                  </div>

                  {/* 右側の説明カード */}
                  <div
                    className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all"
                    style={{ padding: 'var(--spacing-fluid-md)' }}
                  >
                    {/* タイトル（英語のみ）を改行 */}
                    <div style={{ marginBottom: 'var(--spacing-fluid-sm)' }}>
                      <h4
                        className="font-bold text-white"
                        style={{ fontSize: 'var(--font-size-fluid-lg)', marginBottom: '0.25rem' }}
                      >
                        {step.name}
                      </h4>
                      <p
                        className="text-teal-300 font-medium"
                        style={{ fontSize: 'var(--font-size-fluid-base)' }}
                      >
                        {step.subtitle}
                      </p>
                    </div>

                    {/* ストーリーセクション */}
                    <div
                      className="bg-white/5 rounded-lg border-l-2 border-emerald-400"
                      style={{ padding: 'var(--spacing-fluid-sm)', marginBottom: 'var(--spacing-fluid-sm)' }}
                    >
                      <p
                        className="text-emerald-200 font-bold"
                        style={{ fontSize: 'var(--font-size-fluid-sm)', marginBottom: 'var(--spacing-fluid-xs)' }}
                      >
                        現場の物語:
                      </p>
                      <p
                        className="text-white/80 leading-relaxed"
                        style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                      >
                        {step.story}
                      </p>
                    </div>

                    {/* Before/After対比（Analysisのみ） */}
                    {step.beforeAfter && (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2"
                        style={{ gap: 'var(--spacing-fluid-sm)', marginBottom: 'var(--spacing-fluid-sm)' }}
                      >
                        <div
                          className="bg-red-500/10 rounded-lg border border-red-500/20"
                          style={{ padding: 'var(--spacing-fluid-sm)' }}
                        >
                          <p
                            className="text-red-300 font-bold"
                            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-xs)' }}
                          >
                            Before:
                          </p>
                          <p
                            className="text-white/70"
                            style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                          >
                            {step.beforeAfter.before}
                          </p>
                        </div>
                        <div
                          className="bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                          style={{ padding: 'var(--spacing-fluid-sm)' }}
                        >
                          <p
                            className="text-emerald-300 font-bold"
                            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-xs)' }}
                          >
                            After:
                          </p>
                          <p
                            className="text-white/70"
                            style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                          >
                            {step.beforeAfter.after}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* チェックリスト（Planのみ） */}
                    {step.checklist && (
                      <div
                        className="bg-white/5 rounded-lg"
                        style={{ padding: 'var(--spacing-fluid-sm)', marginBottom: 'var(--spacing-fluid-sm)' }}
                      >
                        <p
                          className="text-cyan-200 font-bold"
                          style={{ fontSize: 'var(--font-size-fluid-sm)', marginBottom: 'var(--spacing-fluid-xs)' }}
                        >
                          改善計画:
                        </p>
                        <ul className="space-y-2">
                          {step.checklist.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className={i === step.checklist!.length - 1 ? "text-yellow-400" : "text-emerald-400"}>
                                {i === step.checklist!.length - 1 ? (
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </span>
                              <span
                                className={`text-white/80 ${i === step.checklist!.length - 1 ? 'font-bold' : ''}`}
                                style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 成果表示（Evaluationのみ） */}
                    {step.results && (
                      <div
                        className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-400/30"
                        style={{ padding: 'var(--spacing-fluid-md)', marginBottom: 'var(--spacing-fluid-sm)' }}
                      >
                        <p
                          className="text-emerald-200 font-bold"
                          style={{ fontSize: 'var(--font-size-fluid-sm)', marginBottom: 'var(--spacing-fluid-xs)' }}
                        >
                          成果:
                        </p>
                        <div
                          className="flex items-center justify-center my-3"
                          style={{ gap: 'var(--spacing-fluid-md)' }}
                        >
                          <div className="text-center">
                            <p className="text-white/60" style={{ fontSize: 'var(--font-size-fluid-xs)' }}>Before</p>
                            <p className="text-white font-bold" style={{ fontSize: 'var(--font-size-fluid-xl)' }}>{step.results.before}</p>
                          </div>
                          <span className="text-emerald-400" style={{ fontSize: 'var(--font-size-fluid-xl)' }}>→</span>
                          <div className="text-center">
                            <p className="text-white/60" style={{ fontSize: 'var(--font-size-fluid-xs)' }}>After</p>
                            <p className="text-emerald-400 font-bold" style={{ fontSize: 'var(--font-size-fluid-xl)' }}>{step.results.after}</p>
                          </div>
                        </div>
                        <p className="text-center text-emerald-300 font-bold" style={{ fontSize: 'var(--font-size-fluid-lg)' }}>{step.results.improvement}</p>
                      </div>
                    )}

                    {/* 説明 */}
                    <p
                      className="text-white/80 leading-relaxed"
                      style={{ fontSize: 'var(--font-size-fluid-sm)', marginBottom: 'var(--spacing-fluid-sm)' }}
                    >
                      {step.description}
                    </p>

                    {/* 具体例 */}
                    <div
                      className="bg-white/5 rounded-lg border-l-2 border-teal-400"
                      style={{ padding: 'var(--spacing-fluid-sm)' }}
                    >
                      <p
                        className="text-teal-200 font-bold"
                        style={{ fontSize: 'var(--font-size-fluid-sm)', marginBottom: 'var(--spacing-fluid-xs)' }}
                      >
                        具体例：
                      </p>
                      <p
                        className="text-white/70 leading-relaxed"
                        style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                      >
                        {step.example}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 下矢印（最後以外） */}
                {index < aboutData.dapae.steps.length - 1 && (
                  <div
                    className="flex justify-center"
                    style={{ marginTop: 'var(--spacing-fluid-md)', marginBottom: 'var(--spacing-fluid-md)' }}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" transform="rotate(90 12 12)" />
                    </svg>
                  </div>
                )}
              </AnimatedStepCard>
            ))}

            {/* 結論カード */}
            <AnimatedStepCard delay={500}>
              <div style={{ marginTop: 'var(--spacing-fluid-lg)' }}>
                <div
                  className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl border-2 border-teal-400/30 text-center"
                  style={{ padding: 'var(--spacing-fluid-lg)' }}
                >
                  <div
                    className="flex justify-center"
                    style={{ marginBottom: 'var(--spacing-fluid-sm)' }}
                  >
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p
                    className="text-white/90 font-medium"
                    style={{ fontSize: 'var(--font-size-fluid-base)', marginBottom: 'var(--spacing-fluid-xs)' }}
                  >
                    {aboutData.dapae.conclusion.text}
                  </p>
                  <p
                    className="text-teal-300"
                    style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                  >
                    {aboutData.dapae.conclusion.subtitle}
                  </p>
                </div>
              </div>
            </AnimatedStepCard>
          </div>

          {/* 核心となる考え方 */}
          <AnimatedStepCard delay={600}>
            <div
              className="max-w-3xl mx-auto"
              style={{ marginTop: 'var(--spacing-fluid-lg)' }}
            >
              <div
                className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl border-2 border-teal-400/30"
                style={{ padding: 'var(--spacing-fluid-lg)' }}
              >
                <h4
                  className="font-bold text-teal-300 text-center"
                  style={{ fontSize: 'var(--font-size-fluid-lg)', marginBottom: 'var(--spacing-fluid-sm)' }}
                >
                  {aboutData.dapae.coreIdea.title}
                </h4>
                <p
                  className="text-white/90 leading-relaxed"
                  style={{ fontSize: 'var(--font-size-fluid-sm)', marginBottom: 'var(--spacing-fluid-sm)' }}
                >
                  {aboutData.dapae.coreIdea.description}
                </p>
                <div
                  className="bg-white/5 rounded-lg border-l-4 border-yellow-400"
                  style={{ padding: 'var(--spacing-fluid-sm)' }}
                >
                  <p
                    className="text-white/80 leading-relaxed"
                    style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                  >
                    {aboutData.dapae.coreIdea.example}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedStepCard>
        </div>
      </Section>

      {/* ロゴの意味 */}
      <Section
        id="logo"
        className="bg-white relative overflow-hidden"
        ref={(el) => {
          if (el) sectionRefs.current.logo = el;
        }}
      >
        {/* 背景装飾 - イエロー */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-logo-yellow)]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-logo-yellow)]/10 rounded-full blur-3xl -z-10"></div>

        <div
          className="text-center"
          style={{ marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          <span
            className="inline-block px-3 py-1 bg-[var(--color-logo-yellow)]/30 text-[var(--color-logo-dark-green)] rounded-full font-medium"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            IDENTITY
          </span>
          <h3
            className="font-bold text-primary"
            style={{ fontSize: 'var(--font-size-fluid-2xl)' }}
          >
            ロゴに込めた想い
          </h3>
        </div>

        <div
          className="flex flex-col md:flex-row items-center"
          style={{ gap: 'var(--spacing-fluid-lg)' }}
        >
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
          <div className="flex-1 w-full" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-fluid-sm)' }}>
            {aboutData.logo.meanings.map((meaning, index) => (
              <div
                key={index}
                className="flex items-start bg-gradient-to-r from-[var(--color-logo-yellow)]/20 to-transparent rounded-xl border-l-2 border-[var(--color-logo-yellow)] hover:border-[var(--color-logo-light-green)] transition-all duration-300"
                style={{ padding: 'var(--spacing-fluid-sm)', gap: 'var(--spacing-fluid-sm)' }}
              >
                <span style={{ fontSize: 'var(--font-size-fluid-2xl)' }}>{meaning.icon}</span>
                <div>
                  <h4
                    className="font-bold text-primary"
                    style={{ fontSize: 'var(--font-size-fluid-base)' }}
                  >
                    {meaning.name}
                  </h4>
                  <p
                    className="text-primary/70"
                    style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                  >
                    {meaning.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 会社案内資料 */}
      <Section className="bg-slate-50">
        <div
          className="text-center"
          style={{ marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          <span
            className="inline-block px-3 py-1 bg-slate-200 text-slate-700 rounded-full font-medium"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            MATERIALS
          </span>
          <h3
            className="font-bold text-primary"
            style={{ fontSize: 'var(--font-size-fluid-2xl)' }}
          >
            資料で見るフラクタル
          </h3>
          <p
            className="text-primary/70"
            style={{ marginTop: 'var(--spacing-fluid-sm)', fontSize: 'var(--font-size-fluid-sm)' }}
          >
            企業理念や事業内容をまとめた資料をご覧いただけます。
          </p>
        </div>

        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4"
          style={{ paddingBottom: 'var(--spacing-fluid-md)', gap: 'var(--spacing-fluid-md)' }}
        >
          {[13, 14, 16, 17, 18, 19, 21].map((num, index) => (
            <div
              key={num}
              className="shrink-0 w-[75vw] md:w-150 snap-center"
              style={{ marginLeft: index === 0 ? 'var(--spacing-fluid-md)' : 0 }}
            >
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
          <div style={{ width: 'var(--spacing-fluid-md)', flexShrink: 0 }}></div>
        </div>
        <p
          className="text-center text-muted md:hidden"
          style={{ marginTop: 'var(--spacing-fluid-xs)', fontSize: 'var(--font-size-fluid-xs)' }}
        >
          ← スクロールしてご覧ください →
        </p>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-r from-[var(--color-logo-dark-green)] to-emerald-600 text-white">
        <div className="text-center">
          <h3
            className="font-bold"
            style={{
              fontSize: 'var(--font-size-fluid-2xl)',
              marginBottom: 'var(--spacing-fluid-md)'
            }}
          >
            一緒に働きませんか？
          </h3>
          <p
            className="text-white/90 max-w-2xl mx-auto"
            style={{ marginBottom: 'var(--spacing-fluid-lg)', fontSize: 'var(--font-size-fluid-sm)' }}
          >
            フラクタルでは、私たちの理念に共感し、共に成長していける仲間を募集しています。
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center"
            style={{ gap: 'var(--spacing-fluid-sm)' }}
          >
            <Link
              href="/recruit"
              className="bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold hover:bg-gray-100 transition-all hover:shadow-lg"
              style={{ padding: 'var(--spacing-fluid-sm) var(--spacing-fluid-lg)', fontSize: 'var(--font-size-fluid-sm)' }}
            >
              採用情報を見る
            </Link>
            <Link
              href="/#contact"
              className="bg-[var(--color-logo-dark-green)] text-white border-2 border-white/30 rounded-full font-bold hover:bg-[var(--color-logo-dark-green)]/90 transition-all hover:shadow-lg"
              style={{ padding: 'var(--spacing-fluid-sm) var(--spacing-fluid-lg)', fontSize: 'var(--font-size-fluid-sm)' }}
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
