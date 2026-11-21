import {useEffect, useState} from 'react';
import {CorporaStandardsSection} from './components/CorporaStandardsSection';
import {DetailDrawer} from './components/DetailDrawer';
import {EcosystemSection} from './components/EcosystemSection';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {MethodsGlossarySection} from './components/MethodsGlossarySection';
import {PanoramaSection} from './components/PanoramaSection';
import {SelectionDrawer} from './components/SelectionDrawer';
import {ToolsDirectorySection} from './components/ToolsDirectorySection';
import {
  BIBLIOGRAPHY,
  CORPORA,
  GLOSSARY_TERMS,
  TOOLS,
  type BibEntry,
  type CorpusItem,
  type DhTool,
  type SavedItem,
} from './data/humnumData';

const STORAGE_ITEMS_KEY = 'humnum_selection_v1';
const STORAGE_NOTE_KEY = 'humnum_project_note_v1';
const STORAGE_THEME_KEY = 'humnum_theme_v1';

export default function App() {
  const [selectedTool, setSelectedTool] = useState<DhTool | null>(null);
  const [selectionDrawerOpen, setSelectionDrawerOpen] = useState(false);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_THEME_KEY, isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage issues
    }
  }, [isDark]);

  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_ITEMS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [projectNote, setProjectNote] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_NOTE_KEY) ?? '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(savedItems));
    } catch {
      // Ignore storage quota issues
    }
  }, [savedItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NOTE_KEY, projectNote);
    } catch {
      // Ignore storage quota issues
    }
  }, [projectNote]);

  const isSaved = (id: string) => savedItems.some((item) => item.id === id);

  const toggleItem = (newItem: SavedItem) => {
    setSavedItems((prev) => {
      if (prev.some((item) => item.id === newItem.id)) {
        return prev.filter((item) => item.id !== newItem.id);
      }
      return [...prev, newItem];
    });
  };

  const handleToggleSaveTool = (tool: DhTool) => {
    toggleItem({
      id: tool.id,
      kind: 'outil',
      title: tool.name,
      subtitle: `${tool.category} · ${tool.license}`,
      url: tool.url,
      bibtex: tool.citationBibtex,
    });
  };

  const handleToggleSaveCorpus = (corpus: CorpusItem) => {
    toggleItem({
      id: corpus.id,
      kind: 'corpus',
      title: corpus.name,
      subtitle: corpus.institution,
      url: corpus.url,
    });
  };

  const handleToggleSaveBib = (entry: BibEntry) => {
    toggleItem({
      id: entry.id,
      kind: 'bibliographie',
      title: entry.title,
      subtitle: `${entry.authors} (${entry.year})`,
      iso690: entry.iso690,
      bibtex: entry.bibtex,
    });
  };

  const handleRemoveSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F9] dark:bg-[#102A3E] text-[#193B55] dark:text-[#F4F7F9] transition-colors">
      <a href="#contenu" className="hn-skip">Aller au contenu</a>
      <Header
        selectionCount={savedItems.length}
        onOpenSelection={() => setSelectionDrawerOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main id="contenu" className="flex-1">
        <HeroSection
          toolCount={TOOLS.length}
          corpusCount={CORPORA.length}
          bibCount={BIBLIOGRAPHY.length}
          glossaryCount={GLOSSARY_TERMS.length}
        />

        <PanoramaSection onSelectTool={(tool) => setSelectedTool(tool)} />

        <ToolsDirectorySection
          onOpenTool={(tool) => setSelectedTool(tool)}
          isSaved={isSaved}
          onToggleSaveTool={handleToggleSaveTool}
        />

        <CorporaStandardsSection
          isSaved={isSaved}
          onToggleSaveCorpus={handleToggleSaveCorpus}
        />

        <MethodsGlossarySection
          isSaved={isSaved}
          onToggleSaveBib={handleToggleSaveBib}
        />

        <EcosystemSection />
      </main>

      <Footer onOpenSelection={() => setSelectionDrawerOpen(true)} />

      <DetailDrawer
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
        isSaved={selectedTool ? isSaved(selectedTool.id) : false}
        onToggleSave={handleToggleSaveTool}
      />

      <SelectionDrawer
        open={selectionDrawerOpen}
        onClose={() => setSelectionDrawerOpen(false)}
        items={savedItems}
        projectNote={projectNote}
        onUpdateProjectNote={setProjectNote}
        onRemoveItem={handleRemoveSavedItem}
        onClearAll={() => setSavedItems([])}
      />
    </div>
  );
}
