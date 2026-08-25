import React from "react";

interface LegalLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const LegalLogo: React.FC<LegalLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
}) => {
  const iconDimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-13 h-13",
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-amber-800 via-amber-950 to-slate-950 p-0.5 border border-white/50 shadow-lg shadow-amber-950/60 flex items-center justify-center group overflow-hidden`}
      >
        <div className="absolute inset-0 bg-radial from-white/20 via-amber-400/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1 text-amber-300 transform group-hover:scale-105 transition-transform duration-300"
        >
          <line x1="24" y1="10" x2="24" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="9" r="2.5" fill="currentColor" />
          <path d="M10 16C16 14.5 32 14.5 38 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

          <line x1="12" y1="16" x2="8" y2="25" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="16" x2="16" y2="25" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M6 25C7 29 17 29 18 25Z"
            fill="currentColor"
            fillOpacity="0.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <line x1="36" y1="16" x2="32" y2="25" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="16" x2="40" y2="25" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M30 25C31 29 41 29 42 25Z"
            fill="currentColor"
            fillOpacity="0.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <rect
            x="20"
            y="29"
            width="14"
            height="5"
            rx="1.5"
            transform="rotate(-28 20 29)"
            fill="#f59e0b"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line x1="26" y1="31" x2="38" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

          <path d="M16 41H32" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <path d="M19 38H29" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
              AAGAHI
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-900/90 text-amber-300 font-urdu font-bold border border-amber-700/60 leading-none">
              آگاہی
            </span>
          </div>
          <span className="text-[10px] font-semibold text-amber-300/90 tracking-tight mt-0.5 font-urdu">
            آپ کا حق، آپ کی آگاہی
          </span>
        </div>
      )}
    </div>
  );
};
