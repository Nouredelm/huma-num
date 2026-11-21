import {useMemo,useState} from 'react';
import {Compass,BookOpen,Wrench,FileCode,Shapes,ArrowUpRight} from 'lucide-react';
import {METHODS} from '../data/knowledgeMap';
import {TOOLS,GLOSSARY_TERMS,STANDARDS} from '../data/humnumData';
import {GUIDES} from '../data/researchGuides';
export function KnowledgeMap(){
 const [active,setActive]=useState(METHODS[0].id);const method=METHODS.find(m=>m.id===active)??METHODS[0];
 const groups=useMemo(()=>[
 {name:'Dossiers & disciplines',icon:Shapes,items:GUIDES.filter(g=>method.guideIds.includes(g.id)).map(g=>({label:g.title,url:'/'+g.page+'#'+g.id}))},
 {name:'Outils',icon:Wrench,items:TOOLS.filter(t=>method.toolIds.includes(t.id)).map(t=>({label:t.name,url:'/outils#tool-'+t.id}))},
 {name:'Concepts',icon:BookOpen,items:GLOSSARY_TERMS.filter(t=>method.conceptIds.includes(t.id)).map(t=>({label:t.term,url:'/glossaire#term-'+t.id}))},
 {name:'Standards',icon:FileCode,items:STANDARDS.filter(t=>method.standardIds.includes(t.id)).map(t=>({label:t.acronym,url:'/standards?standard='+encodeURIComponent(t.id)+'#standard-inspector'}))}
 ],[method]);
 return <section className="hn-workspace"><div className="hn-work-note"><Compass size={21}/><div><strong>Une carte méthodologique orientée vers la recherche</strong><p>Choisissez une démarche. Les quatre branches correspondent à des associations éditoriales documentées, non à des mesures statistiques de proximité.</p></div></div><div className="hn-map-methods" role="group" aria-label="Choisir une méthode">{METHODS.map(m=><button key={m.id} aria-pressed={active===m.id} onClick={()=>setActive(m.id)}>{m.title}</button>)}</div><div className="hn-map-center"><Compass size={30}/><h2>{method.title}</h2><p>{method.description}</p></div><div className="hn-map-branches">{groups.map(({name,icon:Icon,items})=><article className="hn-map-branch" key={name}><h3><Icon size={20}/>{name}<span>{items.length}</span></h3>{items.map(item=><a key={item.url} href={item.url}><span>{item.label}</span><ArrowUpRight size={14}/></a>)}</article>)}</div><p className="hn-guide-note">Les relations sont proposées à titre de parcours de découverte. Une méthode peut mobiliser d’autres outils ou standards selon les questions, les sources et les contraintes du projet.</p></section>;
}