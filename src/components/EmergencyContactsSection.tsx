import React, { useState } from "react";
import { 
  PhoneCall, 
  ShieldAlert, 
  Copy, 
  Check, 
  ShieldCheck, 
  Flame, 
  Lock, 
  Users, 
  AlertTriangle, 
  Ambulance, 
  Car,
  Scale,
  Sparkles
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
    { id: "all", label: "All Helplines", icon: <PhoneCall className="w-3.5 h-3.5" /> },
    { id: "police", label: "Police (15)", icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> },
    { id: "rescue", label: "Rescue & Medical (1122 / 115)", icon: <Ambulance className="w-3.5 h-3.5 text-amber-400" /> },
    { id: "cybercrime", label: "Cybercrime (1991)", icon: <Lock className="w-3.5 h-3.5 text-sky-400" /> },
    { id: "women", label: "Women Protection (1043 / 1099)", icon: <Users className="w-3.5 h-3.5 text-amber-400" /> },
    { id: "child", label: "Child Protection (1121)", icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> },
    { id: "motorway", label: "Motorway (130)", icon: <Car className="w-3.5 h-3.5 text-blue-400" /> },
    { id: "legal-aid", label: "Free Legal Aid", icon: <Scale className="w-3.5 h-3.5 text-amber-400" /> },
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Official Pakistani Emergency Network</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.emergencySectionTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          {t.emergencySectionDesc}
        </p>
      </div>

      {/* Emergency Quick-Dial Top Bar for Urgent Needs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 p-4 rounded-2xl border border-rose-600/50 shadow-xl">
        <a
          href="tel:15"
          className="p-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-between transition-transform hover:scale-105 shadow-md"
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-200">Police Emergency</div>
            <div className="text-xl font-black">15</div>
          </div>
          <PhoneCall className="w-5 h-5 text-amber-300" />
        </a>

        <a
          href="tel:1122"
          className="p-3 rounded-xl bg-amber-700 hover:bg-amber-600 text-white flex items-center justify-between transition-transform hover:scale-105 shadow-md"
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200">Rescue & Ambulance</div>
            <div className="text-xl font-black">1122</div>
          </div>
          <Ambulance className="w-5 h-5 text-amber-300" />
        </a>

        <a
          href="tel:1991"
          className="p-3 rounded-xl bg-sky-700 hover:bg-sky-600 text-white flex items-center justify-between transition-transform hover:scale-105 shadow-md"
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-200">FIA Cyber Crime</div>
            <div className="text-xl font-black">1991</div>
          </div>
          <Lock className="w-5 h-5 text-amber-300" />
        </a>

        <a
          href="tel:1099"
          className="p-3 rounded-xl bg-amber-700 hover:bg-amber-600 text-white flex items-center justify-between transition-transform hover:scale-105 shadow-md"
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200">MoHR / Women Rights</div>
            <div className="text-xl font-black">1099</div>
          </div>
          <Users className="w-5 h-5 text-amber-300" />
        </a>
      </div>

      {/* Filters (Province & Category) */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4">
        {/* Province Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-slate-400 font-semibold shrink-0">Province:</span>
          {provinces.map((prov) => (
            <button
              key={prov}
              onClick={() => setSelectedProvince(prov)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                selectedProvince === prov
                  ? "bg-amber-600 text-white shadow"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {prov}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-800 pt-3">
          <span className="text-xs text-slate-400 font-semibold shrink-0">Emergency Type:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-colors ${
                selectedCategory === cat.id
                  ? "bg-rose-700 text-white shadow"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-rose-500/60 p-5 shadow-lg flex flex-col justify-between transition-all group"
          >
            <div className="space-y-2.5">
              {/* Card Top Badges */}
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 uppercase tracking-wider">
                  {contact.province}
                </span>
                {contact.verifiedGovtAgency && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-950 border border-yellow-400/50 text-yellow-300 text-[10px] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>Official Verified</span>
                  </span>
                )}
              </div>

              {/* Organization Name */}
              <div>
                <h3 className="font-extrabold text-base text-white group-hover:text-rose-300 transition-colors">
                  {language === "ur" ? contact.nameUr : contact.nameEn}
                </h3>
                {language !== "ur" && (
                  <div className="text-xs text-amber-300/80 font-urdu">{contact.nameUr}</div>
                )}
              </div>

              {/* Area Covered & Availability */}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>📍 {contact.cityDistrict}</span>
                <span>•</span>
                <span>⏱️ {contact.availability}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {language === "ur" ? contact.descriptionUr : contact.descriptionEn}
              </p>
            </div>

            {/* Bottom Number and Call / Copy Actions */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Emergency Number</div>
                <div className="text-lg font-black text-amber-400 tracking-wider">
                  {contact.number}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(contact.id, contact.number)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Copy Number"
                >
                  {copiedId === contact.id ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
                </button>

                <a
                  href={`tel:${contact.number}`}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-950/40 transition-transform hover:scale-105"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
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
