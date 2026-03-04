"use client";

import BackgroundTriangles from "@/components/BackgroundTriangles";
import { CountUp } from "@/components/CountUp";
import { countUpMetrics } from "@/lib/performance-data";

export default function PerformanceSection() {
  return (
    <section
      id="performance"
      className="section-wrapper bg-white relative"
    >
      <BackgroundTriangles pattern="serviceArea" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">実績</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="section-card section-card-pink">
            {/* リード文 */}
            <p className="text-[var(--color-ink-soft)] text-base md:text-lg leading-relaxed mb-8">
              地域に密着した訪問看護ステーションとして、着実に実績を積み重ねています。
            </p>

            {/* カウントアップカード */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              {countUpMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover-lift text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-logo-dark-green)] mb-1 heading-gothic">
                    <CountUp
                      end={metric.value}
                      suffix={metric.suffix}
                      duration={2000}
                    />
                  </div>
                  <div className="text-sm md:text-base font-bold text-[var(--color-ink)] mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)]">
                    {metric.description}
                  </div>
                </div>
              ))}
            </div>

            {/* エリア内訳 */}
            <div className="pt-6 border-t border-[var(--color-accent-pink)]">
              <h3 className="text-base md:text-lg font-bold text-[var(--color-ink)] mb-4 heading-gothic">
                エリア別ご利用者数
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { area: "船橋市", count: 27 },
                  { area: "習志野市", count: 22 },
                  { area: "八千代市", count: 15 },
                  { area: "千葉市", count: 1 },
                ].map(({ area, count }) => (
                  <div
                    key={area}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm"
                  >
                    <span className="text-sm font-medium text-[var(--color-ink)]">
                      {area}
                    </span>
                    <span className="text-base font-bold text-[var(--color-logo-dark-green)]">
                      {count}名
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--color-ink-soft)] mt-3">
                ※ 2026年2月末時点のアクティブご利用者数
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
