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
        className="fixed inset-0 bg-[#18181B]/40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl bg-[#FAF9F6] dark:bg-[#111113] h-full overflow-y-auto border-l border-[#E4E2DC] dark:border-[#2E2E34] flex flex-col justify-between">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#E4E2DC] dark:border-[#2E2E34]">
            <div>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                <span>{tool.category}</span>
                <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                <span>{tool.license}</span>
                <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                <span>{tool.level}</span>
              </p>
              <h2
                id="tool-drawer-title"
                className="mt-2 font-serif text-3xl font-semibold text-[#18181B] dark:text-[#F4F4F5]"
              >
                {tool.name}
              </h2>
              <p className="mt-1 text-xs text-[#71717A] dark:text-[#A1A1AA]">
                Développement : {tool.maintainer}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la fiche outil"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#D6D3CB] dark:border-[#3A3A42] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F3F1EC] dark:hover:bg-[#27272A] shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <div className="mt-6 space-y-6">
            <p className="text-base leading-[1.7] text-[#3F3F46] dark:text-[#D4D4D8]">
              {tool.description}
            </p>

            {/* Metadata table */}
            <dl className="divide-y divide-[#E4E2DC] dark:divide-[#2E2E34] border-y border-[#E4E2DC] dark:border-[#2E2E34] text-sm">
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs font-medium text-[#71717A] dark:text-[#A1A1AA]">Formats pris en charge</dt>
                <dd className="col-span-2 font-mono text-xs text-[#18181B] dark:text-[#F4F4F5]">
                  {tool.formats.join(' · ')}
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs font-medium text-[#71717A] dark:text-[#A1A1AA]">Modèle de diffusion</dt>
                <dd className="col-span-2 text-xs text-[#18181B] dark:text-[#F4F4F5]">{tool.license}</dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-xs font-medium text-[#71717A] dark:text-[#A1A1AA]">Niveau requis</dt>
                <dd className="col-span-2 text-xs text-[#18181B] dark:text-[#F4F4F5]">{tool.level}</dd>
              </div>
            </dl>

            {/* Use cases */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#18181B] dark:text-[#F4F4F5] mb-2.5">
                Cas d’usage en sciences humaines et sociales
              </h3>
              <ul className="space-y-2 text-sm text-[#3F3F46] dark:text-[#D4D4D8]">
                {tool.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2.5">
                    <span className="text-[#1E3A8A] dark:text-[#60A5FA] font-mono text-xs mt-1">—</span>
                    <span className="leading-relaxed">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workflow steps */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#18181B] dark:text-[#F4F4F5] mb-2.5">
                Protocole de mise en œuvre
              </h3>
              <ol className="space-y-2.5 text-sm text-[#3F3F46] dark:text-[#D4D4D8]">
                {tool.workflowSteps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-medium text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums mt-0.5">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BibTeX Citation */}
            <div className="border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-white dark:bg-[#18181B] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#E4E2DC] dark:border-[#2E2E34] flex items-center justify-between bg-[#F3F1EC] dark:bg-[#27272A]">
                <span className="text-xs font-medium text-[#18181B] dark:text-[#F4F4F5]">
                  Citer cet outil (BibTeX)
                </span>
                <button
                  type="button"
                  onClick={handleCopyBibtex}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E3A8A] dark:text-[#60A5FA] hover:underline cursor-pointer"
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
              <pre className="p-4 text-[11px] font-mono text-[#3F3F46] dark:text-[#D4D4D8] overflow-x-auto leading-relaxed">
                <code>{tool.citationBibtex}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="sticky bottom-0 p-5 lg:px-8 border-t border-[#E4E2DC] dark:border-[#2E2E34] bg-white dark:bg-[#18181B] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleSave(tool)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#1E3A8A]/10 dark:bg-[#2563EB]/15 border-[#1E3A8A]/40 dark:border-[#60A5FA]/40 text-[#1E3A8A] dark:text-[#93C5FD]'
                : 'bg-white dark:bg-[#18181B] border-[#D6D3CB] dark:border-[#3A3A42] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F3F1EC] dark:hover:bg-[#27272A]'
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
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1E3A8A] hover:bg-[#172554] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] rounded-md transition-colors"
          >
            <span>Site officiel</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
