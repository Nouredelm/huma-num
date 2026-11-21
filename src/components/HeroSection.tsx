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
    <section id="accueil" className="hn-hero border-b border-[#D5E4EE] dark:border-[#365A73] bg-[#F4F7F9] dark:bg-[#102A3E] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-7 pb-8 lg:pt-9 lg:pb-9">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-9 items-stretch">
          {/* Left Column: Editorial Broadsheet Lead */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-wide text-[#425E73] dark:text-[#C3D7E5] mb-3">
                Portail francophone de référence
                <span aria-hidden="true" className="mx-2 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                Sciences humaines &amp; computationnelles
              </p>

              <h1 className="font-serif text-[clamp(2.15rem,3.5vw,3.2rem)] font-semibold leading-[1.06] tracking-tight text-[#193B55] dark:text-[#F4F7F9] text-balance">
                Les humanités numériques, de l’archive à l’analyse critique
              </h1>

              <p className="mt-4 text-base lg:text-[17px] leading-[1.7] text-[#425E73] dark:text-[#C3D7E5] max-w-[60ch]">
                Un répertoire structuré pour chercheurs, étudiants et ingénieurs
                d’études : explorer les méthodes du cycle de recherche, choisir
                des logiciels libres éprouvés, maîtriser les standards ouverts et
                constituer sa bibliographie exportable en BibTeX.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a
                  href="/outils"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#2D5876] hover:bg-[#193B55] dark:bg-[#3D7497] dark:hover:bg-[#2D5876] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D5876] dark:focus-visible:outline-[#D8C497]"
                >
                  <span>Explorer la boîte à outils</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="/panorama"
                  className="inline-flex items-center px-5 py-3 text-sm font-medium text-[#193B55] dark:text-[#F4F7F9] bg-transparent hover:bg-[#EAF2F7] dark:hover:bg-[#234760] border border-[#B9CEDD] dark:border-[#486C85] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D5876] dark:focus-visible:outline-[#D8C497]"
                >
                  Cycle de recherche
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D5E4EE] dark:border-[#365A73] text-xs text-[#425E73] dark:text-[#C3D7E5] flex flex-wrap items-center gap-x-4 gap-y-1">
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
            <div className="h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden rounded-md border border-[#D5E4EE] dark:border-[#365A73] bg-[#EAF2F7] dark:bg-[#234760]">
              <ResilientImage
                src={GENERATED_IMAGES.heroArchive}
                alt="Chercheuse consultant un ouvrage imprimé ancien à côté d'un ordinateur portable dans une bibliothèque universitaire"
                fallbackTitle="Atelier des humanités numériques"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
            <figcaption className="mt-2.5 text-xs font-serif italic text-[#425E73] dark:text-[#C3D7E5]">
              Fig. 1 — Articulation entre lecture attentive du document patrimonial et outillage computationnel en salle de recherche.
            </figcaption>
          </figure>
        </div>

        {/* Full-Width 4-Column Operational Utility Ribbon */}
        <div className="mt-7 border border-[#D5E4EE] dark:border-[#365A73] rounded-md bg-white dark:bg-[#193B55] grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#D5E4EE] dark:divide-[#365A73]">
          <div className="p-3 sm:p-4">
            <p className="font-mono text-xl sm:text-2xl font-medium text-[#193B55] dark:text-[#F4F7F9] tabular-nums">
              {toolCount}
            </p>
            <p className="mt-1 text-xs text-[#425E73] dark:text-[#C3D7E5]">
              Outils &amp; services évalués par usage
            </p>
          </div>
          <div className="p-3 sm:p-4">
            <p className="font-mono text-xl sm:text-2xl font-medium text-[#193B55] dark:text-[#F4F7F9] tabular-nums">
              {corpusCount}
            </p>
            <p className="mt-1 text-xs text-[#425E73] dark:text-[#C3D7E5]">
              Corpus &amp; infrastructures ouvertes
            </p>
          </div>
          <div className="p-3 sm:p-4">
            <p className="font-mono text-xl sm:text-2xl font-medium text-[#193B55] dark:text-[#F4F7F9] tabular-nums">
              {glossaryCount}
            </p>
            <p className="mt-1 text-xs text-[#425E73] dark:text-[#C3D7E5]">
              Notions du glossaire critique
            </p>
          </div>
          <div className="p-3 sm:p-4">
            <p className="font-mono text-xl sm:text-2xl font-medium text-[#193B55] dark:text-[#F4F7F9] tabular-nums">
              {bibCount}
            </p>
            <p className="mt-1 text-xs text-[#425E73] dark:text-[#C3D7E5]">
              Ouvrages citables en BibTeX &amp; ISO 690
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
