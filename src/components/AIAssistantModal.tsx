import React, { useState, useRef, useEffect } from "react";
import {
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
  AlertTriangle,
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
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  retryText?: string;
}

type ConnectionStatus = "online" | "offline" | "checking";

const REQUEST_TIMEOUT_MS = 20000;

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
      text:
        language === "ur"
          ? "السلام علیکم! میں آگاہی کا قانونی معاون ہوں۔ میں آئینِ پاکستان (1973)، تعزیراتِ پاکستان (PPC)، ضابطہ فوجداری (CrPC)، اور سائبر قوانین (PECA) کے مطابق آپ کی رہنمائی کے لیے حاضر ہوں۔ آپ مجھ سے اردو یا انگریزی میں کوئی بھی قانونی سوال پوچھ سکتے ہیں۔"
          : "Assalam-o-Alaikum! I am the AAGAHI Legal AI Assistant. I can guide you regarding the Constitution of Pakistan (1973), Pakistan Penal Code (PPC), Code of Criminal Procedure (CrPC), PECA Cyber Laws, and family/property rights. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("online");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeNow = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Classifies failures so we can show an honest, specific, professional message
  // instead of a generic error OR a fabricated fake answer.
  const requestReply = async (userText: string, history: ChatMessage[]): Promise<string> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const conversationHistory = history
        .filter((m) => m.sender !== "system")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          content: m.text,
        }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, conversationHistory, language }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP_${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.reply) {
        return data.reply as string;
      }
      throw new Error(data.error || "INVALID_RESPONSE");
    } catch (err: any) {
      if (err?.name === "AbortError") {
        throw new Error("TIMEOUT");
      }
      throw err instanceof Error ? err : new Error("UNKNOWN");
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const errorMessageFor = (err: unknown): string => {
    const code = err instanceof Error ? err.message : "UNKNOWN";
    if (code === "TIMEOUT") {
      return "AAGAHI AI is taking longer than expected to respond. Please check your connection and try again.";
    }
    if (code.startsWith("HTTP_5")) {
      return "AAGAHI AI is temporarily unavailable. Please try again in a moment.";
    }
    if (code === "Failed to fetch" || code === "NetworkError" || code === "UNKNOWN") {
      return "AAGAHI AI couldn't be reached. Please check your internet connection and try again.";
    }
    return "AAGAHI AI is temporarily unavailable. Please try again in a moment.";
  };

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const userMsgText = (overrideText ?? inputText).trim();
    if (!userMsgText || loading) return;

    let historyForRequest = messages;

    if (!overrideText) {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: "user",
        text: userMsgText,
        timestamp: timeNow(),
      };
      historyForRequest = [...messages, userMsg];
      setMessages(historyForRequest);
      setInputText("");
    }

    setLoading(true);

    try {
      const reply = await requestReply(userMsgText, historyForRequest);
      setConnectionStatus("online");
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: reply,
        timestamp: timeNow(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setConnectionStatus("offline");
      const systemMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "system",
        text: errorMessageFor(err),
        timestamp: timeNow(),
        retryText: userMsgText,
      };
      setMessages((prev) => [...prev, systemMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = (text: string) => {
    handleSendMessage(undefined, text);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 motion-safe:animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AAGAHI Legal AI Assistant"
        className={`bg-slate-900 border border-amber-600/50 rounded-2xl w-full flex flex-col text-white shadow-2xl overflow-hidden relative transition-[max-width,height] duration-300 ${
          expanded ? "max-w-5xl h-[92vh]" : "max-w-2xl h-[85vh]"
        }`}
      >
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-amber-900/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-400/60 flex items-center justify-center shadow shrink-0">
              <Scale className="w-5 h-5 text-amber-200" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                  AAGAHI Legal AI Assistant
                </h3>
                <span
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${
                    connectionStatus === "offline"
                      ? "bg-rose-950 text-rose-300 border-rose-800"
                      : "bg-emerald-950 text-emerald-300 border-emerald-800"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      connectionStatus === "offline" ? "bg-rose-400" : "bg-emerald-400"
                    }`}
                  />
                  {connectionStatus === "offline" ? "Unavailable" : "Online"}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                Grounded in the Constitution of Pakistan (1973) &amp; statutory law
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={openEmergencyModal}
              aria-label="Open emergency contacts"
              className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
            >
              <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Emergency</span>
            </button>
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Collapse chat window" : "Expand chat window"}
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close AI assistant"
              className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          {messages.map((msg) => {
            if (msg.sender === "system") {
              return (
                <div key={msg.id} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-rose-950 text-rose-300 border border-rose-800">
                    <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-tl-none p-3.5 text-xs sm:text-sm bg-rose-950/40 border border-rose-900 text-rose-100 space-y-2.5">
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.retryText && (
                      <button
                        onClick={() => handleRetry(msg.retryText!)}
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-rose-800 hover:bg-rose-700 text-white text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                      >
                        <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
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
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/50">
                    <span>{msg.timestamp}</span>
                    {msg.sender === "assistant" && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        aria-label="Copy response"
                        className="hover:text-amber-300 flex items-center gap-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 rounded"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-amber-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2.5 text-slate-400 text-xs p-2">
              <div className="w-7 h-7 rounded-lg bg-amber-950 flex items-center justify-center">
                <Loader2 className="w-4 h-4 motion-safe:animate-spin text-amber-400" aria-hidden="true" />
              </div>
              <span>Analyzing Pakistani statutes and legal rights...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-500 shrink-0">Try:</span>
          {[
            "Police arrested without FIR",
            "Someone grabbed my plot",
            "Cyber harassment on Instagram",
            "Salary withheld by employer",
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInputText(prompt)}
              className="px-2.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 border border-slate-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <label htmlFor="aagahi-ai-input" className="sr-only">
            Ask a legal question
          </label>
          <input
            id="aagahi-ai-input"
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask any legal question in English or Urdu (اردو)..."
            className="flex-1 h-11 sm:h-12 bg-slate-900 text-white rounded-xl border border-slate-700 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            aria-label="Send message"
            className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 border border-white/70 transition-all shadow-md"
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
