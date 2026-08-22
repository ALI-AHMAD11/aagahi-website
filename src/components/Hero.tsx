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
  UserCheck, 
  User,
  Compass,
  Gavel,
  ShieldCheck,
  Award
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
    { label: "Khula & Child Custody", query: "How do I file for Khula and obtain child maintenance in Family Court?" },
  ];

  return (
    <div className="relative overflow-hidden text-white -mt-24 pt-40 sm:pt-44 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-950/60 min-h-[680px] flex flex-col justify-center">
      {/* Dynamic Video Background (Court Gavel & Law Library) */}
      <VideoHeroBackground overlayOpacity={45} />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
        {/* Civic & Creator Badges with Motion Stagger */}
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <motion.div 
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-amber-500/50 text-amber-300 text-xs font-semibold shadow-xl backdrop-blur-md"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span>Constitution of Pakistan (1973)</span>
            <span className="text-amber-400 font-bold hidden sm:inline">• Official Legal Diagnostic</span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-amber-500/50 text-amber-300 text-xs font-bold shadow-xl backdrop-blur-md"
          >
            <img 
              src={creatorPhoto} 
              alt="Ali Ahmad"
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded-full object-cover border border-amber-400/80 shadow"
            />
            <span>Created by <span className="text-white underline decoration-amber-400 font-black">Ali Ahmad</span></span>
          </motion.div>
        </motion.div>

        {/* Main Headline & Urdu Pairings with Motion */}
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
          <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed drop-shadow mt-2">
            {t.heroDesc}
          </p>
        </motion.div>

        {/* Interactive Search Bar with Motion */}
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

          {/* Quick-Access Example Pills */}
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

        {/* Primary Action Buttons */}
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
            className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-rose-950/70 border border-rose-400/50 transition-all cursor-pointer animate-subtle-pulse"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t.emergencyHelpBtn} (15 / 1122)</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentTab("lawyers")}
            className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 backdrop-blur-md transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>{t.findLawyerBtn}</span>
          </motion.button>
        </motion.div>

        {/* Animated Hero Journey Visual Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6"
        >
          <div className="bg-slate-950/85 backdrop-blur-md rounded-2xl p-5 border border-amber-900/70 shadow-2xl max-w-4xl mx-auto">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>AAGAHI Civic Journey: From Problem to Resolution</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center relative">
              {/* Step 1 */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.03 }}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center gap-1.5 group hover:border-amber-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 font-bold text-xs">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white">1. Citizen</span>
                <span className="text-[9px] text-slate-400">Needs Help</span>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.03 }}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center gap-1.5 group hover:border-amber-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white">2. Legal Problem</span>
                <span className="text-[9px] text-slate-400">Arrest, Qabza, Cyber</span>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.05 }}
                className="p-2.5 rounded-xl bg-amber-950/90 border border-amber-500/70 flex flex-col items-center justify-center gap-1.5 shadow-md shadow-amber-950/50"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-800 border border-amber-400 flex items-center justify-center text-amber-300 font-bold text-xs">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-amber-300">3. AAGAHI</span>
                <span className="text-[9px] text-amber-400 font-medium">Awareness Engine</span>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.03 }}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center gap-1.5 group hover:border-amber-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 font-bold text-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white">4. Constitution & Laws</span>
                <span className="text-[9px] text-slate-400">Articles & PPC Sections</span>
              </motion.div>

              {/* Step 5 */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.03 }}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center gap-1.5 group hover:border-sky-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-700/50 flex items-center justify-center text-sky-400 font-bold text-xs">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white">5. Advocate / Help</span>
                <span className="text-[9px] text-slate-400">Bar Verified Counsel</span>
              </motion.div>

              {/* Step 6 */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.03 }}
                className="p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-600/70 flex flex-col items-center justify-center gap-1.5"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-700 border border-emerald-300 flex items-center justify-center text-white font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-emerald-300">6. Justice & Relief</span>
                <span className="text-[9px] text-slate-300">Rights Protected</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Real-time Verified Counters */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-2"
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
  );
};
