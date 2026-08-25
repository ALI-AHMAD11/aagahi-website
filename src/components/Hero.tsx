import React, { useState, useEffect } from "react";
import { 
  Search, 
  ShieldAlert, 
  Scale, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  UserCheck
} from "lucide-react";
import { motion } from "motion/react";
import { Language, ViewTab } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";
import { VideoHeroBackground } from "./VideoHeroBackground";

interface HeroProps {
  language: Language;
  onSearchSubmit: (query: string) => void;
  setCurrentTab: (tab: ViewTab) => void;
  openEmergencyModal: () => void;
}

const journeySteps = [
  { icon: Users, label: "1. Citizen", sub: "Needs Help", tone: "amber" },
  { icon: ShieldAlert, label: "2. Legal Problem", sub: "Arrest, Qabza, Cyber", tone: "amber" },
  { icon: Scale, label: "3. AAGAHI", sub: "Awareness Engine", tone: "amberStrong" },
  { icon: BookOpen, label: "4. Constitution & Laws", sub: "Articles & PPC Sections", tone: "amber" },
  { icon: UserCheck, label: "5. Advocate / Help", sub: "Bar Verified Counsel", tone: "sky" },
  { icon: CheckCircle2, label: "6. Justice & Relief", sub: "Rights Protected", tone: "emerald" },
];

export const Hero: React.FC<HeroProps> = ({
  language,
  onSearchSubmit,
  setCurrentTab,
  openEmergencyModal,
}) => {
  const [query, setQuery] = useState("");
  const [creatorPhoto, setCreatorPhoto] = useState<string>("/ali-ahmad.jpg");
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  useEffect(() => {
    const saved = localStorage.getItem("aagahi_creator_photo");
    if (saved) setCreatorPhoto(saved);

    const handlePhotoUpdate = () => {
      const updated = localStorage.getItem("aagahi_creator_photo");
      if (updated) setCreatorPhoto(updated);
    };

    window.addEventListener("creator_photo_updated", handlePhotoUpdate);
    return () => window.removeEventListener("creator_photo_updated", handlePhotoUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query);
    }
  };

  const sampleQueries = [
    { label: "Illegal Police Detention", query: "Police arrested me without telling grounds or showing FIR." },
    { label: "Plot / Land Qabza", query: "Someone has illegally occupied my residential plot in Lahore." },
    { label: "WhatsApp Blackmail (PECA)", query: "Someone is blackmailing me on WhatsApp with private pictures." },
    { label: "Unpaid Salary & Dues", query: "My employer withheld three months of salary after firing me." },
  ];

  return (
    <>
      {/* ============================= HERO ============================= */}
      <div className="relative overflow-hidden text-white -mt-24 pt-40 sm:pt-44 pb-20 px-4 sm:px-6 lg:px-8 border-b border-amber-950/60 min-h-[620px] flex flex-col justify-center">
        <VideoHeroBackground overlayOpacity={45} />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Single trust badge */}
          <motion.div 
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-amber-500/50 text-amber-300 text-xs font-semibold shadow-xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Constitution of Pakistan (1973)</span>
              <span className="text-amber-400 font-bold hidden sm:inline">• Official Legal Diagnostic</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-amber-500/50 text-amber-300 text-xs font-bold shadow-xl backdrop-blur-md">
              <img 
                src={creatorPhoto} 
                alt="Ali Ahmad"
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover border border-amber-400/80 shadow"
              />
              <span>Created by <span className="text-white underline decoration-amber-400 font-black">Ali Ahmad</span></span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="space-y-5"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-white leading-[1.08] drop-shadow-md">
              Know Your Rights.{" "}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-300">
                Find Your Way.
              </span>{" "}
              Get Legal Help.
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-amber-300 font-urdu tracking-normal drop-shadow mt-2 sm:mt-3">
              آپ کا حق، آپ کی آگاہی — پاکستانی شہریوں کے لیے فوری اور آسان قانونی رہنمائی
            </p>
            <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed drop-shadow mt-2">
              {t.heroDesc}
            </p>
          </motion.div>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <form 
              onSubmit={handleSubmit}
              className="relative flex items-center bg-slate-950/95 rounded-2xl border-2 border-amber-500/80 p-1.5 shadow-2xl shadow-amber-950/80 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-500/30 backdrop-blur-md transition-all"
            >
              <div className="pl-3.5 pr-2 text-amber-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none py-2 px-1"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-950/60 border border-white/70 transition-all shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{t.solveProblemBtn}</span>
              </motion.button>
            </form>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs">
              <span className="text-slate-300 font-medium mr-1 text-[11px] drop-shadow">Popular Scenarios:</span>
              {sampleQueries.map((item, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setQuery(item.query);
                    onSearchSubmit(item.query);
                  }}
                  className="px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-amber-900/90 text-slate-200 hover:text-white border border-slate-700/90 hover:border-amber-400/70 backdrop-blur-sm transition-all text-[11px] font-medium cursor-pointer shadow-sm"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 2 primary CTAs only */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentTab("solver")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-amber-900/60 border border-white/70 transition-all cursor-pointer"
            >
              <Scale className="w-4 h-4 text-slate-950" />
              <span>{t.getLegalHelpBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={openEmergencyModal}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-rose-950/70 border border-rose-400/50 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t.emergencyHelpBtn} (15 / 1122)</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4"
          >
            <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-white">142,000+</div>
              <div className="text-xs text-slate-400 font-medium">Citizens Guided</div>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400">280 Articles</div>
              <div className="text-xs text-slate-400 font-medium">Constitution Indexed</div>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">340+ Advocates</div>
              <div className="text-xs text-slate-400 font-medium">Verified Bar Members</div>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-rose-400">100% Free</div>
              <div className="text-xs text-slate-400 font-medium">Public Civic Service</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===================== CIVIC JOURNEY (its own section) ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-white">
            From Problem to Resolution
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            The path every citizen takes through AAGAHI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-900/60 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-lg"
        >
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const toneClasses = {
                amber: "bg-amber-950 border-amber-700/50 text-amber-400",
                amberStrong: "bg-amber-800 border-amber-400 text-amber-300",
                sky: "bg-sky-950 border-sky-700/50 text-sky-400",
                emerald: "bg-emerald-700 border-emerald-300 text-white",
              }[step.tone];
              const cardClasses = step.tone === "amberStrong"
                ? "bg-amber-950/90 border-amber-500/70 shadow-md shadow-amber-950/50"
                : step.tone === "emerald"
                ? "bg-emerald-900/60 border-emerald-600/70"
                : "bg-slate-950/60 border-slate-800 hover:border-amber-500/60";

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors ${cardClasses}`}
                >
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${toneClasses}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white">{step.label}</span>
                  <span className="text-[9px] text-slate-400">{step.sub}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </>
  );
};
