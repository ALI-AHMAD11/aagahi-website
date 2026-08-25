import React, { useState } from "react";
import { 
  PhoneCall, 
  ShieldAlert, 
  Copy, 
  Check, 
  ShieldCheck, 
  Lock, 
  Users, 
  AlertTriangle, 
  Ambulance, 
  Car,
  Scale
} from "lucide-react";
import { EmergencyContact, Language } from "../types";
import { VERIFIED_EMERGENCY_CONTACTS } from "../data/legalData";
import { UI_TRANSLATIONS } from "../data/translations";

interface EmergencyContactsSectionProps {
  language: Language;
  customContacts?: any[];
}

export const EmergencyContactsSection: React.FC<EmergencyContactsSectionProps> = ({
  language,
  customContacts = [],
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>("All Pakistan");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const allContacts: EmergencyContact[] = [
    ...VERIFIED_EMERGENCY_CONTACTS,
    ...customContacts.map((c) => ({
      id: c.id,
      nameEn: c.name,
      nameUr: c.name,
      number: c.number,
      altNumber: c.altNumber,
      category: c.category || "police",
      province: c.province || "All Pakistan",
      cityDistrict: c.city || "Pakistan",
      descriptionEn: c.description,
      descriptionUr: c.description,
      availability: c.availability || "24/7",
      verifiedGovtAgency: true,
      tollFree: true,
    }))
  ];

  const provinces = [
    "All Pakistan",
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Islamabad Capital Territory",
  ];

  const categories = [
    { id: "all", label: "All Helplines", icon: <PhoneCall className="w-4 h-4" /> },
    { id: "police", label: "Police (15)", icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
    { id: "rescue", label: "Rescue & Medical (1122 / 115)", icon: <Ambulance className="w-4 h-4 text-amber-400" /> },
    { id: "cybercrime", label: "Cybercrime (1991)", icon: <Lock className="w-4 h-4 text-sky-400" /> },
    { id: "women", label: "Women Protection (1043 / 1099)", icon: <Users className="w-4 h-4 text-amber-400" /> },
    { id: "child", label: "Child Protection (1121)", icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
    { id: "motorway", label: "Motorway (130)", icon: <Car className="w-4 h-4 text-blue-400" /> },
    { id: "legal-aid", label: "Free Legal Aid", icon: <Scale className="w-4 h-4 text-amber-400" /> },
  ];

  const filteredContacts = allContacts.filter((c) => {
    const matchesProvince = selectedProvince === "All Pakistan" || c.province === selectedProvince || c.province === "All Pakistan";
    const matchesCategory = selectedCategory === "all" || c.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      c.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.number.includes(searchQuery) ||
      c.cityDistrict.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvince && matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide">
          <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>Official Pakistani Emergency Network</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.emergencySectionTitle}
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {t.emergencySectionDesc}
        </p>
      </div>

      {/* Emergency Quick-Dial Top Bar for Urgent Needs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <a
          href="tel:15"
          className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-rose-500/30 text-white flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-md group"
        >
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Police Emergency</div>
            <div className="text-2xl font-black tracking-tight">15</div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition-colors">
            <PhoneCall className="w-5 h-5" />
          </div>
        </a>

        <a
          href="tel:1122"
          className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 text-white flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-md group"
        >
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Rescue & Ambulance</div>
            <div className="text-2xl font-black tracking-tight">1122</div>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
            <Ambulance className="w-5 h-5" />
          </div>
        </a>

        <a
          href="tel:1991"
          className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-sky-500/30 text-white flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-md group"
        >
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400">FIA Cyber Crime</div>
            <div className="text-2xl font-black tracking-tight">1991</div>
          </div>
          <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
            <Lock className="w-5 h-5" />
          </div>
        </a>

        <a
          href="tel:1099"
          className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 text-white flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-md group"
        >
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">MoHR / Women Rights</div>
            <div className="text-2xl font-black tracking-tight">1099</div>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
            <Users className="w-5 h-5" />
          </div>
        </a>
      </div>

      {/* Filters Container */}
      <div className="bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-800 space-y-4">
        {/* Province Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-slate-400 font-semibold shrink-0 uppercase tracking-wider">Province:</span>
          {provinces.map((prov) => (
            <button
              key={prov}
              onClick={() => setSelectedProvince(prov)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all duration-200 ${
                selectedProvince === prov
                  ? "bg-amber-600 text-white shadow-md shadow-amber-900/20 font-semibold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {prov}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-800/80 pt-4 scrollbar-none">
          <span className="text-xs text-slate-400 font-semibold shrink-0 uppercase tracking-wider">Emergency Type:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 flex items-center gap-2 transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-rose-600 text-white shadow-md shadow-rose-900/20 font-semibold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-slate-700 p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="space-y-3">
              {/* Card Top Badges */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-800 text-slate-300 uppercase tracking-wider">
                  {contact.province}
                </span>
                {contact.verifiedGovtAgency && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-[11px] font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Verified Official</span>
                  </span>
                )}
              </div>

              {/* Organization Name */}
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {language === "ur" ? contact.nameUr : contact.nameEn}
                </h3>
                {language !== "ur" && (
                  <div className="text-xs text-amber-300/80 font-urdu">{contact.nameUr}</div>
                )}
              </div>

              {/* Area Covered & Availability */}
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1">📍 {contact.cityDistrict}</span>
                <span>•</span>
                <span className="flex items-center gap-1">⏱️ {contact.availability}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed line-clamp-2 pt-1">
                {language === "ur" ? contact.descriptionUr : contact.descriptionEn}
              </p>
            </div>

            {/* Bottom Number and Actions */}
            <div className="pt-5 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Helpline Number</div>
                <div className="text-xl font-black text-amber-400 tracking-tight">
                  {contact.number}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(contact.id, contact.number)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                  title="Copy Number"
                >
                  {copiedId === contact.id ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                </button>

                <a
                  href={`tel:${contact.number}`}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-rose-950/50 transition-all duration-200 hover:scale-105"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t.callNow}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
