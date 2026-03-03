import Image from "next/image";
import { RegionalData } from "@/lib/regional-data";

type Props = { area: RegionalData };

export default function AreaHero({ area }: Props) {
  return (
    <section
      id="area-hero"
      className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* 背景画像 */}
      <Image
        src="/images/hero/hero-bg.webp"
        alt={`${area.name}の訪問看護スタッフ`}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* 白オーバーレイ */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* エリアカラーのごく薄いオーバーレイ */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `${area.theme.primary}15` }}
      ></div>

      {/* 下部のぼかし（背景色へのグラデーション） */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"></div>

      {/* SEO用H1（上部に小さく配置） */}
      <h1
        className="absolute top-4 md:top-6 left-0 right-0 z-10 text-center text-sm md:text-base font-medium tracking-wide"
        style={{ color: area.theme.primary, opacity: 0.8 }}
      >
        {area.h1}
      </h1>

      {/* コンテンツ */}
      <div
        className="relative z-10 text-center px-4 py-8 flex flex-col items-center justify-center h-full"
        style={{ perspective: "1000px" }}
      >
        {/* メインキャッチコピー（縦書き） */}
        <div className="flex justify-center animate-emerge-from-back">
          <h2
            className="font-bold drop-shadow-lg heading-gothic"
            style={{
              fontSize: "var(--font-size-fluid-4xl)",
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "0.15em",
              color: area.theme.primary,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            フラクタル訪問看護 船橋
          </h2>
        </div>
      </div>
    </section>
  );
}
