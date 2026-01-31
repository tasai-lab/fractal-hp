"use client";

import React from "react";
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
      shortTitle: "感情は大切に、判断はロジカルに",
      subtitle: "気持ちを尊重しつつ、決断は事実とデータで",
      description: "相手の気持ちや自分の感情を大切にしながらも、仕事の判断は感情に流されず、事実やデータに基づいて冷静に行う。"
    },
    {
      num: 2,
      shortTitle: "全員がチーム、全員がリーダー",
      subtitle: "他人任せにせず、自分から動く",
      description: "「誰かがやるだろう」ではなく、全員が当事者意識を持つ。情報を積極的に共有し、チームとして最高の成果を目指す。"
    },
    {
      num: 3,
      shortTitle: "まず自分を知り、相手を理解する",
      subtitle: "強みと弱みを認め、補い合う",
      description: "自分の得意・不得意を正しく把握することが、相手を理解する第一歩。お互いの弱みを補い合うことで、一人では出せない力を発揮できる。"
    },
    {
      num: 4,
      shortTitle: "好奇心を知識に、知識を力に",
      subtitle: "「なぜ？」から始まる成長",
      description: "「なぜ？」という好奇心を持ち続け、学び続ける。知識が増えれば視野が広がり、「当たり前」を疑う力が新しい価値を生み出す。"
    },
    {
      num: 5,
      shortTitle: "不便は改善のヒント",
      subtitle: "違和感を見逃さない",
      description: "日々の「使いにくさ」や「面倒くささ」を放置しない。その違和感こそが、組織を成長させる改善の種になる。"
    },
    {
      num: 6,
      shortTitle: "相手にとっての最善を考える",
      subtitle: "貢献が信頼を生む",
      description: "自分の利益だけでなく、相手や社会にとって何が良いかを基準に動く。貢献が信頼を生み、結果として自分の成長にもつながる。"
    },
    {
      num: 7,
      shortTitle: "完璧より最適化",
      subtitle: "常にアップデートし続ける",
      description: "完璧なものは存在しない。だからこそ現状に満足せず、ITなどを活用して、その時々のベストな状態へと仕組みを更新し続ける。"
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
      example: "例えば、「書類作業に2.5時間かかっている」というデータだけでは、何をすべきか分からない。分析を経て「訪問記録が最も時間を取っている」「手書きからPC入力への二度手間が原因」という情報になって初めて、「タブレットで現場入力」という具体的な改善策が見えてくる。",
    },
  },
  logo: {
    title: "フラクタルのかたち",
    subtitle: "シンプルで独創的、それがフラクタル",
    introduction: "シンプルな三角形の組み合わせが、複雑で美しい形を生み出す。私たちのロゴは、社名の由来である「フラクタル構造」そのものを表現しています。",
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
    conclusion: "シンプルなルールから独創的な価値を生み出す。このロゴは、私たちフラクタルの理念そのものです。",
  },
};

const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className="max-w-6xl mx-auto px-4 md:px-6">{children}</div>
  </section>
);

const FadeIn = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function AboutFractalPage() {
  return (
    <div className="min-h-screen body-editorial">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-bold text-sm md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 戻る
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-primary heading-mincho">
            フラクタルを知る
          </h1>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-56 h-56 md:w-80 md:h-80 bg-[var(--color-sand)] rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-16 -left-10 w-64 h-64 md:w-96 md:h-96 bg-[var(--color-paper)] rounded-full blur-3xl opacity-80"></div>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">ABOUT FRACTAL</p>
            <h2 className="heading-mincho text-3xl md:text-5xl text-[var(--color-olive)]">
              フラクタルを知る
            </h2>
            <p className="text-ink-soft text-base md:text-lg">
              温かく、誠実に。シンプルで独創的な社会を目指します。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/recruit"
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-[var(--color-olive)] text-white text-sm md:text-base font-semibold hover:opacity-90 transition"
              >
                採用情報を見る
              </Link>
              <Link
                href="/#contact"
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-[var(--color-olive)] text-[var(--color-olive)] text-sm md:text-base font-semibold hover:bg-[var(--color-olive)]/10 transition"
              >
                お問い合わせ
              </Link>
            </div>
          </FadeIn>
          <FadeIn className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/cover.png"
              alt="フラクタルの理念"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
        </div>
      </section>

      <Section className="bg-white">
        <FadeIn className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-ink-soft">PHILOSOPHY</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              {aboutData.philosophy.title}
            </h3>
            <p className="heading-mincho text-xl md:text-2xl mt-3">
              {aboutData.philosophy.main}
            </p>
            <p className="text-ink-soft mt-4 leading-relaxed">
              {aboutData.philosophy.description}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/philosophy.png"
              alt="フラクタルの基本理念"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-[var(--color-paper)]">
        <div className="grid md:grid-cols-[0.9fr,1.1fr] gap-10 items-center">
          <FadeIn className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/business.png"
              alt="事業内容"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">BUSINESS</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              {aboutData.business.title}
            </h3>
            <p className="text-ink-soft mt-3">
              {aboutData.business.description}
            </p>
            <div className="grid gap-4 mt-6">
              {aboutData.business.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white/80 rounded-2xl border border-white shadow-sm p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <h4 className="heading-mincho text-lg text-[var(--color-olive)]">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-ink-soft text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-white">
        <FadeIn className="grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-ink-soft">VISION</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              {aboutData.vision.title}
            </h3>
            <p className="text-ink-soft mt-3">
              {aboutData.vision.period}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {aboutData.vision.pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="px-3 py-1 rounded-full bg-[var(--color-sand)] text-sm text-[var(--color-olive)]"
                >
                  {pillar}
                </span>
              ))}
            </div>
            <div className="grid gap-4 mt-6">
              {aboutData.vision.goals.map((goal) => (
                <div
                  key={goal.name}
                  className="bg-[var(--color-paper)] rounded-2xl p-5 border border-white shadow-sm"
                >
                  <p className="text-xs tracking-[0.2em] text-ink-soft">{goal.name}</p>
                  <p className="heading-mincho text-lg md:text-xl text-[var(--color-olive)] mt-2">
                    {goal.target}
                  </p>
                  <p className="text-ink-soft text-sm md:text-base mt-2">
                    {goal.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/vision.png"
              alt="成長戦略とビジョン"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-[var(--color-paper)]">
        <div className="grid md:grid-cols-[0.9fr,1.1fr] gap-10 items-start">
          <FadeIn className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-ink-soft">GUIDELINES</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)]">
              7つの行動指針
            </h3>
            <p className="text-ink-soft">フラクタルで働くということ</p>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about/guidelines.png"
                alt="フラクタルの行動指針"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <div className="grid gap-4">
            {aboutData.guidelines.map((item) => (
              <FadeIn
                key={item.num}
                className="bg-white/80 rounded-2xl border border-white shadow-sm p-5"
              >
                <p className="text-xs tracking-[0.2em] text-ink-soft">
                  GUIDELINE {item.num}
                </p>
                <h4 className="heading-mincho text-lg text-[var(--color-olive)] mt-2">
                  {item.shortTitle}
                </h4>
                <p className="text-ink-soft text-sm md:text-base mt-2">
                  {item.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--color-sand)]">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-start">
          <div>
            <p className="text-xs tracking-[0.3em] text-ink-soft">FRAMEWORK</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              {aboutData.dapae.title}
            </h3>
            <p className="text-ink-soft mt-3">{aboutData.dapae.description}</p>
            <div className="space-y-4 mt-6">
              {aboutData.dapae.steps.map((step) => (
                <FadeIn
                  key={step.name}
                  className="bg-white/70 rounded-2xl p-5 border border-white"
                >
                  <p className="text-xs tracking-[0.2em] text-ink-soft">
                    {step.name} / {step.subtitle}
                  </p>
                  <p className="heading-mincho text-lg text-[var(--color-olive)] mt-2">
                    {step.ja}
                  </p>
                  <p className="text-ink-soft text-sm md:text-base mt-2">
                    {step.story}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <FadeIn className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about/dapae.png"
                alt="DAPAEフレームワーク"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </FadeIn>
            <FadeIn className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about/dapae-detail.png"
                alt="DAPAEの詳細"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </FadeIn>
            <FadeIn className="bg-white/70 rounded-2xl p-5 border border-white">
              <p className="heading-mincho text-lg text-[var(--color-olive)]">
                {aboutData.dapae.coreIdea.title}
              </p>
              <p className="text-ink-soft text-sm md:text-base mt-2">
                {aboutData.dapae.coreIdea.description}
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid md:grid-cols-[0.9fr,1.1fr] gap-10 items-center">
          <FadeIn className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/logo-meaning.png"
              alt="フラクタルのロゴ"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-ink-soft">IDENTITY</p>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
              {aboutData.logo.title}
            </h3>
            <p className="text-ink-soft mt-3">{aboutData.logo.subtitle}</p>
            <p className="text-ink-soft mt-4 leading-relaxed">
              {aboutData.logo.introduction}
            </p>
          </FadeIn>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {aboutData.logo.meanings.map((meaning) => (
            <FadeIn
              key={meaning.name}
              className="bg-[var(--color-paper)] rounded-2xl p-5 border border-white shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{meaning.icon}</span>
                <h4 className="heading-mincho text-lg text-[var(--color-olive)]">
                  {meaning.name}
                </h4>
              </div>
              <p className="text-ink-soft text-sm md:text-base mt-3">
                {meaning.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-paper)]">
        <div className="grid md:grid-cols-[0.9fr,1.1fr] gap-10 items-center">
          <FadeIn className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/ending.png"
              alt="フラクタルのこれから"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </FadeIn>
          <FadeIn>
            <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)]">
              一緒に働きませんか？
            </h3>
            <p className="text-ink-soft mt-4">
              フラクタルでは、理念に共感し、共に成長していける仲間を募集しています。
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/recruit"
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-[var(--color-olive)] text-white text-sm md:text-base font-semibold hover:opacity-90 transition"
              >
                採用情報を見る
              </Link>
              <Link
                href="/#contact"
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-[var(--color-olive)] text-[var(--color-olive)] text-sm md:text-base font-semibold hover:bg-[var(--color-olive)]/10 transition"
              >
                お問い合わせ
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}
