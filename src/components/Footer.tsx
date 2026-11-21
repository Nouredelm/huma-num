interface FooterProps {
  onOpenSelection: () => void;
}

export function Footer({onOpenSelection}: FooterProps) {
  return (
    <footer className="bg-[#FAF9F6] dark:bg-[#111113] py-12 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E4E2DC] dark:border-[#2E2E34]">
          <div>
            <p className="font-serif text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
              HumNum
            </p>
            <p className="mt-1 text-sm text-[#52525B] dark:text-[#A1A1AA] max-w-md">
              Portail de référence pour les humanités numériques : méthodes, logiciels libres, corpus patrimoniaux et standards ouverts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#52525B] dark:text-[#A1A1AA]">
            <a href="#panorama" className="hover:text-[#18181B] dark:hover:text-[#F4F4F5] transition-colors">
              Panorama
            </a>
            <a href="#outils" className="hover:text-[#18181B] dark:hover:text-[#F4F4F5] transition-colors">
              Outils
            </a>
            <a href="#corpus" className="hover:text-[#18181B] dark:hover:text-[#F4F4F5] transition-colors">
              Corpus
            </a>
            <a href="#methodes" className="hover:text-[#18181B] dark:hover:text-[#F4F4F5] transition-colors">
              Méthodes
            </a>
            <a href="#ecosysteme" className="hover:text-[#18181B] dark:hover:text-[#F4F4F5] transition-colors">
              Écosystème
            </a>
            <button
              type="button"
              onClick={onOpenSelection}
              className="font-medium text-[#1E3A8A] dark:text-[#60A5FA] hover:underline underline-offset-4 cursor-pointer"
            >
              Exporter ma bibliographie
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#71717A] dark:text-[#A1A1AA]">
          <p>
            Ressources documentées selon les principes de la science ouverte — Standards XML-TEI, IIIF, CIDOC-CRM &amp; FAIR.
          </p>
          <p>Portail éditorial HumNum</p>
        </div>
      </div>
    </footer>
  );
}
