"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// 企業データ
const aboutData = {
  philosophy: {
    main: "シンプルで独創的な社会を実現する",
  },
  business: {
    title: "事業内容",
    description:
      "当社は、以下の事業を通じて「シンプルで独創的な社会」の実現を目指しています。",
    items: [
      {
        name: "訪問看護事業",
        description:
          "積極的なIT活用で社員の業務負担を軽減することで安定的な地域医療への貢献を目指し、ご利用者様とそのご家族に寄り添ったサービスを提供します。",
      },
      {
        name: "IT支援事業",
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
      shortTitle: "感情は大切に、判断はロジカルに",
      subtitle: "気持ちを尊重しつつ、決断は事実とデータで",
      description: "相手の気持ちや自分の感情を大切にしながらも、仕事の判断は感情に流されず、事実やデータに基づいて冷静に行う。",
      icon: "heart-data",
    },
    {
      num: 2,
      shortTitle: "全員がチーム、全員がリーダー",
      subtitle: "他人任せにせず、自分から動く",
      description: "「誰かがやるだろう」ではなく、全員が当事者意識を持つ。情報を積極的に共有し、チームとして最高の成果を目指す。",
      icon: "team",
    },
    {
      num: 3,
      shortTitle: "まず自分を知り、相手を理解する",
      subtitle: "強みと弱みを認め、補い合う",
      description: "自分の得意・不得意を正しく把握することが、相手を理解する第一歩。お互いの弱みを補い合うことで、一人では出せない力を発揮できる。",
      icon: "mirror",
    },
    {
      num: 4,
      shortTitle: "好奇心を知識に、知識を力に",
      subtitle: "「なぜ？」から始まる成長",
      description: "「なぜ？」という好奇心を持ち続け、学び続ける。知識が増えれば視野が広がり、「当たり前」を疑う力が新しい価値を生み出す。",
      icon: "lightbulb",
    },
    {
      num: 5,
      shortTitle: "不便は改善のヒント",
      subtitle: "違和感を見逃さない",
      description: "日々の「使いにくさ」や「面倒くささ」を放置しない。その違和感こそが、組織を成長させる改善の種になる。",
      icon: "tool",
    },
    {
      num: 6,
      shortTitle: "相手にとっての最善を考える",
      subtitle: "貢献が信頼を生む",
      description: "自分の利益だけでなく、相手や社会にとって何が良いかを基準に動く。貢献が信頼を生み、結果として自分の成長にもつながる。",
      icon: "handshake",
    },
    {
      num: 7,
      shortTitle: "完璧より最適化",
      subtitle: "常にアップデートし続ける",
      description: "完璧なものは存在しない。だからこそ現状に満足せず、ITなどを活用して、その時々のベストな状態へと仕組みを更新し続ける。",
      icon: "refresh",
    },
  ],
  logo: {
    meanings: [
      {
        name: "フラクタル構造",
        description: "同じパターンがスケールを変えて繰り返される「フラクタル」。シンプルなルールから無限の複雑さが生まれるこの数学的構造は、私たちの事業哲学を象徴しています。小さな改善の積み重ねが、やがて大きな価値へと成長していく。再現性のあるサービスを追求する姿勢がここに表れています。",
        icon: "△",
      },
      {
        name: "三つ葉のクローバー",
        description: "ロゴの中心を見ると、濃い緑色の「三つ葉のクローバー」が浮かび上がります。これは「愛・信頼・希望」という3つの価値を表しています。利用者様への愛情、地域社会との信頼関係、そしてより良い未来への希望。この3つを大切に、すべての活動に取り組んでいます。",
        icon: "🍀",
      },
      {
        name: "常に最適化",
        description: "三角形の配置には、あえて「完璧な対称」を避けています。完璧を追い求めるのではなく、状況に応じた最適解を見つけ続ける。DAPAEサイクルで常に改善を繰り返し、その時々のベストを追求する私たちの姿勢がここに込められています。",
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

// アイコンSVGを定義（行動指針用）
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "heart-data":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case "team":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "mirror":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "tool":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "handshake":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      );
    case "refresh":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    default:
      return null;
  }
};

// ナビゲーションセクション定義（新構成）
const sections = [
  { id: "hero", label: "トップ" },
  { id: "innovation", label: "革新性" },
  { id: "business", label: "事業内容" },
  { id: "vision", label: "ビジョン" },
  { id: "guidelines", label: "行動指針" },
  { id: "logo", label: "ロゴ＆資料" },
];

export default function AboutFractalPage() {
  const [activeGuideline, setActiveGuideline] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [passedSections, setPassedSections] = useState<string[]>([]);
  const [visibleDapaeSteps, setVisibleDapaeSteps] = useState<number[]>([]);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [activeItCard, setActiveItCard] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // prefers-reduced-motion の検出
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const dapaeRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const guidelineTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 行動指針切り替え時のフェードアニメーション
  const handleGuidelineChange = (index: number) => {
    if (index === activeGuideline) return;
    // 既存のタイムアウトをクリア
    if (guidelineTimeoutRef.current) {
      clearTimeout(guidelineTimeoutRef.current);
    }
    setIsChanging(true);
    guidelineTimeoutRef.current = setTimeout(() => {
      setActiveGuideline(index);
      setIsChanging(false);
      guidelineTimeoutRef.current = null;
    }, 150);
  };

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      if (guidelineTimeoutRef.current) {
        clearTimeout(guidelineTimeoutRef.current);
      }
    };
  }, []);

  // DAPAEステップの順番フェードインアニメーション
  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dapaeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 順番にステップを表示
            if (prefersReducedMotion) {
              // アニメーション無効時は即座に全ステップを表示
              setVisibleDapaeSteps([0, 1, 2, 3, 4]);
            } else {
              [0, 1, 2, 3, 4].forEach((index) => {
                const timeoutId = setTimeout(() => {
                  setVisibleDapaeSteps((prev) => [...prev, index]);
                }, index * 150);
                timeoutIds.push(timeoutId);
              });
            }
            dapaeObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (dapaeRef.current) {
      dapaeObserver.observe(dapaeRef.current);
    }

    return () => {
      dapaeObserver.disconnect();
      // 全てのタイマーをクリーンアップ
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);

  // CTAセクション到達時のアニメーション
  useEffect(() => {
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setCtaVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => ctaObserver.disconnect();
  }, []);

  // Intersection Observerで現在位置を検出（1つのObserverで全セクションを監視）
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);

            // 現在のセクションより前のセクションを通過済みとして記録
            const currentIndex = sections.findIndex((s) => s.id === sectionId);
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

    // 全セクションを同一のObserverで監視
    sections.forEach((section) => {
      const element = sectionRefs.current[section.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // セクションへスムーズスクロール（prefers-reduced-motion対応）
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  };

  return (
    <div className="min-h-screen body-editorial">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-sm md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 戻る
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-primary heading-gothic">
            株式会社フラクタル
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
                  ? "bg-[var(--color-logo-light-green)] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-[var(--color-logo-light-green)]/20"
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
                  className={`w-3 h-3 rounded-full ${prefersReducedMotion ? "" : "transition-all duration-300"} ${
                    isActive
                      ? `w-4 h-4 bg-[var(--color-logo-light-green)] ${prefersReducedMotion ? "" : "animate-pulse"} shadow-lg shadow-[var(--color-logo-light-green)]/50`
                      : isPassed
                      ? "w-2.5 h-2.5 bg-[var(--color-logo-light-green)]/60"
                      : `w-2 h-2 bg-slate-300 ${prefersReducedMotion ? "" : "hover:bg-[var(--color-logo-light-green)]/40"}`
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

      {/* ヒーローセクション - 革新性を強調 */}
      <section
        id="hero"
        ref={(el) => { sectionRefs.current.hero = el; }}
        className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--color-logo-dark-green) 0%, var(--color-logo-dark-green) 40%, var(--color-logo-light-green) 100%)'
        }}
      >
        {/* 装飾的な三角形 - フラクタルパターン */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10" aria-hidden="true">
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white" aria-hidden="true">
              <polygon points="50,0 100,86.6 0,86.6" />
            </svg>
          </div>
          <div className="absolute top-20 left-10 w-32 md:w-48 h-32 md:h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white" aria-hidden="true">
              <polygon points="50,0 100,86.6 0,86.6" />
            </svg>
          </div>
          <div className="absolute top-1/2 right-1/4 w-24 md:w-32 h-24 md:h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white" aria-hidden="true">
              <polygon points="50,0 100,86.6 0,86.6" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            {/* ロゴ（大きく） */}
            <div className="mb-8 md:mb-12 flex justify-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 drop-shadow-2xl">
                <Image
                  src="/images/logos/corporate-logo.png"
                  alt="株式会社フラクタル"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <p
              className="text-[var(--color-logo-yellow)] font-bold tracking-widest uppercase mb-4"
              style={{ fontSize: 'var(--font-size-fluid-sm)' }}
            >
              Corporate Philosophy
            </p>

            {/* タイプライター風アニメーション */}
            <h2
              className="font-bold text-white tracking-wide heading-gothic whitespace-nowrap overflow-hidden mx-auto inline-block typing-main"
              style={{
                fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                lineHeight: '1.4',
              }}
            >
              シンプルで独創的な社会を実現する
            </h2>

            {/* サブテキスト - 遅延タイピングアニメーション */}
            <p
              className="text-white/80 font-normal whitespace-nowrap overflow-hidden mx-auto block mt-4 typing-sub"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                lineHeight: '1.6',
              }}
            >
              シンプルな仕組みがもたらす独自性と業務効率が成長へ
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-12">
              <a
                href="#innovation"
                className="px-6 py-3 md:px-8 md:py-4 bg-[var(--color-logo-yellow)] text-[var(--color-logo-dark-green)] rounded-full font-bold text-sm md:text-base hover:bg-[var(--color-logo-yellow)]/80 transition-all shadow-lg"
              >
                革新性を見る
              </a>
              <a
                href="#vision"
                className="px-6 py-3 md:px-8 md:py-4 bg-white/10 text-white border-2 border-white/30 rounded-full font-bold text-sm md:text-base hover:bg-white/20 transition-all"
              >
                ビジョンを知る
              </a>
            </div>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className={`absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 ${prefersReducedMotion ? "" : "animate-bounce"}`} aria-hidden="true">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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

      {/* 革新性の証明セクション */}
      <Section
        id="innovation"
        className="bg-white relative overflow-hidden"
        ref={(el) => {
          if (el) sectionRefs.current.innovation = el;
        }}
      >
        {/* 背景装飾 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-logo-yellow)]/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-logo-light-green)]/20 rounded-full blur-3xl -z-10"></div>

        <div className="text-center" style={{ marginBottom: 'var(--spacing-fluid-xl)' }}>
          <span
            className="inline-block px-3 py-1 bg-[var(--color-logo-yellow)] text-[var(--color-logo-dark-green)] rounded-full font-bold tracking-wider"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            INNOVATION
          </span>
          <h3
            className="font-bold text-primary heading-gothic"
            style={{ fontSize: 'var(--font-size-fluid-3xl)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            DAPAE - フラクタルの成長サイクル
          </h3>
          <p
            className="text-primary/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: 'var(--font-size-fluid-base)' }}
          >
            「大変」で終わらない、「なぜこうなっている、ではどうする」という考え方
          </p>
        </div>

        {/* DAPAE 5ステップ - レスポンシブ対応 */}
        <div ref={dapaeRef} className="max-w-5xl mx-auto" style={{ marginBottom: 'var(--spacing-fluid-xl)' }}>
          <div className="flex flex-col md:flex-row md:items-stretch md:justify-center gap-3 md:gap-2 lg:gap-4">
            {/* Data */}
            <div
              className={`flex-1 bg-[var(--color-logo-dark-green)] rounded-2xl p-5 md:p-4 lg:p-5 text-white text-center shadow-lg ${prefersReducedMotion ? "" : "transition-all duration-500"} ${
                prefersReducedMotion || visibleDapaeSteps.includes(0)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto mb-3 rounded-full bg-[var(--color-logo-yellow)] flex items-center justify-center">
                <span className="font-bold text-xl md:text-lg lg:text-xl text-[var(--color-logo-dark-green)]">D</span>
              </div>
              <p className="font-bold text-base md:text-sm lg:text-base mb-1">Data</p>
              <p className="text-white/90 text-sm md:text-xs lg:text-sm leading-relaxed">現場の事実を数字で記録</p>
            </div>

            {/* 矢印 */}
            <div className="flex items-center justify-center py-1 md:py-0 md:px-1" aria-hidden="true">
              <svg className="w-6 h-6 md:w-4 md:h-4 text-[var(--color-logo-dark-green)]/40 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Analysis */}
            <div
              className={`flex-1 bg-[var(--color-logo-dark-green)]/85 rounded-2xl p-5 md:p-4 lg:p-5 text-white text-center shadow-lg ${prefersReducedMotion ? "" : "transition-all duration-500"} ${
                prefersReducedMotion || visibleDapaeSteps.includes(1)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto mb-3 rounded-full bg-[var(--color-logo-yellow)] flex items-center justify-center">
                <span className="font-bold text-xl md:text-lg lg:text-xl text-[var(--color-logo-dark-green)]">A</span>
              </div>
              <p className="font-bold text-base md:text-sm lg:text-base mb-1">Analysis</p>
              <p className="text-white/90 text-sm md:text-xs lg:text-sm leading-relaxed">課題と改善のヒントを抽出</p>
            </div>

            {/* 矢印 */}
            <div className="flex items-center justify-center py-1 md:py-0 md:px-1" aria-hidden="true">
              <svg className="w-6 h-6 md:w-4 md:h-4 text-[var(--color-logo-yellow)]/60 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Plan - 中央アクセント */}
            <div
              className={`flex-1 bg-[var(--color-logo-yellow)] rounded-2xl p-5 md:p-4 lg:p-5 text-[var(--color-logo-dark-green)] text-center shadow-lg ring-2 ring-[var(--color-logo-dark-green)]/20 ${prefersReducedMotion ? "" : "transition-all duration-500"} ${
                prefersReducedMotion || visibleDapaeSteps.includes(2)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto mb-3 rounded-full bg-[var(--color-logo-dark-green)] flex items-center justify-center shadow">
                <span className="font-bold text-xl md:text-lg lg:text-xl text-white">P</span>
              </div>
              <p className="font-bold text-base md:text-sm lg:text-base mb-1">Plan</p>
              <p className="text-[var(--color-logo-dark-green)]/80 text-sm md:text-xs lg:text-sm leading-relaxed">負担を減らす具体策を設計</p>
            </div>

            {/* 矢印 */}
            <div className="flex items-center justify-center py-1 md:py-0 md:px-1" aria-hidden="true">
              <svg className="w-6 h-6 md:w-4 md:h-4 text-[var(--color-logo-light-green)]/60 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Act */}
            <div
              className={`flex-1 bg-[var(--color-logo-light-green)] rounded-2xl p-5 md:p-4 lg:p-5 text-white text-center shadow-lg ${prefersReducedMotion ? "" : "transition-all duration-500"} ${
                prefersReducedMotion || visibleDapaeSteps.includes(3)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto mb-3 rounded-full bg-[var(--color-logo-yellow)] flex items-center justify-center">
                <span className="font-bold text-xl md:text-lg lg:text-xl text-[var(--color-logo-dark-green)]">A</span>
              </div>
              <p className="font-bold text-base md:text-sm lg:text-base mb-1">Act</p>
              <p className="text-white/90 text-sm md:text-xs lg:text-sm leading-relaxed">状況に応じて柔軟に実行</p>
            </div>

            {/* 矢印 */}
            <div className="flex items-center justify-center py-1 md:py-0 md:px-1" aria-hidden="true">
              <svg className="w-6 h-6 md:w-4 md:h-4 text-[var(--color-logo-dark-green)]/40 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Evaluation */}
            <div
              className={`flex-1 bg-[var(--color-logo-light-green)]/85 rounded-2xl p-5 md:p-4 lg:p-5 text-white text-center shadow-lg ${prefersReducedMotion ? "" : "transition-all duration-500"} ${
                prefersReducedMotion || visibleDapaeSteps.includes(4)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto mb-3 rounded-full bg-[var(--color-logo-yellow)] flex items-center justify-center">
                <span className="font-bold text-xl md:text-lg lg:text-xl text-[var(--color-logo-dark-green)]">E</span>
              </div>
              <p className="font-bold text-base md:text-sm lg:text-base mb-1">Evaluation</p>
              <p className="text-white/90 text-sm md:text-xs lg:text-sm leading-relaxed">成果を確認し学びを次へ</p>
            </div>
          </div>
        </div>

        {/* IT活用実績 */}
        <div className="max-w-4xl mx-auto">
          <h4
            className="text-center font-bold text-primary"
            style={{ fontSize: 'var(--font-size-fluid-xl)', marginBottom: 'var(--spacing-fluid-md)' }}
          >
            IT活用による成果
          </h4>

          {/* 数値カード - ホバー/フォーカス/タップで詳細表示 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" style={{ marginBottom: 'var(--spacing-fluid-lg)' }}>
            {[
              { value: "52%", label: "書類作業時間削減", detail: "音声入力と手入力の組み合わせで、記録作成の手間を大幅に削減。重要な情報の抜け漏れもなくなりました。" },
              { value: "2.5h", label: "→ 1.2h に短縮", detail: "残業時間が減少し、利用者様との対話やケアに集中できる時間が増加しました。" },
              { value: "3ヶ月", label: "で効果を実証", detail: "DAPAEサイクルで課題を可視化し、短期間で改善効果を実証。継続的な改善につなげています。" }
            ].map((card, index) => {
              const isActive = activeItCard === index;
              return (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  className={`group relative bg-gradient-to-br from-[var(--color-logo-yellow)]/30 to-[var(--color-logo-yellow)]/10 rounded-xl p-6 text-center border border-[var(--color-logo-yellow)]/50 ${
                    prefersReducedMotion ? "" : "hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  } cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-logo-light-green)] focus:ring-offset-2`}
                  onClick={() => setActiveItCard(isActive ? null : index)}
                  onFocus={() => setActiveItCard(index)}
                  onBlur={() => setActiveItCard(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveItCard(isActive ? null : index);
                    }
                  }}
                >
                  <p className={`text-[var(--color-logo-dark-green)] font-bold ${
                    prefersReducedMotion ? "" : "transition-all duration-300 group-hover:scale-110"
                  }`} style={{ fontSize: 'var(--font-size-fluid-3xl)' }}>{card.value}</p>
                  <p className="text-primary/70 font-medium" style={{ fontSize: 'var(--font-size-fluid-sm)' }}>{card.label}</p>
                  {/* ホバー/フォーカス/タップ時の詳細情報 */}
                  <div className={`absolute inset-0 bg-[var(--color-logo-dark-green)]/95 flex items-center justify-center p-4 ${
                    prefersReducedMotion ? "" : "transition-opacity duration-300"
                  } ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus:opacity-100"}`}>
                    <p className="text-white text-sm leading-relaxed">{card.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Before/After ストーリー */}
          <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Before カード */}
              <div className="relative bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5">
                {/* 左上の三角マーク */}
                <div
                  className="absolute -top-px -left-px w-0 h-0"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '24px 24px 0 0',
                    borderColor: '#ef4444 transparent transparent transparent'
                  }}
                />
                <p className="text-red-500 font-bold text-sm tracking-wider mb-2 pl-4">Before</p>
                <p className="text-primary/70 leading-relaxed" style={{ fontSize: 'var(--font-size-fluid-sm)' }}>
                  記録項目が多く何を書くべきか分かりにくい。手入力に時間がかかり残業が発生、重要な情報の抜け漏れも散見されていた。
                </p>
              </div>
              {/* After カード */}
              <div className="relative bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5">
                {/* 左上の三角マーク */}
                <div
                  className="absolute -top-px -left-px w-0 h-0"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '24px 24px 0 0',
                    borderColor: 'var(--color-logo-light-green) transparent transparent transparent'
                  }}
                />
                <p className="text-[var(--color-logo-dark-green)] font-bold text-sm tracking-wider mb-2 pl-4">After</p>
                <p className="text-primary/70 leading-relaxed" style={{ fontSize: 'var(--font-size-fluid-sm)' }}>
                  音声入力を導入し、重要項目は手入力で補完する運用へ。記録作成が効率化され、要点を押さえた質の高い記録を短時間で作成できるように。
                </p>
              </div>
            </div>
          </div>

          {/* 締めのメッセージ */}
          <div className="text-center" style={{ marginTop: 'var(--spacing-fluid-lg)' }}>
            <p
              className="text-[var(--color-logo-dark-green)] font-bold"
              style={{ fontSize: 'var(--font-size-fluid-lg)' }}
            >
              仕組みが、質の高いサービスを生みだす。
            </p>
          </div>
        </div>
      </Section>

      {/* 事業内容 */}
      <Section
        id="business"
        className="bg-gradient-to-b from-white to-[var(--color-logo-light-green)]/10"
        ref={(el) => {
          if (el) sectionRefs.current.business = el;
        }}
      >
        <div
          className="text-center"
          style={{ marginBottom: 'var(--spacing-fluid-xl)' }}
        >
          <span
            className="inline-block px-3 py-1 bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] rounded-full font-medium"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            BUSINESS
          </span>
          <h3
            className="font-bold text-primary heading-gothic"
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
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'var(--spacing-fluid-md)' }}
        >
          {aboutData.business.items.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-xl sm:rounded-2xl shadow-sm ${
                prefersReducedMotion ? "" : "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              }`}
              style={{ padding: 'var(--spacing-fluid-md)' }}
            >
              {/* 左上の三角マーク */}
              <div
                className="absolute -top-px -left-px w-0 h-0"
                style={{
                  borderStyle: 'solid',
                  borderWidth: '32px 32px 0 0',
                  borderColor: `${index === 0 ? 'var(--color-logo-dark-green)' : 'var(--color-logo-light-green)'} transparent transparent transparent`
                }}
              />
              {/* 右下の小さな三角（ホバー時に強調） */}
              <div
                className={`absolute bottom-0 right-0 w-0 h-0 ${
                  prefersReducedMotion ? "opacity-30" : "opacity-20 group-hover:opacity-50 transition-opacity"
                }`}
                style={{
                  borderStyle: 'solid',
                  borderWidth: '0 0 20px 20px',
                  borderColor: `transparent transparent ${index === 0 ? 'var(--color-logo-light-green)' : 'var(--color-logo-yellow)'} transparent`
                }}
              />
              <h4
                className="font-bold text-primary heading-gothic pl-4"
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

      {/* ビジョン・基本理念（統合セクション） */}
      <Section
        id="vision"
        className="bg-slate-900 text-white"
        ref={(el) => {
          if (el) sectionRefs.current.vision = el;
        }}
      >
        {/* 基本理念部分 */}
        <div className="text-center" style={{ marginBottom: 'var(--spacing-fluid-xl)' }}>
          <span
            className="inline-block px-3 py-1 bg-[var(--color-logo-light-green)] text-white rounded-full font-bold tracking-wider"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            PHILOSOPHY & VISION
          </span>
          <h3
            className="font-bold text-white"
            style={{ fontSize: 'var(--font-size-fluid-3xl)', marginBottom: 'var(--spacing-fluid-md)' }}
          >
            {aboutData.philosophy.main}
          </h3>
          <p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontSize: 'var(--font-size-fluid-base)' }}
          >
            この理念に基づき、社会に新しい価値を提供します。
          </p>
        </div>

        {/* ビジョン部分 */}
        <div
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          style={{ padding: 'var(--spacing-fluid-lg)', marginBottom: 'var(--spacing-fluid-lg)' }}
        >
          <div className="text-center" style={{ marginBottom: 'var(--spacing-fluid-md)' }}>
            <span
              className="inline-block px-3 py-1 bg-[var(--color-logo-light-green)] text-white rounded-full font-medium"
              style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
            >
              {aboutData.vision.period}
            </span>
            <h4
              className="font-bold text-white"
              style={{ fontSize: 'var(--font-size-fluid-xl)' }}
            >
              {aboutData.vision.title}
            </h4>
          </div>

          {/* 戦略の柱 */}
          <div
            className="flex flex-wrap justify-center"
            style={{ gap: 'var(--spacing-fluid-xs)', marginBottom: 'var(--spacing-fluid-md)' }}
          >
            {aboutData.vision.pillars.map((pillar, index) => (
              <span
                key={index}
                className="bg-slate-700/50 border border-slate-600 rounded-full text-white/90 font-medium"
                style={{ padding: '0.25rem 0.75rem', fontSize: 'var(--font-size-fluid-xs)' }}
              >
                {pillar}
              </span>
            ))}
          </div>

          {/* 目標 */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--spacing-fluid-sm)' }}>
            {aboutData.vision.goals.map((goal, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/50 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/70"
                style={{ padding: 'var(--spacing-fluid-sm)' }}
              >
                {/* 左上の三角マーク */}
                <div
                  className="absolute -top-px -left-px w-0 h-0"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '24px 24px 0 0',
                    borderColor: `${index === 0 ? 'var(--color-logo-light-green)' : 'var(--color-logo-yellow)'} transparent transparent transparent`
                  }}
                />
                <h5
                  className="font-bold pl-4"
                  style={{
                    fontSize: 'var(--font-size-fluid-sm)',
                    marginBottom: 'var(--spacing-fluid-xs)',
                    color: index === 0 ? 'var(--color-logo-light-green)' : 'var(--color-logo-yellow)'
                  }}
                >
                  {goal.name}
                </h5>
                <p
                  className="font-bold text-white"
                  style={{ fontSize: 'var(--font-size-fluid-base)', marginBottom: '0.25rem' }}
                >
                  {goal.target}
                </p>
                <p
                  className="text-slate-400"
                  style={{ fontSize: 'var(--font-size-fluid-xs)' }}
                >
                  {goal.detail}
                </p>
                {/* 右下の小さな三角 */}
                <div
                  className="absolute bottom-0 right-0 w-0 h-0 opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '0 0 16px 16px',
                    borderColor: `transparent transparent ${index === 0 ? 'var(--color-logo-light-green)' : 'var(--color-logo-yellow)'} transparent`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7つの行動指針 - アイコン付き小カードUI */}
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
            className="inline-block px-3 py-1 bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] rounded-full font-bold tracking-wider"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            GUIDELINES
          </span>
          <h3
            className="font-bold text-primary heading-gothic"
            style={{ fontSize: 'var(--font-size-fluid-2xl)' }}
          >
            7つの行動指針
          </h3>
          <p
            className="text-slate-500"
            style={{ marginTop: 'var(--spacing-fluid-xs)', fontSize: 'var(--font-size-fluid-sm)' }}
          >
            フラクタルで働くということ
          </p>
        </div>

        {/* アイコン付き小カードグリッド */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {aboutData.guidelines.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  className={`group bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-[var(--color-logo-light-green)]/50 transition-all duration-300 cursor-pointer text-left ${
                    activeGuideline === index ? "ring-2 ring-[var(--color-logo-light-green)] border-[var(--color-logo-light-green)]/50" : ""
                  }`}
                  style={{ padding: 'var(--spacing-fluid-sm)' }}
                  onClick={() => handleGuidelineChange(index)}
                  aria-pressed={activeGuideline === index}
                >
                  {/* アイコンと番号 */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      activeGuideline === index
                        ? "bg-[var(--color-logo-light-green)] text-white"
                        : "bg-[var(--color-logo-light-green)]/10 text-[var(--color-logo-dark-green)] group-hover:bg-[var(--color-logo-light-green)]/20"
                    }`}>
                      {getIcon(item.icon)}
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        activeGuideline === index
                          ? "bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* タイトル */}
                  <h4
                    className={`font-bold leading-tight ${
                      activeGuideline === index ? "text-[var(--color-logo-dark-green)]" : "text-primary"
                    }`}
                    style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                  >
                    {item.shortTitle}
                  </h4>

                  {/* サブタイトル（ホバー時やアクティブ時に表示） */}
                  <p
                    className={`text-slate-500 mt-1 transition-all ${
                      activeGuideline === index ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                    }`}
                    style={{ fontSize: 'var(--font-size-fluid-xs)' }}
                  >
                    {item.subtitle}
                  </p>
                </button>
              ))}
          </div>

          {/* 選択中の行動指針の詳細（展開表示） */}
          <div
            className={`mt-6 transition-all duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="bg-white rounded-xl shadow-md border border-[var(--color-logo-light-green)]/30 p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-logo-dark-green)] text-white flex items-center justify-center shrink-0">
                  <span className="font-bold text-lg">{aboutData.guidelines[activeGuideline].num}</span>
                </div>
                <div className="flex-1">
                  <h4
                    className="font-bold text-primary mb-1"
                    style={{ fontSize: 'var(--font-size-fluid-lg)' }}
                  >
                    {aboutData.guidelines[activeGuideline].shortTitle}
                  </h4>
                  <p
                    className="text-[var(--color-logo-light-green)] font-medium mb-3"
                    style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                  >
                    {aboutData.guidelines[activeGuideline].subtitle}
                  </p>
                  <p
                    className="text-slate-600 leading-relaxed"
                    style={{ fontSize: 'var(--font-size-fluid-sm)' }}
                  >
                    {aboutData.guidelines[activeGuideline].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ロゴ＆資料（統合セクション） */}
      <Section
        id="logo"
        className="bg-white relative overflow-hidden"
        ref={(el) => {
          if (el) sectionRefs.current.logo = el;
        }}
      >
        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-logo-yellow)]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-logo-light-green)]/10 rounded-full blur-3xl -z-10"></div>

        {/* タイトル */}
        <div className="text-center" style={{ marginBottom: 'var(--spacing-fluid-xl)' }}>
          <span
            className="inline-block px-3 py-1 bg-[var(--color-logo-yellow)]/30 text-[var(--color-logo-dark-green)] rounded-full font-medium"
            style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-sm)' }}
          >
            IDENTITY & MATERIALS
          </span>
          <h3
            className="font-bold text-primary heading-gothic"
            style={{ fontSize: 'var(--font-size-fluid-2xl)' }}
          >
            フラクタルのかたち
          </h3>
        </div>

        {/* ロゴと簡潔な説明 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center" style={{ marginBottom: 'var(--spacing-fluid-xl)' }}>
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/images/logos/corporate-logo.png"
                  alt="株式会社フラクタル ロゴ"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-primary/80 leading-relaxed" style={{ fontSize: 'var(--font-size-fluid-sm)' }}>
              シンプルな三角形の組み合わせが、複雑で美しい形を生み出す。
              私たちのロゴは、「フラクタル構造」そのものを表現しています。
            </p>
          </div>

          {/* ロゴの意味（コンパクト版） */}
          <div className="space-y-3">
            {aboutData.logo.meanings.slice(0, 3).map((meaning, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gradient-to-r from-[var(--color-logo-yellow)]/10 to-transparent rounded-lg p-3"
              >
                <span className="text-xl shrink-0">{meaning.icon}</span>
                <div>
                  <h4 className="font-bold text-[var(--color-logo-dark-green)] text-sm">{meaning.name}</h4>
                  <p className="text-primary/60 text-xs leading-relaxed line-clamp-2">
                    {meaning.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 会社案内資料 */}
        <div style={{ marginTop: 'var(--spacing-fluid-lg)' }}>
          <h4
            className="text-center font-bold text-primary"
            style={{ fontSize: 'var(--font-size-fluid-lg)', marginBottom: 'var(--spacing-fluid-md)' }}
          >
            資料で見るフラクタル
          </h4>

          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 sm:-mx-6"
            style={{ paddingBottom: 'var(--spacing-fluid-md)', gap: 'var(--spacing-fluid-sm)' }}
          >
            {[13, 14, 16, 17, 18, 19, 21].map((num, index) => (
              <div
                key={num}
                className="shrink-0 w-[75vw] sm:w-[60vw] md:w-[30rem] snap-center"
                style={{ marginLeft: index === 0 ? 'var(--spacing-fluid-md)' : 0 }}
              >
                <div className="relative aspect-video shadow-lg rounded-lg overflow-hidden border border-slate-200 bg-white">
                  <Image
                    src={`/images/philosophy/${num}.webp`}
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
            スワイプしてご覧ください
          </p>
        </div>
      </Section>

      {/* CTA - 到達時に背景が暗くなり、ボタンが拡大アニメーション */}
      <section
        ref={(el) => { ctaRef.current = el; }}
        className={`${prefersReducedMotion ? "" : "transition-all duration-700"} ${
          ctaVisible
            ? "bg-[#0a2e1a]"
            : "bg-[var(--color-logo-dark-green)]"
        } text-white`}
        style={{
          paddingTop: 'var(--spacing-fluid-2xl)',
          paddingBottom: 'var(--spacing-fluid-2xl)'
        }}
      >
        <div
          className="max-w-5xl mx-auto"
          style={{ paddingLeft: 'var(--spacing-fluid-md)', paddingRight: 'var(--spacing-fluid-md)' }}
        >
          <div className="text-center">
            <h3
              className={`font-bold ${prefersReducedMotion ? "" : "transition-all duration-500"} ${
                prefersReducedMotion || ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontSize: 'var(--font-size-fluid-2xl)',
                marginBottom: 'var(--spacing-fluid-md)'
              }}
            >
              一緒に働きませんか？
            </h3>
            <p
              className={`text-white/90 max-w-2xl mx-auto ${prefersReducedMotion ? "" : "transition-all duration-500 delay-100"} ${
                prefersReducedMotion || ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ marginBottom: 'var(--spacing-fluid-lg)', fontSize: 'var(--font-size-fluid-sm)' }}
            >
              フラクタルでは、私たちの理念に共感し、共に成長していける仲間を募集しています。
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center flex-wrap"
              style={{ gap: 'var(--spacing-fluid-sm)' }}
            >
              <Link
                href="/company/ceo"
                className={`bg-[var(--color-logo-yellow)] text-[var(--color-logo-dark-green)] rounded-full font-bold ${
                  prefersReducedMotion ? "" : "hover:bg-white hover:scale-105 transition-all duration-300 hover:shadow-xl"
                }`}
                style={{ padding: 'var(--spacing-fluid-sm) var(--spacing-fluid-lg)', fontSize: 'var(--font-size-fluid-sm)' }}
              >
                代表の取扱説明書を見る
              </Link>
              <Link
                href="/recruit"
                className={`bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold ${
                  prefersReducedMotion ? "" : "hover:bg-[var(--color-logo-yellow)] hover:scale-105 transition-all duration-300 hover:shadow-xl"
                } ${
                  !prefersReducedMotion && ctaVisible ? "animate-[pulse_2s_ease-in-out_1]" : ""
                }`}
                style={{ padding: 'var(--spacing-fluid-sm) var(--spacing-fluid-lg)', fontSize: 'var(--font-size-fluid-sm)' }}
              >
                採用情報を見る
              </Link>
              <Link
                href="/#contact"
                className={`bg-transparent text-white border-2 border-white/50 rounded-full font-bold ${
                  prefersReducedMotion ? "" : "hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300 hover:shadow-lg"
                }`}
                style={{ padding: 'var(--spacing-fluid-sm) var(--spacing-fluid-lg)', fontSize: 'var(--font-size-fluid-sm)' }}
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* モバイル下部メニュー分の余白 */}
      <div className="h-20 md:hidden"></div>

      {/* タイピングアニメーション */}
      <style jsx global>{`
        .typing-main {
          width: 0;
          border-right: 3px solid var(--color-logo-yellow);
          animation: typing-main 2s steps(16) forwards, blink 0.5s step-end 4 forwards;
        }
        .typing-sub {
          width: 0;
          opacity: 0;
          border-right: 2px solid transparent;
          animation: typing-sub 2.5s steps(26) 2.2s forwards, blink-sub 0.5s step-end 2.2s 5 forwards;
        }
        @keyframes typing-main {
          to { width: 18em; border-right-color: transparent; }
        }
        @keyframes typing-sub {
          to { width: 28em; opacity: 1; border-right-color: transparent; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        @keyframes blink-sub {
          0% { border-color: var(--color-logo-yellow); }
          50% { border-color: transparent; }
        }
      `}</style>
    </div>
  );
}
