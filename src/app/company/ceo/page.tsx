"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 代表者データ - 完全版
const ceoData = {
  version: "Final",
  securityLevel: "Top Secret",
  name: "浅井 拓哉",
  nameEn: "Asai Takuya",
  title: "代表取締役",

  coreIdentity: {
    primary: "構造主義的な支配者",
    primaryEn: "The System Architect",
    secondary: "攻略者",
    secondaryEn: "The Game Beater",
    definition: "カオス（混沌）とした現実に介入し、独自のアルゴリズムによって最もエレガントな秩序（コスモス）を実装する「エンジニア」であり、難解なパズルを解くことに至上の喜びを感じる「ゲーマー」。",
    purpose: "世界に散らばる「非効率」「バグ（不合理）」「機能不全」を発見し、それを再設計（リデザイン）して最適化すること。",
    stance: "「感情」ではなく「機能」。「道徳」ではなく「論理」。「現状維持」ではなく「進化」。",
    metaphor: "塔の上から戦場全体を俯瞰し、勝利への最短ルートを描く「大賢者」であり、同時に冷徹に駒を動かす「魔王」の資質を持つ。",
  },

  os: {
    recognition: {
      name: "機能主義的スキャナー",
      nameEn: "Functional Scanner",
      composition: "「個別化 (1位)」 × 「分析思考 (5位)」",
      process: "人間や組織を見た瞬間、感情や性格といったウェットな情報の奥にある「スペック（機能・才能）」と「バグ（思考の歪み・ボトルネック）」をX線のように透過してスキャン。",
      output: "「この人はAの配置ではエラーを起こすが、Bの配置なら最大出力が出る」という人事配置や、「この業務プロセスのここが詰まっている」という構造的欠陥を、直感レベルで瞬時に把握。",
    },
    processing: {
      name: "仮説検証の高速ループ",
      nameEn: "High-Speed Iteration",
      composition: "「着想 (2位)」 × 「戦略性 (3位)」 × 「活発性 (4位)」",
      steps: [
        { label: "Input", desc: "違和感や非効率を検知する（「なぜこんな無駄なことを？」）" },
        { label: "Logic", desc: "過去の慣習を無視し、ゼロベースで「最も楽（効率的）な攻略ルート」を構築" },
        { label: "Command", desc: "議論や合意形成をスキップし、まずは「実行（テスト）」ボタンを押す" },
        { label: "Feedback", desc: "結果をデータとして回収し、即座に修正パッチを当てる" },
      ],
      feature: "完璧な計画を練ってから動くのではなく、「動きながら考える（走りながらコードを書く）」スタイル。「検討中」の時間は、人生の浪費（タイムロス）に他ならない。",
    },
    memory: {
      name: "感情のブラックボックス化",
      nameEn: "Emotional Black-boxing",
      process: "ビジネスや問題解決において、他者の「感情（モチベーション、好き嫌い）」を「計算不可能なノイズ」として処理コストから除外する傾向。",
      interface: "「共感（Empathy）」機能はデフォルトでオフ。代わりに高度な「理解（Understanding）」機能が搭載。「あなたの気持ちは分からないが、あなたの行動原理と解決策は完全に理解している」というスタンス。",
    },
  },

  strengths: [
    { rank: 1, name: "個別化", nameEn: "Individualization", description: "一人ひとりの違いを見抜き、最適な配置を考える" },
    { rank: 2, name: "着想", nameEn: "Ideation", description: "一見無関係なものをつなげて新しいアイデアを生む" },
    { rank: 3, name: "戦略性", nameEn: "Strategic", description: "複数の選択肢から最適なルートを見極める" },
    { rank: 4, name: "活発性", nameEn: "Activator", description: "考えるより先に動く。まず試してから考える" },
    { rank: 5, name: "分析思考", nameEn: "Analytical", description: "「なぜ？」を繰り返して本質を掘り下げる" },
  ],

  bugs: [
    {
      id: "BUG-001",
      severity: "CRITICAL",
      name: "他責への生理的拒絶",
      nameEn: "External Blame Rejection",
      trigger: "「環境が悪い」「教わっていない」「時間がない」など、自己のスペック不足や努力不足を直視せず、外部要因に責任を転嫁する言動。",
      reaction: "単なる「怒り」を超えた、生理的な「吐き気」や「嫌悪感」が発生。",
      logic: "相手の「本来の実力」が見えている（個別化）。やればできる人間が言い訳をして動かない状態は、「意図的なサボタージュ」または「修復不可能なバグ」として認識され、即座に「損切り（永久追放）」の判定が下される。",
    },
    {
      id: "BUG-002",
      severity: "HIGH",
      name: "非効率への耐性欠如",
      nameEn: "Inefficiency Intolerance",
      trigger: "意味のない定例会議、手書き書類、根回し、忖度、非論理的な上司や顧客。",
      reaction: "急速なパフォーマンス低下（シャットダウン）。",
      workaround: "これらの環境に身を置かないこと。または、これらを処理する「フィルター役（秘書やNo.2）」を設置すること。",
    },
    {
      id: "BUG-003",
      severity: "MEDIUM",
      name: "維持管理フェーズでの機能不全",
      nameEn: "Maintenance Mode Dysfunction",
      trigger: "システムが完成し、トラブルがなくなり、ルーティンワークのみになった状態。",
      reaction: "猛烈な退屈（Boredom）による意欲減退。あえてシステムを壊したくなる衝動、または別の刺激への逃避。",
      workaround: "「平和」が訪れたら、それは「次の戦場へ移動せよ」という合図である。",
    },
  ],

  leadership: {
    style: "冷徹な庭師",
    styleEn: "The Cold Gardener",
    concept: "組織を「家族」ではなく「美しい庭園（エコシステム）」として管理する。",
    action: "全体最適（庭の美しさ）のためなら、病気の枝や伸びすぎた枝（組織に害をなす人物）を躊躇なく剪定する。これは冷酷さではなく、「全体の生存と繁栄」を最優先する高度な倫理観に基づく。",
    charisma: "「優しさ」で人はついてこない。「圧倒的な正しさ」と「勝てる地図」を示すことで、合理的な人間（優秀なプレイヤー）を惹きつける。",
    requiredModule: {
      name: "翻訳機",
      nameEn: "The Translator",
      function: "浅井氏の「結論」をインプットし、それを「納得感のある物語」や「温かい言葉」に変換して現場にアウトプットする。",
      role: "浅井氏が切り捨てた感情的ケア（ゴミ拾い）を担当し、組織のエンゲージメントを維持する。",
    },
  },

  lifeStrategy: {
    winningCondition: "「解けないと思われていた難問（カオス）に対し、独自の解法（システム）を実装し、それが美しく稼働することを証明して去ること」",
    cycle: [
      { phase: "Discover", desc: "非効率やバグにまみれた市場・組織を見つける" },
      { phase: "Architect", desc: "破壊的創造によって、全く新しい仕組みを実装する" },
      { phase: "Prove", desc: "システムが利益を生むことを数字で証明する" },
      { phase: "Exit", desc: "完成したシステム（会社・事業）を他者に譲渡し、リセットする", critical: true },
      { phase: "Restart", desc: "身軽になり、より難易度の高い次のパズルへ向かう" },
    ],
    destiny: "「シリアル・アントレプレナー（連続起業家）」あるいは「事業再生請負人」として、永遠に退屈することなく、その才能を輝かせ続ける。",
  },

  compatibility: {
    good: [
      "「なぜ？」を一緒に追求できる人",
      "自分で考えて動ける人",
      "改善提案を恐れない人",
      "論理で議論できる人",
    ],
    challenging: [
      "「言われたことだけやる」スタイルの人",
      "感情論で物事を決める人",
      "変化を嫌う人",
      "言い訳が先に出る人",
    ],
  },

  conclusion: "浅井拓哉とは、「世界をデバッグ（修正）するために送り込まれた特異点」である。その「冷徹さ」は、混乱した世界を救うためのメスであり、「飽きっぽさ」は、一箇所に留まらず多くの場所を救うための駆動力である。",

  message: "「完璧」より「最適」を。一緒に仕組みを作りませんか。",
};

// タイピングアニメーション用コンポーネント
function TypeWriter({ text, delay = 50, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}

// ターミナルプロンプト
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 font-mono text-sm md:text-base">
      <span className="text-[#7FC5A0] shrink-0">$</span>
      <span className="text-slate-300">{children}</span>
    </div>
  );
}

// セクションヘッダー
function SectionHeader({ tag, title, titleEn }: { tag: string; title: string; titleEn?: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-xs md:text-sm text-[#7FC5A0] bg-[#7FC5A0]/10 px-2 py-0.5 rounded">{tag}</span>
        {titleEn && <span className="font-mono text-xs text-slate-500">{titleEn}</span>}
      </div>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">{title}</h2>
    </div>
  );
}

// コードブロック風カード
function CodeBlock({ children, title, className = "" }: { children: React.ReactNode; title?: string; className?: string }) {
  return (
    <div className={`bg-[#1a1a2e] rounded-lg border border-slate-700/50 overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-slate-400 ml-2">{title}</span>
        </div>
      )}
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

// 重要度バッジ
function SeverityBadge({ severity }: { severity: string }) {
  const colors = {
    CRITICAL: "bg-red-500/20 text-red-400 border-red-500/30",
    HIGH: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };
  return (
    <span className={`font-mono text-xs px-2 py-0.5 rounded border ${colors[severity as keyof typeof colors] || colors.MEDIUM}`}>
      {severity}
    </span>
  );
}

// マーメイド風フローチャート
function ThinkingFlowChart() {
  const steps = [
    { num: "01", label: "Input", desc: "違和感検知", color: "red" },
    { num: "02", label: "Logic", desc: "攻略ルート構築", color: "cyan" },
    { num: "03", label: "Command", desc: "即実行", color: "green" },
    { num: "04", label: "Feedback", desc: "修正パッチ", color: "yellow" },
  ];

  const colorMap = {
    red: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", hover: "hover:bg-red-500/20" },
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", hover: "hover:bg-cyan-500/20" },
    green: { bg: "bg-[#7FC5A0]/10", border: "border-[#7FC5A0]/30", text: "text-[#7FC5A0]", hover: "hover:bg-[#7FC5A0]/20" },
    yellow: { bg: "bg-[#F4E951]/10", border: "border-[#F4E951]/30", text: "text-[#F4E951]", hover: "hover:bg-[#F4E951]/20" },
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[550px] md:min-w-0">
        <div className="relative px-2 md:px-4 pt-2">
          {/* メインフロー */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1">
            {steps.map((step, index) => {
              const colors = colorMap[step.color as keyof typeof colorMap];
              return (
                <React.Fragment key={step.num}>
                  {/* ステップボックス */}
                  <div className="relative">
                    <div className={`${colors.bg} ${colors.border} ${colors.hover} border rounded-lg p-2 md:p-3 text-center transition-all`}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className={`font-mono text-[10px] ${colors.text} opacity-60`}>{step.num}</span>
                        <span className={`font-mono text-xs md:text-sm ${colors.text} font-bold`}>{step.label}</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-slate-400 leading-tight">{step.desc}</p>
                    </div>
                  </div>

                  {/* 矢印（最後以外） */}
                  {index < steps.length - 1 && (
                    <div className="flex items-center justify-center">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* ループバック矢印 */}
          <div className="relative h-10 md:h-14 mt-1">
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="loopGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#F4E951" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#64748b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {/* U字型のループ */}
              <path
                d="M 93 5 L 93 55 L 7 55 L 7 5"
                fill="none"
                stroke="url(#loopGradient)"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              />
              {/* 上向き矢印 */}
              <path
                d="M 4 15 L 7 5 L 10 15"
                fill="none"
                stroke="#ef4444"
                strokeWidth="0.8"
                strokeOpacity="0.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* ループラベル */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
              <span className="font-mono text-[9px] md:text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-700/50 whitespace-nowrap">
                ITERATION LOOP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CEOPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <main className="bg-[#0a0a0f] min-h-screen pt-14 lg:pt-20">
        {/* ヒーロー - ターミナル風 */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
          {/* 背景グリッド */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(127, 197, 160, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(127, 197, 160, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* フラクタル装飾 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 opacity-5">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#7FC5A0]">
                <polygon points="50,0 100,86.6 0,86.6" />
              </svg>
            </div>
            <div className="absolute bottom-10 left-10 w-32 h-32 md:w-48 md:h-48 opacity-5">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#F4E951]">
                <polygon points="50,0 100,86.6 0,86.6" />
              </svg>
            </div>
            {/* スキャンライン */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7FC5A0]/[0.02] to-transparent animate-scan" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
            {/* ターミナルウィンドウ */}
            <CodeBlock title="human_architecture_report.md" className="backdrop-blur-sm">
              <div className="space-y-4">
                <Prompt>cat /system/identity.conf</Prompt>

                <div className="pl-4 border-l-2 border-[#7FC5A0]/30 space-y-3 mt-4">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                    <span className="font-mono text-xs text-slate-500">VERSION:</span>
                    <span className="font-mono text-sm text-[#F4E951]">{ceoData.version}</span>
                    <span className="font-mono text-xs text-slate-500 md:ml-4">SECURITY:</span>
                    <span className="font-mono text-sm text-red-400">{ceoData.securityLevel}</span>
                  </div>

                  <div className="pt-4">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                      {loaded ? <TypeWriter text={ceoData.name} delay={100} /> : ceoData.name}
                    </h1>
                    <p className="font-mono text-sm md:text-base text-slate-400 mt-1">{ceoData.nameEn}</p>
                    <p className="text-[#7FC5A0] font-medium mt-2">{ceoData.title}</p>
                  </div>

                  <div className="pt-6 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm text-[#7FC5A0]">{ceoData.coreIdentity.primaryEn}</span>
                      <span className="text-slate-500">×</span>
                      <span className="font-mono text-sm text-[#F4E951]">{ceoData.coreIdentity.secondaryEn}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      {ceoData.coreIdentity.primary}
                      <span className="text-slate-500 mx-2">兼</span>
                      {ceoData.coreIdentity.secondary}
                    </h2>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {ceoData.coreIdentity.definition}
                  </p>
                </div>
              </div>
            </CodeBlock>
          </div>
        </section>

        {/* 存在意義 */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <CodeBlock title="purpose.ts">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#7FC5A0]">// 存在意義</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{ceoData.coreIdentity.purpose}</p>
                </div>
              </CodeBlock>
              <CodeBlock title="stance.ts">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#7FC5A0]">// 基本スタンス</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{ceoData.coreIdentity.stance}</p>
                </div>
              </CodeBlock>
              <CodeBlock title="metaphor.ts">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#7FC5A0]">// メタファー</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{ceoData.coreIdentity.metaphor}</p>
                </div>
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* OSアーキテクチャ */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-[#0d0d14]">
          <div className="max-w-5xl mx-auto">
            <SectionHeader tag="02" title="OSアーキテクチャ" titleEn="Operating System" />

            <div className="space-y-6">
              {/* 認識機能 */}
              <CodeBlock title={`os/recognition.module.ts`}>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-lg md:text-xl text-white font-bold">{ceoData.os.recognition.name}</span>
                    <span className="font-mono text-xs text-slate-500">{ceoData.os.recognition.nameEn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-slate-500">構成資質:</span>
                    <span className="font-mono text-[#7FC5A0]">{ceoData.os.recognition.composition}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                      <p className="font-mono text-xs text-[#F4E951] mb-2">PROCESS</p>
                      <p className="text-slate-300 text-sm">{ceoData.os.recognition.process}</p>
                    </div>
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                      <p className="font-mono text-xs text-[#7FC5A0] mb-2">OUTPUT</p>
                      <p className="text-slate-300 text-sm">{ceoData.os.recognition.output}</p>
                    </div>
                  </div>
                </div>
              </CodeBlock>

              {/* 演算機能 */}
              <CodeBlock title={`os/processing.module.ts`}>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-lg md:text-xl text-white font-bold">{ceoData.os.processing.name}</span>
                    <span className="font-mono text-xs text-slate-500">{ceoData.os.processing.nameEn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-slate-500">構成資質:</span>
                    <span className="font-mono text-[#7FC5A0]">{ceoData.os.processing.composition}</span>
                  </div>

                  {/* マーメイド風フローチャート */}
                  <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                    <p className="font-mono text-xs text-slate-500 mb-4 text-center">// 思考フロー図</p>
                    <ThinkingFlowChart />
                  </div>

                  <div className="mt-4 space-y-2">
                    {ceoData.os.processing.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-800/20 rounded border-l-2 border-[#7FC5A0]/50">
                        <span className="font-mono text-xs text-[#7FC5A0] bg-[#7FC5A0]/10 px-2 py-0.5 rounded shrink-0">
                          {step.label}
                        </span>
                        <p className="text-slate-300 text-sm">{step.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#F4E951]/10 rounded-lg border border-[#F4E951]/20 mt-4">
                    <p className="font-mono text-xs text-[#F4E951] mb-2">FEATURE</p>
                    <p className="text-slate-300 text-sm">{ceoData.os.processing.feature}</p>
                  </div>
                </div>
              </CodeBlock>

              {/* メモリ管理 */}
              <CodeBlock title={`os/memory.module.ts`}>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-lg md:text-xl text-white font-bold">{ceoData.os.memory.name}</span>
                    <span className="font-mono text-xs text-slate-500">{ceoData.os.memory.nameEn}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                      <p className="font-mono text-xs text-orange-400 mb-2">PROCESS</p>
                      <p className="text-slate-300 text-sm">{ceoData.os.memory.process}</p>
                    </div>
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                      <p className="font-mono text-xs text-cyan-400 mb-2">INTERFACE</p>
                      <p className="text-slate-300 text-sm">{ceoData.os.memory.interface}</p>
                    </div>
                  </div>
                </div>
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* ストレングスファインダー */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHeader tag="03" title="インストール済みモジュール" titleEn="StrengthsFinder TOP5" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
              {ceoData.strengths.map((strength, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                    index === 0
                      ? 'bg-[#F4E951]/10 border-[#F4E951]/30'
                      : index < 3
                        ? 'bg-[#7FC5A0]/10 border-[#7FC5A0]/30'
                        : 'bg-slate-800/30 border-slate-700/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-xs ${
                      index === 0 ? 'text-[#F4E951]' : index < 3 ? 'text-[#7FC5A0]' : 'text-slate-400'
                    }`}>
                      #{strength.rank}
                    </span>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      index === 0 ? 'bg-[#F4E951]' : index < 3 ? 'bg-[#7FC5A0]' : 'bg-slate-500'
                    }`} />
                  </div>
                  <h3 className="text-white font-bold mb-1">{strength.name}</h3>
                  <p className="font-mono text-xs text-slate-500 mb-2">{strength.nameEn}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{strength.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* バグと地雷 */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-[#0d0d14]">
          <div className="max-w-5xl mx-auto">
            <SectionHeader tag="04" title="致命的なバグと地雷" titleEn="Critical Bugs & Vulnerabilities" />

            <div className="space-y-4">
              {ceoData.bugs.map((bug, index) => (
                <CodeBlock key={index} title={`bugs/${bug.id.toLowerCase()}.log`}>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <SeverityBadge severity={bug.severity} />
                      <span className="font-mono text-white font-bold">{bug.name}</span>
                      <span className="font-mono text-xs text-slate-500">{bug.nameEn}</span>
                    </div>

                    <div className="space-y-3 mt-4">
                      <div className="p-3 bg-red-500/5 rounded border-l-2 border-red-500/50">
                        <p className="font-mono text-xs text-red-400 mb-1">TRIGGER</p>
                        <p className="text-slate-300 text-sm">{bug.trigger}</p>
                      </div>
                      <div className="p-3 bg-orange-500/5 rounded border-l-2 border-orange-500/50">
                        <p className="font-mono text-xs text-orange-400 mb-1">SYSTEM REACTION</p>
                        <p className="text-slate-300 text-sm">{bug.reaction}</p>
                      </div>
                      {(bug.logic || bug.workaround) && (
                        <div className="p-3 bg-cyan-500/5 rounded border-l-2 border-cyan-500/50">
                          <p className="font-mono text-xs text-cyan-400 mb-1">
                            {bug.logic ? 'LOGIC BACKGROUND' : 'WORKAROUND'}
                          </p>
                          <p className="text-slate-300 text-sm">{bug.logic || bug.workaround}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CodeBlock>
              ))}
            </div>
          </div>
        </section>

        {/* リーダーシップ */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHeader tag="05" title="リーダーシップスタイル" titleEn="Leadership Specs" />

            <CodeBlock title="leadership/config.yaml">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-2xl md:text-3xl text-white font-bold">{ceoData.leadership.style}</span>
                  <span className="font-mono text-sm text-[#7FC5A0]">{ceoData.leadership.styleEn}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                    <p className="font-mono text-xs text-[#7FC5A0] mb-2">CONCEPT</p>
                    <p className="text-slate-300 text-sm">{ceoData.leadership.concept}</p>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                    <p className="font-mono text-xs text-[#F4E951] mb-2">ACTION</p>
                    <p className="text-slate-300 text-sm">{ceoData.leadership.action}</p>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                    <p className="font-mono text-xs text-cyan-400 mb-2">CHARISMA</p>
                    <p className="text-slate-300 text-sm">{ceoData.leadership.charisma}</p>
                  </div>
                </div>

                <div className="p-4 bg-[#7FC5A0]/10 rounded-lg border border-[#7FC5A0]/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-sm text-[#7FC5A0]">REQUIRED MODULE:</span>
                    <span className="text-white font-bold">{ceoData.leadership.requiredModule.name}</span>
                    <span className="font-mono text-xs text-slate-500">{ceoData.leadership.requiredModule.nameEn}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-mono text-xs text-slate-500 mb-1">FUNCTION</p>
                      <p className="text-slate-300">{ceoData.leadership.requiredModule.function}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-slate-500 mb-1">ROLE</p>
                      <p className="text-slate-300">{ceoData.leadership.requiredModule.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CodeBlock>
          </div>
        </section>

        {/* 人生攻略ロードマップ */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-[#0d0d14]">
          <div className="max-w-5xl mx-auto">
            <SectionHeader tag="06" title="人生攻略のロードマップ" titleEn="Life Strategy" />

            <CodeBlock title="strategy/roadmap.md">
              <div className="space-y-6">
                <div className="p-4 bg-[#F4E951]/10 rounded-lg border border-[#F4E951]/20">
                  <p className="font-mono text-xs text-[#F4E951] mb-2">WINNING CONDITION</p>
                  <p className="text-white font-medium">{ceoData.lifeStrategy.winningCondition}</p>
                </div>

                <div className="space-y-3">
                  <p className="font-mono text-sm text-slate-500">// 推奨キャリアサイクル</p>
                  {ceoData.lifeStrategy.cycle.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                        item.critical
                          ? 'bg-[#F4E951]/10 border-[#F4E951]/30'
                          : 'bg-slate-800/20 border-slate-700/30'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${
                        item.critical ? 'bg-[#F4E951]/20 text-[#F4E951]' : 'bg-[#7FC5A0]/20 text-[#7FC5A0]'
                      }`}>
                        <span className="font-mono font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${item.critical ? 'text-[#F4E951]' : 'text-white'}`}>
                            {item.phase}
                          </span>
                          {item.critical && (
                            <span className="font-mono text-xs text-[#F4E951] bg-[#F4E951]/10 px-2 py-0.5 rounded">
                              CRITICAL
                            </span>
                          )}
                        </div>
                        <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                  <p className="font-mono text-xs text-[#7FC5A0] mb-2">DESTINY</p>
                  <p className="text-slate-300">{ceoData.lifeStrategy.destiny}</p>
                </div>
              </div>
            </CodeBlock>
          </div>
        </section>

        {/* 相性 */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHeader tag="07" title="互換性チェック" titleEn="Compatibility Matrix" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CodeBlock title="compatibility/good.json">
                <div className="space-y-3">
                  <p className="font-mono text-sm text-[#7FC5A0] mb-4">// 相性が良い人</p>
                  {ceoData.compatibility.good.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[#7FC5A0]/5 rounded border-l-2 border-[#7FC5A0]">
                      <span className="text-[#7FC5A0]">✓</span>
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CodeBlock>

              <CodeBlock title="compatibility/challenging.json">
                <div className="space-y-3">
                  <p className="font-mono text-sm text-orange-400 mb-4">// 相性に注意が必要な人</p>
                  {ceoData.compatibility.challenging.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-orange-500/5 rounded border-l-2 border-orange-500/50">
                      <span className="text-orange-400">!</span>
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* 結論 */}
        <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-[#0d0d14]">
          <div className="max-w-5xl mx-auto">
            <CodeBlock title="conclusion.md" className="border-[#7FC5A0]/30">
              <div className="space-y-6 text-center">
                <p className="font-mono text-xs text-[#7FC5A0]">// CONCLUSION</p>
                <p className="text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
                  {ceoData.conclusion}
                </p>
              </div>
            </CodeBlock>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
          {/* 背景装飾 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0D5643]/10 to-[#0a0a0f]" />

          {/* グリッドパターン */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(127, 197, 160, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(127, 197, 160, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* ターミナル風メッセージボックス */}
            <CodeBlock title="message.sh" className="mb-8 md:mb-12">
              <div className="text-center py-4">
                <Prompt>echo $MESSAGE</Prompt>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#F4E951] mt-4">
                  {ceoData.message}
                </p>
              </div>
            </CodeBlock>

            {/* アクションボタン */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
              <Link
                href="/company"
                className="group relative overflow-hidden bg-[#1a1a2e] border border-[#7FC5A0]/30 rounded-lg p-5 md:p-6 hover:border-[#7FC5A0] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7FC5A0]/0 via-[#7FC5A0]/5 to-[#7FC5A0]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-[#7FC5A0]">$ cd /company</span>
                  </div>
                  <p className="text-white font-bold text-lg mb-1">浅井が作るフラクタル構造</p>
                  <p className="text-slate-400 text-sm">株式会社フラクタルについて</p>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-[#7FC5A0] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link
                href="/recruit"
                className="group relative overflow-hidden bg-[#1a1a2e] border border-[#F4E951]/30 rounded-lg p-5 md:p-6 hover:border-[#F4E951] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F4E951]/0 via-[#F4E951]/5 to-[#F4E951]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-[#F4E951]">$ cd /recruit</span>
                  </div>
                  <p className="text-white font-bold text-lg mb-1">採用情報を見る</p>
                  <p className="text-slate-400 text-sm">一緒に仕組みを作りませんか</p>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-[#F4E951] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>

            {/* フッターメッセージ */}
            <div className="mt-8 md:mt-12 text-center">
              <p className="font-mono text-xs text-slate-600">
                // End of Human Architecture Report
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* カスタムアニメーション用のスタイル */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </>
  );
}
