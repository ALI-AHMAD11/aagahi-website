import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Sparkles, 
  Menu, 
  X, 
  Search, 
  PhoneCall,
  BookOpen,
  Scale,
  Users,
  Award,
  Globe,
  Bookmark
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
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home" as ViewTab, label: t.navHome, icon: Scale },
    { id: "constitution" as ViewTab, label: t.navRights, icon: BookOpen },
    { id: "lawyers" as ViewTab, label: t.navLawyers, icon: Users },
    { id: "emergency" as ViewTab, label: t.navEmergency, icon: ShieldAlert },
    { id: "dashboard" as ViewTab, label: t.navDashboard, icon: Bookmark, badge: appointmentsCount > 0 ? appointmentsCount : undefined },
  ];

  return (
    <header className={`sticky top-0 left-0 w-full z-50 bg-transparent transition-all duration-300 ${
      scrolled 
        ? "backdrop-blur-md shadow-lg shadow-black/20 border-b border-amber-400/20 py-2.5" 
        : "backdrop-blur-[2px] border-b border-amber-400/10 py-3.5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Brand Logo & Minimalist Gavel-Tarazu Crest */}
          <button
            onClick={() => {
              setCurrentTab("home");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer"
          >
            <LegalLogo size="md" showText={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-sm p-1 rounded-2xl border border-amber-300/20 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-950/80 border border-amber-400/50"
                      : "text-white hover:text-amber-200 hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-amber-300/90"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search, Language Switcher, AI Assistant & Emergency Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Search Laws Button */}
            <button
              onClick={openSearchLawsModal}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white hover:text-amber-200 border border-amber-300/20 backdrop-blur-sm transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Search Laws & Constitution"
            >
              <Search className="w-4 h-4 text-amber-300" />
              <span className="hidden xl:inline">Search Laws</span>
            </button>

            {/* Language Switcher (Clean English / Urdu only) */}
            <div className="flex items-center p-0.5 rounded-xl bg-white/5 border border-amber-300/20 backdrop-blur-sm">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === "en"
                    ? "bg-amber-600 text-white shadow"
                    : "text-white hover:text-amber-200"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ur")}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-urdu font-bold transition-all ${
                  language === "ur"
                    ? "bg-amber-600 text-white shadow"
                    : "text-white hover:text-amber-200"
                }`}
              >
                اردو
              </button>
            </div>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={openAIAssistant}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-sky-950/60 border border-sky-400/40 transition-all hover:scale-102 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chat with AAGAHI</span>
            </button>

            {/* Emergency Hotline Button */}
            <button
              onClick={openEmergencyModal}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-rose-950/70 border border-rose-400/50 transition-all animate-subtle-pulse cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-amber-300" />
              <span>Emergency 15/1122</span>
            </button>
          </div>

          {/* Mobile Hamburger & Quick Emergency Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Emergency Button */}
            <button
              onClick={openEmergencyModal}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center gap-1 border border-rose-400"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>15</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-amber-300/20 text-white hover:text-amber-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-amber-300/20 space-y-3 pb-2 bg-slate-950/90 backdrop-blur-md rounded-2xl px-2 animate-fade-in">
            {/* Mobile Nav Links */}
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
                    className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "bg-white/5 text-white hover:bg-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-amber-300" />
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

            {/* Mobile Controls: Language & Actions */}
            <div className="pt-2 border-t border-amber-300/20 flex flex-wrap items-center justify-between gap-2">
              {/* Language Selector */}
              <div className="flex items-center p-0.5 rounded-xl bg-white/5 border border-amber-300/20">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    language === "en" ? "bg-amber-600 text-white" : "text-white/80"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("ur")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-urdu font-bold ${
                    language === "ur" ? "bg-amber-600 text-white" : "text-white/80"
                  }`}
                >
                  اردو
                </button>
              </div>

              {/* Search Modal Trigger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSearchLawsModal();
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 text-white text-xs font-medium border border-amber-300/20 flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-amber-300" />
                <span>Search Laws</span>
              </button>

              {/* AI Assistant Trigger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAIAssistant();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Chat with AAGAHI</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
