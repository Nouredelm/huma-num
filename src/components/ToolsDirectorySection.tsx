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
  'Services & Infrastructures',
];

const LICENSES: Array<'Toutes' | LicenseType> = [
  'Toutes',
  'Logiciel libre',
  'Institutionnel',
  'Freemium',
  'Gratuit propriétaire',
  'Commercial',
  'Recherche restreinte',
  'À vérifier',
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
    const normalize=(s:string)=>s.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
    const q = normalize(searchQuery.trim());
    return TOOLS.filter((tool) => {
      if (selectedCategory !== 'Tous' && tool.category !== selectedCategory) return false;
      if (selectedLicense !== 'Toutes' && tool.license !== selectedLicense) return false;
      if (selectedLevel !== 'Tous' && tool.level !== selectedLevel) return false;
      if (!q) return true;
      return (
        normalize(tool.name).includes(q) ||
        normalize(tool.summary).includes(q) ||
        normalize(tool.maintainer).includes(q) ||
        normalize(tool.description).includes(q) ||
        tool.useCases.some(v=>normalize(v).includes(q)) ||
        tool.formats.some((fmt) => normalize(fmt).includes(q))
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
    <section id="outils" className="py-16 lg:py-20 border-b border-[#D5E4EE] dark:border-[#365A73] bg-[#F4F7F9] dark:bg-[#102A3E] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D5E4EE] dark:border-[#365A73]">
          <div>
            <p className="text-xs text-[#425E73] dark:text-[#C3D7E5] mb-2">
              02. Boîte à outils &amp; Services scientifiques
              <span aria-hidden="true" className="mx-2 text-[#C3D7E5] dark:text-[#425E73]">·</span>
              Logiciels, plateformes &amp; services institutionnels
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#193B55] dark:text-[#F4F7F9] text-balance">
              Répertoire des outils et services pour la recherche
            </h2>
          </div>

          <p className="text-sm text-[#425E73] dark:text-[#C3D7E5] tabular-nums shrink-0">
            {filteredTools.length} {filteredTools.length > 1 ? 'ressources affichées' : 'ressource affichée'} sur {TOOLS.length}
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Category Segmented Tabs */}
            <div
              role="group"
              aria-label="Filtrer par domaine"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#E9DBB4] dark:bg-[#2D5876] rounded-md"
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
                        ? 'bg-white dark:bg-[#193B55] text-[#193B55] dark:text-[#F4F7F9] shadow-xs'
                        : 'text-[#425E73] dark:text-[#C3D7E5] hover:text-[#193B55] dark:hover:text-[#F4F7F9]'
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
                className="w-4 h-4 text-[#526A7C] dark:text-[#C3D7E5] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un outil, format (TEI, IIIF)..."
                aria-label="Rechercher dans le répertoire des outils"
                className="w-full pl-9 pr-9 py-2 text-sm bg-white dark:bg-[#193B55] border border-[#B9CEDD] dark:border-[#486C85] rounded-md text-[#193B55] dark:text-[#F4F7F9] placeholder:text-[#526A7C] dark:placeholder:text-[#526A7C] focus:outline-none focus:border-[#2D5876] dark:focus:border-[#D8C497]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Effacer la recherche"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#526A7C] hover:text-[#193B55] dark:hover:text-[#F4F7F9] cursor-pointer"
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
                <label htmlFor="license-select" className="text-xs font-medium text-[#425E73] dark:text-[#C3D7E5]">
                  Licence :
                </label>
                <select
                  id="license-select"
                  value={selectedLicense}
                  onChange={(e) => setSelectedLicense(e.target.value as 'Toutes' | LicenseType)}
                  className="text-xs bg-white dark:bg-[#193B55] border border-[#B9CEDD] dark:border-[#486C85] rounded-md px-2.5 py-1.5 text-[#193B55] dark:text-[#F4F7F9] focus:outline-none focus:border-[#2D5876] dark:focus:border-[#D8C497]"
                >
                  {LICENSES.map((lic) => (
                    <option key={lic} value={lic}>
                      {lic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="level-select" className="text-xs font-medium text-[#425E73] dark:text-[#C3D7E5]">
                  Prise en main :
                </label>
                <select
                  id="level-select"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as 'Tous' | DifficultyLevel)}
                  className="text-xs bg-white dark:bg-[#193B55] border border-[#B9CEDD] dark:border-[#486C85] rounded-md px-2.5 py-1.5 text-[#193B55] dark:text-[#F4F7F9] focus:outline-none focus:border-[#2D5876] dark:focus:border-[#D8C497]"
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
                className="text-xs font-medium text-[#2D5876] dark:text-[#D8C497] hover:underline underline-offset-4 cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

        {/* Tools Grid (Zero-Pill Discipline, 1-level border, clean spacing) */}
        {filteredTools.length === 0 ? (
          <div className="mt-10 border border-[#D5E4EE] dark:border-[#365A73] rounded-md bg-white dark:bg-[#193B55] p-10 text-center">
            <p className="font-serif text-xl text-[#193B55] dark:text-[#F4F7F9]">
              Aucun outil ne correspond à ces critères.
            </p>
            <p className="mt-2 text-sm text-[#425E73] dark:text-[#C3D7E5]">
              Essayez d’élargir la recherche ou de réinitialiser les filtres de licence et de niveau.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-4 py-2 text-xs font-medium text-white bg-[#2D5876] hover:bg-[#193B55] dark:bg-[#3D7497] dark:hover:bg-[#2D5876] rounded-md transition-colors cursor-pointer"
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
                  id={'tool-'+tool.id}
                  className="flex flex-col justify-between bg-white dark:bg-[#193B55] border border-[#D5E4EE] dark:border-[#365A73] rounded-md p-6 hover:border-[#A9C4D8] dark:hover:border-[#526A7C] transition-colors"
                >
                  <div>
                    {/* Unboxed quiet metadata line */}
                    <p className="text-xs text-[#425E73] dark:text-[#C3D7E5] truncate">
                      <span>{tool.category}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                      <span>{tool.license}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                      <span>{tool.level}</span>
                    </p>

                    <h3 className="mt-2.5 font-serif text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9] leading-snug">
                      <button
                        type="button"
                        onClick={() => onOpenTool(tool)}
                        className="text-left hover:text-[#2D5876] dark:hover:text-[#D8C497] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D5876] dark:focus-visible:outline-[#D8C497]"
                      >
                        {tool.name}
                      </button>
                    </h3>

                    <p className="mt-1 text-xs text-[#526A7C] dark:text-[#C3D7E5]">{tool.maintainer}</p>

                    <p className="mt-3.5 text-sm leading-relaxed text-[#3D596D] dark:text-[#E0EAF1]">
                      {tool.summary}
                    </p>

                    <p className="mt-4 pt-3 border-t border-[#EAF2F7] dark:border-[#2D5876] font-mono text-[11px] text-[#425E73] dark:text-[#C3D7E5] truncate">
                      Formats : {tool.formats.join(' / ')}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#D5E4EE] dark:border-[#365A73] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenTool(tool)}
                      className="text-xs font-semibold text-[#2D5876] dark:text-[#D8C497] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
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
                            ? 'bg-[#2D5876]/8 dark:bg-[#3D7497]/15 border-[#2D5876]/30 dark:border-[#D8C497]/40 text-[#2D5876] dark:text-[#D8C497]'
                            : 'bg-transparent border-[#B9CEDD] dark:border-[#486C85] text-[#425E73] dark:text-[#E0EAF1] hover:text-[#193B55] dark:hover:text-white hover:border-[#C3D7E5] dark:hover:border-[#425E73]'
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
                        className="inline-flex items-center justify-center w-8 h-8 rounded-sm border border-[#B9CEDD] dark:border-[#486C85] text-[#425E73] dark:text-[#E0EAF1] hover:text-[#193B55] dark:hover:text-white hover:border-[#C3D7E5] dark:hover:border-[#425E73] transition-colors"
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
