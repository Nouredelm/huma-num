import {useMemo, useState} from 'react';
import {Bookmark, Check, Copy, Search} from 'lucide-react';
import {
  BIBLIOGRAPHY,
  GLOSSARY_TERMS,
  type BibEntry,
} from '../data/humnumData';

interface MethodsGlossarySectionProps {
  isSaved: (id: string) => boolean;
  onToggleSaveBib: (entry: BibEntry) => void;
}

const BIB_THEMES: Array<'Tout' | BibEntry['theme']> = [
  'Tout',
  'Fondements',
  'Méthodes',
  'Édition & Archives',
  'Épistémologie',
];

export function MethodsGlossarySection({
  isSaved,
  onToggleSaveBib,
}: MethodsGlossarySectionProps) {
  const [glossarySearch, setGlossarySearch] = useState('');
  const [bibTheme, setBibTheme] = useState<'Tout' | BibEntry['theme']>('Tout');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredGlossary = useMemo(() => {
    const q = glossarySearch.trim().toLowerCase();
    if (!q) return GLOSSARY_TERMS;
    return GLOSSARY_TERMS.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    );
  }, [glossarySearch]);

  const filteredBib = useMemo(() => {
    if (bibTheme === 'Tout') return BIBLIOGRAPHY;
    return BIBLIOGRAPHY.filter((entry) => entry.theme === bibTheme);
  }, [bibTheme]);

  const handleCopyCitation = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <section id="methodes" className="py-16 lg:py-20 border-b border-[#E4E2DC] dark:border-[#2E2E34] bg-[#FAF9F6] dark:bg-[#111113] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading */}
        <div className="pb-8 border-b border-[#E4E2DC] dark:border-[#2E2E34]">
          <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mb-2">
            04. Concepts &amp; Littérature scientifique
            <span aria-hidden="true" className="mx-2 text-[#A1A1AA] dark:text-[#52525B]">·</span>
            Vocabulaire critique &amp; ouvrages essentiels
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#18181B] dark:text-[#F4F4F5] text-balance">
            Glossaire critique et bibliographie de référence
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Critical Glossary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-serif text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                Glossaire des notions
              </h3>
              <span className="text-xs text-[#52525B] dark:text-[#A1A1AA] tabular-nums">
                {filteredGlossary.length} entrées
              </span>
            </div>

            <div className="relative mb-5">
              <Search
                className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Filtrer le glossaire (TEI, FAIR, HTR...)"
                aria-label="Filtrer le glossaire"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#18181B] border border-[#D6D3CB] dark:border-[#3A3A42] rounded-md text-[#18181B] dark:text-[#F4F4F5] placeholder:text-[#71717A] focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#60A5FA]"
              />
            </div>

            <div className="border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-white dark:bg-[#18181B] divide-y divide-[#E4E2DC] dark:divide-[#2E2E34] max-h-[680px] overflow-y-auto">
              {filteredGlossary.length === 0 ? (
                <div className="p-6 text-center text-sm text-[#52525B] dark:text-[#A1A1AA]">
                  Aucune notion trouvée pour « {glossarySearch} ».
                </div>
              ) : (
                filteredGlossary.map((item) => (
                  <div key={item.id} className="p-5">
                    <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                      <span>{item.category}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                      <span className="italic">{item.english}</span>
                    </p>
                    <h4 className="mt-1 font-serif text-xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                      {item.term}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#3F3F46] dark:text-[#D4D4D8]">
                      {item.definition}
                    </p>
                    {item.related.length > 0 && (
                      <p className="mt-2.5 text-xs text-[#71717A] dark:text-[#A1A1AA]">
                        Voir aussi :{' '}
                        {item.related.map((rel, idx) => (
                          <span key={rel}>
                            <button
                              type="button"
                              onClick={() => setGlossarySearch(rel)}
                              className="text-[#1E3A8A] dark:text-[#60A5FA] hover:underline underline-offset-2 cursor-pointer"
                            >
                              {rel}
                            </button>
                            {idx < item.related.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Bibliography (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <h3 className="font-serif text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                Bibliographie essentielle
              </h3>

              <div
                role="group"
                aria-label="Filtrer la bibliographie par thème"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE5] dark:bg-[#27272A] rounded-md"
              >
                {BIB_THEMES.map((theme) => {
                  const active = bibTheme === theme;
                  return (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setBibTheme(theme)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] shadow-xs'
                          : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'
                      }`}
                    >
                      {theme}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="divide-y divide-[#E4E2DC] dark:divide-[#2E2E34] border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-white dark:bg-[#18181B]">
              {filteredBib.map((entry) => {
                const saved = isSaved(entry.id);
                const isoCopied = copiedId === `${entry.id}-iso`;
                const bibCopied = copiedId === `${entry.id}-bib`;

                return (
                  <article key={entry.id} className="p-6">
                    <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                      <span>{entry.theme}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                      <span className="font-mono tabular-nums">{entry.year}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                      <span>{entry.publisher}</span>
                    </p>

                    <h4 className="mt-1.5 font-serif text-xl lg:text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                      {entry.title}
                    </h4>

                    <p className="mt-0.5 text-sm font-medium text-[#3F3F46] dark:text-[#D4D4D8]">
                      {entry.authors}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                      {entry.abstract}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#F1EFEA] dark:border-[#27272A] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyCitation(`${entry.id}-iso`, entry.iso690)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white bg-[#FAF9F6] dark:bg-[#1F1F23] border border-[#E4E2DC] dark:border-[#3A3A42] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {isoCopied ? (
                            <Check className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#60A5FA]" aria-hidden="true" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                          <span>{isoCopied ? 'ISO 690 copié' : 'Copier ISO 690'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyCitation(`${entry.id}-bib`, entry.bibtex)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white bg-[#FAF9F6] dark:bg-[#1F1F23] border border-[#E4E2DC] dark:border-[#3A3A42] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {bibCopied ? (
                            <Check className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#60A5FA]" aria-hidden="true" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                          <span>{bibCopied ? 'BibTeX copié' : 'Copier BibTeX'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleSaveBib(entry)}
                        aria-pressed={saved}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          saved
                            ? 'bg-[#1E3A8A]/8 dark:bg-[#2563EB]/15 border-[#1E3A8A]/30 dark:border-[#60A5FA]/40 text-[#1E3A8A] dark:text-[#93C5FD]'
                            : 'bg-white dark:bg-[#18181B] border-[#D6D3CB] dark:border-[#3A3A42] text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white'
                        }`}
                      >
                        {saved ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Dans ma bibliographie</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Ajouter à ma sélection</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
