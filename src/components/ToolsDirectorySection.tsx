import {useMemo, useState} from 'react';
import {Bookmark, Check, ExternalLink, Search, X} from 'lucide-react';
import {
  TOOLS,
  type DhTool,
  type DifficultyLevel,
  type LicenseType,
  type ToolCategory,
} from '../data/humnumData';

interface ToolsDirectorySectionProps {
  onOpenTool: (tool: DhTool) => void;
  isSaved: (id: string) => boolean;
  onToggleSaveTool: (tool: DhTool) => void;
}

const CATEGORIES: Array<'Tous' | ToolCategory> = [
  'Tous',
  'Analyse textuelle',
  'Édition & HTR',
  'Réseaux & SIG',
  'Gestion & Données',
];

const LICENSES: Array<'Toutes' | LicenseType> = [
  'Toutes',
  'Logiciel libre',
  'Institutionnel',
  'Freemium',
];

const LEVELS: Array<'Tous' | DifficultyLevel> = [
  'Tous',
  'Initiation',
  'Intermédiaire',
  'Avancé',
];

export function ToolsDirectorySection({
  onOpenTool,
  isSaved,
  onToggleSaveTool,
}: ToolsDirectorySectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Tous' | ToolCategory>('Tous');
  const [selectedLicense, setSelectedLicense] = useState<'Toutes' | LicenseType>('Toutes');
  const [selectedLevel, setSelectedLevel] = useState<'Tous' | DifficultyLevel>('Tous');

  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      if (selectedCategory !== 'Tous' && tool.category !== selectedCategory) return false;
      if (selectedLicense !== 'Toutes' && tool.license !== selectedLicense) return false;
      if (selectedLevel !== 'Tous' && tool.level !== selectedLevel) return false;
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.summary.toLowerCase().includes(q) ||
        tool.maintainer.toLowerCase().includes(q) ||
        tool.formats.some((fmt) => fmt.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory, selectedLicense, selectedLevel]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tous');
    setSelectedLicense('Toutes');
    setSelectedLevel('Tous');
  };

  const hasActiveFilter =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'Tous' ||
    selectedLicense !== 'Toutes' ||
    selectedLevel !== 'Tous';

  return (
    <section id="outils" className="py-16 lg:py-20 border-b border-[#E4E2DC] dark:border-[#2E2E34] bg-[#FAF9F6] dark:bg-[#111113] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E4E2DC] dark:border-[#2E2E34]">
          <div>
            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mb-2">
              02. Boîte à outils curatée
              <span aria-hidden="true" className="mx-2 text-[#A1A1AA] dark:text-[#52525B]">·</span>
              Logiciels, plateformes &amp; bibliothèques
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#18181B] dark:text-[#F4F4F5] text-balance">
              Répertoire des outils pour la recherche
            </h2>
          </div>

          <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] tabular-nums shrink-0">
            {filteredTools.length} {filteredTools.length > 1 ? 'outils affichés' : 'outil affiché'} sur {TOOLS.length}
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Category Segmented Tabs */}
            <div
              role="group"
              aria-label="Filtrer par domaine"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE5] dark:bg-[#27272A] rounded-md"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] shadow-xs'
                        : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search
                className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un outil, format (TEI, IIIF)..."
                aria-label="Rechercher dans le répertoire des outils"
                className="w-full pl-9 pr-9 py-2 text-sm bg-white dark:bg-[#18181B] border border-[#D6D3CB] dark:border-[#3A3A42] rounded-md text-[#18181B] dark:text-[#F4F4F5] placeholder:text-[#71717A] dark:placeholder:text-[#71717A] focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#60A5FA]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Effacer la recherche"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#18181B] dark:hover:text-[#F4F4F5] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Facets: License & Level */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <label htmlFor="license-select" className="text-xs font-medium text-[#52525B] dark:text-[#A1A1AA]">
                  Licence :
                </label>
                <select
                  id="license-select"
                  value={selectedLicense}
                  onChange={(e) => setSelectedLicense(e.target.value as 'Toutes' | LicenseType)}
                  className="text-xs bg-white dark:bg-[#18181B] border border-[#D6D3CB] dark:border-[#3A3A42] rounded-md px-2.5 py-1.5 text-[#18181B] dark:text-[#F4F4F5] focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#60A5FA]"
                >
                  {LICENSES.map((lic) => (
                    <option key={lic} value={lic}>
                      {lic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="level-select" className="text-xs font-medium text-[#52525B] dark:text-[#A1A1AA]">
                  Prise en main :
                </label>
                <select
                  id="level-select"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as 'Tous' | DifficultyLevel)}
                  className="text-xs bg-white dark:bg-[#18181B] border border-[#D6D3CB] dark:border-[#3A3A42] rounded-md px-2.5 py-1.5 text-[#18181B] dark:text-[#F4F4F5] focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#60A5FA]"
                >
                  {LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-[#1E3A8A] dark:text-[#60A5FA] hover:underline underline-offset-4 cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

        {/* Tools Grid (Zero-Pill Discipline, 1-level border, clean spacing) */}
        {filteredTools.length === 0 ? (
          <div className="mt-10 border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-white dark:bg-[#18181B] p-10 text-center">
            <p className="font-serif text-xl text-[#18181B] dark:text-[#F4F4F5]">
              Aucun outil ne correspond à ces critères.
            </p>
            <p className="mt-2 text-sm text-[#52525B] dark:text-[#A1A1AA]">
              Essayez d’élargir la recherche ou de réinitialiser les filtres de licence et de niveau.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-4 py-2 text-xs font-medium text-white bg-[#1E3A8A] hover:bg-[#172554] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] rounded-md transition-colors cursor-pointer"
            >
              Tout afficher
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const saved = isSaved(tool.id);
              return (
                <article
                  key={tool.id}
                  className="flex flex-col justify-between bg-white dark:bg-[#18181B] border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md p-6 hover:border-[#B8B4A9] dark:hover:border-[#4A4A54] transition-colors"
                >
                  <div>
                    {/* Unboxed quiet metadata line */}
                    <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] truncate">
                      <span>{tool.category}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                      <span>{tool.license}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                      <span>{tool.level}</span>
                    </p>

                    <h3 className="mt-2.5 font-serif text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5] leading-snug">
                      <button
                        type="button"
                        onClick={() => onOpenTool(tool)}
                        className="text-left hover:text-[#1E3A8A] dark:hover:text-[#60A5FA] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] dark:focus-visible:outline-[#60A5FA]"
                      >
                        {tool.name}
                      </button>
                    </h3>

                    <p className="mt-1 text-xs text-[#71717A] dark:text-[#A1A1AA]">{tool.maintainer}</p>

                    <p className="mt-3.5 text-sm leading-relaxed text-[#3F3F46] dark:text-[#D4D4D8]">
                      {tool.summary}
                    </p>

                    <p className="mt-4 pt-3 border-t border-[#F1EFEA] dark:border-[#27272A] font-mono text-[11px] text-[#52525B] dark:text-[#A1A1AA] truncate">
                      Formats : {tool.formats.join(' / ')}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E4E2DC] dark:border-[#2E2E34] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenTool(tool)}
                      className="text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Consulter la fiche
                    </button>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleSaveTool(tool)}
                        aria-pressed={saved}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          saved
                            ? 'bg-[#1E3A8A]/8 dark:bg-[#2563EB]/15 border-[#1E3A8A]/30 dark:border-[#60A5FA]/40 text-[#1E3A8A] dark:text-[#93C5FD]'
                            : 'bg-transparent border-[#D6D3CB] dark:border-[#3A3A42] text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white hover:border-[#A1A1AA] dark:hover:border-[#52525B]'
                        }`}
                      >
                        {saved ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Sélectionné</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Ajouter</span>
                          </>
                        )}
                      </button>

                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Site officiel de ${tool.name}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-sm border border-[#D6D3CB] dark:border-[#3A3A42] text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white hover:border-[#A1A1AA] dark:hover:border-[#52525B] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
