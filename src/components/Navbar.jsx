import React, { useRef, useState, useEffect } from 'react';
import { GB, RU, DE } from 'country-flag-icons/react/3x2';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({
  currentSection = 0,
  scrollToSection,
  currentLang = 'en',
  setLang,
  theme = 'dark',
  setTheme,
  t,
}) {
  const routes = [
    { id: 0, label: t.nav.hero },
    { id: 1, label: t.nav.stack },
    { id: 2, label: t.nav.gaintracker },
    { id: 3, label: t.nav.autowipe },
    { id: 4, label: t.nav.lunapanel },
    { id: 5, label: t.nav.plugins },
    { id: 6, label: t.nav.contact },
  ];

  const languages = [
    { code: 'en', FlagComponent: GB, title: 'English' },
    { code: 'ru', FlagComponent: RU, title: 'Русский' },
    { code: 'de', FlagComponent: DE, title: 'Deutsch' },
  ];

  const navRef = useRef(null);
  const routeRefs = useRef({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Update sliding underline position when currentSection or window resizes
  useEffect(() => {
    const activeElement = routeRefs.current[currentSection];
    if (activeElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const elemRect = activeElement.getBoundingClientRect();

      setUnderlineStyle({
        left: elemRect.left - navRect.left,
        width: elemRect.width,
        opacity: 1,
      });
    }
  }, [currentSection, currentLang]);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex items-center justify-center gap-3 px-4 pointer-events-none">
      {/* Left Sub-Header Capsule: Theme Switcher (Symmetric to Hire Me Capsule) */}
      <div className="pointer-events-auto glass-capsule h-12 rounded-full px-5 flex items-center justify-center gap-3">
        <button
          onClick={() => setTheme('dark')}
          className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
            theme === 'dark'
              ? 'bg-[#6D58F0] text-white shadow-[0_0_12px_rgba(109,88,240,0.6)]'
              : 'text-[#8A8A9E] hover:text-white'
          }`}
          title="Dark Theme"
        >
          <Moon size={15} />
        </button>
        <button
          onClick={() => setTheme('light')}
          className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
            theme === 'light'
              ? 'bg-[#6D58F0] text-white shadow-[0_0_12px_rgba(109,88,240,0.6)]'
              : 'text-[#8A8A9E] hover:text-white'
          }`}
          title="Light Theme"
        >
          <Sun size={15} />
        </button>
      </div>

      {/* Main Center Capsule: Logo + Routes + Language Flags */}
      <header className="pointer-events-auto glass-capsule h-12 rounded-full px-5 flex items-center gap-6 text-xs relative">
        {/* Brand Logo */}
        <button 
          onClick={() => scrollToSection(0)}
          className="font-display font-bold text-sm md:text-base tracking-tight text-current hover:text-[#6D58F0] transition-colors cursor-pointer"
        >
          miron<span className="text-[#6D58F0]">.dev</span>
        </button>

        {/* Menu Routes with Sliding Active Underline Indicator */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-6 text-[14px] font-semibold tracking-[0.01em] relative py-1">
          {routes.map((r) => {
            const isActive = currentSection === r.id;
            return (
              <button
                key={r.id}
                ref={(el) => (routeRefs.current[r.id] = el)}
                onClick={() => scrollToSection(r.id)}
                className={`py-1 transition-colors cursor-pointer z-10 ${
                  isActive
                    ? 'text-current font-bold'
                    : 'text-[#8A8A9E] hover:text-current font-semibold'
                }`}
              >
                {r.label}
              </button>
            );
          })}

          {/* Smooth Sliding Active Underline Bar */}
          <span
            className="absolute bottom-0 h-[2px] bg-[#6D58F0] rounded-full shadow-[0_0_10px_#6D58F0] transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
              opacity: underlineStyle.opacity,
            }}
          />
        </nav>

        {/* Vector SVG Flag Switcher */}
        <div className="flex items-center gap-2 pl-3 border-l border-white/10">
          {languages.map(({ code, FlagComponent, title }) => {
            const isSelected = currentLang === code;
            return (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`p-1 rounded transition-all cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'scale-125 opacity-100 filter drop-shadow-[0_0_10px_rgba(109,88,240,0.9)]'
                    : 'opacity-40 hover:opacity-100 hover:scale-110'
                }`}
                title={title}
              >
                <FlagComponent className="w-5 h-3.5 rounded-sm object-cover" />
              </button>
            );
          })}
        </div>
      </header>

      {/* Right Capsule: Separate "Hire Me" CTA Capsule */}
      <div className="pointer-events-auto glass-capsule h-12 rounded-full px-5 flex items-center justify-center">
        <a
          href="https://www.fiverr.com/miron_npc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8A8A9E] hover:text-current transition-colors flex items-center gap-1 font-semibold text-[14px] tracking-[0.01em]"
        >
          <span>{t.nav.hireMe}</span>
          <span className="text-[#6D58F0] font-bold">→</span>
        </a>
      </div>
    </div>
  );
}
