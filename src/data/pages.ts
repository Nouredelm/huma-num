import {Home, Compass, Wrench, Database, FileCode, BookOpen, Library, Network} from 'lucide-react';
import {GENERATED_IMAGES} from './humnumData';
export const PAGES = [
  {id:'accueil', href:'/', title:'Accueil', label:'Accueil', icon:Home, description:'Portail des humanités numériques', image:GENERATED_IMAGES.heroArchive},
  {id:'panorama',href:'/panorama',title:'Panorama & méthodes',label:'Panorama',icon:Compass,description:"Explorer les étapes du cycle de recherche, les méthodes et les repères historiques.",image:GENERATED_IMAGES.spatialAtlas},
  {id:'outils',href:'/outils',title:'Outils',label:'Outils',icon:Wrench,description:"Choisir les logiciels et services adaptés à vos corpus et questions de recherche.",image:null},
  {id:'corpus',href:'/corpus',title:'Corpus',label:'Corpus',icon:Database,description:"Découvrir les bibliothèques numériques, les archives et les collections ouvertes.",image:GENERATED_IMAGES.corpusDigitization},
  {id:'standards',href:'/standards',title:'Standards',label:'Standards',icon:FileCode,description:"Comprendre les formats, protocoles et principes qui rendent les données interopérables.",image:GENERATED_IMAGES.editorialPrinting},
  {id:'glossaire',href:'/glossaire',title:'Glossaire',label:'Glossaire',icon:BookOpen,description:"Maîtriser le vocabulaire critique des humanités numériques et ses notions clés.",image:null},
  {id:'bibliographie',href:'/bibliographie',title:'Bibliographie',label:'Bibliographie',icon:Library,description:"Consulter les ouvrages de référence, les citations et les exports bibliographiques.",image:GENERATED_IMAGES.heroArchive},
  {id:'ecosysteme',href:'/ecosysteme',title:'Écosystème',label:'Écosystème',icon:Network,description:"Identifier les revues, formations, infrastructures et réseaux de la communauté scientifique.",image:null},
] as const;
export type PageId = typeof PAGES[number]['id'];
export function currentPage() {
 const path = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '').replace(/^\//,'');
 return PAGES.find(page=>page.id===path) ?? PAGES[0];
}
