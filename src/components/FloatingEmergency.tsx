import React, { useState } from "react";
import { 
  PhoneCall, 
  ShieldAlert, 
  Sparkles, 
  Scale, 
  X, 
  Ambulance, 
  Lock, 
  Users,
  ChevronUp
} from "lucide-react";
import { Language } from "../types";

interface FloatingEmergencyProps {
  onOpenEmergencyModal: () => void;
  onOpenAIAssistant: () => void;
  language: Language;
}

export const FloatingEmergency: React.FC<FloatingEmergencyProps> = ({
  onOpenEmergencyModal,
  onOpenAIAssistant,
  language,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Quick expanded drawer */}
      {expanded && (
        <div className="bg-slate-900 border-2 border-rose-600/70 rounded-2xl p-3 shadow-2xl text-white space-y-2 mb-1 w-64 animate-fade-in backdrop-blur-md">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Pakistani Emergency Direct</span>
            </span>
            <button
              onClick={() => setExpanded(false)}
              className="p-1 rounded hover:bg-slate-800 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <a
              href="tel:15"
              className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700/60 flex flex-col items-center justify-center transition-colors"
            >
              <span className="text-[10px] text-slate-400">Police</span>
              <span className="text-sm font-black text-rose-300">15</span>
            </a>

            <a
              href="tel:1122"
              className="p-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-700/60 flex flex-col items-center justify-center transition-colors"
            >
              <span className="text-[10px] text-slate-400">Rescue</span>
              <span className="text-sm font-black text-amber-300">1122</span>
            </a>

            <a
              href="tel:1991"
              className="p-2 rounded-xl bg-sky-950/80 hover:bg-sky-900 text-sky-200 border border-sky-700/60 flex flex-col items-center justify-center transition-colors"
            >
              <span className="text-[10px] text-slate-400">FIA Cyber</span>
              <span className="text-sm font-black text-sky-300">1991</span>
            </a>

            <a
              href="tel:1099"
              className="p-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-700/60 flex flex-col items-center justify-center transition-colors"
            >
              <span className="text-[10px] text-slate-400">MoHR Rights</span>
              <span className="text-sm font-black text-amber-300">1099</span>
            </a>
          </div>

          <button
            onClick={() => {
              setExpanded(false);
              onOpenEmergencyModal();
            }}
            className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 text-center"
          >
            View All Emergency Numbers →
          </button>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="flex items-center gap-2">
        {/* AI Assistant Floating Button — distinct sky-blue color & "Chat" wording so it
            reads as a separate live-conversation tool, not the same as the Problem Solver's
            one-time "Analyze" report above on the homepage. */}
        <button
          onClick={onOpenAIAssistant}
          className="p-3 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white shadow-xl shadow-sky-950/60 border border-sky-400/50 flex items-center gap-2 hover:scale-105 transition-all group"
          title="Chat live with AAGAHI AI Assistant (ongoing conversation)"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="text-xs font-bold hidden sm:inline pr-1">Chat with AAGAHI</span>
        </button>

        {/* Emergency Trigger Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-3 sm:px-4 sm:py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-950/70 border border-rose-400/60 flex items-center gap-2 hover:scale-105 transition-all animate-subtle-pulse cursor-pointer"
          title="Emergency Help Pakistan"
        >
          <ShieldAlert className="w-5 h-5 text-amber-300" />
          <span className="text-xs font-extrabold hidden sm:inline">🚨 Emergency Help</span>
        </button>
      </div>
    </div>
  );
};
