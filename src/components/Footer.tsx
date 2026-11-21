import {PAGES} from "../data/pages";
interface FooterProps {
  onOpenSelection: () => void;
}

export function Footer({onOpenSelection}: FooterProps) {
  return (
    <footer className="hn-footer bg-[#F4F7F9] dark:bg-[#102A3E] py-12 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#D5E4EE] dark:border-[#365A73]">
          <div>
            <p className="font-serif text-2xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
              Huma<span className="hn-brand-accent">Num</span>
            </p>
            <p className="mt-1 text-sm text-[#425E73] dark:text-[#C3D7E5] max-w-md">
              Portail de référence pour les humanités numériques : méthodes, logiciels libres, corpus patrimoniaux et standards ouverts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#425E73] dark:text-[#C3D7E5]">
            {PAGES.filter(p=>p.id!=='accueil').map(p=><a key={p.id} href={p.href} className="hover:underline">{p.label}</a>)}
            <button
              type="button"
              onClick={onOpenSelection}
              className="font-medium text-[#2D5876] dark:text-[#D8C497] hover:underline underline-offset-4 cursor-pointer"
            >
              Exporter ma bibliographie
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#526A7C] dark:text-[#C3D7E5]">
          <p>
            Ressources documentées selon les principes de la science ouverte — Standards XML-TEI, IIIF, CIDOC-CRM &amp; FAIR.
          </p>
          <p>Portail éditorial HumaNum</p>
        </div>
      </div>
    </footer>
  );
}
