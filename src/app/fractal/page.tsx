"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

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

// 自然界のフラクタル例
const natureExamples = [
  {
    title: "雪の結晶",
    description: "どこまで近づいて見ても、美しい六角形のパターンが繰り返されています",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g stroke="currentColor" fill="none" strokeWidth="1.5">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <line x1="50" y1="50" x2="50" y2="15" />
              <line x1="50" y1="25" x2="40" y2="35" />
              <line x1="50" y1="25" x2="60" y2="35" />
              <line x1="50" y1="35" x2="43" y2="42" />
              <line x1="50" y1="35" x2="57" y2="42" />
            </g>
          ))}
        </g>
      </svg>
    ),
  },
  {
    title: "木の枝",
    description: "幹から太い枝へ、そして細い小枝へと、同じパターンで分かれていきます",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
          <line x1="50" y1="95" x2="50" y2="60" />
          <line x1="50" y1="60" x2="30" y2="40" />
          <line x1="50" y1="60" x2="70" y2="40" />
          <line x1="30" y1="40" x2="20" y2="25" strokeWidth="1.5" />
          <line x1="30" y1="40" x2="40" y2="25" strokeWidth="1.5" />
          <line x1="70" y1="40" x2="60" y2="25" strokeWidth="1.5" />
          <line x1="70" y1="40" x2="80" y2="25" strokeWidth="1.5" />
          <line x1="20" y1="25" x2="15" y2="15" strokeWidth="1" />
          <line x1="20" y1="25" x2="25" y2="15" strokeWidth="1" />
          <line x1="40" y1="25" x2="35" y2="15" strokeWidth="1" />
          <line x1="40" y1="25" x2="45" y2="15" strokeWidth="1" />
          <line x1="60" y1="25" x2="55" y2="15" strokeWidth="1" />
          <line x1="60" y1="25" x2="65" y2="15" strokeWidth="1" />
          <line x1="80" y1="25" x2="75" y2="15" strokeWidth="1" />
          <line x1="80" y1="25" x2="85" y2="15" strokeWidth="1" />
        </g>
      </svg>
    ),
  },
  {
    title: "シダの葉",
    description: "一枚の葉の形が、小さな葉脈の形と相似しています",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round">
          <path d="M50 95 Q50 50 50 10" strokeWidth="2" />
          {[15, 25, 35, 45, 55, 65, 75].map((y, i) => (
            <g key={i}>
              <path d={`M50 ${95 - y} Q${35 - i * 2} ${85 - y} ${30 - i * 2} ${80 - y}`} />
              <path d={`M50 ${95 - y} Q${65 + i * 2} ${85 - y} ${70 + i * 2} ${80 - y}`} />
            </g>
          ))}
        </g>
      </svg>
    ),
  },
  {
    title: "血管",
    description: "太い血管から細い毛細血管まで、同じ分岐パターンが続きます",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g stroke="currentColor" fill="none" strokeLinecap="round">
          <path d="M50 90 L50 60" strokeWidth="3" />
          <path d="M50 60 L35 45" strokeWidth="2.5" />
          <path d="M50 60 L65 45" strokeWidth="2.5" />
          <path d="M35 45 L25 35" strokeWidth="2" />
          <path d="M35 45 L40 32" strokeWidth="2" />
          <path d="M65 45 L60 32" strokeWidth="2" />
          <path d="M65 45 L75 35" strokeWidth="2" />
          <path d="M25 35 L18 25" strokeWidth="1.5" />
          <path d="M25 35 L30 22" strokeWidth="1.5" />
          <path d="M40 32 L35 20" strokeWidth="1.5" />
          <path d="M40 32 L48 18" strokeWidth="1.5" />
          <path d="M60 32 L52 18" strokeWidth="1.5" />
          <path d="M60 32 L65 20" strokeWidth="1.5" />
          <path d="M75 35 L70 22" strokeWidth="1.5" />
          <path d="M75 35 L82 25" strokeWidth="1.5" />
        </g>
      </svg>
    ),
  },
];

// 入れ子構造の視覚化（正三角形版）
function NestedStructure() {
  // 正三角形のポイント（上向き）
  const getTrianglePoints = (cx: number, cy: number, size: number) => {
    const h = size * 0.866;
    const top = { x: cx, y: cy - h * 0.6 };
    const bottomLeft = { x: cx - size / 2, y: cy + h * 0.4 };
    const bottomRight = { x: cx + size / 2, y: cy + h * 0.4 };
    return `${top.x},${top.y} ${bottomLeft.x},${bottomLeft.y} ${bottomRight.x},${bottomRight.y}`;
  };

  const layers = [
    { label: "組織全体", size: 90, color: "var(--color-logo-dark-green)", opacity: 0.2, textY: 12 },
    { label: "チーム", size: 60, color: "var(--color-logo-light-green)", opacity: 0.4, textY: 35 },
    { label: "個人", size: 30, color: "var(--color-logo-dark-green)", opacity: 1, textY: 58, filled: true },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 100 90" className="w-full h-auto">
        {/* 三角形レイヤー */}
        {layers.map((layer, i) => (
          <g key={i}>
            <polygon
              points={getTrianglePoints(50, 52, layer.size)}
              fill={layer.filled ? layer.color : "none"}
              stroke={layer.color}
              strokeWidth={layer.filled ? 0 : 2}
              opacity={layer.opacity}
            />
          </g>
        ))}

        {/* ラベル */}
        <text
          x="50" y="12"
          textAnchor="middle"
          fill="var(--color-logo-dark-green)"
          fontSize="5"
          fontWeight="600"
        >
          組織全体
        </text>
        <text
          x="50" y="35"
          textAnchor="middle"
          fill="var(--color-logo-light-green)"
          fontSize="5"
          fontWeight="600"
        >
          チーム
        </text>
        <text
          x="50" y="58"
          textAnchor="middle"
          fill="white"
          fontSize="4.5"
          fontWeight="700"
        >
          個人
        </text>

        {/* 矢印で相似性を示す */}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="var(--color-logo-light-green)" />
          </marker>
        </defs>

        {/* 外側から内側への矢印 */}
        <path
          d="M 18 70 Q 10 55 18 40"
          fill="none"
          stroke="var(--color-logo-light-green)"
          strokeWidth="1"
          strokeDasharray="2 1"
          markerEnd="url(#arrow)"
          opacity="0.6"
        />
        <text x="6" y="56" fill="var(--color-ink-soft)" fontSize="3" textAnchor="middle">
          相似
        </text>

        <path
          d="M 82 70 Q 90 55 82 40"
          fill="none"
          stroke="var(--color-logo-light-green)"
          strokeWidth="1"
          strokeDasharray="2 1"
          markerEnd="url(#arrow)"
          opacity="0.6"
        />
        <text x="94" y="56" fill="var(--color-ink-soft)" fontSize="3" textAnchor="middle">
          相似
        </text>
      </svg>

      {/* 凡例 */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[var(--color-logo-dark-green)] opacity-30" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <span style={{ color: 'var(--color-ink-soft)' }}>組織</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[var(--color-logo-light-green)] opacity-60" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <span style={{ color: 'var(--color-ink-soft)' }}>チーム</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[var(--color-logo-dark-green)]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <span style={{ color: 'var(--color-ink-soft)' }}>個人</span>
        </div>
      </div>
    </div>
  );
}

// 自己相似性を表現するフラクタルツリー
function SelfSimilarTree() {
  const [growthStage, setGrowthStage] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const treeRef = useRef<HTMLDivElement>(null);

  // viewport進入を検知してアニメーション開始
  useEffect(() => {
    const el = treeRef.current;
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

  // hasStarted後に段階的に枝を展開
  useEffect(() => {
    if (!hasStarted) return;
    const timers = [200, 600, 1000, 1400, 1800].map((delay, i) =>
      setTimeout(() => setGrowthStage(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [hasStarted]);

  const branches = [
    { angle: 120, color: "var(--color-logo-dark-green)", textColor: "var(--color-logo-dark-green)", label: "会社", desc: "環境を整え" },
    { angle: 90, color: "var(--color-logo-light-green)", textColor: "var(--color-logo-light-green)", label: "スタッフ", desc: "想いを届け" },
    { angle: 60, color: "var(--color-logo-yellow)", textColor: "var(--color-ink)", label: "利用者様", desc: "笑顔が広がる" },
  ];

  const trunkX = 250;
  const trunkY = 380;
  const trunkEndY = 260;

  // 再帰的に枝を描画する関数（メモ化）
  const branchElements = React.useMemo(() => {
    const drawBranch = (
      x: number, y: number,
      angle: number, length: number,
      depth: number, maxDepth: number,
      color: string, stageRequired: number
    ): React.ReactNode[] => {
      if (depth > maxDepth || growthStage < stageRequired) return [];

      const endX = x + Math.cos((angle * Math.PI) / 180) * length;
      const endY = y - Math.sin((angle * Math.PI) / 180) * length;
      const opacity = Math.max(0.3, 1 - depth * 0.2);
      const strokeWidth = Math.max(1, 4 - depth * 0.8);

      const elements: React.ReactNode[] = [
        <line
          key={`${x}-${y}-${depth}-${angle}`}
          x1={x} y1={y} x2={endX} y2={endY}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={opacity}
          className="transition-all duration-700"
        />,
      ];

      if (depth < maxDepth) {
        const nextLength = length * 0.6;
        const spread = 25;
        elements.push(
          ...drawBranch(endX, endY, angle + spread, nextLength, depth + 1, maxDepth, color, stageRequired + 1),
          ...drawBranch(endX, endY, angle - spread, nextLength, depth + 1, maxDepth, color, stageRequired + 1),
        );
      }

      return elements;
    };

    return branches.map((branch, i) => (
      <g key={i}>
        {drawBranch(trunkX, trunkEndY, branch.angle, 90, 0, 3, branch.color, 2)}
      </g>
    ));
  }, [growthStage]);

  return (
    <div ref={treeRef} className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 500 420" className="w-full h-auto" aria-hidden="true">
        {/* 幹 */}
        <line
          x1={trunkX} y1={trunkY} x2={trunkX} y2={trunkEndY}
          stroke="var(--color-logo-dark-green)"
          strokeWidth="5"
          strokeLinecap="round"
          className="transition-all duration-700"
          opacity={growthStage >= 1 ? 1 : 0}
        />

        {/* 幹のラベル */}
        <text
          x={trunkX} y={trunkY + 18}
          textAnchor="middle"
          fill="var(--color-logo-dark-green)"
          fontSize="13"
          fontWeight="bold"
          opacity={growthStage >= 1 ? 1 : 0}
          className="transition-opacity duration-500"
        >
          理念
        </text>

        {/* 3本の主枝と再帰的な小枝 */}
        {branchElements}

        {/* 主枝の先端にラベル */}
        {branches.map((branch, i) => {
          const endX = trunkX + Math.cos((branch.angle * Math.PI) / 180) * 90;
          const endY = trunkEndY - Math.sin((branch.angle * Math.PI) / 180) * 90;
          const labelY = endY - 16;

          return (
            <g key={`label-${i}`} opacity={growthStage >= 3 ? 1 : 0} className="transition-opacity duration-500">
              <circle cx={endX} cy={endY} r={28} fill={branch.color} opacity={0.15} />
              <text
                x={endX} y={labelY}
                textAnchor="middle"
                fill={branch.textColor}
                fontSize="14"
                fontWeight="bold"
              >
                {branch.label}
              </text>
              <text
                x={endX} y={labelY + 18}
                textAnchor="middle"
                fill="var(--color-ink-soft)"
                fontSize="10"
              >
                {branch.desc}
              </text>
            </g>
          );
        })}

        {/* 自己相似性の注釈 */}
        <text
          x={250} y={50}
          textAnchor="middle"
          fill="var(--color-ink-soft)"
          fontSize="11"
          opacity={growthStage >= 5 ? 0.7 : 0}
          className="transition-opacity duration-700"
        >
          どの枝も、同じかたちで広がっていく
        </text>
      </svg>
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

      {/* 固定背景のフラクタルパターン - 画面上部中央に大きく配置 */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SierpinskiTriangle
          depth={6}
          size={800}
          className="text-[var(--color-logo-light-green)] w-full max-w-none"
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
              <div className="relative">
                <div
                  className="aspect-square rounded-3xl p-8 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--color-paper) 0%, #e8f5f0 100%)' }}
                >
                  <SierpinskiTriangle
                    depth={5}
                    size={300}
                    className="text-[var(--color-logo-dark-green)] w-full"
                    animate={false}
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ background: 'var(--color-logo-yellow)' }}
                >
                  <span className="text-3xl">∞</span>
                </div>
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
                {natureExamples.map((item, index) => (
                  <div
                    key={index}
                    className="group"
                  >
                    <div
                      className="aspect-square rounded-2xl md:rounded-3xl p-6 md:p-8 mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-paper) 0%, #e8f5f0 100%)',
                        color: 'var(--color-logo-dark-green)',
                      }}
                    >
                      {item.icon}
                    </div>
                    <h4
                      className="font-bold text-lg mb-2"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-ink-soft)' }}
                    >
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

            {/* 2カラムレイアウト */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
              {/* 左: 入れ子構造の視覚化 */}
              <div className="order-2 lg:order-1">
                <NestedStructure />
                <p
                  className="text-center mt-8 text-lg font-medium"
                  style={{ color: 'var(--color-ink)' }}
                >
                  どこを切り取っても、同じ品質
                </p>
              </div>

              {/* 右: 説明 */}
              <div className="order-1 lg:order-2 space-y-6">
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
            </div>

            {/* 自己相似性 — すべてのスケールに同じ想い */}
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
                <span>同じ想いが、</span>
                <br />
                <span className="inline-flex items-center gap-2">
                  <span>すみずみまで宿る</span>
                </span>
              </h3>
              <p
                className="text-center mb-12"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                ひとつの理念から枝分かれした想いが、どのスケールでも同じかたちで現れる。それが自己相似性です。
              </p>

              <SelfSimilarTree />

              <p
                className="text-center mt-12 text-lg leading-relaxed max-w-2xl mx-auto"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                会社が大切にする想いは、チームの行動に。チームの行動は、一人ひとりのケアに。
                <br />
                どこを切り取っても同じ想いが宿る、それがフラクタルの自己相似性。
                <br />
                <strong style={{ color: 'var(--color-logo-dark-green)' }}>
                  それが、私たち株式会社フラクタルの目指す、訪問看護のあり方です。
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
