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
} from "lucide-react";

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

const CourtroomScrollDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-4 py-2 select-none" aria-hidden="true">
    <motion.span
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#d99b26]/70 origin-right"
    />
    <motion.div
      initial={{ opacity: 0, rotate: -18, y: -6 }}
      whileInView={{ opacity: 1, rotate: 0, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="w-9 h-9 rounded-full bg-[#162238] border border-[#d99b26]/60 flex items-center justify-center text-[#d99b26] shadow-lg"
    >
      <Scale className="w-4 h-4" />
    </motion.div>
    <motion.span
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#d99b26]/70 origin-left"
    />
  </div>
);

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>("home");
  const [language, setLanguage] = useState<Language>("en");

  const [page2SubTab, setPage2SubTab] = useState<"rights" | "guides">("rights");
  const [page3SubTab, setPage3SubTab] = useState<"directory" | "faqs">("directory");

  const [solverQuery, setSolverQuery] = useState<string>("");
  const [presetLawyerCategory, setPresetLawyerCategory] = useState<string>("");

  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
    <div className={`min-h-screen flex flex-col bg-[#0b1329] text-[#f8f7f4] ${language === "ur" ? "rtl font-urdu" : "ltr"}`}>
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

      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentTab === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-16"
            >
              <Hero
                language={language}
                onSearchSubmit={handleHeroSearch}
                setCurrentTab={navigateToTab}
                openEmergencyModal={() => {
                  setCurrentTab("emergency");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-2 mb-8"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162238] border border-[#243554] text-xs text-[#d99b26] font-semibold">
                    <Compass className="w-3.5 h-3.5 text-[#d99b26]" />
                    <span>The 4 Core Pillars of AAGAHI</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8f7f4]">
                    Navigate Pakistani Justice & Rights
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
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
                  <motion.div
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTab("home");
                      window.scrollTo({ top: 560, behavior: "smooth" });
                    }}
                    className="card cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#162238] border border-[#243554] flex items-center justify-center text-[#d99b26] group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[#f8f7f4] group-hover:text-[#d99b26] transition-colors">
                          1. AI Problem Solver
                        </h3>
                        <p className="text-xs text-slate-300 mt-1">
                          Instant legal diagnosis with relevant Constitutional Articles & PPC sections.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#d99b26]">
                      <span>Run Legal Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTab("constitution");
                      setPage2SubTab("rights");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="card cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#162238] border border-[#243554] flex items-center justify-center text-[#d99b26] group-hover:scale-110 transition-transform">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[#f8f7f4] group-hover:text-[#d99b26] transition-colors">
                          2. Rights & Guides
                        </h3>
                        <p className="text-xs text-slate-300 mt-1">
                          Articles 4, 9, 10, 14, 24, 25 and practical FIR/police citizen walkthroughs.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#d99b26]">
                      <span>Explore Articles</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTab("lawyers");
                      setPage3SubTab("directory");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="card cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#162238] border border-[#243554] flex items-center justify-center text-[#d99b26] group-hover:scale-110 transition-transform">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[#f8f7f4] group-hover:text-[#d99b26] transition-colors">
                          3. Verified Advocates
                        </h3>
                        <p className="text-xs text-slate-300 mt-1">
                          High Court & Supreme Court licensed lawyers across Lahore, Karachi, Islamabad.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#d99b26]">
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTab("emergency");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="card cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#162238] border border-[#243554] flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[#f8f7f4] group-hover:text-rose-400 transition-colors">
                          4. Emergency Helplines
                        </h3>
                        <p className="text-xs text-slate-300 mt-1">
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

              <div id="solver-section" className="border-t border-[#243554] pt-8">
                <LegalProblemSolver
                  initialQuery={solverQuery}
                  language={language}
                  setCurrentTab={navigateToTab}
                  openLawyerBookingWithCategory={handleOpenLawyerWithCategory}
                  openAIAssistant={() => setIsAIAssistantOpen(true)}
                />
              </div>

              <section className="bg-[#162238]/60 py-16 px-4 sm:px-6 lg:px-8 border-y border-[#243554]">
                <div className="max-w-6xl mx-auto space-y-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-3"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162238] border border-[#243554] text-xs font-semibold text-[#d99b26]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d99b26]" />
                      <span>Simple & Transparent Process</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f8f7f4]">
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
                    <div className="card space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#162238] text-[#d99b26] font-black text-lg flex items-center justify-center border border-[#243554]">1</div>
                      <h3 className="font-extrabold text-base text-[#f8f7f4]">{t.step1Title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{t.step1Desc}</p>
                    </div>
                    <div className="card space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#162238] text-[#d99b26] font-black text-lg flex items-center justify-center border border-[#243554]">2</div>
                      <h3 className="font-extrabold text-base text-[#f8f7f4]">{t.step2Title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{t.step2Desc}</p>
                    </div>
                    <div className="card space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#162238] text-[#d99b26] font-black text-lg flex items-center justify-center border border-[#243554]">3</div>
                      <h3 className="font-extrabold text-base text-[#f8f7f4]">{t.step3Title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{t.step3Desc}</p>
                    </div>
                    <div className="card space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#162238] text-[#d99b26] font-black text-lg flex items-center justify-center border border-[#243554]">4</div>
                      <h3 className="font-extrabold text-base text-[#f8f7f4]">{t.step4Title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{t.step4Desc}</p>
                    </div>
                  </motion.div>
                </div>
              </section>

              <CourtroomScrollDivider />

              <AboutCreatorSection language={language} />
            </motion.div>
          )}

          {currentTab === "constitution" && (
            <motion.div
              key="constitution-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-8 pb-16"
            >
              <div className="bg-[#162238] border-b border-[#243554] py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b1329] border border-[#243554] text-[#d99b26] text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5 text-[#d99b26]" />
                    <span>Constitutional Literacy & Step-by-Step Guides</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-[#f8f7f4]">
                    Fundamental Rights & Practical Citizen Walkthroughs
                  </h1>
                  <p className="text-slate-300 text-sm max-w-2xl mx-auto">
                    Understand your supreme constitutional protections under the 1973 Constitution alongside official procedural guides.
                  </p>

                  <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#0b1329] border border-[#243554] shadow-xl">
                    <button
                      onClick={() => setPage2SubTab("rights")}
                      className={`btn text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer h-10 px-4 ${
                        page2SubTab === "rights"
                          ? "btn-primary"
                          : "text-slate-300 hover:text-[#f8f7f4]"
                      }`}
                    >
                      <Scale className="w-4 h-4" />
                      <span>Constitutional Rights</span>
                    </button>
                    <button
                      onClick={() => setPage2SubTab("guides")}
                      className={`btn text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer h-10 px-4 ${
                        page2SubTab === "guides"
                          ? "btn-primary"
                          : "text-slate-300 hover:text-[#f8f7f4]"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Legal Guides & FIR Procedures</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {page2SubTab === "rights" ? (
                  <ConstitutionSection
                    language={language}
                    savedArticleIds={savedArticleIds}
                    toggleSaveArticle={toggleSaveArticle}
                  />
                ) : (
                  <LegalGuidesSection language={language} />
                )}
              </div>
            </motion.div>
          )}

          {currentTab === "lawyers" && (
            <motion.div
              key="lawyers-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-8 pb-16"
            >
              <div className="bg-[#162238] border-b border-[#243554] py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b1329] border border-[#243554] text-[#d99b26] text-xs font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-[#d99b26]" />
                    <span>Bar Council Verified Advocates & Court FAQ</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-[#f8f7f4]">
                    Connect with Qualified Advocates Across Pakistan
                  </h1>
                  <p className="text-slate-300 text-sm max-w-2xl mx-auto">
                    Book confidential appointments with licensed High Court & Supreme Court advocates or browse authoritative statutory FAQs.
                  </p>

                  <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#0b1329] border border-[#243554] shadow-xl">
                    <button
                      onClick={() => setPage3SubTab("directory")}
                      className={`btn text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer h-10 px-4 ${
                        page3SubTab === "directory"
                          ? "btn-primary"
                          : "text-slate-300 hover:text-[#f8f7f4]"
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Find an Advocate</span>
                    </button>
                    <button
                      onClick={() => setPage3SubTab("faqs")}
                      className={`btn text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer h-10 px-4 ${
                        page3SubTab === "faqs"
                          ? "btn-primary"
                          : "text-slate-300 hover:text-[#f8f7f4]"
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Legal FAQs</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {page3SubTab === "directory" ? (
                  <FindLawyerSection
                    language={language}
                    presetCategory={presetLawyerCategory}
                    appointments={appointments}
                    onAppointmentBooked={handleAppointmentBooked}
                    onCancelAppointment={handleCancelAppointment}
                  />
                ) : (
                  <FAQSection language={language} />
                )}
              </div>
            </motion.div>
          )}

          {currentTab === "emergency" && (
            <motion.div
              key="emergency-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <EmergencyContactsSection language={language} />
            </motion.div>
          )}

          {currentTab === "dashboard" && (
            <motion.div
              key="dashboard-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Dashboards
                language={language}
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
                savedArticleIds={savedArticleIds}
                toggleSaveArticle={toggleSaveArticle}
                setCurrentTab={navigateToTab}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer language={language} setCurrentTab={navigateToTab} />
      <FloatingEmergency onClick={() => navigateToTab("emergency")} />

      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        language={language}
        openLawyerBookingWithCategory={handleOpenLawyerWithCategory}
      />

      <SearchLawsModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        language={language}
        setCurrentTab={navigateToTab}
      />
    </div>
  );
}
