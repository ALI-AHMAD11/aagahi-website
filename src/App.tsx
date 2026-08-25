return (
    <div className={`min-h-screen flex flex-col bg-[#030712] text-slate-100 relative overflow-x-hidden ${language === "ur" ? "rtl font-sans" : "ltr font-sans"}`}>
      
      {/* Cyberpunk Background Grid & Diagonal Accent Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        {/* Subtle Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Glowing Diagonal Lines */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        
        {/* Faint Cyber Accent Diagonals */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="100%" x2="60%" y2="0" stroke="#06b6d4" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="100%" y1="20%" x2="20%" y2="100%" stroke="#3b82f6" strokeWidth="1" />
        </svg>
      </div>

      {/* Rest of your app content stays wrapped above the background */}
