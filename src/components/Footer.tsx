import React, { useState, useEffect } from "react";
import { Scale, ShieldAlert, ArrowUp, Award } from "lucide-react";
import { Language, ViewTab } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface FooterProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  setCurrentTab: (tab: ViewTab) => void;
  openEmergencyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  setLanguage,
  setCurrentTab,
  openEmergencyModal,
}) => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks: { label: string; tab: ViewTab }[] = [
    { label: "Home", tab: "home" },
    { label: "Constitution", tab: "constitution" },
    { label: "Find a Lawyer", tab: "lawyers" },
    { label: "Emergency", tab: "emergency" },
  ];

  return (
    <footer className="relative bg-[#0B1220] text-slate-300 border-t border-white/10">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10 py-16 sm:py-20">
        {/* Legal disclaimer strip */}
        <div className="rounded-xl bg-white/[0.04] border border-white/10 px-5 py-4 sm:px-6 sm:py-5 mb-14">
          <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-amber-400 mb-1.5">
            <Scale className="w-4 h-4" />
            <span>{t.legalDisclaimerTitle}</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t.legalDisclaimerText}
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#13213A] border border-amber-500/30 flex items-center justify-center">
                <Scale className="w-[18px] h-[18px] text-amber-400" />
              </div>
              <span className="font-bold text-[19px] tracking-tight text-white">AAGAHI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-[240px]">
              Helping citizens across Pakistan understand their legal rights through clear,
              accessible information and verified guidance.
            </p>
          </div>

          {/* Navigate */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              Navigate
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.tab}>
                  <button
                    onClick={() => setCurrentTab(link.tab)}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Emergency Numbers
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Police</span>
                <a href="tel:15" className="font-semibold text-slate-200 hover:text-amber-400">15</a>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Rescue</span>
                <a href="tel:1122" className="font-semibold text-slate-200 hover:text-amber-400">1122</a>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">FIA Cyber Crime</span>
                <a href="tel:1991" className="font-semibold text-slate-200 hover:text-amber-400">1991</a>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Human Rights</span>
                <a href="tel:1099" className="font-semibold text-slate-200 hover:text-amber-400">1099</a>
              </li>
            </ul>
            <button
              onClick={openEmergencyModal}
              className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors duration-200"
            >
              View all emergency help →
            </button>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors duration-200">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors duration-200">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 relative">
              <img
                src={creatorPhoto}
                alt="Ali Ahmad"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-amber-500 text-slate-950 p-[3px] rounded-full">
                <Award className="w-2.5 h-2.5" />
              </div>
            </div>
            <span>
              © {new Date().getFullYear()} AAGAHI — Designed &amp; built by{" "}
              <span className="text-slate-300 font-medium">Ali Ahmad</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1 text-sm">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-md transition-colors duration-200 ${
                  language === "en"
                    ? "bg-amber-500/15 text-amber-400 font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ur")}
                className={`px-2.5 py-1 rounded-md font-urdu transition-colors duration-200 ${
                  language === "ur"
                    ? "bg-amber-500/15 text-amber-400 font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                اردو
              </button>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors duration-200"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
