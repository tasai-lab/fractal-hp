"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/faq-data";

type Props = {
  faqs: FAQItem[];
  className?: string;
};

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function RecruitFAQ({ faqs, className = "" }: Props) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-white/80 ${className}`}>
      <p className="text-xs tracking-[0.3em] text-ink-soft">FAQ</p>
      <h3 className="heading-mincho text-2xl md:text-4xl text-[var(--color-olive)] mt-3">
        よくある質問
      </h3>
      <div className="space-y-3 mt-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="border border-[var(--color-sand)] rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 md:px-6 py-4 text-left bg-white/70 hover:bg-white transition-colors flex items-center justify-between gap-3"
            >
              <span className="font-medium text-[var(--color-olive)]">
                {faq.question}
              </span>
              <span
                className={`text-[var(--color-olive)] transition-transform duration-300 flex-shrink-0 ${
                  openFAQIndex === index ? "rotate-180" : ""
                }`}
              >
                <ChevronDown />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openFAQIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-4 md:px-6 py-4 bg-white">
                <p className="text-ink-soft text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
