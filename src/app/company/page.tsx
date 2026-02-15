"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 企業データ
const companyData = {
  philosophy: "シンプルで独創的な社会を実現する",
  subtext: "シンプルな仕組みがもたらす独自性と業務効率が成長へ",

  info: {
    name: "株式会社フラクタル",
    representative: "浅井 拓哉",
    address: "〒274-0072 千葉県船橋市三山6丁目22-2 パレドール小川201",
    phone: "050-3529-1176",
    hours: "9:00 〜 18:00",
  },

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
    { letter: "D", name: "Data", desc: "現場の事実を数字で記録する" },
    { letter: "A", name: "Analysis", desc: "データを分析し、価値ある情報に変える" },
    { letter: "P", name: "Plan", desc: "情報を基に具体的な計画を策定する" },
    { letter: "A", name: "Act", desc: "計画を基に状況に応じて柔軟に実行する" },
    { letter: "E", name: "Evaluation", desc: "サイクル全体を評価し、次のデータへ繋げる" },
  ],

  guidelines: [
    {
      num: 1,
      title: "感情は大切に、判断はロジカルに",
      subtitle: "気持ちを尊重しつつ、決断は事実とデータで",
      description: "相手の気持ちや自分の感情を大切にしながらも、仕事の判断は感情に流されず、事実やデータに基づいて冷静に行う。",
    },
    {
      num: 2,
      title: "全員がチーム、全員がリーダー",
      subtitle: "他人任せにせず、自分から動く",
      description: "「誰かがやるだろう」ではなく、全員が当事者意識を持つ。情報を積極的に共有し、チームとして最高の成果を目指す。",
    },
    {
      num: 3,
      title: "まず自分を知り、相手を理解する",
      subtitle: "強みと弱みを認め、補い合う",
      description: "自分の得意・不得意を正しく把握することが、相手を理解する第一歩。お互いの弱みを補い合うことで、一人では出せない力を発揮できる。",
    },
    {
      num: 4,
      title: "好奇心を知識に、知識を力に",
      subtitle: "「なぜ？」から始まる成長",
      description: "「なぜ？」という好奇心を持ち続け、学び続ける。知識が増えれば視野が広がり、「当たり前」を疑う力が新しい価値を生み出す。",
    },
    {
      num: 5,
      title: "不便は改善のヒント",
      subtitle: "違和感を見逃さない",
      description: "日々の「使いにくさ」や「面倒くささ」を放置しない。その違和感こそが、組織を成長させる改善の種になる。",
    },
    {
      num: 6,
      title: "相手にとっての最善を考える",
      subtitle: "貢献が信頼を生む",
      description: "自分の利益だけでなく、相手や社会にとって何が良いかを基準に動く。貢献が信頼を生み、結果として自分の成長にもつながる。",
    },
    {
      num: 7,
      title: "完璧より最適化",
      subtitle: "常にアップデートし続ける",
      description: "完璧なものは存在しない。だからこそ現状に満足せず、ITなどを活用して、その時々のベストな状態へと仕組みを更新し続ける。",
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
    <div className="min-h-screen body-paper">
      {/* ヘッダー */}
      <header className="bg-[var(--color-paper)] border-b border-[var(--color-sand)] sticky top-14 lg:top-20 z-30">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[var(--color-olive)] font-bold text-sm md:text-base hover:opacity-80 transition-opacity"
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
              <div className="relative w-32 h-32 md:w-44 md:h-44 mx-auto">
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
            <h1 className="heading-mincho text-2xl md:text-3xl text-[var(--color-ink)] mb-2">
              株式会社フラクタル
            </h1>
            <p className="text-xs tracking-[0.3em] text-[var(--color-ink-soft)] mb-8">
              FRACTAL Inc.
            </p>

            {/* 理念 */}
            <p className="heading-mincho text-2xl md:text-4xl text-[var(--color-ink)] leading-relaxed mb-6">
              {companyData.philosophy}
            </p>

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
            <SectionTitle>DAPAE | ダパエ</SectionTitle>
            <p className="text-[var(--color-ink-soft)] mb-10 leading-relaxed">
              フラクタル独自のフレームワーク、それがDAPAE。
              <br />
              データを分析して情報に変え、計画を立て、柔軟に実行し、評価する。
              <br />
              その評価がまた新たなデータとなり、サイクルは回り続けます。
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
            <div className="mt-10 pt-6 border-t border-[var(--color-sand)]">
              <p className="text-center text-sm text-[var(--color-ink-soft)]">
                評価（E）が次のデータ（D）となり、サイクルは継続する
              </p>
              <p className="text-center text-xs text-[var(--color-terracotta)] mt-2">
                D → A → P → A → E → D …
              </p>
            </div>
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

            <div className="space-y-8">
              {companyData.guidelines.map((item, index) => (
                <FadeIn key={item.num} delay={index * 60}>
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 text-xs text-[var(--color-terracotta)] font-medium tabular-nums mt-1">
                        {String(item.num).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[var(--color-ink)] font-medium leading-relaxed">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[var(--color-terracotta)]/80 mt-1">
                          {item.subtitle}
                        </p>
                        <p className="text-sm text-[var(--color-ink-soft)] mt-2 leading-relaxed">
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

        {/* 会社概要 */}
        <Section id="info">
          <FadeIn>
            <SectionTitle>会社概要</SectionTitle>
            <div className="bg-white/60 border border-[var(--color-sand)] rounded-lg overflow-hidden">
              <table className="w-full text-sm md:text-base">
                <tbody>
                  <tr className="border-b border-[var(--color-sand)]">
                    <th className="text-left font-medium py-4 px-5 bg-[var(--color-sand)]/30 w-28 md:w-36 align-top">
                      会社名
                    </th>
                    <td className="py-4 px-5 text-[var(--color-ink)]">
                      {companyData.info.name}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-sand)]">
                    <th className="text-left font-medium py-4 px-5 bg-[var(--color-sand)]/30 w-28 md:w-36 align-top">
                      代表取締役
                    </th>
                    <td className="py-4 px-5 text-[var(--color-ink)]">
                      {companyData.info.representative}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-sand)]">
                    <th className="text-left font-medium py-4 px-5 bg-[var(--color-sand)]/30 w-28 md:w-36 align-top">
                      所在地
                    </th>
                    <td className="py-4 px-5 text-[var(--color-ink)]">
                      {companyData.info.address}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-sand)]">
                    <th className="text-left font-medium py-4 px-5 bg-[var(--color-sand)]/30 w-28 md:w-36 align-top">
                      電話番号
                    </th>
                    <td className="py-4 px-5 text-[var(--color-ink)]">
                      <a
                        href={`tel:${companyData.info.phone.replace(/-/g, "")}`}
                        className="hover:text-[var(--color-terracotta)] transition-colors"
                      >
                        {companyData.info.phone}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left font-medium py-4 px-5 bg-[var(--color-sand)]/30 w-28 md:w-36 align-top">
                      営業時間
                    </th>
                    <td className="py-4 px-5 text-[var(--color-ink)]">
                      {companyData.info.hours}
                    </td>
                  </tr>
                </tbody>
              </table>
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
    </div>
  );
}
