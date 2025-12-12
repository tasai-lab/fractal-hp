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
            {/* フローチャート */}
            <div className="space-y-8">
              {flowSteps.map((step, index) => (
                <div key={step.step}>
                  {/* ステップカード - 白背景 */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-6">
                      {/* ステップ番号バッジ */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                          {step.step}
                        </div>
                      </div>

                      {/* コンテンツ */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3">
                          {step.title}
                        </h3>
                        <p className="text-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 矢印（最後のステップ以外） */}
                  {index < flowSteps.length - 1 && (
                    <div className="flex justify-center py-4">
                      <svg
                        width="40"
                        height="60"
                        viewBox="0 0 40 60"
                        className="text-accent-blue"
                      >
                        <path
                          d="M20 0 L20 50 M20 50 L10 40 M20 50 L30 40"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* お問い合わせボタン */}
            <div className="mt-12 text-center">
              <a
                href="#contact"
                className="btn-primary inline-block"
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
