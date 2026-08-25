import React, { useState, useEffect } from "react";
import {
  Scale,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { Language } from "../types";

interface AboutCreatorSectionProps {
  language: Language;
}

export const AboutCreatorSection: React.FC<AboutCreatorSectionProps> = ({
  language,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>("/ali-ahmad.jpg");

  useEffect(() => {
    const saved = localStorage.getItem("aagahi_creator_photo");

    if (saved) {
      setPhotoUrl(saved);
    }

    const handlePhotoUpdate = () => {
      const updated = localStorage.getItem("aagahi_creator_photo");

      if (updated) {
        setPhotoUrl(updated);
      }
    };

    window.addEventListener("creator_photo_updated", handlePhotoUpdate);

    return () =>
      window.removeEventListener("creator_photo_updated", handlePhotoUpdate);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
      {/* Creator Spotlight Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 shadow-2xl p-8 sm:p-12"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Creator Identity */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Platform Founder & Lead Architect</span>
            </motion.div>

            <div className="flex flex-col items-center lg:items-start gap-5">

              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-400 p-1 shadow-xl shadow-amber-950/50 overflow-hidden relative"
                >
                  <img
                    src={photoUrl}
                    alt="Ali Ahmad - Creator and Founder of Aagahi"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top rounded-[14px] border border-amber-400/30 filter brightness-105 contrast-105"
                  />
                </motion.div>

                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-2 rounded-xl font-black shadow-lg border-2 border-slate-900 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Ali Ahmad
                </h2>

                {/* Creator Name / Title in Urdu */}
                <div className="text-sm font-semibold text-amber-400 font-urdu mt-0.5">
                  علی احمد — بانی اور لیڈ آرکیٹیکٹ
                </div>

                <p className="text-xs text-slate-400 font-medium mt-1">
                  Software Developer & Legal-Tech Technologist
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">

              <span className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 font-medium">
                🇵🇰 Public Legal Tech
              </span>

              <span className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 font-medium">
                ⚖️ Constitutional Literacy
              </span>

              <span className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 font-medium">
                🤖 AI Legal Diagnostics
              </span>

            </div>
          </div>

          {/* Right Column: Mission Statement */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm leading-relaxed border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-10 pt-8 lg:pt-0">

            <div className="space-y-2">

              <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-amber-400" />

                <span>
                  Vision Behind AAGAHI (آگاہی)
                </span>
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">
                  AAGAHI
                </strong>{" "}
                was conceived and developed by{" "}
                <span className="text-amber-400 font-bold">
                  Ali Ahmad
                </span>{" "}
                as a dedicated public legal-tech platform for Pakistan.
                In an environment where statutory procedures and
                constitutional rights can feel opaque to ordinary citizens,
                AAGAHI serves to bridge that critical gap.
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 shadow-md">

                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />

                  <span>
                    Democratizing Legal Rights
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Translating dense statutory codes into clear,
                  accessible guidance to empower everyday citizens
                  across Pakistan.
                </p>

              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 shadow-md">

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                  <span>
                    Trusted Legal Resources
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Providing reliable access to constitutional articles,
                  emergency helplines, and structured legal frameworks.
                </p>

              </div>

            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">

              {/* Correct Urdu Quote */}
              <div className="text-amber-400 font-semibold font-urdu text-sm">
                <span>
                  "ہر شہری کو انصاف اور اپنے حقوق کی آگاہی ملنی چاہیے"
                </span>
              </div>

              <div className="font-mono text-xs text-slate-500">
                Created by Ali Ahmad • Built for Pakistan
              </div>

            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};
