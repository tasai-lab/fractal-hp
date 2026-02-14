"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 企業データ
const companyData = {
  philosophy: "シンプルで独創的な社会を実現する",
  subtext: "シンプルな仕組みがもたらす独自性と業務効率が成長へ",

  business: [
    {
      name: "訪問看護事業",
      description:
        "積極的なIT活用で社員の業務負担を軽減し、ご利用者様とそのご家族に寄り添ったサービスを提供します。",
    },
    {
      name: "IT支援事業",
      description:
        "関東圏内の中小企業のIT導入・活用をサポートし、業務効率化を通じて成長を支援します。",
    },
  ],

  dapae: [
    { letter: "D", name: "Data", desc: "現場の事実を数字で記録" },
    { letter: "A", name: "Analysis", desc: "課題と改善のヒントを抽出" },
    { letter: "P", name: "Plan", desc: "負担を減らす具体策を設計" },
    { letter: "A", name: "Act", desc: "状況に応じて柔軟に実行" },
    { letter: "E", name: "Evaluation", desc: "成果を確認し学びを次へ" },
  ],

  guidelines: [
    {
      num: 1,
      title: "感情は大切に、判断はロジカルに",
      description: "気持ちを尊重しつつ、決断は事実とデータで",
    },
    {
      num: 2,
      title: "全員がチーム、全員がリーダー",
      description: "他人任せにせず、自分から動く",
    },
    {
      num: 3,
      title: "まず自分を知り、相手を理解する",
      description: "強みと弱みを認め、補い合う",
    },
    {
      num: 4,
      title: "好奇心を知識に、知識を力に",
      description: "「なぜ？」から始まる成長",
    },
    {
      num: 5,
      title: "不便は改善のヒント",
      description: "違和感を見逃さない",
    },
    {
      num: 6,
      title: "相手にとっての最善を考える",
      description: "貢献が信頼を生む",
    },
    {
      num: 7,
      title: "完璧より最適化",
      description: "常にアップデートし続ける",
    },
  ],

  vision: {
    period: "2035年",
    goals: [
      { name: "訪問看護事業", target: "関東圏内に10拠点を展開" },
      { name: "IT支援事業", target: "ソフトウェア開発部門を設立" },
    ],
  },
};

// フェードインコンポーネント
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

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
      <div className="max-w-3xl mx-auto px-5 md:px-8">{children}</div>
    </section>
  );
}

// セクションタイトル
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="heading-mincho text-2xl md:text-3xl text-[var(--color-ink)] mb-8 md:mb-12">
      {children}
    </h2>
  );
}

// 区切り線
function Divider() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8">
      <hr className="border-t border-[var(--color-sand)]" />
    </div>
  );
}

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      {/* ヘッダー */}
      <header className="bg-[var(--color-paper)]/95 backdrop-blur-sm border-b border-[var(--color-sand)] sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[var(--color-olive)] text-sm hover:opacity-70 transition-opacity"
          >
            ← トップページ
          </Link>
          <span className="text-xs tracking-[0.2em] text-[var(--color-ink-soft)]">
            COMPANY
          </span>
        </div>
      </header>

      <main>
        {/* ヒーローセクション */}
        <Section className="pt-20 md:pt-32 pb-12 md:pb-20">
          <FadeIn className="text-center">
            {/* ロゴ */}
            <div className="mb-10 md:mb-14">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                <Image
                  src="/images/logos/corporate-logo.png"
                  alt="株式会社フラクタル"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* 会社名 */}
            <p className="text-xs tracking-[0.3em] text-[var(--color-ink-soft)] mb-4">
              FRACTAL Inc.
            </p>

            {/* 理念 */}
            <h1 className="heading-mincho text-2xl md:text-4xl text-[var(--color-ink)] leading-relaxed mb-6">
              {companyData.philosophy}
            </h1>

            <p className="text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed">
              {companyData.subtext}
            </p>
          </FadeIn>
        </Section>

        <Divider />

        {/* 事業内容 */}
        <Section id="business">
          <FadeIn>
            <SectionTitle>事業内容</SectionTitle>
            <div className="space-y-8">
              {companyData.business.map((item, index) => (
                <div key={index} className="group">
                  <h3 className="text-lg font-medium text-[var(--color-ink)] mb-2 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)]" />
                    {item.name}
                  </h3>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed pl-5">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        <Divider />

        {/* DAPAE サイクル */}
        <Section id="dapae">
          <FadeIn>
            <SectionTitle>フラクタルの成長サイクル</SectionTitle>
            <p className="text-[var(--color-ink-soft)] mb-10 leading-relaxed">
              「大変」で終わらない。
              <br className="md:hidden" />
              「なぜこうなっている、ではどうする」という考え方。
            </p>

            {/* DAPAE ステップ */}
            <div className="space-y-4">
              {companyData.dapae.map((step, index) => (
                <FadeIn key={step.name} delay={index * 80}>
                  <div className="flex items-start gap-4 py-4 border-b border-[var(--color-sand)] last:border-b-0">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-terracotta)]/10 flex items-center justify-center text-[var(--color-terracotta)] font-medium">
                      {step.letter}
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="text-[var(--color-ink)] font-medium">
                        {step.name}
                      </p>
                      <p className="text-sm text-[var(--color-ink-soft)] mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* ループ表示 */}
            <p className="text-center text-sm text-[var(--color-ink-soft)] mt-8">
              このサイクルを繰り返し、常に最適化を続けます
            </p>
          </FadeIn>
        </Section>

        <Divider />

        {/* 行動指針 */}
        <Section id="guidelines">
          <FadeIn>
            <SectionTitle>7つの行動指針</SectionTitle>
            <p className="text-[var(--color-ink-soft)] mb-10 leading-relaxed">
              フラクタルで働くということ
            </p>

            <div className="space-y-6">
              {companyData.guidelines.map((item, index) => (
                <FadeIn key={item.num} delay={index * 60}>
                  <div className="group">
                    <div className="flex items-baseline gap-4">
                      <span className="flex-shrink-0 text-xs text-[var(--color-terracotta)] font-medium tabular-nums">
                        {String(item.num).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[var(--color-ink)] font-medium leading-relaxed">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[var(--color-ink-soft)] mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </Section>

        <Divider />

        {/* ビジョン */}
        <Section id="vision">
          <FadeIn>
            <SectionTitle>ビジョン {companyData.vision.period}</SectionTitle>
            <div className="space-y-6">
              {companyData.vision.goals.map((goal, index) => (
                <div key={index} className="flex items-baseline gap-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-olive)] mt-2" />
                  <div>
                    <p className="text-sm text-[var(--color-ink-soft)]">
                      {goal.name}
                    </p>
                    <p className="text-[var(--color-ink)] font-medium">
                      {goal.target}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        <Divider />

        {/* CTA */}
        <Section className="pb-24 md:pb-32">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="heading-mincho text-xl md:text-2xl text-[var(--color-ink)]">
                一緒に働きませんか？
              </p>
            </div>

            <div className="space-y-4">
              <Link
                href="/company/ceo"
                className="block p-5 bg-white/60 border border-[var(--color-sand)] rounded-lg hover:bg-white hover:border-[var(--color-terracotta)]/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--color-ink-soft)] mb-1">
                      INTERVIEW
                    </p>
                    <p className="text-[var(--color-ink)] font-medium">
                      代表の取扱説明書
                    </p>
                  </div>
                  <span className="text-[var(--color-terracotta)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>

              <Link
                href="/recruit"
                className="block p-5 bg-[var(--color-terracotta)]/5 border border-[var(--color-terracotta)]/20 rounded-lg hover:bg-[var(--color-terracotta)]/10 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--color-ink-soft)] mb-1">
                      RECRUIT
                    </p>
                    <p className="text-[var(--color-ink)] font-medium">
                      採用情報を見る
                    </p>
                  </div>
                  <span className="text-[var(--color-terracotta)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>

              <Link
                href="/#contact"
                className="block p-5 bg-white/60 border border-[var(--color-sand)] rounded-lg hover:bg-white hover:border-[var(--color-olive)]/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--color-ink-soft)] mb-1">
                      CONTACT
                    </p>
                    <p className="text-[var(--color-ink)] font-medium">
                      お問い合わせ
                    </p>
                  </div>
                  <span className="text-[var(--color-olive)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            </div>
          </FadeIn>
        </Section>
      </main>

      {/* フッター */}
      <footer className="bg-white/50 border-t border-[var(--color-sand)] py-8">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <p className="text-xs text-[var(--color-ink-soft)]">
            © {new Date().getFullYear()} 株式会社フラクタル
          </p>
        </div>
      </footer>
    </div>
  );
}
