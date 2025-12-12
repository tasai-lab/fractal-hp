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
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
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
          <circle
            cx="12"
            cy="12"
            r="3"
            strokeWidth={strokeWidth}
            fill={iconColor}
            opacity="0.3"
          />
        </svg>
      );

    case "box":
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="3.27 6.96 12 12.01 20.73 6.96"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="22.08"
            x2="12"
            y2="12"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
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
      return (
        <svg
          className={iconSize}
          fill="none"
          stroke={iconColor}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 12l2 2 4-4"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            strokeWidth={strokeWidth}
            opacity="0.2"
            fill={iconColor}
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
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* アイコン */}
                    <div className="mb-4">
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
