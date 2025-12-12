import { features } from "@/lib/data";
import BackgroundTriangles from "./BackgroundTriangles";

// アイコンコンポーネント
function FeatureIcon({ icon }: { icon: string }) {
  const iconSize = "w-12 h-12";
  const strokeWidth = "2";
  const iconColor = "var(--color-primary)";

  switch (icon) {
    case "clock":
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" strokeWidth={strokeWidth} />
          <path
            d="M12 6v6l4 2"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "calendar":
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            ry="2"
            strokeWidth={strokeWidth}
          />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="2"
            x2="8"
            y2="6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="10"
            x2="21"
            y2="10"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );

    case "phone":
      // 24時間対応 - ヘッドセット/コールセンターアイコン
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 18v-6a9 9 0 0 1 18 0v6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "heart":
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "mind":
      // 精神科 - 双葉（癒やし・成長）アイコン
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22v-8"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 14a7 7 0 0 0-7-7c0 8 7 8 7 8s7 0 7-8a7 7 0 0 0-7 7z"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "box":
      // 無料レンタル - ギフト/プレゼントアイコン
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="8"
            width="18"
            height="14"
            rx="2"
            strokeWidth={strokeWidth}
          />
          <path
            d="M12 8v14"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d="M3 12h18"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d="M12 8c-2-2-5-2.5-5 0s3 2 5 2 5 .5 5-2-3-2-5 0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "shield":
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "handshake":
      // 医療連携 - 病院/クリニックアイコン
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 21h18"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 21V7l7-4 7 4v14"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21v-6h6v6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7v4M10 9h4"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" strokeWidth={strokeWidth} />
        </svg>
      );
  }
}

export default function Features() {
  return (
    <section id="features" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="features" />
      <div className="section-inner relative z-10">
        {/* セクションタイトル（縦書き） */}
        <div className="section-title-area">
          <h2 className="section-title">フラクタルの特徴</h2>
          <div className="section-title-line" />
        </div>

        {/* 特徴カードグリッド - 丸みを帯びた四角形で囲む */}
        <div className="section-content">
          <div className="section-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover-lift border border-transparent hover:border-[var(--color-accent-yellow)]"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* アイコン */}
                    <div className="mb-4 p-4 bg-[var(--color-accent-yellow-dark)]/20 rounded-full">
                      <FeatureIcon icon={feature.icon} />
                    </div>

                    {/* タイトル */}
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-primary)]">
                      {feature.title}
                    </h3>

                    {/* 説明 */}
                    <p className="text-base mb-3 whitespace-pre-line leading-relaxed text-[var(--color-foreground)]">
                      {feature.description}
                    </p>

                    {/* 注釈 */}
                    {feature.note && (
                      <p className="text-sm text-[var(--color-muted)] whitespace-pre-line leading-relaxed">
                        {feature.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
