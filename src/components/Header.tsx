import {useEffect,useRef,useState} from 'react';
import {Bookmark,Moon,Sun,Menu,ChevronDown,X} from 'lucide-react';
import {PAGES,type PageId} from '../data/pages';
interface HeaderProps {page:PageId;selectionCount:number;onOpenSelection:()=>void;isDark:boolean;onToggleTheme:()=>void;}
const GROUPS:{title:string;ids:PageId[]}[]=[
 {title:'Comprendre & apprendre',ids:['accueil','panorama','disciplines','formations']},
 {title:'Explorer & expérimenter',ids:['outils','corpus','standards','ia']},
 {title:'Se documenter & échanger',ids:['glossaire','bibliographie','ecosysteme','mondes']}
];
export function Header({page,selectionCount,onOpenSelection,isDark,onToggleTheme}:HeaderProps){
 const [open,setOpen]=useState(false);
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
   <div className="hn-brand-row"><a href="/" className="hn-wordmark" aria-label="HumaNum, accueil">Huma<span className="hn-brand-accent">Num</span></a><span className="hn-brand-subtitle">Portail des humanités numériques</span></div>
   <div className="hn-header-actions">
    <button ref={triggerRef} className="hn-explore-trigger" type="button" aria-expanded={open} aria-controls="hn-navigation-panel" onClick={()=>setOpen(v=>!v)} aria-label={open?'Fermer la navigation':'Explorer le portail'}>{open?<X size={18} aria-hidden="true"/>:<Menu size={18} aria-hidden="true"/>}<span className="hn-explore-label">Explorer le portail</span><ChevronDown className={open?'hn-chevron hn-chevron-open':'hn-chevron'} size={14} aria-hidden="true"/></button>
    <button type="button" onClick={onToggleTheme} aria-pressed={isDark} aria-label={isDark?'Activer le mode clair':'Activer le mode sombre'} title={isDark?'Mode clair':'Mode sombre'}>{isDark?<Sun size={17} aria-hidden="true"/>:<Moon size={17} aria-hidden="true"/>}</button>
    <button type="button" onClick={()=>{setOpen(false);onOpenSelection();}} aria-label={`Ma sélection (${selectionCount})`}><Bookmark size={16} aria-hidden="true"/><span className="hn-selection-label">Ma sélection</span><span>({selectionCount})</span></button>
   </div>
   <div className="hn-menu-panel" id="hn-navigation-panel" ref={panelRef} hidden={!open}>
    <div className="hn-menu-heading"><div><p className="hn-menu-eyebrow">HumaNum · Navigation</p><h2>Explorer le portail</h2></div><span className="hn-menu-current">Page actuelle : {active?.label}</span></div>
    <nav aria-label="Navigation principale" className="hn-menu-groups">
    {GROUPS.map(group=><div className="hn-menu-group" key={group.title}><h3>{group.title}</h3>{group.ids.map(id=>{const item=PAGES.find(p=>p.id===id);if(!item)return null;const Icon=item.icon;return <a key={id} href={item.href} aria-current={page===id?'page':undefined} onClick={()=>setOpen(false)}><Icon size={18} strokeWidth={1.7} aria-hidden="true"/><span>{item.title}</span></a>;})}</div>)}
    </nav>
   </div>
  </div>
 </header>;
}
