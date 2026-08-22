import React, { useState, useEffect } from "react";
import { 
  Scale, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  ArrowRight, 
  PhoneCall, 
  Copy, 
  Check, 
  UserCheck, 
  Loader2,
  HelpCircle,
  FileCheck2,
  Flame,
  ShieldAlert,
  Home,
  Lock,
  Briefcase,
  Users,
  Car,
  ShoppingBag
} from "lucide-react";
import { Language, LegalProblemAnalysis, ViewTab } from "../types";
import { POPULAR_LEGAL_PROBLEMS } from "../data/legalData";
import { UI_TRANSLATIONS } from "../data/translations";

interface LegalProblemSolverProps {
  initialQuery?: string;
  language: Language;
  setCurrentTab: (tab: ViewTab) => void;
  openLawyerBookingWithCategory?: (category: string) => void;
  openAIAssistant?: () => void;
}

export const LegalProblemSolver: React.FC<LegalProblemSolverProps> = ({
  initialQuery = "",
  language,
  setCurrentTab,
  openLawyerBookingWithCategory,
  openAIAssistant,
}) => {
  const [problemText, setProblemText] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LegalProblemAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  useEffect(() => {
    if (initialQuery) {
      setProblemText(initialQuery);
      handleSolve(initialQuery);
    }
  }, [initialQuery]);

  const handleSolve = async (textToAnalyze?: string) => {
    const query = textToAnalyze || problemText;
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/solve-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemText: query,
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        setResult(data.result);
      } else {
        setError(data.error || "Could not analyze the legal query. Please try again.");
      }
    } catch (err: any) {
      setError("Network or server issue. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    "Criminal Law": <ShieldAlert className="w-4 h-4 text-rose-400" />,
    "Property Law": <Home className="w-4 h-4 text-amber-400" />,
    "Cyber Crime": <Lock className="w-4 h-4 text-sky-400" />,
    "Family Law": <Users className="w-4 h-4 text-amber-400" />,
    "Labour Law": <Briefcase className="w-4 h-4 text-amber-400" />,
    "Traffic / Civil": <Car className="w-4 h-4 text-blue-400" />,
    "Domestic Violence": <AlertTriangle className="w-4 h-4 text-rose-500" />,
    "Consumer Rights": <ShoppingBag className="w-4 h-4 text-amber-400" />,
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/50 border border-amber-500/40 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Legal Problem Solver</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Describe Your Situation in Plain Language
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Enter your problem in English or Urdu (اردو). Our legal intelligence system analyzes relevant Constitutional Articles, Pakistani statutes, and practical remedy steps.
        </p>
      </div>

      {/* Preset Problem Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {POPULAR_LEGAL_PROBLEMS.map((prob) => (
          <button
            key={prob.id}
            onClick={() => {
              setProblemText(prob.sampleQuery);
              handleSolve(prob.sampleQuery);
            }}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-500/60 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-amber-900/80 transition-colors">
                {categoryIcons[prob.category] || <Scale className="w-4 h-4 text-amber-400" />}
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                {prob.category}
              </span>
            </div>
            <div>
              <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
                {language === "ur" ? prob.titleUr : prob.titleEn}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                "{prob.sampleQuery}"
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-amber-900/60 shadow-xl space-y-4">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200">
          What legal issue are you facing in Pakistan?
        </label>
        <textarea
          rows={3}
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="e.g. Someone is threatening me on WhatsApp, or police arrested my relative without grounds, or tenant is refusing to vacate my house..."
          className="w-full bg-slate-950 text-white rounded-xl border border-slate-700 p-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-500"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
            <span>Under Constitution of Pakistan 1973 & Statutory Laws</span>
          </div>

          <button
            onClick={() => handleSolve()}
            disabled={loading || !problemText.trim()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-950/50 border border-white/70 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>Analyzing Pakistani Statutes...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analyze Legal Rights & Remedies</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-sm flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Analysis Result Card */}
      {result && (
        <div className="bg-slate-900 rounded-2xl border-2 border-amber-600/70 p-5 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
          {/* Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                AAGAHI Legal Intelligence Assessment
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {result.detectedCategory}
              </h3>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Statutory Match</span>
            </div>
          </div>

          {/* Plain Explanation */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Plain Language Summary</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {result.plainExplanation}
            </p>
          </div>

          {/* Constitutional Rights Guaranteed */}
          {result.constitutionalRights && result.constitutionalRights.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <Scale className="w-4 h-4" />
                <span>Relevant Constitutional Rights (Fundamental Rights)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.constitutionalRights.map((cr, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-amber-900/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-extrabold text-xs border border-amber-800/60">
                        {cr.article}
                      </span>
                      <span className="text-[10px] text-slate-400">Constitution 1973</span>
                    </div>
                    <div className="font-bold text-sm text-white">{cr.title}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{cr.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Governing Statutes & Sections */}
          {result.governingLaws && result.governingLaws.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <FileCheck2 className="w-4 h-4" />
                <span>Applicable Pakistani Statutory Laws & Sections</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.governingLaws.map((law, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-amber-900/40 space-y-1.5">
                    <div className="font-bold text-sm text-amber-300">{law.actName}</div>
                    <div className="text-xs font-semibold text-amber-300">Sections: {law.sections}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{law.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Action Plan */}
          {result.stepByStepActionPlan && result.stepByStepActionPlan.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Recommended Citizen Action Plan (What You Can Do Next)</span>
              </div>
              <div className="space-y-2">
                {result.stepByStepActionPlan.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-900/80 text-emerald-300 font-extrabold text-xs flex items-center justify-center shrink-0 border border-emerald-600/50">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-0.5">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Critical Precautions */}
          {result.criticalPrecautions && result.criticalPrecautions.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-2">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Important Precautions & Warnings</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-amber-100/90 list-disc list-inside">
                {result.criticalPrecautions.map((prec, idx) => (
                  <li key={idx}>{prec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Official Emergency & Reporting Contacts */}
          {result.officialHelplinesAndPortals && result.officialHelplinesAndPortals.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Official Helplines & Portals for this Problem</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {result.officialHelplinesAndPortals.map((hl, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-rose-900/40 flex items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-xs text-white">{hl.name}</div>
                      <div className="text-sm font-extrabold text-rose-400">{hl.number}</div>
                    </div>
                    <div className="flex gap-1">
                      <a
                        href={`tel:${hl.number}`}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                      <button
                        onClick={() => handleCopy(hl.number)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Copy Number"
                      >
                        {copiedNumber === hl.number ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* When to Hire a Lawyer */}
          <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>When You Should Consult an Advocate</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {result.whenToHireLawyer}
              </p>
            </div>
            <button
              onClick={() => {
                if (openLawyerBookingWithCategory) {
                  openLawyerBookingWithCategory(result.detectedCategory);
                } else {
                  setCurrentTab("lawyers");
                }
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shrink-0 transition-transform hover:scale-105"
            >
              <span>Connect with Advocate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visible Legal Disclaimer */}
          <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-800">
            <span className="font-semibold text-slate-300">Statutory Notice: </span>
            {result.disclaimer}
          </div>

          {/* Clear hand-off to the separate live chat tool — this analysis above is a
              one-time structured report; the button below opens a different, ongoing
              conversation for follow-up questions. Making that distinction explicit
              here prevents users from confusing the two tools. */}
          {openAIAssistant && (
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-dashed border-slate-700">
              <p className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
                <span className="font-bold text-white">Still have questions about your specific situation?</span>{" "}
                This report is a one-time analysis — for a back-and-forth conversation, chat live with the AAGAHI AI Assistant.
              </p>
              <button
                onClick={openAIAssistant}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0 transition-transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Chat with AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
