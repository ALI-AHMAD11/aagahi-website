import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LegalProblemSolver } from "./components/LegalProblemSolver";
import { ConstitutionSection } from "./components/ConstitutionSection";
import { EmergencyContactsSection } from "./components/EmergencyContactsSection";
import { FindLawyerSection } from "./components/FindLawyerSection";
import { FAQSection } from "./components/FAQSection";
import { Dashboards } from "./components/Dashboards";
import { Footer } from "./components/Footer";
import { AIAssistantModal } from "./components/AIAssistantModal";
import { SearchLawsModal } from "./components/SearchLawsModal";
import { FloatingEmergency } from "./components/FloatingEmergency";

export function App() {
  // Navigation & Language State
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [currentTab, setCurrentTab] = useState<
    "home" | "solver" | "lawyers" | "emergency" | "dashboards"
  >("home");

  // Sub-tabs for nested views
  const [page2SubTab, setPage2SubTab] = useState<"solver" | "constitution">("solver");
  const [page3SubTab, setPage3SubTab] = useState<"directory" | "faqs">("directory");

  // Modals & Interactive States
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [presetLawyerCategory, setPresetLawyerCategory] = useState<string | undefined>(undefined);

  // User Data State (Saved items & appointments)
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  // Navigation scroll helper
  const navigateToTab = (tab: "home" | "solver" | "lawyers" | "emergency" | "dashboards") => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handlers for cross-component features
  const handleOpenLawyerWithCategory = (category: string) => {
    setPresetLawyerCategory(category);
    setPage3SubTab("directory");
    navigateToTab("lawyers");
  };

  const handleAppointmentBooked = (appointment: any) => {
    setAppointments((prev) => [appointment, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  return (
    <div className="min-h-screen bg-brand-navy text-brand-offwhite flex flex-col font-sans selection:bg-brand-gold/30">
      {/* Navbar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        currentTab={currentTab}
        setCurrentTab={navigateToTab}
        setIsAIAssistantOpen={setIsAIAssistantOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* PAGE 1: HOME / HERO                                                     */}
          {/* ========================================================================= */}
          {currentTab === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Hero language={language} setCurrentTab={navigateToTab} />
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 2: LEGAL PROBLEM SOLVER & CONSTITUTION                             */}
          {/* ========================================================================= */}
          {currentTab === "solver" && (
            <motion.div
              key="solver-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Sub-navigation tabs */}
                <div className="flex border-b border-brand-slate mb-8">
                  <button
                    onClick={() => setPage2SubTab("solver")}
                    className={`pb-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                      page2SubTab === "solver"
                        ? "border-brand-gold text-brand-gold"
                        : "border-transparent text-brand-offwhite/60 hover:text-brand-offwhite"
                    }`}
                  >
                    {language === "ur" ? "قانونی مسئلہ حل کرنے والا" : "Legal Problem Solver"}
                  </button>
                  <button
                    onClick={() => setPage2SubTab("constitution")}
                    className={`pb-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                      page2SubTab === "constitution"
                        ? "border-brand-gold text-brand-gold"
                        : "border-transparent text-brand-offwhite/60 hover:text-brand-offwhite"
                    }`}
                  >
                    {language === "ur" ? "آئین پاکستان" : "Constitution of Pakistan"}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {page2SubTab === "solver" ? (
                    <motion.div
                      key="solver-subview"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <LegalProblemSolver
                        language={language}
                        openLawyerBookingWithCategory={handleOpenLawyerWithCategory}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="constitution-subview"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ConstitutionSection language={language} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 3: LAWYER DIRECTORY & FAQS                                         */}
          {/* ========================================================================= */}
          {currentTab === "lawyers" && (
            <motion.div
              key="lawyers-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Sub-navigation tabs */}
                <div className="flex border-b border-brand-slate mb-8">
                  <button
                    onClick={() => setPage3SubTab("directory")}
                    className={`pb-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                      page3SubTab === "directory"
                        ? "border-brand-gold text-brand-gold"
                        : "border-transparent text-brand-offwhite/60 hover:text-brand-offwhite"
                    }`}
                  >
                    {language === "ur" ? "وکلاء کی ڈائریکٹری" : "Lawyer Directory"}
                  </button>
                  <button
                    onClick={() => setPage3SubTab("faqs")}
                    className={`pb-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                      page3SubTab === "faqs"
                        ? "border-brand-gold text-brand-gold"
                        : "border-transparent text-brand-offwhite/60 hover:text-brand-offwhite"
                    }`}
                  >
                    {language === "ur" ? "عام سوالات (FAQs)" : "Legal FAQs"}
                  </button>
                </div>

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
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FAQSection language={language} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 4: EMERGENCY HELPLINES DIRECTORY                                   */}
          {/* ========================================================================= */}
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

          {/* ========================================================================= */}
          {/* PAGE 5: USER DASHBOARDS (Saved Articles & Appointments)                   */}
          {/* ========================================================================= */}
          {currentTab === "dashboards" && (
            <motion.div
              key="dashboards-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Dashboards
                language={language}
                savedArticleIds={savedArticleIds}
                toggleSaveArticle={toggleSaveArticle}
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
                setCurrentTab={navigateToTab}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Application Footer */}
      <Footer language={language} setCurrentTab={navigateToTab} />

      {/* Global Interactive Modals & Floating Widgets */}
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

      {/* Floating Emergency SOS Button */}
      <FloatingEmergency
        onClick={() => {
          setCurrentTab("emergency");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

export default App;
