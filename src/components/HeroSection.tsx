import {ArrowDownRight} from 'lucide-react';
import {GENERATED_IMAGES} from '../data/humnumData';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  toolCount: number;
  corpusCount: number;
  bibCount: number;
  glossaryCount: number;
}

export function HeroSection({
  toolCount,
  corpusCount,
  bibCount,
  glossaryCount,
}: HeroSectionProps) {
  return (
    <section id="accueil" className="border-b border-[#E4E2DC] dark:border-[#2E2E34] bg-[#FAF9F6] dark:bg-[#111113] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-12 pb-14 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Broadsheet Lead */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-wide text-[#52525B] dark:text-[#A1A1AA] mb-5">
                Portail francophone de référence
                <span aria-hidden="true" className="mx-2 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                Sciences humaines &amp; computationnelles
              </p>

              <h1 className="font-serif text-[clamp(2.4rem,4.3vw,3.75rem)] font-semibold leading-[1.06] tracking-tight text-[#18181B] dark:text-[#F4F4F5] text-balance">
                Les humanités numériques, de l’archive à l’analyse critique
              </h1>

              <p className="mt-6 text-base lg:text-[17px] leading-[1.7] text-[#52525B] dark:text-[#A1A1AA] max-w-[60ch]">
                Un répertoire structuré pour chercheurs, étudiants et ingénieurs
                d’études : explorer les méthodes du cycle de recherche, choisir
                des logiciels libres éprouvés, maîtriser les standards ouverts et
                constituer sa bibliographie exportable en BibTeX.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#outils"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#1E3A8A] hover:bg-[#172554] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] dark:focus-visible:outline-[#60A5FA]"
                >
                  <span>Explorer la boîte à outils</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#panorama"
                  className="inline-flex items-center px-5 py-3 text-sm font-medium text-[#18181B] dark:text-[#F4F4F5] bg-transparent hover:bg-[#F3F1EC] dark:hover:bg-[#1F1F23] border border-[#D6D3CB] dark:border-[#3A3A42] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] dark:focus-visible:outline-[#60A5FA]"
                >
                  Cycle de recherche
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#E4E2DC] dark:border-[#2E2E34] text-xs text-[#52525B] dark:text-[#A1A1AA] flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Standards documentés : XML-TEI P5</span>
              <span aria-hidden="true">·</span>
              <span>IIIF Presentation 3.0</span>
              <span aria-hidden="true">·</span>
              <span>CIDOC-CRM</span>
              <span aria-hidden="true">·</span>
              <span>Principes FAIR</span>
            </div>
          </div>

          {/* Right Column: Archival Plate */}
          <figure className="lg:col-span-6 flex flex-col">
            <div className="flex-1 min-h-[280px] lg:min-h-[380px] overflow-hidden rounded-md border border-[#E4E2DC] dark:border-[#2E2E34] bg-[#F3F1EC] dark:bg-[#1F1F23]">
              <ResilientImage
                src={GENERATED_IMAGES.heroArchive}
                alt="Chercheuse consultant un ouvrage imprimé ancien à côté d'un ordinateur portable dans une bibliothèque universitaire"
                fallbackTitle="Atelier des humanités numériques"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
            <figcaption className="mt-2.5 text-xs font-serif italic text-[#52525B] dark:text-[#A1A1AA]">
              Fig. 1 — Articulation entre lecture attentive du document patrimonial et outillage computationnel en salle de recherche.
            </figcaption>
          </figure>
        </div>

        {/* Full-Width 4-Column Operational Utility Ribbon */}
        <div className="mt-12 border border-[#E4E2DC] dark:border-[#2E2E34] rounded-md bg-white dark:bg-[#18181B] grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E4E2DC] dark:divide-[#2E2E34]">
          <div className="p-5">
            <p className="font-mono text-2xl font-medium text-[#18181B] dark:text-[#F4F4F5] tabular-nums">
              {toolCount}
            </p>
            <p className="mt-1 text-xs text-[#52525B] dark:text-[#A1A1AA]">
              Outils &amp; services évalués par usage
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-2xl font-medium text-[#18181B] dark:text-[#F4F4F5] tabular-nums">
              {corpusCount}
            </p>
            <p className="mt-1 text-xs text-[#52525B] dark:text-[#A1A1AA]">
              Corpus &amp; infrastructures ouvertes
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-2xl font-medium text-[#18181B] dark:text-[#F4F4F5] tabular-nums">
              {glossaryCount}
            </p>
            <p className="mt-1 text-xs text-[#52525B] dark:text-[#A1A1AA]">
              Notions du glossaire critique
            </p>
          </div>
          <div className="p-5">
            <p className="font-mono text-2xl font-medium text-[#18181B] dark:text-[#F4F4F5] tabular-nums">
              {bibCount}
            </p>
            <p className="mt-1 text-xs text-[#52525B] dark:text-[#A1A1AA]">
              Ouvrages citables en BibTeX &amp; ISO 690
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
