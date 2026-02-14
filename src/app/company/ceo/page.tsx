"use client";

import React from "react";
import Link from "next/link";

// 代表者データ
const ceoData = {
  name: "浅井 拓哉",
  title: "代表取締役",
  coreIdentity: {
    title: "仕組みで課題を解決する人",
    subtitle: "The System Architect",
    description: "混乱した状況を見ると、つい整理したくなる。非効率を見つけると、つい直したくなる。それが私の性分です。",
  },
  strengths: [
    { rank: 1, name: "個別化", description: "一人ひとりの違いを見抜き、最適な配置を考える" },
    { rank: 2, name: "着想", description: "一見無関係なものをつなげて新しいアイデアを生む" },
    { rank: 3, name: "戦略性", description: "複数の選択肢から最適なルートを見極める" },
    { rank: 4, name: "活発性", description: "考えるより先に動く。まず試してから考える" },
    { rank: 5, name: "分析思考", description: "「なぜ？」を繰り返して本質を掘り下げる" },
  ],
  thinkingStyle: [
    {
      title: "機能で見る",
      description: "人や組織を見るとき、「何ができるか」「どう活かせるか」を自然と考えます",
      icon: "scan",
    },
    {
      title: "高速で回す",
      description: "完璧な計画より、まず動く。やってみて、ダメなら直す。そのサイクルを高速で回します",
      icon: "loop",
    },
    {
      title: "理解は深く",
      description: "あなたの行動原理は理解できる。でも「分かる〜」とは言えないタイプかも",
      icon: "brain",
    },
  ],
  leadershipStyle: {
    title: "全体最適を考える庭師",
    description: "組織を「庭」として見ています。全体が美しく健康に育つために、時には剪定も必要。それは冷たさではなく、チーム全員が輝くための判断です。",
  },
  workingWith: [
    { type: "good", text: "「なぜ？」を一緒に追求できる人と相性◎" },
    { type: "good", text: "自分で考えて動ける人を尊重します" },
    { type: "good", text: "改善提案、大歓迎。現状維持は苦手です" },
    { type: "note", text: "「言われたことだけやる」スタイルとは合わないかも" },
  ],
  message: "「完璧」より「最適」を。一緒に仕組みを作りませんか。",
};

// アイコンSVGを定義
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "scan":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    case "loop":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case "brain":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function CEOPage() {
  return (
    <div className="min-h-screen body-editorial">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/company"
            className="text-primary font-bold text-sm md:text-lg hover:opacity-80 transition-opacity"
          >
            ← 株式会社フラクタル
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-primary heading-gothic">
            代表の取扱説明書
          </h1>
        </div>
      </header>

      <main>
        {/* ヒーロー */}
        <section
          className="relative min-h-[50vh] flex items-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-logo-dark-green) 0%, var(--color-logo-dark-green) 40%, var(--color-logo-light-green) 100%)'
          }}
        >
          {/* 装飾的な三角形 */}
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
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 text-center">
            <p
              className="text-[var(--color-logo-yellow)] font-medium tracking-wider"
              style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-xs)' }}
            >
              {ceoData.coreIdentity.subtitle}
            </p>
            <h2
              className="font-bold text-white heading-gothic"
              style={{ fontSize: 'var(--font-size-fluid-3xl)', marginBottom: 'var(--spacing-fluid-sm)' }}
            >
              {ceoData.name}
            </h2>
            <p className="text-white/80" style={{ fontSize: 'var(--font-size-fluid-base)' }}>
              {ceoData.title}
            </p>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p
                className="font-bold text-white"
                style={{ fontSize: 'var(--font-size-fluid-xl)', marginBottom: 'var(--spacing-fluid-xs)' }}
              >
                {ceoData.coreIdentity.title}
              </p>
              <p className="text-white/80 max-w-xl mx-auto" style={{ fontSize: 'var(--font-size-fluid-sm)' }}>
                {ceoData.coreIdentity.description}
              </p>
            </div>
          </div>
        </section>

        {/* ストレングスファインダー TOP5 */}
        <section
          className="bg-white"
          style={{ paddingTop: 'var(--spacing-fluid-2xl)', paddingBottom: 'var(--spacing-fluid-xl)' }}
        >
          <div
            className="max-w-5xl mx-auto"
            style={{ paddingLeft: 'var(--spacing-fluid-md)', paddingRight: 'var(--spacing-fluid-md)' }}
          >
            <h3
              className="text-center font-bold text-primary heading-gothic"
              style={{ fontSize: 'var(--font-size-fluid-xl)', marginBottom: 'var(--spacing-fluid-md)' }}
            >
              強みTOP5（ストレングスファインダー）
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {ceoData.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-xl shadow-sm border border-slate-100 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  style={{ padding: 'var(--spacing-fluid-sm)' }}
                >
                  <div
                    className="absolute -top-px -left-px w-0 h-0"
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '20px 20px 0 0',
                      borderColor: `${index === 0 ? 'var(--color-logo-yellow)' : index < 3 ? 'var(--color-logo-light-green)' : 'var(--color-logo-dark-green)/30'} transparent transparent transparent`
                    }}
                  />
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full font-bold mb-2 ${
                      index === 0
                        ? 'bg-[var(--color-logo-yellow)] text-[var(--color-logo-dark-green)]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                    style={{ fontSize: 'var(--font-size-fluid-xs)' }}
                  >
                    #{strength.rank}
                  </span>
                  <p
                    className="font-bold text-primary"
                    style={{ fontSize: 'var(--font-size-fluid-sm)', marginBottom: '0.25rem' }}
                  >
                    {strength.name}
                  </p>
                  <p className="text-slate-500 hidden sm:block" style={{ fontSize: '0.7rem' }}>
                    {strength.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 思考スタイル */}
        <section
          className="bg-slate-50"
          style={{ paddingTop: 'var(--spacing-fluid-xl)', paddingBottom: 'var(--spacing-fluid-xl)' }}
        >
          <div
            className="max-w-5xl mx-auto"
            style={{ paddingLeft: 'var(--spacing-fluid-md)', paddingRight: 'var(--spacing-fluid-md)' }}
          >
            <h3
              className="text-center font-bold text-primary heading-gothic"
              style={{ fontSize: 'var(--font-size-fluid-xl)', marginBottom: 'var(--spacing-fluid-md)' }}
            >
              こんな風に考えます
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ceoData.thinkingStyle.map((style, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
                  style={{ padding: 'var(--spacing-fluid-md)' }}
                >
                  <div
                    className="absolute -top-px -left-px w-0 h-0"
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '24px 24px 0 0',
                      borderColor: 'var(--color-logo-light-green) transparent transparent transparent'
                    }}
                  />
                  <div className="flex items-start gap-3 pl-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-logo-light-green)]/20 text-[var(--color-logo-dark-green)] flex items-center justify-center shrink-0">
                      {getIcon(style.icon)}
                    </div>
                    <div>
                      <h4
                        className="font-bold text-primary"
                        style={{ fontSize: 'var(--font-size-fluid-sm)', marginBottom: '0.25rem' }}
                      >
                        {style.title}
                      </h4>
                      <p className="text-slate-600" style={{ fontSize: 'var(--font-size-fluid-xs)' }}>
                        {style.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* リーダーシップスタイル */}
        <section
          className="bg-white"
          style={{ paddingTop: 'var(--spacing-fluid-xl)', paddingBottom: 'var(--spacing-fluid-xl)' }}
        >
          <div
            className="max-w-5xl mx-auto"
            style={{ paddingLeft: 'var(--spacing-fluid-md)', paddingRight: 'var(--spacing-fluid-md)' }}
          >
            <div
              className="relative bg-gradient-to-r from-[var(--color-logo-light-green)]/10 to-[var(--color-logo-yellow)]/10 rounded-2xl"
              style={{ padding: 'var(--spacing-fluid-lg)' }}
            >
              <div
                className="absolute -top-px -left-px w-0 h-0"
                style={{
                  borderStyle: 'solid',
                  borderWidth: '32px 32px 0 0',
                  borderColor: 'var(--color-logo-dark-green) transparent transparent transparent'
                }}
              />
              <div className="text-center pl-4">
                <p
                  className="text-[var(--color-logo-dark-green)] font-medium tracking-wider"
                  style={{ fontSize: 'var(--font-size-fluid-xs)', marginBottom: 'var(--spacing-fluid-xs)' }}
                >
                  LEADERSHIP STYLE
                </p>
                <h3
                  className="font-bold text-primary heading-gothic"
                  style={{ fontSize: 'var(--font-size-fluid-xl)', marginBottom: 'var(--spacing-fluid-sm)' }}
                >
                  {ceoData.leadershipStyle.title}
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto" style={{ fontSize: 'var(--font-size-fluid-sm)' }}>
                  {ceoData.leadershipStyle.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 一緒に働くと */}
        <section
          className="bg-slate-50"
          style={{ paddingTop: 'var(--spacing-fluid-xl)', paddingBottom: 'var(--spacing-fluid-xl)' }}
        >
          <div
            className="max-w-5xl mx-auto"
            style={{ paddingLeft: 'var(--spacing-fluid-md)', paddingRight: 'var(--spacing-fluid-md)' }}
          >
            <h3
              className="text-center font-bold text-primary heading-gothic"
              style={{ fontSize: 'var(--font-size-fluid-xl)', marginBottom: 'var(--spacing-fluid-md)' }}
            >
              一緒に働くとこうなります
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {ceoData.workingWith.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-3 rounded-xl ${
                    item.type === 'good'
                      ? 'bg-[var(--color-logo-light-green)]/10'
                      : 'bg-slate-200'
                  }`}
                  style={{ padding: 'var(--spacing-fluid-sm)' }}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      item.type === 'good'
                        ? 'bg-[var(--color-logo-light-green)] text-white'
                        : 'bg-slate-400 text-white'
                    }`}
                  >
                    {item.type === 'good' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-primary" style={{ fontSize: 'var(--font-size-fluid-sm)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="bg-[var(--color-logo-dark-green)] text-white"
          style={{ paddingTop: 'var(--spacing-fluid-2xl)', paddingBottom: 'var(--spacing-fluid-2xl)' }}
        >
          <div
            className="max-w-4xl mx-auto text-center"
            style={{ paddingLeft: 'var(--spacing-fluid-md)', paddingRight: 'var(--spacing-fluid-md)' }}
          >
            <p
              className="inline-block bg-[var(--color-logo-yellow)] text-[var(--color-logo-dark-green)] font-bold rounded-full"
              style={{ padding: 'var(--spacing-fluid-sm) var(--spacing-fluid-lg)', fontSize: 'var(--font-size-fluid-lg)', marginBottom: 'var(--spacing-fluid-lg)' }}
            >
              {ceoData.message}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link
                href="/company"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--color-logo-dark-green)] rounded-full font-bold hover:bg-[var(--color-logo-yellow)] transition-all shadow-lg"
                style={{ fontSize: 'var(--font-size-fluid-sm)' }}
              >
                浅井が作るフラクタル構造 →
              </Link>
              <Link
                href="/recruit"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white rounded-full font-bold hover:bg-white/10 hover:border-white transition-all"
                style={{ fontSize: 'var(--font-size-fluid-sm)' }}
              >
                採用情報を見る
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 text-white/60 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            フラクタル訪問看護 船橋
          </Link>
          <span className="mx-2">|</span>
          <Link href="/company" className="hover:text-white transition-colors">
            株式会社フラクタル
          </Link>
        </div>
      </footer>
    </div>
  );
}
