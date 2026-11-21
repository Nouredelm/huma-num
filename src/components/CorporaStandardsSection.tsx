import {useState} from 'react';
import {Bookmark, Check, Copy, ExternalLink} from 'lucide-react';
import {
  CORPORA,
  GENERATED_IMAGES,
  STANDARDS,
  type CorpusItem,
} from '../data/humnumData';
import {ResilientImage} from './ResilientImage';

interface CorporaStandardsSectionProps {
  isSaved: (id: string) => boolean;
  onToggleSaveCorpus: (corpus: CorpusItem) => void;
}

export function CorporaStandardsSection({
  isSaved,
  onToggleSaveCorpus,
}: CorporaStandardsSectionProps) {
  const [activeStandardId, setActiveStandardId] = useState<string>(STANDARDS[0].id);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const activeStandard =
    STANDARDS.find((std) => std.id === activeStandardId) ?? STANDARDS[0];

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(activeStandard.snippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 1800);
    } catch {
      setCopiedSnippet(false);
    }
  };

  return (
    <section id="corpus" className="py-16 lg:py-20 border-b border-[#E4E2DC] dark:border-[#2E2E34] bg-white dark:bg-[#18181B] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="pb-8 border-b border-[#E4E2DC] dark:border-[#2E2E34]">
          <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mb-2">
            03. Corpus ouverts &amp; Interopérabilité
            <span aria-hidden="true" className="mx-2 text-[#A1A1AA] dark:text-[#52525B]">·</span>
            Archives patrimoniales &amp; standards techniques
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#18181B] dark:text-[#F4F4F5] text-balance">
            Bibliothèques numériques et protocoles pérennes
          </h2>
        </div>

        {/* 3 Thematic Visual Dossiers */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-[#E4E2DC] dark:border-[#2E2E34] bg-[#F3F1EC] dark:bg-[#1F1F23]">
              <ResilientImage
                src={GENERATED_IMAGES.corpusDigitization}
                alt="Numérisation d'un traité scientifique ancien sur un berceau de conservation sous verre optique"
                fallbackTitle="Numérisation patrimoniale"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <p className="font-serif text-lg font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                Numérisation &amp; IIIF
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                Fig. 2 — Capture haute résolution sur berceau de conservation et exposition normalisée des fac-similés par manifestes IIIF.
              </p>
            </figcaption>
          </figure>

          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-[#E4E2DC] dark:border-[#2E2E34] bg-[#F3F1EC] dark:bg-[#1F1F23]">
              <ResilientImage
                src={GENERATED_IMAGES.spatialAtlas}
                alt="Cartes gravées européennes recouvertes d'un calque géométrique de réseaux et coordonnées"
                fallbackTitle="Humanités spatiales"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <p className="font-serif text-lg font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                Cartographie &amp; Graphes
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                Fig. 3 — Géoréférencement de fonds cartographiques anciens et modélisation topologique des circulations savantes.
              </p>
            </figcaption>
          </figure>

          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-[#E4E2DC] dark:border-[#2E2E34] bg-[#F3F1EC] dark:bg-[#1F1F23]">
              <ResilientImage
                src={GENERATED_IMAGES.editorialPrinting}
                alt="Ouvrages reliés et épreuves imprimées annotées sur une table de bibliothèque"
                fallbackTitle="Édition critique"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <p className="font-serif text-lg font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                Philologie &amp; Édition XML-TEI
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                Fig. 4 — Continuité entre l’apparat critique imprimé et le balisage structurel des variantes textuelles en XML-TEI P5.
              </p>
            </figcaption>
          </figure>
        </div>

        {/* Open Corpora Catalog */}
        <div className="mt-14">
          <h3 className="font-serif text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5] mb-6">
            Portails de corpus et entrepôts de référence
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORPORA.map((corpus) => {
              const saved = isSaved(corpus.id);
              return (
                <article
                  key={corpus.id}
                  className="border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md p-6 bg-[#FAF9F6] dark:bg-[#1F1F23] flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                      <span>{corpus.institution}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                      <span className="font-mono text-[11px]">{corpus.apiOrStandard}</span>
                    </p>

                    <h4 className="mt-2 font-serif text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                      {corpus.name}
                    </h4>

                    <p className="mt-1 text-xs font-medium text-[#1E3A8A] dark:text-[#60A5FA]">
                      {corpus.scope}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-[#3F3F46] dark:text-[#D4D4D8]">
                      {corpus.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E4E2DC] dark:border-[#2E2E34] flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-[#52525B] dark:text-[#A1A1AA]">{corpus.access}</span>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleSaveCorpus(corpus)}
                        aria-pressed={saved}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          saved
                            ? 'bg-[#1E3A8A]/8 dark:bg-[#2563EB]/15 border-[#1E3A8A]/30 dark:border-[#60A5FA]/40 text-[#1E3A8A] dark:text-[#93C5FD]'
                            : 'bg-white dark:bg-[#18181B] border-[#D6D3CB] dark:border-[#3A3A42] text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white'
                        }`}
                      >
                        {saved ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Enregistré</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Sélectionner</span>
                          </>
                        )}
                      </button>

                      <a
                        href={corpus.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#18181B] dark:text-[#F4F4F5] bg-white dark:bg-[#18181B] border border-[#D6D3CB] dark:border-[#3A3A42] hover:border-[#1E3A8A] dark:hover:border-[#60A5FA] rounded-sm transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Accéder</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Interactive Standards Inspector */}
        <div className="mt-14 border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-[#FAF9F6] dark:bg-[#1F1F23] overflow-hidden">
          <div className="p-6 lg:px-8 border-b border-[#E4E2DC] dark:border-[#2E2E34] flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-[#18181B]">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                Inspecteur des standards et formats ouverts
              </h3>
              <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] mt-1">
                Examiner la syntaxe réelle des formats garants de l’interopérabilité scientifique.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Choisir un standard"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#F3F1EC] dark:bg-[#27272A] rounded-md self-start lg:self-auto"
            >
              {STANDARDS.map((std) => {
                const active = std.id === activeStandard.id;
                return (
                  <button
                    key={std.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setActiveStandardId(std.id);
                      setCopiedSnippet(false);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] shadow-xs'
                        : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'
                    }`}
                  >
                    {std.acronym}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs text-[#1E3A8A] dark:text-[#60A5FA] font-medium">
                {activeStandard.domain}
              </p>
              <h4 className="font-serif text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                {activeStandard.name}
              </h4>
              <p className="text-sm leading-relaxed text-[#3F3F46] dark:text-[#D4D4D8]">
                {activeStandard.summary}
              </p>
              <div className="pt-4 border-t border-[#E4E2DC] dark:border-[#2E2E34]">
                <p className="text-xs font-semibold text-[#18181B] dark:text-[#F4F4F5] mb-1">
                  Enjeu de pérennité
                </p>
                <p className="text-sm leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                  {activeStandard.whyItMatters}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-[#18181B] dark:bg-[#0D0D0F] text-[#F4F4F5] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#27272A]/60">
                <span className="font-mono text-xs text-[#D4D4D8] truncate">
                  {activeStandard.snippetLabel}
                </span>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedSnippet ? (
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
              <pre className="p-4 lg:p-5 text-xs font-mono leading-relaxed overflow-x-auto text-[#E4E4E7]">
                <code>{activeStandard.snippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
