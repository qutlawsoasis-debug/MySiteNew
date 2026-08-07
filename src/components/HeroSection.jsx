import React from 'react';

/* ─── Timeline step data builder ─── */
function getSteps(t) {
  return [
    { year: null, text: null }, // step 0 = intro
    { year: t.hero.year2022, text: t.hero.text2022 },
    { year: t.hero.year2023, text: t.hero.text2023 },
    { year: t.hero.year2024, text: t.hero.text2024 },
    { year: t.hero.year2025, text: t.hero.text2025 },
    { year: t.hero.year2026, text: t.hero.text2026 },
    { year: t.hero.yearNow, text: t.hero.textNow },
  ];
}

/* ─── Step visual motifs (SVG icons) ─── */
function StepIcon({ step, className }) {
  const icons = {
    1: ( // Gamepad/player motif — started playing Rust
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="6" y="14" width="36" height="22" rx="6" />
        <circle cx="16" cy="25" r="3" />
        <circle cx="32" cy="25" r="3" />
        <line x1="22" y1="22" x2="26" y2="22" opacity="0.4" />
        <line x1="24" y1="20" x2="24" y2="24" opacity="0.4" />
        <line x1="24" y1="36" x2="24" y2="42" opacity="0.3" />
      </svg>
    ),
    2: ( // Code/plugin motif — curious about coding
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <polyline points="16,14 8,24 16,34" />
        <polyline points="32,14 40,24 32,34" />
        <line x1="28" y1="10" x2="20" y2="38" opacity="0.6" />
      </svg>
    ),
    3: ( // Server/network motif — first server co-dev
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="8" y="6" width="32" height="12" rx="2" />
        <rect x="8" y="22" width="32" height="12" rx="2" />
        <circle cx="14" cy="12" r="2" fill="currentColor" />
        <circle cx="14" cy="28" r="2" fill="currentColor" />
        <line x1="20" y1="12" x2="34" y2="12" opacity="0.4" />
        <line x1="20" y1="28" x2="34" y2="28" opacity="0.4" />
        <line x1="24" y1="38" x2="24" y2="44" opacity="0.3" />
        <line x1="18" y1="44" x2="30" y2="44" opacity="0.3" />
      </svg>
    ),
    4: ( // AI/neural motif — growing into AI
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="24" cy="24" r="6" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="36" cy="12" r="3" />
        <circle cx="12" cy="36" r="3" />
        <circle cx="36" cy="36" r="3" />
        <line x1="18" y1="20" x2="14" y2="14" opacity="0.5" />
        <line x1="30" y1="20" x2="34" y2="14" opacity="0.5" />
        <line x1="18" y1="28" x2="14" y2="34" opacity="0.5" />
        <line x1="30" y1="28" x2="36" y2="34" opacity="0.5" />
      </svg>
    ),
    5: ( // Rocket/upward motif — peak achievement year
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M24 6 L30 20 L24 18 L18 20 Z" />
        <rect x="20" y="20" width="8" height="16" rx="1" />
        <path d="M20 36 L16 42" opacity="0.5" />
        <path d="M28 36 L32 42" opacity="0.5" />
        <path d="M24 36 L24 44" opacity="0.4" />
      </svg>
    ),
    6: ( // Compass motif — pivot to AI products
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="24" cy="24" r="16" />
        <polygon points="24,10 28,24 24,28 20,24" fill="currentColor" opacity="0.3" />
        <polygon points="24,38 20,24 24,20 28,24" fill="currentColor" opacity="0.6" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
  };
  return icons[step] || null;
}

export default function HeroSection({ onExploreClick, t, heroStep = 0 }) {
  const steps = getSteps(t);
  const totalSteps = 7;
  const contentSteps = [1, 2, 3, 4, 5, 6];
  const lastStep = 6;

  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative z-10">
      {/* ── Background timeline progress line (vertical, centered) ── */}
      <div className="absolute left-1/2 top-[15%] bottom-[15%] w-[2px] -translate-x-1/2 bg-current/5">
        <div
          className="w-full bg-[#6D58F0] transition-all duration-700 ease-out origin-top"
          style={{ height: `${(heroStep / (totalSteps - 1)) * 100}%`, boxShadow: '0 0 12px rgba(109,88,240,0.4)' }}
        />
      </div>

      {/* ── Step 0 — Intro ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-600 ease-out"
        style={{
          opacity: heroStep === 0 ? 1 : 0,
          transform: heroStep === 0 ? 'translateY(0) scale(1)' : 'translateY(-40px) scale(0.95)',
          pointerEvents: heroStep === 0 ? 'auto' : 'none',
        }}
      >
        <h1 className="font-display font-bold text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tight text-center">
          {t.hero.title}<span className="text-[#6D58F0]">.</span>
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-current/60 tracking-wide uppercase font-display font-semibold">
          {t.hero.step0Tagline}
        </p>
        <div className="mt-10 flex flex-col items-center gap-2 text-current/30 animate-bounce">
          <span className="text-xs tracking-widest uppercase">{t.hero.step0Hint || 'scroll to explore'}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 4 L10 16 M5 11 L10 16 L15 11" />
          </svg>
        </div>
      </div>

      {/* ── Steps 1-6 — Timeline entries ── */}
      {contentSteps.map((i) => {
        const step = steps[i];
        const isActive = heroStep === i;
        const isPast = heroStep > i;

        return (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center px-6 transition-all duration-600 ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? 'translateY(0) scale(1)'
                : isPast
                  ? 'translateY(-60px) scale(0.92)'
                  : 'translateY(60px) scale(0.92)',
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-4xl w-full">
              {/* Left: Year + Icon */}
              <div className="flex flex-col items-center md:items-end md:flex-1 gap-4">
                <div
                  className="transition-all duration-500 ease-out"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(0.8)',
                    opacity: isActive ? 1 : 0.3,
                  }}
                >
                  <StepIcon step={i} className="w-12 h-12 md:w-16 md:h-16 text-[#6D58F0]" />
                </div>
                <span
                  className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-current transition-all duration-500"
                  style={{
                    textShadow: isActive ? '0 0 40px rgba(109,88,240,0.3)' : 'none',
                    color: isActive ? '#6D58F0' : 'currentColor',
                  }}
                >
                  {step.year}
                </span>
              </div>

              {/* Center dot on timeline */}
              <div className="hidden md:flex flex-col items-center gap-0">
                <div
                  className="w-4 h-4 rounded-full border-2 border-[#6D58F0] bg-[#0A0A0F] transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? '#6D58F0' : 'transparent',
                    boxShadow: isActive ? '0 0 16px rgba(109,88,240,0.5)' : 'none',
                  }}
                />
              </div>

              {/* Right: Description */}
              <div className="flex flex-col items-center md:items-start md:flex-1 gap-4">
                <p
                  className="text-sm md:text-base lg:text-lg text-current/70 max-w-sm leading-relaxed transition-all duration-500 delay-100"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                  }}
                >
                  {step.text}
                </p>
                {/* CTA on last step */}
                {i === lastStep && isActive && (
                  <button
                    onClick={onExploreClick}
                    className="mt-4 px-6 py-3 bg-[#6D58F0] text-white rounded-full font-semibold text-sm tracking-wide hover:bg-[#5a47d6] transition-all duration-300 shadow-[0_0_24px_rgba(109,88,240,0.4)] hover:shadow-[0_0_36px_rgba(109,88,240,0.6)] hover:scale-105 cursor-pointer"
                  >
                    {t.hero.ctaHire || 'Contact'} →
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Bottom progress indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: heroStep === i ? '24px' : '6px',
              height: '6px',
              backgroundColor: heroStep >= i ? '#6D58F0' : 'rgba(255,255,255,0.12)',
              boxShadow: heroStep === i ? '0 0 8px rgba(109,88,240,0.5)' : 'none',
            }}
          />
        ))}
      </div>
    </section>
  );
}
