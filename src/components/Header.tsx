import {useEffect,useRef,useState} from 'react';
import {Bookmark,Moon,Sun,Menu,ChevronDown,X,Search} from 'lucide-react';
import {PAGES,type PageId} from '../data/pages';
import {useLang,switchLang,localPage,words,type Lang} from '../data/i18n';
interface HeaderProps {page:PageId;selectionCount:number;onOpenSelection:()=>void;isDark:boolean;onToggleTheme:()=>void;}
const GROUPS:{title:string;ids:PageId[]}[]=[
 {title:'Comprendre & apprendre',ids:['accueil','decouvrir','panorama','disciplines','formations','cas','mediatheque','arabes']},
 {title:'Explorer & expérimenter',ids:['outils','corpus','standards','ia','laboratoire','cartographie','comparateur','ateliers','chercheur']},
 {title:'Se documenter & échanger',ids:['glossaire','bibliographie','ecosysteme','mondes','bibliotheque','veille','recherche','science-ouverte']}
];
export function Header({page,selectionCount,onOpenSelection,isDark,onToggleTheme}:HeaderProps){
 const [open,setOpen]=useState(false);
 const lang=useLang();const w=words[lang];
 const panelRef=useRef<HTMLDivElement>(null);
 const triggerRef=useRef<HTMLButtonElement>(null);
 const active=PAGES.find(p=>p.id===page);
 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{const target=event.target;if(target instanceof Node&&!panelRef.current?.contains(target)&&!triggerRef.current?.contains(target))setOpen(false);};
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);triggerRef.current?.focus();}};
  document.addEventListener('pointerdown',outside);
  document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
 },[open]);
 return <header className="hn-header hn-header-compact sticky top-0 z-40">
  <div className="hn-header-inner hn-compact-inner">
   <div className="hn-brand-row"><a href="/" className="hn-wordmark" aria-label="HumaNum, accueil">Huma<span className="hn-brand-accent">Num</span></a><span className="hn-brand-subtitle">{w.subtitle}</span></div>
   <div className="hn-header-actions">
    <select className="hn-language" aria-label="Langue de navigation / Navigation language / لغة التنقل" value={lang} onChange={e=>switchLang(e.target.value as Lang)}><option value="fr">FR</option><option value="en">EN</option><option value="ar">AR</option></select>
    <a className="hn-search-shortcut" href="/recherche" aria-label={w.search} title={w.search}><Search size={19} aria-hidden="true"/></a>
    <button ref={triggerRef} className="hn-explore-trigger" type="button" aria-expanded={open} aria-controls="hn-navigation-panel" onClick={()=>setOpen(v=>!v)} aria-label={w.explore}>{open?<X size={18} aria-hidden="true"/>:<Menu size={18} aria-hidden="true"/>}<span className="hn-explore-label">{w.explore}</span><ChevronDown className={open?'hn-chevron hn-chevron-open':'hn-chevron'} size={14} aria-hidden="true"/></button>
    <button type="button" onClick={onToggleTheme} aria-pressed={isDark} aria-label={isDark?'Activer le mode clair':'Activer le mode sombre'} title={isDark?'Mode clair':'Mode sombre'}>{isDark?<Sun size={17} aria-hidden="true"/>:<Moon size={17} aria-hidden="true"/>}</button>
    <button type="button" onClick={()=>{setOpen(false);onOpenSelection();}} aria-label={`Ma sélection (${selectionCount})`}><Bookmark size={16} aria-hidden="true"/><span className="hn-selection-label">{w.selection}</span><span>({selectionCount})</span></button>
   </div>
   <div className="hn-menu-panel" lang={lang} dir={lang==='ar'?'rtl':'ltr'} id="hn-navigation-panel" ref={panelRef} hidden={!open}>
    <div className="hn-menu-heading"><div><p className="hn-menu-eyebrow">HumaNum · Navigation</p><h2>{w.explore}</h2></div><span className="hn-menu-current">{w.current} : {active&&localPage(active.id,lang).title}</span></div>
    <nav aria-label={w.explore} className="hn-menu-groups">
    {GROUPS.map((group,i)=><div className="hn-menu-group" key={group.title}><h3>{w.groups[i]}</h3>{group.ids.map(id=>{const item=PAGES.find(p=>p.id===id);if(!item)return null;const Icon=item.icon;return <a key={id} href={item.href} aria-current={page===id?'page':undefined} onClick={()=>setOpen(false)}><Icon size={18} strokeWidth={1.7} aria-hidden="true"/><span>{localPage(item.id,lang).title}</span></a>;})}</div>)}
    </nav>
   </div>
  </div>
 </header>;
}
