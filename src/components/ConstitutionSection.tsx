import React, { useState } from "react";
import { 
  BookOpen, 
  Scale, 
  Shield, 
  Lock, 
  Home, 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  ExternalLink, 
  X,
  Share2
} from "lucide-react";
import { ConstitutionalArticle, Language } from "../types";
import { CONSTITUTIONAL_ARTICLES } from "../data/legalData";
import { UI_TRANSLATIONS } from "../data/translations";

interface ConstitutionSectionProps {
  language: Language;
  savedArticleIds: string[];
  toggleSaveArticle: (articleId: string) => void;
}

export const ConstitutionSection: React.FC<ConstitutionSectionProps> = ({
  language,
  savedArticleIds,
  toggleSaveArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalArticle, setActiveModalArticle] = useState<ConstitutionalArticle | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const categories = [
    { id: "all", label: t.allCategories },
    { id: "liberty", label: t.libertyCat },
    { id: "fair-trial", label: t.fairTrialCat },
    { id: "property", label: t.propertyCat },
    { id: "dignity", label: t.dignityCat },
    { id: "speech", label: t.speechCat },
    { id: "equality", label: t.equalityCat },
  ];

  const filteredArticles = selectedCategory === "all"
    ? CONSTITUTIONAL_ARTICLES
    : CONSTITUTIONAL_ARTICLES.filter((a) => a.category === selectedCategory);

  const handleShare = (article: ConstitutionalArticle) => {
    const text = `Pakistani Constitutional Right: ${article.articleNumber} - ${article.titleEn}\n${article.simpleExplanationEn}\nLearn more on AAGAHI (aagahi.pk)`;
    if (navigator.share) {
      navigator.share({ title: article.articleNumber, text });
    } else {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-yellow-400/50 text-yellow-300 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>Constitution of the Islamic Republic of Pakistan (1973)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.constitutionalSectionTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          {t.constitutionalSectionDesc}
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? "bg-amber-600 text-white shadow-md shadow-amber-950/50 border border-amber-400"
                : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((article) => {
          const isSaved = savedArticleIds.includes(article.id);
          return (
            <div
              key={article.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/60 p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 font-black text-xs border border-amber-700/50">
                      {article.articleNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      Fundamental Right
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSaveArticle(article.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved
                        ? "bg-amber-950 text-amber-300 border-amber-600"
                        : "bg-slate-800/80 text-slate-400 hover:text-white border-slate-700"
                    }`}
                    title={isSaved ? "Saved in Dashboard" : "Save Article"}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                    {language === "ur" ? article.titleUr : article.titleEn}
                  </h3>
                  {language !== "ur" && (
                    <div className="text-xs text-amber-300/80 font-urdu mt-0.5">
                      {article.titleUr}
                    </div>
                  )}
                </div>

                {/* Plain Explanation */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {language === "ur"
                    ? article.simpleExplanationUr
                    : language === "roman"
                    ? article.simpleExplanationRoman
                    : article.simpleExplanationEn}
                </p>

                {/* Who It Protects badge */}
                <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="line-clamp-1">Protects: {article.whoItProtects}</span>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalArticle(article)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:underline"
                >
                  <span>Learn More & Statutory Source</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <span className="text-[10px] text-slate-500 font-mono">1973 Const.</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Article Detail Modal */}
      {activeModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-600/70 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 pr-8">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-amber-950 text-amber-300 font-black text-sm border border-amber-700/60">
                  {activeModalArticle.articleNumber}
                </span>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Constitution of Pakistan (1973)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white pt-1">
                {activeModalArticle.titleEn}
              </h2>
              <div className="text-base text-amber-300 font-urdu font-bold">
                {activeModalArticle.titleUr}
              </div>
            </div>

            {/* Official Constitutional Clause */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/60 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Constitutional Text</span>
              </div>
              <blockquote className="text-xs sm:text-sm text-slate-200 font-serif italic leading-relaxed">
                "{activeModalArticle.clauseText}"
              </blockquote>
            </div>

            {/* Plain Citizen Explanation */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                What This Means in Everyday Life
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {activeModalArticle.simpleExplanationEn}
              </p>
              <div className="text-sm text-slate-300 font-urdu pt-1 leading-relaxed">
                {activeModalArticle.simpleExplanationUr}
              </div>
            </div>

            {/* Real-Life Practical Application in Pakistan */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Practical Pakistan Application / Example</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeModalArticle.practicalExampleEn}
              </p>
              <div className="text-xs text-slate-400 font-urdu">
                {activeModalArticle.practicalExampleUr}
              </div>
            </div>

            {/* Source Reference */}
            <div className="text-xs text-slate-400 border-t border-slate-800 pt-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-slate-300">Authoritative Source: </span>
                {activeModalArticle.officialSource}
              </div>
              <button
                onClick={() => handleShare(activeModalArticle)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1"
              >
                <Share2 className="w-3 h-3 text-amber-400" />
                <span>{copiedShare ? "Link Copied!" : "Share Right"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
