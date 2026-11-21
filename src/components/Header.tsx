import {useState} from 'react';
import {Bookmark, Menu, Moon, Sun, X} from 'lucide-react';

interface HeaderProps {
  selectionCount: number;
  onOpenSelection: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  {href: '#panorama', label: 'Panorama'},
  {href: '#outils', label: 'Outils'},
  {href: '#corpus', label: 'Corpus'},
  {href: '#methodes', label: 'Méthodes'},
  {href: '#ecosysteme', label: 'Écosystème'},
];

export function Header({
  selectionCount,
  onOpenSelection,
  isDark,
  onToggleTheme,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 dark:bg-[#111113]/95 backdrop-blur-sm border-b border-[#E4E2DC] dark:border-[#2E2E34] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#accueil"
          className="font-serif text-2xl font-semibold tracking-tight text-[#18181B] dark:text-[#F4F4F5] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] dark:focus-visible:outline-[#60A5FA]"
        >
          HumNum
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#52525B] dark:text-[#A1A1AA]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#18181B] dark:hover:text-[#F4F4F5] hover:underline underline-offset-8 decoration-[#1E3A8A] dark:decoration-[#60A5FA] decoration-1 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] dark:focus-visible:outline-[#60A5FA]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme toggle + primary selection action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            title={isDark ? 'Mode clair' : 'Mode sombre'}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#D6D3CB] dark:border-[#3A3A42] bg-white dark:bg-[#18181B] text-[#52525B] dark:text-[#D4D4D8] hover:text-[#18181B] dark:hover:text-white hover:bg-[#F3F1EC] dark:hover:bg-[#27272A] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] dark:focus-visible:outline-[#60A5FA]"
          >
            {isDark ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenSelection}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1E3A8A] hover:bg-[#172554] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] dark:focus-visible:outline-[#60A5FA]"
          >
            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ma bibliographie</span>
            <span className="tabular-nums opacity-90">({selectionCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#E4E2DC] dark:border-[#2E2E34] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F3F1EC] dark:hover:bg-[#27272A] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigation mobile"
          className="md:hidden border-t border-[#E4E2DC] dark:border-[#2E2E34] bg-[#FAF9F6] dark:bg-[#111113] px-6 py-4 flex flex-col gap-2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-sm font-medium text-[#18181B] dark:text-[#F4F4F5] border-b border-[#E4E2DC]/60 dark:border-[#2E2E34]/60 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
