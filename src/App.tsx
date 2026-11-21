import {useEffect, useState} from 'react';
import {Laboratory} from './components/Laboratory';
import {KnowledgeMap} from './components/KnowledgeMap';
import {GlobalSearch} from './components/GlobalSearch';
import {EditorialResources} from './components/EditorialResources';
import {ToolCompare} from './components/ToolCompare';
import {ScientificWatch} from './components/ScientificWatch';
import {ResearchGuides} from './components/ResearchGuides';
import {currentPage} from './data/pages';
import {PageOverview, PageIntro} from './components/PageOverview';
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
  const page = currentPage();
  useEffect(()=>{if(page.id==='accueil'){const legacy:Record<string,string>={panorama:'/panorama',outils:'/outils',corpus:'/corpus',methodes:'/glossaire',ecosysteme:'/ecosysteme'}; const target=legacy[location.hash.slice(1)]; if(target) location.replace(target);}},[page.id]);
  useEffect(()=>{if(page.id==='accueil'||!location.hash)return;const id=location.hash.slice(1);const timer=window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({block:'start'}),120);return()=>window.clearTimeout(timer);},[page.id]);
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
        page={page.id}
        selectionCount={savedItems.length}
        onOpenSelection={() => setSelectionDrawerOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main id="contenu" className="flex-1">
        {page.id==='accueil' ? <><HeroSection toolCount={TOOLS.length} corpusCount={CORPORA.length} bibCount={BIBLIOGRAPHY.length} glossaryCount={GLOSSARY_TERMS.length}/><PageOverview/></> : <>
          <PageIntro id={page.id}/>
          {page.id==='panorama' && <PanoramaSection onSelectTool={setSelectedTool}/>}
          {page.id==='outils' && <ToolsDirectorySection onOpenTool={setSelectedTool} isSaved={isSaved} onToggleSaveTool={handleToggleSaveTool}/>}
          {(page.id==='corpus'||page.id==='standards') && <CorporaStandardsSection mode={page.id} isSaved={isSaved} onToggleSaveCorpus={handleToggleSaveCorpus}/>}
          {(page.id==='glossaire'||page.id==='bibliographie') && <MethodsGlossarySection mode={page.id} isSaved={isSaved} onToggleSaveBib={handleToggleSaveBib}/>}
          {page.id==='ecosysteme' && <EcosystemSection/>}
          {page.id==='laboratoire' && <Laboratory/>}
          {page.id==='cartographie' && <KnowledgeMap/>}
          {page.id==='recherche' && <GlobalSearch/>}
          {(page.id==='cas'||page.id==='bibliotheque'||page.id==='mediatheque') && <EditorialResources page={page.id}/>}
          {page.id==='comparateur' && <ToolCompare/>}
          {page.id==='veille' && <ScientificWatch/>}
          {(page.id==='disciplines'||page.id==='ia'||page.id==='formations'||page.id==='mondes') && <ResearchGuides page={page.id}/>}
        </>}
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
