import React, { useState, useEffect } from "react";
import { 
  Scale, 
  User, 
  Award, 
  Sparkles, 
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { Language } from "../types";

interface AboutCreatorSectionProps {
  language: Language;
}

export const AboutCreatorSection: React.FC<AboutCreatorSectionProps> = ({ language }) => {
  const [photoUrl, setPhotoUrl] = useState<string>("/ali-ahmad.jpg");

  useEffect(() => {
    const saved = localStorage.getItem("aagahi_creator_photo");
    if (saved) {
      setPhotoUrl(saved);
    }

    const handlePhotoUpdate = () => {
      const updated = localStorage.getItem("aagahi_creator_photo");
      if (updated) setPhotoUrl(updated);
    };

    window.addEventListener("creator_photo_updated", handlePhotoUpdate);
    return () => window.removeEventListener("creator_photo_updated", handlePhotoUpdate);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Creator Spotlight Card with Motion */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/80 border-2 border-amber-500/50 shadow-2xl p-6 sm:p-10"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Creator Identity & Photo Badge */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/90 border border-amber-400/50 text-amber-300 text-xs font-bold tracking-wide shadow-inner"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Platform Founder & Lead Architect</span>
            </motion.div>

            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="relative">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-500 to-amber-400 p-1 shadow-2xl shadow-amber-950/80 overflow-hidden relative"
                >
                  <img 
                    src={photoUrl} 
                    alt="Ali Ahmad - Creator and Founder of Aagahi"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top rounded-[14px] border border-amber-400/50 filter brightness-105 contrast-105"
                  />
                </motion.div>

                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-xl font-black shadow-lg border-2 border-slate-900 animate-subtle-pulse flex items-center gap-1">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Ali Ahmad
                </h2>
                <div className="text-sm font-bold text-amber-400 font-urdu mt-0.5">
                  علی احمد — بانی، ڈویلپر و ٹیک ٹیکنالوجسٹ
                </div>
                <p className="text-xs text-amber-300 font-semibold mt-1">
                  Creator • Developer • Tech Technologist
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <motion.span whileHover={{ scale: 1.06 }} className="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300 cursor-default">
                🇵🇰 Public Legal Tech
              </motion.span>
              <motion.span whileHover={{ scale: 1.06 }} className="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300 cursor-default">
                ⚖️ Constitutional Literacy
              </motion.span>
              <motion.span whileHover={{ scale: 1.06 }} className="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300 cursor-default">
                🤖 AI Legal Diagnostics
              </motion.span>
            </div>
          </div>

          {/* Right Column: Mission Statement & Accomplishments */}
          <div className="lg:col-span-7 space-y-4 text-slate-200 text-sm leading-relaxed border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-8 pt-6 lg:pt-0">
            <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-300" />
              <span>Vision Behind AAGAHI (آگاہی)</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">AAGAHI</strong> was conceived and developed by <span className="text-amber-400 font-bold">Ali Ahmad</span> as a public legal-tech platform for the people of Pakistan. In a legal landscape where statutory procedures and constitutional safeguards can feel overwhelming to everyday citizens, AAGAHI bridges the gap between the law and the public.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <motion.div 
                whileHover={{ y: -3 }}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-900/50 space-y-1 shadow-md"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Democratizing Legal Rights</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Transforming dense statutory codes (PPC, CrPC, PECA) into clear, actionable citizen guides in English, Urdu, and Roman Urdu.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-900/50 space-y-1 shadow-md"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Advocate Network</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Connecting vulnerable citizens directly with licensed Bar Council advocates across Lahore, Karachi, Islamabad, and beyond.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 text-xs text-slate-400"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-urdu text-sm">
                <span>"ہر شہری کو انصاف اور اپنے حقوق کی آگاہی ملنی چاہیے"</span>
              </div>
              <div className="font-mono text-[11px] text-slate-500">
                Created by Ali Ahmad • Built for Pakistan
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
