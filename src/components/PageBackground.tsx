"use client";

import { useEffect, useState } from "react";

// section-card色と被らないパステルカラー5色
// ブランドカラー（CSS変数）とは意図的に異なる装飾専用パレット
const PALETTE = [
  "#d4edfc", // lightBlue
  "#FFE8EB", // lightPink
  "#E0F5F0", // lightMint
  "#E6E6FA", // lavender
  "#FFDAB9", // peach
];

// BackgroundTriangles.tsxのSVGパスを再利用
const SHAPE_PATHS = {
  large:
    "M50 5 C70 5, 90 30, 95 55 C98 75, 88 95, 65 95 L35 95 C12 95, 2 75, 5 55 C10 30, 30 5, 50 5 Z",
  small:
    "M50 8 C65 8, 85 35, 92 65 C95 80, 85 92, 70 92 L30 92 C15 92, 5 80, 8 65 C15 35, 35 8, 50 8 Z",
} as const;

type ShapeType = keyof typeof SHAPE_PATHS;

type ShapeConfig = {
  id: string;
  type: ShapeType;
  x: number; // px
  y: number; // px
  size: number; // px
  rotation: number; // deg
  opacity: number;
  color: string;
};

// 乱数ヘルパー
function randBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randInt(min: number, max: number): number {
  return Math.floor(randBetween(min, max));
}

function randColor(): string {
  return PALETTE[randInt(0, PALETTE.length)];
}

// ユークリッド距離による衝突判定
function hasCollision(
  candidate: ShapeConfig,
  existing: ShapeConfig[],
  margin: number
): boolean {
  return existing.some((shape) => {
    const dx = candidate.x - shape.x;
    const dy = candidate.y - shape.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < candidate.size / 2 + shape.size / 2 + margin;
  });
}

function tryPlaceShape(
  candidate: ShapeConfig,
  existing: ShapeConfig[],
  margin: number
): ShapeConfig | null {
  if (!hasCollision(candidate, existing, margin)) {
    return candidate;
  }
  return null;
}

function generateShapesOfType(
  type: ShapeType,
  count: number,
  pageHeight: number,
  pageWidth: number,
  existing: ShapeConfig[],
  sizeRange: [number, number],
  opacityRange: [number, number],
  collisionMargin: number
): ShapeConfig[] {
  const placed: ShapeConfig[] = [];
  const xMin = -pageWidth * 0.05;
  const xMax = pageWidth * 1.05;
  const segmentHeight = pageHeight / count;

  for (let i = 0; i < count; i++) {
    const size =
      type === "large"
        ? 400 * randBetween(sizeRange[0], sizeRange[1])
        : randBetween(sizeRange[0], sizeRange[1]);
    const segTop = i * segmentHeight;
    const segBottom = segTop + segmentHeight;
    const allExisting = [...existing, ...placed];

    for (let attempt = 0; attempt < 30; attempt++) {
      const candidate: ShapeConfig = {
        id: `${type}-${i}-${attempt}`,
        type,
        x: randBetween(xMin, xMax),
        y: randBetween(segTop, segBottom),
        size,
        rotation: randBetween(0, 360),
        opacity: randBetween(opacityRange[0], opacityRange[1]),
        color: randColor(),
      };
      const result = tryPlaceShape(candidate, allExisting, collisionMargin);
      if (result) {
        placed.push(result);
        break;
      }
    }
  }

  return placed;
}

// リサイズ時の再生成は行わない（読み込みごとに変化する設計仕様）
function generateShapes(pageHeight: number): ShapeConfig[] {
  const pageWidth = window.innerWidth;
  const largeCount = Math.max(4, Math.floor(pageHeight / 1200));
  const smallCount = largeCount * 2;

  const largeShapes = generateShapesOfType(
    "large",
    largeCount,
    pageHeight,
    pageWidth,
    [],
    [1.2, 2.0], // scale range
    [0.4, 0.8],
    100
  );

  const smallShapes = generateShapesOfType(
    "small",
    smallCount,
    pageHeight,
    pageWidth,
    largeShapes,
    [60, 140], // size range (px)
    [0.3, 0.6],
    50
  );

  return [...largeShapes, ...smallShapes];
}

// 単一の形状SVGレンダラー（大型・小型共通）
function ShapeRenderer({ config }: { config: ShapeConfig }) {
  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        left: config.x,
        top: config.y,
        transform: `rotate(${config.rotation}deg)`,
        transformOrigin: "center",
        opacity: config.opacity,
      }}
      aria-hidden="true"
    >
      <path d={SHAPE_PATHS[config.type]} fill={config.color} />
    </svg>
  );
}

export default function PageBackground() {
  const [shapes, setShapes] = useState<ShapeConfig[]>([]);

  useEffect(() => {
    // DOM安定後にscrollHeightを計測（画像展開前の不正確な値を回避）
    requestAnimationFrame(() => {
      const pageHeight = document.documentElement.scrollHeight;
      setShapes(generateShapes(pageHeight));
    });
  }, []);

  if (shapes.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {shapes.map((shape) => (
        <ShapeRenderer key={shape.id} config={shape} />
      ))}
    </div>
  );
}
