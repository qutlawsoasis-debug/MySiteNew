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
  const isProjectsSection = currentSection >= 2 && currentSection <= 5;
  const shouldExpand = isProjectsSection;

  const topRoutes = [
    { id: 0, targetSec: 0, label: t.nav.hero },
    { id: 1, targetSec: 1, label: t.nav.stack },
    { id: 'projects', targetSec: 2, label: t.nav.projects || 'Проекты', isProjectsGroup: true },
    { id: 6, targetSec: 6, label: t.nav.contact },
  ];

  const projectItems = [
    { id: 2, label: t.nav.gaintracker },
    { id: 3, label: t.nav.autowipe },
    { id: 4, label: t.nav.lunapanel },
    { id: 5, label: t.nav.plugins },
  ];

  const languages = [
    { code: 'en', FlagComponent: GB, title: 'English' },
    { code: 'ru', FlagComponent: RU, title: 'Русский' },
    { code: 'de', FlagComponent: DE, title: 'Deutsch' },
  ];

  const navRef = useRef(null);
  const routeRefs = useRef({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Update sliding underline position when active section or language changes
  useEffect(() => {
    const activeRouteKey = isProjectsSection ? 'projects' : currentSection;
    const activeElement = routeRefs.current[activeRouteKey];
    if (activeElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const elemRect = activeElement.getBoundingClientRect();

      setUnderlineStyle({
        left: elemRect.left - navRect.left,
        width: elemRect.width,
        opacity: 1,
      });
    }
  }, [currentSection, currentLang, isProjectsSection]);

  // Exact 90-Degree Stepped Corners with Fillet Rounding (Strict non-overshooting Y=47 collapse)
  const pathCollapsed =
    'M 24 1 H 646 C 658.7 1 669 11.3 669 24 C 669 36.7 658.7 47 646 47 H 534 C 527.7 47 520 47 520 47 V 47 C 520 47 513.3 47 506 47 H 164 C 156.7 47 150 47 150 47 V 47 C 150 47 142.3 47 136 47 H 24 C 11.3 47 1 36.7 1 24 C 1 11.3 11.3 1 24 1 Z';

  const pathExpanded =
    'M 24 1 H 646 C 658.7 1 669 11.3 669 24 C 669 36.7 658.7 47 646 47 H 534 C 527.7 47 520 54.3 520 61 V 72 C 520 79.7 513.3 86 506 86 H 164 C 156.7 86 150 79.7 150 72 V 61 C 150 54.3 142.3 47 136 47 H 24 C 11.3 47 1 36.7 1 24 C 1 11.3 11.3 1 24 1 Z';

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex items-start justify-center gap-3 px-4 pointer-events-none">
      {/* Left Sub-Header Capsule: Theme Switcher */}
      <div className="pointer-events-auto glass-capsule h-12 rounded-full px-5 flex items-center justify-center gap-3">
        <button
          onClick={() => setTheme('dark')}
          aria-pressed={theme === 'dark'}
          className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
            theme === 'dark'
              ? 'bg-[#6D58F0] text-white shadow-[0_0_12px_rgba(109,88,240,0.6)]'
              : 'text-[var(--color-text-muted)] hover:text-current'
          }`}
          title="Dark Theme"
        >
          <Moon size={15} />
        </button>
        <button
          onClick={() => setTheme('light')}
          aria-pressed={theme === 'light'}
          className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
            theme === 'light'
              ? 'bg-[#6D58F0] text-[#0F172A] shadow-[0_0_12px_rgba(109,88,240,0.6)]'
              : 'text-[var(--color-text-muted)] hover:text-current'
          }`}
          title="Light Theme"
        >
          <Sun size={15} />
        </button>
      </div>

      {/* Main Center Header: Single Continuous Morphing SVG Path Glass Component */}
      <header className="pointer-events-auto relative w-[670px] h-[90px] flex flex-col justify-start">
        {/* Pure SVG Path Morphing Outer Background & Border */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 670 90"
        >
          <path
            d={shouldExpand ? pathExpanded : pathCollapsed}
            className="transition-[d] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
            fill={theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.07)'}
            stroke={theme === 'light' ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.18)'}
            strokeWidth="1.25"
            style={{
              backdropFilter: 'blur(6px) saturate(140%)',
              WebkitBackdropFilter: 'blur(6px) saturate(140%)',
            }}
          />
        </svg>

        {/* Top Primary Navigation Row */}
        <div className="h-12 px-6 flex items-center justify-between gap-6 relative z-10">
          {/* Brand Logo */}
          <button 
            onClick={() => scrollToSection(0)}
            className="font-display font-bold text-sm md:text-base tracking-tight text-current hover:text-[#6D58F0] transition-colors cursor-pointer"
          >
            miron<span className="text-[#6D58F0]">.dev</span>
          </button>

          {/* Top Menu Routes with Sliding Active Underline */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-6 text-[14px] font-semibold tracking-[0.01em] relative py-1">
            {topRoutes.map((r) => {
              const isActive = r.isProjectsGroup ? isProjectsSection : currentSection === r.id;
              return (
                <button
                  key={r.id}
                  ref={(el) => (routeRefs.current[r.id] = el)}
                  onClick={() => scrollToSection(r.targetSec)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-1 transition-colors cursor-pointer z-10 ${
                    isActive
                      ? 'text-current font-bold'
                      : 'text-[var(--color-text-muted)] hover:text-current font-semibold'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}

            {/* Smooth Sliding Active Underline Indicator Bar */}
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
        </div>

        {/* Sub-Navigation Area: Floats Seamlessly Inside the Morphed 90-Degree SVG Stepped Protrusion */}
        <div
          className={`relative z-10 transition-all duration-300 ease-out flex items-center justify-center ${
            shouldExpand
              ? 'opacity-100 translate-y-2.5 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-4 font-mono text-xs">
            {projectItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#6D58F0] text-white shadow-[0_0_12px_rgba(109,88,240,0.6)] font-semibold scale-105'
                      : 'text-[var(--color-text-muted)] hover:text-current font-medium'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Right Capsule: Separate "Hire Me" CTA Capsule */}
      <div className="pointer-events-auto glass-capsule h-12 rounded-full px-5 flex items-center justify-center">
        <a
          href="https://www.fiverr.com/miron_npc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-muted)] hover:text-current transition-colors flex items-center gap-1 font-semibold text-[14px] tracking-[0.01em]"
        >
          <span>{t.nav.hireMe}</span>
          <span className="text-[#6D58F0] font-bold">→</span>
        </a>
      </div>
    </div>
  );
}
