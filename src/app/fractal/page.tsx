"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { natureExamples as natureExamplesData, fractalObject } from "@/lib/fractal-data";

// フラクタル構造化データ
function FractalStructuredData() {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "フラクタルとは｜フラクタル訪問看護の理念",
    description:
      "フラクタルとは、小さな部分が集まって全体の形をつくる自然のしくみ。フラクタル訪問看護の理念を解説。",
    author: {
      "@type": "Organization",
      name: "株式会社フラクタル",
    },
    publisher: {
      "@type": "Organization",
      name: "フラクタル訪問看護 船橋",
      logo: {
        "@type": "ImageObject",
        url: "https://fractal-hokan.com/images/logos/corporate-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fractal-hokan.com/fractal",
    },
    keywords: "フラクタル, 自己相似性, 訪問看護, 理念",
  };

  return (
    <Script
      id="fractal-article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
}

// シェルピンスキーの三角形 SVG コンポーネント
function SierpinskiTriangle({
  depth = 5,
  size = 400,
  className = "",
  animate = true
}: {
  depth?: number;
  size?: number;
  className?: string;
  animate?: boolean;
}) {
  const triangles: { points: string; delay: number; level: number }[] = [];

  function generateTriangles(
    x: number, y: number,
    size: number,
    level: number,
    index: number = 0
  ) {
    if (level === 0) {
      const h = size * Math.sqrt(3) / 2;
      const points = `${x},${y + h} ${x + size / 2},${y} ${x + size},${y + h}`;
      triangles.push({ points, delay: index * 0.04, level });
      return index + 1;
    }

    const newSize = size / 2;
    const h = newSize * Math.sqrt(3) / 2;

    let idx = index;
    idx = generateTriangles(x, y + h, newSize, level - 1, idx);
    idx = generateTriangles(x + newSize / 2, y, newSize, level - 1, idx);
    idx = generateTriangles(x + newSize, y + h, newSize, level - 1, idx);

    return idx;
  }

  generateTriangles(0, 0, size, depth);
  const height = size * Math.sqrt(3) / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${height}`}
      className={className}
      style={{ overflow: 'visible' }}
    >
      {triangles.map((t, i) => (
        <polygon
          key={i}
          points={t.points}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.6 - t.level * 0.1}
          style={animate ? {
            animation: `fractalFadeIn 0.5s ease-out forwards`,
            animationDelay: `${t.delay}s`,
            opacity: 0,
          } : undefined}
        />
      ))}
    </svg>
  );
}


// 同じパターンがスケール違いで繰り返される自己相似性の表現
function ScaleRepetition() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // 社会→会社→チーム→個人→顧客の順にゆっくり表示、繰り返し
  useEffect(() => {
    if (!hasStarted) return;
    const cycleMs = 16000;
    const run = () => {
      setRevealedCount(0);
      const t1 = setTimeout(() => setRevealedCount(1), 800);
      const t2 = setTimeout(() => setRevealedCount(2), 3000);
      const t3 = setTimeout(() => setRevealedCount(3), 5200);
      const t4 = setTimeout(() => setRevealedCount(4), 7400);
      const t5 = setTimeout(() => setRevealedCount(5), 9600);
      return [t1, t2, t3, t4, t5];
    };
    let timers = run();
    const interval = setInterval(() => { timers = run(); }, cycleMs);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, [hasStarted]);

  // 社会から顧客へ、安定が伝播するストーリー
  const scales = [
    {
      label: "社会",
      desc: "安定した社会が、すべての土台になる",
      color: "var(--color-logo-light-green)",
    },
    {
      label: "会社",
      desc: "社会の安定が、会社の安定した経営につながる",
      color: "var(--color-logo-dark-green)",
    },
    {
      label: "チーム",
      desc: "会社の安定が、チームの安定につながる",
      color: "#c4a800",
    },
    {
      label: "個人",
      desc: "チームの安定が、個人のパフォーマンスを引き出す",
      color: "#f97316",
    },
    {
      label: "顧客",
      desc: "個人の安定したパフォーマンスが、顧客の体験の質を高める",
      color: "#e11d48",
    },
  ];

  /*
    5つの正三角形。左下角(10,340)を共有。
    内側三角形の右角 = 外側三角形の底辺中心（各baseが半分になる）
    社会: base=380 (10→390), h=329, top=(200, 11), center=200
    会社: base=190 (10→200), h=164, top=(105, 176), center=105
    チーム: base=95  (10→105), h=82,  top=(58, 258), center=57.5
    個人: base=48   (10→58),  h=41,  top=(34, 299), center=34
    顧客: base=24   (10→34),  h=21,  top=(22, 319)
  */

  // 背景用シェルピンスキー三角形を社会三角形と同じ座標系で生成
  const bgTriangles: string[] = [];
  function generateBg(x: number, y: number, size: number, level: number) {
    if (level === 0) {
      const h = size * Math.sqrt(3) / 2;
      bgTriangles.push(`${x},${y + h} ${x + size / 2},${y} ${x + size},${y + h}`);
      return;
    }
    const s = size / 2;
    const h = s * Math.sqrt(3) / 2;
    generateBg(x, y + h, s, level - 1);
    generateBg(x + s / 2, y, s, level - 1);
    generateBg(x + s, y + h, s, level - 1);
  }
  generateBg(10, 11, 380, 5);

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      <div className="relative flex justify-center mb-10">
        <svg viewBox="0 0 410 380" className="w-full max-w-lg h-auto" aria-hidden="true">

          {/* 背景: 社会三角形と同じ座標系のシェルピンスキーパターン */}
          {bgTriangles.map((points, i) => (
            <polygon
              key={`bg-${i}`}
              points={points}
              fill="none"
              stroke="var(--color-logo-dark-green)"
              strokeWidth={0.8}
              opacity={0.5}
            />
          ))}

          {/* 1. 社会（最大）— 薄い緑 */}
          <polygon
            points="200,11 390,340 10,340"
            fill="var(--color-logo-light-green)"
            fillOpacity={revealedCount >= 1 ? 0.25 : 0}
            stroke="var(--color-logo-light-green)"
            strokeWidth="2.5"
            strokeOpacity={revealedCount >= 1 ? 1 : 0}
            className="transition-all duration-1200"
          />
          <text
            x="390" y="365"
            textAnchor="middle"
            fill="var(--color-logo-light-green)"
            fontSize="13"
            fontWeight="bold"
            opacity={revealedCount >= 1 ? 1 : 0}
            className="transition-all duration-1200"
          >
            社会
          </text>

          {/* 2. 会社 — 濃い緑 */}
          <polygon
            points="105,176 200,340 10,340"
            fill="var(--color-logo-dark-green)"
            fillOpacity={revealedCount >= 2 ? 0.3 : 0}
            stroke="var(--color-logo-dark-green)"
            strokeWidth="2.5"
            strokeOpacity={revealedCount >= 2 ? 1 : 0}
            className="transition-all duration-1200"
          />
          <text
            x="200" y="365"
            textAnchor="middle"
            fill="var(--color-logo-dark-green)"
            fontSize="13"
            fontWeight="bold"
            opacity={revealedCount >= 2 ? 1 : 0}
            className="transition-all duration-1200"
          >
            会社
          </text>

          {/* 3. チーム — 黄色 */}
          <polygon
            points="58,258 105,340 10,340"
            fill="var(--color-logo-yellow)"
            fillOpacity={revealedCount >= 3 ? 0.4 : 0}
            stroke="var(--color-logo-yellow)"
            strokeWidth="2.5"
            strokeOpacity={revealedCount >= 3 ? 1 : 0}
            className="transition-all duration-1200"
          />
          <text
            x="105" y="365"
            textAnchor="middle"
            fill="#c4a800"
            fontSize="12"
            fontWeight="bold"
            opacity={revealedCount >= 3 ? 1 : 0}
            className="transition-all duration-1200"
          >
            チーム
          </text>

          {/* 4. 個人 — オレンジ */}
          <polygon
            points="34,299 58,340 10,340"
            fill="#f97316"
            fillOpacity={revealedCount >= 4 ? 0.35 : 0}
            stroke="#f97316"
            strokeWidth="2.5"
            strokeOpacity={revealedCount >= 4 ? 1 : 0}
            className="transition-all duration-1200"
          />
          <text
            x="58" y="365"
            textAnchor="middle"
            fill="#f97316"
            fontSize="11"
            fontWeight="bold"
            opacity={revealedCount >= 4 ? 1 : 0}
            className="transition-all duration-1200"
          >
            個人
          </text>

          {/* 5. 顧客（最小）— コーラル */}
          <polygon
            points="22,319 34,340 10,340"
            fill="#e11d48"
            fillOpacity={revealedCount >= 5 ? 0.4 : 0}
            stroke="#e11d48"
            strokeWidth="2.5"
            strokeOpacity={revealedCount >= 5 ? 1 : 0}
            className="transition-all duration-1200"
          />
          <text
            x="34" y="365"
            textAnchor="middle"
            fill="#e11d48"
            fontSize="10"
            fontWeight="bold"
            opacity={revealedCount >= 5 ? 1 : 0}
            className="transition-all duration-1200"
          >
            顧客
          </text>
        </svg>
      </div>

      {/* 表示中のスケールの説明 */}
      <div className="relative h-24 flex items-center justify-center">
        {scales.map((scale, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000"
            style={{ opacity: revealedCount === i + 1 || (revealedCount >= 5 && i === 4) ? 1 : 0 }}
          >
            <span
              className="text-lg font-bold mb-1"
              style={{ color: scale.color }}
            >
              {scale.label}
            </span>
            <span style={{ color: 'var(--color-ink-soft)' }} className="text-sm">
              {scale.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FractalPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header />
      <FractalStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: "https://fractal-hokan.com" },
          { name: "フラクタルとは", url: "https://fractal-hokan.com/fractal" },
        ]}
      />

      <style jsx global>{`
        @keyframes fractalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 0.6;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* 固定背景のフラクタルパターン - ヘッダー下から画面内に収まるよう配置 */}
      <div
        className="fixed inset-0 pt-16 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
      >
        <SierpinskiTriangle
          depth={6}
          size={800}
          className="text-[var(--color-logo-light-green)] max-w-[90vw] max-h-[80vh] w-auto h-auto"
        />
      </div>

      <main className="min-h-screen overflow-hidden relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >

          {/* コンテンツ */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
            <div className="mb-8">
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wider"
                style={{
                  background: 'rgba(127, 197, 160, 0.15)',
                  color: 'var(--color-logo-dark-green)',
                }}
              >
                WHAT IS FRACTAL?
              </span>
            </div>

            <h1 className="mb-8">
              <Image
                src="/images/fractal-title.png"
                alt="フラクタル"
                width={400}
                height={120}
                className="w-auto h-16 md:h-24 lg:h-32 mx-auto"
                priority
              />
            </h1>

            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              自然界のあちこちに隠れている、
              <br className="hidden sm:block" />
              美しく不思議な「かたち」の法則。
              <br className="hidden sm:block" />
              <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                それは、私たちの理念そのものです。
              </span>
            </p>
          </div>

          {/* スクロールインジケーター - セクション基準で配置 */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            style={{ animation: 'float 2s ease-in-out infinite' }}
          >
            <div className="flex flex-col items-center gap-2 text-[var(--color-logo-dark-green)]">
              <span className="text-xs tracking-widest font-medium">SCROLL</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* Part 1: フラクタルとは */}
        <section className="py-24 md:py-32 relative">

          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
              {/* 左: テキスト */}
              <div>
                <span
                  className="inline-block text-sm font-bold tracking-widest mb-4"
                  style={{ color: 'var(--color-logo-light-green)' }}
                >
                  PART 01
                </span>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 heading-gothic flex items-center gap-2 md:gap-3"
                  style={{ color: 'var(--color-ink)' }}
                >
                  <Image
                    src="/images/fractal-title.png"
                    alt="フラクタル"
                    width={200}
                    height={60}
                    className="h-8 md:h-10 lg:h-14 w-auto"
                  />
                  <span>とは</span>
                </h2>
                <div className="space-y-6 text-lg" style={{ color: 'var(--color-ink-soft)' }}>
                  <p className="leading-relaxed">
                    フラクタルとは、どんなに小さな一部分を切り取っても、
                    <strong style={{ color: 'var(--color-ink)' }}>全体とよく似た形をしている</strong>
                    構造のこと。
                  </p>
                  <p className="leading-relaxed">
                    「小さな部分が集まって、全体の形をつくる」
                    ——自然界に息づく、美しいしくみです。
                  </p>
                  <p className="leading-relaxed">
                    この<strong style={{ color: 'var(--color-logo-dark-green)' }}>「自己相似性」</strong>こそが、
                    私たちのサービスの原点になっています。
                  </p>
                </div>
              </div>

              {/* 右: イラスト */}
              <div className="aspect-square rounded-3xl overflow-hidden">
                <Image
                  src={fractalObject.imageSrc}
                  alt={fractalObject.alt}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* 自然界のフラクタル */}
            <div className="mb-12">
              <h3
                className="text-2xl md:text-3xl font-bold mb-12 text-center heading-gothic flex items-center justify-center gap-2"
                style={{ color: 'var(--color-ink)' }}
              >
                <span>自然界の</span>
                <Image
                  src="/images/fractal-title.png"
                  alt="フラクタル"
                  width={150}
                  height={45}
                  className="h-6 md:h-8 w-auto"
                />
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {natureExamplesData.map((item, index) => (
                  <div key={index} className="group">
                    <div
                      className="aspect-square rounded-2xl md:rounded-3xl mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl overflow-hidden"
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        width={512}
                        height={512}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--color-ink)' }}>
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Part 2: 私たちのフラクタル */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span
                className="inline-block text-sm font-bold tracking-widest mb-4"
                style={{ color: 'var(--color-logo-dark-green)' }}
              >
                PART 02
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold heading-gothic flex items-center justify-center gap-2 md:gap-3"
                style={{ color: 'var(--color-ink)' }}
              >
                <span>私たちの</span>
                <Image
                  src="/images/fractal-title.png"
                  alt="フラクタル"
                  width={200}
                  height={60}
                  className="h-8 md:h-10 lg:h-14 w-auto"
                />
                <span>構造</span>
              </h2>
            </div>

            {/* 説明カード */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
                {/* カード1: ユニークなかたち */}
                <div
                  className="relative bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* 左上の三角マーク */}
                  <div
                    className="absolute -top-px -left-px w-0 h-0"
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '28px 28px 0 0',
                      borderColor: 'var(--color-logo-dark-green) transparent transparent transparent'
                    }}
                  />
                  <h3
                    className="text-xl font-bold mb-3 pl-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    ひとつひとつが、ユニークなかたち
                  </h3>
                  <p style={{ color: 'var(--color-ink-soft)' }} className="leading-relaxed">
                    自然界のフラクタルがそうであるように、私たちの組織も完璧に整った幾何学模様ではありません。
                    スタッフ一人ひとりの個性が、組織の美しさと強さを作っています。
                  </p>
                </div>

                {/* カード2: 温かいケア */}
                <div
                  className="relative bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* 左上の三角マーク */}
                  <div
                    className="absolute -top-px -left-px w-0 h-0"
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '28px 28px 0 0',
                      borderColor: 'var(--color-logo-light-green) transparent transparent transparent'
                    }}
                  />
                  <h3
                    className="text-xl font-bold mb-3 pl-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    どこを切り取っても、温かいケアを
                  </h3>
                  <p style={{ color: 'var(--color-ink-soft)' }} className="leading-relaxed mb-4">
                    フラクタルの自己相似性を、私たちはサービス品質に活かしています。
                  </p>
                  <ul className="space-y-2">
                    {[
                      { level: "スタッフ一人ひとり", desc: "心のこもったケアを" },
                      { level: "チームとして", desc: "変わらない安心感を" },
                      { level: "組織全体で", desc: "一貫した品質と思いを" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div
                          className="w-0 h-0"
                          style={{
                            borderStyle: 'solid',
                            borderWidth: '4px 0 4px 6px',
                            borderColor: 'transparent transparent transparent var(--color-logo-light-green)'
                          }}
                        />
                        <span>
                          <strong style={{ color: 'var(--color-ink)' }}>{item.level}</strong>
                          <span style={{ color: 'var(--color-ink-soft)' }}>が、{item.desc}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* カード3: 仕組み */}
                <div
                  className="relative bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* 左上の三角マーク */}
                  <div
                    className="absolute -top-px -left-px w-0 h-0"
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '28px 28px 0 0',
                      borderColor: 'var(--color-logo-yellow) transparent transparent transparent'
                    }}
                  />
                  <h3
                    className="text-xl font-bold mb-3 pl-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    仕組みが質の高いサービスを作る
                  </h3>
                  <p style={{ color: 'var(--color-ink-soft)' }} className="leading-relaxed">
                    個人の頑張りだけに頼るのではなく、しっかりとした「仕組み」を整えることで、
                    誰が訪問しても同じ品質のサービスを提供できる体制を整えています。
                  </p>
                </div>
            </div>

            {/* 自己相似性 — どのスケールでも同じパターン */}
            <div
              className="rounded-[2rem] md:rounded-[3rem] p-8 md:p-16"
              style={{
                background: 'linear-gradient(135deg, rgba(127, 197, 160, 0.1) 0%, rgba(244, 233, 81, 0.1) 100%)',
              }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold text-center mb-4 heading-gothic"
                style={{ color: 'var(--color-ink)' }}
              >
                <span>ミクロでもマクロでも、</span>
                <br />
                <span>同じパターンが現れる</span>
              </h3>
              <p
                className="text-center mb-12"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                社会、会社、チーム、個人、顧客。どのスケールで切り取っても、同じ「安定」の構造が繰り返される。それがフラクタルです。
              </p>

              <ScaleRepetition />

              <p
                className="text-center mt-12 text-lg leading-relaxed max-w-2xl mx-auto"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                社会が安定すれば、会社も安定する。会社の安定がチームを支え、チームの安定が個人の力を引き出し、個人の安定したパフォーマンスが顧客の体験の質を高める。
                <br />
                <strong style={{ color: 'var(--color-logo-dark-green)' }}>
                  この連鎖こそが、私たち株式会社フラクタルの目指す、訪問看護のあり方です。
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <div className="rounded-3xl md:rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgba(127, 197, 160, 0.4), rgba(127, 197, 160, 0.15))' }}>
              {/* 背景の装飾 */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <SierpinskiTriangle
                  depth={4}
                  size={400}
                  className="absolute -right-32 -top-16 text-[var(--color-logo-dark-green)] w-[400px]"
                  animate={false}
                />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-ink)] mb-4 heading-gothic">
                  フラクタル訪問看護について
                </h2>
                <p className="text-[var(--color-ink-soft)] text-base md:text-lg mb-8 max-w-xl mx-auto">
                  私たちのサービスや採用情報について、詳しくはこちらをご覧ください。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/company"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-logo-dark-green)] text-white rounded-full font-bold text-base hover:opacity-90 transition-opacity shadow-lg"
                  >
                    株式会社フラクタル
                  </Link>
                  <Link
                    href="/recruit"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--color-logo-dark-green)] text-[var(--color-logo-dark-green)] rounded-full font-bold text-base hover:bg-[var(--color-logo-dark-green)]/10 transition-colors"
                  >
                    採用情報
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
