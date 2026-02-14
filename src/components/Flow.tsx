import { flowSteps } from "@/lib/data";
import BackgroundTriangles from "./BackgroundTriangles";

export default function Flow() {
  return (
    <section id="flow" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="flow" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">ご利用開始までの流れ</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          {/* 丸みを帯びた四角形で囲む */}
          <div className="section-card section-card-pink">
            {/* フローチャート - 均等配置 */}
            <div className="grid grid-cols-1 gap-5">
              {flowSteps.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center">
                  {/* ステップカード - フラクタル番号付きカード */}
                  <div
                    className="fractal-numbered-card shadow-sm w-full"
                    data-number={step.step}
                  >
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[var(--color-primary)]">
                      {step.title}
                    </h3>
                    <p className="text-foreground leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* 矢印（最後のステップ以外）- 三角形モチーフ */}
                  {index < flowSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <svg
                        width="32"
                        height="24"
                        viewBox="0 0 32 24"
                        className="text-[var(--color-logo-light-green)]"
                      >
                        <path
                          d="M16 20 L4 6 L28 6 Z"
                          fill="currentColor"
                          opacity="0.6"
                        />
                        <path
                          d="M16 16 L8 6 L24 6 Z"
                          fill="currentColor"
                          opacity="0.3"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* お問い合わせ案内 */}
            <div className="mt-8 md:mt-12 text-center space-y-4 md:space-y-6">
              <p className="text-foreground text-base md:text-lg">
                サービス利用についてご不明な点がございましたら、お気軽にお問い合わせください。
              </p>
              <a
                href="#contact"
                className="btn-primary inline-block text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
              >
                お問い合わせフォームはこちら
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
