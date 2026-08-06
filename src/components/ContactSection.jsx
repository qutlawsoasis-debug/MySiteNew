import React, { useState } from 'react';

export default function ContactSection({ t }) {
  const [copied, setCopied] = useState(false);

  const email = 'qutlawsoasis@gmail.com';

  const copyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const contactRoutes = [
    {
      channel: 'telegram',
      value: '@miron_npc',
      url: 'https://t.me/miron_npc',
      action: '→',
    },
    {
      channel: 'github',
      value: 'qutlawsoasis-debug',
      url: 'https://github.com/qutlawsoasis-debug',
      action: '→',
    },
    {
      channel: 'fiverr',
      value: 'miron_npc (5★ rated)',
      url: 'https://www.fiverr.com/miron_npc',
      action: '→',
    },
    {
      channel: 'email',
      value: email,
      url: `mailto:${email}`,
      action: copied ? `[${t.contact.copied}]` : `[${t.contact.copy}]`,
      onClick: copyEmail,
    },
  ];

  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-16 relative z-10">
      <div className="glass-capsule max-w-4xl w-full mx-auto p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between">
        {/* Section Header */}
        <div className="mb-6">
          <div className="text-xs font-mono text-[#6D58F0] uppercase tracking-wider mb-2 font-semibold">
            {t.contact.tag}
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-current mb-3 uppercase tracking-tight">
            {t.contact.title}<span className="text-[#6D58F0]">.</span>
          </h2>
          <p className="text-sm md:text-base opacity-75 max-w-2xl leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        {/* Quick Info Status Grid (Fills empty space with high-value info) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-current/5 border border-current/10">
            <span className="opacity-50 block text-[11px] mb-1">AVAILABILITY</span>
            <span className="text-[#39FF88] font-semibold">Open for Contracts</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-current/5 border border-current/10">
            <span className="opacity-50 block text-[11px] mb-1">TIMEZONE</span>
            <span className="text-current font-semibold">CET / UTC+1 (Germany)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-current/5 border border-current/10">
            <span className="opacity-50 block text-[11px] mb-1">RESPONSE SLA</span>
            <span className="text-current font-semibold">&lt; 2 Hours</span>
          </div>
        </div>

        {/* Clean Typography List Table */}
        <div className="border-t border-b border-current/10 divide-y divide-current/10 text-xs md:text-sm">
          {contactRoutes.map((route, idx) => (
            <a
              key={idx}
              href={route.url}
              target={route.onClick ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={route.onClick}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-3 hover:bg-current/5 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-8 mb-1 sm:mb-0">
                <span className="opacity-60 w-28 uppercase text-xs font-semibold font-mono">{route.channel}</span>
                <span className="text-current group-hover:text-[#6D58F0] font-medium transition-colors font-mono">
                  {route.value}
                </span>
              </div>

              <div className="flex items-center gap-2 text-right self-end sm:self-auto text-xs opacity-75 group-hover:text-[#6D58F0] transition-colors font-mono font-semibold">
                <span>{route.action}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
