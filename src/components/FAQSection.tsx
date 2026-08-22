import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Scale } from "lucide-react";
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950 border border-yellow-400/50 text-yellow-300 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>Statutory Clarifications</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.faqTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          {t.faqSubtitle}
        </p>
      </div>

      <div className="space-y-3">
        {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-950/40"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      {language === "ur" ? faq.qUr : faq.qEn}
                    </h3>
                  </div>
                </div>

                <div className="text-slate-400">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-3 animate-fade-in">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {language === "ur" ? faq.aUr : faq.aEn}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold pt-1">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Statutory Citation: {faq.reference}</span>
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
