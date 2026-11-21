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
    <section id="ecosysteme" className="py-16 lg:py-20 bg-white dark:bg-[#18181B] border-b border-[#E4E2DC] dark:border-[#2E2E34] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E4E2DC] dark:border-[#2E2E34]">
          <div>
            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mb-2">
              05. Écosystème scientifique
              <span aria-hidden="true" className="mx-2 text-[#A1A1AA] dark:text-[#52525B]">·</span>
              Revues, masters, infrastructures &amp; veille
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#18181B] dark:text-[#F4F4F5] text-balance">
              Institutions, revues et formations francophones
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filtrer l'écosystème par type"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#F3F1EC] dark:bg-[#27272A] rounded-md self-start lg:self-auto"
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
                      ? 'bg-white dark:bg-[#18181B] text-[#18181B] dark:text-[#F4F4F5] shadow-xs'
                      : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Institutional Directory List */}
        <div className="mt-8 divide-y divide-[#E4E2DC] dark:divide-[#2E2E34] border-t border-b border-[#E4E2DC] dark:border-[#2E2E34]">
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start"
            >
              <div className="lg:col-span-4">
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                  <span className="font-mono tabular-nums text-[#71717A] dark:text-[#A1A1AA] mr-2">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{item.type}</span>
                  <span aria-hidden="true" className="mx-1.5 text-[#A1A1AA] dark:text-[#52525B]">·</span>
                  <span>{item.accessNote}</span>
                </p>
                <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#18181B] dark:text-[#F4F4F5]">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-xs text-[#71717A] dark:text-[#A1A1AA]">{item.location}</p>
              </div>

              <div className="lg:col-span-6">
                <p className="text-sm leading-relaxed text-[#3F3F46] dark:text-[#D4D4D8]">
                  {item.description}
                </p>
              </div>

              <div className="lg:col-span-2 flex lg:justify-end">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#18181B] dark:text-[#F4F4F5] bg-[#FAF9F6] dark:bg-[#1F1F23] hover:bg-[#1E3A8A] dark:hover:bg-[#2563EB] hover:text-white border border-[#D6D3CB] dark:border-[#3A3A42] hover:border-[#1E3A8A] dark:hover:border-[#2563EB] rounded-sm transition-colors whitespace-nowrap shrink-0"
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
