import React, { useState } from "react";
import { 
  BookOpen, 
  ShieldAlert, 
  Lock, 
  Home, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  ArrowRight, 
  Scale, 
  Check, 
  XCircle,
  Clock
} from "lucide-react";
import { Language, LegalGuide } from "../types";
import { STEP_BY_STEP_LEGAL_GUIDES } from "../data/legalData";
import { UI_TRANSLATIONS } from "../data/translations";

interface LegalGuidesSectionProps {
  language: Language;
}

export const LegalGuidesSection: React.FC<LegalGuidesSectionProps> = ({ language }) => {
  const [selectedGuide, setSelectedGuide] = useState<LegalGuide>(STEP_BY_STEP_LEGAL_GUIDES[0]);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-400" />,
    Lock: <Lock className="w-5 h-5 text-sky-400" />,
    Home: <Home className="w-5 h-5 text-amber-400" />,
    Briefcase: <Briefcase className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950 border border-yellow-400/50 text-yellow-300 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>Step-by-Step Practical Legal Guides</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.legalGuidesTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          {t.legalGuidesDesc}
        </p>
      </div>

      {/* Guide Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {STEP_BY_STEP_LEGAL_GUIDES.map((guide) => {
          const isSelected = selectedGuide.id === guide.id;
          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                isSelected
                  ? "bg-slate-900 border-2 border-amber-500 shadow-lg shadow-amber-950/40"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-slate-800">
                  {iconMap[guide.iconName] || <BookOpen className="w-5 h-5 text-amber-400" />}
                </div>
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{guide.readTimeMin} min read</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  {guide.category}
                </span>
                <h3 className={`font-bold text-xs sm:text-sm mt-0.5 ${isSelected ? "text-white" : "text-slate-200"}`}>
                  {language === "ur" ? guide.titleUr : guide.titleEn}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Guide Viewer */}
      {selectedGuide && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6 animate-fade-in">
          {/* Guide Title & Summary */}
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 font-bold text-xs border border-amber-800/50">
                {selectedGuide.category}
              </span>
              <span className="text-xs text-slate-400">• Practical Pakistan Citizen Guide</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {language === "ur" ? selectedGuide.titleUr : selectedGuide.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {language === "ur" ? selectedGuide.summaryUr : selectedGuide.summaryEn}
            </p>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step-by-Step Procedure</span>
            </div>
            <div className="space-y-3">
              {selectedGuide.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-900/80 text-amber-300 font-black text-sm flex items-center justify-center shrink-0 border border-amber-600/50">
                    {step.stepNumber}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white">
                      {language === "ur" ? step.titleUr : step.titleEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {language === "ur" ? step.detailUr : step.detailEn}
                    </p>
                    {step.legalNote && (
                      <div className="text-[11px] font-mono text-amber-400/90 pt-1">
                        ⚖️ Statutory Basis: {step.legalNote}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Dos and Don'ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DOs */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-2">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Critical DOs (ضروری اقدامات)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-100">
                {selectedGuide.criticalDoAndDonts.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'Ts */}
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 space-y-2">
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Critical DON'Ts (کن چیزوں سے بچیں)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-100">
                {selectedGuide.criticalDoAndDonts.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Helplines for this guide */}
          {selectedGuide.helplines && selectedGuide.helplines.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Relevant Direct Helplines:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedGuide.helplines.map((hl, idx) => (
                  <a
                    key={idx}
                    href={`tel:${hl.number}`}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span>{hl.name}:</span>
                    <span className="text-amber-300">{hl.number}</span>
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
