"use client";

import { useState } from "react";
import { serviceFAQs } from "@/lib/faq-data";
import BackgroundTriangles from "./BackgroundTriangles";

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-wrapper bg-white relative overflow-hidden">
      <BackgroundTriangles pattern="faq" />
      <div className="section-inner relative z-10">
        <div className="section-title-area">
          <h2 className="section-title">よくあるご質問</h2>
          <div className="section-title-line" />
        </div>

        <div className="section-content">
          <div className="section-card">
            <div className="space-y-4">
              {serviceFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={openIndex === index}
                  >
                    <span className="flex items-start gap-3 md:gap-4">
                      <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm md:text-base font-bold">
                        Q
                      </span>
                      <span className="text-base md:text-lg font-bold text-[var(--color-foreground)] pt-1">
                        {faq.question}
                      </span>
                    </span>
                    <span className="flex-shrink-0 ml-4 text-[var(--color-primary)]">
                      <ChevronIcon isOpen={openIndex === index} />
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
