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
  mode: 'corpus' | 'standards';
  isSaved: (id: string) => boolean;
  onToggleSaveCorpus: (corpus: CorpusItem) => void;
}

export function CorporaStandardsSection({
  mode,
  isSaved,
  onToggleSaveCorpus,
}: CorporaStandardsSectionProps) {
  const [activeStandardId, setActiveStandardId] = useState<string>(()=>{const id=new URLSearchParams(location.search).get('standard');return STANDARDS.some(s=>s.id===id)?id!:STANDARDS[0].id;});
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
    <section id={mode} className="py-16 lg:py-20 border-b border-[#D5E4EE] dark:border-[#365A73] bg-white dark:bg-[#193B55] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="pb-8 border-b border-[#D5E4EE] dark:border-[#365A73]">
          <p className="text-xs text-[#425E73] dark:text-[#C3D7E5] mb-2">
            03. Corpus ouverts &amp; Interopérabilité
            <span aria-hidden="true" className="mx-2 text-[#C3D7E5] dark:text-[#425E73]">·</span>
            Archives patrimoniales &amp; standards techniques
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#193B55] dark:text-[#F4F7F9] text-balance">
            {mode === "corpus" ? "Bibliothèques numériques et collections ouvertes" : "Protocoles et formats pérennes"}
          </h2>
        </div>

        {mode === "corpus" && <>
        {/* 3 Thematic Visual Dossiers */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-[#D5E4EE] dark:border-[#365A73] bg-[#EAF2F7] dark:bg-[#234760]">
              <ResilientImage
                src={GENERATED_IMAGES.corpusDigitization}
                alt="Numérisation d'un traité scientifique ancien sur un berceau de conservation sous verre optique"
                fallbackTitle="Numérisation patrimoniale"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <p className="font-serif text-lg font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                Numérisation &amp; IIIF
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#425E73] dark:text-[#C3D7E5]">
                Fig. 2 — Capture haute résolution sur berceau de conservation et exposition normalisée des fac-similés par manifestes IIIF.
              </p>
            </figcaption>
          </figure>

          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-[#D5E4EE] dark:border-[#365A73] bg-[#EAF2F7] dark:bg-[#234760]">
              <ResilientImage
                src={GENERATED_IMAGES.spatialAtlas}
                alt="Cartes gravées européennes recouvertes d'un calque géométrique de réseaux et coordonnées"
                fallbackTitle="Humanités spatiales"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <p className="font-serif text-lg font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                Cartographie &amp; Graphes
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#425E73] dark:text-[#C3D7E5]">
                Fig. 3 — Géoréférencement de fonds cartographiques anciens et modélisation topologique des circulations savantes.
              </p>
            </figcaption>
          </figure>

          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-[#D5E4EE] dark:border-[#365A73] bg-[#EAF2F7] dark:bg-[#234760]">
              <ResilientImage
                src={GENERATED_IMAGES.editorialPrinting}
                alt="Ouvrages reliés et épreuves imprimées annotées sur une table de bibliothèque"
                fallbackTitle="Édition critique"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <p className="font-serif text-lg font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                Philologie &amp; Édition XML-TEI
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#425E73] dark:text-[#C3D7E5]">
                Fig. 4 — Continuité entre l’apparat critique imprimé et le balisage structurel des variantes textuelles en XML-TEI P5.
              </p>
            </figcaption>
          </figure>
        </div>

        {/* Open Corpora Catalog */}
        <div className="mt-14">
          <h3 className="font-serif text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9] mb-6">
            Portails de corpus et entrepôts de référence
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORPORA.map((corpus) => {
              const saved = isSaved(corpus.id);
              return (
                <article
                  key={corpus.id}
                  id={'corpus-'+corpus.id}
                  className="border border-[#D5E4EE] dark:border-[#365A73] rounded-md p-6 bg-[#F4F7F9] dark:bg-[#234760] flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs text-[#425E73] dark:text-[#C3D7E5]">
                      <span>{corpus.institution}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                      <span className="font-mono text-[11px]">{corpus.apiOrStandard}</span>
                    </p>

                    <h4 className="mt-2 font-serif text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                      {corpus.name}
                    </h4>

                    <p className="mt-1 text-xs font-medium text-[#2D5876] dark:text-[#D8C497]">
                      {corpus.scope}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-[#3D596D] dark:text-[#E0EAF1]">
                      {corpus.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#D5E4EE] dark:border-[#365A73] flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-[#425E73] dark:text-[#C3D7E5]">{corpus.access}</span>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleSaveCorpus(corpus)}
                        aria-pressed={saved}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          saved
                            ? 'bg-[#2D5876]/8 dark:bg-[#3D7497]/15 border-[#2D5876]/30 dark:border-[#D8C497]/40 text-[#2D5876] dark:text-[#D8C497]'
                            : 'bg-white dark:bg-[#193B55] border-[#B9CEDD] dark:border-[#486C85] text-[#425E73] dark:text-[#E0EAF1] hover:text-[#193B55] dark:hover:text-white'
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#193B55] dark:text-[#F4F7F9] bg-white dark:bg-[#193B55] border border-[#B9CEDD] dark:border-[#486C85] hover:border-[#2D5876] dark:hover:border-[#D8C497] rounded-sm transition-colors whitespace-nowrap shrink-0"
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

        </>}
        {mode === "standards" && <>
        {/* Interactive Standards Inspector */}
        <div id="standard-inspector" className="mt-14 border border-[#D5E4EE] dark:border-[#365A73] rounded-md bg-[#F4F7F9] dark:bg-[#234760] overflow-hidden">
          <div className="p-6 lg:px-8 border-b border-[#D5E4EE] dark:border-[#365A73] flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-[#193B55]">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                Inspecteur des standards et formats ouverts
              </h3>
              <p className="text-sm text-[#425E73] dark:text-[#C3D7E5] mt-1">
                Examiner la syntaxe réelle des formats garants de l’interopérabilité scientifique.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Choisir un standard"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#EAF2F7] dark:bg-[#2D5876] rounded-md self-start lg:self-auto"
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
                        ? 'bg-white dark:bg-[#193B55] text-[#193B55] dark:text-[#F4F7F9] shadow-xs'
                        : 'text-[#425E73] dark:text-[#C3D7E5] hover:text-[#193B55] dark:hover:text-[#F4F7F9]'
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
              <p className="text-xs text-[#2D5876] dark:text-[#D8C497] font-medium">
                {activeStandard.domain}
              </p>
              <h4 className="font-serif text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                {activeStandard.name}
              </h4>
              <p className="text-sm leading-relaxed text-[#3D596D] dark:text-[#E0EAF1]">
                {activeStandard.summary}
              </p>
              <div className="pt-4 border-t border-[#D5E4EE] dark:border-[#365A73]">
                <p className="text-xs font-semibold text-[#193B55] dark:text-[#F4F7F9] mb-1">
                  Enjeu de pérennité
                </p>
                <p className="text-sm leading-relaxed text-[#425E73] dark:text-[#C3D7E5]">
                  {activeStandard.whyItMatters}
                  {activeStandard.url && <a className="block mt-3 underline text-[#2D5876] dark:text-[#D8C497]" href={activeStandard.url} target="_blank" rel="noopener noreferrer">Documentation officielle ↗</a>}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 border border-[#D5E4EE] dark:border-[#365A73] rounded-md bg-[#193B55] dark:bg-[#0D2334] text-[#F4F7F9] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#2D5876]/60">
                <span className="font-mono text-xs text-[#E0EAF1] truncate">
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
              <pre className="p-4 lg:p-5 text-xs font-mono leading-relaxed overflow-x-auto text-[#E5EEF3]">
                <code>{activeStandard.snippet}</code>
              </pre>
            </div>
          </div>
        </div>
        </>}
      </div>
    </section>
  );
}
