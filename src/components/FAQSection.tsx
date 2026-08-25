import React, { useState } from "react";
import { HelpCircle, ChevronDown, Scale } from "lucide-react";
import { Language } from "../types";
import { FREQUENTLY_ASKED_QUESTIONS } from "../data/legalData";
import { UI_TRANSLATIONS } from "../data/translations";

interface FAQSectionProps {
  language: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-10 max-w-[820px] mx-auto">
      <div className="text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[13px] font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Common Questions</span>
        </div>
        <h2 className="text-[28px] sm:text-[36px] font-bold text-white tracking-tight leading-[1.15]">
          {t.faqTitle}
        </h2>
        <p className="text-slate-400 text-[15px] sm:text-base max-w-xl mx-auto leading-relaxed">
          {t.faqSubtitle}
        </p>
      </div>

      <div className="space-y-3">
        {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
                isOpen
                  ? "bg-white/[0.04] border-amber-500/40"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-[-2px] rounded-xl"
              >
                <h3 className="font-semibold text-[15px] sm:text-base text-white leading-snug">
                  {language === "ur" ? faq.qUr : faq.qEn}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 space-y-3"
                >
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                    {language === "ur" ? faq.aUr : faq.aEn}
                  </p>
                  <div className="flex items-center gap-1.5 text-[13px] text-amber-400/90 font-medium pt-1 border-t border-white/10 mt-3">
                    <Scale className="w-3.5 h-3.5 shrink-0" />
                    <span>{faq.reference}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
