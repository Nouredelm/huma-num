import {useMemo,useState} from 'react';
import {Search,ArrowUpRight} from 'lucide-react';
import {PAGES} from '../data/pages';
import {TOOLS,CORPORA,STANDARDS,GLOSSARY_TERMS,BIBLIOGRAPHY,ECOSYSTEM_ITEMS,RESEARCH_PHASES} from '../data/humnumData';
import {EDITORIAL} from '../data/editorial';
import {GUIDES} from '../data/researchGuides';
type Result={id:string;group:string;title:string;description:string;extra:string;href:string};
const index:Result[]=[
 ...EDITORIAL.map(r=>({id:'editorial-'+r.id,group:r.page==='cas'?'Études de cas':r.page==='bibliotheque'?'Bibliothèque':'Médiathèque',title:r.title,description:r.description,extra:[r.source,r.category,r.language,r.context,r.method,r.resources].join(' '),href:'/'+r.page+'#editorial-'+r.id})),
 ...PAGES.filter(p=>p.id!=='recherche').map(p=>({id:'page-'+p.id,group:'Pages',title:p.title,description:p.description,extra:p.label,href:p.href})),
 ...TOOLS.map(t=>({id:'tool-'+t.id,group:'Outils',title:t.name,description:t.summary,extra:[t.category,t.description,...t.formats,...t.useCases,...t.workflowSteps].join(' '),href:'/outils#tool-'+t.id})),
 ...CORPORA.map(t=>({id:'corpus-'+t.id,group:'Corpus',title:t.name,description:t.description,extra:[t.institution,t.scope,t.apiOrStandard,t.access].join(' '),href:'/corpus#corpus-'+t.id})),
 ...STANDARDS.map(t=>({id:'std-'+t.id,group:'Standards',title:t.acronym+' · '+t.name,description:t.summary,extra:[t.domain,t.whyItMatters,t.snippet].join(' '),href:'/standards?standard='+encodeURIComponent(t.id)+'#standard-inspector'})),
 ...GLOSSARY_TERMS.map(t=>({id:'term-'+t.id,group:'Glossaire',title:t.term,description:t.definition,extra:[t.english,t.category,...t.related].join(' '),href:'/glossaire#term-'+t.id})),
 ...BIBLIOGRAPHY.map(t=>({id:'bib-'+t.id,group:'Bibliographie',title:t.title,description:t.authors+' · '+t.year+' — '+t.abstract,extra:[t.publisher,t.theme,t.iso690].join(' '),href:'/bibliographie#bib-'+t.id})),
 ...ECOSYSTEM_ITEMS.map(t=>({id:'eco-'+t.id,group:'Écosystème',title:t.name,description:t.description,extra:[t.type,t.location,t.accessNote].join(' '),href:'/ecosysteme#eco-'+t.id})),
 ...RESEARCH_PHASES.map(t=>({id:'phase-'+t.id,group:'Méthodes',title:t.title,description:t.summary,extra:[t.deliverable,t.pitfall,...t.standards].join(' '),href:'/panorama?phase='+encodeURIComponent(t.id)})),
 ...GUIDES.map(t=>({id:t.id,group:'Dossiers',title:t.title,description:t.question,extra:[t.method,t.deliverable,t.caution,t.resources,t.page,t.source].join(' '),href:'/'+t.page+'#'+t.id}))
];
const norm=(s:string)=>s.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().trim();
const groups=['Tout',...new Set(index.map(r=>r.group))];
export function GlobalSearch(){
 const [query,setQuery]=useState(()=>new URLSearchParams(location.search).get('q')||'');const [group,setGroup]=useState('Tout');const [limit,setLimit]=useState(30);
 const results=useMemo(()=>{const words=norm(query).split(/\s+/).filter(Boolean);return index.filter(r=>group==='Tout'||r.group===group).map(r=>{const title=norm(r.title),desc=norm(r.description),extra=norm(r.extra);return {r,score:words.every(w=>title.includes(w)||desc.includes(w)||extra.includes(w))?words.reduce((n,w)=>n+(title.includes(w)?8:desc.includes(w)?3:1),0):-1};}).filter(x=>x.score>=0).sort((a,b)=>b.score-a.score||a.r.title.localeCompare(b.r.title,'fr')).map(x=>x.r);},[query,group]);
 const change=(q:string)=>{setQuery(q);setLimit(30);const url=new URL(location.href);if(q)url.searchParams.set('q',q);else url.searchParams.delete('q');history.replaceState(null,'',url);};
 return <section className="hn-workspace"><form className="hn-global-search" onSubmit={e=>e.preventDefault()} role="search"><Search size={24}/><input autoFocus value={query} onChange={e=>change(e.target.value)} placeholder="TEI, manuscrits arabes, Gephi, FAIR..." aria-label="Rechercher dans toutes les ressources" dir="auto"/>{query&&<button type="button" onClick={()=>change('')}>Effacer</button>}</form><div className="hn-work-actions hn-search-examples"><span>Exemples :</span>{['TEI','arabe','OCR','cartographie','FAIR'].map(q=><button key={q} onClick={()=>change(q)}>{q}</button>)}</div><div className="hn-map-methods" role="group" aria-label="Filtrer les résultats">{groups.map(g=><button key={g} aria-pressed={group===g} onClick={()=>{setGroup(g);setLimit(30);}}>{g}</button>)}</div><p className="hn-small" aria-live="polite">{results.length} résultat(s) sur {index.length} entrées indexées</p><div className="hn-search-results">{results.slice(0,limit).map(r=><a href={r.href} className="hn-search-result" key={r.id}><span className="hn-result-kind">{r.group}</span><div><h3>{r.title}</h3><p>{r.description}</p></div><ArrowUpRight size={18}/></a>)}</div>{!results.length&&<p>Aucun résultat. Essayez un mot plus général, une autre orthographe ou le filtre « Tout ».</p>}{results.length>limit&&<button className="hn-work-button" onClick={()=>setLimit(n=>n+30)}>Afficher 30 résultats supplémentaires</button>}<p className="hn-guide-note">Recherche locale sur les notices et les fiches du portail, insensible aux accents et à la casse. Elle n’indexe pas le texte intégral des sites externes.</p></section>;
}