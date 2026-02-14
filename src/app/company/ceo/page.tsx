"use client";

import React, { useRef, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 代表者プロフィールデータ
const ceoProfile = {
  name: "浅井 拓哉",
  nameEn: "Asai Takuya",
  title: "代表取締役",
  catchphrase: "完璧より最適を。",

  introduction: {
    summary: "ひとことで言うと「仕組みづくりが好きな人」です。",
    detail: `カオスな状況を見ると、つい「どう整理すれば最適化できるか」を考えてしまう。それが私の性分です。

訪問看護の現場でも同じ。「この人にはこのケアが合う」「この業務はこう改善できる」と、常に最適解を探しています。人を見たとき、その人の「得意なこと」と「苦手なこと」が自然と見えてくる。だからこそ、一人ひとりに合った役割や関わり方を考えることができます。

効率化というと冷たく聞こえるかもしれませんが、私の目指す効率化は「看護師さんが看護に集中できる環境を作ること」。書類や移動や雑務に時間を取られるのではなく、患者さんと向き合う時間を最大化したいのです。

難しい課題を解くことに喜びを感じるタイプ。逆に、すべてが整って安定した状態になると、次の挑戦を探し始めてしまいます。`,
  },

  strengths: {
    top10: [
      {
        rank: 1,
        name: "個別化",
        nameEn: "Individualization",
        category: "人間関係構築力",
        description: "一人ひとりの個性を見つけて尊重し、全員を同じには扱わない。それぞれの個性を知っているので、ベストな状態を引き出す方法もわかる。",
        growth: "他の人の才能を見つけて夢の実現を後押しし、各自のモチベーションやニーズを認識できるよう助ける",
        blindspot: "個人のニーズを優先させる衝動が、グループにとって最善のことより優先されることがある",
      },
      {
        rank: 2,
        name: "着想",
        nameEn: "Ideation",
        category: "戦略的思考力",
        description: "アイデアに魅力を感じる。異なる視点から物事を見るのが好きで、いつもつながりを探しているので、ブレインストーミングでパワフルで独創的な力を発揮する。",
        growth: "最高のアイデアを生み出せる環境を特定し再現する。アイデアは人に伝える前によく考え、最善のものだけを発表する",
        blindspot: "無限のアイデアは周りを圧倒することがある。最善のアイデアを成果に変えられる人と協力する",
      },
      {
        rank: 3,
        name: "戦略性",
        nameEn: "Strategic",
        category: "戦略的思考力",
        description: "代替となる選択肢を迅速に比較して最善のものを決定する。状況を予測し、頭の中でさまざまなシナリオを描き、先の計画を立てる能力が生まれつき備わっている。",
        growth: "常に3つ以上の選択肢を考えておく。成功への最善の道を見つけ出し、周りが理解できるように説明する",
        blindspot: "パターンや経路を短時間で評価するため、他の人が思考プロセスについていけないことがある",
      },
      {
        rank: 4,
        name: "活発性",
        nameEn: "Activator",
        category: "影響力",
        description: "変化を起こす人であり、アイデアを行動に変える方法を生まれつき知っており、物事を実現させる。エネルギーは伝染し、人を惹きつける。",
        growth: "他の人が行き詰ったら、決定を下して先に進む。自分で意思決定し、行動に移せる仕事を探す",
        blindspot: "具体的な計画を立てずに突き進むことがある。誰もが同じように緊急性を感じるわけではない",
      },
      {
        rank: 5,
        name: "分析思考",
        nameEn: "Analytical",
        category: "戦略的思考力",
        description: "パターンを調査、診断、特定する能力が生来備わっており、論理的で考え抜かれた価値あるインサイトを得る。批判的思考は現状把握に役立ち、客観性をもたらす。",
        growth: "新しい計画やプロジェクトには初期段階で関わり、実現可能性や方向性を評価する",
        blindspot: "客観性を重んじるアプローチは懐疑的・批判的に見えることがある。思考プロセスを説明する",
      },
      {
        rank: 6,
        name: "最上志向",
        nameEn: "Maximizer",
        category: "影響力",
        description: "クオリティーを重視し、最高の仲間と最善の仕事をすることを好む。各人が最も得意とすることを理解し、実行するよう促して、個人やチームを向上させる。",
        growth: "自分の強みに集中し、弱点はパートナーを見つけたり仕組みで補う",
        blindspot: "「十分良い」が適正な場合もあることを受け入れる必要がある",
      },
      {
        rank: 7,
        name: "ポジティブ",
        nameEn: "Positivity",
        category: "人間関係構築力",
        description: "人から人へと伝播するエネルギーと熱意を持つ。心からの励ましと楽観的な人生観で、周囲の人の気持ちを楽にする能力がある。",
        growth: "物事が順調に進んでいることを周りにも見えるようにし、ちょっとした功績も祝う",
        blindspot: "相手がネガティブな感情を吐き出すまでは、ただ話を聞くことも大切",
      },
      {
        rank: 8,
        name: "コミュニケーション",
        nameEn: "Communication",
        category: "影響力",
        description: "言葉や表現で他の人の注意を惹きつけることに長ける。自分や他の人の考えをぴったりの言葉で表現でき、重要なメッセージを際立たせる。",
        growth: "知識や専門性も身に付けて、メッセージに内容が伴って初めて効果を発揮する",
        blindspot: "議論を牛耳っていることに気づかないときがあるため、話を聞く時間を作る",
      },
      {
        rank: 9,
        name: "未来志向",
        nameEn: "Futuristic",
        category: "戦略的思考力",
        description: "ビジョンを持った人であり、より良い未来を詳細に思い描く能力で、願望を実現させる。未来のビジョンで他の人を触発し、レベルアップを促す。",
        growth: "思い描くビジョンを他の人と共有し、できる限り細かく描写して伝える",
        blindspot: "未来を良くするためには、現在の真の問題に対処しなければならないことを受け入れる",
      },
      {
        rank: 10,
        name: "親密性",
        nameEn: "Relator",
        category: "人間関係構築力",
        description: "互いにとって誠実で意義のある真の1対1の人間関係を自然に作る。偽りのない姿を示すため、長続きする親密な関係を築き、信頼と自信を育む。",
        growth: "グループではなく1対1の時間を作り、どれほど忙しくても友人とは連絡を取る",
        blindspot: "信頼を勝ち取るのに時間がかかるため、親しくなれないと感じる人もいることを意識する",
      },
    ],
    bottom5: [
      { rank: 30, name: "達成欲" },
      { rank: 31, name: "公平性" },
      { rank: 32, name: "規律性" },
      { rank: 33, name: "調和性" },
      { rank: 34, name: "競争性" },
    ],
    note: "「戦略的思考力」の資質が多いのが特徴。一方で「達成欲」「規律性」「調和性」は低め。コツコツ積み上げたり、みんなに合わせたりするのは得意ではありません。だからこそ、それが得意な人と一緒に働きたい。",
  },

  thinkingCycle: {
    title: "私の思考サイクル",
    description: "完璧な計画を練ってから動くのではなく、「動きながら考える」スタイル。このサイクルを高速で回すことで、素早く最適解にたどり着きます。",
    steps: [
      {
        num: "01",
        label: "気づく",
        desc: "「なんか変だな」「もっと良くなるはず」という違和感をキャッチ",
        color: "red",
      },
      {
        num: "02",
        label: "考える",
        desc: "過去のやり方にとらわれず、ゼロベースで最適な方法を構築",
        color: "cyan",
      },
      {
        num: "03",
        label: "動く",
        desc: "議論より実行。まずは小さく試してみる",
        color: "green",
      },
      {
        num: "04",
        label: "直す",
        desc: "結果を見て、すぐに修正。このサイクルを繰り返す",
        color: "yellow",
      },
    ],
  },

  workStyle: {
    values: [
      {
        icon: "question",
        title: "「なぜ？」から始める",
        description:
          "「昔からこうだから」は理由になりません。すべてに理由があるべきで、理由がないなら変えるべき。慣習や前例にとらわれず、本当に必要かどうかを常に問い直します。",
      },
      {
        icon: "target",
        title: "最短距離を探す",
        description:
          "遠回りは嫌い。無駄な会議、意味のない書類、形だけの手続き。「それ、本当に必要？」と常に問いかけます。同じ結果が出るなら、より少ない労力で達成したい。",
      },
      {
        icon: "rocket",
        title: "動きながら考える",
        description:
          "完璧な計画を待っていたら、何も始まりません。まず動いて、やりながら修正する。失敗しても、そこから学べばいい。このスピード感がフラクタルの強みです。",
      },
    ],
  },

  teamFit: {
    fast: [
      {
        text: "「なぜ？」を一緒に追求できる",
        detail: "現状に疑問を持ち、より良い方法を一緒に考えられる",
      },
      {
        text: "自分で考えて動ける",
        detail: "指示を待つのではなく、自分で判断して行動できる",
      },
      {
        text: "改善提案を恐れない",
        detail: "「こうした方がいいのでは？」と率直に意見を言える",
      },
      {
        text: "論理的に議論できる",
        detail: "感情ではなく、事実とロジックで建設的に話し合える",
      },
    ],
    slow: [
      {
        text: "変化を嫌う",
        detail: "現状維持は後退。常に進化し続ける組織でありたい",
      },
      {
        text: "環境のせいにする",
        detail: "「教わってない」「時間がない」—できない理由より、できる方法を考えたい",
      },
    ],
    note: "これはチームの特性の話。フラクタルは成長が早いチームを目指しています。",
  },

  leadership: {
    style: "全体最適を考える",
    description: `組織を「美しい庭園」のように考えています。

一人ひとりが自分の場所で花を咲かせられるように、適材適所の配置を考える。全体のバランスを見ながら、必要な手入れをする。

「優しさ」だけでは組織は回りません。時には厳しい判断も必要です。でもそれは、全体がより良くなるため。一人の問題を放置して、チーム全体が苦しむことがないように。

私だけでは、すべての人のケアはできません。だからこそ、私を信じながらも指摘して、結果のために頑張ってくれる人が不可欠です。`,
  },

  vision: `訪問看護の業界には、まだまだ改善できることがたくさんあります。

紙の書類、非効率な移動、属人的になりがちなケア、情報共有の不足...

これらの課題を「仕組み」に変えて、看護師さんが本来の仕事——患者さんのケア——に集中できる環境を作りたい。

私が目指すのは、「浅井がいなくても回る組織」です。

仕組みで動く組織は、特定の人に依存しません。誰かが休んでも、誰かが抜けても、サービスの質は落ちない。それが本当の強さだと思っています。

そして、その仕組みが完成したら？ 私は次の課題を見つけに行きます。

「完成したら次へ」——それが私のスタイルであり、フラクタルを常に進化させ続ける原動力です。`,

  message: `ここまで読んでくださり、ありがとうございます。

誰にでも「得意なこと」と「不得意なこと」があります。私もそう。

私は仕組みを作るのは得意ですが、一人ひとりに寄り添った細やかなケアは苦手です。だからこそ、それが得意な人と一緒に働きたい。

フラクタルは、あなたの「得意」を活かせる場所です。

不得意なことは、それが得意な誰かがカバーする。そうやってチームで補い合いながら、一人では成し遂げられないことを実現する。

得意なことに集中できる環境が、最高のパフォーマンスを生む。そう信じています。`,
};

// FadeInコンポーネント
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Q&Aブロックコンポーネント
function QABlock({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <h2 className="heading-mincho text-2xl md:text-3xl lg:text-4xl text-[var(--color-olive)]">
        {question}
      </h2>
      <div className="bg-white/80 rounded-3xl p-6 md:p-10 shadow-sm border border-white/80">
        {children}
      </div>
    </div>
  );
}

// ストレングスカード
function StrengthCard({
  rank,
  name,
  nameEn,
  category,
  description,
  growth,
  blindspot,
}: {
  rank: number;
  name: string;
  nameEn: string;
  category?: string;
  description: string;
  growth?: string;
  blindspot?: string;
}) {
  const isTop3 = rank <= 3;
  const isTop5 = rank <= 5;

  const categoryColors: Record<string, string> = {
    "戦略的思考力": "bg-emerald-100 text-emerald-700",
    "影響力": "bg-amber-100 text-amber-700",
    "人間関係構築力": "bg-blue-100 text-blue-700",
    "実行力": "bg-purple-100 text-purple-700",
  };

  return (
    <div
      className={`relative p-4 md:p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
        isTop3
          ? "bg-[var(--color-logo-light-green)]/10 border-[var(--color-logo-light-green)]/30"
          : isTop5
            ? "bg-[var(--color-logo-yellow)]/10 border-[var(--color-logo-yellow)]/30"
            : "bg-[var(--color-paper)] border-[var(--color-sand)]"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isTop3
              ? "bg-[var(--color-logo-light-green)] text-white"
              : isTop5
                ? "bg-[var(--color-logo-yellow)] text-[var(--color-ink)]"
                : "bg-[var(--color-sand)] text-[var(--color-ink-soft)]"
          }`}
        >
          {rank}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-bold text-[var(--color-ink)]">{name}</h4>
            <span className="text-xs text-[var(--color-ink-soft)]">
              {nameEn}
            </span>
          </div>
          {category && (
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${categoryColors[category] || "bg-gray-100 text-gray-600"}`}>
              {category}
            </span>
          )}
          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
            {description}
          </p>
          {(growth || blindspot) && (
            <div className="mt-3 pt-3 border-t border-[var(--color-sand)]/50 space-y-2">
              {growth && (
                <div className="flex items-start gap-2">
                  <span className="text-xs text-[var(--color-logo-light-green)] mt-0.5">↑</span>
                  <p className="text-xs text-[var(--color-ink-soft)]">{growth}</p>
                </div>
              )}
              {blindspot && (
                <div className="flex items-start gap-2">
                  <span className="text-xs text-amber-500 mt-0.5">!</span>
                  <p className="text-xs text-[var(--color-ink-soft)]">{blindspot}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 価値観カード
function ValueCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  const iconMap: Record<string, ReactNode> = {
    question: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    target: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    rocket: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  };

  return (
    <div className="bg-[var(--color-paper)] rounded-2xl p-5 md:p-6 border border-[var(--color-sand)] hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-[var(--color-logo-light-green)]/20 flex items-center justify-center text-[var(--color-olive)] mb-4">
        {iconMap[icon]}
      </div>
      <h4 className="font-bold text-[var(--color-ink)] mb-2">{title}</h4>
      <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// チーム特性リスト
function TeamTraitList({
  type,
  items,
}: {
  type: "fast" | "slow";
  items: { text: string; detail: string }[];
}) {
  const isFast = type === "fast";
  return (
    <div
      className={`rounded-2xl p-5 md:p-6 ${
        isFast
          ? "bg-[var(--color-logo-light-green)]/10 border border-[var(--color-logo-light-green)]/30"
          : "bg-[var(--color-paper)] border border-[var(--color-sand)]"
      }`}
    >
      <h4
        className={`font-bold mb-4 ${
          isFast ? "text-[var(--color-olive)]" : "text-[var(--color-ink-soft)]"
        }`}
      >
        {isFast ? "成長が早いチーム" : "成長が遅いチーム"}
      </h4>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 ${
                isFast
                  ? "bg-[var(--color-logo-light-green)] text-white"
                  : "bg-[var(--color-sand)] text-[var(--color-ink-soft)]"
              }`}
            >
              {isFast ? "↑" : "↓"}
            </span>
            <div>
              <p className="text-sm font-medium text-[var(--color-ink)]">{item.text}</p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 思考サイクルコンポーネント
function ThinkingCycle({
  steps,
}: {
  steps: { num: string; label: string; desc: string; color: string }[];
}) {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-600" },
    cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-600" },
    green: { bg: "bg-[var(--color-logo-light-green)]/10", border: "border-[var(--color-logo-light-green)]/30", text: "text-[var(--color-olive)]" },
    yellow: { bg: "bg-[var(--color-logo-yellow)]/20", border: "border-[var(--color-logo-yellow)]/40", text: "text-[var(--color-ink)]" },
  };

  return (
    <div className="relative">
      {/* ステップ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {steps.map((step, index) => {
          const colors = colorMap[step.color] || colorMap.green;
          return (
            <div
              key={step.num}
              className={`${colors.bg} ${colors.border} border rounded-xl p-4 relative`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-mono ${colors.text} opacity-60`}>
                  {step.num}
                </span>
                <span className={`text-sm font-bold ${colors.text}`}>
                  {step.label}
                </span>
              </div>
              <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
                {step.desc}
              </p>
              {/* 矢印（最後以外） */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <svg className="w-5 h-5 text-[var(--color-ink-soft)]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* ループ表示 */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-2 text-xs text-[var(--color-ink-soft)] bg-[var(--color-paper)] px-3 py-1 rounded-full border border-[var(--color-sand)]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          このサイクルを高速で繰り返す
        </span>
      </div>
    </div>
  );
}

export default function CEOPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen body-editorial">
        {/* ヘッダー */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-14 lg:top-20 z-30">
          <div className="max-w-5xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
            <Link
              href="/company"
              className="text-[var(--color-olive)] font-bold text-sm md:text-base hover:opacity-80 transition-opacity"
            >
              ← 会社情報へ戻る
            </Link>
            <span className="text-xs tracking-[0.2em] text-[var(--color-ink-soft)]">
              INTERVIEW
            </span>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-20 md:pb-24 flex flex-col gap-16 md:gap-24">
          {/* 1. ヒーローセクション */}
          <section>
            <FadeIn className="space-y-6 text-center max-w-3xl mx-auto">
              <p className="text-xs tracking-[0.3em] text-[var(--color-ink-soft)]">
                REPRESENTATIVE
              </p>
              <h1
                className="heading-mincho text-3xl md:text-4xl lg:text-5xl text-[var(--color-olive)] leading-tight"
                style={{ fontSize: "var(--font-size-fluid-3xl)" }}
              >
                {ceoProfile.catchphrase}
              </h1>
            </FadeIn>
            <FadeIn
              className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-lg mt-8"
              delay={200}
            >
              <Image
                src="/images/company/ceo-portrait.jpg"
                alt={`${ceoProfile.name} - ${ceoProfile.title}`}
                fill
                className="object-cover object-top"
                priority
              />
              {/* 装飾三角 */}
              <div
                className="absolute top-0 left-0 w-0 h-0"
                style={{
                  borderStyle: "solid",
                  borderWidth: "50px 50px 0 0",
                  borderColor:
                    "var(--color-logo-light-green) transparent transparent transparent",
                }}
              />
            </FadeIn>
            <FadeIn className="text-center mt-6" delay={300}>
              <p className="text-xl md:text-2xl font-bold text-[var(--color-ink)]">
                {ceoProfile.name}
              </p>
              <p className="text-sm text-[var(--color-ink-soft)]">
                {ceoProfile.nameEn} | {ceoProfile.title}
              </p>
            </FadeIn>
          </section>

          {/* 2. 自己紹介セクション */}
          <FadeIn>
            <QABlock question="浅井さんってどんな人？">
              <div className="space-y-8">
                <p className="text-lg md:text-xl text-[var(--color-ink)] leading-relaxed">
                  {ceoProfile.introduction.summary}
                </p>
                <p className="text-[var(--color-ink-soft)] leading-relaxed whitespace-pre-line">
                  {ceoProfile.introduction.detail}
                </p>

                {/* ストレングスファインダー */}
                <div className="pt-6 border-t border-[var(--color-sand)]">
                  <h3 className="text-sm font-bold text-[var(--color-ink-soft)] mb-4 tracking-wider">
                    クリフトンストレングス TOP10
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {ceoProfile.strengths.top10.map((strength) => (
                      <StrengthCard key={strength.rank} {...strength} />
                    ))}
                  </div>

                  {/* 下位資質 */}
                  <div className="bg-[var(--color-paper)] rounded-xl p-4 border border-[var(--color-sand)]">
                    <h4 className="text-sm font-bold text-[var(--color-ink-soft)] mb-3">
                      下位の資質（苦手なこと）
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ceoProfile.strengths.bottom5.map((s) => (
                        <span
                          key={s.rank}
                          className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full border border-[var(--color-sand)]"
                        >
                          <span className="text-[var(--color-ink-soft)]">#{s.rank}</span>
                          <span className="text-[var(--color-ink)]">{s.name}</span>
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      {ceoProfile.strengths.note}
                    </p>
                  </div>
                </div>
              </div>
            </QABlock>
          </FadeIn>

          {/* 3. 仕事への向き合い方セクション */}
          <FadeIn>
            <QABlock question="仕事で大切にしていることは？">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {ceoProfile.workStyle.values.map((value, index) => (
                    <ValueCard key={index} {...value} />
                  ))}
                </div>

                {/* 思考サイクル */}
                <div className="pt-6 border-t border-[var(--color-sand)]">
                  <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2">
                    {ceoProfile.thinkingCycle.title}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-soft)] mb-6">
                    {ceoProfile.thinkingCycle.description}
                  </p>
                  <ThinkingCycle steps={ceoProfile.thinkingCycle.steps} />
                </div>
              </div>
            </QABlock>
          </FadeIn>

          {/* 4. チームとの関わり方セクション */}
          <FadeIn>
            <QABlock question="どんなチームを作りたい？">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <TeamTraitList
                    type="fast"
                    items={ceoProfile.teamFit.fast}
                  />
                  <TeamTraitList
                    type="slow"
                    items={ceoProfile.teamFit.slow}
                  />
                </div>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed bg-[var(--color-paper)] rounded-xl p-4">
                  {ceoProfile.teamFit.note}
                </p>
              </div>
            </QABlock>
          </FadeIn>

          {/* 5. リーダーシップセクション */}
          <FadeIn>
            <QABlock question="どんなリーダーシップを取る？">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-olive)] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-ink)]">
                    {ceoProfile.leadership.style}
                  </h3>
                </div>
                <p className="text-[var(--color-ink-soft)] leading-relaxed whitespace-pre-line">
                  {ceoProfile.leadership.description}
                </p>
              </div>
            </QABlock>
          </FadeIn>

          {/* 6. フラクタルへの想いセクション */}
          <FadeIn>
            <QABlock question="フラクタルで実現したいことは？">
              <p className="text-[var(--color-ink)] leading-relaxed whitespace-pre-line text-base md:text-lg">
                {ceoProfile.vision}
              </p>
            </QABlock>
          </FadeIn>

          {/* 6. メッセージセクション */}
          <FadeIn>
            <section className="bg-[var(--color-olive)] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* 装飾 */}
              <div
                className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-10"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-logo-yellow) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 space-y-6">
                <h2 className="heading-mincho text-2xl md:text-3xl">
                  最後に
                </h2>
                <p className="leading-relaxed whitespace-pre-line opacity-90">
                  {ceoProfile.message}
                </p>
                <div className="pt-6 border-t border-white/20">
                  <p className="text-xl md:text-2xl font-bold">
                    「完璧」より「最適」を。
                    <br />
                    一緒に仕組みを作りましょう。
                  </p>
                  <p className="mt-4 text-sm opacity-80">
                    {ceoProfile.title} {ceoProfile.name}
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* 7. CTAセクション */}
          <FadeIn>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Link
                href="/company"
                className="group relative overflow-hidden bg-white/80 border border-[var(--color-sand)] rounded-2xl p-6 md:p-8 hover:border-[var(--color-logo-light-green)] transition-all duration-300 hover:shadow-md"
              >
                <div className="relative z-10">
                  <p className="text-xs tracking-wider text-[var(--color-ink-soft)] mb-2">
                    COMPANY
                  </p>
                  <p className="text-lg md:text-xl font-bold text-[var(--color-ink)] mb-1">
                    フラクタルについて
                  </p>
                  <p className="text-sm text-[var(--color-ink-soft)]">
                    会社の理念と文化を知る
                  </p>
                </div>
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-6 h-6 text-[var(--color-logo-light-green)] group-hover:translate-x-1 transition-transform"
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
                </div>
              </Link>

              <Link
                href="/recruit"
                className="group relative overflow-hidden bg-[var(--color-logo-yellow)]/20 border border-[var(--color-logo-yellow)]/30 rounded-2xl p-6 md:p-8 hover:border-[var(--color-logo-yellow)] transition-all duration-300 hover:shadow-md"
              >
                <div className="relative z-10">
                  <p className="text-xs tracking-wider text-[var(--color-ink-soft)] mb-2">
                    RECRUIT
                  </p>
                  <p className="text-lg md:text-xl font-bold text-[var(--color-ink)] mb-1">
                    採用情報を見る
                  </p>
                  <p className="text-sm text-[var(--color-ink-soft)]">
                    一緒に仕組みを作りませんか
                  </p>
                </div>
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-6 h-6 text-[var(--color-logo-yellow)] group-hover:translate-x-1 transition-transform"
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
                </div>
              </Link>
            </section>
          </FadeIn>
        </main>
      </div>
      <Footer />
    </>
  );
}
