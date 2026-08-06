import React from 'react';

export default function ServerConsole({ t }) {
  const stackGroups = [
    {
      category: t.console.categories.systems,
      items: ['C# .NET', 'Oxide / uMod API', 'Harmony Patches', 'RCON Protocol', 'SQLite'],
    },
    {
      category: t.console.categories.web,
      items: ['React 19', 'Node.js', 'WebSockets', 'Supabase', 'PostgreSQL', 'TailwindCSS'],
    },
    {
      category: t.console.categories.ai,
      items: ['Gemini Vision AI', 'Telegram Mini Apps', 'Discord.js API', 'Cron Schedulers'],
    },
  ];

  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-16 relative z-10">
      <div className="glass-capsule max-w-4xl w-full mx-auto p-8 md:p-12 rounded-[2.5rem] min-h-[70vh] flex flex-col justify-between">
        {/* Section Title */}
        <div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-current mb-6 uppercase tracking-tight">
            {t.console.title}<span className="text-[#6D58F0]">.</span>
          </h2>

          {/* Narrative Biography & Engineering Approach */}
          <div className="space-y-4 text-sm md:text-base leading-relaxed mb-8">
            <p className="text-current font-normal opacity-90">
              {t.console.bio}
            </p>
            <p className="text-current opacity-70">
              {t.console.approach}
            </p>
          </div>
        </div>

        {/* Technical Stack Groups (Styled Tag Pill Grid) */}
        <div className="space-y-6 pt-6 border-t border-current/10">
          {stackGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-xs font-semibold text-[#6D58F0] uppercase tracking-wider font-mono">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                {group.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-current/5 border border-current/15 text-current hover:border-[#6D58F0] hover:text-[#6D58F0] transition-all cursor-default shadow-sm font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
