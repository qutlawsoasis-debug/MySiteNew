import React from 'react';

export default function HeroSection({ onExploreClick, t }) {
  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-16 relative z-10">
      {/* Framed Glass Capsule Container with Fresh Internal Layout */}
      <div className="glass-capsule max-w-5xl w-full mx-auto p-8 md:p-14 rounded-[2.5rem] flex flex-col justify-between min-h-[75vh]">
        
        {/* Top Metadata Line */}
        <div className="flex items-center justify-between text-xs md:text-sm font-mono opacity-80 pb-6 border-b border-current/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#39FF88] shadow-[0_0_10px_#39FF88] animate-pulse" />
            <span className="font-semibold tracking-wider">PORTFOLIO TOPOLOGY</span>
          </div>
          <span className="text-[#39FF88] font-semibold tracking-wider">{t.hero.location}</span>
        </div>

        {/* Central Core Layout: Title, Subtitle, Bio & Quick Tech Tags */}
        <div className="my-auto py-6 space-y-6">
          <div>
            <h1 className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight text-current mb-3">
              {t.hero.title}<span className="text-[#6D58F0]">.</span>
            </h1>
            
            <h2 className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-current opacity-90 tracking-wide uppercase">
              {t.hero.subtitle}
            </h2>
          </div>

          <p className="text-sm md:text-base text-current opacity-75 max-w-2xl leading-relaxed">
            {t.hero.description}
          </p>

          {/* Action Row: Primary Button + Quick Tech Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="text-xs md:text-sm font-semibold px-7 py-3.5 bg-[#6D58F0] !text-white border border-[#6D58F0] hover:bg-[#6D58F0]/90 transition-all shadow-[0_0_25px_rgba(109,88,240,0.4)] hover:scale-105 inline-flex items-center gap-2 cursor-pointer rounded-full"
            >
              <span>{t.hero.cta}</span>
              <span className="font-bold text-base">→</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs opacity-75">
              <span className="px-3 py-1.5 rounded-full bg-current/5 border border-current/10">C# Oxide</span>
              <span className="px-3 py-1.5 rounded-full bg-current/5 border border-current/10">AI Products</span>
              <span className="px-3 py-1.5 rounded-full bg-current/5 border border-current/10">4+ Yrs</span>
            </div>
          </div>
        </div>

        {/* Bottom Section Guide with Crisp Vector Arrow */}
        <div className="pt-6 border-t border-current/10 flex items-center justify-between text-xs md:text-sm opacity-80">
          <span className="font-mono font-semibold">NODE 01 // ENTRY</span>
          <div className="flex items-center gap-2 font-mono font-semibold text-current">
            <span className="text-sm md:text-base">{t.hero.scroll}</span>
            <svg
              className="w-5 h-5 text-[#39FF88] animate-pulse stroke-[2.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
