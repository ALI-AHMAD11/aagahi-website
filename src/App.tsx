import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LegalProblemSolver } from "./components/LegalProblemSolver";
import { ConstitutionSection } from "./components/ConstitutionSection";
import { EmergencyContactsSection } from "./components/EmergencyContactsSection";
import { FindLawyerSection } from "./components/FindLawyerSection";
import { LegalGuidesSection } from "./components/LegalGuidesSection";
import { Dashboards } from "./components/Dashboards";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { AIAssistantModal } from "./components/AIAssistantModal";
import { SearchLawsModal } from "./components/SearchLawsModal";
import { FloatingEmergency } from "./components/FloatingEmergency";
import { AboutCreatorSection } from "./components/AboutCreatorSection";
import { Appointment, Language, ViewTab } from "./types";
import { UI_TRANSLATIONS } from "./data/translations";
import {
  Scale,
  ShieldAlert,
  BookOpen,
  UserCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  FileText,
  HelpCircle,
  PhoneCall,
  Bookmark
} from "lucide-react";

// Reusable scroll-reveal variants for staggered grid entrances (Pillars, How-It-Works steps).
// Purely additive — does not alter any existing hover/tap/click behavior on the items.
const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const staggerItemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// A small courtroom-themed scroll divider: a scales-of-justice icon that "settles" into
// balance as it enters the viewport, with a thin line drawing outward like a gavel strike.
// Insert this between sections wherever a visual breath/transition is wanted.
const CourtroomScrollDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-4 py-2 select-none" aria-hidden="true">
    <motion.span
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-700/70 origin-right"
    />
    <motion.div
      initial={{ opacity: 0, rotate: -18, y: -6 }}
      whileInView={{ opacity: 1, rotate: 0, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="w-9 h-9 rounded-full bg-slate-900 border border-amber-700/60 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-950/40"
    >
      <Scale className="w-4 h-4" />
    </motion.div>
    <motion.span
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-700/70 origin-left"
    />
  </div>
);

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>("home");
  const [language, setLanguage] = useState<Language>("en");

  // Secondary sub-tab states within organized pages
  const [page2SubTab, setPage2SubTab] = useState<"rights" | "guides">("rights");
  const [page3SubTab, setPage3SubTab] = useState<"directory" | "faqs">("directory");

  // Solver query & preset lawyer filters
  const [solverQuery, setSolverQuery] = useState<string>("");
  const [presetLawyerCategory, setPresetLawyerCategory] = useState<string>("");

  // Modals state
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Saved Articles & Appointments state (persisted to localStorage)
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("aagahi_saved_articles");
      return saved ? JSON.parse(saved) : ["art-9", "art-10", "art-24"];
    } catch {
      return ["art-9", "art-10", "art-24"];
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem("aagahi_appointments");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "AAG-2026-4891",
              lawyerId: "lawyer-1",
              lawyerName: "Adv. Tariq Mahmood Chaudhry",
              citizenName: "Ahmed Khan",
              citizenPhone: "0300-1234567",
              citizenEmail: "ahmed@example.pk",
              caseCategory: "Property Law",
              caseDescription: "Illegal dispossession inquiry regarding residential plot in Lahore.",
              date: "2026-08-25",
              timeSlot: "11:00 AM",
              consultationType: "video",
              status: "confirmed",
              createdAt: "2026-08-21T07:00:00.000Z",
            },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("aagahi_saved_articles", JSON.stringify(savedArticleIds));
    } catch {}
  }, [savedArticleIds]);

  useEffect(() => {
    try {
      localStorage.setItem("aagahi_appointments", JSON.stringify(appointments));
    } catch {}
  }, [appointments]);

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleAppointmentBooked = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleHeroSearch = (query: string) => {
    setSolverQuery(query);
    setCurrentTab("home");
    window.scrollTo({ top: 520, behavior: "smooth" });
  };

  const handleOpenLawyerWithCategory = (category: string) => {
    setPresetLawyerCategory(category);
    setCurrentTab("lawyers");
    setPage3SubTab("directory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const navigateToTab = (tab: ViewTab) => {
    if (tab === "solver") {
      setCurrentTab("home");
      window.scrollTo({ top: 520, behavior: "smooth" });
    } else if (tab === "guides") {
      setCurrentTab("constitution");
      setPage2SubTab("guides");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentTab(tab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-950 text-slate-100 ${language === "ur" ? "rtl font-sans" : "ltr font-sans"}`}>
      {/* Top Modern Sticky Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={navigateToTab}
        language={language}
        setLanguage={setLanguage}
        openEmergencyModal={() => {
          setCurrentTab("emergency");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        openSearchLawsModal={() => setIsSearchModalOpen(true)}
        openAIAssistant={() => setIsAIAssistantOpen(true)}
        appointmentsCount={appointments.length}
      />

      {/* Main Content Area with Smooth Tab Transitions */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* PAGE 1: HOME & LEGAL AI PROBLEM SOLVER                                   */}
          {/* ========================================================================= */}
          {currentTab === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-16"
            >
              {/* 1. Video Hero Section (Gavel & Law Library with Creator Ali Ahmad) */}
              <Hero
                language={language}
                onSearchSubmit={handleHeroSearch}
                setCurrentTab={navigateToTab}
                openEmergencyModal={() => {
                  setCurrentTab("emergency");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* 2. Interactive Navigation Bento: 4 Core Pillars */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-2 mb-8"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 font-semibold">
                    <Compass className="w-3.5 h-3.5 text-amber-300" />
                    <span>The 4 Core Pillars of AAGAHI</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Navigate Pakistani Justice & Rights
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                    Instant statutory answers, procedural walkthroughs, emergency dispatch, and bar-certified advocate bookings.
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {/* Pillar 1 */}
                  <motion.div
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTab("home");
                      window.scrollTo({ top: 560, behavior: "smooth" });
                    }}
                    className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/80 p-5 shadow-lg flex flex-col justify-between cursor-pointer group transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                          1. AI Problem Solver
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Instant legal diagnosis with relevant Constitutional Articles & PPC sections.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-1 text-xs font-bold text-amber-400">
                      <span>Run Legal Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>

                  {/* Pillar 2 */}
                  <motion.div
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTab("constitution");
                      setPage2SubTab("rights");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/80 p-5 shadow-lg flex flex-col justify-between cursor-pointer group transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                          2. Rights & Guides
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Articles 4, 9, 10, 14, 24, 25 and practical FIR/police citizen walkthroughs.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-1 text-xs font-bold text-amber-400">
                      <span>Explore 280+ Articles</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>

                  {/* Pillar 3 */}
                  <motion.div
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTab("lawyers");
                      setPage3SubTab("directory");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-sky-500/80 p-5 shadow-lg flex flex-col justify-between cursor-pointer group transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-700/50 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shadow-inner">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-white group-hover:text-sky-300 transition-colors">
                          3. Verified Advocates
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          High Court & Supreme Court licensed lawyers across Lahore, Karachi, Islamabad.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-1 text-xs font-bold text-sky-400">
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>

                  {/* Pillar 4 */}
                  <motion.div
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTab("emergency");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-rose-500/80 p-5 shadow-lg flex flex-col justify-between cursor-pointer group transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-700/50 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform shadow-inner">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-white group-hover:text-rose-300 transition-colors">
                          4. Emergency Helplines
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          1-Click dial: Police 15, Rescue 1122, FIA 1991, MoHR 1099, PCSW 1043.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-1 text-xs font-bold text-rose-400">
                      <span>Direct Call Directory</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </motion.div>
              </section>

              <CourtroomScrollDivider />

              {/* 3. Embedded Live Legal Problem Solver */}
              <div id="solver-section" className="border-t border-slate-800/80 pt-8">
                <LegalProblemSolver
                  initialQuery={solverQuery}
                  language={language}
                  setCurrentTab={navigateToTab}
                  openLawyerBookingWithCategory={handleOpenLawyerWithCategory}
                  openAIAssistant={() => setIsAIAssistantOpen(true)}
                />
              </div>

              {/* 4. How AAGAHI Works Process */}
              <section className="bg-slate-900/80 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
                <div className="max-w-6xl mx-auto space-y-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-3"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-600/40 text-xs font-semibold text-amber-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Simple & Transparent Process</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                      {t.howItWorksTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
                      {t.howItWorksSubtitle}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {/* Step 1 */}
                    <motion.div 
                      variants={staggerItemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative group hover:border-amber-500/60 transition-colors shadow-lg"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-300 font-black text-lg flex items-center justify-center border border-amber-700/60 shadow">
                        1
                      </div>
                      <h3 className="font-extrabold text-base text-white">{t.step1Title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.step1Desc}</p>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div 
                      variants={staggerItemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative group hover:border-amber-500/60 transition-colors shadow-lg"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-300 font-black text-lg flex items-center justify-center border border-amber-700/60 shadow">
                        2
                      </div>
                      <h3 className="font-extrabold text-base text-white">{t.step2Title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.step2Desc}</p>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div 
                      variants={staggerItemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative group hover:border-amber-500/60 transition-colors shadow-lg"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-300 font-black text-lg flex items-center justify-center border border-amber-700/60 shadow">
                        3
                      </div>
                      <h3 className="font-extrabold text-base text-white">{t.step3Title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.step3Desc}</p>
                    </motion.div>

                    {/* Step 4 */}
                    <motion.div 
                      variants={staggerItemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative group hover:border-sky-500/60 transition-colors shadow-lg"
                    >
                      <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-300 font-black text-lg flex items-center justify-center border border-sky-700/60 shadow">
                        4
                      </div>
                      <h3 className="font-extrabold text-base text-white">{t.step4Title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.step4Desc}</p>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <CourtroomScrollDivider />

              {/* 5. Creator Spotlight: Ali Ahmad & Vision for Pakistan */}
              <AboutCreatorSection language={language} />
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 2: CONSTITUTIONAL RIGHTS & CITIZEN GUIDES                           */}
          {/* ========================================================================= */}
          {currentTab === "constitution" && (
            <motion.div
              key="constitution-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-8 pb-16"
            >
              {/* Page Header & Sub-Tab Switcher */}
              <div className="bg-slate-900 border-b border-amber-950/80 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                    <span>Constitutional Literacy & Step-by-Step Guides</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white">
                    Fundamental Rights & Practical Citizen Walkthroughs
                  </h1>
                  <p className="text-slate-300 text-sm max-w-2xl mx-auto">
                    Understand your supreme constitutional protections under the 1973 Constitution alongside official procedural guides for police, cybercrime, and property disputes.
                  </p>

                  {/* Sub-Tabs Selector */}
                  <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPage2SubTab("rights")}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        page2SubTab === "rights"
                          ? "bg-amber-600 text-white shadow-md shadow-amber-950/60"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Scale className="w-4 h-4 text-amber-300" />
                      <span>Constitutional Fundamental Rights</span>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPage2SubTab("guides")}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        page2SubTab === "guides"
                          ? "bg-amber-600 text-white shadow-md shadow-amber-950/60"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <FileText className="w-4 h-4 text-amber-300" />
                      <span>Practical Legal Guides & FIR Procedures</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Sub-view Content with Animated Transitions */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                  {page2SubTab === "rights" ? (
                    <motion.div
                      key="rights-subview"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ConstitutionSection
                        language={language}
                        savedArticleIds={savedArticleIds}
                        toggleSaveArticle={toggleSaveArticle}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="guides-subview"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <LegalGuidesSection language={language} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 3: VERIFIED ADVOCATES & LEGAL FAQS                                  */}
          {/* ========================================================================= */}
          {currentTab === "lawyers" && (
            <motion.div
              key="lawyers-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-8 pb-16"
            >
              {/* Page Header & Sub-Tab Switcher */}
              <div className="bg-slate-900 border-b border-sky-950/80 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950 border border-sky-500/40 text-sky-300 text-xs font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                    <span>Bar Council Verified Advocates & Court FAQ</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white">
                    Connect with Qualified Advocates Across Pakistan
                  </h1>
                  <p className="text-slate-300 text-sm max-w-2xl mx-auto">
                    Book confidential appointments with licensed High Court & Supreme Court advocates or browse authoritative statutory FAQs.
                  </p>

                  {/* Sub-Tabs Selector */}
                  <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPage3SubTab("directory")}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        page3SubTab === "directory"
                          ? "bg-sky-600 text-white shadow-md shadow-sky-950/60"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Find an Advocate & Book</span>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPage3SubTab("faqs")}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        page3SubTab === "faqs"
                          ? "bg-sky-600 text-white shadow-md shadow-sky-950/60"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <HelpCircle className="w-4 h-4 text-amber-300" />
                      <span>Statutory FAQs</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Sub-view Content with Animated Transitions */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                  {page3SubTab === "directory" ? (
                    <motion.div
                      key="directory-subview"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FindLawyerSection
                        language={language}
                        onAppointmentBooked={handleAppointmentBooked}
                        presetCategory={presetLawyerCategory}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="faqs-subview"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                     
