import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FlowStep } from "@/lib/station-content";

type Props = { flowSteps: FlowStep[] };

export default function StationFlow({ flowSteps }: Props) {
  return (
    <section className="section-wrapper bg-white relative">
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">ご利用開始までの流れ</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="section-card">
            <div className="grid grid-cols-1 gap-6">
              {flowSteps.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm w-full hover-lift border-l-4 border-[var(--color-logo-yellow)]">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-[var(--color-logo-yellow)] text-[var(--color-ink)] flex items-center justify-center text-xl font-bold shadow-md">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-gothic text-lg md:text-xl font-bold mb-2 md:mb-3 text-[var(--color-ink)]">
                          {step.title}
                        </h3>
                        <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index < flowSteps.length - 1 && (
                    <div className="flex justify-center py-3">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        className="text-[var(--color-ink)]"
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

            <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/services/for-care-managers/"
                className="group flex items-center justify-between p-4 md:p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div>
                  <span className="block text-sm text-[var(--color-muted)] mb-1">
                    ケアマネジャー様へ
                  </span>
                  <span className="heading-gothic font-bold text-[var(--color-ink)]">
                    ご依頼・連携について
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-ink)] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services/for-medical-institutions/"
                className="group flex items-center justify-between p-4 md:p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div>
                  <span className="block text-sm text-[var(--color-muted)] mb-1">
                    医療機関様へ
                  </span>
                  <span className="heading-gothic font-bold text-[var(--color-ink)]">
                    連携・ご紹介について
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-ink)] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
