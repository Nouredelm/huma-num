import {useMemo, useState} from 'react';
import {ExternalLink} from 'lucide-react';
import {ECOSYSTEM_ITEMS, type EcosystemType} from '../data/humnumData';

const TYPES: Array<'Tout' | EcosystemType> = [
  'Tout',
  'Revues',
  'Formations',
  'Infrastructures',
  'Réseaux & Veille',
];

export function EcosystemSection() {
  const [selectedType, setSelectedType] = useState<'Tout' | EcosystemType>('Tout');

  const filteredItems = useMemo(() => {
    if (selectedType === 'Tout') return ECOSYSTEM_ITEMS;
    return ECOSYSTEM_ITEMS.filter((item) => item.type === selectedType);
  }, [selectedType]);

  return (
    <section id="ecosysteme" className="py-16 lg:py-20 bg-white dark:bg-[#193B55] border-b border-[#D5E4EE] dark:border-[#365A73] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D5E4EE] dark:border-[#365A73]">
          <div>
            <p className="text-xs text-[#425E73] dark:text-[#C3D7E5] mb-2">
              05. Écosystème scientifique
              <span aria-hidden="true" className="mx-2 text-[#C3D7E5] dark:text-[#425E73]">·</span>
              Revues, masters, infrastructures &amp; veille
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#193B55] dark:text-[#F4F7F9] text-balance">
              Institutions, revues et formations francophones
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filtrer l'écosystème par type"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#EAF2F7] dark:bg-[#2D5876] rounded-md self-start lg:self-auto"
          >
            {TYPES.map((type) => {
              const active = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white dark:bg-[#193B55] text-[#193B55] dark:text-[#F4F7F9] shadow-xs'
                      : 'text-[#425E73] dark:text-[#C3D7E5] hover:text-[#193B55] dark:hover:text-[#F4F7F9]'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Institutional Directory List */}
        <div className="mt-8 divide-y divide-[#D5E4EE] dark:divide-[#365A73] border-t border-b border-[#D5E4EE] dark:border-[#365A73]">
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start"
            >
              <div className="lg:col-span-4">
                <p className="text-xs text-[#425E73] dark:text-[#C3D7E5]">
                  <span className="font-mono tabular-nums text-[#526A7C] dark:text-[#C3D7E5] mr-2">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{item.type}</span>
                  <span aria-hidden="true" className="mx-1.5 text-[#C3D7E5] dark:text-[#425E73]">·</span>
                  <span>{item.accessNote}</span>
                </p>
                <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#193B55] dark:text-[#F4F7F9]">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-xs text-[#526A7C] dark:text-[#C3D7E5]">{item.location}</p>
              </div>

              <div className="lg:col-span-6">
                <p className="text-sm leading-relaxed text-[#3D596D] dark:text-[#E0EAF1]">
                  {item.description}
                </p>
              </div>

              <div className="lg:col-span-2 flex lg:justify-end">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#193B55] dark:text-[#F4F7F9] bg-[#F4F7F9] dark:bg-[#234760] hover:bg-[#2D5876] dark:hover:bg-[#3D7497] hover:text-white border border-[#B9CEDD] dark:border-[#486C85] hover:border-[#2D5876] dark:hover:border-[#3D7497] rounded-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Consulter</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
