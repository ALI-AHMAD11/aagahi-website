import React, { useState } from "react";
import {
  BookOpen,
  ShieldAlert,
  Lock,
  Home,
  Briefcase,
  CheckCircle2,
  PhoneCall,
  Check,
  XCircle,
  Clock,
} from "lucide-react";
import { Language, LegalGuide } from "../types";
import { STEP_BY_STEP_LEGAL_GUIDES } from "../data/legalData";
import { UI_TRANSLATIONS } from "../data/translations";

interface LegalGuidesSectionProps {
  language: Language;
}

export const LegalGuidesSection: React.FC<LegalGuidesSectionProps> = ({
  language,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<LegalGuide>(
    STEP_BY_STEP_LEGAL_GUIDES[0]
  );

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-400" />,
    Lock: <Lock className="w-5 h-5 text-sky-400" />,
    Home: <Home className="w-5 h-5 text-amber-400" />,
    Briefcase: <Briefcase className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div className="text-center space-y-4">

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/50 text-amber-400 shadow-lg text-sm font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Step-by-Step Practical Legal Guides</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          {t.legalGuidesTitle}
        </h2>

        <p className="text-slate-300 text-base max-w-2xl mx-auto">
          {t.legalGuidesDesc}
        </p>

      </div>

      {/* =========================================================
          GUIDE SELECTOR BOXES
          ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {STEP_BY_STEP_LEGAL_GUIDES.map((guide) => {

          const isSelected = selectedGuide.id === guide.id;

          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className={`
                text-left
                flex flex-col
                justify-between
                gap-4
                min-h-[170px]
                p-5
                rounded-2xl
                bg-slate-900
                border
                transition-all
                duration-200
                cursor-pointer
                shadow-lg

                ${
                  isSelected
                    ? "border-2 border-amber-500 bg-slate-900 shadow-lg shadow-amber-950/40"
                    : "border-slate-700 hover:border-amber-500/60 hover:bg-slate-800"
                }

                hover:-translate-y-1
              `}
            >

              <div className="flex items-center justify-between">

                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  {iconMap[guide.iconName] || (
                    <BookOpen className="w-5 h-5 text-amber-400" />
                  )}
                </div>

                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{guide.readTimeMin} min read</span>
                </span>

              </div>

              <div>

                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  {guide.category}
                </span>

                <h3
                  className={`font-bold text-sm mt-1 ${
                    isSelected ? "text-white" : "text-slate-200"
                  }`}
                >
                  {language === "ur"
                    ? guide.titleUr
                    : guide.titleEn}
                </h3>

              </div>

            </button>
          );
        })}

      </div>

      {/* =========================================================
          MAIN ACTIVE GUIDE BOX
          ========================================================= */}
      {selectedGuide && (
        <div
          className="
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            p-6
            sm:p-8
            space-y-7
            shadow-xl
            animate-fade-in
          "
        >

          {/* Guide Title & Summary */}
          <div className="space-y-2.5 pb-5 border-b border-slate-700">

            <div className="flex items-center gap-2">

              <span className="px-2.5 py-1 rounded bg-slate-800 text-amber-400 font-bold text-xs border border-amber-500/40">
                {selectedGuide.category}
              </span>

              <span className="text-xs text-slate-400">
                Practical Pakistan Citizen Guide
              </span>

            </div>

            <h3 className="text-2xl font-black text-white font-display">
              {language === "ur"
                ? selectedGuide.titleUr
                : selectedGuide.titleEn}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {language === "ur"
                ? selectedGuide.summaryUr
                : selectedGuide.summaryEn}
            </p>

          </div>

          {/* =====================================================
              STEP-BY-STEP BOXES
              ===================================================== */}
          <div className="space-y-4">

            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step-by-Step Procedure</span>
            </div>

            <div className="space-y-3">

              {selectedGuide.steps.map((step) => (

                <div
                  key={step.stepNumber}
                  className="
                    p-4
                    rounded-xl
                    bg-slate-950
                    border
                    border-slate-600
                    hover:border-slate-400
                    shadow-md
                    flex
                    items-start
                    gap-4
                    transition-colors
                  "
                >

                  {/* Step Number */}
                  <div
                    className="
                      w-8
                      h-8
                      rounded-xl
                      bg-slate-800
                      text-amber-400
                      font-black
                      text-sm
                      flex
                      items-center
                      justify-center
                      shrink-0
                      border
                      border-amber-500/50
                    "
                  >
                    {step.stepNumber}
                  </div>

                  {/* Step Content */}
                  <div className="space-y-1.5">

                    <h4 className="font-extrabold text-sm text-white">
                      {language === "ur"
                        ? step.titleUr
                        : step.titleEn}
                    </h4>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {language === "ur"
                        ? step.detailUr
                        : step.detailEn}
                    </p>

                    {step.legalNote && (
                      <div className="text-xs font-mono text-amber-400 pt-1">
                        ⚖️ Statutory Basis: {step.legalNote}
                      </div>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* =====================================================
              DO / DON'T BOXES
              ===================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* DO BOX */}
            <div
              className="
                p-4
                rounded-xl
                bg-emerald-950/50
                border
                border-emerald-700
                hover:border-emerald-500
                shadow-md
                space-y-2.5
                transition-colors
              "
            >

              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">

                <Check className="w-4 h-4 text-emerald-400" />

                <span>
                  Critical DOs (ضروری اقدامات)
                </span>

              </div>

              <ul className="space-y-1.5 text-sm text-emerald-100">

                {selectedGuide.criticalDoAndDonts.dos.map(
                  (item, idx) => (

                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >

                      <span className="text-emerald-400 font-bold">
                        ✓
                      </span>

                      <span>{item}</span>

                    </li>

                  )
                )}

              </ul>

            </div>

            {/* DON'T BOX */}
            <div
              className="
                p-4
                rounded-xl
                bg-rose-950/50
                border
                border-rose-700
                hover:border-rose-500
                shadow-md
                space-y-2.5
                transition-colors
              "
            >

              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">

                <XCircle className="w-4 h-4 text-rose-400" />

                <span>
                  Critical DON'Ts (کن چیزوں سے بچیں)
                </span>

              </div>

              <ul className="space-y-1.5 text-sm text-rose-100">

                {selectedGuide.criticalDoAndDonts.donts.map(
                  (item, idx) => (

                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >

                      <span className="text-rose-400 font-bold">
                        ✕
                      </span>

                      <span>{item}</span>

                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

          {/* =====================================================
              HELPLINE BOX
              ===================================================== */}
          {selectedGuide.helplines &&
            selectedGuide.helplines.length > 0 && (

              <div
                className="
                  p-4
                  rounded-xl
                  bg-slate-950
                  border
                  border-slate-600
                  hover:border-slate-400
                  shadow-md
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                  transition-colors
                "
              >

                <div className="flex items-center gap-2 text-sm font-bold text-slate-300">

                  <PhoneCall className="w-4 h-4 text-amber-400" />

                  <span>
                    Relevant Direct Helplines:
                  </span>

                </div>

                <div className="flex flex-wrap items-center gap-2">

                  {selectedGuide.helplines.map((hl, idx) => (

                    <a
                      key={idx}
                      href={`tel:${hl.number}`}
                      className="
                        px-3.5
                        py-2
                        rounded-lg
                        bg-rose-600
                        hover:bg-rose-500
                        text-white
                        font-bold
                        text-sm
                        flex
                        items-center
                        gap-1.5
                        shadow
                        transition-colors
                      "
                    >

                      <span>{hl.name}:</span>

                      <span className="text-amber-300">
                        {hl.number}
                      </span>

                    </a>

                  ))}

                </div>

              </div>

            )}

        </div>
      )}

    </section>
  );
};
