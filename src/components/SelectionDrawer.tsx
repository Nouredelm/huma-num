import {useEffect, useState} from 'react';
import {Check, Copy, Download, Trash2, X} from 'lucide-react';
import type {SavedItem} from '../data/humnumData';

interface SelectionDrawerProps {
  open: boolean;
  onClose: () => void;
  items: SavedItem[];
  projectNote: string;
  onUpdateProjectNote: (note: string) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export function SelectionDrawer({
  open,
  onClose,
  items,
  projectNote,
  onUpdateProjectNote,
  onRemoveItem,
  onClearAll,
}: SelectionDrawerProps) {
  const [copiedMode, setCopiedMode] = useState<'md' | 'bib' | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const generateMarkdown = () => {
    const lines: string[] = [
      '# Sélection documentaire — Humanités numériques (HumNum)',
      '',
    ];
    if (projectNote.trim()) {
      lines.push('## Note de recherche', projectNote.trim(), '');
    }
    const groups: Array<{kind: SavedItem['kind']; label: string}> = [
      {kind: 'outil', label: 'Outils et logiciels'},
      {kind: 'corpus', label: 'Corpus et infrastructures'},
      {kind: 'bibliographie', label: 'Références bibliographiques'},
    ];
    groups.forEach(({kind, label}) => {
      const groupItems = items.filter((item) => item.kind === kind);
      if (groupItems.length === 0) return;
      lines.push(`## ${label}`);
      groupItems.forEach((item) => {
        if (item.iso690) {
          lines.push(`- ${item.iso690}`);
        } else {
          lines.push(
            `- **${item.title}** (${item.subtitle})${item.url ? ` — ${item.url}` : ''}`,
          );
        }
      });
      lines.push('');
    });
    return lines.join('\n');
  };

  const generateBibtex = () => {
    const bibEntries = items
      .map((item) => {
        if (item.bibtex) return item.bibtex;
        return `@misc{humnum_${item.id.replace(/[^a-zA-Z0-9]/g, '_')},\n  title = {${item.title}},\n  note = {${item.subtitle}},\n  url = {${item.url ?? ''}}\n}`;
      })
      .join('\n\n');
    return bibEntries;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], {type: mimeType});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async (mode: 'md' | 'bib') => {
    const text = mode === 'md' ? generateMarkdown() : generateBibtex();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMode(mode);
      setTimeout(() => setCopiedMode(null), 1800);
    } catch {
      setCopiedMode(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="selection-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        className="fixed inset-0 bg-[#18181B]/40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg bg-[#FAF9F6] dark:bg-[#111113] h-full overflow-y-auto border-l border-[#E4E2DC] dark:border-[#2E2E34] flex flex-col justify-between">
        <div className="p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#E4E2DC] dark:border-[#2E2E34]">
            <div>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                Carnet personnel (enregistré localement)
              </p>
              <h2
                id="selection-drawer-title"
                className="mt-1 font-serif text-3xl font-semibold text-[#18181B] dark:text-[#F4F4F5]"
              >
                Ma bibliographie &amp; sélection
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer ma sélection"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#D6D3CB] dark:border-[#3A3A42] bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F3F1EC] dark:hover:bg-[#27272A] shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Optional Research Note */}
          <div className="mt-6">
            <label
              htmlFor="project-note"
              className="block text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] mb-2"
            >
              Note de cadrage ou nom du séminaire / projet (incluse dans l’export Markdown)
            </label>
            <textarea
              id="project-note"
              rows={2}
              value={projectNote}
              onChange={(e) => onUpdateProjectNote(e.target.value)}
              placeholder="Ex. : Corpus correspondances XVIIIe — encodage TEI + analyse Gephi..."
              className="w-full px-3 py-2 text-sm bg-white dark:bg-[#18181B] border border-[#D6D3CB] dark:border-[#3A3A42] rounded-md text-[#18181B] dark:text-[#F4F4F5] placeholder:text-[#71717A] focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#60A5FA]"
            />
          </div>

          {/* Saved List */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] tabular-nums">
                {items.length} {items.length > 1 ? 'éléments sélectionnés' : 'élément sélectionné'}
              </span>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-xs text-[#9A3412] dark:text-[#FB923C] hover:underline underline-offset-4 cursor-pointer"
                >
                  Tout effacer
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-white dark:bg-[#18181B] p-8 text-center">
                <p className="font-serif text-xl text-[#18181B] dark:text-[#F4F4F5]">
                  Votre sélection est vide.
                </p>
                <p className="mt-2 text-sm text-[#52525B] dark:text-[#A1A1AA]">
                  Ajoutez des outils, des corpus ou des ouvrages depuis les sections du portail pour préparer votre bibliographie ou votre plan de gestion de données.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-[#E4E2DC] dark:divide-[#2E2E34] border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-white dark:bg-[#18181B]">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                        {item.kind}
                      </p>
                      <p className="font-serif text-lg font-semibold text-[#18181B] dark:text-[#F4F4F5] leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">{item.subtitle}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Retirer ${item.title}`}
                      className="p-1.5 text-[#71717A] dark:text-[#A1A1AA] hover:text-[#9A3412] dark:hover:text-[#FB923C] rounded-sm cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Export Footer */}
        <div className="sticky bottom-0 p-5 lg:px-8 border-t border-[#E4E2DC] dark:border-[#2E2E34] bg-white dark:bg-[#18181B] space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() =>
                downloadFile(generateBibtex(), 'humnum-selection.bib', 'application/x-bibtex')
              }
              className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium text-white bg-[#1E3A8A] hover:bg-[#172554] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Télécharger .bib</span>
            </button>

            <button
              type="button"
              disabled={items.length === 0}
              onClick={() =>
                downloadFile(generateMarkdown(), 'humnum-selection.md', 'text/markdown')
              }
              className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium text-[#18181B] dark:text-[#F4F4F5] bg-[#F3F1EC] dark:bg-[#27272A] hover:bg-[#E7E3D8] dark:hover:bg-[#323238] disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Télécharger .md</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => handleCopy('bib')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white border border-[#E4E2DC] dark:border-[#3A3A42] disabled:opacity-40 rounded-md transition-colors cursor-pointer"
            >
              {copiedMode === 'bib' ? (
                <Check className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#60A5FA]" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{copiedMode === 'bib' ? 'BibTeX copié' : 'Copier BibTeX'}</span>
            </button>

            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => handleCopy('md')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white border border-[#E4E2DC] dark:border-[#3A3A42] disabled:opacity-40 rounded-md transition-colors cursor-pointer"
            >
              {copiedMode === 'md' ? (
                <Check className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#60A5FA]" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{copiedMode === 'md' ? 'Markdown copié' : 'Copier Markdown'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
