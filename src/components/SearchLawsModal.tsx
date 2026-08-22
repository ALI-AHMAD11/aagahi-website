import React, { useState } from "react";
import { 
  Search, 
  X, 
  BookOpen, 
  Scale, 
  FileText, 
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { Language } from "../types";
import { CONSTITUTIONAL_ARTICLES, PAKISTANI_STATUTES, STEP_BY_STEP_LEGAL_GUIDES } from "../data/legalData";

interface SearchLawsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectArticle?: (articleId: string) => void;
}

export const SearchLawsModal: React.FC<SearchLawsModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "constitution" | "statutes" | "guides">("all");

  if (!isOpen) return null;

  // Filter items
  const matchedArticles = CONSTITUTIONAL_ARTICLES.filter((a) =>
    a.articleNumber.toLowerCase().includes(query.toLowerCase()) ||
    a.titleEn.toLowerCase().includes(query.toLowerCase()) ||
    a.titleUr.includes(query) ||
    a.simpleExplanationEn.toLowerCase().includes(query.toLowerCase())
  );

  const matchedStatutes = PAKISTANI_STATUTES.filter((s) =>
    s.actNameEn.toLowerCase().includes(query.toLowerCase()) ||
    s.actNameUr.includes(query) ||
    s.shortCode.toLowerCase().includes(query.toLowerCase()) ||
    s.keySections.some((sec) => sec.sectionNumber.toLowerCase().includes(query.toLowerCase()) || sec.title.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedGuides = STEP_BY_STEP_LEGAL_GUIDES.filter((g) =>
    g.titleEn.toLowerCase().includes(query.toLowerCase()) ||
    g.titleUr.includes(query) ||
    g.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-600/70 rounded-2xl w-full max-w-3xl h-[80vh] flex flex-col text-white shadow-2xl overflow-hidden relative">
        {/* Search Header */}
        <div className="p-4 bg-slate-950 border-b border-amber-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-300" />
              <h3 className="font-extrabold text-base text-white">
                Search Pakistan Laws & Constitution
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Article (e.g. 'Article 10', 'Article 24'), PPC section, or keyword ('qabza', 'arrest', 'cyber')..."
              className="w-full bg-slate-900 text-white rounded-xl border border-slate-700 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-500"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Filter:</span>
            {[
              { id: "all", label: "All Records" },
              { id: "constitution", label: "Constitution 1973" },
              { id: "statutes", label: "Statutes (PPC/CrPC)" },
              { id: "guides", label: "Citizen Guides" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  filterType === f.id
                    ? "bg-amber-600 text-white font-bold"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Constitution Articles */}
          {(filterType === "all" || filterType === "constitution") && matchedArticles.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Constitutional Articles ({matchedArticles.length})</span>
              </div>
              <div className="space-y-2">
                {matchedArticles.map((art) => (
                  <div key={art.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-black text-xs border border-amber-800">
                        {art.articleNumber}
                      </span>
                      <span className="text-[10px] text-slate-400">Constitution 1973</span>
                    </div>
                    <div className="font-bold text-sm text-white">{art.titleEn}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{art.simpleExplanationEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Statutes */}
          {(filterType === "all" || filterType === "statutes") && matchedStatutes.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Statutory Acts & Codes ({matchedStatutes.length})</span>
              </div>
              <div className="space-y-2">
                {matchedStatutes.map((stat) => (
                  <div key={stat.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-amber-300">{stat.actNameEn}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{stat.shortCode}</span>
                    </div>
                    <div className="space-y-1 pt-1">
                      {stat.keySections.map((sec, idx) => (
                        <div key={idx} className="text-xs p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="font-bold text-amber-300">{sec.sectionNumber}: </span>
                          <span className="text-slate-200">{sec.title}</span>
                          <p className="text-[11px] text-slate-400 mt-0.5">{sec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guides */}
          {(filterType === "all" || filterType === "guides") && matchedGuides.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" />
                <span>Citizen Guides ({matchedGuides.length})</span>
              </div>
              <div className="space-y-2">
                {matchedGuides.map((guide) => (
                  <div key={guide.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-sm text-white">{guide.titleEn}</div>
                    <p className="text-xs text-slate-300">{guide.summaryEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedArticles.length === 0 && matchedStatutes.length === 0 && matchedGuides.length === 0 && (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-sm">No statutory records matching "{query}"</p>
              <p className="text-xs text-slate-500">Try searching for 'arrest', 'property', 'Article 9', or 'PECA'.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
