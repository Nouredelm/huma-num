import {useMemo, useState} from 'react';
import {Bookmark, Check, Copy, Search, X} from 'lucide-react';
import {
  BIBLIOGRAPHY,
  GLOSSARY_TERMS,
  type BibEntry,
} from '../data/humnumData';

interface MethodsGlossarySectionProps {
  mode:'glossaire'|'bibliographie';
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

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function HighlightMatch({text, query}: {text: string; query: string}) {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;

  const normalizedSource = normalizeText(text);
  const normalizedQuery = normalizeText(trimmed);
  if (!normalizedQuery) return <>{text}</>;

  const idx = normalizedSource.indexOf(normalizedQuery);
  if (idx === -1) return <>{text}</>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + trimmed.length);
  const after = text.slice(idx + trimmed.length);

  return (
    <>
      {before}
      <mark className="bg-[#2D5876]/15 dark:bg-[#D8C497]/25 text-inherit rounded-xs px-0.5">
        {match}
      </mark>
      {after}
    </>
  );
}

export function MethodsGlossarySection({
  mode,
  isSaved,
  onToggleSaveBib,
}: MethodsGlossarySectionProps) {
  const [glossarySearch, setGlossarySearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('Toutes');
  const [bibTheme, setBibTheme] = useState<'Tout' | BibEntry['theme']>('Tout');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const glossaryCategories = useMemo(
    () => ['Toutes', ...Array.from(new Set(GLOSSARY_TERMS.map((item) => item.category)))],
    [],
  );

  const filteredGlossary = useMemo(() => {
    const q = normalizeText(glossarySearch.trim());
    return GLOSSARY_TERMS.filter((item) => {
      if (glossaryCategory !== 'Toutes' && item.category !== glossaryCategory) {
        return false;
      }
      if (!q) return true;
      return (
        normalizeText(item.term).includes(q) ||
        normalizeText(item.english).includes(q) ||
        normalizeText(item.definition).includes(q) ||
        normalizeText(item.category).includes(q) ||
        item.related.some((rel) => normalizeText(rel).includes(q))
      );
    });
  }, [glossarySearch, glossaryCategory]);

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
    <section id={mode} className="py-16 lg:py-20 border-b border-[#D5E4EE] dark:border-[#365A73] bg-[#F4F7F9] dark:bg-[#102A3E] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading */}
        <div className="pb-8 border-b border-[#D5E4EE] dark:border-[#365A73]">
          <p className="text-xs text-[#425E73] dark:text-[#C3D7E5] mb-2">
            04. Concepts &amp; Littérature scientifique
            <span aria-hidden="true" className="mx-2 text-[#C3D7E5] dark:text-[#425E73]">·</span>
            Vocabulaire critique &amp; ouvrages essentiels
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#193B55] dark:text-[#F4F7F9] text-balance">
            {mode === "glossaire" ? "Vocabulaire critique et notions fondamentales" : "Ouvrages et références scientifiques"}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 items-start">
          {/* Left Column: Critical Glossary (5 cols) */}
          {mode === "glossaire" && <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-serif text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                Glossaire des notions
              </h3>
              <span
                aria-live="polite"
                className="text-xs text-[#425E73] dark:text-[#C3D7E5] tabular-nums"
              >
                {filteredGlossary.length} / {GLOSSARY_TERMS.length} entrées
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#526A7C] dark:text-[#C3D7E5] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="Rechercher un terme, mot-clé (TEI, FAIR, HTR...)"
                  aria-label="Rechercher dans le glossaire en temps réel"
                  className="w-full pl-9 pr-9 py-2.5 text-sm bg-white dark:bg-[#193B55] border border-[#B9CEDD] dark:border-[#486C85] rounded-md text-[#193B55] dark:text-[#F4F7F9] placeholder:text-[#526A7C] focus:outline-none focus:border-[#2D5876] dark:focus:border-[#D8C497]"
                />
                {glossarySearch && (
                  <button
                    type="button"
                    onClick={() => setGlossarySearch('')}
                    aria-label="Effacer la recherche du glossaire"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#526A7C] hover:text-[#193B55] dark:hover:text-[#F4F7F9] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <label htmlFor="glossary-category-select" className="text-xs font-medium text-[#425E73] dark:text-[#C3D7E5] shrink-0">
                  Domaine :
                </label>
                <select
                  id="glossary-category-select"
                  value={glossaryCategory}
                  onChange={(e) => setGlossaryCategory(e.target.value)}
                  className="flex-1 text-xs bg-white dark:bg-[#193B55] border border-[#B9CEDD] dark:border-[#486C85] rounded-md px-2.5 py-1.5 text-[#193B55] dark:text-[#F4F7F9] focus:outline-none focus:border-[#2D5876] dark:focus:border-[#D8C497]"
                >
                  {glossaryCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {(glossarySearch || glossaryCategory !== 'Toutes') && (
                  <button
                    type="button"
                    onClick={() => {
                      setGlossarySearch('');
                      setGlossaryCategory('Toutes');
                    }}
                    className="text-xs font-medium text-[#2D5876] dark:text-[#D8C497] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </div>

            <div className="border border-[#D5E4EE] dark:border-[#365A73] rounded-md bg-white dark:bg-[#193B55] divide-y divide-[#D5E4EE] dark:divide-[#365A73] ">
              {filteredGlossary.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-[#425E73] dark:text-[#C3D7E5]">
                    Aucune notion trouvée pour « {glossarySearch} ».
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setGlossarySearch('');
                      setGlossaryCategory('Toutes');
                    }}
                    className="mt-3 text-xs font-medium text-[#2D5876] dark:text-[#D8C497] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Afficher toutes les notions
                  </button>
                </div>
              ) : (
                filteredGlossary.map((item) => (
                  <div key={item.id} className="p-5">
                    <p className="text-xs text-[#425E73] dark:text-[#C3D7E5]">
                      <span>{item.category}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                      <span className="italic">
                        <HighlightMatch text={item.english} query={glossarySearch} />
                      </span>
                    </p>
                    <h4 className="mt-1 font-serif text-xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                      <HighlightMatch text={item.term} query={glossarySearch} />
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#3D596D] dark:text-[#E0EAF1]">
                      <HighlightMatch text={item.definition} query={glossarySearch} />
                    </p>
                    {item.related.length > 0 && (
                      <p className="mt-2.5 text-xs text-[#526A7C] dark:text-[#C3D7E5]">
                        Voir aussi :{' '}
                        {item.related.map((rel, idx) => (
                          <span key={rel}>
                            <button
                              type="button"
                              onClick={() => {
                                setGlossaryCategory('Toutes');
                                setGlossarySearch(rel);
                              }}
                              className="text-[#2D5876] dark:text-[#D8C497] hover:underline underline-offset-2 cursor-pointer"
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

          }
          {/* Right Column: Bibliography (7 cols) */}
          {mode === "bibliographie" && <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <h3 className="font-serif text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                Bibliographie essentielle
              </h3>

              <div
                role="group"
                aria-label="Filtrer la bibliographie par thème"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#E9DBB4] dark:bg-[#2D5876] rounded-md"
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
                          ? 'bg-white dark:bg-[#193B55] text-[#193B55] dark:text-[#F4F7F9] shadow-xs'
                          : 'text-[#425E73] dark:text-[#C3D7E5] hover:text-[#193B55] dark:hover:text-[#F4F7F9]'
                      }`}
                    >
                      {theme}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="divide-y divide-[#D5E4EE] dark:divide-[#365A73] border border-[#D5E4EE] dark:border-[#365A73] rounded-md bg-white dark:bg-[#193B55]">
              {filteredBib.map((entry) => {
                const saved = isSaved(entry.id);
                const isoCopied = copiedId === `${entry.id}-iso`;
                const bibCopied = copiedId === `${entry.id}-bib`;

                return (
                  <article key={entry.id} className="p-6">
                    <p className="text-xs text-[#425E73] dark:text-[#C3D7E5]">
                      <span>{entry.theme}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                      <span className="font-mono tabular-nums">{entry.year}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                      <span>{entry.publisher}</span>
                    </p>

                    <h4 className="mt-1.5 font-serif text-xl lg:text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                      {entry.title}
                    </h4>

                    <p className="mt-0.5 text-sm font-medium text-[#3D596D] dark:text-[#E0EAF1]">
                      {entry.authors}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-[#425E73] dark:text-[#C3D7E5]">
                      {entry.abstract}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#EAF2F7] dark:border-[#2D5876] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyCitation(`${entry.id}-iso`, entry.iso690)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#425E73] dark:text-[#E0EAF1] hover:text-[#193B55] dark:hover:text-white bg-[#F4F7F9] dark:bg-[#234760] border border-[#D5E4EE] dark:border-[#486C85] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {isoCopied ? (
                            <Check className="w-3.5 h-3.5 text-[#2D5876] dark:text-[#D8C497]" aria-hidden="true" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                          <span>{isoCopied ? 'ISO 690 copié' : 'Copier ISO 690'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyCitation(`${entry.id}-bib`, entry.bibtex)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#425E73] dark:text-[#E0EAF1] hover:text-[#193B55] dark:hover:text-white bg-[#F4F7F9] dark:bg-[#234760] border border-[#D5E4EE] dark:border-[#486C85] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {bibCopied ? (
                            <Check className="w-3.5 h-3.5 text-[#2D5876] dark:text-[#D8C497]" aria-hidden="true" />
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
                            ? 'bg-[#2D5876]/8 dark:bg-[#3D7497]/15 border-[#2D5876]/30 dark:border-[#D8C497]/40 text-[#2D5876] dark:text-[#D8C497]'
                            : 'bg-white dark:bg-[#193B55] border-[#B9CEDD] dark:border-[#486C85] text-[#425E73] dark:text-[#E0EAF1] hover:text-[#193B55] dark:hover:text-white'
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
          }
        </div>
      </div>
    </section>
  );
}
