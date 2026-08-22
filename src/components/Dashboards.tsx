import React, { useState } from "react";
import { 
  Bookmark, 
  Calendar, 
  Clock, 
  Video, 
  PhoneCall, 
  Building, 
  Trash2, 
  ExternalLink, 
  Scale, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { Appointment, ConstitutionalArticle, Language } from "../types";
import { CONSTITUTIONAL_ARTICLES, VERIFIED_EMERGENCY_CONTACTS } from "../data/legalData";

interface DashboardsProps {
  language: Language;
  appointments: Appointment[];
  savedArticleIds: string[];
  onCancelAppointment: (id: string) => void;
  onNavigateTab: (tab: any) => void;
  openEmergencyModal: () => void;
  openAIAssistant: () => void;
}

export const Dashboards: React.FC<DashboardsProps> = ({
  language,
  appointments,
  savedArticleIds,
  onCancelAppointment,
  onNavigateTab,
  openEmergencyModal,
  openAIAssistant,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"appointments" | "saved" | "portals">("appointments");

  const savedArticles = CONSTITUTIONAL_ARTICLES.filter((a) => savedArticleIds.includes(a.id));

  const officialGovPortals = [
    {
      name: "Supreme Court of Pakistan (SCP)",
      desc: "Official judgments, cause lists, online case search & constitutional petitions.",
      url: "https://www.supremecourt.gov.pk",
      badge: "Judicial Apex",
    },
    {
      name: "Federal Investigation Agency (FIA NR3C)",
      desc: "Online cyber crime reporting portal under PECA 2016 for harassment and fraud.",
      url: "https://complaint.fia.gov.pk",
      badge: "Cyber Crime",
    },
    {
      name: "Pakistan Code (Ministry of Law & Justice)",
      desc: "Comprehensive official digital repository of all Federal Acts & Statutes (1836 - Present).",
      url: "https://pakistancode.gov.pk",
      badge: "Federal Statutes",
    },
    {
      name: "Federal Ombudsman (Wafaqi Mohtasib)",
      desc: "Free administrative complaints against Federal Ministries & government maladministration.",
      url: "https://www.mohtasib.gov.pk",
      badge: "Ombudsman",
    },
    {
      name: "Punjab Commission on Status of Women (PCSW)",
      desc: "Women rights protection, legal aid guidance & gender helpline 1043.",
      url: "https://pcsw.punjab.gov.pk",
      badge: "Women Protection",
    },
    {
      name: "National Database & Registration Authority (NADRA)",
      desc: "CNIC verification, Family Registration Certificate (FRC), and Succession Certificates.",
      url: "https://www.nadra.gov.pk",
      badge: "Civil Records",
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Hub Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/60 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-yellow-400/50 text-yellow-300 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] text-xs font-semibold">
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>Personal Legal Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              My Legal Hub & Consultations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Track your scheduled advocate consultations, access your bookmarked constitutional rights, and connect to official Pakistani legal registries.
            </p>
          </div>

          {/* Quick Hub Stats */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl text-center min-w-[120px]">
              <span className="text-2xl font-black text-amber-400">{appointments.length}</span>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Consultations</p>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl text-center min-w-[120px]">
              <span className="text-2xl font-black text-amber-300">{savedArticles.length}</span>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Saved Rights</p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveSubTab("appointments")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "appointments"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-950/60 border border-amber-400/50"
                : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Advocate Consultations ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("saved")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "saved"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-950/60 border border-amber-400/50"
                : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-300" />
            <span>Saved Constitutional Rights ({savedArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("portals")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "portals"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-950/60 border border-amber-400/50"
                : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            }`}
          >
            <ExternalLink className="w-4 h-4 text-amber-300" />
            <span>Official Government Portals</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: Consultations */}
      {activeSubTab === "appointments" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>Your Scheduled Advocate Appointments</span>
            </h2>
            <button
              onClick={() => onNavigateTab("lawyers")}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow border border-white/70 transition-all cursor-pointer"
            >
              <span>Book New Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Calendar className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Consultations Booked Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  When you book a video, phone, or in-person consultation with a Bar Council verified advocate, your appointment details will appear here.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("lawyers")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-lg border border-white/70 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-slate-950" />
                <span>Browse Verified Advocates</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-slate-900 rounded-2xl p-5 border border-amber-900/60 hover:border-amber-500/60 transition-all shadow-xl space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        {appt.caseCategory}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{appt.lawyerName}</h4>
                      <p className="text-xs text-slate-400">ID: {appt.id}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-amber-900/80 text-amber-300 text-xs font-bold border border-amber-600/50">
                      Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{appt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>{appt.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      {appt.consultationType === "video" && <Video className="w-3.5 h-3.5 text-sky-400" />}
                      {appt.consultationType === "phone" && <PhoneCall className="w-3.5 h-3.5 text-amber-400" />}
                      {appt.consultationType === "in-person" && <Building className="w-3.5 h-3.5 text-amber-400" />}
                      <span className="capitalize">{appt.consultationType} Consultation</span>
                    </div>
                    <div className="text-slate-400 truncate">
                      Client: {appt.citizenName}
                    </div>
                  </div>

                  {appt.caseDescription && (
                    <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 line-clamp-2">
                      <span className="font-semibold text-slate-400">Note: </span>
                      {appt.caseDescription}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-500">
                      Booked on {new Date(appt.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => onCancelAppointment(appt.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-semibold border border-rose-800/60 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Saved Rights */}
      {activeSubTab === "saved" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400" />
              <span>Bookmarked Constitutional Articles</span>
            </h2>
            <button
              onClick={() => onNavigateTab("constitution")}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow border border-white/70 transition-all cursor-pointer"
            >
              <span>Explore All 1973 Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {savedArticles.length === 0 ? (
            <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Bookmark className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Saved Articles Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click the bookmark icon on any Constitutional Article (e.g. Article 9, Article 10, Article 24) to save it here for instant offline reference.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("constitution")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-lg border border-white/70 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-slate-950" />
                <span>View Constitution 1973</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-amber-500/60 transition-all shadow-xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-xs font-extrabold border border-amber-800">
                        {article.articleNumber}
                      </span>
                      <span className="text-[11px] text-amber-300 font-urdu">{article.titleUr}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{article.titleEn}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === "ur" ? article.simpleExplanationUr : article.simpleExplanationEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Protects: {article.whoItProtects}</span>
                    <button
                      onClick={() => onNavigateTab("constitution")}
                      className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Full Clause</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 3: Government Portals */}
      {activeSubTab === "portals" && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-amber-400" />
            <span>Official Pakistani Legal & Judicial Portals</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {officialGovPortals.map((portal, idx) => (
              <a
                key={idx}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 hover:border-amber-500/60 hover:bg-slate-850 transition-all shadow-xl space-y-3 group block"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-extrabold border border-amber-800">
                    {portal.badge}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {portal.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {portal.desc}
                </p>
                <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Visit Official Site</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
