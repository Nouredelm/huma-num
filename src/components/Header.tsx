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
    <header className="hn-header sticky top-0 z-40 bg-[#F4F7F9]/95 dark:bg-[#102A3E]/95 backdrop-blur-sm border-b border-[#D5E4EE] dark:border-[#365A73] transition-colors">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-2 lg:gap-6">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#accueil"
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#193B55] dark:text-[#F4F7F9] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D5876] dark:focus-visible:outline-[#D8C497]"
        >
          Huma<span className="hn-brand-accent">Num</span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#425E73] dark:text-[#C3D7E5]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#193B55] dark:hover:text-[#F4F7F9] hover:underline underline-offset-8 decoration-[#2D5876] dark:decoration-[#D8C497] decoration-1 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D5876] dark:focus-visible:outline-[#D8C497]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme toggle + primary selection action */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            title={isDark ? 'Mode clair' : 'Mode sombre'}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#B9CEDD] dark:border-[#486C85] bg-white dark:bg-[#193B55] text-[#425E73] dark:text-[#E0EAF1] hover:text-[#193B55] dark:hover:text-white hover:bg-[#EAF2F7] dark:hover:bg-[#2D5876] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D5876] dark:focus-visible:outline-[#D8C497]"
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
            aria-label={`Ma bibliographie (${selectionCount})`}
            className="inline-flex items-center gap-2 px-2.5 sm:px-4 py-2 text-xs font-medium text-white bg-[#2D5876] hover:bg-[#193B55] dark:bg-[#3D7497] dark:hover:bg-[#2D5876] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D5876] dark:focus-visible:outline-[#D8C497]"
          >
            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Ma bibliographie</span>
            <span className="tabular-nums opacity-90">({selectionCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#D5E4EE] dark:border-[#365A73] text-[#193B55] dark:text-[#F4F7F9] hover:bg-[#EAF2F7] dark:hover:bg-[#2D5876] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigation mobile"
          className="lg:hidden border-t border-[#D5E4EE] dark:border-[#365A73] bg-[#F4F7F9] dark:bg-[#102A3E] px-6 py-4 flex flex-col gap-2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-sm font-medium text-[#193B55] dark:text-[#F4F7F9] border-b border-[#D5E4EE]/60 dark:border-[#365A73]/60 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
