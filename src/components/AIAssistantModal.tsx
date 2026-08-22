import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  X, 
  Send, 
  Scale, 
  User, 
  Loader2, 
  ShieldAlert, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2,
  RefreshCw,
  PhoneCall
} from "lucide-react";
import { Language } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  openEmergencyModal: () => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  openEmergencyModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "assistant",
      text: language === "ur"
        ? "السلام علیکم! میں آگاہی کا قانونی معاون ہوں۔ میں آئینِ پاکستان (1973)، تعزیراتِ پاکستان (PPC)، ضابطہ فوجداری (CrPC)، اور سائبر قوانین (PECA) کے مطابق آپ کی رہنمائی کے لیے حاضر ہوں۔ آپ مجھ سے اردو یا انگریزی میں کوئی بھی قانونی سوال پوچھ سکتے ہیں۔"
        : "Assalam-o-Alaikum! I am the AAGAHI Legal AI Assistant. I can guide you regarding the Constitution of Pakistan (1973), Pakistan Penal Code (PPC), Code of Criminal Procedure (CrPC), PECA Cyber Laws, and family/property rights. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsgText = inputText.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      // Build conversation history for API
      const conversationHistory = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        content: m.text,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsgText,
          conversationHistory,
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || "Failed to generate reply");
      }
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: "Under Pakistani statutory law and Constitution Article 4 & 10A, every citizen is entitled to protection of law and due process. For immediate assistance with this matter, you can lodge an inquiry or consult a Bar Council registered Advocate. (Note: For urgent criminal threats, contact Police at 15 or FIA Cyber Crime at 1991).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-600/70 rounded-2xl w-full max-w-2xl h-[85vh] flex flex-col text-white shadow-2xl overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-4 bg-slate-950 border-b border-amber-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-400 flex items-center justify-center shadow">
              <Scale className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  AAGAHI Legal AI Assistant
                </h3>
                <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-urdu text-[10px] border border-amber-800">
                  قانونی معاون
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Grounded in Constitution of Pakistan 1973 & Statutory Codes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openEmergencyModal}
              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Emergency</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === "user"
                    ? "bg-slate-800 text-slate-300"
                    : "bg-amber-800 text-amber-300 border border-amber-500/50"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm space-y-1.5 shadow-md ${
                  msg.sender === "user"
                    ? "bg-amber-700 text-white rounded-tr-none"
                    : "bg-slate-800/90 text-slate-200 border border-slate-700 rounded-tl-none"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/50">
                  <span>{msg.timestamp}</span>
                  {msg.sender === "assistant" && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-amber-300 flex items-center gap-0.5"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-slate-400 text-xs p-2">
              <div className="w-7 h-7 rounded-lg bg-amber-950 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              </div>
              <span>Analyzing Pakistani statutes and legal rights...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-500 shrink-0">Try:</span>
          {[
            "Police arrested without FIR",
            "Someone grabbed my plot",
            "Cyber harassment on Instagram",
            "Salary withheld by employer",
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(prompt);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 border border-slate-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask any legal question in English, Urdu (اردو), or Roman Urdu..."
            className="flex-1 bg-slate-900 text-white rounded-xl border border-slate-700 px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 border border-white/70 transition-all shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Disclaimer Footer */}
        <div className="bg-slate-950 px-4 py-1.5 text-center text-[10px] text-slate-500 border-t border-slate-900">
          AAGAHI provides legal awareness. Not a substitute for formal courtroom representation by a licensed Advocate.
        </div>
      </div>
    </div>
  );
};
