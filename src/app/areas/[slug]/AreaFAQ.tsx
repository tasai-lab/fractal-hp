"use client";

import { useState } from "react";
import BackgroundTriangles from "@/components/BackgroundTriangles";

type AreaFAQProps = {
  faqs: Array<{ question: string; answer: string }>;
  themeColor: string;
};

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 9l-7 7-7-7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AreaFAQ({ faqs, themeColor }: AreaFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  function toggleItem(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="faq" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title" style={{ color: themeColor }}>
            よくあるご質問
          </h2>
          <div className="section-title-line" style={{ background: themeColor }} />
        </div>

        <div className="section-content">
          <div className="section-card">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                      aria-expanded={isOpen}
                      aria-controls={`area-faq-panel-${index}`}
                    >
                      <span className="flex items-start gap-3 md:gap-4">
                        <span
                          className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full text-white flex items-center justify-center text-sm md:text-base font-bold"
                          style={{ backgroundColor: themeColor }}
                        >
                          Q
                        </span>
                        <span className="text-base md:text-lg font-bold text-[var(--color-foreground)] pt-1">
                          {faq.question}
                        </span>
                      </span>
                      <span className="flex-shrink-0 ml-4" style={{ color: themeColor }}>
                        <ChevronIcon isOpen={isOpen} />
                      </span>
                    </button>
                    <div
                      id={`area-faq-panel-${index}`}
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6">
                        <div className="flex items-start gap-3 md:gap-4 pt-2 border-t border-gray-100">
                          <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color-accent-pink)] text-[var(--color-primary)] flex items-center justify-center text-sm md:text-base font-bold mt-2">
                            A
                          </span>
                          <p className="text-sm md:text-base text-[var(--color-foreground)] leading-relaxed pt-3">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
