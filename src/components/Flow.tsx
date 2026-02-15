import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
            <div className="grid grid-cols-1 gap-6">
              {flowSteps.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center">
                  {/* ステップカード - 白背景 */}
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm w-full hover-lift border-l-4 border-[var(--color-accent-pink)]">
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* ステップ番号バッジ */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-primary flex items-center justify-center text-2xl md:text-3xl font-bold shadow-md">
                          {step.step}
                        </div>
                      </div>

                      {/* コンテンツ */}
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                          {step.title}
                        </h3>
                        <p className="text-foreground leading-relaxed text-base md:text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 矢印（最後のステップ以外）- 均等配置 */}
                  {index < flowSteps.length - 1 && (
                    <div className="flex justify-center py-3">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        className="text-primary"
                      >
                        <path
                          d="M20 5 L20 30 M20 30 L10 22 M20 30 L30 22"
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

            {/* 医療機関・ケアマネ向けリンク */}
            <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/for-care-managers"
                className="group flex items-center justify-between p-4 md:p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div>
                  <span className="block text-sm text-gray-500 mb-1">ケアマネージャー様へ</span>
                  <span className="font-bold text-[var(--color-primary)]">ご依頼・連携について</span>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/for-medical-institutions"
                className="group flex items-center justify-between p-4 md:p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div>
                  <span className="block text-sm text-gray-500 mb-1">医療機関様へ</span>
                  <span className="font-bold text-[var(--color-primary)]">連携・ご紹介について</span>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
