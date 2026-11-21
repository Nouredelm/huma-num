import {useEffect, useState} from 'react';
import {Bookmark, Check, Copy, ExternalLink, X} from 'lucide-react';
import type {DhTool} from '../data/humnumData';

interface DetailDrawerProps {
  tool: DhTool | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (tool: DhTool) => void;
}

export function DetailDrawer({
  tool,
  onClose,
  isSaved,
  onToggleSave,
}: DetailDrawerProps) {
  const [copiedBib, setCopiedBib] = useState(false);

  useEffect(() => {
    setCopiedBib(false);
    if (!tool) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tool, onClose]);

  if (!tool) return null;

  const handleCopyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(tool.citationBibtex);
      setCopiedBib(true);
      setTimeout(() => setCopiedBib(false), 1800);
    } catch {
      setCopiedBib(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        className="fixed inset-0 bg-[#193B55]/40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl bg-[#F4F7F9] dark:bg-[#102A3E] h-full overflow-y-auto border-l border-[#D5E4EE] dark:border-[#365A73] flex flex-col justify-between">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#D5E4EE] dark:border-[#365A73]">
            <div>
              <p className="text-xs text-[#425E73] dark:text-[#C3D7E5]">
                <span>{tool.category}</span>
                <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                <span>{tool.license}</span>
                <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                <span>{tool.level}</span>
              </p>
              <h2
                id="tool-drawer-title"
                className="mt-2 font-serif text-3xl font-semibold text-[#193B55] dark:text-[#F4F7F9]"
              >
                {tool.name}
              </h2>
              <p className="mt-1 text-xs text-[#526A7C] dark:text-[#C3D7E5]">
                Développement : {tool.maintainer}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la fiche outil"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#B9CEDD] dark:border-[#486C85] bg-white dark:bg-[#193B55] text-[#193B55] dark:text-[#F4F7F9] hover:bg-[#EAF2F7] dark:hover:bg-[#2D5876] shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <div className="mt-6 space-y-6">
            <p className="text-base leading-[1.7] text-[#3D596D] dark:text-[#E0EAF1]">
              {tool.description}
            </p>

            {/* Metadata table */}
            <dl className="divide-y divide-[#D5E4EE] dark:divide-[#365A73] border-y border-[#D5E4EE] dark:border-[#365A73] text-sm">
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs font-medium text-[#526A7C] dark:text-[#C3D7E5]">Formats pris en charge</dt>
                <dd className="col-span-2 font-mono text-xs text-[#193B55] dark:text-[#F4F7F9]">
                  {tool.formats.join(' · ')}
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs font-medium text-[#526A7C] dark:text-[#C3D7E5]">Modèle de diffusion</dt>
                <dd className="col-span-2 text-xs text-[#193B55] dark:text-[#F4F7F9]">{tool.license}</dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs font-medium text-[#526A7C] dark:text-[#C3D7E5]">Niveau requis</dt>
                <dd className="col-span-2 text-xs text-[#193B55] dark:text-[#F4F7F9]">{tool.level}</dd>
              </div>
            </dl>

            {/* Use cases */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#193B55] dark:text-[#F4F7F9] mb-2.5">
                Cas d’usage en sciences humaines et sociales
              </h3>
              <ul className="space-y-2 text-sm text-[#3D596D] dark:text-[#E0EAF1]">
                {tool.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2.5">
                    <span className="text-[#2D5876] dark:text-[#D8C497] font-mono text-xs mt-1">—</span>
                    <span className="leading-relaxed">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workflow steps */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#193B55] dark:text-[#F4F7F9] mb-2.5">
                Protocole de mise en œuvre
              </h3>
              <ol className="space-y-2.5 text-sm text-[#3D596D] dark:text-[#E0EAF1]">
                {tool.workflowSteps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-medium text-[#2D5876] dark:text-[#D8C497] tabular-nums mt-0.5">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BibTeX Citation */}
            <div className="border border-[#D5E4EE] dark:border-[#365A73] rounded-md bg-white dark:bg-[#193B55] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#D5E4EE] dark:border-[#365A73] flex items-center justify-between bg-[#EAF2F7] dark:bg-[#2D5876]">
                <span className="text-xs font-medium text-[#193B55] dark:text-[#F4F7F9]">
                  Citer cet outil (BibTeX)
                </span>
                <button
                  type="button"
                  onClick={handleCopyBibtex}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2D5876] dark:text-[#D8C497] hover:underline cursor-pointer"
                >
                  {copiedBib ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-[11px] font-mono text-[#3D596D] dark:text-[#E0EAF1] overflow-x-auto leading-relaxed">
                <code>{tool.citationBibtex}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="sticky bottom-0 p-5 lg:px-8 border-t border-[#D5E4EE] dark:border-[#365A73] bg-white dark:bg-[#193B55] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleSave(tool)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#2D5876]/10 dark:bg-[#3D7497]/15 border-[#2D5876]/40 dark:border-[#D8C497]/40 text-[#2D5876] dark:text-[#D8C497]'
                : 'bg-white dark:bg-[#193B55] border-[#B9CEDD] dark:border-[#486C85] text-[#193B55] dark:text-[#F4F7F9] hover:bg-[#EAF2F7] dark:hover:bg-[#2D5876]'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Dans ma bibliographie</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" aria-hidden="true" />
                <span>Ajouter à ma sélection</span>
              </>
            )}
          </button>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#2D5876] hover:bg-[#193B55] dark:bg-[#3D7497] dark:hover:bg-[#2D5876] rounded-md transition-colors"
          >
            <span>Site officiel</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
