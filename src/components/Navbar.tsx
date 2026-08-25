import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Sparkles,
  Menu,
  X,
  Search,
  BookOpen,
  Scale,
  Users,
} from "lucide-react";
import { Language, ViewTab } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";
import { LegalLogo } from "./LegalLogo";

interface NavbarProps {
  currentTab: ViewTab;
  setCurrentTab: (tab: ViewTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  openEmergencyModal: () => void;
  openSearchLawsModal: () => void;
  openAIAssistant: () => void;
  appointmentsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  openEmergencyModal,
  openSearchLawsModal,
  openAIAssistant,
  appointmentsCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Removed the last two nav items (Emergency and Dashboard/My Legal Hub)
  const navItems = [
    { id: "home" as ViewTab, label: t.navHome, icon: Scale },
    { id: "constitution" as ViewTab, label: t.navRights, icon: BookOpen },
    { id: "lawyers" as ViewTab, label: t.navLawyers, icon: Users },
  ];

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md shadow-lg shadow-black/20 border-b border-amber-400/20 py-2.5"
          : "bg-slate-950/40 backdrop-blur-[6px] border-b border-amber-400/10 py-4"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand */}
          <button
            onClick={() => {
              setCurrentTab("home");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 rounded-xl group cursor-pointer"
            aria-label="AAGAHI — go to home"
          >
            <LegalLogo size="md" showText={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-sm p-1.5 rounded-2xl border border-amber-300/20 shadow-inner"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-950/70 border border-amber-400/50"
                      : "text-slate-200 hover:text-amber-200 hover:bg-white/10 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-amber-200" : "text-amber-300/80"
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-0.5 min-w-[18px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black text-center leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={openSearchLawsModal}
              className="h-11 px-3.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-100 hover:text-amber-200 border border-amber-300/20 backdrop-blur-sm transition-colors duration-200 flex items-center gap-2 text-[14px] font-medium cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 whitespace-nowrap"
              title="Search Laws & Constitution"
            >
              <Search className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="hidden xl:inline">Search Laws</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center h-11 p-1 rounded-xl bg-white/5 border border-amber-300/20 backdrop-blur-sm shrink-0">
              <button
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                className={`px-3 h-full rounded-lg text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                  language === "en"
                    ? "bg-amber-600 text-white shadow"
                    : "text-slate-200 hover:text-amber-200"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ur")}
                aria-pressed={language === "ur"}
                className={`px-3 h-full rounded-lg text-[13px] font-urdu font-bold transition-all duration-200 cursor-pointer ${
                  language === "ur"
                    ? "bg-amber-600 text-white shadow"
                    : "text-slate-200 hover:text-amber-200"
                }`}
              >
                اردو
              </button>
            </div>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={openAIAssistant}
              className="h-11 px-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-[13px] sm:text-[14px] font-bold flex items-center gap-2 shadow-lg shadow-sky-950/60 border border-sky-400/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Ask AAGAHI AI</span>
            </button>

            {/* Emergency Hotline Button */}
            <button
              onClick={openEmergencyModal}
              className="h-11 px-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-[13px] sm:text-[14px] font-bold flex items-center gap-2 shadow-lg shadow-rose-950/70 border border-rose-400/50 transition-all duration-200 animate-subtle-pulse cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 whitespace-nowrap shrink-0"
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Emergency 15 / 1122</span>
            </button>
          </div>

          {/* Mobile: Emergency + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openEmergencyModal}
              className="h-10 px-3 rounded-lg bg-rose-600 text-white text-[13px] font-bold flex items-center gap-1.5 border border-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 whitespace-nowrap"
              aria-label="Emergency helpline 15 or 1122"
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>15</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-amber-300/20 text-slate-100 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 border-t border-amber-300/20 space-y-4 pb-4 bg-slate-950/95 backdrop-blur-md rounded-2xl px-3 animate-fade-in">
            <div className="grid grid-cols-1 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-full h-12 px-4 rounded-xl text-left text-[14px] font-semibold flex items-center justify-between transition-colors duration-200 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "bg-white/5 text-slate-100 hover:bg-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-amber-200" : "text-amber-300"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-amber-300/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center h-11 p-1 rounded-xl bg-white/5 border border-amber-300/20">
                <button
                  onClick={() => setLanguage("en")}
                  aria-pressed={language === "en"}
                  className={`px-4 h-full rounded-lg text-[13px] font-bold ${
                    language === "en" ? "bg-amber-600 text-white" : "text-slate-300"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("ur")}
                  aria-pressed={language === "ur"}
                  className={`px-4 h-full rounded-lg text-[13px] font-urdu font-bold ${
                    language === "ur" ? "bg-amber-600 text-white" : "text-slate-300"
                  }`}
                >
                  اردو
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSearchLawsModal();
                }}
                className="h-11 px-4 rounded-xl bg-white/5 text-slate-100 text-[13px] font-medium border border-amber-300/20 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Search Laws</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAIAssistant();
              }}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 text-white text-[14px] font-bold flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Ask AAGAHI AI</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
