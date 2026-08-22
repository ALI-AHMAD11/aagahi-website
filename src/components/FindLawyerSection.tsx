import React, { useState, useEffect } from "react";
import { 
  UserCheck, 
  Star, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MessageSquare, 
  Building, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Loader2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Appointment, Language, Lawyer } from "../types";
import { VERIFIED_LAWYERS } from "../data/legalData";
import { UI_TRANSLATIONS } from "../data/translations";

interface FindLawyerSectionProps {
  language: Language;
  onAppointmentBooked: (appt: Appointment) => void;
  presetCategory?: string;
}

export const FindLawyerSection: React.FC<FindLawyerSectionProps> = ({
  language,
  onAppointmentBooked,
  presetCategory = "",
}) => {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>(presetCategory || "all");
  const [selectedLawyerForBooking, setSelectedLawyerForBooking] = useState<Lawyer | null>(null);

  // Booking Form State
  const [bookingDate, setBookingDate] = useState<string>("2026-08-25");
  const [bookingTime, setBookingTime] = useState<string>("11:00 AM");
  const [consultationType, setConsultationType] = useState<"video" | "in-person" | "phone" | "chat">("video");
  const [citizenName, setCitizenName] = useState("");
  const [citizenPhone, setCitizenPhone] = useState("");
  const [citizenEmail, setCitizenEmail] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const cities = ["all", "Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta", "Faisalabad"];
  const practiceAreas = [
    "all",
    "Property Law",
    "Family Law",
    "Criminal Law",
    "Cyber Law & PECA",
    "Labour Law",
    "Constitutional Law",
    "Human Rights",
  ];

  const filteredLawyers = VERIFIED_LAWYERS.filter((l) => {
    const matchesCity = selectedCity === "all" || l.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesPractice = selectedPracticeArea === "all" || 
      l.practiceAreas.some((p) => p.toLowerCase().includes(selectedPracticeArea.toLowerCase()));
    return matchesCity && matchesPractice;
  });

  const handleOpenBooking = (lawyer: Lawyer) => {
    setSelectedLawyerForBooking(lawyer);
    setBookingSuccess(null);
    if (lawyer.availableSlots.length > 0) {
      setBookingTime(lawyer.availableSlots[0].time);
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLawyerForBooking || !citizenName || !citizenPhone) return;

    setBookingSubmitting(true);

    try {
      const payload = {
        lawyerId: selectedLawyerForBooking.id,
        lawyerName: selectedLawyerForBooking.name,
        citizenName,
        citizenPhone,
        citizenEmail: citizenEmail || "citizen@aagahi.pk",
        caseCategory: selectedLawyerForBooking.practiceAreas[0] || "General Consultation",
        caseDescription,
        date: bookingDate,
        timeSlot: bookingTime,
        consultationType,
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.appointment) {
        setBookingSuccess(data.appointment);
        onAppointmentBooked(data.appointment);
      }
    } catch (err) {
      // Fallback local appointment
      const localAppt: Appointment = {
        id: `AAG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        lawyerId: selectedLawyerForBooking.id,
        lawyerName: selectedLawyerForBooking.name,
        citizenName,
        citizenPhone,
        citizenEmail: citizenEmail || "citizen@aagahi.pk",
        caseCategory: selectedLawyerForBooking.practiceAreas[0] || "General Consultation",
        caseDescription,
        date: bookingDate,
        timeSlot: bookingTime,
        consultationType,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      setBookingSuccess(localAppt);
      onAppointmentBooked(localAppt);
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950 border border-yellow-400/50 text-yellow-300 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] text-xs font-semibold">
          <UserCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>Bar Council Verified Pakistani Advocates</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.lawyerSectionTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          {t.lawyerSectionDesc}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* City Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">City:</span>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-800 text-white rounded-lg px-3 py-1.5 text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Cities (Pakistan)" : c}
              </option>
            ))}
          </select>
        </div>

        {/* Practice Area Filter */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-400 font-semibold shrink-0">Field:</span>
          {practiceAreas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedPracticeArea(area)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                selectedPracticeArea === area
                  ? "bg-amber-600 text-white shadow"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {area === "all" ? "All Practice Areas" : area}
            </button>
          ))}
        </div>
      </div>

      {/* Lawyer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/60 p-5 shadow-xl flex flex-col justify-between transition-all group"
          >
            <div className="space-y-4">
              {/* Profile Card Top */}
              <div className="flex items-start gap-3.5">
                <img
                  src={lawyer.photoUrl}
                  alt={lawyer.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-amber-600/40 shrink-0 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                      {lawyer.name}
                    </h3>
                  </div>
                  <div className="text-xs text-amber-300 font-semibold">
                    {lawyer.title}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Building className="w-3 h-3 text-slate-500" />
                    <span>{lawyer.barAssociation}</span>
                  </div>
                </div>
              </div>

              {/* Bar Verification Badge */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Bar License</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 font-bold">
                  {lawyer.barCouncilNumber}
                </span>
              </div>

              {/* Experience, Rating, City */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="font-bold text-white">{lawyer.experienceYears} Years</div>
                  <div className="text-[10px] text-slate-400">Experience</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex flex-col items-center justify-center">
                  <div className="font-bold text-amber-300 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>{lawyer.rating}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">({lawyer.reviewsCount} reviews)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="font-bold text-white">📍 {lawyer.city}</div>
                  <div className="text-[10px] text-slate-400">{lawyer.province}</div>
                </div>
              </div>

              {/* Practice Areas Chips */}
              <div className="flex flex-wrap gap-1.5">
                {lawyer.practiceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 text-[10px] font-medium border border-amber-800/50"
                  >
                    {area}
                  </span>
                ))}
              </div>

              {/* Short Bio */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {language === "ur" ? lawyer.bioUr : lawyer.bioEn}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Consultation</div>
                <div className="text-sm font-black text-amber-400">
                  {lawyer.isProBonoAvailable ? (
                    <span className="text-amber-400">Pro Bono / Free Available</span>
                  ) : (
                    `PKR ${lawyer.consultationFeePkr.toLocaleString()}`
                  )}
                </div>
              </div>

              <button
                onClick={() => handleOpenBooking(lawyer)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md border border-white/70 transition-transform hover:scale-105"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.bookAppointmentBtn}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Booking Modal */}
      {selectedLawyerForBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-600/70 rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLawyerForBooking(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSuccess ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="space-y-1 pr-6">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Book Legal Consultation
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedLawyerForBooking.name}
                  </h3>
                  <div className="text-xs text-amber-300 font-medium">
                    {selectedLawyerForBooking.title} • {selectedLawyerForBooking.city}
                  </div>
                </div>

                {/* Consultation Type Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    Consultation Method
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "video", label: "Video Call", icon: <Video className="w-4 h-4" /> },
                      { id: "in-person", label: "Office Visit", icon: <Building className="w-4 h-4" /> },
                      { id: "phone", label: "Phone Call", icon: <Phone className="w-4 h-4" /> },
                      { id: "chat", label: "Online Chat", icon: <MessageSquare className="w-4 h-4" /> },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setConsultationType(m.id as any)}
                        className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-colors ${
                          consultationType === m.id
                            ? "bg-amber-800 text-white border-amber-400"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                        }`}
                      >
                        {m.icon}
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300">Select Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-950 rounded-xl border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-300">Available Time Slot</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-slate-950 rounded-xl border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {selectedLawyerForBooking.availableSlots.map((slot, i) => (
                        <option key={i} value={slot.time}>
                          {slot.day} - {slot.time}
                        </option>
                      ))}
                      <option value="11:00 AM">11:00 AM - 11:45 AM</option>
                      <option value="03:30 PM">03:30 PM - 04:15 PM</option>
                      <option value="05:00 PM">05:00 PM - 05:45 PM</option>
                    </select>
                  </div>
                </div>

                {/* Citizen Personal Information */}
                <div className="space-y-3 pt-1 border-t border-slate-800">
                  <div className="text-xs font-bold text-slate-300">Citizen Details (Confidential)</div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      className="bg-slate-950 rounded-xl border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number (e.g. 0300-1234567)"
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      className="bg-slate-950 rounded-xl border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={citizenEmail}
                    onChange={(e) => setCitizenEmail(e.target.value)}
                    className="w-full bg-slate-950 rounded-xl border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <textarea
                    rows={2}
                    placeholder="Brief description of your legal case or question..."
                    value={caseDescription}
                    onChange={(e) => setCaseDescription(e.target.value)}
                    className="w-full bg-slate-950 rounded-xl border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Submit Confirmation Button */}
                <button
                  type="submit"
                  disabled={bookingSubmitting || !citizenName || !citizenPhone}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg border border-white/70 transition-all cursor-pointer"
                >
                  {bookingSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Scheduling Appointment...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>Confirm & Schedule Appointment</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success Screen */
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Appointment Confirmed
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Appointment ID: {bookingSuccess.id}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Your appointment with <span className="text-white font-semibold">{bookingSuccess.lawyerName}</span> has been confirmed.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date:</span>
                    <span className="font-bold text-white">{bookingSuccess.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Slot:</span>
                    <span className="font-bold text-amber-400">{bookingSuccess.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Consultation Method:</span>
                    <span className="font-bold capitalize text-amber-300">{bookingSuccess.consultationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-700/50">
                      Confirmed
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLawyerForBooking(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                >
                  Done / View in Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
