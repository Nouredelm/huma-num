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
    <section id="panorama" className="py-16 lg:py-20 border-b border-[#D5E4EE] dark:border-[#365A73] bg-white dark:bg-[#193B55] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D5E4EE] dark:border-[#365A73]">
          <div>
            <p className="text-xs text-[#425E73] dark:text-[#C3D7E5] mb-2">
              01. Panorama méthodologique
              <span aria-hidden="true" className="mx-2 text-[#C3D7E5] dark:text-[#425E73]">·</span>
              De l’archive au dépôt pérenne
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#193B55] dark:text-[#F4F7F9] text-balance">
              Le cycle de recherche en humanités numériques
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#EAF2F7] dark:bg-[#2D5876] rounded-md self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setShowTimeline(false)}
              className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                !showTimeline
                  ? 'bg-white dark:bg-[#193B55] text-[#193B55] dark:text-[#F4F7F9] shadow-xs'
                  : 'text-[#425E73] dark:text-[#C3D7E5] hover:text-[#193B55] dark:hover:text-[#F4F7F9]'
              }`}
            >
              Chaîne de traitement (6 phases)
            </button>
            <button
              type="button"
              onClick={() => setShowTimeline(true)}
              className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                showTimeline
                  ? 'bg-white dark:bg-[#193B55] text-[#193B55] dark:text-[#F4F7F9] shadow-xs'
                  : 'text-[#425E73] dark:text-[#C3D7E5] hover:text-[#193B55] dark:hover:text-[#F4F7F9]'
              }`}
            >
              Repères historiques (1949–2026)
            </button>
          </div>
        </div>

        {!showTimeline ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Phase Selector List */}
            <div className="lg:col-span-4 flex flex-col divide-y divide-[#D5E4EE] dark:divide-[#365A73] border border-[#D5E4EE] dark:border-[#365A73] rounded-md overflow-hidden bg-[#F4F7F9] dark:bg-[#234760]">
              {RESEARCH_PHASES.map((phase) => {
                const isActive = phase.id === activePhase.id;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setActivePhaseId(phase.id)}
                    className={`w-full text-left px-5 py-4 transition-colors flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#2D5876] dark:focus-visible:outline-[#D8C497] ${
                      isActive
                        ? 'bg-[#2D5876] dark:bg-[#3D7497] text-white'
                        : 'bg-[#F4F7F9] dark:bg-[#234760] text-[#193B55] dark:text-[#F4F7F9] hover:bg-[#EAF2F7] dark:hover:bg-[#2D5876]'
                    }`}
                  >
                    <div className="min-w-0">
                      <span
                        className={`font-mono text-xs tabular-nums block mb-0.5 ${
                          isActive ? 'text-white/80' : 'text-[#526A7C] dark:text-[#C3D7E5]'
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
                        isActive ? 'text-white' : 'text-[#C3D7E5] dark:text-[#526A7C]'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Phase Detail Panel */}
            <div className="lg:col-span-8 flex flex-col justify-between border border-[#D5E4EE] dark:border-[#365A73] rounded-md p-6 lg:p-8 bg-[#F4F7F9] dark:bg-[#234760]">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#425E73] dark:text-[#C3D7E5] mb-3">
                  <span className="font-mono tabular-nums text-[#2D5876] dark:text-[#D8C497] font-medium">
                    Phase {activePhase.index} sur 06
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Formats &amp; protocoles : {activePhase.standards.join(' / ')}</span>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                  {activePhase.title}
                </h3>

                <p className="mt-4 text-base leading-[1.7] text-[#3D596D] dark:text-[#E0EAF1] max-w-[65ch]">
                  {activePhase.summary}
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#D5E4EE] dark:border-[#365A73]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#193B55] dark:text-[#F4F7F9] mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5876] dark:text-[#D8C497]" aria-hidden="true" />
                      <span>Livrable scientifique attendu</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#425E73] dark:text-[#C3D7E5]">
                      {activePhase.deliverable}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#193B55] dark:text-[#F4F7F9] mb-2">
                      <AlertTriangle className="w-4 h-4 text-[#795C29] dark:text-[#D8C497]" aria-hidden="true" />
                      <span>Point de vigilance méthodologique</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#425E73] dark:text-[#C3D7E5]">
                      {activePhase.pitfall}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D5E4EE] dark:border-[#365A73]">
                <p className="text-xs font-medium text-[#425E73] dark:text-[#C3D7E5] mb-3">
                  Outils recommandés pour cette phase (cliquer pour ouvrir la fiche détaillée) :
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {linkedTools.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => onSelectTool(tool)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#193B55] dark:text-[#F4F7F9] bg-white dark:bg-[#193B55] hover:bg-[#2D5876] dark:hover:bg-[#3D7497] hover:text-white border border-[#B9CEDD] dark:border-[#486C85] hover:border-[#2D5876] dark:hover:border-[#3D7497] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
            <div className="lg:col-span-5 py-6 border-y border-[#D5E4EE] dark:border-[#365A73]">
              <p className="text-xs text-[#425E73] dark:text-[#C3D7E5] mb-3">
                Manifeste des Digital Humanities · Paris, mai 2010
              </p>
              <blockquote className="font-serif italic text-2xl lg:text-[28px] leading-[1.35] text-[#193B55] dark:text-[#F4F7F9]">
                « Le tournant numérique pris par la société modifie et interroge les conditions de production et de diffusion des savoirs. »
              </blockquote>
              <p className="mt-5 text-sm leading-[1.7] text-[#425E73] dark:text-[#C3D7E5]">
                Loin d’être une simple boîte à outils technique, les humanités numériques forment une transdiscipline critique qui associe les méthodes informatiques, statistiques et éditoriales aux questions herméneutiques propres aux lettres et aux sciences sociales.
              </p>
            </div>

            {/* Chronological Milestones */}
            <div className="lg:col-span-7 divide-y divide-[#D5E4EE] dark:divide-[#365A73] border-t border-b border-[#D5E4EE] dark:border-[#365A73]">
              {TIMELINE_MILESTONES.map((item) => (
                <div
                  key={item.year}
                  className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-3">
                    <span className="font-mono text-sm font-medium text-[#2D5876] dark:text-[#D8C497] tabular-nums">
                      {item.year}
                    </span>
                    <p className="text-xs text-[#526A7C] dark:text-[#C3D7E5] mt-0.5">{item.actor}</p>
                  </div>
                  <div className="sm:col-span-9">
                    <h3 className="font-serif text-xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#425E73] dark:text-[#C3D7E5]">
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
