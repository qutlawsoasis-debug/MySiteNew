import React, { useRef, useState, useEffect } from 'react';
import DeformableMeshBackground from './components/DeformableMeshBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServerConsole from './components/ServerConsole';
import ProjectPanel from './components/ProjectPanel';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';
import { translations } from './i18n/translations';

const projects = [
  {
    id: 'gain_tracker',
    title: 'GainTracker',
    tag: 'Telegram Mini App / AI',
    role: 'Full-Stack & Prompt Engineering',
    fact: 'AI-powered nutrition and weight tracking app built as a Telegram Mini App.',
    stackSummary: 'React + Node.js + Supabase + Gemini AI',
    image: '/assets/gain_tracker.jpg',
    status: 'LIVE',
    details: 'GainTracker replaces complex calorie counters with AI image recognition. Users snap a meal photo inside Telegram, and Gemini Vision AI estimates calories, macros, and logs daily targets directly to Supabase.',
    techList: ['React 19', 'Telegram Mini Apps API', 'Node.js', 'Supabase', 'Gemini Vision AI', 'TailwindCSS'],
    github: 'https://github.com/qutlawsoasis-debug/newTracker.git',
    link: null,
  },
  {
    id: 'autowipe_engine',
    title: 'Autowipe Engine',
    tag: 'Game Server Automation',
    role: 'Lead Developer & Architect',
    fact: 'Admin automation tool for Rust game servers. Auto-wipes, Discord webhooks & Rustmaps API.',
    stackSummary: 'Node.js + Discord API + RustMaps API + Cron',
    image: '/assets/autowipe_engine.jpg',
    status: 'ACTIVE',
    details: 'Eliminates manual admin work for Rust server owners. Automatically triggers server wipes, posts map voting polls to Discord, generates custom procedural maps via RustMaps API, and sends real-time commits.',
    techList: ['Node.js', 'Discord.js API', 'RustMaps API', 'Cron Schedulers', 'Oxide RCON WebSockets'],
    github: 'https://github.com/qutlawsoasis-debug/Autowipe-Project',
    link: null,
  },
  {
    id: 'lunapanel',
    title: 'LunaPanel',
    tag: 'SaaS Control Panel',
    role: 'Creator & Backend Engineer',
    fact: 'High-performance Rust game server administration panel & real-time telemetry dashboard.',
    stackSummary: 'React + WebSockets + C# Oxide Hooks',
    image: '/assets/lunapanel.jpg',
    status: 'LIVE',
    details: 'Centralized web dashboard for server administrators to manage live game servers, monitor CPU/RAM metrics, manage player bans, and configure C# Oxide plugins in real-time.',
    techList: ['React', 'WebSocket Live Streams', 'C# Oxide API', 'TailwindCSS', 'PostgreSQL'],
    github: null,
    link: 'https://www.fiverr.com/miron_npc',
  },
  {
    id: 'rust_plugins',
    title: 'Oxide C# Plugins',
    tag: 'Server Infrastructure',
    role: 'Plugin Developer (C#)',
    fact: 'Suite of custom C# Oxide/uMod plugins for Rust server administration & gameplay mechanics.',
    stackSummary: 'C# + Oxide Framework',
    image: '/assets/rust_plugins.jpg',
    status: '4+ YEARS',
    details: 'Over 4 years of developing low-level C# plugins for Rust game servers. Custom combat mechanics, in-game economy, automated anti-cheat hooks, and live leaderboards.',
    techList: ['C#', 'Oxide Framework', 'uMod API', 'Harmony Game Patches', 'SQLite'],
    github: 'https://github.com/qutlawsoasis-debug',
    link: null,
  },
];

const HERO_STEPS = 7;

export default function App() {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const targetScrollLeftRef = useRef(0);
  const isScrollingRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [heroStep, setHeroStep] = useState(0);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const heroStepRef = useRef(0);

  // Detect initial language from URL ?lang=ru or browser locale
  const getInitialLang = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ['en', 'ru', 'de'].includes(langParam.toLowerCase())) {
      return langParam.toLowerCase();
    }
    const navLang = navigator.language ? navigator.language.substring(0, 2).toLowerCase() : 'en';
    return ['en', 'ru', 'de'].includes(navLang) ? navLang : 'en';
  };

  const [lang, setLangState] = useState(getInitialLang);

  // Full page reload with URL parameter update on language change
  const setLang = (newLang) => {
    if (newLang === lang) return;
    const url = new URL(window.location);
    url.searchParams.set('lang', newLang);
    window.location.href = url.toString();
  };

  useEffect(() => {
    heroStepRef.current = heroStep;
  }, [heroStep]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-theme', theme);
  }, [lang, theme]);

  const t = translations[lang] || translations.en;
  const totalSections = 7;

  const scrollToSection = (secIndex) => {
    setProjectsOpen(secIndex >= 3 && secIndex <= 6);
    const container = containerRef.current;
    if (!container) return;
    const section = sectionRefs.current[secIndex];
    const target = section
      ? container.scrollLeft + section.getBoundingClientRect().left - container.getBoundingClientRect().left
      : 0;
    targetScrollLeftRef.current = target;
    setCurrentSection(secIndex);
    if (secIndex === 0) setHeroStep(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;

    sectionRefs.current = Array.from(container.children);
    const syncTargetToCurrentSection = () => {
      const section = sectionRefs.current[currentSection];
      if (!section) return;
      targetScrollLeftRef.current = container.scrollLeft
        + section.getBoundingClientRect().left
        - container.getBoundingClientRect().left;
    };
    const resizeObserver = new ResizeObserver(syncTargetToCurrentSection);
    resizeObserver.observe(container);

    const smoothScroll = () => {
      const currentScrollLeft = container.scrollLeft;
      const diff = targetScrollLeftRef.current - currentScrollLeft;

      if (Math.abs(diff) > 0.5) {
        container.scrollLeft += diff * 0.18;
        
        const maxScroll = container.scrollWidth - container.clientWidth;
        const progress = Math.max(0, Math.min(1, container.scrollLeft / maxScroll));
        setScrollProgress(progress);
      } else {
        container.scrollLeft = targetScrollLeftRef.current;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    // Discrete section wheel scroll with hero step interception
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrollingRef.current) return;

      const scrollDelta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (Math.abs(scrollDelta) < 15) return;

      const forward = scrollDelta > 0;
      const hs = heroStepRef.current;

      if (currentSection === 0 && forward && hs < HERO_STEPS - 1) {
        setHeroStep(hs + 1);
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 450);
      } else if (currentSection === 0 && !forward && hs > 0) {
        setHeroStep(hs - 1);
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 450);
      } else if (currentSection === 0 && forward && hs >= HERO_STEPS - 1) {
        scrollToSection(1);
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 450);
      } else if (currentSection === 1 && !forward) {
        scrollToSection(0);
        setHeroStep(HERO_STEPS - 1);
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 450);
      } else if (forward && currentSection < totalSections - 1) {
        scrollToSection(currentSection + 1);
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 450);
      } else if (!forward && currentSection > 0) {
        scrollToSection(currentSection - 1);
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 450);
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      if (activeElement?.matches('button, a, input, textarea, select, [contenteditable]')
        || activeElement?.closest?.('[contenteditable]')) return;
      const hs = heroStepRef.current;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (currentSection === 0 && hs < HERO_STEPS - 1) {
          setHeroStep(hs + 1);
        } else if (currentSection === 0 && hs >= HERO_STEPS - 1) {
          scrollToSection(1);
        } else if (currentSection < totalSections - 1) {
          scrollToSection(currentSection + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection === 0 && hs > 0) {
          setHeroStep(hs - 1);
        } else if (currentSection === 1) {
          scrollToSection(0);
          setHeroStep(HERO_STEPS - 1);
        } else if (currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    // Click-to-Scroll Zones
    const handleClick = (e) => {
      if (e.target.closest('button, a, input, pre, code, [role="button"]')) return;

      const isRight = e.clientX >= window.innerWidth * 0.5;
      const hs = heroStepRef.current;

      if (isRight && currentSection === 0 && hs < HERO_STEPS - 1) {
        setHeroStep(hs + 1);
      } else if (!isRight && currentSection === 0 && hs > 0) {
        setHeroStep(hs - 1);
      } else if (isRight && currentSection === 0 && hs >= HERO_STEPS - 1) {
        scrollToSection(1);
      } else if (!isRight && currentSection === 1) {
        scrollToSection(0);
        setHeroStep(HERO_STEPS - 1);
      } else if (isRight && currentSection < totalSections - 1) {
        scrollToSection(currentSection + 1);
      } else if (!isRight && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [currentSection, totalSections]);

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-500 ${
        theme === 'light' ? 'bg-[#F8F9FC] text-[#0F172A]' : 'bg-[#0A0A0F] text-[#F5F4FA]'
      }`}
      data-theme={theme}
    >
      {/* Custom Floating Cursor */}
      <CustomCursor
        theme={theme}
        currentSection={currentSection}
        totalSections={totalSections}
      />

      {/* 3D Deformable Wireframe Mesh Background */}
      <DeformableMeshBackground scrollProgress={scrollProgress} theme={theme} />

      {/* Floating Glass Pill Navbar Header */}
        <Navbar
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        currentLang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
          t={t}
          onProjectsOpen={() => setProjectsOpen((open) => !open)}
          projectsOpen={projectsOpen}
      />

      {/* Main Horizontal Scroll Container */}
      <main
        ref={containerRef}
        className="w-full h-full flex flex-row overflow-x-auto overflow-y-hidden scrollbar-none relative z-10"
        style={{ scrollSnapType: 'none' }}
      >
        {/* Section 01: Hero */}
        <HeroSection onExploreClick={() => scrollToSection(1)} t={t} heroStep={heroStep} />

        {/* Section 02: About / Stack */}
        <ServerConsole t={t} />

        {/* Section 03 - 06: Projects Rack Panels */}
        {/* Section 03: Contact Gateway */}
        <ContactSection t={t} />

        {/* Sections 04–07: Projects */}
        {projects.map((proj) => (
          <ProjectPanel key={proj.id} project={proj} t={t} />
        ))}
      </main>

      {/* Horizontal Nav Arrows Overlay */}
      <div className="fixed bottom-6 right-8 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            if (currentSection === 0 && heroStep > 0) {
              setHeroStep(heroStep - 1);
            } else {
              if (currentSection === 1) setHeroStep(HERO_STEPS - 1);
              scrollToSection(Math.max(0, currentSection - 1));
            }
          }}
          disabled={currentSection === 0 && heroStep === 0}
          className="w-10 h-10 rounded-full glass-capsule flex items-center justify-center text-current hover:border-[#6D58F0] hover:text-[#39FF88] disabled:opacity-30 disabled:hover:border-white/10 transition-all cursor-pointer"
          title="Previous section"
        >
          ←
        </button>
        <button
          onClick={() => {
            if (currentSection === 0 && heroStep < HERO_STEPS - 1) {
              setHeroStep(heroStep + 1);
            } else {
              scrollToSection(Math.min(totalSections - 1, currentSection + 1));
            }
          }}
          disabled={currentSection === totalSections - 1}
          className="w-10 h-10 rounded-full glass-capsule flex items-center justify-center text-current hover:border-[#6D58F0] hover:text-[#39FF88] disabled:opacity-30 disabled:hover:border-white/10 transition-all cursor-pointer"
          title="Next section"
        >
          →
        </button>
      </div>
    </div>
  );
}
