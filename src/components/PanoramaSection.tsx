import {useState} from 'react';
import {ArrowRight, AlertTriangle, CheckCircle2} from 'lucide-react';
import {
  RESEARCH_PHASES,
  TIMELINE_MILESTONES,
  TOOLS,
  type DhTool,
} from '../data/humnumData';

interface PanoramaSectionProps {
  onSelectTool: (tool: DhTool) => void;
}

export function PanoramaSection({onSelectTool}: PanoramaSectionProps) {
  const [activePhaseId, setActivePhaseId] = useState<string>(RESEARCH_PHASES[0].id);
  const [showTimeline, setShowTimeline] = useState<boolean>(false);

  const activePhase =
    RESEARCH_PHASES.find((phase) => phase.id === activePhaseId) ?? RESEARCH_PHASES[0];

  const linkedTools = TOOLS.filter((tool) =>
    activePhase.recommendedToolIds.includes(tool.id),
  );

  return (
    <section id="panorama" className="py-16 lg:py-20 border-b border-[#E4E2DC] dark:border-[#2E2E34] bg-white dark:bg-[#18181B] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E4E2DC] dark:border-[#2E2E34]">
          <div>
            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mb-2">
              01. Panorama méthodologique
              <span aria-hidden="true" className="mx-2 text-[#A1A1AA] dark:text-[#52525B]">·</span>
              De l’archive au dépôt pérenne
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#18181B] dark:text-[#F4F4F5] text-balance">
              Le cycle de recherche en humanités numériques
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#F3F1EC] dark:bg-[#27272A] rounded-md self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setShowTimeline(false)}
              className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                !showTimeline
                  ? 'bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] shadow-xs'
                  : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'
              }`}
            >
              Chaîne de traitement (6 phases)
            </button>
            <button
              type="button"
              onClick={() => setShowTimeline(true)}
              className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                showTimeline
                  ? 'bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] shadow-xs'
                  : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'
              }`}
            >
              Repères historiques (1949–2026)
            </button>
          </div>
        </div>

        {!showTimeline ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Phase Selector List */}
            <div className="lg:col-span-4 flex flex-col divide-y divide-[#E4E2DC] dark:divide-[#2E2E34] border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md overflow-hidden bg-[#FAF9F6] dark:bg-[#1F1F23]">
              {RESEARCH_PHASES.map((phase) => {
                const isActive = phase.id === activePhase.id;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setActivePhaseId(phase.id)}
                    className={`w-full text-left px-5 py-4 transition-colors flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1E3A8A] dark:focus-visible:outline-[#60A5FA] ${
                      isActive
                        ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white'
                        : 'bg-[#FAF9F6] dark:bg-[#1F1F23] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F3F1EC] dark:hover:bg-[#27272A]'
                    }`}
                  >
                    <div className="min-w-0">
                      <span
                        className={`font-mono text-xs tabular-nums block mb-0.5 ${
                          isActive ? 'text-white/80' : 'text-[#71717A] dark:text-[#A1A1AA]'
                        }`}
                      >
                        Phase {phase.index}
                      </span>
                      <span className="text-sm font-medium block truncate">
                        {phase.shortTitle}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-white' : 'text-[#A1A1AA] dark:text-[#71717A]'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Phase Detail Panel */}
            <div className="lg:col-span-8 flex flex-col justify-between border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md p-6 lg:p-8 bg-[#FAF9F6] dark:bg-[#1F1F23]">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B] dark:text-[#A1A1AA] mb-3">
                  <span className="font-mono tabular-nums text-[#1E3A8A] dark:text-[#60A5FA] font-medium">
                    Phase {activePhase.index} sur 06
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Formats &amp; protocoles : {activePhase.standards.join(' / ')}</span>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                  {activePhase.title}
                </h3>

                <p className="mt-4 text-base leading-[1.7] text-[#3F3F46] dark:text-[#D4D4D8] max-w-[65ch]">
                  {activePhase.summary}
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E4E2DC] dark:border-[#2E2E34]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#18181B] dark:text-[#F4F4F5] mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] dark:text-[#60A5FA]" aria-hidden="true" />
                      <span>Livrable scientifique attendu</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                      {activePhase.deliverable}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#18181B] dark:text-[#F4F4F5] mb-2">
                      <AlertTriangle className="w-4 h-4 text-[#9A3412] dark:text-[#FB923C]" aria-hidden="true" />
                      <span>Point de vigilance méthodologique</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                      {activePhase.pitfall}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E4E2DC] dark:border-[#2E2E34]">
                <p className="text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] mb-3">
                  Outils recommandés pour cette phase (cliquer pour ouvrir la fiche détaillée) :
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {linkedTools.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => onSelectTool(tool)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#18181B] dark:text-[#F4F4F5] bg-white dark:bg-[#18181B] hover:bg-[#1E3A8A] dark:hover:bg-[#2563EB] hover:text-white border border-[#D6D3CB] dark:border-[#3A3A42] hover:border-[#1E3A8A] dark:hover:border-[#2563EB] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{tool.name}</span>
                      <span aria-hidden="true" className="opacity-60">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Editorial Pull Quote & Manifesto Context */}
            <div className="lg:col-span-5 py-6 border-y border-[#E4E2DC] dark:border-[#2E2E34]">
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mb-3">
                Manifeste des Digital Humanities · Paris, mai 2010
              </p>
              <blockquote className="font-serif italic text-2xl lg:text-[28px] leading-[1.35] text-[#18181B] dark:text-[#F4F4F5]">
                « Le tournant numérique pris par la société modifie et interroge les conditions de production et de diffusion des savoirs. »
              </blockquote>
              <p className="mt-5 text-sm leading-[1.7] text-[#52525B] dark:text-[#A1A1AA]">
                Loin d’être une simple boîte à outils technique, les humanités numériques forment une transdiscipline critique qui associe les méthodes informatiques, statistiques et éditoriales aux questions herméneutiques propres aux lettres et aux sciences sociales.
              </p>
            </div>

            {/* Chronological Milestones */}
            <div className="lg:col-span-7 divide-y divide-[#E4E2DC] dark:divide-[#2E2E34] border-t border-b border-[#E4E2DC] dark:border-[#2E2E34]">
              {TIMELINE_MILESTONES.map((item) => (
                <div
                  key={item.year}
                  className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-3">
                    <span className="font-mono text-sm font-medium text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                      {item.year}
                    </span>
                    <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-0.5">{item.actor}</p>
                  </div>
                  <div className="sm:col-span-9">
                    <h3 className="font-serif text-xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
