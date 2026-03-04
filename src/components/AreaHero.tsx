import Image from "next/image";
import { RegionalData } from "@/lib/regional-data";

type Props = { area: RegionalData };

export default function AreaHero({ area }: Props) {
  return (
    <section
      id="area-hero"
      className="relative z-[2] min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-end justify-center overflow-hidden"
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

      {/* 下部のぼかし（背景色へのグラデーション） */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"></div>

      {/* SEO用H1（視覚的に非表示、スクリーンリーダー向け） */}
      <h1 className="sr-only">{area.h1}</h1>

      {/* コンテンツ */}
      <div
        className="relative z-10 text-center px-4 pb-16 md:pb-24"
        style={{ perspective: "1000px" }}
      >
        {/* メインキャッチコピー（横書き） */}
        <div className="animate-emerge-from-back">
          <h2
            className="font-bold drop-shadow-lg heading-gothic text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider"
            style={{
              color: area.theme.primary,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            フラクタル訪問看護
          </h2>
          <p
            className="font-bold heading-gothic text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.3em] mt-2"
            style={{
              color: area.theme.primary,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            船橋
          </p>
        </div>
      </div>
    </section>
  );
}
