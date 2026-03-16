import { features } from "@/lib/data";
import { FeatureIcon } from "@/components/Features";

export default function StationFeatures() {
  return (
    <section className="section-wrapper bg-white relative">
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title heading-gothic">フラクタルの特徴</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="section-card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm p-5 hover-lift border border-transparent hover:border-[var(--color-logo-yellow)] transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 md:mb-4 p-3 md:p-4 bg-[var(--color-logo-yellow)]/20 rounded-full">
                      <FeatureIcon icon={feature.icon} />
                    </div>

                    <h3 className="heading-gothic text-base md:text-lg font-bold mb-2 text-[var(--color-logo-dark-green)]">
                      {feature.title}
                    </h3>

                    <p className="text-sm mb-2 whitespace-pre-line leading-relaxed text-[var(--color-ink)]">
                      {feature.description}
                    </p>

                    {feature.note && (
                      <p className="text-xs text-[var(--color-muted)] whitespace-pre-line leading-relaxed">
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
