import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProjectPanel({ project, t }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const isCodeProject = project.id === 'rust_plugins';
  const localized = t.projects.items[project.id] || project;
  const detailsId = `project-details-${project.id}`;

  return (
    <section className="w-screen h-screen flex-shrink-0 flex items-start justify-center px-6 pb-6 pt-32 md:px-16 md:pb-10 md:pt-32 relative z-10">
      <div className="glass-capsule max-w-4xl w-full h-full min-h-0 mx-auto p-8 md:p-12 rounded-[2.5rem] overflow-y-auto flex flex-col justify-between">
        
        {/* Top Header & Metadata */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono opacity-70 pb-4 mb-4 border-b border-current/10">
            <span className="uppercase text-xs font-semibold text-current">{localized.tag}</span>
            <span className="uppercase text-xs text-[#6D58F0] font-semibold">{project.status}</span>
          </div>

          {/* Title & Fact Line */}
          <h3 className="font-display font-extrabold text-3xl md:text-5xl text-current mb-2 group-hover:text-[#6D58F0] transition-colors">
            {localized.title}
          </h3>
          <p className="text-xs md:text-sm opacity-70 mb-4 max-w-2xl">
            {localized.fact}
          </p>

          {/* Clean Metadata Line */}
          <div className="flex flex-wrap items-center gap-6 text-xs opacity-80 mb-4 font-mono">
            <div><span className="opacity-50">{t.projects.roleLabel}</span> {localized.role}</div>
            <div><span className="opacity-50">{t.projects.stackLabel}</span> <span className="text-[#6D58F0] font-semibold">{localized.stackSummary}</span></div>
          </div>
        </div>

        {/* Visual Content: Image OR C# Code Block */}
        <div className="my-2">
          {isCodeProject ? (
            /* Monospaced Code Block for Plugins */
            <div className="border border-current/15 bg-black/90 p-4 font-mono text-xs text-[#F5F4FA] space-y-2 overflow-x-auto rounded-2xl shadow-2xl">
              <div className="text-[#8A8A9E] text-[11px] pb-2 border-b border-white/10 flex justify-between">
                <span>// Oxide Plugin: AdminTools.cs</span>
                <span className="text-[var(--color-accent-green)]">C# .NET / Oxide API</span>
              </div>
              <pre className="text-emerald-400">
{`using Oxide.Core;
using Oxide.Core.Plugins;

namespace Oxide.Plugins {
  [Info("AdminTools", "Miron", "4.2.1")]
  class AdminTools : RustPlugin {
    void OnServerInitialized() {
      Puts("AdminTools loaded :: hooks attached.");
    }
    
    [ChatCommand("wipe")]
    void CmdWipe(BasePlayer player, string cmd, string[] args) {
      if (!player.IsAdmin) return;
      TriggerAutomatedWipeSequence();
    }
  }`}
              </pre>
            </div>
          ) : (
            /* Screenshot Preview with Border & Shadow */
            <div className="border border-current/15 overflow-hidden max-h-[280px] rounded-2xl shadow-2xl">
              <img
                src={project.image}
                alt={localized.title}
                width={1376}
                height={768}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          )}

          {/* Expandable Specifications Drawer */}
          {detailsOpen && (
            <div id={detailsId} className="project-details-scroll mt-4 p-4 bg-black/80 text-[#F5F4FA] border border-current/15 text-xs space-y-3 rounded-2xl animate-fadeIn">
              <div className="text-[var(--color-accent-green)] font-mono font-semibold text-xs uppercase">
                {t.projects.inspect}
              </div>
              <div className="text-[#F5F4FA] leading-relaxed">
                {localized.details}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 font-mono">
                {project.techList.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 bg-white/10 text-white text-[11px] rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Panel Footer */}
        <div className="pt-4 border-t border-current/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            aria-expanded={detailsOpen}
            aria-controls={detailsId}
            className="flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-[#6D58F0] transition-colors cursor-pointer font-medium"
          >
            <span>{detailsOpen ? t.projects.hide : t.projects.inspect}</span>
            {detailsOpen ? <ChevronUp size={14} className="text-[#6D58F0]" /> : <ChevronDown size={14} />}
          </button>

          <div className="flex items-center gap-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 hover:text-[#6D58F0] transition-colors flex items-center gap-1"
              >
                <span>{t.projects.repo}</span>
                <span>↗</span>
              </a>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D58F0] hover:text-[#6D58F0]/80 transition-colors flex items-center gap-1 font-semibold"
              >
                <span>{t.projects.liveDemo}</span>
                <span>→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
