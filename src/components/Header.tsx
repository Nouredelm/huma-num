import {Bookmark, Moon, Sun} from 'lucide-react';
import {PAGES, type PageId} from '../data/pages';
interface HeaderProps { page: PageId; selectionCount:number; onOpenSelection:()=>void; isDark:boolean; onToggleTheme:()=>void; }
export function Header({page, selectionCount, onOpenSelection, isDark, onToggleTheme}:HeaderProps) {
 return <header className="hn-header sticky top-0 z-40">
  <div className="hn-header-inner">
   <div className="hn-brand-row"><a href="/" className="hn-wordmark" aria-label="HumaNum, accueil">Huma<span className="hn-brand-accent">Num</span></a><span className="hn-brand-subtitle">Portail des humanités numériques</span></div>
   <div className="hn-header-actions"><button type="button" onClick={onToggleTheme} aria-pressed={isDark} aria-label={isDark?'Activer le mode clair':'Activer le mode sombre'} title={isDark?'Mode clair':'Mode sombre'}>{isDark?<Sun size={17}/>:<Moon size={17}/>}</button><button type="button" onClick={onOpenSelection} aria-label={`Ma sélection (${selectionCount})`}><Bookmark size={16}/><span className="hn-selection-label">Ma sélection</span><span>({selectionCount})</span></button></div>
   <nav className="hn-nav" aria-label="Navigation principale">{PAGES.map(({id,href,label,title,icon:Icon})=><a href={href} key={id} aria-current={page===id?'page':undefined} title={title}><Icon size={17} strokeWidth={1.7} aria-hidden="true"/><span>{label}</span></a>)}</nav>
  </div>
 </header>;
}
