import React, { useState, useEffect } from "react";
import { Scale, ShieldAlert, BookOpen, UserCheck, Heart, ArrowUp, User, Award, ExternalLink } from "lucide-react";
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

  return (
    <footer className="relative border-t border-amber-950 text-white pt-12 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/footer-bg.jpg')" }}
        aria-hidden="true"
      />
      {/* Dark overlay so text stays readable over the photo */}
      <div className="absolute inset-0 bg-slate-950/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/55 to-slate-950/75" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Prominent Statutory Legal Disclaimer */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-amber-900/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Scale className="w-4 h-4" />
            <span>{t.legalDisclaimerTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.legalDisclaimerText}
          </p>
        </div>

        {/* Creator Attribution & Mission Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 p-0.5 shadow-lg overflow-hidden">
                <img 
                  src={creatorPhoto} 
                  alt="Ali Ahmad"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top rounded-[14px]"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full text-[10px] font-bold shadow">
                <Award className="w-3 h-3" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">AAGAHI Legal Tech Platform</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/80 font-bold">Public Service</span>
              </div>
              <h3 className="text-base font-black text-white">
                Created & Designed by <span className="text-amber-300 underline decoration-amber-400">Ali Ahmad</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Built to champion constitutional awareness, legal empowerment, and civic justice for every citizen of Pakistan.
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <div className="text-xs text-amber-400 font-urdu font-semibold">
              بانی و تخلیق کار: علی احمد
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Aap Ka Haq, Aap Ki Aagahi
            </div>
          </div>
        </div>

        {/* 4 Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-400 flex items-center justify-center shadow">
                <Scale className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="font-black text-lg tracking-wider text-white">AAGAHI</span>
                <span className="text-xs ml-1.5 px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-urdu border border-amber-800">
                  آگاہی
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering the citizens of Pakistan through accessible legal awareness, constitutional literacy, and verified advocate connections.
            </p>
            <div className="text-xs text-amber-400 font-urdu font-semibold">
              آپ کا حق، آپ کی آگاہی • علی احمد
            </div>
          </div>

          {/* Quick Legal Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              The 4 Core Pages
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => setCurrentTab("home")}
                  className="hover:text-amber-300 transition-colors text-left font-medium"
                >
                  1. Home & AI Problem Solver
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("constitution")}
                  className="hover:text-amber-300 transition-colors text-left font-medium"
                >
                  2. Constitutional Rights & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("lawyers")}
                  className="hover:text-amber-300 transition-colors text-left font-medium"
                >
                  3. Verified Advocates & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("emergency")}
                  className="hover:text-amber-300 transition-colors text-left font-medium"
                >
                  4. Emergency Help & Portals
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>National Emergency Directory</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex justify-between">
                <span>Police Emergency:</span>
                <a href="tel:15" className="font-bold text-rose-400 hover:underline">15</a>
              </li>
              <li className="flex justify-between">
                <span>Rescue & Medical:</span>
                <a href="tel:1122" className="font-bold text-amber-400 hover:underline">1122</a>
              </li>
              <li className="flex justify-between">
                <span>FIA Cyber Crime:</span>
                <a href="tel:1991" className="font-bold text-sky-400 hover:underline">1991</a>
              </li>
              <li className="flex justify-between">
                <span>Ministry of Human Rights:</span>
                <a href="tel:1099" className="font-bold text-amber-400 hover:underline">1099</a>
              </li>
              <li className="flex justify-between">
                <span>Motorway Police:</span>
                <a href="tel:130" className="font-bold text-blue-400 hover:underline">130</a>
              </li>
            </ul>
          </div>

          {/* Pakistan Legal System Reference */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Governing Statutes & Courts
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Supreme Court of Pakistan (SCP)</li>
              <li>• High Courts (LHC, SHC, PHC, BHC, IHC)</li>
              <li>• Pakistan Penal Code (Act XLV of 1860)</li>
              <li>• Code of Criminal Procedure (Act V of 1898)</li>
              <li>• Prevention of Electronic Crimes Act 2016</li>
              <li>• Illegal Dispossession Act 2005</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-200">AAGAHI (آگاہی)</strong> • Created with purpose by <strong className="text-amber-300 font-bold">Ali Ahmad</strong> for Pakistan.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Language:</span>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded ${language === "en" ? "bg-amber-700 text-white font-bold" : "text-slate-400"}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ur")}
                className={`px-2 py-0.5 rounded font-urdu ${language === "ur" ? "bg-amber-700 text-white font-bold" : "text-slate-400"}`}
              >
                اردو
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
