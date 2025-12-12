// 大きな丸みを帯びたおにぎり型の背景装飾コンポーネント
function LargeRoundedShape({
  color,
  opacity,
  rotation,
  style,
  scale = 1,
}: {
  color: string;
  opacity: number;
  rotation: number;
  style: React.CSSProperties;
  scale?: number;
}) {
  const size = 400 * scale;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        ...style,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
      className="absolute pointer-events-none"
    >
      {/* おにぎりのような丸みを帯びた形 */}
      <path
        d="M50 5
           C70 5, 90 30, 95 55
           C98 75, 88 95, 65 95
           L35 95
           C12 95, 2 75, 5 55
           C10 30, 30 5, 50 5 Z"
        fill={color}
      />
    </svg>
  );
}

// 小さな丸みを帯びた三角形（散りばめ用）
function SmallRoundedTriangle({
  size,
  color,
  opacity,
  rotation,
  style,
}: {
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  style: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        ...style,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
      className="absolute pointer-events-none"
    >
      <path
        d="M50 8
           C65 8, 85 35, 92 65
           C95 80, 85 92, 70 92
           L30 92
           C15 92, 5 80, 8 65
           C15 35, 35 8, 50 8 Z"
        fill={color}
      />
    </svg>
  );
}

// パステルカラーのパレット
const colors = {
  blue: "#badcff",
  lightBlue: "#d4edfc",
  pink: "#FFD9DE",
  lightPink: "#FFE8EB",
  mint: "#C8EDE5",
  lightMint: "#E0F5F0",
  yellow: "#FFF8DC",
  lightYellow: "#FFFDF5",
  lavender: "#E6E6FA",
  peach: "#FFDAB9",
};

// 背景装飾のパターン定義
const decorationPatterns = {
  // フラクタルとはセクション - 左に大きな青いおにぎり
  about: {
    largeShapes: [
      { color: colors.blue, opacity: 0.8, rotation: -15, top: "5%", left: "-15%", scale: 1.5 },
    ],
    smallTriangles: [
      { size: 80, color: colors.pink, opacity: 0.5, rotation: 25, top: "10%", right: "5%" },
      { size: 60, color: colors.mint, opacity: 0.4, rotation: -20, top: "60%", right: "8%" },
      { size: 100, color: colors.yellow, opacity: 0.5, rotation: 40, top: "80%", right: "15%" },
    ],
  },
  // 特徴セクション - 左に大きな青いおにぎり
  features: {
    largeShapes: [
      { color: colors.blue, opacity: 0.7, rotation: -20, top: "0%", left: "-18%", scale: 1.8 },
    ],
    smallTriangles: [
      { size: 70, color: colors.pink, opacity: 0.4, rotation: 30, top: "5%", right: "3%" },
      { size: 90, color: colors.mint, opacity: 0.5, rotation: -15, top: "40%", right: "5%" },
      { size: 60, color: colors.lavender, opacity: 0.4, rotation: 45, top: "75%", right: "8%" },
    ],
  },
  // 事業所情報
  office: {
    largeShapes: [
      { color: colors.lightBlue, opacity: 0.6, rotation: 15, top: "10%", right: "-20%", scale: 1.3 },
    ],
    smallTriangles: [
      { size: 80, color: colors.pink, opacity: 0.4, rotation: -25, top: "15%", left: "3%" },
      { size: 60, color: colors.yellow, opacity: 0.5, rotation: 35, top: "70%", left: "5%" },
    ],
  },
  // 訪問エリア
  serviceArea: {
    largeShapes: [
      { color: colors.lightPink, opacity: 0.5, rotation: -10, top: "5%", left: "-15%", scale: 1.2 },
    ],
    smallTriangles: [
      { size: 70, color: colors.mint, opacity: 0.5, rotation: 20, top: "20%", right: "5%" },
      { size: 90, color: colors.blue, opacity: 0.4, rotation: -30, top: "65%", right: "3%" },
    ],
  },
  // ご利用開始までの流れ
  flow: {
    largeShapes: [
      { color: colors.lightMint, opacity: 0.6, rotation: 20, top: "0%", right: "-18%", scale: 1.4 },
    ],
    smallTriangles: [
      { size: 80, color: colors.pink, opacity: 0.4, rotation: -20, top: "10%", left: "5%" },
      { size: 60, color: colors.yellow, opacity: 0.5, rotation: 40, top: "50%", left: "3%" },
      { size: 70, color: colors.blue, opacity: 0.4, rotation: -35, top: "80%", left: "8%" },
    ],
  },
  // スタッフ紹介
  staff: {
    largeShapes: [
      { color: colors.lightYellow, opacity: 0.6, rotation: -25, top: "10%", left: "-15%", scale: 1.3 },
    ],
    smallTriangles: [
      { size: 90, color: colors.mint, opacity: 0.4, rotation: 15, top: "5%", right: "5%" },
      { size: 70, color: colors.pink, opacity: 0.5, rotation: -40, top: "60%", right: "3%" },
    ],
  },
  // リクルート
  recruit: {
    largeShapes: [
      { color: colors.mint, opacity: 0.5, rotation: 15, top: "5%", right: "-15%", scale: 1.5 },
    ],
    smallTriangles: [
      { size: 80, color: colors.pink, opacity: 0.4, rotation: -30, top: "20%", left: "5%" },
      { size: 60, color: colors.yellow, opacity: 0.5, rotation: 25, top: "70%", left: "3%" },
    ],
  },
  // お問い合わせ
  contact: {
    largeShapes: [
      { color: colors.lightPink, opacity: 0.6, rotation: -20, top: "0%", left: "-18%", scale: 1.4 },
    ],
    smallTriangles: [
      { size: 70, color: colors.mint, opacity: 0.4, rotation: 35, top: "10%", right: "5%" },
      { size: 90, color: colors.blue, opacity: 0.5, rotation: -25, top: "50%", right: "3%" },
    ],
  },
  // 会社情報
  company: {
    largeShapes: [
      { color: colors.lightBlue, opacity: 0.5, rotation: 10, top: "10%", right: "-20%", scale: 1.2 },
    ],
    smallTriangles: [
      { size: 80, color: colors.pink, opacity: 0.4, rotation: -15, top: "15%", left: "3%" },
      { size: 60, color: colors.yellow, opacity: 0.5, rotation: 40, top: "60%", left: "5%" },
    ],
  },
};

type PatternKey = keyof typeof decorationPatterns;

export default function BackgroundTriangles({ pattern = "features" }: { pattern?: PatternKey | string }) {
  const decoration = decorationPatterns[pattern as PatternKey] || decorationPatterns.features;

  if (!decoration) {
    return null;
  }

  return (
    <>
      {/* 大きな背景装飾 */}
      {decoration.largeShapes.map((shape, index) => (
        <LargeRoundedShape
          key={`large-${index}`}
          color={shape.color}
          opacity={shape.opacity}
          rotation={shape.rotation}
          scale={shape.scale}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
          } as React.CSSProperties}
        />
      ))}
      {/* 小さな三角形 */}
      {decoration.smallTriangles.map((triangle, index) => (
        <SmallRoundedTriangle
          key={`small-${index}`}
          size={triangle.size}
          color={triangle.color}
          opacity={triangle.opacity}
          rotation={triangle.rotation}
          style={{
            top: triangle.top,
            left: triangle.left,
            right: triangle.right,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
